const { ipcMain } = require("electron");
const { getToken } = require("../../Helpers/IamToken");
const { getResources } = require("../../Helpers/Resources");
const { resourceControllerApi, s3Api } = require("../../Helpers/Api");
const convert = require("xml-js");

ipcMain.handle("object-storage:requestApi", async (event, arg) => {
  console.log("Requesting Object Storage data from API");

  // Gera um bearer token
  const token = await getToken(event, arg.credentials.cloudApiKey);

  // Caso o token nao seja gerado com sucesso o evento é encerrado
  if (!token) {
    return [];
  }

  // Pega todos os recursos presentes na conta
  const resources = await getResources(token);

  // Caso nao seja possivel pegar os recursos com sucesso o evento é encerrado
  if (!resources) {
    return [];
  }

  // Filtramos os recursos para obter apenas os Object Storages
  let objectStorages = resources.filter((resource) => {
    return resource.id.includes("object-storage");
  });

  // Mapeia os Object Storage para tratamento
  // Esta requisição retonar uma Promise
  objectStorages = objectStorages.map(async (objectStorage, index) => {
    // Requisicao para pegar o nome do resource group
    let resourceGroup = resourceControllerApi
      .get(`/v2/resource_groups/${objectStorage.resource_group_id}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        return res.data.name;
      })
      .catch((error) => {
        event.sender.send("notification", {
          kind: "error",
          title: `Error ${error.response.status}: ${error.response.statusText}`,
          description: error.response.data.message,
          caption: new Date().toLocaleTimeString(),
        });

        return null;
      });

    // Requisicao para pegar os buckets
    let buckets = s3Api
      .get("/?extended", {
        headers: {
          authorization: `Bearer ${token}`,
          "ibm-service-instance-id": objectStorage.id,
        },
      })
      .then((res) => {
        const json = JSON.parse(
          convert.xml2json(res.data, { compact: true, spaces: 2 })
        );
        return json.ListAllMyBucketsResult.Buckets.Bucket;
      })
      .catch((error) => {
        console.log(error);
        event.sender.send("notification", {
          kind: "error",
          title: `Error ${error.response.status}: ${error.response.statusText}`,
          description: error.response.data.message,
          caption: new Date().toLocaleTimeString(),
        });

        return null;
      });

    // Deixa a primeira letra do status maiuscula
    const location =
      objectStorage.region_id.charAt(0).toUpperCase() +
      objectStorage.region_id.slice(1);

    // Deixa a primeira letra do status maiuscula
    const status =
      objectStorage.state.charAt(0).toUpperCase() +
      objectStorage.state.slice(1);

    resourceGroup = await Promise.resolve(resourceGroup);
    buckets = await Promise.resolve(buckets);

    const bucketsCount = buckets ? (buckets.length ? buckets.length : 1) : 0;
    let expansion = {
      title: "Object - Buckets",
      headers: [
        {
          key: "storageName",
          header: "Storage Name",
        },
        {
          key: "name",
          header: "Name",
        },
        /*  {
          key: "publicAccess",
          name: "Public Access",
        }, */
        {
          key: "location",
          header: "Location",
        },
        {
          key: "storageClass",
          header: "Storage Class",
        },
        {
          key: "created",
          header: "Created",
        },
      ],
      rows: [],
    };

    if (buckets !== undefined) {
      if (!Array.isArray(buckets)) {
        buckets = [buckets];
      }

      buckets.map(async (bucket) => {
        // A data de criacao vai ser exibida no formato xx/xx/xxxx,
        // Para isso precisamos splitar o formato em que ela vem
        const [date, hour] = bucket.CreationDate._text.split("T"); // 2019-08-06T07:36:25-07:00
        const [year, day, month] = date.split("-"); // 2019-08-06

        const locationConstraint = bucket.LocationConstraint._text.split("-");

        let storageClass = locationConstraint.pop();
        let location = locationConstraint.join("-");
        switch (storageClass) {
          case "smart":
            storageClass = "Smart Tier";
            break;
          case "standard":
            storageClass = "Standard";
            break;
          case "cold":
            storageClass = "Cold Vault";
            break;
          case "vault":
            storageClass = "Vault";
            break;
          default:
            console.log(storageClass);
        }

        expansion.rows.push({
          storageName: objectStorage.name,
          name: bucket.Name._text,
          publicAccess: "",
          created: `${month}/${day}/${year}`,
          storageClass,
          location,
        });
      });
    }

    // Object Storage Tratado
    return {
      id: index,
      name: objectStorage.name,
      resourceGroup,
      bucketsCount,
      expansion,
      location,
      status,
    };
  });

  // Esperamos todas as promises serem resolvidas
  objectStorages = await Promise.all(objectStorages);
  return objectStorages;
});

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
      .get("", {
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

    // Define quantos buckets,
    // buckets = undefined => 0
    // buckets.length = undefined => 1
    const bucketsCount = buckets ? (buckets.length ? buckets.length : 1) : 0;

    // Object Storage Tratado
    return {
      id: index,
      name: objectStorage.name,
      resourceGroup,
      bucketsCount,
      location,
      status,
    };
  });

  // Esperamos todas as promises serem resolvidas
  objectStorages = await Promise.all(objectStorages);
  return objectStorages;
});

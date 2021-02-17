const { ipcMain } = require("electron");
const { vpcApi } = require("../Helpers/Api");
const { getToken } = require("../Helpers/IamToken");

ipcMain.handle("vpc-overview:requestApi", async (event, arg) => {
  const token = await getToken(arg.credentials.cloudApiKey);

  // A API de VPC é dividida em um endpoint por regiao(dal, wds, lon...)
  // criamos um loop para realizar a requisição de cada uma delas
  let vpcs = vpcApi.map((region, apiIndex) => {
    // Esta requisição retonar uma promise
    return region.api
      .get("/v1/vpcs?version=2021-01-19&generation=2", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const vpcs = res.data.vpcs;
        return vpcs.map((vpc, vpcIndex) => {
          // A data de criacao vai ser exibida no formato xx/xx/xxxx,
          // Para isso precisamos splitar o formato em que ela vem
          const [date, hour] = vpc.created_at.split("T"); // 2019-08-06T07:36:25-07:00
          const [year, day, month] = date.split("-"); // 2019-08-06

          // O acesso a infra classic vem como true ou false
          // trocamos por yes ou no para ficar mais amigavel
          const classic_access = vpc.classic_access ? "Yes" : "No";

          // Deixa a primeira letra do status maiuscula
          const status =
            vpc.status.charAt(0).toUpperCase() + vpc.status.slice(1);

          // Os ip adress vem em uma lista, percorremos essas lista
          // concatenando todos os ip em uma string
          let address_prefixes = "";
          vpc.cse_source_ips.forEach((sourceIp) => {
            address_prefixes += `${sourceIp.ip.address}<br>`;
          });

          // VPC Tratada
          return {
            id: String(apiIndex) + String(vpcIndex),
            name: vpc.name,
            resourceGroup: vpc.resource_group.name,
            created: `${month}/${day}/${year}`,
            location: region.location,
            classic_access,
            status,
            address_prefixes,
          };
        });
      })
      .catch((err) => {
        console.log(err);
        return [];
      });
  });

  // As promises retornam arrays de objetos, esta funciton
  // converte todos os arrays em um array unico com todos os dados
  function* flatten(arr) {
    for (const el of arr) {
      if (Array.isArray(el)) {
        yield* flatten(el);
      } else {
        yield el;
      }
    }
  }

  // Esperamos todas as promises serem resolvidas e juntamos o resultado
  // de todas elas em um unico array de objs
  vpcs = await Promise.all(vpcs).then((array) => [...flatten(array)]);

  return vpcs;
});

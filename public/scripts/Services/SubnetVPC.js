const { ipcMain } = require("electron");
const { vpcApi } = require("../Helpers/Api");
const { getToken } = require("../Helpers/IamToken");

ipcMain.handle("subnet-vpc:requestApi", async (event, arg) => {
  console.log("Requesting Subnet data from API");

  // Gera um bearer token
  const token = await getToken(arg.credentials.cloudApiKey);

  // A API de VPC é dividida em um endpoint por regiao(dal, wds, lon...)
  // criamos um loop para realizar a requisição de cada uma delas
  let subnets = vpcApi.map((region, regionIndex) => {
    // Esta requisição retonar uma promise
    return region.api
      .get("/v1/subnets?version=2021-01-19&generation=2", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const subnets = res.data.subnets;
        return subnets.map((subnet, subnetIndex) => {
          // A data de criacao vai ser exibida no formato xx/xx/xxxx,
          // Para isso precisamos splitar o formato em que ela vem
          const [date, hour] = subnet.created_at.split("T"); // 2019-08-06T07:36:25-07:00
          const [year, month, day] = date.split("-"); // 2019-08-06

          // Verifica se o maquina tem gateway publico, caso  tenha vamos exibilo
          // Caso nao tenha, sera exibido um - no lugar
          const publicGateway = subnet.public_gateway
            ? subnet.public_gateway.name
            : "-";

          // Deixa a primeira letra do status maiuscula
          const status =
            subnet.status.charAt(0).toUpperCase() + subnet.status.slice(1);

          // Subnet Tratada
          return {
            id: String(regionIndex) + String(subnetIndex),
            name: subnet.name,
            vpcName: subnet.vpc.name,
            location: region.location,
            ipRange: subnet.ipv4_cidr_block,
            availableIp: subnet.total_ipv4_address_count,
            created: `${month}/${day}/${year}`,
            publicGateway,
            status,
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
  subnets = await Promise.all(subnets).then((array) => [...flatten(array)]);
  return subnets;
});

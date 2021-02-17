const { ipcMain } = require("electron");
const { vpcApi } = require("../Helpers/Api");
const { getToken } = require("../Helpers/IamToken");

ipcMain.handle("virtual-server-vpc:requestApi", async (event, arg) => {
  console.log("Requesting VPC Virtual Server data from API");

  // Gera um bearer token
  const token = await getToken(arg.credentials.cloudApiKey);

  // A API de VPC é dividida em um endpoint por regiao(dal, wds, lon...)
  // criamos um loop para realizar a requisição de cada uma delas
  let virtualServer = vpcApi.map((region, regionIndex) => {
    // Esta requisição retonar uma promise
    return region.api
      .get("v1/instances?version=2021-01-19&generation=2", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const virtualServers = res.data.instances;
        return virtualServers.map((virtualServer, virtualServerIndex) => {
          // A data de criacao vai ser exibida no formato xx/xx/xxxx,
          // Para isso precisamos splitar o formato em que ela vem
          const [date, hour] = virtualServer.created_at.split("T"); // 2019-08-06T07:36:25-07:00
          const [year, month, day] = date.split("-"); // 2019-08-06

          // Os sistemas operacionas vem no formato xx-xx-xx-xx splitamos pelo -,
          // para pegar as informacoes relevantes e montamos a string
          let so = virtualServer.image.name.split("-");
          so =
            so[1] === "windows"
              ? `${so[1]} ${so[2]} ${so[3]}` // windows server 2012
              : `${so[1]} ${so[2]}.${so[3]}`; // centos 7.6

          // O ip privado vem em uma lista, percorremos essas lista
          // concatenando todos os ips em uma string
          let privateIp = "";
          virtualServer.network_interfaces.forEach((network) => {
            privateIp += `${network.primary_ipv4_address} <br>`;
          });

          // Deixa a primeira letra do status maiuscula
          const status =
            virtualServer.status.charAt(0).toUpperCase() +
            virtualServer.status.slice(1);

          return {
            id: String(regionIndex) + String(virtualServerIndex),
            instanceId: virtualServer.id,
            name: virtualServer.name,
            flavor: virtualServer.profile.name,
            ram: virtualServer.memory,
            bandwidth: virtualServer.bandwidth,
            vcpu: virtualServer.vcpu.count,
            vpcName: virtualServer.vpc.name,
            location: region.location,
            created: `${month}/${day}/${year}`,
            so,
            privateIp,
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
  virtualServer = await Promise.all(virtualServer).then((array) => [
    ...flatten(array),
  ]);
  return virtualServer;
});

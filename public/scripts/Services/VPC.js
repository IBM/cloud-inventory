const { ipcMain } = require("electron");
const { vpcApi } = require("../Helpers/Api");
const { getToken } = require("../Helpers/IamToken");

ipcMain.on("vpc-overview:requestApi", async (event, arg) => {
  console.log(arg.log);

  if (arg.eventLoading) {
    event.reply(arg.eventLoading);
  }

  const token = await getToken(arg.credentials.cloudApiKey);

  let data = [];
  // A API de VPC é dividida em um endpoint por regiao(dal, wds, lon...)
  // criamos um loop para realizar a requisição de cada uma delas
  vpcApi.forEach((region) => {
    // Esta requisição retonar uma promise
    const res = region.api
      .get("/v1/vpcs?version=2021-01-19&generation=2", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const tempData = res.data.vpcs;
        tempData.forEach((e, index) => {
          const [date, hour] = e.created_at.split("T");
          const [year, day, month] = date.split("-");
          tempData[index].classic_access = e.classic_access ? "Yes" : "No";
          tempData[index].resourceGroup = e.resource_group.name;
          tempData[index].created = `${month}/${day}/${year}`;
          tempData[index].location = region.location;
          tempData[index].status =
            e.status.charAt(0).toUpperCase() + e.status.slice(1);
          tempData[index].address_prefixes = "";
          e.cse_source_ips.forEach((sourceIp) => {
            tempData[index].address_prefixes += `${sourceIp.ip.address}<br>`;
          });
        });

        return tempData;
      })
      .catch((err) => {
        console.log(err);
      });

    // O retorno de cada uma das APIs é contactenado no array inicial
    data = data.concat(res);
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
  data = await Promise.all(data).then((array) => [...flatten(array)]);

  event.reply("vpc-overview:receiving-data", data);
});

const { ipcMain } = require("electron");
const { classicApi } = require("../../Helpers/Api");

ipcMain.handle("virtual-server-classic:requestApi", (event, arg) => {
  console.log("Requesting Classic Virtual Server data from API");

  return classicApi
    .get(
      "/SoftLayer_Account/getVirtualGuests.json?objectMask=mask[datacenter,operatingSystem,hourlyBillingFlag,powerState,type,networkVlans]",
      {
        auth: {
          username: arg.credentials.userNameApi,
          password: arg.credentials.classicApiKey,
        },
      }
    )
    .then((response) => {
      const virtualServers = response.data;

      // Mapei e trata a resposta da api
      return virtualServers.map((virtualServer, index) => {
        // A data de criacao vai ser exibida no formato xx/xx/xxxx,
        // Para isso precisamos splitar o formato em que ela vem
        const [date, hour] = virtualServer.createDate.split("T"); // 2019-08-06T07:36:25-07:00
        const [year, day, month] = date.split("-"); // 2019-08-06

        // O sistema operacional é exibido no formato,
        // Nome do Sistema + Versao do Sistema

        // Para facilitar vamos pegar o nome do fabricanate
        let osName =
          virtualServer.operatingSystem.softwareLicense.softwareDescription
            .manufacturer;

        // Caso o nome do fabricante foi Microsoft precisamos trocar para Windows
        // caso contrario ja é o nome do proprio sistema operacional
        osName = osName === "Microsoft" ? "Windows" : osName;

        // Junto da versao do sistema vem outras informacoes da versao
        // vamos splitar por um espaco para pegar apenas a parte importante
        const [
          version,
          description,
        ] = virtualServer.operatingSystem.softwareLicense.softwareDescription.version.split(
          " "
        );

        // Por fim juntamos o nome do sistema operacional e sua versao
        // Tambem temos que retirar o -64 da versao
        const os = `${osName} ${version.replace("-64", "")}`;

        let publicIp;
        let vlans;
        // Verifica se o maquina tem ip publico
        if (virtualServer.primaryIpAddress) {
          // Caso tenha vamos exibilos
          publicIp = virtualServer.primaryIpAddress;

          // Todos os servidores com ip publico, tambem tem vlan publica
          vlans = `Public: ${virtualServer.networkVlans[1].vlanNumber}<br>Private: ${virtualServer.networkVlans[0].vlanNumber}`;
        } else {
          // Caso nao tenha ip publico, sera exibido um - no lugar
          publicIp = "-";

          // Caso nao tenha ip publico, tambem nao tera vlan publica
          vlans = `Private: ${virtualServer.networkVlans[0].vlanNumber}`;
        }

        const billing = virtualServer.hourlyBillingFlag ? "Hourly" : "Monthly";

        // Virtual Server Tratado
        return {
          id: String(index),
          name: virtualServer.fullyQualifiedDomainName,
          location: virtualServer.datacenter.name,
          deviceType: virtualServer.type.name,
          vcpu: virtualServer.maxCpu,
          ram: `${Math.floor(virtualServer.maxMemory / 1000)}GB`,
          created: `${month}/${day}/${year}`,
          status: virtualServer.powerState.name,
          privateIp: virtualServer.primaryBackendIpAddress,
          publicIp,
          os,
          vlans,
          billing,
        };
      });
    })
    .catch((err) => {
      console.log(err);
      return [];
    });
});

const { ipcMain } = require("electron");
const { classicApi } = require("../../Helpers/Api");

ipcMain.handle("gateway-appliance:requestApi", (event, arg) => {
  console.log(
    "Requesting Gateway Appliance for Classic data from IBM Cloud API"
  );

  return classicApi
    .get(
      '/SoftLayer_Account/getHardware.json?objectMask=mask[datacenter,hardDrives,networkVlans,primaryBackendNetworkComponent,processorPhysicalCoreAmount,operatingSystem,memoryCapacity,networkGatewayMemberFlag,hourlyBillingFlag]&objectFilter={"hardware":{"hardwareFunction":{"code":{"operation":"WEBSVR"}},"networkGatewayMemberFlag":{"operation":1}}}',
      {
        auth: {
          username: arg.credentials.userNameApi,
          password: arg.credentials.classicApiKey,
        },
      }
    )
    .then((response) => {
      const gateways = response.data;
      return gateways.map((gateway, index) => {
        // A data de criacao vai ser exibida no formato xx/xx/xxxx,
        // Para isso precisamos splitar o formato em que ela vem
        const [date, hour] = gateway.provisionDate.split("T"); // 2019-08-06T07:36:25-07:00
        const [year, day, month] = date.split("-"); // 2019-08-06

        // Splitamos o nome do sistema operacional pelo espaço
        let os = gateway.operatingSystem.softwareLicense.softwareDescription.longDescription.split(
          " "
        );

        // Montamos a forma que o sistema operacional é exibido baseado
        // no seu modelo
        switch (os[0]) {
          case "Other":
            os = `${os[7]} ${os[8]} ${os[9]} ${os[10]}`; // Bring Your Own Appliance
            break;
          case "ATT":
            os = `${os[0]} ${os[1]} ${os[2]} ${os[3]}`; // ATT Virtual Router Appliance
            break;
          default:
            os =
              gateway.operatingSystem.softwareLicense.softwareDescription
                .longDescription;
            break;
        }

        let publicIp;
        let vlans;
        // Verifica se o maquina tem ip publico
        if (gateway.primaryIpAddress) {
          // Caso tenha vamos exibilos
          publicIp = gateway.primaryIpAddress;

          // Todos os servidores com ip publico, tambem tem vlan publica
          vlans = `Public: ${gateway.networkVlans[1].vlanNumber}<br>Private: ${gateway.networkVlans[0].vlanNumber}`;
        } else {
          // Caso nao tenha ip publico, sera exibido um - no lugar
          publicIp = "-";

          // Caso nao tenha ip publico, tambem nao tera vlan publica
          vlans = `Private: ${gateway.networkVlans[0].vlanNumber}`;
        }

        // Os Storages vem em uma lista, percorremos essas lista
        // concatenando todos os storages em uma string
        let storage = "";
        gateway.hardDrives.forEach((hardDrive) => {
          const hardwareGenericComponentModel =
            hardDrive.hardwareComponentModel.hardwareGenericComponentModel;
          storage += `${hardwareGenericComponentModel.hardwareComponentType.type}: ${hardwareGenericComponentModel.capacity} ${hardwareGenericComponentModel.units}<br>`;
        });

        // Este campo indica com true ou false se o bm tem o billing por hora
        // trocamos para Hourly ou Monthly para ficar mais amigavel
        const billing = gateway.hourlyBillingFlag ? "Hourly" : "Monthly";

        // Gateway Appliance Tratado
        return {
          id: String(index),
          name: gateway.fullyQualifiedDomainName,
          ram: gateway.memoryCapacity,
          cores: gateway.processorPhysicalCoreAmount,
          location: gateway.datacenter.name,
          privateIp: gateway.primaryBackendIpAddress,
          speed: `${gateway.primaryBackendNetworkComponent.maxSpeed}Mbps`,
          created: `${month}/${day}/${year}`,
          vlans,
          storage,
          publicIp,
          os,
          billing,
        };
      });
    })
    .catch((error) => {
      event.sender.send("notification", {
        kind: "error",
        title: `Error ${error.response.status}: ${error.response.statusText}`,
        description: error.response.data.error,
        caption: new Date().toLocaleTimeString(),
      });
      return [];
    });
});

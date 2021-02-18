const { ipcMain } = require("electron");
const { classicApi } = require("../../Helpers/Api");

ipcMain.handle("bare-metal-classic:requestApi", (event, arg) => {
  console.log("Requesting Bare Metal for Classic data from IBM Cloud API");

  return classicApi
    .get(
      'https://api.softlayer.com/rest/v3.1/SoftLayer_Account/getHardware.json?objectMask=mask[datacenter,hardDrives,primaryBackendNetworkComponent,processorPhysicalCoreAmount,operatingSystem,memoryCapacity,networkGatewayMemberFlag,hourlyBillingFlag]&objectFilter={"hardware":{"hardwareFunction":{"code":{"operation":"WEBSVR"}},"networkGatewayMemberFlag":{"operation":0}}}',
      {
        auth: {
          username: arg.credentials.userNameApi,
          password: arg.credentials.classicApiKey,
        },
      }
    )
    .then((response) => {
      const bareMetals = response.data;
      return bareMetals.map((bareMetal, index) => {
        // A data de criacao vai ser exibida no formato xx/xx/xxxx,
        // Para isso precisamos splitar o formato em que ela vem
        const [date, hour] = bareMetal.provisionDate.split("T"); // 2019-08-06T07:36:25-07:00
        const [year, day, month] = date.split("-"); // 2019-08-06

        // Splitamos o nome do sistema operacional pelo espaço
        let os = bareMetal.operatingSystem.softwareLicense.softwareDescription.longDescription.split(
          " "
        );

        // Montamos a forma que o sistema operacional é exibido baseado
        // no seu modelo
        switch (os[0]) {
          case "Microsoft":
            os = `${os[1]} ${os[2]}`; // Windows 2019
            break;
          case "VMware":
            os = `${os[0]} ${os[1]} ${os[2]}`; // VMware VSphere 6.7.0u2
            break;
          default:
            os =
              bareMetal.operatingSystem.softwareLicense.softwareDescription
                .longDescription;
            break;
        }

        // Verifica se o maquina tem ip publico, caso tenha vamos exibilo
        // caso nao, sera exibido um - no lugar
        const publicIp = bareMetal.primaryIpAddress
          ? bareMetal.primaryIpAddress
          : "-";

        // Os Storages vem em uma lista, percorremos essas lista
        // concatenando todos os storages em uma string
        let storage = "";
        bareMetal.hardDrives.forEach((hardDrive) => {
          const hardwareGenericComponentModel =
            hardDrive.hardwareComponentModel.hardwareGenericComponentModel;
          storage += `${hardwareGenericComponentModel.hardwareComponentType.type}: ${hardwareGenericComponentModel.capacity} ${hardwareGenericComponentModel.units}<br>`;
        });

        // Este campo indica com true ou false se o bm tem o billing por hora
        // trocamos para Hourly ou Monthly para ficar mais amigavel
        const billing = bareMetal.hourlyBillingFlag ? "Hourly" : "Monthly";

        // Bare Metal Tratado
        return {
          id: String(index),
          name: bareMetal.fullyQualifiedDomainName,
          ram: bareMetal.memoryCapacity,
          cores: bareMetal.processorPhysicalCoreAmount,
          location: bareMetal.datacenter.name,
          privateIp: bareMetal.primaryBackendIpAddress,
          speed: `${bareMetal.primaryBackendNetworkComponent.maxSpeed}Mbps`,
          created: `${month}/${day}/${year}`,
          storage,
          publicIp,
          os,
          billing,
        };
      });
    })
    .catch((err) => {
      console.log(err);
      return [];
    });
});

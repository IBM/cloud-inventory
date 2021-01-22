const { ipcMain } = require("electron");
const { classicApi } = require("../Helpers/Api");

ipcMain.on("virtual-server-classic:requestApi", async (event, arg) => {
  console.log(arg.log);

  if (arg.eventLoading) {
    event.reply(arg.eventLoading);
  }

  await classicApi
    .get(
      "/SoftLayer_Account/getVirtualGuests.json?objectMask=mask[datacenter,operatingSystem,hourlyBillingFlag,powerState,type,networkVlans]",
      {
        auth: {
          username: arg.credentials.userNameApi,
          password: arg.credentials.classicApiKey,
        },
      }
    )
    .then((res) => {
      let data = res.data;
      data.forEach((e, index) => {
        const [date, hour] = e.createDate.split("T");
        const [year, day, month] = date.split("-");
        const [
          version,
          descrip,
        ] = e.operatingSystem.softwareLicense.softwareDescription.version.split(
          " "
        );
        const osName =
          e.operatingSystem.softwareLicense.softwareDescription.manufacturer;
        const publicIp = e.primaryIpAddress;
        data[index].id = index;
        data[index].name = e.fullyQualifiedDomainName;
        data[index].location = e.datacenter.name;
        data[index].deviceType = e.type.name;
        data[index].os = `${
          osName === "Microsoft" ? "Windows" : osName
        } ${version.replace("-64", "")}`;

        data[index].vcpu = e.maxCpu;
        data[index].ram = `${Math.floor(e.maxMemory / 1000)}GB`;
        data[index].privateIp = e.primaryBackendIpAddress;
        data[index].publicIp = publicIp ? publicIp : "-";
        data[index].vlans =
          e.networkVlans.length === 2
            ? `Public: ${e.networkVlans[1].vlanNumber}\nPrivate: ${e.networkVlans[0].vlanNumber}`
            : `Private: ${e.networkVlans[0].vlanNumber}`;
        data[index].created = `${month}/${day}/${year}`;
        data[index].billing = e.hourlyBillingFlag ? "Hourly" : "Monthly";
        data[index].status = e.powerState.name;
      });

      event.reply("virtual-server-classic:receiving-data", data);
    })
    .catch((err) => {
      console.log(err);
    });
});

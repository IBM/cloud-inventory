const { ipcMain } = require("electron");
const { api } = require("../Helpers/Api");

ipcMain.on("vpc:requestApi", async (event, arg) => {
  console.log(arg.log);

  if (arg.eventLoading) {
    event.reply(arg.eventLoading);
  }

const service = {
	authenticator: = new IamAuthenticator({
		apikey: arg.credentials.cloudApiKey,
	}),
};

const vpcService = new VpcV1(service);
const res = await vpcService.listVpcs();

      res.vpcs.forEach((e, index) => {
        data[index].id = id;
        data[index].name = name;
        data[index].classic = e.classic_access;
        /* data[index].deviceType = e.type.name;
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
        data[index].status = e.powerState.name; */
      });

      event.reply("vpc:receiving-data", data);
});

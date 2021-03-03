const { ipcMain } = require("electron");
const { classicApi } = require("../../Helpers/Api");

ipcMain.handle("block-storage-classic:requestApi", (event, arg) => {
  console.log("Requesting Block Storage data from API");

  return classicApi
    .get(
      "/SoftLayer_Account/getIscsiNetworkStorage.json?objectMask=mask[iscsiTargetIpAddresses,serviceResource.datacenter.name,snapshotCapacityGb,storageType,snapshots,storageTierLevel,allowedSubnets,allowedVirtualGuests,allowedHardware,allowedIpAddresses]",
      {
        auth: {
          username: arg.credentials.userNameApi,
          password: arg.credentials.classicApiKey,
        },
      }
    )
    .then((response) => {
      const blockStorages = response.data;

      // Mapeia e trata a resposta da api
      return blockStorages.map((blockStorage, index) => {
        // A data de criacao vai ser exibida no formato xx/xx/xxxx,
        // Para isso precisamos splitar o formato em que ela vem
        const [date, hour] = blockStorage.createDate.split("T"); // 2019-08-06T07:36:25-07:00
        const [year, day, month] = date.split("-"); // 2019-08-06

        // Mapeia e adiciona os targets ips
        let targetAdress = "";
        blockStorage.iscsiTargetIpAddresses.forEach((ipAddress) => {
          targetAdress += `${ipAddress}<br>`;
        });

        // Verifica qual o tier do storage para saber a qtd de iops
        let iops;
        switch (blockStorage.storageTierLevel) {
          case "LOW_INTENSITY_TIER":
            iops = 0.25;
            break;
          case "READHEAVY_TIER":
            iops = 2;
            break;
          case "WRITEHEAVY_TIER":
            iops = 4;
            break;
          case "10_IOPS_PER_GB":
            iops = 10;
            break;
          default:
        }

        // Splita o tipo do storage para pegar so a primeira parte
        let type = blockStorage.storageType.description.split(" ");

        // Define o type do storage e a qtd max de iops dependendo
        // se o storage é Endurance ou Performance
        let maxIops;
        if (type[0] === "Endurance") {
          type = `${type[0]} ${iops}IOPS/GB`;
          maxIops = `${iops * blockStorage.capacityGb}IOPS`;
        } else {
          type = type[0];
          maxIops = `${blockStorage.provisionedIops}IOPS`;
        }

        // Mapeia os hosts autorizados
        let authorizedHosts = 0;
        let expansion = {
          title: "Authorized Hosts:",
          headers: [
            {
              key: "deviceType",
              name: "Device Type",
            },
            {
              key: "deviceName",
              name: "Device Name",
            },
            {
              key: "ipAddress",
              name: "IP Address",
            },
          ],
          rows: [],
        };

        authorizedHosts += blockStorage.allowedVirtualGuests.length;
        blockStorage.allowedVirtualGuests.forEach((virtualGuest) => {
          expansion.rows.push({
            deviceType: "Virtual Server",
            deviceName: virtualGuest.fullyQualifiedDomainName,
            ipAddress: virtualGuest.primaryBackendIpAddress,
          });
        });

        authorizedHosts += blockStorage.allowedHardware.length;
        blockStorage.allowedHardware.forEach((hardware) => {
          expansion.rows.push(hardware);
        });

        authorizedHosts += blockStorage.allowedSubnets.length;
        blockStorage.allowedSubnets.forEach((subnet) => {
          expansion.rows.push({
            deviceType: "Subnet",
            deviceName: "-",
            ipAddress: subnet.networkIdentifier,
          });
        });

        authorizedHosts += blockStorage.allowedIpAddresses.length;
        blockStorage.allowedIpAddresses.forEach((ipAddress) => {
          expansion.rows.push({
            deviceType: "IP Address",
            deviceName: "-",
            ipAddress: ipAddress.ipAddress,
          });
        });

        // Define a capacidade de snapshot
        const snapshotCapacity = blockStorage.snapshotCapacityGb
          ? blockStorage.snapshotCapacityGb
          : 0;

        // Define a qtd de snapshot
        const snapshots = blockStorage.snapshots
          ? blockStorage.snapshots.length
          : 0;

        // Block Storage Tratado
        return {
          id: String(index),
          name: blockStorage.username,
          location: blockStorage.serviceResource.datacenter.name,
          capacity: blockStorage.capacityGb,
          created: `${month}/${day}/${year}`,
          snapshotCapacity,
          authorizedHosts,
          targetAdress,
          expansion,
          snapshots,
          maxIops,
          type,
        };
      });
    })
    .catch((error) => {
      console.log(error);
      /*
      event.sender.send("notification", {
        kind: "error",
        title: `Error ${error.response.status}: ${error.response.statusText}`,
        description: error.response.data.error,
        caption: new Date().toLocaleTimeString(),
      });
      */
      return [];
    });
});

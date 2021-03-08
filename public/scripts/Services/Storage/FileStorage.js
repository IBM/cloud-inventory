const { ipcMain } = require("electron");
const { classicApi } = require("../../Helpers/Api");

ipcMain.handle("file-storage-classic:requestApi", (event, arg) => {
  console.log("Requesting File Storage data from API");

  return classicApi
    .get(
      "/SoftLayer_Account/getNasNetworkStorage.json?objectMask=mask[storageType,bytesUsed,serviceResource.datacenter.name,fileNetworkMountAddress,allowedSubnets,allowedVirtualGuests,allowedHardware,allowedIpAddresses,storageTierLevel,provisionedIops,snapshotCapacityGb,snapshots]",
      {
        auth: {
          username: arg.credentials.userNameApi,
          password: arg.credentials.classicApiKey,
        },
      }
    )
    .then((response) => {
      const fileStorages = response.data;

      // Mapeia e trata a resposta da api
      return fileStorages.map((fileStorage, index) => {
        // A data de criacao vai ser exibida no formato xx/xx/xxxx,
        // Para isso precisamos splitar o formato em que ela vem
        const [date, hour] = fileStorage.createDate.split("T"); // 2019-08-06T07:36:25-07:00
        const [year, day, month] = date.split("-"); // 2019-08-06

        // Define a qtd de bytes usados pelo storage
        let usage = fileStorage.bytesUsed ? fileStorage.bytesUsed : 0;

        // Divide a qtd de bytes usada para ter o valor em GB
        usage = usage / 1000000000;

        // Converte a qtd usada de GB para %
        usage = (100 * usage) / fileStorage.capacityGb;

        // Arredonda para 2 casas decimais
        usage = `${Math.floor(usage * 100) / 100}%`;

        // Mapeia os hosts autorizados
        let authorizedHosts = 0;
        let expansion = {
          title: "File - Authorized Hosts",
          headers: [
            {
              key: "storageName",
              header: "Storage Name",
            },
            {
              key: "deviceType",
              header: "Device Type",
            },
            {
              key: "deviceName",
              header: "Device Name",
            },
            {
              key: "ipAddress",
              header: "IP Address",
            },
          ],
          rows: [],
        };

        authorizedHosts += fileStorage.allowedVirtualGuests.length;
        fileStorage.allowedVirtualGuests.forEach((virtualGuest) => {
          expansion.rows.push({
            storageName: fileStorage.username,
            deviceType: "Virtual Server",
            deviceName: virtualGuest.fullyQualifiedDomainName,
            ipAddress: virtualGuest.primaryBackendIpAddress,
          });
        });

        authorizedHosts += fileStorage.allowedHardware.length;
        fileStorage.allowedHardware.forEach((hardware) => {
          expansion.rows.push(hardware);
        });

        authorizedHosts += fileStorage.allowedSubnets.length;
        fileStorage.allowedSubnets.forEach((subnet) => {
          expansion.rows.push({
            storageName: fileStorage.username,
            deviceType: "Subnet",
            deviceName: "-",
            ipAddress: subnet.networkIdentifier,
          });
        });

        authorizedHosts += fileStorage.allowedIpAddresses.length;
        fileStorage.allowedIpAddresses.forEach((ipAddress) => {
          expansion.rows.push({
            storageName: fileStorage.username,
            deviceType: "IP Address",
            deviceName: "-",
            ipAddress: ipAddress.ipAddress,
          });
        });

        // Verifica qual o tier do storage para saber a qtd de iops
        let iops;
        switch (fileStorage.storageTierLevel) {
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
        let type = fileStorage.storageType.description.split(" ");

        // Define o type do storage e a qtd max de iops dependendo
        // se o storage é Endurance ou Performance
        let maxIops;
        if (type[0] === "Endurance") {
          type = `${type[0]} ${iops}IOPS/GB`;
          maxIops = `${iops * fileStorage.capacityGb}IOPS`;
        } else {
          type = type[0];
          maxIops = `${fileStorage.provisionedIops}IOPS`;
        }

        // Define a capacidade de snapshot
        const snapshotCapacity = fileStorage.snapshotCapacityGb
          ? fileStorage.snapshotCapacityGb
          : 0;

        // Define a qtd de snapshot
        const snapshots = fileStorage.snapshots
          ? fileStorage.snapshots.length
          : 0;

        // File Storage Tratado
        return {
          id: String(index),
          name: fileStorage.username,
          location: fileStorage.serviceResource.datacenter.name,
          capacity: `${fileStorage.capacityGb}GB`,
          snapcapacity: fileStorage.snapshotCapacityGb,
          mountPoint: fileStorage.fileNetworkMountAddress,
          created: `${month}/${day}/${year}`,
          snapshotCapacity,
          authorizedHosts,
          expansion,
          snapshots,
          maxIops,
          type,
          usage,
        };
      });
    })
    .catch((error) => {
      console.log(error);
      /*  event.sender.send("notification", {
        kind: "error",
        title: `Error ${error.response.status}: ${error.response.statusText}`,
        description: error.response.data.error,
        caption: new Date().toLocaleTimeString(),
      });*/
      return [];
    });
});

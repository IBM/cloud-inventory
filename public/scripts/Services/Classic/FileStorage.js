const { ipcMain } = require("electron");
const { classicApi } = require("../../Helpers/Api");

ipcMain.handle("file-storage-classic:requestApi", (event, arg) => {
  console.log("Requesting File Storage data from API");

  return classicApi
    .get(
      "/SoftLayer_Account/getNasNetworkStorage.json?objectMask=mask[provisionedIops,snapshotCapacityGb,snapshotCount,volumeStatus,fileNetworkMountAddress,storageType,bytesUsed]",
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
        console.log(fileStorage);
        // const snapshots = fileStorage.snapshots.length;
        // File Storage Tratado
        return {
          id: String(index),
          name: fileStorage.username,
          type: fileStorage.storageType.description,
          iops: fileStorage.provisionedIops,
          capacity: fileStorage.capacityGb,
          usage: fileStorage.bytesUsed / 1000000000,
          snapcapacity: fileStorage.snapshotCapacityGb,
          hosts: fileStorage.hostId,
          point: fileStorage.fileNetworkMountAddress,
          created: fileStorage.createDate,
          status: fileStorage.volumeStatus,
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

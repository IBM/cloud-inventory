const { ipcMain } = require("electron");
const { classicApi } = require("../../Helpers/Api");

ipcMain.handle("block-storage-classic:requestApi", (event, arg) => {
  console.log("Requesting Block Storage data from API");

  return classicApi
    .get(
      "/SoftLayer_Account/getIscsiNetworkStorage.json?objectMask=mask[provisionedIops, iscsiTargetIpAddresses, snapshotCapacityGb, storageType, volumeStatus, snapshots, replicationStatus]",
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
        /*  const snapshot = blockStorage.snapshots.length; */

        // Block Storage Tratado
        return {
          id: String(index),
          name: blockStorage.username,
          type: blockStorage.storageType.description,
          iops: blockStorage.provisionedIops,
          capacity: blockStorage.capacityGb,
          targetAdress: blockStorage.iscsiTargetIpAddresses,
          snapshotsCapacity: blockStorage.snapshotCapacityGb,
          hosts: blockStorage.hostId,
          created: blockStorage.createDate,
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

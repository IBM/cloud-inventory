const {
  DataBase32,
  VirtualMachine32,
  Table32,
  VirtualPrivateCloudAlt32,
  VirtualPrivateCloud32,
  Network_232,
  ModelAlt32,
  ObjectStorage32,
  CopyFile32,
  Archive32,
} = require("@carbon/icons-react");

const Menus = [
  {
    title: "Classic Infrastructure",
    path: "/classic/",
    icon: DataBase32,
    dropdown: [
      {
        title: "Virtual Server",
        path: "/classic/vsi",
        icon: VirtualMachine32,
      },
      {
        title: "Bare Metal",
        path: "/classic/bm",
        icon: Table32,
      },
      {
        title: "Gateway Appliance",
        path: "/classic/gateway",
        icon: Table32,
      },
    ],
  },
  {
    title: "Virtual Private Cloud",
    path: "/vpc/",
    icon: VirtualPrivateCloudAlt32,
    dropdown: [
      {
        title: "VPCs",
        path: "/vpc/overview",
        icon: VirtualPrivateCloud32,
      },
      {
        title: "Virtual Server",
        path: "/vpc/vsi",
        icon: VirtualMachine32,
      },
      {
        title: "Subnet",
        path: "/vpc/subnet",
        icon: Network_232,
      },
    ],
  },
  {
    title: "Storages",
    path: "/storage/",
    icon: Archive32,
    dropdown: [
      {
        title: "Classic - File Storage",
        path: "/storage/classicfile",
        icon: CopyFile32,
      },
      {
        title: "Classic - Block Storage",
        path: "/storage/classicblock",
        icon: ModelAlt32,
      },
      {
        title: "Object Storage",
        path: "/storage/object",
        icon: ObjectStorage32,
      },
    ],
  },
];

module.exports = Menus;

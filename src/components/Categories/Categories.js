import {
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
} from "@carbon/icons-react";

import {
  BareMetal,
  GatewayAppliance,
  VirtualServerClassic,
  Overview,
  VirtualServerVPC,
  Subnet,
  BlockStorageClassic,
  FileStorageClassic,
  ObjectStorage,
} from "./TableHeaders";

import ServicePage from "../../pages/Services";

const Categories = [
  {
    title: "Classic Infrastructure",
    path: "/classic/",
    icon: DataBase32,
    services: [
      {
        title: "Virtual Server",
        description: "Virtual Server for Classic",
        path: "/classic/vsi",
        icon: VirtualMachine32,
        headers: VirtualServerClassic,
        event: "virtual-server-classic:requestApi",
        component: ServicePage,
      },
      {
        title: "Bare Metal",
        description: "Bare Metal",
        path: "/classic/bm",
        icon: Table32,
        headers: BareMetal,
        event: "bare-metal-classic:requestApi",
        component: ServicePage,
      },
      {
        title: "Gateway Appliance",
        description: "Gateway Appliance",
        path: "/classic/gateway",
        icon: Table32,
        headers: GatewayAppliance,
        event: "gateway-appliance:requestApi",
        component: ServicePage,
      },
    ],
  },
  {
    title: "Virtual Private Cloud",
    path: "/vpc/",
    icon: VirtualPrivateCloudAlt32,
    services: [
      {
        title: "VPCs",
        description: "VPC Overview",
        path: "/vpc/overview",
        icon: VirtualPrivateCloud32,
        headers: Overview,
        event: "vpc-overview:requestApi",
        component: ServicePage,
      },
      {
        title: "Virtual Server",
        description: "Virtual Server for VPC",
        path: "/vpc/vsi",
        icon: VirtualMachine32,
        headers: VirtualServerVPC,
        event: "virtual-server-vpc:requestApi",
        component: ServicePage,
      },
      {
        title: "Subnet",
        description: "Subnet",
        path: "/vpc/subnet",
        icon: Network_232,
        headers: Subnet,
        event: "subnet-vpc:requestApi",
        component: ServicePage,
      },
    ],
  },
  {
    title: "Storages",
    path: "/storage/",
    icon: Archive32,
    services: [
      {
        title: "File Storage (Classic Infra)",
        description: "File Storage for Classic",
        path: "/storage/classicfile",
        icon: CopyFile32,
        headers: FileStorageClassic,
        event: "file-storage-classic:requestApi",
        component: ServicePage,
      },
      {
        title: "Block Storage (Classic Infra)",
        description: "Block Storage for Classic",
        path: "/storage/classicblock",
        icon: ModelAlt32,
        headers: BlockStorageClassic,
        event: "block-storage-classic:requestApi",
        component: ServicePage,
      },
      {
        title: "Object Storage",
        description: "Object Storage",
        path: "/storage/object",
        icon: ObjectStorage32,
        headers: ObjectStorage,
        event: "object-storage:requestApi",
        component: ServicePage,
      },
    ],
  },
];

export default Categories;
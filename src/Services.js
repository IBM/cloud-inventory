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
// Classic Infra
import VirtualServerClassic from "./pages/Classic/VirtualServerClassic";
import BareMetal from "./pages/Classic/BareMetal";
import GatewayAppliance from "./pages/Classic/GatewayAppliance";
// VPC
import VPC from "./pages/VPC/Overview";
import VirtualServerVPC from "./pages/VPC/VirtualServer";
import SubnetVPC from "./pages/VPC/Subnet";
// Storage
import FileStorageClassic from "./pages/Storage/FileStorageClassic";
import BlockStorageClassic from "./pages/Storage/BlockStorageClassic";
import ObjectStorage from "./pages/Storage/ObjectStorage";

const Services = [
  {
    title: "Classic Infrastructure",
    path: "/classic/",
    icon: DataBase32,
    dropdowns: [
      {
        title: "Virtual Server",
        path: "/classic/vsi",
        icon: VirtualMachine32,
        event: "virtual-server-classic:requestApi",
        component: VirtualServerClassic,
      },
      {
        title: "Bare Metal",
        path: "/classic/bm",
        icon: Table32,
        event: "bare-metal-classic:requestApi",
        component: BareMetal,
      },
      {
        title: "Gateway Appliance",
        path: "/classic/gateway",
        icon: Table32,
        event: "gateway-appliance:requestApi",
        component: GatewayAppliance,
      },
    ],
  },
  {
    title: "Virtual Private Cloud",
    path: "/vpc/",
    icon: VirtualPrivateCloudAlt32,
    dropdowns: [
      {
        title: "VPCs",
        path: "/vpc/overview",
        icon: VirtualPrivateCloud32,
        event: "vpc-overview:requestApi",
        component: VPC,
      },
      {
        title: "Virtual Server",
        path: "/vpc/vsi",
        icon: VirtualMachine32,
        event: "virtual-server-vpc:requestApi",
        component: VirtualServerVPC,
      },
      {
        title: "Subnet",
        path: "/vpc/subnet",
        icon: Network_232,
        event: "subnet-vpc:requestApi",
        component: SubnetVPC,
      },
    ],
  },
  {
    title: "Storages",
    path: "/storage/",
    icon: Archive32,
    dropdowns: [
      {
        title: "File Storage (Classic Infra)",
        path: "/storage/classicfile",
        icon: CopyFile32,
        event: "file-storage-classic:requestApi",
        component: FileStorageClassic,
      },
      {
        title: "Block Storage (Classic Infra)",
        path: "/storage/classicblock",
        icon: ModelAlt32,
        event: "block-storage-classic:requestApi",
        component: BlockStorageClassic,
      },
      {
        title: "Object Storage",
        path: "/storage/object",
        icon: ObjectStorage32,
        event: "object-storage:requestApi",
        component: ObjectStorage,
      },
    ],
  },
];

export default Services;

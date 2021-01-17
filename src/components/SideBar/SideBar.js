import React from "react";
import { Link } from "react-router-dom";
import {
  SideNav,
  SideNavMenu,
  SideNavMenuItem,
  SideNavItems,
  SideNavLink,
} from "carbon-components-react/lib/components/UIShell";
import {
  Bee32,
  Carbon32,
  Enterprise16,
  Enterprise32, 
  DataBase32,
  InventoryManagement32,
  Fade16,
  VirtualMachine32,
  Vpn32,
  ObjectStorage32,
  Archive32,
} from "@carbon/icons-react";

const SideBar = ({ isSideNavExpanded }) => {
  return (
    <SideNav aria-label="Side navigation" isRail expanded={isSideNavExpanded}>
      <SideNavItems>
        <SideNavMenu renderIcon={DataBase32} title="Classic Infrastructure">
         <Link to="/vsi/classic">
           <SideNavLink renderIcon={VirtualMachine32}>Virtual Server for Classic</SideNavLink>
         </Link>
        </SideNavMenu>
      </SideNavItems>
    </SideNav>
  );
};

export default SideBar;

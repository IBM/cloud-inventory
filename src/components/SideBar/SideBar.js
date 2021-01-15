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
        <SideNavMenu renderIcon={Fade16} title="Classic Infrastructure">
	  <SideNavMenuItem href="javascript:void(0)">Classic Infrastructure</SideNavMenuItem>
         <Link to="/vsi/classic">
           <SideNavLink renderIcon={VirtualMachine32}>Virtual Server for Classic</SideNavLink>
         </Link>
        </SideNavMenu>
        {/*
        <SideNavLink renderIcon={Archive32}>Bare Metal Server</SideNavLink>
        <SideNavLink renderIcon={Vpn32}>Virtual Private Network</SideNavLink>
        <SideNavLink renderIcon={ObjectStorage32}>Object Storage</SideNavLink> */}
      </SideNavItems>
    </SideNav>
  );
};

export default SideBar;

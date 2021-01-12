import React from "react";
import {
  SideNav,
  SideNavItems,
  SideNavLink,
  SideNavMenu,
  SideNavMenuItem,
} from "carbon-components-react/lib/components/UIShell";
import {
  Fade16,
  VirtualMachine32,
  Vpn32,
  ObjectStorage32,
  QueryQueue32,
  Archive32,
} from "@carbon/icons-react";

const SideBar = ({ isSideNavExpanded }) => {
  return (
    <SideNav aria-label="Side navigation" isRail expanded={isSideNavExpanded}>
      <SideNavItems>
        {/* 
        <SideNavMenu renderIcon={Fade16} title="Category title">
          <SideNavMenuItem href="javascript:void(0)">Link</SideNavMenuItem>
          <SideNavMenuItem aria-current="page" href="javascript:void(0)">
            Link
          </SideNavMenuItem>
          <SideNavMenuItem href="javascript:void(0)">Link</SideNavMenuItem>
        </SideNavMenu>
        */}
        <SideNavLink renderIcon={QueryQueue32} href="javascript:void(0)">
          All Resourses
        </SideNavLink>
        <SideNavLink renderIcon={Archive32} href="javascript:void(0)">
          Bare Metal Server
        </SideNavLink>
        <SideNavLink renderIcon={VirtualMachine32} href="javascript:void(0)">
          Virtual Server for Classic
        </SideNavLink>
        <SideNavLink renderIcon={Vpn32} href="javascript:void(0)">
          Virtual Private Network
        </SideNavLink>
        <SideNavLink renderIcon={ObjectStorage32} href="javascript:void(0)">
          Object Storage
        </SideNavLink>
      </SideNavItems>
    </SideNav>
  );
};

export default SideBar;

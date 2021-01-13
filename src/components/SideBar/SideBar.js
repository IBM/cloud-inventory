import React from "react";
import { Link } from "react-router-dom";
import {
  SideNav,
  SideNavItems,
  SideNavLink,
} from "carbon-components-react/lib/components/UIShell";
import {
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
        <Link to="/">
          <SideNavLink renderIcon={QueryQueue32}>All Resourses</SideNavLink>
        </Link>
        <SideNavLink renderIcon={Archive32}>Bare Metal Server</SideNavLink>
        <Link to="/vsi/classic">
          <SideNavLink renderIcon={VirtualMachine32}>
            Virtual Server for Classic
          </SideNavLink>
        </Link>
        <SideNavLink renderIcon={Vpn32}>Virtual Private Network</SideNavLink>
        <SideNavLink renderIcon={ObjectStorage32}>Object Storage</SideNavLink>
      </SideNavItems>
    </SideNav>
  );
};

export default SideBar;

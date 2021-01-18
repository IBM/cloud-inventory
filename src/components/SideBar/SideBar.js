import React from "react";
import { Link } from "react-router-dom";
import {
  SideNav,
  SideNavMenu,
  SideNavItems,
  SideNavLink,
} from "carbon-components-react/lib/components/UIShell";
import { DataBase32, VirtualMachine32 } from "@carbon/icons-react";

const SideBar = () => {
  return (
    <SideNav aria-label="Side navigation" isRail>
      <SideNavItems>
        <SideNavMenu renderIcon={DataBase32} title="Classic Infrastructure">
          <Link to="/classic/vsi">
            <SideNavLink renderIcon={VirtualMachine32}>
              Virtual Server for Classic
            </SideNavLink>
          </Link>
          <Link to="/classic/bm">
            <SideNavLink renderIcon={VirtualMachine32}>Bare Metal</SideNavLink>
          </Link>
        </SideNavMenu>
        <SideNavMenu renderIcon={DataBase32} title="Virtual Private Cloud">
          <Link to="/vpc/overview">
            <SideNavLink renderIcon={VirtualMachine32}>
              VPC Overview
            </SideNavLink>
          </Link>
          <Link to="/vpc/vsi">
            <SideNavLink renderIcon={VirtualMachine32}>
              Virtual Server for VPC
            </SideNavLink>
          </Link>
        </SideNavMenu>
      </SideNavItems>
    </SideNav>
  );
};

export default SideBar;

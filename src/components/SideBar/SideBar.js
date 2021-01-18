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
        </SideNavMenu>
      </SideNavItems>
    </SideNav>
  );
};

export default SideBar;

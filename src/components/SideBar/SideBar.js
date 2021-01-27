import React from "react";
import { Link } from "react-router-dom";
import {
  SideNav,
  SideNavMenu,
  SideNavItems,
  SideNavLink,
} from "carbon-components-react/lib/components/UIShell";
import {
  DataBase32,
  VirtualMachine32,
  Table32,
  VirtualPrivateCloudAlt32,
  VirtualPrivateCloud32,
  Network_232,
} from "@carbon/icons-react";
/*import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Use of FontAwesome Icons
import {
  faNetworkWired,
} from "@fortawesome/free-solid-svg-icons";*/

const SideBar = () => {
  return (
    <SideNav aria-label="Side navigation" isRail>
      <SideNavItems>
        <SideNavMenu renderIcon={DataBase32} title="Classic Infrastructure">
          <Link to="/classic/vsi">
            <SideNavLink renderIcon={VirtualMachine32}>
              Virtual Server
            </SideNavLink>
          </Link>
          <Link to="/classic/bm">
            <SideNavLink renderIcon={Table32}>
              Bare Metal
            </SideNavLink>
          </Link>
        </SideNavMenu>
        <SideNavMenu
          renderIcon={VirtualPrivateCloudAlt32}
          title="Virtual Private Cloud"
        >
          <Link to="/vpc/overview">
            <SideNavLink renderIcon={VirtualPrivateCloud32}>
              VPCs
            </SideNavLink>
          </Link>
          <Link to="/vpc/vsi">
            <SideNavLink renderIcon={VirtualMachine32}>
              Virtual Server Instances
            </SideNavLink>
          </Link>
          <Link to="/vpc/subnet">
            <SideNavLink renderIcon={Network_232}> 
              {/*<FontAwesomeIcon icon={faNetworkWired} />*/} Subnet
            </SideNavLink>
          </Link>
        </SideNavMenu>
      </SideNavItems>
    </SideNav>
  );
};

export default SideBar;

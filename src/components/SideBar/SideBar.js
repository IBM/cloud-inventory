import React from "react";
import { Link, useLocation } from "react-router-dom";
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
  Home32,
  ModelAlt32,
  ObjectStorage32,
  CopyFile32,
  Archive32,
} from "@carbon/icons-react";

const SideBar = () => {
  const location = useLocation().pathname;
  const defaultExpanded = location === "/" ? true : false;
  return (
    <SideNav aria-label="Side navigation" isRail expanded={defaultExpanded}>
      <SideNavItems>
        <Link to="/">
          <SideNavLink
            renderIcon={Home32}
            aria-current={location === "/" ? "page" : ""}
          >
            Home
          </SideNavLink>
        </Link>
        <hr />
        <SideNavMenu
          title="Classic Infrastructure"
          renderIcon={DataBase32}
          defaultExpanded={defaultExpanded}
          isActive={location.includes("/classic/") ? true : false}
        >
          <Link to="/classic/vsi">
            <SideNavLink
              renderIcon={VirtualMachine32}
              aria-current={location.includes("/classic/vsi") ? "page" : ""}
            >
              Virtual Server
            </SideNavLink>
          </Link>
          <Link to="/classic/bm">
            <SideNavLink
              renderIcon={Table32}
              aria-current={location.includes("/classic/bm") ? "page" : ""}
            >
              Bare Metal
            </SideNavLink>
          </Link>
          <Link to="/classic/gateway">
            <SideNavLink
              renderIcon={Table32}
              aria-current={location.includes("/classic/gateway") ? "page" : ""}
            >
              Gateway Appliance
            </SideNavLink>
          </Link>
          {/* Bug */}
          <SideNavMenu
            title="Storage"
            renderIcon={Archive32}
            className="bx--side-nav__submenu-t1"
            defaultExpanded={defaultExpanded}
            isActive={location.includes("/classic/storage") ? true : false}
          >
            <Link to="/classic/storage/file">
              <SideNavLink
                renderIcon={CopyFile32}
                aria-current={
                  location.includes("/classic/storage/file") ? "page" : ""
                }
              >
                File Storage
              </SideNavLink>
            </Link>
            <Link to="/classic/storage/block">
              <SideNavLink
                renderIcon={ModelAlt32}
                aria-current={
                  location.includes("/classic/storage/block") ? "page" : ""
                }
              >
                Block Storage
              </SideNavLink>
            </Link>
            <Link to="/classic/storage/object">
              <SideNavLink
                renderIcon={ObjectStorage32}
                aria-current={
                  location.includes("/classic/storage/object") ? "page" : ""
                }
              >
                Object Storage
              </SideNavLink>
            </Link>
          </SideNavMenu>
          {/* Bug */}
        </SideNavMenu>
        <SideNavMenu
          title="Virtual Private Cloud"
          renderIcon={VirtualPrivateCloudAlt32}
          defaultExpanded={defaultExpanded}
          isActive={location.includes("/vpc/") ? true : false}
        >
          <Link to="/vpc/overview">
            <SideNavLink
              renderIcon={VirtualPrivateCloud32}
              aria-current={location.includes("/vpc/overview") ? "page" : ""}
            >
              VPCs
            </SideNavLink>
          </Link>
          <Link to="/vpc/vsi">
            <SideNavLink
              renderIcon={VirtualMachine32}
              aria-current={location.includes("/vpc/vsi") ? "page" : ""}
            >
              Virtual Server Instances
            </SideNavLink>
          </Link>
          <Link to="/vpc/subnet">
            <SideNavLink
              renderIcon={Network_232}
              aria-current={location.includes("/vpc/subnet") ? "page" : ""}
            >
              Subnet
            </SideNavLink>
          </Link>
        </SideNavMenu>
      </SideNavItems>
    </SideNav>
  );
};

export default SideBar;

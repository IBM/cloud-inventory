import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  SideNav,
  SideNavMenu,
  SideNavItems,
  SideNavLink,
} from "carbon-components-react/lib/components/UIShell";
import { Home32 } from "@carbon/icons-react";

import Menus from "./SideMenus";

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
        {Menus.map((menu) => {
          return (
            <SideNavMenu
              title={menu.title}
              renderIcon={menu.icon}
              defaultExpanded={defaultExpanded}
              isActive={location.includes(menu.path) ? true : false}
            >
              {menu.dropdowns.map((dropdown) => {
                return (
                  <Link to={dropdown.path}>
                    <SideNavLink
                      renderIcon={dropdown.icon}
                      aria-current={
                        location.includes(dropdown.path) ? "page" : ""
                      }
                    >
                      {dropdown.title}
                    </SideNavLink>
                  </Link>
                );
              })}
            </SideNavMenu>
          );
        })}
      </SideNavItems>
    </SideNav>
  );
};

export default SideBar;

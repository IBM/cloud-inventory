import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  SideNav,
  SideNavMenu,
  SideNavItems,
  SideNavLink,
} from "carbon-components-react/lib/components/UIShell";
import { Home32, DocumentExport32 } from "@carbon/icons-react";
import Services from "../../Services";

const SideBar = () => {
  const location = useLocation().pathname;
  const defaultExpanded = location === "/" ? true : false;
  return (
    <SideNav
      aria-label="Side navigation"
      className="teste"
      isRail
      expanded={defaultExpanded}
    >
      <SideNavItems className="bx--side-nav__items-top">
        <Link to="/">
          <SideNavLink
            renderIcon={Home32}
            aria-current={location === "/" ? "page" : ""}
          >
            Home
          </SideNavLink>
        </Link>
        <hr />
        {Services.map((menu) => {
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
      <SideNavItems className="bx--side-nav__items-bottom">
        <hr />
        <SideNavLink
          renderIcon={DocumentExport32}
          onClick={() => {
            console.log("click");
          }}
        >
          Export All
        </SideNavLink>
      </SideNavItems>
    </SideNav>
  );
};

export default SideBar;

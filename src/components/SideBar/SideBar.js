import React, { useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  SideNav,
  SideNavMenu,
  SideNavItems,
  SideNavLink,
} from "carbon-components-react/lib/components/UIShell";
import { Home32, DocumentExport32 } from "@carbon/icons-react";
import Categories from "../Categories";
import MultiExport from "../MultiExport";

const SideBar = () => {
  const location = useLocation().pathname;
  const exportRef = useRef(null);
  const defaultExpanded = location === "/" ? true : false;
  return (
    <>
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
          {Categories.map((category) => {
            return (
              <SideNavMenu
                title={category.title}
                renderIcon={category.icon}
                defaultExpanded={defaultExpanded}
                isActive={location.includes(category.path) ? true : false}
              >
                {category.services.map((service) => {
                  return (
                    <Link to={service.path}>
                      <SideNavLink
                        renderIcon={service.icon}
                        aria-current={
                          location.includes(service.path) ? "page" : ""
                        }
                      >
                        {service.title}
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
              exportRef.current.openExport();
            }}
          >
            Export All
          </SideNavLink>
        </SideNavItems>
      </SideNav>
      <MultiExport ref={exportRef} />
    </>
  );
};

export default SideBar;

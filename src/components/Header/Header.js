import React, { useState } from "react";
import AppSwitcher20 from "@carbon/icons-react/lib/app-switcher/20";
import {
  Header,
  HeaderName,
  HeaderGlobalAction,
  HeaderGlobalBar,
  HeaderNavigation,
  HeaderMenu,
  HeaderMenuItem,
} from "carbon-components-react/lib/components/UIShell";

const MyHeader = ({ accounts = [] }) => {
  const [currentAccount, setCurrentAccount] = useState(
    accounts.length === 0 ? "Select an Account" : accounts[0].name
  );

  return (
    <div className="container">
      <Header aria-label="IBM Platform Name">
        <HeaderName href="#" prefix="Cloud">
          Inventory
        </HeaderName>
        <HeaderNavigation aria-label="Header Links">
          <HeaderMenu
            aria-label="Current Account"
            menuLinkName={currentAccount}
          >
            {accounts.length === 0 ? (
              <HeaderMenuItem href="#">Added an Account</HeaderMenuItem>
            ) : (
              accounts.map(function (account, index) {
                return (
                  <HeaderMenuItem
                    key={index}
                    href="#"
                    onClick={(e) => {
                      setCurrentAccount(e.target.outerText);
                    }}
                  >
                    {account.name}
                  </HeaderMenuItem>
                );
              })
            )}
          </HeaderMenu>
        </HeaderNavigation>
        <HeaderGlobalBar>
          <HeaderGlobalAction aria-label="App Switcher" onClick={() => {}}>
            <AppSwitcher20 />
          </HeaderGlobalAction>
        </HeaderGlobalBar>
      </Header>
    </div>
  );
};

export default MyHeader;

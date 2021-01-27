import React, { useState, useEffect } from "react";
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
import { Link } from "react-router-dom";
import SideBar from "../SideBar";
import { IbmCloud32 } from "@carbon/icons-react";

const MyHeader = ({ accounts }) => {
  const [currentAccount, setCurrentAccount] = useState("");

  useEffect(() => {
    const featchAccount = async () => {
      const sessionAccount = JSON.parse(
        sessionStorage.getItem("currentAccount")
      );
      setCurrentAccount(
        sessionAccount ? sessionAccount.accountName : "Select an Account"
      );
    };
    featchAccount();
  });

  return (
    <div className="container">
      <Header aria-label="IBM Platform Name">
        <HeaderName href="#" prefix="">
          <IbmCloud32 className="iconcolor" /> <p className="texto">Cloud Inventory</p>
        </HeaderName>

        <HeaderGlobalBar>
          <HeaderNavigation aria-label="Header Links">
            <HeaderMenu
              aria-label="Current Account"
              menuLinkName={currentAccount}
            >
              {accounts &&
                accounts.map(function (account, index) {
                  return (
                    <HeaderMenuItem
                      key={index}
                      onClick={(e) => {
                        setCurrentAccount(e.target.outerText);
                        sessionStorage.setItem(
                          "currentAccount",
                          JSON.stringify(
                            accounts.find(
                              (account) =>
                                account.accountName === e.target.outerText
                            )
                          )
                        );
                      }}
                    >
                      {account.accountName}
                    </HeaderMenuItem>
                  );
                })}
              <Link to="/accounts" style={{ textDecoration: "none" }}>
                <HeaderMenuItem href="/accounts">Add an Account</HeaderMenuItem>
              </Link>
            </HeaderMenu>
          </HeaderNavigation>
          <HeaderGlobalAction aria-label="App Switcher" onClick={() => {}}>
            <AppSwitcher20 />
          </HeaderGlobalAction>
        </HeaderGlobalBar>

        <SideBar />
      </Header>
    </div>
  );
};

export default MyHeader;

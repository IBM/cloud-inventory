//Import Geral
import React, { useEffect, useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { Content } from "carbon-components-react/lib/components/UIShell";

//Import dos componentes
import Header from "./components/Header";
import Notification from "./components/Notifications";

//Import das paginas
import Home from "./pages/Home";
import Accounts from "./pages/Accounts";
import Categories from "./components/Categories";

//Import do CSS
import "./App.scss";

const { ipcRenderer } = window.require("electron");

// Controle para as rotas
// Se o usuario nao tiver nenhuma conta cadastrada no app
// ele é redirecionado para a pagina /accounts
const PrivateRoute = ({
  component: Component,
  title,
  headers,
  event,
  expansion,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) =>
      sessionStorage.getItem("currentAccount") ? (
        <Component
          {...props}
          title={title}
          headers={headers}
          eventName={event}
          expansion={expansion}
        />
      ) : (
        <Redirect
          to={{ pathname: "/accounts", state: { from: props.location } }}
        />
      )
    }
  />
);

const App = () => {
  const [accounts, setAccounts] = useState([]);

  //Busca os dados das contas
  useEffect(() => {
    const fetchAccounts = async () => {
      const accounts = await ipcRenderer.invoke("account:get", {
        log: "Getting accounts",
      });
      setAccounts(accounts);
      if (accounts.length !== 0) {
        sessionStorage.setItem("currentAccount", JSON.stringify(accounts[0]));
      }
    };
    fetchAccounts();
  }, []);

  //
  return (
    <div className="app">
      <Header accounts={accounts} />
      <Notification />
      <Content>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/accounts" component={Accounts} />
          {Categories.map((category) => {
            return category.services.map((service) => {
              return (
                <PrivateRoute
                  title={service.title}
                  headers={service.headers}
                  path={service.path}
                  event={service.event}
                  expansion={service.expansion}
                  component={service.component}
                />
              );
            });
          })}
        </Switch>
      </Content>
    </div>
  );
};

export default App;

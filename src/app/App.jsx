import "../styles/_app.scss";
import React from "react";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import MatxTheme from "./MatxLayout/MatxTheme/MatxTheme";
import AppContext from "./appContext";
import history from "history.js";
import routes from "./RootRoutes";
import Auth from "./auth/Auth";
import MatxLayout from "./MatxLayout/MatxLayout";
import AuthGuard from "./auth/AuthGuard";
import configureStore from "./camunda_redux/redux/configureStore";
import Snackbar from "./views/sessions/Snackbar";


const Store = configureStore();
const App = () => {

  return (
    <AppContext.Provider value={{ routes }}>
      <Provider store={Store}>
        <MatxTheme>
          <Auth>
            <Router  history={history}>
              <AuthGuard>
                <MatxLayout/>
              </AuthGuard>
            </Router>
              <Snackbar />
          </Auth>
        </MatxTheme>
      </Provider>
    </AppContext.Provider>
  );
};

export default App;

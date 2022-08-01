import "babel-polyfill";
import * as Keycloak from "keycloak-js";
import React, {useEffect} from "react";
import ReactDOM from "react-dom";
import "./_index.scss";
import * as serviceWorker from "./serviceWorker";
import App from "./app/App";
import jwtAuthService from "./app/services/jwtAuthService";
import './i18next'

const manifest_path = process.env.PUBLIC_URL + '/manifest.json'

fetch(manifest_path).then(
  function (res) {
    return res.json()
  }).then(resp => {
      console.log(resp)
      sessionStorage.setItem("proxy_url", resp.REACT_APP_PROXY)
  }
  ).catch(
    function (err) {
      console.log(err, 'error')
    }
  )

  const keycloakConfig = {
    url: process.env.REACT_APP_KEYCLOAK_URL,
    realm: process.env.REACT_APP_KEYCLOAK_REALM,
    clientId: process.env.REACT_APP_KEYCLOAK_CLIENTID,

};
const keycloak = new Keycloak(keycloakConfig);

keycloak.init({ onLoad: 'login-required'}).success((authenticated) => {

    if (!authenticated) {
        window.location.reload();
    } else {
        keycloak.loadUserInfo().then(resp=>{
            sessionStorage.setItem('jwt_token', keycloak.token);
            sessionStorage.setItem('userInfo', JSON.stringify(resp));
            let user = JSON.stringify(resp);
            sessionStorage.setItem('username', resp.username);
            // sessionStorage.setItem('role', resp.role);
            let val =jwtAuthService.loginWithEmailAndPassword(user,keycloak.token);
            val.then((resp) => {
                // document.body.style.zoom = "95%";
                ReactDOM.render(<App />, document.getElementById("root"));
            });

        });


    }


    sessionStorage.setItem('jwt_token', keycloak.token);
    sessionStorage.setItem("react-refresh-token", keycloak.refreshToken);


    setTimeout(() => {
        keycloak.updateToken(10000).success((refreshed) => {
            if (refreshed) {
                console.debug('Token refreshed' + refreshed);
            } else {
                console.warn('Token not refreshed, valid for '
                    + Math.round(keycloak.tokenParsed.exp + keycloak.timeSkew - new Date().getTime() / 1000) + ' seconds');
            }
        }).error(() => {
            console.error('Failed to refresh token');
        });


    }, 80000)

}).error(() => {
    console.error("Authenticated Failed");
});
// ReactDOM.render(<App />, document.getElementById("root"));
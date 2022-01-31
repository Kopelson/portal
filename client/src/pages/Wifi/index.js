import React from "react";
import Jumbotron from "../../components/Jumbotron";

import './styles.css';

function Wifi() {

  return (
    <div>
      <Jumbotron 
        title={"WiFi Access Points"}
      />
      <div className="wifi-container">
        <div className="wifi-card">
            <h1>Tenant</h1>
            <h2>SSID: Liberty Lake Portal Tenant</h2>
            <h2>WPA: portaltenant23403</h2>
        </div>
        <div className="wifi-card">
            <h1>Guest</h1>
            <h2>SSID: Liberty Lake Portal Guest</h2>
            <h2>WPA: portalguest</h2>
        </div>
      </div>
    </div>
  );
}

export default Wifi;
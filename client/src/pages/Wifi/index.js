import React from "react";

import './styles.css';

function Wifi() {

  return (
    <div>
        <h1>WiFi Access Points</h1>
      <div>
          <h1>Tenant:</h1>
          <h2>SSID: Liberty Lake Portal Tenant</h2>
          <h2>WPA: portaltenant23403</h2>
      </div>
      <div>
          <h1>Guest:</h1>
          <h2>SSID: Liberty Lake Portal Guest</h2>
          <h2>WPA: portalguest</h2>
      </div>
    </div>
  );
}

export default Wifi;
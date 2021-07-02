import React from "react";
import OutsideClickHandler from "react-outside-click-handler";

import { Modal, ModalBackground } from "../styles/Modal.styles";

function LocationSettings () {
  const [status, setStatus] = React.useState("");

  function getLocation () {
    if (!navigator.geolocation) {
      console.log("Geolocation not supported.");
    } else {
      navigator.geolocation.getCurrentPosition();
    }
  }

  return (
    <ModalBackground active="true">
      <OutsideClickHandler>
        <Modal active="true">
          <h2>Location Settings</h2>
          <p>Current Location: X</p>
          <div>
            <h4>Choose A New Location</h4>
            <p>- Search box - <button onClick={getLocation} type="button">➤</button></p>
          </div>
        </Modal>
      </OutsideClickHandler>
    </ModalBackground>
  );
}

export default LocationSettings;

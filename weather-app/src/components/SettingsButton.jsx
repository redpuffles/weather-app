import React from "react";

function SettingsButton (props) {
  return (
    <div>
      <button onClick={props.openSettings} type="button">Settings</button>
    </div>
  );
}

export default SettingsButton;

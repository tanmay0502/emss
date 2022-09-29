import React from "react";
import "./styles/ToggleSwitch.css";
  
const ToggleSwitch = ({ warehouseID, label, checked, onToggle }) => {
  return (
    <div className="container">
      <div className="toggle-switch" tabIndex={-1} onClick={()=>{console.log(warehouseID); onToggle(warehouseID)}}>
        <input type="checkbox" className="checkbox" 
               name={warehouseID} id={warehouseID} checked={checked} warehouseID={warehouseID} />
        <label className="label" htmlFor={warehouseID}>
          <span className="inner" />
          <span className="switch" />
        </label>
      </div>
    </div>
  );
};
  
export default ToggleSwitch;
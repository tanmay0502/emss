import React from "react";
import { useState } from "react";
const Footer = (props) => {
    const mystyle={
        fontFamily: 'Nunito Sans',
        fontStyle: "normal",
        fontWeight: "700",
        fontSize: "16px",
        color:"white",
        lineHeight: "29px",
    }
  return (
    <div
      className="p-1 flex absolute w-full "
      style={{ backgroundColor: "#357AA2" }}
    >
      <div className="absolute ml-5 mb-6 mt-5">
        <h2 style={mystyle} className="mt-3">
          EVM Management System
        </h2>
      </div>
      <div className="w-full">
        <h2 style={mystyle} className="mt-3 text-center">
          <a href="" className="text-white">
            User Manual
          </a>{" "}
          |{" "}
          <a href="" className="text-white">
            tech support
          </a>{" "}
          |{" "}
          <a href="" className="text-white">
            About EMS
          </a>{" "}
          |{" "}
          <a href="" className="text-white">
            Terms & Conditions
          </a>
        </h2>
        <br></br>
        <h2 style={mystyle} className="-mt-4 text-center ">
          <a href="" className="text-white">
            Privacy Policy
          </a>{" "}
          |{" "}
          <a href="" className="text-white">
            Usage Agreement
          </a>
        </h2>
        <h2 style={mystyle} className="text-center text-white">
          <p className="text-white">
            copyright@2022Election Commission of india
          </p>
        </h2>
      </div>
    </div>
  );
};

export default Footer;

import React from "react";
import { useState } from "react";
const Otp = (props) => {
  return (
    <div className="mobile-tab  place-content-center ">
      <input
        type="number"
        className="pl-3 pr-3 mt-7 h-12 text-black outline-none rounded-md w-full"
        placeholder="Enter OTP"
        value={props.OTP}
        onChange={(e) => {
          props.setOTP(e.target.value);
        }}
        style={{
          backgroundColor: " rgba(30, 76, 247, 0.1)",
          fontFamily: "Nunito sans",
        }}
      ></input>
      {props.invalidOTP != "" && <div className="text-red-500">{props.invalidOTP}</div>}
      {/* <button
        onClick={props.data}
        type="button"
        className="pl-3 pr-3 mt-7 h-12 outline-none rounded-md w-full text-white"
        style={{
          backgroundColor: "#F58220",
          fontFamily: "Nunito sans",
        }}
      >
        Verify OTP
      </button> */}
      <div className="mt-1 w-full text-right">
        <a href="#" className="text-right mr-1 w-full" >Resend OTP</a>
      </div>
    </div>
  );
}

export default Otp;
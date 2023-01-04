import React from "react";
import { useState } from "react";
import { AiOutlineEye, AiFillEyeInvisible } from 'react-icons/ai';
const Password = (props) => {
  const [passwordType, setPasswordType] = useState("password");
  const togglePassword =()=>{
    if(passwordType==="password")
    {
     setPasswordType("text")
     return;
    }
    setPasswordType("password")
  }
  return (
    <div className="mobile-tab  place-content-center ">
      {/* <p className="text-neutral-700 ml-2 -mb-2 mt-10">
        User ID:&nbsp; {props.user}
      </p> */}
      <div className="mt-7 h-12">
      <input
        type={passwordType}
        className="pl-3 pr-3 h-12 text-black outline-none rounded-md "
        placeholder="Enter password"
        value={props.password}
        disabled={props.OTP.length == 6 ? false : true}
        onChange={(e) => {
          props.setPassword(e.target.value);
        }}
        style={{
          backgroundColor: " rgba(30, 76, 247, 0.1)",
          fontFamily: "Nunito sans",
          width :'100%',
        }}
      ></input>
      <div  onClick={togglePassword} style={{width : "11%", scale: '2', justifyContent:"center", display:"flex", alignItems:"center",position:"relative",right:'-88%',top:"-60%"}}>
        {passwordType=="password"?<AiOutlineEye/>:<AiFillEyeInvisible/>}
      </div>
      </div>
      {props.invalidPassword != "" && (
        <div className="text-red-500">{props.invalidPassword}</div>
      )}

      <button
        onClick={props.data}
        type="button"
        className="pl-3 pr-3 mt-7 h-12 outline-none rounded-md w-full text-white"
        style={{
          backgroundColor: "#F58220",
          fontFamily: "Nunito sans",
        }}
      >
        Verify OTP and Password
      </button>
    </div>
  );
};

export default Password;

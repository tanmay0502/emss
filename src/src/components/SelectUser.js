import React from "react";
import { useState } from "react";
const SelectUser = (props) => {

  const users=props.userIDs;
  if(users.lenght==1){
    props.user(users[0]);
  }
  return (
    <>
      <div className="dropdown">
        <p
          for="position"
          className="text-black ml-2 -mb-6"
          style={{ fontFamily: "Nunito sans" }}
        >
          {users.length>1 &&"Select"} UserID
        </p>
        {users.length==1 && (<>
          <input
          className="pl-3 pr-3 mt-7 h-12 text-black outline-none rounded-md w-full mb-5"
          style={{ fontFamily: "Nunito sans" }}
          value={users[0]}
          >
          </input>
        </>)}
        {users.length>1 && 
        <select
          className="pl-3 pr-3 mt-7 h-12 text-black outline-none rounded-md w-full mb-5"
          style={{ fontFamily: "Nunito sans" }}
          name="position"
          // value={props.userID}
          onChange={(e) => props.user(e.target.value)}
        >
          <option value="0" className="text-black">
            Select:
          </option>

          {users.map((value) => (
            
              <option value={value} className="text-black ">
                {value}
              </option>
            
          ))}
        </select>
        }
      </div>
    </>
  );
};

export default SelectUser;

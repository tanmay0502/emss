import React, {ReactComponent} from "react";
import { useState, useEffect } from "react";
import {AiOutlineArrowLeft, AiOutlineEdit} from 'react-icons/ai'

function UserDetail(props) {
    const myFont = {
      fontFamily: "Nunito Sans",
      fontStyle: "normal",
      fontWeight: "800",
      fontSize: "19px",
      lineHeight: "35px",
    };
    const myFont2 = {
      fontFamily: "Nunito Sans",
      fontStyle: "normal",
      fontWeight: "500",
      fontSize: "19px",
      lineHeight: "35px",
      color:"black"
    };
    console.log(props.detail)
    return (
      <div className="user-details">
        <div className="flex justify-between">
              <button
                className="flex justify-center rounded-full aspect-square "
                onClick={props.close}
                style={{"background" : "#84587C", color: "white"}}
              >
                <AiOutlineArrowLeft />
              </button>
              <button
                className="flex justify-center rounded-full aspect-square "
                style={{"background" : "#16c09861", color: "#008767"}}
                // onClick={props.close}
              >
                <AiOutlineEdit />
              </button>
            </div>
        <div className="rounded-full  justify-center flex ">
          <img
            src="/template_0.webp"
            className="w-1/6"
            style={{ borderRadius: "50%" }}
          ></img>
        </div>
        {props.detail && (
          <div className="w-full px-2 py-8">
            <div className="user-details-grid">
                
                  <b>User ID : </b>
                  <p className="text-md">
                    {props.detail[0]}
                  </p>

                  <b>Status : </b>
                  <p className="text-md">
                    {props.detail[7] === "A" ? "Active" : "Inactive"}
                  </p>
                
                  <b>User Name : </b>
                  <p className="text-md">
                    {props.detail[2]}
                  </p>
                
                  <b>Mobile : </b>
                  <p className="text-md">
                    {props.detail[3]}
                  </p>

                  <b>Created By : </b>
                  <p className="text-md">
                    {props.detail[10]}
                  </p>

                  <b>Email : </b>
                  <p className="text-md">
                    {props.detail[1]}
                  </p>
                
                  <b>Alt Number 1 :</b>
                  <p className="text-md">
                    {props.detail[5]}
                  </p>

                  <b>Address : </b>
                  <p className="text-md">
                    {props.detail[4]}
                  </p>
                
              </div>
            </div>
        )}
      </div>
    );
}
export default UserDetail;

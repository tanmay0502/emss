import React from "react";
import { useState, useEffect } from "react";

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
      <div className="bg-white w-full p-6">
        <div className="rounded-full  justify-center flex ">
          <img
            src="/template_0.webp"
            className="w-1/5"
            style={{ borderRadius: "50%" }}
          ></img>
        </div>
        {props.detail && (
          <div className="w-full">
            <div className="flex w-full justify-between">
              <div className="w-2/5 ">
                <div className="m-2 text-left p-2 rounded-md text-black w-full">
                  <p className="font-bold">User Id </p>
                  <p className="mt-1 text-lg tracking-widest">
                    {props.detail[0]}
                  </p>
                </div>
                <div className="m-2 text-left p-2 rounded-md text-black w-full">
                  <p className="font-bold">User Name </p>
                  <p className="mt-1 text-lg tracking-widest">
                    {props.detail[2]}
                  </p>
                </div>
                <div className="m-2 text-left p-2 rounded-md text-black w-full">
                  <p className="font-bold">Address </p>
                  <p className="mt-1 text-lg tracking-widest">
                    {props.detail[4]}
                  </p>
                </div>
                <div className="m-2 text-left p-2 rounded-md text-black w-full">
                  <p className="font-bold">Alternate Number 2 </p>
                  <p className="mt-1 text-lg tracking-widest">
                    {props.detail[6]}
                  </p>
                </div>
                <div className="m-2 text-left p-2 rounded-md text-black w-full">
                  <p className="font-bold">Created By </p>
                  <p className="mt-1 text-lg tracking-widest">
                    {props.detail[10]}
                  </p>
                </div>
              </div>
              <div className="w-2/5">
                <div className="m-2 text-left p-2 rounded-md text-black w-full">
                  <p className="font-bold">Email Id </p>
                  <p className="mt-1 text-lg tracking-widest">
                    {props.detail[1]}
                  </p>
                </div>
                <div className="m-2 text-left p-2 rounded-md text-black w-full">
                  <p className="font-bold">Mobile Number </p>
                  <p className="mt-1 text-lg tracking-widest">
                    {props.detail[3]}
                  </p>
                </div>
                <div className="m-2 text-left p-2 rounded-md text-black w-full">
                  <p className="font-bold">Alternate Number 1</p>
                  <p className="mt-1 text-lg tracking-widest">
                    {props.detail[5]}
                  </p>
                </div>
                <div className="m-2 text-left p-2 rounded-md text-black w-full">
                  <p className="font-bold">Type </p>
                  <p className="mt-1 text-lg tracking-widest">
                    {props.detail[7]}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              <button
                className="flex justify-end  rounded-full "
                onClick={props.close}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    );
}
export default UserDetail;

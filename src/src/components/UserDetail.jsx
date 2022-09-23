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
        <div className="flex justify-end">
        <button className="flex justify-end  rounded-full "
        onClick={props.close}
        >Close</button>
        </div>
        <p className="w-full text-center text-xl underline font-bold mb-6">
          User Detail
        </p>
        {props.detail && (
          <div className="w-full">
            <div className="flex justify-between">
              <div className="w-2/3">
                <table border="1" className="w-full">
                 
                  <tr className="text-center">
                    <td
                      className="text-lg bg-blue-400 text-white rounded-md font-extrabold"
                      style={myFont}
                    >
                      User Id:
                    </td>
                    <td
                      className="text-lg "
                      style={myFont2}
                    >
                      {props.detail[0]}
                    </td>
                  </tr>
                  <br></br>
                  <tr className="text-center">
                    <td
                      className="text-lg bg-blue-400 text-white rounded-md font-extrabold"
                      style={myFont}
                    >
                      Email:
                    </td>
                    <td
                      className="text-lg "
                      style={myFont2}
                    >
                      {props.detail[1]}
                    </td>
                  </tr>
                  <br></br>
                  <tr className="text-center">
                    <td
                      className="text-lg bg-blue-400 text-white rounded-md font-extrabold"
                      style={myFont}
                    >
                      User Name:
                    </td>
                    <td
                      className="text-lg "
                      style={myFont2}
                    >
                      {props.detail[2]}
                    </td>
                  </tr>
                  <br></br>
                  <tr className="text-center">
                    <td
                      className="text-lg bg-blue-400 text-white rounded-md font-extrabold"
                      style={myFont}
                    >
                      Mobile Number:
                    </td>
                    <td
                      className="text-lg "
                      style={myFont2}
                    >
                      {props.detail[3]}
                    </td>
                  </tr>
                  <br></br>
                  <tr className="text-center">
                    <td
                      className="text-lg bg-blue-400 text-white rounded-md font-extrabold"
                      style={myFont}
                    >
                      Address:
                    </td>
                    <td
                      className="text-lg "
                      style={myFont2}
                    >
                      {props.detail[4]}
                    </td>
                  </tr>
                  <br></br>
                  <tr className="text-center">
                    <td
                      className="text-lg bg-blue-400 text-white rounded-md font-extrabold"
                      style={myFont}
                    >
                      Alternate Number:
                    </td>
                    <td
                      className="text-lg "
                      style={myFont2}
                    >
                      {props.detail[5]}
                    </td>
                  </tr>
                  <br></br>
                  <tr className="text-center">
                    <td
                      className="text-lg bg-blue-400 text-white rounded-md font-extrabold"
                      style={myFont}
                    >
                      Alternate Number:
                    </td>
                    <td
                      className="text-lg "
                      style={myFont2}
                    >
                      {props.detail[6]}
                    </td>
                  </tr>
                  <br></br>
                  <tr className="text-center">
                    <td
                      className="text-lg bg-blue-400 text-white rounded-md font-extrabold"
                      style={myFont}
                    >
                      Type:
                    </td>
                    <td
                      className="text-lg "
                      style={myFont2}
                    >
                      {props.detail[7]}
                    </td>
                  </tr>
                  <br></br>
                  <tr className="text-center">
                    <td
                      className="text-lg bg-blue-400 text-white rounded-md font-extrabold"
                      style={myFont}
                    >
                      Created By:
                    </td>
                    <td
                      className="text-lg "
                      style={myFont2}
                    >
                      {props.detail[10]}
                    </td>
                  </tr>
                  
                </table>

               
              </div>
              <div className="">
                <img src="https://picsum.photos/300" className="mt-6"></img>
              </div>
            </div>
          </div>
        )}
      </div>
    );
}
export default UserDetail;

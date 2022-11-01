import React, { ReactComponent } from "react";
import { useState, useEffect } from "react";
import { AiOutlineArrowLeft, AiOutlineEdit } from 'react-icons/ai'

function Profile(props) {


  const [editPic, setEditPic] = useState(0)

  function editProfile() {
    setEditPic(editPic ^ 1);
  }


  const myFont = {
    fontFamily: "Nunito Sans",
    fontStyle: "normal",
    fontWeight: "800",
    fontSize: "13px",
    lineHeight: "35px",
  };
  const myFont2 = {
    fontFamily: "Nunito Sans",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "15px",
    lineHeight: "35px",
    color: "black"
  };
  console.log(props.detail)
  return (
    <div className="myWrapper">
      <h4>
        Welcome, {props.detail[2]}
      </h4>
      <div className="rounded-full justify-center flex " style={{position: "relative"}}>
        {editPic == 0 && (<><img
          src="/template_0.webp"
          className="w-1/6"
          style={{ borderRadius: "50%" }}
        />
          <button3
            className="text-white bottom-16 z-index-10 bg-blue-800 p-3 rounded-full h-10 cursor-pointer -ml-10"
            onClick={editProfile}
            type="input"
            style={{ "position": "relative", "bottom" : "0", "right" : "0" }}
          >
            <AiOutlineEdit />
          </button3>
        </>
        )}
        {editPic == 1 && (

          <div>
            <p2 className="font-bold">Choose Your Image</p2>
            <div className="ml-6 text-sm mt-4" style={{ width: "80%" }}>
              <input type="file" required />
            </div>
            <div className="flex justify-between mt-5 mb-7">
              <button3 onClick={editProfile} className="bg-red-600 cursor-pointer text-white p-2 rounded-lg">Cancel</button3>
              <button3 onClick={editProfile} className="bg-green-600 cursor-pointer text-white p-2 pl-4 pr-4 rounded-lg">Set</button3>
            </div>
            <hr />
          </div>
        )}
      </div>
      {props.detail && (
        <div className="w-full">
          <div className="flex w-full justify-center">
            <div className="w-2/5 ">
              <div className="m-2 text-left p-2 rounded-md text-black w-full">
                <p className="font-bold">User Id </p>
                <p className="mt-1 text-lg tracking-widest">
                  {/* {props.detail[0]} */}
                  {sessionStorage.getItem('sessionToken')}
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
        </div>
      )}
    </div>
  );
}
export default Profile;
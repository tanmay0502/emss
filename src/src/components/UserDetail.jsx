import React, { ReactComponent } from "react";
import { useState, useEffect } from "react";
import { AiOutlineArrowLeft, AiOutlineEdit } from 'react-icons/ai'

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
    color: "black"
  };
  console.log(props.detail)

  const [editPic, setEditPic] = useState(0)

  function editProfile() {
    setEditPic(editPic ^ 1);
  }

  const ResetPassword = async () => {
    const userId = props.detail[0];

    if (window.confirm("Are you suer you want to reset password for this user ? ")) {
      try {
        const response = await fetch(
          `http://evm.iitbhilai.ac.in:8100/user/resetPassword/${userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            mode: "cors"
          }
        )
        const msg = await response.json();
        if (msg['message'] = 'Password reset successfully') {
          alert(msg['message']);
          window.location = window.location.href;
        }
        else {
          alert('Error in resetting password, Please try again');
        }
      } catch (error) {
        console.log(error)
      }
    }
  }


  return (
    <div className="user-details">
      <div className="flex justify-between">
        <button
          className="flex justify-center rounded-full aspect-square "
          onClick={props.close}
          style={{ "background": "#84587C", color: "white" }}
        >
          <AiOutlineArrowLeft />
        </button>
        <div className=" flex justify-between">
          <div className="right_btn" onClick={() => ResetPassword()}>
            Reset Password
          </div>
          {/* <button
            className="flex justify-center rounded-full aspect-square "
            style={{ "background": "#16c09861", color: "#008767" }}
          // onClick={props.close}
          >
            <AiOutlineEdit />
          </button> */}
        </div>
      </div>
      <div className="rounded-full justify-center flex " style={{ position: "relative" }}>
        {editPic == 0 && (<><img
          src="/template_0.webp"
          className="w-1/6"
          style={{ borderRadius: "50%" }}
        />
          <button3
            className="text-white bg-green-600 bottom-16 z-index-10  p-3  h-10 cursor-pointer -ml-10 flex justify-center rounded-full aspect-square"
            onClick={editProfile}
            type="input"
            style={{ "position": "relative", "bottom": "0", "right": "0", color: "#008767" }}
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
      {/* <div className="rounded-full  justify-center flex ">
        <img
          src="/template_0.webp"
          className="w-1/6"
          style={{ borderRadius: "50%" }}
        ></img>
      </div> */}
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

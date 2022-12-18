import React, { ReactComponent } from "react";
import { useState, useEffect } from "react";
import { AiOutlineArrowLeft, AiOutlineEdit } from 'react-icons/ai'
import { useNavigate } from "react-router-dom";

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
    const userId = props.detail["userid"];

    if (window.confirm("Are you sure you want to reset password for this user?")) {
      // let token = localStorage.getItem("token");
      // const access_token = JSON.parse(token)["access_token"];
        const response = await fetch(
          `${process.env.REACT_APP_API_SERVER}/user/resetPassword`,
          {
            method: "POST",
            credentials:"include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({"userID":userId}),
          }
        )
        const msg = await response.json();
        console.log(msg)
        // if (msg['message'] = 'Password reset successfully') {
        //   alert(msg['message']);
        //   window.location = window.location.href;
        // }
        // else {
        //   alert('Error in resetting password, Please try again');
        // }
    }
  }


  const [baseImage, setBaseImage ] = useState("")

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);

        fileReader.onload = () => {
            resolve(fileReader.result);
        }

        fileReader.onerror = (error) => {
            reject(error);
        }
    })
}


  const uploadImage = async (e) =>{
    const files = e.target.files;
    console.log(files)
    const file = e.target.files[0];
    const fullFileName = file.name;
    console.log(fullFileName)
    const convertedFile = await convertBase64(file);
    setBaseImage(convertedFile)
   
}
console.log(baseImage)

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
          <div className="right_btn" onClick={() => {props.editPage()}}>
            Edit User
          </div>
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
          style={{borderRadius: "50%"}}
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
            <p2 className="font-bold">Choose Your Imagee</p2>
            <div className="ml-6 text-sm mt-4" style={{ width: "80%" }}>
            <input
                  type="file"
                  required
                  onChange={(e) => {
                    uploadImage(e);
                }}
            ></input>
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
              {props.detail["userid"]}
            </p>

            <b>Status : </b>
            <p className="text-md">
              {props.detail["active"] === "A" ? "Active" : "Inactive"}
            </p>

            <b>User Name : </b>
            <p className="text-md">
              {props.detail["name"]}
            </p>

            <b>Mobile : </b>
            <p className="text-md">
              {props.detail["mobilenumber"]}
            </p>

            <b>Created By : </b>
            <p className="text-md">
              {props.detail[10]}
            </p>

            <b>Email : </b>
            <p className="text-md">
              {props.detail["email"]}
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

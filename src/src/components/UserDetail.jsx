import React from "react";
import { useState, useEffect } from "react";
import { AiOutlineArrowLeft, AiOutlineEdit } from 'react-icons/ai'
import UserImageTest from '../assets/UserImageTest.png'
import { useNavigate } from "react-router-dom";
function UserDetail(props) {
  const navigate = useNavigate()
  const [editPic, setEditPic] = useState(0)
  const [currImage, setCurrImage] = useState(0)
  const [uploadPending, setUploadPending] = useState(0)
  
  
  function editProfile() {
    setEditPic(editPic ^ 1);
  }

    async function getCurrImage(id) {
        try {
            const response = await fetch(
                `${process.env.REACT_APP_API_SERVER}/user/profilepicture`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: 'include',
                    body: JSON.stringify({
                      "userID": id
                    }),
                    // mode: "cors"
                }
                
            );
            const data = await response.json();
            if (response.status === 200) {
                if(data["data"] !== undefined){
                  setCurrImage(data["data"])
                }else{
                  setCurrImage(UserImageTest)
                }
            }else if(response.status === 404){
              setCurrImage(UserImageTest)
            }
        } catch (err) {
            console.log({ err });
        }
    }

    async function submitImage() {
      try {
        console.log(currImage)
          const response = await fetch(
            `${process.env.REACT_APP_API_SERVER}/user/ModifyUserDetails`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              credentials: 'include',
              body: JSON.stringify({
                "userID": props.detail["userid"],
                "photoFileData":  currImage,
              })
            }
              
          );
          const data = await response.json();
          if (response.status === 200) {
              setCurrImage(data["data"])
          }
      } catch (err) {
          console.log({ err });
      }
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
    }
  }



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
    setCurrImage(convertedFile)
    setUploadPending(1);

}


useEffect(() => {
  getCurrImage(props.detail["userid"]);
}, );

useEffect(() => {
  if(uploadPending == 1){
    console.log("Image submitting")
    submitImage()
  }
}, [uploadPending]);


  return (
    <div className="user-details">
      <div className="flex justify-between">
        <button
          className="flex justify-center rounded-full aspect-square "
          onClick={() => {           
            const URL = window.location.href;
            const arr = URL.split("/");
            const param = arr[arr.length - 1];
            const arr1 = param.split("/");
            if(arr1[0] === "usermanagement"){
              return window.location.reload()
            }else{
              navigate("/session/home")
            }
            
          }
          
          }
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
        </div>
      </div>
      <div className="rounded-full justify-center flex " style={{ position: "relative" }}>
        {editPic === 0 && (<>
        <img
          src={currImage !== null ? currImage : UserImageTest}
          className="w-1/6 pt"
          style={{borderRadius: "50%", height:"200px", width:"200px"}}
          alt="img"
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
        {editPic === 1 && (

          <div>
            <p2 className="font-bold">Choose Your Image</p2>
            <div className="ml-6 text-sm mt-4" style={{ width: "80%" }}>
            <input
                  type="file"
                  required
                  accept="image/png" 
                  onChange={(e) => {
                    uploadImage(e);
                }}
            ></input>
            </div>
            <div className="flex justify-between mt-5 mb-7">
              <button3 onClick={editProfile} className="bg-red-600 cursor-pointer text-white p-2 rounded-lg">Cancel</button3>
              <button3 onClick={() =>{editProfile()}} className="bg-green-600 cursor-pointer text-white p-2 pl-4 pr-4 rounded-lg">Set</button3>
            </div>
            <hr />
          </div>
        )}
      </div>

      {props.detail && (
        <div className="w-full px-2 py-8">
          <div className="user-details-grid !mx-16">

            <b className="pt-1">User ID : </b>
            <p className="text-md">
              {props.detail["userid"]}
            </p>

            <b className="pt-1">Status : </b>
            <p className="text-md">
              {props.detail["active"] === "A" ? "Active" : "Inactive"}
            </p>

            <b className="pt-1">User Name : </b>
            <p className="text-md">
              {props.detail["name"]}
            </p>

            <b className="pt-1">Mobile : </b>
            <p className="text-md">
              {props.detail["mobilenumber"]}
            </p>

            <b className="pt-1">Created By : </b>
            <p className="text-md">
              {props.detail[''] !== undefined ? props.detail[5] : "Not Available"}
            </p>

            <b className="pt-1">Email : </b>
            <p className="text-md">
              {props.detail["email"]}
            </p>

            <b className="pt-1">Alt Number 1 :</b>
            <p className="text-md">
              {props.detail[5] !== undefined ? props.detail[5] : "Not Available"}
            </p>

            <b className="pt-1">Address : </b>
            <p className="text-md">
              {props.detail["address"]}
            </p>

          </div>
        </div>
      )}
    </div>
  );
}
export default UserDetail;

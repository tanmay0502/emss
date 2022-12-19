import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { ReactComponent as Createuser } from "../../assets/CreateUser.svg";
import "./styles/createuser.css";
import styles from "./styles/createuser.css";
import 'antd/dist/antd.css'
import { Switch } from "antd"
import {getKeyByValue} from '../../assets/helper/ObjectHelpers.js'
import { getBase64 } from "../../assets/helper/FileHelpers";

function EditUser(props) {

  const navigate = useNavigate()

  const [isTemporary, setIsTemporary] = useState(false);
  const [userID, setUserID] = useState("");
  const [photoFileName, setPhotoFileName] = useState("")
  const [photoFileData, setPhotoFileData] = useState("")
  const [details, setDetails] = useState({})

  useEffect(() => {
    

    setDetails(props.userdata)
  
    return () => {
      
    }
  }, [])

  const onFormSubmit = async (e) => {
    e.preventDefault();

    modUser(); // Perform API Call here
  };

  const toggler = () => {

    isTemporary ? setIsTemporary(false) : setIsTemporary(true);
    document.getElementById("formUserEmail").value = '';
    document.getElementById("formUserName").value = '';
    document.getElementById("formUserMobileNumber").value = '';
    document.getElementById("formUserAddress").value = '';
    document.getElementById("formUserAltNumber1").value = '';
    document.getElementById("formUserAltNumber2").value = '';
    document.getElementById("formUserImage").value = '';
    document.getElementById("input_Roles").value = '';
    document.getElementById("input_PC").value = '';
    document.getElementById("input_AC").value = '';

  }

  function ValidateEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return (true)
    }
    alert("You have entered an invalid email address!")
    return (false)
  }

  function validate_number(MobNumber) {
    const regex = new RegExp(
      '^\\d{10}$'
    );

    if (regex.test(MobNumber))
      return true
    else {
      alert("Invalid mobile number.")
      return false
    }
  }

  async function getUser() {
		try {
      const response = await fetch(
				`${process.env.REACT_APP_API_SERVER}/user/listAllUsers`,
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						// 'Authorization': 'Bearer ' + access_token,
					},
          credentials: 'same-origin',
					mode: "cors"
				}
			);
		  const tmp = await response.json();
      const data2 = tmp[0]
		  // console.log(data2);
		  if( data2["data"] ){
			  // console.log("helo")
				for(let i=0;i<data2["data"].length;i++){
					// console.log(data2["data"][i][0])
					if(data2["data"][i][0]==window.location.pathname.split("=")[1]){
						setDetails(data2["data"][i]);
            console.log(data2["data"][i])
						break;
					}
				}
		  }
		} catch (err) {
		  console.log(err);
		}
	  }

  async function modUser() {

    // console.log("HELLOOOOOOo")
    console.log(userID)
    if (ValidateEmail(document.getElementById("formUserEmail").value) == false) {
      document.getElementById("formUserEmail").value = ''
      return;
    }
    else if (validate_number(document.getElementById("formUserMobileNumber").value) == false) {
      document.getElementById("formUserMobileNumber").value = ''
      return;
    }
    if (document.getElementById("formUserAltNumber1").value != '') {
      if (!validate_number(document.getElementById("formUserAltNumber1").value)) {
        document.getElementById("formUserAltNumber1").value = ''
        return;
      }

    }
    if (document.getElementById("formUserAltNumber2").value != '') {
      if (!validate_number(document.getElementById("formUserAltNumber2").value)) {
        document.getElementById("formUserAltNumber2").value = ''
        return;
      }

    }
    
        const bodyData = {
          userID: details["userid"],
          email: document.getElementById("formUserEmail").value,
          name: document.getElementById("formUserName").value,
          mobileNumber: document.getElementById("formUserMobileNumber").value,
          address: document.getElementById("formUserAddress").value,
          otherContactNum1: document.getElementById("formUserAltNumber1").value,
          otherContactNum2: document.getElementById("formUserAltNumber2").value,
          photoFilename: photoFileName,
          photoFileData: photoFileData
          // createdBy: window.sessionStorage.getItem("sessionToken")
        }

        const response = await fetch(
          `${process.env.REACT_APP_API_SERVER}/user/ModifyUserDetails`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              // 'Authorization': 'Bearer ' + access_token,
            },
            credentials: 'include',
            body: JSON.stringify(bodyData),

          }
        );

        console.log(bodyData);
        console.log(response);
        const data2 = await response.json();
        console.log(data2);
        if (response.status === 200) {
          alert("User Modified Successfully");
          window.location.pathname = "/session/usermanagement";
          document.getElementById("createUserForm").reset();
        } else {
          alert("Unable to Modify User.");
        }
     
    }
  

  return (
    <div className="flex-col justify-center align-middle">
      <form
        id="create-User-form"
        className="myForm"
        onSubmit={onFormSubmit}
      >
        <div className="PageTitle">
          <h4>
            <button
              className="flex justify-center rounded-full aspect-square "
              onClick={() => {
                // window.location.pathname = "/session/usermanagement"
                window.location.reload()
              }}
              style={{ "background": "#84587C", color: "white" }}
            >
              <AiOutlineArrowLeft />
            </button>
            <Createuser />
            <span>Edit User</span>
          </h4>
        </div>
        {/* <div className="userTemporaryToggle">
          <span className={isTemporary ? styles.inactive : styles.active}>Permanent </span>
          <Switch onClick={toggler} />
          <span className={isTemporary ? styles.active : styles.inactive}>Temporary </span>
        </div> */}

        <div className="five-column-grid">
        <div className="form_label">
            <label htmlFor="">User ID:<span className="text-red-500 text-lg">*</span></label>
          </div>
          <div className="form_group">
            <div className="form_input">
              <input
              type={"text"}
                disabled={true}
                required
                name=""
                id="input_userid"
                defaultValue={details["userid"]}
              />
            </div>
          </div>

          <div className="form_label">
            <label htmlFor="">Name:<span className="text-red-500 text-lg">*</span></label>
          </div>
          <div className="form_group">
            <div className="form_input">
              <input
                required
                id="formUserName"
                type={"text"}
                step="any"
                name=""
                className=""
                placeholder="Full Name"
                defaultValue={details["name"]}
              />
            </div>
          </div>

          <div className="form_label">
            <label htmlFor="">Email Address:<span className="text-red-500 text-lg">*</span></label>
          </div>
          <div className="form_group">
            <div className="form_input">
              <input
                required
                id="formUserEmail"
                type={"text"}
                step="any"
                name=""
                className=""
                placeholder="Email Address"
                defaultValue={details["email"]}
              />
            </div>
          </div>

          <div className="form_label">
            <label htmlFor="">Mobile Number:<span className="text-red-500 text-lg">*</span></label>
          </div>
          <div className="form_group">
            <div className="form_input">
              <input
                required
                id="formUserMobileNumber"
                type="number"
                step="any"
                name=""
                className=""
                placeholder="00000 00000"
                defaultValue={details["mobilenumber"]}
              />
            </div>
          </div>

          <div className="form_label">
            <label htmlFor="">Alt Contact 1:</label>
          </div>
          <div className="form_group">
            <div className="form_input">
              <input
                id="formUserAltNumber1"
                type="number"
                step="any"
                name=""
                className=""
                placeholder="00000 00000"
                defaultValue={details["mobilenumber"]}
              />
            </div>
          </div>

          <div className="form_label">
            <label htmlFor="">Alt Contact 2:</label>
          </div>
          <div className="form_group">
            <div className="form_input">
              <input
                id="formUserAltNumber2"
                type="number"
                step="any"
                name=""
                className=""
                placeholder="00000 00000"
                defaultValue={details["mobilenumber"]}
              />
            </div>
          </div>

          <div className="form_label">
            <label htmlFor="">Address:<span className="text-red-500 text-lg">*</span></label>
          </div>
          <div className="form_group">
            <div className="form_input">
              <input
                required
                id="formUserAddress"
                type={"text"}
                step="any"
                name=""
                className=""
                placeholder="Address"
                defaultValue={details["address"]}
              />
            </div>
          </div>


          <div className="form_label">
            <label htmlFor="">User Image:
              {isTemporary ? <span className="text-red-500 text-lg">*</span> : <span></span>}
            </label>
          </div>
          <div className="form_group">
            <input
              id="formUserImage"
              required={isTemporary}
              type="file"
              placeholder="Choose Image (Upto 5 MB)"
              accept="image/*"
              onChange={async (e)=>{
                setPhotoFileName(e.target.value.replace(/^.*[\\\/]/, ''))
                setPhotoFileData(await getBase64(e.target.files[0]))
              }}
            />
          </div>
        </div>

        <center>
          <input type={"submit"} className="mySubmit">
          </input>
        </center>


      </form >
    </div >
  );
}

export default EditUser;
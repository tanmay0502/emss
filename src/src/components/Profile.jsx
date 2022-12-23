import React, { ReactComponent } from "react";
import { useState, useEffect } from "react";
import { AiOutlineArrowLeft, AiOutlineEdit } from 'react-icons/ai'
import UserDetail from "./UserDetail";
import './styles/UserList.css'

function Profile() {
  const Id = () => {
    const URL = window.location.href;
    const arr = URL.split("/");
    const param = arr[arr.length - 1];
    const arr1 = param.split("/");
    return arr1[0];
  }
  const [users, setUsers] = useState([])
  const [profileData, setProfileData] = useState({})

  async function getUser() {
		try {
			const response = await fetch(
				`${process.env.REACT_APP_API_SERVER}/user/getSubordinateUsers`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					credentials: 'include'
				}
			);
			const tmp = await response.json();
			console.log({ tmp })
			setUsers(tmp["users"]);

		} catch (err) {
			console.log(err);
		}
	}

	useEffect(() => {
		getUser();
	}, []);
  console.log(users)

	useEffect(() => {
	  for (var user in users){
      if(users[user]["userid"]=== Id()){
        setProfileData(users[user])
      }
    }
	}, [users]);

return(
  <>
  <div className="myWrapper">
  <UserDetail detail={profileData}/>
  </div>
  
  </>
)
}
export default Profile;

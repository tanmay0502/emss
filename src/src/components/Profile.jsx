import React, { ReactComponent } from "react";
import { useState, useEffect } from "react";
import { AiOutlineArrowLeft, AiOutlineEdit } from 'react-icons/ai'
import UserDetail from "./UserDetail";
import './styles/UserList.css'
import EditUser from '../pages/user_management/EditUser';

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
  const [isDetail, setIsDetail] = useState(0);
  const [isEdit, setIsEdit] = useState(0);


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
			setUsers(tmp["data"]["users"]);

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


	function editPage() {
		setIsEdit(1)
		setIsDetail(0)
	}


return(
  <>
  <div className="myWrapper">

  	
	  {
					isEdit == 1 ? <EditUser userdata={profileData} />
						:
						<UserDetail detail={profileData} editPage={editPage}/>

				}
  </div>
  
  </>
)
}
export default Profile;

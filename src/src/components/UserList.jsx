import React from 'react'
import { useState, useEffect } from "react";
import './styles/UserList.css'

function UserList() {

  const [users, setUsers] = useState([]);
  async function getUser() {
    try {
      const response = await fetch(
        "http://evm.iitbhilai.ac.in:8100/usermgt/listAllUsers",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data2 = await response.json();
      console.log(data2);
      setUsers(data2["data"]);
    } catch (err) {
      console.log(err);
    }
  }
  // getUser();
  useEffect(() => {
    getUser();
  }, []);

  const activateUser = async (myId) => {
    if(window.confirm(`Are you sure you want to Activate user ${myId} ?`)){
      try {
        const response = await fetch(
          `http://evm.iitbhilai.ac.in:8100/usermgt/activateUser`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              "userID": myId
            })
          }
        );
        const status =  response;
        if(status.status == 200){
          alert("User Activated Successfully");
          window.location.href = 'http://localhost:3000/session/usermanagement';
        }
        else{
          alert("Activation Failed");
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  const deactivateUser = async (myId) => {
      if(window.confirm(`Are you sure you want to Dectivate user ${myId} ?`)){
        try {
          const response = await fetch(
            `http://evm.iitbhilai.ac.in:8100/usermgt/deactivateUser`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                "userID": myId
              })
            }
          );
          const status = response;
          if(status.status == 200){
            alert("User Deactivated Successfully");
            window.location.href = 'http://localhost:3000/session/usermanagement';
          }
          else{
            alert("Deactivation Failed");
          }
        } catch (error) {
          console.log(error)
        }
    }
  }
  // console.log(users);
  return (
    <div className="">
      <div className='table-container'>
        <table className='table-columns-header'>
          <thead>
            <tr style={{
              background: "var(--background-gray)",
              borderRadius: "var(--border-radius)",
            }}>
              <th>User ID</th>
              <th>User Name</th>
              <th>Active Status</th>
              <th>Modify</th>
              <th>Activate</th>
              <th>Deavtivate</th>
            </tr>
          </thead>
          <tbody className='table-content'>
            {users.length > 0 && users.map((value) => (
              <tr>
                <td className="text-black text-sm">
                  {value[0]}
                </td>
                <td className="text-black text-sm">
                  {value[2]}
                </td>
                <td className="text-black text-sm">
                  {value[7] === "A" ? "Active" : "Inactive"}
                </td>
                <td className="text-black text-sm">
                  <button className='modifyBtn' disabled={true}>Modify</button>
                </td>
                <td>
                  <button style={value[7] == "A" ? {opacity : '0.5', cursor : 'not-allowed'} : {opacity : '1'}} className='activateBtn' id={value[0]}  onClick={(e)=> activateUser(e.target.id)} disabled={value[7] == "A" ? true : false}>Activate</button>
                </td>
                <td>
                  <button style={value[7] == "I" ? {opacity : '0.5', cursor : 'not-allowed'} : {opacity : '1'}} className='deactivateBtn' id={value[0]} onClick={(e)=> deactivateUser(e.target.id)} disabled={value[7] == "I" ? true : false} >Deactivate</button>
                </td>
              </tr>
            ))} 
            </tbody>
        </table>
      </div>
      <div className="w-full flex justify-end mt-2">
        <button
          onClick={() => {
            window.location.pathname = "/session/usermanagement/createUser";
          }}
        >
          Add User
        </button>
      </div>
    </div>
  );
}
export default UserList
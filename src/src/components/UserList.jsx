import React from 'react'
import { useState, useEffect } from "react";
import './styles/UserList.css'

function UserList() {

  const [users, setUsers] = useState([]);
  async function getUser() {
    try {
      const response = await fetch(
        "http://evm.iitbhilai.ac.in:8000/listAllUsers",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data2 = await response.json();
      console.log(data2);
      setUsers(data2)
    } catch (err) {
      console.log(err);
    }
  }
  // getUser();
  useEffect(() => {
    getUser();
  }, []);

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
            </tr>
          </thead>
          <tbody className='table-content'>
            {users.map((value) => (
              <tr>
                <td className="text-black text-sm">
                  {value[0]}
                </td>
                <td className="text-black text-sm">
                  {value[2]}
                </td>
                <td className="text-black text-sm">
                  {value[7]}
                </td>
                <td className="text-black text-sm">
                  <button className='modifyBtn' disabled={true}>Modify</button>
                </td>
              </tr>
            ))} </tbody>
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
import React from 'react'
import { useState, useEffect } from "react";
import './styles/UserList.css'
import UserDetail from './UserDetail';
import { FaCircle } from 'react-icons/fa';
import { FaUserEdit } from "react-icons/fa";
import { FaUserAlt } from "react-icons/fa";
import ToggleSwitch from './ToggleSwitch';
function UserList() {

  const [isDetail, setIsDetail] = useState(0);

  const [users, setUsers] = useState([]);
  const [user, setUser] = useState();


  useEffect(() => {
    console.log(user);
    if (user) {
      console.log(user);
      setIsDetail(1);
    }
  }, [user]);

  function details(value) {
    console.log(value);
    setUser(value);
  }

  function close() {
    setIsDetail(0);
  }


  async function getUser() {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_SERVER}/user/listAllUsers`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          mode: "cors"
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
    if (window.confirm(`Are you sure you want to Activate user ${myId} ?`)) {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_SERVER}/user/activateUser`,
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
        if (status.status == 200) {
          alert("User Activated Successfully");
          window.location.href = '/session/usermanagement';
        }
        else {
          alert("Activation Failed");
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  const deactivateUser = async (myId) => {
    if (window.confirm(`Are you sure you want to Dectivate user ${myId} ?`)) {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_SERVER}/user/deactivateUser`,
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
        if (status.status == 200) {
          alert("User Deactivated Successfully");
          window.location.href = '/session/usermanagement';
        }
        else {
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
      <div className="myIconLabels">
        <ul>
          <li><FaCircle className="activeCircle" /> <span>Active User</span></li>
          <li><FaCircle className="inactiveCircle" /> <span>Inactive User</span></li>
        </ul>
      </div>
      {isDetail == 1 && <UserDetail detail={user} close={close} />}
      {isDetail == 0 && (
        <>
          <div className="table-container">
            <table className="table-columns-header">
              <thead>
                <tr
                  style={{
                    background: "var(--background-gray)",
                    borderRadius: "var(--border-radius)",
                  }}
                >
                  <th>Active</th>
                  <th>User ID</th>
                  <th>User Name</th>
                  <th>User Profile</th>
                  <th>Modify</th>
                  <th>Activate/Deactivate</th>
                </tr>
              </thead>
              <tbody className="table-content">
                {users.length > 0 &&
                  users.map((value) => (
                    <tr>
                      <td className="text-black text-sm">
                        <center>{value[7] == "A" ? <FaCircle className="activeCircle" /> : <FaCircle className="inactiveCircle" />}</center>
                      </td>
                      <td className="text-black text-sm">{value[0]}</td>
                      <td className="text-black text-sm">{value[2]}</td>
                      <td>
                        <button
                          className="userDetailsBtn p-2 text-white"
                          onClick={(e) => {
                            details(value);
                          }}
                        >
                          <FaUserAlt />
                        </button>
                      </td>
                      <td className="text-black text-sm">
                        <button className="modifyBtn p-2 text-white" disabled={true}>
                          <FaUserEdit style={{ transform: "translateX(1px)" }} />
                        </button>
                      </td>
                      <td>
                        <ToggleSwitch key={value[0]}
                          warehouseID={value[0]}
                          label={value[7] == "A" ? "Deactivate" : "Activate"}
                          checked={value[7] == "A"}
                          onToggle={(e) => {
                            if (value[7] == "A") {
                              deactivateUser(e)
                            }
                            else {
                              activateUser(e)
                            }
                          }
                          }
                        />
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
        </>
      )}
    </div>
  );
}
export default UserList

import React, { ReactComponent } from 'react'
import { useState, useEffect } from "react";
import EditBtn from '../assets/editBtn.png'
import DeleleBtn from '../assets/delete.jpg'

function SetRoles(){

    const [roleName, setRoleName] = useState("");
    const [shortName, setShortName] = useState("");


  async  function submit(){
        try {
            const response = await fetch(
                `${process.env.REACT_APP_API_SERVER}/user/addRole`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials:'include',
                    body:JSON.stringify({
                        "role_full": roleName,
                        "role_short": shortName
                      })
                }
            );
            const data2 = await response.json();
            if (data2.message) {
                alert(data2.message)
            } else {
                alert("Some error occured")
            }
            console.log(data2);
        } catch (err) {
            console.log(err);
        }

    }

    return (
        <div className="shadow-lg mb-10 pb-10 bg-white" style={{borderRadius:"2%"}}>
            <div className='MainHeader pd-5 ' style={{ display: "flex", "flexDirection": "row", "justifyContent": "space-between", "alignItems": "center" }}>
                    <h4 className='text-white'>Add Role</h4>
                </div>
            <div className='w-full flex justify-center gap-12 p-10'>
            <div className="form_group">
                <div className="form_label">
                  <label htmlFor="">Role Name</label>
                </div>
                <div className="form_input">
                  <input
                    required
                    type={"text"}
                    id="input_lat"
                    name=""
                    className=""
                    placeholder="Enter Role Name"
                    value={roleName}
                    onChange={(e)=>{setRoleName(e.target.value)}}
                  />
                </div>
                </div>
                <div className="form_group">   
                <div className="form_label">
                  <label htmlFor="">Role Short Name</label>
                </div>
                <div className="form_input">
                  <input
                    required
                    type={"text"}
                    id="input_lat"
                    name=""
                    className=""
                    placeholder="Enter Short Name"
                    value={shortName}
                    onChange={(e)=>{setShortName(e.target.value)}}
                  />
                </div>
              </div>
            </div>
              <button className="text-white bg-orange-600" onClick={()=>{submit()}}>Submit</button>
           
        </div>
    )
}

export default SetRoles
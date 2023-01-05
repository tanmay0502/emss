import React, { ReactComponent } from 'react'
import { useState, useEffect } from "react";
import EditBtn from '../assets/editBtn.png'
import DeleleBtn from '../assets/delete.jpg'

function SetRoles(){

    const [roleName, setRoleName] = useState("");
    const [shortName, setShortName] = useState("");
    const [roleName2, setRoleName2] = useState("");
    const [shortName2, setShortName2] = useState("");


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
                setRoleName("")
                setShortName("")
            } else {
                alert("Some error occured")
            }
            console.log(data2);
        } catch (err) {
            console.log(err);
        }

    }
  async  function submit2(){
        try {
            const response = await fetch(
                `${process.env.REACT_APP_API_SERVER}/user/deleteRole`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials:'include',
                    body:JSON.stringify({
                        "role_full": roleName2,
                        "role_short": shortName2
                      })
                }
            );
            const data2 = await response.json();
            if (data2.message) {
                alert(data2.message)
                setRoleName2("")
                setShortName2("")
            } else {
                alert("Some error occured")
            }
            console.log(data2);
        } catch (err) {
            console.log(err);
        }

    }

    return (<>
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
        <div className="shadow-lg mb-10 pb-10 bg-white" style={{borderRadius:"2%"}}>
            <div className='MainHeader pd-5 ' style={{ display: "flex", "flexDirection": "row", "justifyContent": "space-between", "alignItems": "center" }}>
                    <h4 className='text-white'>Delete Role</h4>
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
                    value={roleName2}
                    onChange={(e)=>{setRoleName2(e.target.value)}}
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
                    value={shortName2}
                    onChange={(e)=>{setShortName2(e.target.value)}}
                  />
                </div>
              </div>
            </div>
              <button className="text-white bg-orange-600" onClick={()=>{submit2()}}>Submit</button>
           
        </div></>
    )
}

export default SetRoles
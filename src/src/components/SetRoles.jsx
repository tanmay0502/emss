import React, { ReactComponent } from 'react'
import { useState, useEffect } from "react";
import EditBtn from '../assets/editBtn.png'
import styles from "../pages/unit_management/styles/ScheduleList.module.css"
import DynamicDataTable from '@langleyfoxall/react-dynamic-data-table/dist/DynamicDataTable';
import DeleleBtn from '../assets/delete.jpg'
import load from "../loaders.module.css"
import { AiOutlineSortAscending, AiOutlineSortDescending } from "react-icons/ai";
import { ReactComponent as SearchInputElement } from  '../assets/searchInputIcon.svg';
import { ReactComponent as ChevronDown } from '../assets/ChevronDown.svg';

function SetRoles(){

    const [roleName, setRoleName] = useState("");
    const [shortName, setShortName] = useState("");
    const [roleName2, setRoleName2] = useState("");
    const [shortName2, setShortName2] = useState("");
    const [add, setAdd] = useState(false);
    const [del, setDel] = useState(false);
    const [load, setLoad] = useState(false);

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

    const [roleList, setRoleList] = useState({})
    const [currList, setCurrList] = useState({})

    async  function getList(){
      setLoad(false)
      try {
          const response = await fetch(
              `${process.env.REACT_APP_API_SERVER}/user/getRolesList`,
              {
                  method: "POST",
                  headers: {
                      "Content-Type": "application/json",
                  },
                  credentials:'same-origin',
              }
          );
          const data2 = await response.json();
          // if (data2.Status === 200) {
              setRoleList(data2["data"])
              setLoad(true)
              console.log(roleList)
          // } else {
          //     alert("Some error occured")
          // }
          console.log(data2["data"]);
      } catch (err) {
          console.log(err);
      }

  }
  useEffect(()=>{
    getList();
  },[])
  useEffect(()=>{
    makeRoleList(roleList)
  },[roleList])

  function makeRoleList(roles){
    let eList = []
    console.log("in",roles)
    for( const i in roles){
        console.log("i " + i+": ", roles[i])
        const row = {
            'Role Name':<div className=''>{i}</div>,
            'Code':<div className=''>{roles[i]}</div>
            // 'ID':electionslist[i]["election_id"],
            // 'State': electionslist[i]['state'],
            // 'PC': <div className="px-8">{electionslist[i]['pc']}</div>,
            // "AC": <div className="px-8">{electionslist[i]["ac"].slice(0,3)}</div>,
            // "Election Type": <div className="px-8">{electionslist[i]['electiontype']}</div>,
            // "Start Date - End Date": electionslist[i]['startdate'] +" to "+ electionslist[i]['enddate'],
            // "End Date": ,
            // "Edit":
            // <div className={styles.editBtn}
            // onClick={() => {
            //     navigate(`/session/unitmanagement/edit_election/${i}`)
            // }}
            // >
            //     <img src={Edit} />
                
            // </div>
        }  
        console.log({row})
        eList.push(row);
          
    }
    console.log({eList})
    setCurrList(eList)
}


    return (<>
    <div className='MainHeader pd-5 ' style={{ display: "flex", "flexDirection": "row", "justifyContent": "space-between", "alignItems": "center" }}>
                <h4 className='text-white'>Roles List</h4>

                <div style={{ display: "flex", "flexDirection": "row", alignItems: "center", justifyContent: "center" }}>
{/*                     
                    <button className='createRequestBtn' onClick={() => {
                        window.location.pathname = "/session/unitmanagement/election_scheduling";
                    }}>
                        Schedule Election
                    </button> */}
                
                    
                </div>
            </div>
            {/* {load === true ? <div className={load.tableLoader}></div>: */}
    <div className={`${styles.myWrapper1}`} style={{ position: "relative", height: "100%" }}>
        <div class={styles.table}>
        <DynamicDataTable 
                rows={
                    currList
                }
                buttons={[]} 
                fieldsToExclude={[]}
                onClick={(event, row) => {
                }}
                
                />
       
        <button className='text-white mr-4' onClick={()=>{setAdd(true)} }>
                  Add Role
          </button>
          <button className='text-white ml-4' onClick={()=>{setDel(true)}}>
                  Delete Role
          </button>

           {add !== true ? " ":
            <div>
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

          } 
          {del !== true ? " ": 
          <div>
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
           
          </div>

          } 
        </div>
        </div>

        </>
    )


}

export default SetRoles
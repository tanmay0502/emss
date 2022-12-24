import React, { ReactComponent } from 'react'
import { useState, useEffect } from "react";
import EditBtn from '../assets/editBtn.png'
import DeleleBtn from '../assets/delete.jpg'

function ViewPermission(){


    const [permission, setPermission] = useState()
    const [isPageLoaded,setIsPageLoaded] = useState(0)
    const [editPoint,setEditPoint] =useState(-1);
    const [editDetails, setEditDetails] = useState("","","","","","","","","","")

    function point(id){
        console.log(id)
        if(id==editPoint){
            setEditPoint(-1);
            setEditDetails("","","","","","","","","","")
        }
        else{
            setEditPoint(id);
            if(id!=-2){
            console.log(permission[id][0],permission[id][1],permission[id][2],permission[id][3],permission[id][4],permission[id][5],permission[id][6],permission[id][7],permission[id][8],permission[id][9])
                for(let i=0;i<10;i++){
                    setEditDetails((prev)=>{
                        let kk;
                        if(i==0){
                            kk=[]
                        }
                        else{
                            kk = [...prev]
                        }
                        kk.push(permission[id][i]);
                        console.log(permission[id][i])
                        return kk;
                    })
                }
            }
            else{
                setEditDetails("","","","","","","","","","")
            }
        }
    }

    async function viewPermission() {
        try {
            const response = await fetch(
                `${process.env.REACT_APP_API_SERVER}/user/view_permission`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials:'include'
                }
            );
            const data2 = await response.json();
            console.log(data2);
            if(data2 && data2.length!=0)
            setPermission(data2)
            
        } catch (err) {
            console.log(err);
            // setDists({});
        }
	}

        useEffect(()=>{
            if(isPageLoaded==0){
                viewPermission();
                setIsPageLoaded(1);
            }
            // viewPermission()
        },[])

    async  function editPermission(id){
        console.log(id)
        console.log(editDetails);
        let body = {
                "tokenState1": permission[id][0],
                "tokenDist1": permission[id][1],
                "tokenAC1": permission[id][2],
                "tokenRole1": permission[id][3],
                "moduleName1": permission[id][4],
                "operation1": permission[id][5],
                "operandState1": permission[id][6],
                "operandDist1": permission[id][7],
                "operandAC1": permission[id][8],
                "operandRole1": permission[id][9],
                "tokenState2": editDetails[0],
                "tokenDist2": editDetails[1],
                "tokenAC2": editDetails[2],
                "tokenRole2": editDetails[3],
                "moduleName2": editDetails[4],
                "operation2": editDetails[5],
                "operandState2": editDetails[6],
                "operandDist2": editDetails[7],
                "operandAC2": editDetails[8],
                "operandRole2": editDetails[9]
              
        }
        try {
            const response = await fetch(
                `${process.env.REACT_APP_API_SERVER}/user/modify_permission`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials:'include',
                    body:JSON.stringify(body)

                }
            );
            const data2 = await response.json();
            console.log(data2);
            setEditPoint(-1);
            viewPermission()


            // alert(response)
            

        } catch (err) {
            console.log(err);
            // setDists({});
        }

    }
  async  function deletePermission(id){
        console.log(id)
        let body = {
            "tokenState": permission[id][0],
            "tokenDist": permission[id][1],
            "tokenAC": permission[id][2],
            "tokenRole": permission[id][3],
            "moduleName": permission[id][4],
            "operation": permission[id][5],
            "operandState": permission[id][6],
            "operandDist": permission[id][7],
            "operandAC": permission[id][8],
            "operandRole": permission[id][9]
          }
        try {
            const response = await fetch(
                `${process.env.REACT_APP_API_SERVER}/user/delete_permission`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials:'include',
                    body:JSON.stringify(body)
                }
            );
            const data2 = await response.json();
            console.log(data2);
            setEditPoint(-1);
            viewPermission()


            // alert(response)

            

        } catch (err) {
            console.log(err);
            // setDists({});
        }

    }
  async  function addPermission(){
        console.log("add")
        let body = {
            "tokenState": editDetails[0],
            "tokenDist": editDetails[1],
            "tokenAC": editDetails[2],
            "tokenRole": editDetails[3],
            "moduleName": editDetails[4],
            "operation": editDetails[5],
            "operandState": editDetails[6],
            "operandDist": editDetails[7],
            "operandAC": editDetails[8],
            "operandRole": editDetails[9]
          }
          console.log(body)
        try {
            const response = await fetch(
                `${process.env.REACT_APP_API_SERVER}/user/create_permission`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials:'include',
                    body:JSON.stringify(body)
                }
            );
            const data2 = await response.json();
            console.log(data2);
            setEditPoint(-1);
            viewPermission()
            // alert(response)

            

        } catch (err) {
            console.log(err);
            // setDists({});
        }

    }

	

    return (
        <div className="shadow-lg mb-10 pb-10 bg-white" style={{borderRadius:"2%"}}>
            <div className='MainHeader pd-5 ' style={{ display: "flex", "flexDirection": "row", "justifyContent": "space-between", "alignItems": "center" }}>
                    <h4 className='text-white'>Permissions</h4>
                </div>
           
            <div className='w-full flex justify-between p-10'>
                <table className=' w-full' >
                    <tr className='h-10'>
                        <th className='text-lg'>Logged In User</th>
                        <th className='text-lg'>Modules</th>
                        <th className='text-lg'>Subject User</th>
                        <th className='text-lg'>Edit</th>
                        <th className='text-lg'>Delete</th>
                    </tr>
                    <br/>
                    <tr>
                         <td className='flex justify-between'>
                            <div className='w-1/4 text-left'>State</div>
                            <div className='w-1/4 text-left'>District</div>
                            <div className='w-1/4 text-left'>AC</div>
                            <div className='w-1/4 text-left'>Role</div>
                         </td>
                         <td>
                            
                            <div></div>
                            <div></div>
                         </td>
                         <td className='flex justify-between'>
                         <div className='w-1/4 text-left'>State</div>
                            <div className='w-1/4 text-left'>District</div>
                            <div className='w-1/4 text-left'>AC</div>
                            <div className='w-1/4 text-left'>Role</div>
                         </td>
                         <td></td>
                         <td></td>
                    </tr>
                    <tr>
                        <td colSpan={10}  className="h-1 bg-black"></td>
                    </tr>
                {permission && permission.map((val,id)=>(
                <>
                    <tr>
                        <td colSpan={5} className="mb-4"><hr/></td>
                    </tr>
                    <tr>
                         <td className='flex justify-between'>
                            <div className='w-1/4 text-left'>{val[0]}</div>
                            <div className='w-1/4 text-left'>{val[1]}</div>
                            <div className='w-1/4 text-left'>{val[2]}</div>
                            <div className='w-1/4 text-left'>{val[3]}</div>
                         </td>
                         <td>
                            
                            <div className=''>{val[4]+"/"+val[5]}</div>
                            
                         </td>
                         <td className='flex justify-between'>
                            <div className='w-1/4 text-left'>{val[6]}</div>
                            <div className='w-1/4 text-left'>{val[7]}</div>
                            <div className='w-1/4 text-left'>{val[8]}</div>
                            <div className='w-1/4 text-left'>{val[9]}</div>
                         </td>
                         <td className='text-center'><a onClick={(e)=>point(id)} className='text-center '><img className='text-white text-center -mr-16' width="20" height="20" style={{marginLeft:"20px"}} src={EditBtn}></img></a></td>
                         <td className='text-center'><a className='text-center ' onClick={()=>deletePermission(id)}><img className='text-white text-center -mr-16' width="20" height="20" style={{marginLeft:"20px"}} src={DeleleBtn}></img></a></td>
                        
                    </tr>
                    {editPoint==id &&
                    <tr className=''>
                        <td colSpan={10} className="w-full ">
                            <div className='w-full justify-around flex mt-2 mb-4'>
                                <div className='w-1/12'><input value={editDetails[0]} onChange={(e)=>
                                    setEditDetails((prev)=>{
                                        let temp = [...prev]
                                        temp[0]=e.target.value
                                        return temp;
                                    })
                                } placeholder='logger state' className=" w-full mr-2 border-2 border-black p-2 rounded-md"/></div>
                                <div className='w-1/12'><input value={editDetails[1]} onChange={(e)=>
                                    setEditDetails((prev)=>{
                                        let temp = [...prev]
                                        temp[1]=e.target.value
                                        return temp;
                                    })
                                } placeholder='logger district' className=" w-full mr-2 border-2 border-black p-2 rounded-md"/></div>
                                <div className='w-1/12'><input value={editDetails[2]} onChange={(e)=>
                                    setEditDetails((prev)=>{
                                        let temp = [...prev]
                                        temp[2]=e.target.value
                                        return temp;
                                    })
                                } placeholder='logger AC' className=" w-full mr-2 border-2 border-black p-2 rounded-md"/></div>
                                <div className='w-1/12'><input value={editDetails[3]} onChange={(e)=>
                                    setEditDetails((prev)=>{
                                        let temp = [...prev]
                                        temp[3]=e.target.value
                                        return temp;
                                    })
                                } placeholder='logger role' className=" w-full mr-2 border-2 border-black p-2 rounded-md"/></div>
                                <div className='w-1/12'><input value={editDetails[4]} onChange={(e)=>
                                    setEditDetails((prev)=>{
                                        let temp = [...prev]
                                        temp[4]=e.target.value
                                        return temp;
                                    })
                                } placeholder='Module' className=" w-full mr-2 border-2 border-black p-2 rounded-md"/></div>
                                <div className='w-1/12'><input value={editDetails[5]} onChange={(e)=>
                                    setEditDetails((prev)=>{
                                        let temp = [...prev]
                                        temp[5]=e.target.value
                                        return temp;
                                    })
                                } placeholder='Operation' className=" w-full mr-2 border-2 border-black p-2 rounded-md"/></div>
                                <div className='w-1/12'><input value={editDetails[6]} onChange={(e)=>
                                    setEditDetails((prev)=>{
                                        let temp = [...prev]
                                        temp[6]=e.target.value
                                        return temp;
                                    })
                                } placeholder='subject state' className=" w-full mr-2 border-2 border-black p-2 rounded-md"/></div>
                                <div className='w-1/12'><input value={editDetails[7]} onChange={(e)=>
                                    setEditDetails((prev)=>{
                                        let temp = [...prev]
                                        temp[7]=e.target.value
                                        return temp;
                                    })
                                } placeholder='subject dist' className=" w-full mr-2 border-2 border-black p-2 rounded-md"/></div>
                                <div className='w-1/12'><input value={editDetails[8]} onChange={(e)=>
                                    setEditDetails((prev)=>{
                                        let temp = [...prev]
                                        temp[8]=e.target.value
                                        return temp;
                                    })
                                } placeholder='subject AC' className=" w-full mr-2 border-2 border-black p-2 rounded-md"/></div>
                                <div className='w-1/12'><input value={editDetails[9]} onChange={(e)=>
                                    setEditDetails((prev)=>{
                                        let temp = [...prev]
                                        temp[9]=e.target.value
                                        return temp;
                                    })
                                } placeholder='subject role' className=" w-full mr-2 border-2 border-black p-2 rounded-md"/></div>
                                <div className='w-1/12'><button className='text-white ' onClick={()=>editPermission(id)}>Save</button></div>
                                
                            </div>
                        </td>
                    </tr>
                    }
                    <tr>
                        <td colSpan={10}  className=" bg-black"></td>
                    </tr>
                </>
                 
                ))}
                <div className='text-left'><button className='text-white mt-3' onClick={()=>point(-2)}>Add Permission</button></div>
                {editPoint==-2 &&
                    <tr className=''>
                        <td colSpan={10} className="w-full ">
                            <div className='w-full justify-around flex mt-2 mb-4'>
                                <div className='w-1/12'><input value={editDetails[0]} onChange={(e)=>
                                    setEditDetails((prev)=>{
                                        let temp = [...prev]
                                        temp[0]=e.target.value
                                        return temp;
                                    })
                                } placeholder='logger state' className=" w-full mr-2 border-2 border-black p-2 rounded-md"/></div>
                                <div className='w-1/12'><input value={editDetails[1]} onChange={(e)=>
                                    setEditDetails((prev)=>{
                                        let temp = [...prev]
                                        temp[1]=e.target.value
                                        return temp;
                                    })
                                } placeholder='logger district' className=" w-full mr-2 border-2 border-black p-2 rounded-md"/></div>
                                <div className='w-1/12'><input value={editDetails[2]} onChange={(e)=>
                                    setEditDetails((prev)=>{
                                        let temp = [...prev]
                                        temp[2]=e.target.value
                                        return temp;
                                    })
                                } placeholder='logger AC' className=" w-full mr-2 border-2 border-black p-2 rounded-md"/></div>
                                <div className='w-1/12'><input value={editDetails[3]} onChange={(e)=>
                                    setEditDetails((prev)=>{
                                        let temp = [...prev]
                                        temp[3]=e.target.value
                                        return temp;
                                    })
                                } placeholder='logger role' className=" w-full mr-2 border-2 border-black p-2 rounded-md"/></div>
                                <div className='w-1/12'><input value={editDetails[4]} onChange={(e)=>
                                    setEditDetails((prev)=>{
                                        let temp = [...prev]
                                        temp[4]=e.target.value
                                        return temp;
                                    })
                                } placeholder='Module' className=" w-full mr-2 border-2 border-black p-2 rounded-md"/></div>
                                <div className='w-1/12'><input value={editDetails[5]} onChange={(e)=>
                                    setEditDetails((prev)=>{
                                        let temp = [...prev]
                                        temp[5]=e.target.value
                                        return temp;
                                    })
                                } placeholder='Operation' className=" w-full mr-2 border-2 border-black p-2 rounded-md"/></div>
                                <div className='w-1/12'><input value={editDetails[6]} onChange={(e)=>
                                    setEditDetails((prev)=>{
                                        let temp = [...prev]
                                        temp[6]=e.target.value
                                        return temp;
                                    })
                                } placeholder='subject state' className=" w-full mr-2 border-2 border-black p-2 rounded-md"/></div>
                                <div className='w-1/12'><input value={editDetails[7]} onChange={(e)=>
                                    setEditDetails((prev)=>{
                                        let temp = [...prev]
                                        temp[7]=e.target.value
                                        return temp;
                                    })
                                } placeholder='subject dist' className=" w-full mr-2 border-2 border-black p-2 rounded-md"/></div>
                                <div className='w-1/12'><input value={editDetails[8]} onChange={(e)=>
                                    setEditDetails((prev)=>{
                                        let temp = [...prev]
                                        temp[8]=e.target.value
                                        return temp;
                                    })
                                } placeholder='subject AC' className=" w-full mr-2 border-2 border-black p-2 rounded-md"/></div>
                                <div className='w-1/12'><input value={editDetails[9]} onChange={(e)=>
                                    setEditDetails((prev)=>{
                                        let temp = [...prev]
                                        temp[9]=e.target.value
                                        return temp;
                                    })
                                } placeholder='subject role' className=" w-full mr-2 border-2 border-black p-2 rounded-md"/></div>
                                <div className='w-1/12'><button className='text-white ' onClick={addPermission}>ADD</button></div>
                                
                            </div>
                        </td>
                    </tr>
                    }
                
                </table>
            </div>
           
        </div>
    )
}

export default ViewPermission
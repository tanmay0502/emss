import React, { ReactComponent } from 'react'
import { useState, useEffect } from "react";
import EditBtn from '../../assets/editBtn.png'
import DeleleBtn from '../../assets/delete.jpg'
import styles from './adminstyles.module.css'

function SetRoles(){


    const [permission, setPermission] = useState([])
    const [isPageLoaded,setIsPageLoaded] = useState(0)
    const [editPoint,setEditPoint] =useState(-1);
    const [editDetails, setEditDetails] = useState("","","")
    const [isLoading,setIsLoading] = useState(0);

    const [show, setShow] = useState(false);

  useEffect(
    () => {
    
        setIsLoading(1);

      let timer1 = setTimeout(() => listRoles(), 1 * 1000);

      return () => {
        clearTimeout(timer1);
      };
    },
    // useEffect will run only one time with empty []
    // if you pass a value to array,
    // like this - [data]
    // than clearTimeout will run every time
    // this value changes (useEffect re-run)
    []
  );

    function point(id){
        console.log(id)
        if(id==editPoint){
            setEditPoint(-1);
            setEditDetails("","","")
        }
        else{
            setEditPoint(id);
            if(id!=-2){
            console.log(permission[id][0],permission[id][1],permission[id][2])
                for(let i=0;i<3;i++){
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
                setEditDetails("","","")
            }
        }
    }

    async function listRoles() {
        setIsLoading(1);
        try {
            const response = await fetch(
                `${process.env.REACT_APP_API_SERVER}/user/listRole`,
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
            if((data2 &&data2["data"] && data2["data"].length!=0) ){
                
                    console.log("setting.")
                setPermission(data2["data"])
                
            }
            setIsLoading(0);
            
        } catch (err) {
            console.log(err);
            // setDists({});
            setIsLoading(0);

        }
	}

        useEffect(()=>{
            if(isPageLoaded==0){
                // listRoles();
            }
            // listRoles()
        },[isPageLoaded])

   
  async  function deleteRole(id){
        console.log(id)
        let body = {
            "role_full": id,
            "role_short": permission[id],
          }
        try {
            const response = await fetch(
                `${process.env.REACT_APP_API_SERVER}/user/deleteRole`,
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
            if(response.status==200){
                alert(data2.message)
            }
            else{
                alert(data2.message)
            }
            setEditPoint(-1);
            listRoles()


            // alert(response)

            

        } catch (err) {
            console.log(err);
            // setDists({});
        }

    }
  async  function addState(){
        console.log("add")
        let body = {
            "role_full": editDetails[0],
            "role_short": editDetails[1],
          }
          console.log(body)
        try {
            const response = await fetch(
                `${process.env.REACT_APP_API_SERVER}/user/addRole`,
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
            if(response.status==200){
                alert(data2.message)
            }
            else{
                alert(data2.message)
            }
            setEditPoint(-1);
            listRoles()
            // alert(response)

            

        } catch (err) {
            console.log(err);
            // setDists({});
        }

    }

	

    return (
        <div className="shadow-lg mb-10 pb-10 bg-white" style={{borderRadius:"2%"}}>
            <div className={`${styles.MainHeader} pd-5`} style={{ display: "flex", "flexDirection": "row", "justifyContent": "space-between", "alignItems": "center" }}>
                    <h4 className='text-white'>Roles</h4>
                </div>
           
            <div className='w-full flex justify-between p-10'>
                <table className=' w-full' >
                   <><tr>
                    <td colSpan={10}>
                        <div className='flex justify-between'>
                            <div className='w-1/3 font-bold'>Role Full</div>
                            <div className='w-1/3 font-bold'>Role Short</div>
                            <div className='w-1/3 font-bold'>Delete</div>
                        </div>
                    </td>
                </tr>
                <tr className='h-10'>
                         <td colSpan={10} className=""><hr/></td>
                     </tr></>
                {isLoading==1 && (
                    <tr className=''>
                        <td className='text-center text-6xl' colSpan={10}>Loading ......</td>
                    </tr>
                )}
                {permission &&  Object.keys(permission).map((val,id)=>(
                
                <>
                <tr>
                    <td colSpan={10}>
                        <div className='flex justify-between'>
                            <div className='w-1/3'>{val}</div>
                            <div className='w-1/3'>{permission[val]}</div>
                            <div className='w-1/3  text-center flex justify-between'>
                                <div className='w-1/3'></div>
                                <a className='  ' onClick={()=>deleteRole(val)}><img className='text-white  ' width="20" height="20" style={{marginLeft:""}} src={DeleleBtn}></img></a>
                                <div className='w-1/3'></div>
                                
                            </div>
                        </div>
                    </td>
                </tr>
                <tr>
                         <td colSpan={10} className="mb-4"><hr/></td>
                     </tr>
                </>
                 
                ))}
                <div className='text-left'><button className='text-white mt-3' onClick={()=>point(-2)}>Add Role</button></div>
                {editPoint==-2 &&
                    <tr className=''>
                        <td colSpan={10} className="w-full ">
                            <div className='w-full justify-around flex mt-2 mb-4'>
                                <div className='w-1/3 m-2'><input value={editDetails[0]} onChange={(e)=>
                                    setEditDetails((prev)=>{
                                        let temp = [...prev]
                                        temp[0]=e.target.value
                                        return temp;
                                    })
                                } placeholder='Role Full' className=" w-full mr-2 border-2 border-black p-2 rounded-md"/></div>
                                <div className='w-1/3 m-2'><input value={editDetails[1]} onChange={(e)=>
                                    setEditDetails((prev)=>{
                                        let temp = [...prev]
                                        temp[1]=e.target.value
                                        return temp;
                                    })
                                } placeholder='Role Short' className=" w-full mr-2 border-2 border-black p-2 rounded-md"/></div>
                               
                                <div className='w-1/3 m-2'><button className='text-white ' onClick={addState}>ADD</button></div>
                                
                            </div>
                        </td>
                    </tr>
                    }
                
                </table>
            </div>
           
        </div>
    )
}

export default SetRoles
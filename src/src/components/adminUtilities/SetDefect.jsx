import React, { ReactComponent } from 'react'
import { useState, useEffect } from "react";
import DeleleBtn from '../../assets/Delete.svg'

function SetDefect(){


    const [permission, setPermission] = useState([])
    const [isPageLoaded,setIsPageLoaded] = useState(0)
    const [editPoint,setEditPoint] =useState(-1);
    const [editDetails, setEditDetails] = useState("","")
    const [isLoading,setIsLoading] = useState(0);

    const [show, setShow] = useState(false);

  useEffect(
    () => {
    
        setIsLoading(1);

      let timer1 = setTimeout(() => listDefects(), 1 * 1000);

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
            setEditDetails("","")
        }
        else{
            setEditPoint(id);
            if(id!=-2){
                for(let i=0;i<2;i++){
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
                setEditDetails("","")
            }
        }
    }

    async function listDefects() {
        setIsLoading(1);
        try {
            const response = await fetch(
                `${process.env.REACT_APP_API_SERVER}/user/listDefect`,
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
                // listDefects();
            }
            // listDefects()
        },[isPageLoaded])

   
  async  function deleteDefect(id){
        console.log(id)
        let body = {
            "defect_id": permission[id]["defectID"],
            "defect_name": permission[id]["defectName"],
          }
        try {
            const response = await fetch(
                `${process.env.REACT_APP_API_SERVER}/user/deleteDefect`,
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
            listDefects()


            // alert(response)

            

        } catch (err) {
            console.log(err);
            // setDists({});
        }

    }
  async  function addDefect(){
        console.log("add")
        let body = {
            "defect_id": editDetails[0],
            "defect_name": editDetails[1],
          }
          console.log(body)
        try {
            const response = await fetch(
                `${process.env.REACT_APP_API_SERVER}/user/addDefect`,
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
            listDefects()
            // alert(response)

            

        } catch (err) {
            console.log(err);
            // setDists({});
        }

    }

	

    return (
        <div className="shadow-lg mb-10 pb-10 bg-white" style={{borderRadius:"2%"}}>
            <div className='MainHeader pd-5 ' style={{ display: "flex", "flexDirection": "row", "justifyContent": "space-between", "alignItems": "center" }}>
                    <h4 className='text-white'>Defects</h4>
                </div>
           
            <div className=' flex justify-center p-10 ml-32 mr-32'>
                <table className=' w-full' >
                   <><tr>
                    <td colSpan={10}>
                        <div className='flex justify-around'>
                            <div className='w-1/4 font-bold text-left'></div>
                            <div className='w-1/4 font-bold text-left'>Defect Id</div>
                            <div className='w-1/4 font-bold text-left'>Defect Name</div>
                            <div className='w-1/4 font-bold text-left'>Delete</div>
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
                {permission &&  permission.map((val,id)=>(
                
                <>
                <tr>
                    <td colSpan={10}>
                        <div className='flex justify-between hover:bg-orange-500 hover:text-white'>
                            <div className='w-1/3 text-left'></div>
                            <div className='w-1/3 text-left'>{permission[id]["defectID"]}</div>
                            <div className='w-1/3 text-left'>{permission[id]["defectName"]}</div>
                            <div className='w-1/3  text-left flex justify-between text-white'>
                                {/* <div className='w-1/3'></div> */}
                                <a className=' text-white ' onClick={()=>deleteDefect(id)}><img className='text-white  ' width="20" height="20" style={{marginLeft:""}} src={DeleleBtn}></img></a>
                                {/* <div className='w-1/3'></div> */}
                                
                            </div>
                        </div>
                    </td>
                </tr>
                <tr>
                         <td colSpan={10} className="mb-4"><hr/></td>
                     </tr>
                </>
                 
                ))}
                <div className='text-left'><button className='text-white mt-3' onClick={()=>point(-2)}>Add Defect</button></div>
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
                                } placeholder='Defect Id' className=" w-full mr-2 border-2 border-black p-2 rounded-md"/></div>
                                <div className='w-1/3 m-2'><input value={editDetails[1]} onChange={(e)=>
                                    setEditDetails((prev)=>{
                                        let temp = [...prev]
                                        temp[1]=e.target.value
                                        return temp;
                                    })
                                } placeholder='Defect Name' className=" w-full mr-2 border-2 border-black p-2 rounded-md"/></div>
                              
                                <div className='w-1/3 m-2'><button className='text-white ' onClick={addDefect}>ADD</button></div>
                                
                            </div>
                        </td>
                    </tr>
                    }
                
                </table>
            </div>
           
        </div>
    )
}

export default SetDefect
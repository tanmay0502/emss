import React, { ReactComponent } from 'react'
import { useState, useEffect } from "react";
import EditBtn from '../../assets/editBtn.png'
import DeleleBtn from '../../assets/Delete.svg'

function SetACs(){


    const [permission, setPermission] = useState([])
    const [isPageLoaded,setIsPageLoaded] = useState(0)
    const [editPoint,setEditPoint] =useState(-1);
    const [editDetails, setEditDetails] = useState("","","","","","")
    const [isLoading,setIsLoading] = useState(0);

    const [show, setShow] = useState(false);

  useEffect(
    () => {
    
        setIsLoading(1);

      let timer1 = setTimeout(() => listACs(), 1 * 1000);

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
            setEditDetails("","","","","","")
        }
        else{
            setEditPoint(id);
            if(id!=-2){
                for(let i=0;i<6;i++){
                    setEditDetails((prev)=>{
                        let kk;
                        if(i==0){
                            kk=[]
                        }
                        else{
                            kk = [...prev]
                        }
                        kk.push(permission[id][i]);
                        console.log(permission[id][i]);
                        return kk;
                    })
                }
            }
            else{
                setEditDetails("","","","","","")
            }
        }
    }

    async function listACs() {
        setIsLoading(1);
        try {
            const response = await fetch(
                `${process.env.REACT_APP_API_SERVER}/user/listAC`,
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
                // listACs();
            }
            // listACs()
        },[isPageLoaded])

   
  async  function deleteAC(id){
        console.log(id)
        let body =     {
            "acNumber": permission[id]["acNumber"],
            "acName": permission[id]["acName"],
            "acType": permission[id]["acType"],
            "pcNo": permission[id]["pcNumber"],
            "stCode": permission[id]["stCode"],
            "distNoHdqtr": permission[id]["distnoHdqtr"]
          }
        
          // this need to be implement

      
        try {
            const response = await fetch(
                `${process.env.REACT_APP_API_SERVER}/user/deleteAC`,
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
            listACs()


            // alert(response)

            

        } catch (err) {
            console.log(err);
            // setDists({});
        }

    }
  async  function addAC(){
        console.log("add")
        let body = {
            "acNumber": editDetails[0],
            "acName": editDetails[1],
            "acType": editDetails[2],
            "pcNo": editDetails[3],
            "stCode": editDetails[4],
            "distNoHdqtr": editDetails[5]
          }
          console.log(body)
        try {
            const response = await fetch(
                `${process.env.REACT_APP_API_SERVER}/user/addAC`,
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
            listACs()
            // alert(response)

            

        } catch (err) {
            console.log(err);
            // setDists({});
        }

    }

	

    return (
        <div className="shadow-lg mb-10 pb-10 bg-white" style={{borderRadius:"2%"}}>
            <div className='MainHeader pd-5 ' style={{ display: "flex", "flexDirection": "row", "justifyContent": "space-between", "alignItems": "center" }}>
                    <h4 className='text-white'>ACs</h4>
                </div>
           
            <div className=' flex justify-center p-10 ml-32 mr-32'>
                <table className=' w-full' >
                   <><tr>
                    <td colSpan={10}>
                        <div className='flex justify-around'>
                            <div className='w-1/8 font-bold text-left'></div>
                            <div className='w-1/8 font-bold text-left'>AC Code</div>
                            <div className='w-1/8 font-bold text-left'>AC Name</div>
                            <div className='w-1/8 font-bold text-left'>AC Type</div>
                            <div className='w-1/8 font-bold text-left'>PC Number</div>
                            <div className='w-1/8 font-bold text-left'>State Code</div>
                            <div className='w-1/8 font-bold text-left'>District Hq No</div>
                            <div className='w-1/8 font-bold text-left'>Delete</div>
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
                        <div className='flex justify-between hover:bg-orange-500 hover:text-white'>
                            <div className='w-1/3 text-left'></div>
                            <div className='w-1/3 text-left'>{permission[id]["acNumber"]}</div>
                            <div className='w-1/3 text-left'>{permission[id]["acName"]}</div>
                            <div className='w-1/3 text-left'>{permission[id]["acType"]}</div>
                            <div className='w-1/3 text-left'>{permission[id]["pcNumber"]}</div>
                            <div className='w-1/3 text-left'>{permission[id]["stCode"]}</div>
                            <div className='w-1/3 text-left'>{permission[id]["distnoHdqtr"]}</div>
                            <div className='w-1/3  text-left flex justify-between text-white'>
                                {/* <div className='w-1/3'></div> */}
                                <a className=' text-white ' onClick={()=>deleteAC(val)}><img className='text-white  ' width="20" height="20" style={{marginLeft:""}} src={DeleleBtn}></img></a>
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
                <div className='text-left'><button className='text-white mt-3' onClick={()=>point(-2)}>Add AC</button></div>
                {editPoint==-2 &&
                    <tr className=''>
                        <td colSpan={10} className="w-full ">
                            <div className='w-full justify-around flex mt-2 mb-4'>
                                <div className='w-1/6 m-2'><input value={editDetails[0]} onChange={(e)=>
                                    setEditDetails((prev)=>{
                                        let temp = [...prev]
                                        temp[0]=e.target.value
                                        return temp;
                                    })
                                } placeholder='AC Number' className=" w-full mr-2 border-2 border-black p-2 rounded-md"/></div>
                                <div className='w-1/6 m-2'><input value={editDetails[1]} onChange={(e)=>
                                    setEditDetails((prev)=>{
                                        let temp = [...prev]
                                        temp[1]=e.target.value
                                        return temp;
                                    })
                                } placeholder='AC Name' className=" w-full mr-2 border-2 border-black p-2 rounded-md"/></div>
                                <div className='w-1/6 m-2'><input value={editDetails[2]} onChange={(e)=>
                                    setEditDetails((prev)=>{
                                        let temp = [...prev]
                                        temp[2]=e.target.value
                                        return temp;
                                    })
                                } placeholder='AC Type' className=" w-full mr-2 border-2 border-black p-2 rounded-md"/></div>
                               
                                <div className='w-1/6 m-2'><input value={editDetails[3]} onChange={(e)=>
                                    setEditDetails((prev)=>{
                                        let temp = [...prev]
                                        temp[3]=e.target.value
                                        return temp;
                                    })
                                } placeholder='PC Number' className=" w-full mr-2 border-2 border-black p-2 rounded-md"/></div>
                                <div className='w-1/6 m-2'><input value={editDetails[4]} onChange={(e)=>
                                    setEditDetails((prev)=>{
                                        let temp = [...prev]
                                        temp[4]=e.target.value
                                        return temp;
                                    })
                                } placeholder='State Code' className=" w-full mr-2 border-2 border-black p-2 rounded-md"/></div>
                                <div className='w-1/6 m-2'><input value={editDetails[5]} onChange={(e)=>
                                    setEditDetails((prev)=>{
                                        let temp = [...prev]
                                        temp[5]=e.target.value
                                        return temp;
                                    })
                                } placeholder='District Headquater Number' className=" w-full mr-2 border-2 border-black p-2 rounded-md"/></div>
                               
                                <div className='w-1/3 m-2'><button className='text-white ' onClick={addAC}>ADD</button></div>
                                
                            </div>
                        </td>
                    </tr>
                    }
                
                </table>
            </div>
           
        </div>
    )
}

export default SetACs
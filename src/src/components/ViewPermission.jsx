import React, { ReactComponent } from 'react'
import { useState, useEffect } from "react";

function ViewPermission(){


    const [permission, setPermission] = useState()
    const [isPageLoaded,setIsPageLoaded] = useState(0)

    async function viewPermission() {
		

			try {
				const response = await fetch(
					`${process.env.REACT_APP_API_SERVER}/user/view_permission`,
					{
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						}
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
        })
	

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
                            <div>State</div>
                            <div>District</div>
                            <div>AC</div>
                            <div>Role</div>
                         </td>
                         <td>
                            
                            <div></div>
                            <div></div>
                         </td>
                         <td className='flex justify-between'>
                         <div>State</div>
                            <div>District</div>
                            <div>AC</div>
                            <div>Role</div>
                         </td>
                         <td></td>
                         <td></td>
                    </tr>
                {permission && permission.map((val)=>(
                <>
                    <tr>
                        <td colSpan={5}><hr/></td>
                    </tr>
                    <tr>
                         <td className='flex justify-between'>
                            <div>{val[0]}</div>
                            <div>{val[1]}</div>
                            <div>{val[2]}</div>
                            <div>{val[3]}</div>
                         </td>
                         <td>
                            
                            <div>{val[4]+"/"+val[5]}</div>
                            
                         </td>
                         <td className='flex justify-between'>
                            <div>{val[6]}</div>
                            <div>{val[7]}</div>
                            <div>{val[8]}</div>
                            <div>{val[9]}</div>
                         </td>
                         <td><button className='text-white'>Edit</button></td>
                         <td><button className='text-white'>Delete</button></td>
                    </tr>
                </>
                 
                ))}
                
                </table>
            </div>
           
        </div>
    )
}

export default ViewPermission
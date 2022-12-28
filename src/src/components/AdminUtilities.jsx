import React, { ReactComponent } from 'react'
import { useState, useEffect } from "react";
import { Navigate, useNavigate } from 'react-router-dom';



function AdminUtilities(){

    const navigate = useNavigate()
    return(
        <div className="shadow-lg mb-10 pb-10 bg-white" style={{borderRadius:"2%"}}>
            <div className='MainHeader pd-5 ' style={{ display: "flex", "flexDirection": "row", "justifyContent": "space-between", "alignItems": "center" }}>
                    <h4 className='text-white'>Admin Utilities</h4>
                </div>
           
            <div className='w-full flex justify-around p-10'>
              <button onClick={() => {
								navigate('/session/adminutilities/viewpermissions')}
							}  className='text-white'>Permissions</button>
              <button className='text-white'>Roles</button>
            </div>
           
        </div>
    )
}

export default AdminUtilities
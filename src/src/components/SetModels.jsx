import React, { ReactComponent } from 'react'
import { useState, useEffect } from "react";
import EditBtn from '../assets/editBtn.png'
import DeleleBtn from '../assets/delete.jpg'

function SetModels(){

    const [Model, setModel] = useState("");
    const [Model2, setModel2] = useState("");


  async  function submit(){
        try {
            const response = await fetch(
                `${process.env.REACT_APP_API_SERVER}/user/addModel`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials:'include',
                    body:JSON.stringify({
                        "model":Model
                      })
                }
            );
            const data2 = await response.json();
            if (data2.message) {
                alert(data2.message)
                setModel("");

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
                `${process.env.REACT_APP_API_SERVER}/user/deleteModel`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials:'include',
                    body:JSON.stringify({
                        "model":Model
                      })
                }
            );
            const data2 = await response.json();
            if (data2.message) {
                alert(data2.message)
                setModel2("");
            } else {
                alert("Some error occured")
            }
            console.log(data2);
        } catch (err) {
            console.log(err);
        }

    }

    return (
      <>
        <div className="shadow-lg mb-10 pb-10 bg-white" style={{borderRadius:"2%"}}>
            <div className='MainHeader pd-5 ' style={{ display: "flex", "flexDirection": "row", "justifyContent": "space-between", "alignItems": "center" }}>
                    <h4 className='text-white'>Add Model</h4>
                </div>
            <div className='w-full flex justify-center'>
            <div className="w-1/3 mt-10 mb-10">
                <div className="form_label text-left">
                  <label htmlFor="" className='text-lg'>Model</label>
                </div>
                <div className="form_input">
                  <input
                    required
                    type={"text"}
                    name=""
                    className="w-1/3"
                    placeholder="Enter Model"
                    value={Model}
                    onChange={(e)=>{setModel(e.target.value)}}
                  />
                </div>
                </div>
               
            </div>
              <button className="text-white bg-orange-600" onClick={()=>{submit()}}>Submit</button>
           
        </div>
        <div className="shadow-lg mb-10 pb-10 bg-white" style={{borderRadius:"2%"}}>
            <div className='MainHeader pd-5 ' style={{ display: "flex", "flexDirection": "row", "justifyContent": "space-between", "alignItems": "center" }}>
                    <h4 className='text-white'>Delete Model</h4>
                </div>
            <div className='w-full flex justify-center'>
            <div className="w-1/3 mt-10 mb-10">
                <div className="form_label text-left">
                  <label htmlFor="" className='text-lg'>Model</label>
                </div>
                <div className="form_input">
                  <input
                    required
                    type={"text"}
                    name=""
                    className="w-1/3"
                    placeholder="Enter Model"
                    value={Model2}
                    onChange={(e)=>{setModel2(e.target.value)}}
                  />
                </div>
                </div>
               
            </div>
              <button className="text-white bg-orange-600" onClick={()=>{submit2()}}>Submit</button>
           
        </div></>
    )
}

export default SetModels
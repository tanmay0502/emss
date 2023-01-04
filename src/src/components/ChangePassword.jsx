import React, { ReactComponent } from 'react'
import { useState, useEffect } from "react";
import styles from './styles/ChangePassword.module.css';
import { AiOutlineEye, AiFillEyeInvisible } from 'react-icons/ai';

function ChangePassword(){

    const [newpassword, setnewpassword] = useState("");
    const [currentpassword, setcurrentpassword] = useState("");
    const [userid, setuserid] = useState("");
    const [renewpassword, setrenewpassword] = useState("");
    const userId = () => {
        const URL = window.location.href;
        const arr = URL.split("/");
        const param = arr[arr.length - 1];
        const arr1 = param.split("=");
        return arr1[0];
    }
    const [passwordType3, setPasswordType3] = useState("password");
    const [passwordType1, setPasswordType1] = useState("password");
    const [passwordType2, setPasswordType2] = useState("password");
  const togglePassword1 =()=>{
    if(passwordType1==="password")
    {
     setPasswordType1("text")
     return;
    }
    setPasswordType1("password")
  }
  const togglePassword2 =()=>{
    if(passwordType2==="password")
    {
     setPasswordType2("text")
     return;
    }
    setPasswordType2("password")
  }
  const togglePassword3 =()=>{
    if(passwordType3==="password")
    {
     setPasswordType3("text")
     return;
    }
    setPasswordType3("password")
  }
  



  async  function submit(){
    setuserid(userId)
    if (newpassword===renewpassword){
        try {
            const response = await fetch(
                `${process.env.REACT_APP_API_SERVER}/user/changePassword`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials:'include',
                    body:JSON.stringify({
                        'userID': userid,
                        'newPassword': newpassword,
                        'currentPassword':currentpassword
                      })
                }
            );
            const data2 = await response.json();
            if (response.status=== 200) {
                alert('Password Changed Successfully')
            }
            else {
                alert(response.message)
            }
        } catch (err) {
            console.log(err);
        }
    }
    else {
        alert('Fields does not match')
    }
    }

    return (
        <div className="shadow-lg mb-10 pb-10 bg-white" style={{borderRadius:"20px"}}>
            <div className='MainHeader pd-5 ' style={{ display: "flex", "flexDirection": "row", "justifyContent": "space-between", "alignItems": "center" }}>
                    <h4 className='text-white'>Change Password</h4>
                </div>
            <div className='w-full flex justify-center gap-12 p-10' style={{'flexDirection':'column'}}>
            <div className={styles.formpass} >
                <div className={styles.lable}>
                  <label htmlFor="">Current Passeword</label>
                </div>
                <div className={styles}>
                  <input
                    required
                    type={passwordType1}
                    id="input_lat"
                    name=""
                    className=""
                    placeholder="Enter Current Password"
                    value={currentpassword}
                    onChange={(e)=>{setcurrentpassword(e.target.value)}}
                  />
                  <div  onClick={togglePassword1} style={{width : "11%", scale: '2', justifyContent:"center", display:"flex", alignItems:"center",position:"relative",right:'-88%',bottom:"32px"}}>
        {passwordType1=="password"?<AiOutlineEye/>:<AiFillEyeInvisible/>}
      </div>
                </div>  
                <div className={styles.lable}>
                  <label htmlFor="">New Password</label>
                </div>
                <div className="form_input">
                  <input
                    required
                    type={passwordType2}
                    id="input_lat"
                    name=""
                    className=""
                    placeholder="Enter New Password"
                    value={newpassword}
                    onChange={(e)=>{setnewpassword(e.target.value)}}
                  />
                  <div  onClick={togglePassword2} style={{width : "11%", scale: '2', justifyContent:"center", display:"flex", alignItems:"center",position:"relative",right:'-88%',bottom:"32px"}}>
        {passwordType2=="password"?<AiOutlineEye/>:<AiFillEyeInvisible/>}
      </div>
                </div>
                <div className={styles.lable}>
                  <label htmlFor="">Rewrite New Password</label>
                </div>
                <div className="form_input">
                  <input
                    required
                    type={passwordType3}
                    id="input_lat"
                    name=""
                    className=""
                    placeholder="Rewrite New Password"
                    value={renewpassword}
                    onChange={(e)=>{setrenewpassword(e.target.value)}}
                  />
                  <div  onClick={togglePassword3} style={{width : "11%", scale: '2', justifyContent:"center", display:"flex", alignItems:"center",position:"relative",right:'-88%',bottom:"32px"}}>
        {passwordType3=="password"?<AiOutlineEye/>:<AiFillEyeInvisible/>}
      </div>
                </div>
              </div>
            </div>
              <button className="text-white bg-orange-600" onClick={()=>{submit()}}>Submit</button>
           
        </div>
    )
}

export default ChangePassword
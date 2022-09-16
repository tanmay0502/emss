import React from "react";
import { useState, useEffect } from "react";
import Footer from "../../components/Footer";
import Otp from "../../components/Otp";
import Password from "../../components/Password";
import SelectUser from "../../components/SelectUser";
var sha256 = require('js-sha256')


const Login = () => {
  const myFont = {
    fontFamily: "Nunito Sans",
    fontStyle: "normal",
    fontWeight: "800",
    fontSize: "19px",
    lineHeight: "35px",
    color: "black",
  };

  const [isOTPSent, setIsOTPSent] = useState(0);
  const [isMobile, setIsMobile] = useState(0);
  const [passwordBlock, setPasswordBlock] = useState(0);
  const [selectUserBlock, setSelectUserBlock] = useState(0);

  // user Details

  const [userID, setUserID] = useState("");
  const [OTP, setOTP] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [state, setState] = useState("");
  const [PC, setPC] = useState("");
  const [AC, setAC] = useState("");
  const [role, setRole] = useState("");
  const [invaliduser, setInvalidUser] = useState("");
  const [invalidOTP, setInvalidOTP] = useState("");
  const [invalidPassword, setInvalidPassword] = useState("");
  const [invalidMobile, setInvalidMobile] = useState("");
  const [invalidUsers, setInvalidUsers] = useState("");

  const [userIDs, setUserIds] = useState(["user1", "user2"]);
  const [states, setStates] = useState([]);
  const [statesCode, setStatesCode] = useState([]);
  const [PCs, setPCs] = useState(["00"]);
  const [PCsCode, setPCsCode] = useState(["00"]);
  const [ACs, setACs] = useState(["00"]);
  const [ACsCode, setACsCode] = useState(["00"]);
  const [roles, setRoles] = useState([]);
  const [rolesCode, setRolesCode] = useState([]);

  useEffect(() => {
    if (userID.length >= 2) {
      const statecode = userID.substring(0, 2)
      if (statesCode.indexOf(statecode) !== -1) {
        if (document.getElementById("stateDropdown")){
          document.getElementById("stateDropdown").value =states[statesCode.indexOf(statecode)];
        }
        setStateFunc(states[statesCode.indexOf(statecode)], false)
      }
      else {
        if(document.getElementById('stateDropdown'))document.getElementById("stateDropdown").value = "Select:";
      }
    }
    if (userID.length >= 4) {
      const pccode = (parseInt(userID.substring(2, 4))).toString()
      if (PCsCode.indexOf(pccode) !== -1) {
        if (document.getElementById("pcDropdown")){
          document.getElementById("pcDropdown").value =
            PCs[PCsCode.indexOf(pccode)];
        }
        setPCFunc(PCs[PCsCode.indexOf(pccode)], false)
      }
      else {
        if (document.getElementById("pcDropdown"))
          document.getElementById("pcDropdown").value = "Select:";
      }
    }

    if (userID.length >= 7) {
      const accode = userID.substring(4, 7)
      if (ACsCode.indexOf(accode) !== -1) {
         if (document.getElementById("acDropdown")){
           document.getElementById("acDropdown").value =
             ACs[ACsCode.indexOf(accode)];
         }
        setACFunc(ACs[ACsCode.indexOf(accode)], false)
      }
      else {
        if (document.getElementById("acDropdown"))
          document.getElementById("acDropdown").value = "Select:";
      }

      const role = userID.substring(7)
      console.log(role)
      console.log(rolesCode.indexOf(role))
      if(rolesCode.indexOf(role) !== -1){
        console.log("Readable Role:")
        console.log(roles[rolesCode.indexOf(role)])
        document.getElementById('roleDropdown').value = roles[rolesCode.indexOf(role)]
        setRoleFunc(roles[rolesCode.indexOf(role)], false)
      }
    }

    return () => {

    }
  }, [userID])


  async function getState() {
    try {
      const response = await fetch(
        "http://evm.iitbhilai.ac.in:8000/getStateList",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },

        }
      );
      const data2 = await response.json();
      console.log(data2);
      setStates(data2["list of states"]);
      setStatesCode(data2["list of Codes"]);

    } catch (err) {
      console.log(err);
    }
  }
  // getState(); 
  useEffect(() => {
    if (window.sessionStorage.getItem("sessionToken") !== null) {
      window.location.pathname = '/session/home'
    }

    getState();
  }, []);

  async function setStateFunc(st, changeUserID=true) {
    if (st !== "Select:") {
      setState(statesCode[states.indexOf(st)]);
      // console.log(statesCode[states.indexOf(st)]);
      if (
        statesCode[states.indexOf(st)] == "IN" ||
        statesCode[states.indexOf(st)] == "EL" ||
        statesCode[states.indexOf(st)] == "BL"
      ) {
      } else {
        try {
          const response = await fetch(
            `http://evm.iitbhilai.ac.in:8000/getPCListbyState/${statesCode[states.indexOf(st)]}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          const data2 = await response.json();
          // console.log(data2);
          setPCs(data2["list of PC names"]);
          setPCsCode(data2["list of PC Codes"]);
        } catch (err) {
          console.log(err);
        }
      }
      if(changeUserID){setUserID(statesCode[states.indexOf(st)] + ("00" + PC).slice(-2) + AC + role);}
      setInvalidUser("");
    }
  }
  async function setPCFunc(st, changeUserID=true) {
    console.log(state, PCsCode[PCs.indexOf(st)]);
    setPC(PCsCode[PCs.indexOf(st)]);
    if(state !== "Select:"){
      if (state == "IN" || state == "EL" || state == "BL") {
      }
      else {
        try {
          const response = await fetch(
            `http://evm.iitbhilai.ac.in:8000/getACListbyStatePC/${state}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          const data2 = await response.json();
          console.log("ACs");
          console.log(data2);
          setACs(data2["list of AC names"]);
          setACsCode(data2["list of AC Codes"]);
        } catch (err) {
          console.log(err);
        }
      }
      if(changeUserID){setUserID(state + ("00" + PCsCode[PCs.indexOf(st)]).slice(-2) + AC + role);}
      setInvalidUser("");
    }
  }
  async function setACFunc(st, changeUserID=true) {
    setAC(ACsCode[ACs.indexOf(st)]);
    console.log(ACsCode[ACs.indexOf(st)]);
    try {
      const response = await fetch(
        `http://evm.iitbhilai.ac.in:8000/getRoleList/`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data2 = await response.json();
      // console.log(data2);
      setRoles(data2["Human Readable Role Name"]);
      setRolesCode(data2["String Code to be used as a part of User ID"]);
    } catch (err) {
      console.log(err);
    }
     if(changeUserID) {setUserID(state + ("00" + PC).slice(-2) + ("000" + ACsCode[ACs.indexOf(st)]).slice(-3) + role);}
    setInvalidUser("");

  }
  async function setRoleFunc(st, changeUserID=true) {
    if(st !== "Select:"){
      setRole(rolesCode[roles.indexOf(st)]);
      console.log(rolesCode[roles.indexOf(st)]);
  
      if(changeUserID) {setUserID(state + ("00" + PC).slice(-2) + AC + rolesCode[roles.indexOf(st)]);}
      setInvalidUser("");
  
      console.log(userID);
    }
  }




  async function requestOTP() {
    if (userID == "") {
      setInvalidUser("Invalid User ID");
      console.log("none")
    }
    else {

      if (Number(userID)) {
        setMobile(userID);
        try {
          const response = await fetch(
            "http://evm.iitbhilai.ac.in:8000/getUserIDsByMobileNumber",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                mobileNumber: userID
              }),
            }
          );
          const data2 = await response.json();
          console.log(data2["userids"]);
          setUserIds(data2["userids"]);
          if (
            data2["message"] == "Mobile number not provided" ||
            data2["message"] == "User IDs not found"
          ) {
            setInvalidMobile("Mobile Number is not provided");
            setInvalidUser("");
            // setSelectUserBlock(1);
          } else {
            setInvalidMobile("");
            setInvalidUser("");
            try {
              const response = await fetch(
                "http://evm.iitbhilai.ac.in:8000/sendOTP",
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    mobileNumber: userID,
                  }),
                }
              );
              const data2 = await response.json();
              console.log(data2);

              setIsOTPSent(1);

              setSelectUserBlock(1);
            } catch (err) {
              console.log(err);
            }
          }
        } catch (err) {
          console.log(err);
        }
      } else {
        try {
          const response = await fetch(
            "http://evm.iitbhilai.ac.in:8000/getMobileFromUserID",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                userID: userID,
              }),
            }
          );
          const data = await response.json();
          console.log(data[0]);

          if (data[0]) {
            setMobile(data[0][0]);
            try {
              const response = await fetch(
                "http://evm.iitbhilai.ac.in:8000/sendOTP",
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    mobileNumber: data[0][0],
                  }),
                }
              );
              const data2 = await response.json();
              console.log(data2);

              setIsOTPSent(1);
            } catch (err) {
              console.log(err);
            }
            setInvalidUser("");
            setInvalidMobile("");
          } else {
            setMobile(-1);
            if (invalidMobile == "") {
              setInvalidUser("Invalid User ID");
              // setInvalidMobile("");
            }
            // console.log(invalidMobile, invaliduser);
            else setInvalidUser("");
          }
        } catch (err) {
          console.log(err);
        }
      }
    }
  }

  async function requestPasswordBlock() {
    try {
      const response = await fetch(
        "http://evm.iitbhilai.ac.in:8000/verifyOTP",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            mobileNumber: mobile,
            otp: OTP,
          }),
        }
      );
      const data2 = await response.json();
      console.log(data2);
      if (data2["message"] == "OTP does not match") {
        setInvalidOTP("OTP does not match");
        setOTP("");
      } else if (data2["message"] == "Mobile number or OTP not provided") {

        setInvalidOTP("User ID or OTP is incorrect");

      } else {
        setSelectUserBlock(0);
        setIsOTPSent(0);
        setPasswordBlock(1);
        setIsMobile(0);
      }
    } catch (err) {
      console.log(err);
    }
  }
  async function requestDashboard() {
    try {
      const response = await fetch(
        "http://evm.iitbhilai.ac.in:8000/verifyPasswordByUserID",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userID: userID,
            passwordhash: sha256(password),
          }),
        }
      );
      const data2 = await response.json();
      console.log(data2);
      if (data2["message"] === "Password does not match") {
        setInvalidPassword("Password does not match");
        setPassword("");
      } else {
        alert("You are logged In");
        setIsOTPSent(0);
        setPasswordBlock(0);
        setSelectUserBlock(0);
        window.sessionStorage.setItem('sessionToken', userID)
        // setMobile("");
        // setUserID("");
        // setState("");
        // setPC("");
        // setAC("");
        // setRole("");
        window.location.replace("/session/home");
      }
    } catch (err) {
      console.log(err);
    }
  }


  return (
    <div>
      <div className="nav flex">
        <div className="logo m-3 p-1">
          <a href="/">
            <img src="logo.png" className="h-4/5" />
          </a>
        </div>
        <div className="absolute right-3 top-3 w-5 flex">
          <div className="flex justify-between place-content-end  w-full">
            <a href="">
              <img src="Vector.png" />
            </a>
          </div>
        </div>
      </div>
      <div className="body pl-5 pr-5">
        <div className="flex ">
          <div className="img w-2/5 mt-16" style={{ marginLeft: "5%" }}>
            <img src="india.png" className=""></img>
          </div>
          <div
            className="login rounded-lg w-1/3 ml-16 mb-16"
            style={{ boxShadow: "-2px 0px 17px rgb(182, 182, 184)" }}
          >
            <div className="flex m-4 mt-8 h-14 place-content-center">
              <img src="logo.png" className=""></img>
            </div>
            <div className="m-4 mt-4 place-content-center">
              <h3 className="text-center" style={myFont}>
                <span style={{ color: "#F5811F" }}>E</span>
                <span style={{ color: "#2DA5BB" }}>V</span>
                <span style={{ color: "#00A551" }}>M</span>
                &nbsp;Management System
              </h3>
              <h3
                className="text-center "
                style={{
                  fontFamily: "nunito sans",
                  color: "rgba(0, 0, 0, 0.8)",
                  fontSize: "14px",
                }}
              >
                Login to access your account
              </h3>
            </div>
            <hr className="ml-5 mr-5"></hr>
            <div className="m-7 mt-2 place-content-center">
              {isOTPSent == 0 && passwordBlock == 0 && selectUserBlock == 0 && (
                <>
                  <p
                    className="text-black pl-1 text-sm font-semibold"
                    style={{ fontFamily: "nunito sans" }}
                  >
                    Mobile Number / User ID
                  </p>

                  <input
                    type="text"
                    className="pl-3 pr-3 mt-1 mb-4 h-13 text-black outline-none rounded-md w-full"
                    placeholder="Enter Mobile Number/User ID"
                    value={userID}
                    onChange={(e) => setUserID(e.target.value)}
                    style={{
                      backgroundColor: " rgba(30, 76, 247, 0.1)",
                      fontFamily: "nunito sans",
                    }}
                  ></input>
                  {invaliduser != "" && (
                    <div className="text-red-500">{invaliduser}</div>
                  )}
                  {invalidMobile != "" && (
                    <div className="text-red-500">{invalidMobile}</div>
                  )}
                  <p
                    className="  text-center text-black text-sm font-semibold"
                    style={{ fontFamily: "nunito sans" }}
                  >
                    OR
                  </p>
                  <div
                    className="mobile-tab  place-content-center border-2 mt-2 rounded-lg p-4"
                    style={{ border: "1px solid #717171" }}
                  >
                    <div className="dropdown">
                      <p
                        for="position"
                        className="text-black ml-2 -mb-6 text-sm font-semibold"
                        style={{ fontFamily: "nunito sans" }}
                      >
                        State
                      </p>
                      <select
                        className="pl-3 pr-3 mt-7 h-13 text-black outline-none rounded-md w-full mb-5"
                        style={{ fontFamily: "nunito sans" }}
                        id="stateDropdown"
                        name="position"
                        // value={state}
                        onChange={(e) => setStateFunc(e.target.value)}
                      >
                        <option value="0" className="text-black" >
                          Select:
                        </option>

                        {states.map((st) => (
                          <option value={st} className="text-black">
                            {st}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="dropdown">
                      <p
                        for="position"
                        className="text-black ml-2 -mb-6 text-sm font-semibold"
                        style={{ fontFamily: "nunito sans" }}
                      >
                        PC
                      </p>
                      <select
                        className="pl-3 pr-3 mt-7 h-13 text-black outline-none rounded-md w-full mb-5"
                        style={{ fontFamily: "nunito sans" }}
                        id="pcDropdown"
                        name="position"
                        // value={PC}
                        onChange={(e) => setPCFunc(e.target.value)}
                      >
                        <option value="0" className="text-black">
                          Select:
                        </option>
                        {PCs.map((st) => (
                          <option value={st} className="text-black">
                            {st}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="dropdown">
                      <p
                        for="position"
                        className="text-black ml-2 -mb-6 text-sm font-semibold"
                        style={{ fontFamily: "nunito sans" }}
                      >
                        AC
                      </p>
                      <select
                        className="pl-3 pr-3  mt-7 h-13 text-black outline-none rounded-md w-full mb-5"
                        style={{ fontFamily: "nunito sans" }}
                        name="position"
                        id="acDropdown"
                        // value={AC}
                        onChange={(e) => setACFunc(e.target.value)}
                      >
                        <option value="0" className="text-black">
                          Select:
                        </option>
                        {ACs.map((st) => (
                          <option value={st} className="text-black">
                            {st}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="dropdown">
                      <p
                        for="position"
                        className="text-black ml-2 -mb-6 text-sm font-semibold"
                        style={{ fontFamily: "nunito sans" }}
                      >
                        Role
                      </p>
                      <select
                        className="pl-3 pr-3 mt-7 h-13 text-black outline-none rounded-md w-full mb-3"
                        style={{ fontFamily: "nunito sans" }}
                        name="position"
                        id="roleDropdown"
                        // value={role}
                        onChange={(e) => setRoleFunc(e.target.value)}
                      >
                        <option value="0" className="text-black">
                          Select:
                        </option>
                        {roles.map((st) => (
                          <option value={st} className="text-black">
                            {st}
                          </option>
                        ))}
                      </select>
                    </div>
                    <button
                      onClick={requestOTP}
                      type="button"
                      className="pl-3 pr-3 mt-7 h-12 outline-none rounded-md w-full text-white"
                      style={{ backgroundColor: "#F58220" }}
                    >
                      Request OTP
                    </button>
                  </div>
                </>
              )}
              {passwordBlock == 1 && (
                <Password
                  data={requestDashboard}
                  user={userID}
                  password={password}
                  setPassword={setPassword}
                  invalidPassword={invalidPassword}
                />
              )}
              {selectUserBlock == 1 && (
                <SelectUser
                  data={requestPasswordBlock}
                  user={setUserID}
                  userID={userID}
                  userIDs={userIDs}
                />
              )}
              {isOTPSent == 1 && (
                <Otp
                  data={requestPasswordBlock}
                  OTP={OTP}
                  setOTP={setOTP}
                  invalidOTP={invalidOTP}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;

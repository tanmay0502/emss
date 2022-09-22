import React from "react";
import { useState, useEffect } from "react";
import "./styles/createuser.css";
import { ReactComponent as UserManagementIcon } from "../../assets/Users.svg";
import { ReactComponent as ChevronRightIcon } from "../../assets/ChevronRight.svg";
var sha256 = require("js-sha256");
class Queue {
  constructor() {
    this.elements = {};
    this.head = 0;
    this.tail = 0;
  }
  enqueue(element) {
    this.elements[this.tail] = element;
    this.tail++;
  }
  dequeue() {
    const item = this.elements[this.head];
    delete this.elements[this.head];
    this.head++;
    return item;
  }
  peek() {
    return this.elements[this.head];
  }
  get length() {
    return this.tail - this.head;
  }
  get isEmpty() {
    return this.length === 0;
  }
}
function CreateUser() {

  
   
   
  
   
   const lev5= {"TU":null}
   const lev4A = { DDEO: lev5, RO: null, "RO/ARO": null, WHM: lev5, TU: null };
    const lev3A = { Nos: null, DEO: lev4A, "CEO-Office": null };
    const lev3B = { "ECI-Users": lev5, "WHM-Mfr": lev5 };
   const lev2 = { CEO: lev3A, "Mfr-Admin": lev3B };
  const lev1 = {
    "ECI-Admin": lev2,
  };
  

  const [loggedUser, setLoggedUser]=useState(null);

  const [isTemporary, setIsTemporary] = useState(true);
  const [frs, setFrs] = useState();
  const [UserId, setUserId] = useState("");
  const [UserName, setUserName] = useState("");
  const [UserPassword, setUserPassword] = useState("");
  const [UserEmail, setUserEmail] = useState("");
  const [UserMobile, setUserMobile] = useState("");
  const [UserAddress, setUserAddress] = useState("");
  const [UserAltContact1, setUserAltContact1] = useState("");
  const [UserAltContact2, setUserAltContact2] = useState("");
  const [UserImage, setUserImage] = useState("");
  const [PasswordHash, setPasswordHash] = useState("");
  const [state, setState] = useState([]);
  const [states, setStates] = useState([]);
  const [statesCode, setStatesCode] = useState([]);
  const [PCs, setPCs] = useState([]);
  const [PCsCode, setPCsCode] = useState(["00"]);
  const [ACs, setACs] = useState([]);
  const [ACsCode, setACsCode] = useState(["00"]);
  const [userID, setUserID] = useState("");
  const [PC, setPC] = useState("");
  const [AC, setAC] = useState("");
  const [role, setRole] = useState("TU");
  const [invaliduser, setInvalidUser] = useState("");
  const [roles, setRoles] = useState([]);
  const [rolesCode, setRolesCode] = useState([]);

  const [isFaded, setIsFaded] = useState ({
    state:null,
    PC:null,
    AC:null
  })
  async function getState() {
    
    try {
      const response = await fetch(
        "http://evm.iitbhilai.ac.in:8100/getStateList",
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
  useEffect(() => {
   getState();
    if (window.sessionStorage.getItem("sessionToken") === null) {
      window.location.pathname = "/session/home";
    }
  }, []);


 
  useEffect(() => {
  
      console.log(states)

      console.log("session", window.sessionStorage.getItem("sessionToken"));
      setLoggedUser(window.sessionStorage.getItem("sessionToken"));

      if (
        window.sessionStorage.getItem("sessionToken").substring(0, 2) in
        ["EC", "ME", "MB"]
      ) {
        setIsFaded({
          state: null,
          PC: null,
          AC: null,
        });
      } else {
        setIsFaded({
          state: 1,
          PC: 1,
          AC: 1,
        });
        if (window.sessionStorage.getItem("sessionToken")) {
          // console.log(window.sessionStorage.getItem("sessionToken"));

          const statecode = window.sessionStorage
            .getItem("sessionToken")
            .substring(0, 2);
          console.log(statecode, states);
          if (
            statesCode.indexOf(
              window.sessionStorage.getItem("sessionToken").substring(0, 2)
            ) != -1
          ) {
            console.log(
              statesCode.indexOf(
                window.sessionStorage.getItem("sessionToken").substring(0, 2)
              )
            );
            if (1) {
              document.getElementById("stateDropdown").value =
                states[
                  statesCode.indexOf(
                    window.sessionStorage
                      .getItem("sessionToken")
                      .substring(0, 2)
                  )
                ];
            }
            setStateFunc(
              states[
                statesCode.indexOf(
                  window.sessionStorage.getItem("sessionToken").substring(0, 2)
                )
              ],
              false
            );
          } else {
            if (document.getElementById("stateDropdown"))
              document.getElementById("stateDropdown").value = "Select:";
          }
        }


      }
     
   

  }, [states]);
 
  useEffect(() => {
      console.log(PCs,PCsCode)
      if (
        window.sessionStorage.getItem("sessionToken").substring(0, 2) in
        ["EC", "ME", "MB"]
      ) {
        setIsFaded({
          state: null,
          PC: null,
          AC: null,
        });
      } else {
        setIsFaded({
          state: 1,
          PC: 1,
          AC: 1,
        });
        if (window.sessionStorage.getItem("sessionToken")) {
          // console.log(window.sessionStorage.getItem("sessionToken"));

          const ppcode = parseInt(window.sessionStorage
            .getItem("sessionToken")
            .substring(2, 4)).toString();
          console.log("pc",ppcode);
          if (
            1
          ) {
            console.log("pp",
              ppcode
            );
            if (1) {
              document.getElementById("pcDropdown").value =
                PCs[PCsCode.indexOf(ppcode)];
            }
            setPCFunc(
              PCs[
                PCsCode.indexOf(
                  ppcode
                )
              ],
              false
            );
          } else {
            if (document.getElementById("pcDropdown"))
              document.getElementById("pcDropdown").value = "Select:";
          }
        }


      }
     
   

  }, [PCs]);
  useEffect(() => {
      console.log(ACs,ACsCode)
      if (
        window.sessionStorage.getItem("sessionToken").substring(0, 2) in
        ["EC", "ME", "MB"]
      ) {
        setIsFaded({
          state: null,
          PC: null,
          AC: null,
        });
      } else {
        setIsFaded({
          state: 1,
          PC: 1,
          AC: 1,
        });
        if (window.sessionStorage.getItem("sessionToken") && ACs && ACsCode) {
          // console.log(window.sessionStorage.getItem("sessionToken").substring(7));

          const accode = (window.sessionStorage
            .getItem("sessionToken")
            .substring(4, 7)).toString();
          console.log("pc",accode);
          if (
            1
          ) {
            console.log("pp",
              accode
            );
            if (1) {
              document.getElementById("acDropdown").value =
                ACs[ACsCode.indexOf(accode)];
            }
            setACFunc(
              ACs[ACsCode.indexOf(accode)],
              false,
              window.sessionStorage.getItem("sessionToken").substring(7)
            );
          } else {
            if (document.getElementById("acDropdown"))
              document.getElementById("acDropdown").value = "Select:";
          }
        }


      }
     
   

  }, [ACs]);
  
 
     
   

  const onFormSubmit = async (e) => {
    e.preventDefault();

    setUserName(document.getElementById("formUserName").value);
    setUserEmail(document.getElementById("formUserEmail").value);
    setUserMobile(document.getElementById("formUserMobileNumber").value);
    setUserAddress(document.getElementById("formUserAddress").value);
    setUserAltContact1(document.getElementById("formUserAltNumber1").value);
    setUserAltContact2(document.getElementById("formUserAltNumber2").value);
    setUserImage(document.getElementById("formUserImage").files[0]);

    console.log(state);
    // setPasswordHash(UserPassword); // Generate Password hash here
    var fr = new FileReader();
    // fr.onload = () => {
    //   setFrs(fr.name);
    //   const ReqJSON = {
    //     userID: UserId,
    //     email: UserEmail,
    //     name: UserName,
    //     mobilenumber: UserMobile,
    //     address: UserAddress,
    //     othercontactnum1: UserAltContact1,
    //     othercontactnum2: UserAltContact2,
    //     active: "string",
    //     // "activationtime": "2022-09-13T18:43:47.135Z",
    //     photofilename: fr.result,
    //     // "createdby": "string",
    //     // "creationtime": "2022-09-13T18:43:47.135Z",
    //     passwordhash: PasswordHash,
    //   };
    addUser(); // Perform API Call here
    // console.log(ReqJSON);
    // document.getElementById("createUserForm").reset();
    // };
    // await fr.readAsDataURL(UserImage);
  };

  async function setStateFunc(st, changeUserID = true) {
    if (st !== "Select:") {
      setState(statesCode[states.indexOf(st)]);
      if (
        statesCode[states.indexOf(st)] == "IN" ||
        statesCode[states.indexOf(st)] == "EL" ||
        statesCode[states.indexOf(st)] == "BL"
      ) {
      } else {
        try {
          const response = await fetch(
            `http://evm.iitbhilai.ac.in:8100/getPCListbyState/${
              statesCode[states.indexOf(st)]
            }`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          const data2 = await response.json();
          if (data2["list of PC Codes"] && data2["list of PC names"]) {
            setPCs(data2["list of PC names"]);
            setPCsCode(data2["list of PC Codes"]);
          }
        } catch (err) {
          console.log(err);
        }
      }
      if (changeUserID) {
        setUserID(
          statesCode[states.indexOf(st)] + ("00" + PC).slice(-2) + AC + role
        );
      }
      setInvalidUser("");
    }
  }

  async function setPCFunc(st, changeUserID = true) {
    console.log(st)
    console.log(state, PCsCode[PCs.indexOf(st)]);
    setPC(PCsCode[PCs.indexOf(st)]);
    if (state !== "Select:") {
      if (state == "IN" || state == "EL" || state == "BL") {
      } else {
        try {
          const response = await fetch(
            `http://evm.iitbhilai.ac.in:8100/getACListbyStatePC/${state}`,
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
      if (changeUserID) {
        setUserID(
          state + ("00" + PCsCode[PCs.indexOf(st)]).slice(-2) + AC + role
        );
      }
      setInvalidUser("");
    }
  }

  async function setACFunc(
    st,
    changeUserID = true,
    filterStr = window.sessionStorage.getItem("sessionToken").substring(7)
  ) {
    setAC(ACsCode[ACs.indexOf(st)]);
    console.log(ACsCode[ACs.indexOf(st)]);
    try {
      const response = await fetch(
        `http://evm.iitbhilai.ac.in:8100/getRoleList/`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data2 = await response.json();
      console.log(data2);
      let rcode=[];
      //
      // here is the function for filtering the role for which new user can be created by the logged in user
      //
      //  for (let key in yourobject) {
      //    console.log(key, yourobject[key]);
      //  }

      var q=new Queue();

      if(filterStr in lev1) {
        q.enqueue(lev1[filterStr]);
      }
      else if(filterStr in lev2){
        q.enqueue(lev2[filterStr]);
      }
      else if(filterStr in lev3A){
        q.enqueue(lev3A[filterStr]);
      }
      else if(filterStr in lev3B){
        q.enqueue(lev3B[filterStr]);
      }
      
      else if(filterStr in lev4A){
        q.enqueue(lev4A[filterStr]);
      }
      else if(filterStr in lev5){
        q.enqueue(lev5[filterStr]);
      }
      

      while(!q.isEmpty){
        var f=q.peek();
        q.dequeue();
        if(f==null) continue;
        for (let key in f) {
          q.enqueue(f[key]);
          if(key!=filterStr){
          rcode.push(key);
          }
        }
        
      }
      rcode = [...new Set(rcode)];
      console.log(rcode);
      let rc=[];
      let rname=[]
      for(let i=0;i<data2["String Code to be used as a part of User ID"].length;i++){
        console.log(data2["String Code to be used as a part of User ID"][i]);
        if(rcode.includes(data2["String Code to be used as a part of User ID"][i])){
          console.log("hh");
          rc.push(data2["String Code to be used as a part of User ID"][i]);
          rname.push(data2["Human Readable Role Name"][i]);
        }
      }

      //
      console.log(rname,rc)
      setRoles(rname);
      setRolesCode(rc);
    } catch (err) {
      console.log(err);
    }
    if (changeUserID) {
      setUserID(
        state +
          ("00" + PC).slice(-2) +
          ("000" + ACsCode[ACs.indexOf(st)]).slice(-3) +
          role
      );
    }
    setInvalidUser("");
  }

  async function setRoleFunc(st, changeUserID = true) {
    if (st !== "Select:") {
      setRole(rolesCode[roles.indexOf(st)]);
      if (changeUserID) {
        setUserID(
          state + ("00" + PC).slice(-2) + AC + rolesCode[roles.indexOf(st)]
        );
      }
      setInvalidUser("");
      console.log(userID);
    }
  }

  useEffect(()=>{
     setUserID(
       state + ("00" + PC).slice(-2) + AC + role
     );
  },[state,AC,PC,role])

  async function addUser() {
    console.log(userID)
    try {
      const response = await fetch(
        "http://evm.iitbhilai.ac.in:8100/createUser",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userID: userID,
            email: document.getElementById("formUserEmail").value,
            name: document.getElementById("formUserName").value,
            mobilenumber: document.getElementById("formUserMobileNumber").value,
            address: document.getElementById("formUserAddress").value,
            othercontactnum1:
              document.getElementById("formUserAltNumber1").value,
            othercontactnum2: document.getElementById("formUserAltNumber2").value,
            state: state,
            Pc: PC,
            AC: AC,
            ROLE: role,
            active: "A",
            activationtime: "2022-09-14T17:14:33.658Z",
            photofilename: "imagefile",
            createdby: "AP00000CEO",
            creationtime: "2022-09-14T17:14:33.658Z",
            passwordhash: sha256(""),
          }),
        }
      );

      console.log(response);
      const data2 = await response.json();
      console.log(data2);
      if (data2["message"] === "User created successfully") {
        document.getElementById("createUserForm").reset();
        alert("User Created Successfully");
        window.location.pathname = "/session/usermanagement";
      } else {
        alert("User cannot be created");
      }
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    if (isTemporary) {
      // console.log(isTemporary);
      // document.getElementById("formUserID").value = "";
    }
    return () => {};
  }, [isTemporary]);
  console.log(isTemporary);
  return (
    <div className="create-user-container">
      <div className="content-path">
        <UserManagementIcon />
        <a href="/session/usermanagement">User Management</a>
        <ChevronRightIcon />
        <span>Create User</span>
      </div>
      <h4>User Details</h4>
      <div>
        <form
          id="createUserForm"
          onSubmit={onFormSubmit}
          className="form-container"
        >
          <div className="submit-area">
            <input type={"submit"} value="Submit" />
          </div>
          <div className="div1 label">Type:</div>
          <div className="div2 label">
            Name
            <span className="mandatory-indicator" hidden={false}>
              *
            </span>
            :
          </div>
          <div className="div3 label">
            Email Address
            <span className="mandatory-indicator" hidden={false}>
              *
            </span>
            :
          </div>
          <div className="div4 label">
            Address
            <span className="mandatory-indicator" hidden={false}>
              *
            </span>
            :
          </div>
          <div className="div5 label">
            Mobile Number
            <span className="mandatory-indicator" hidden={false}>
              *
            </span>
            :
          </div>
          <div className="div6 label">
            User Image
            <span className="mandatory-indicator" hidden={!isTemporary}>
              *
            </span>
            :
          </div>
          <div className="div13 label">
            State
            <span
              className="mandatory-indicator"
              hidden={isTemporary || isFaded["state"]}
            >
              *
            </span>
            :
          </div>
          <div className="div14 label">
            PC
            <span
              className="mandatory-indicator"
              hidden={isTemporary || isFaded["PC"]}
            >
              *
            </span>
            :
          </div>
          <div className="div15 label">
            AC
            <span
              className="mandatory-indicator"
              hidden={isTemporary || isFaded["AC"]}
            >
              *
            </span>
            :
          </div>
          <div className="div16 label">
            Role
            <span className="mandatory-indicator" hidden={isTemporary}>
              *
            </span>
            :
          </div>
          <div className="div17 label">
            Alt Contact 1<span className="mandatory-indicator">*</span>:
          </div>
          <div className="div18 label">
            Alt Contact 2<span className="mandatory-indicator">*</span>:
          </div>

          <div className="div7">
            <select
              id="user-type"
              required
              onChange={(e) => {
                setIsTemporary(e.target.selectedIndex === 0);
              }}
            >
              <option value="temporary">Temporary User</option>
              <option value="permanent">Permanent User</option>
            </select>
          </div>

          <div className="div8">
            <input
              id="formUserName"
              required={true}
              type={"text"}
              placeholder="Full Name"
            />
          </div>

          <div className="div9">
            <input
              id="formUserEmail"
              required={true}
              type={"email"}
              placeholder="xyz@example.com"
            />
          </div>

          <div className="div10">
            <input
              id="formUserAddress"
              required={true}
              type={"text"}
              placeholder="Address"
            />
          </div>

          <div className="div11">
            <input
              id="formUserMobileNumber"
              required={true}
              pattern="^\d{10}"
              type={"tel"}
              placeholder="00000 00000"
            />
          </div>

          <div className="div12">
            <input
              id="formUserImage"
              required={isTemporary}
              type="file"
              placeholder="Choose Image (Upto 5 MB)"
            />
          </div>

          <div className="div19">
            <select
              name="position"
              id="stateDropdown"
              disabled={isTemporary || isFaded["state"]}
              required={!isTemporary}
              onChange={(e) => setStateFunc(e.target.value)}
            >
              <option
                value="0"
                className="text-black"
                disabled={true}
                selected={false}
              >
                Select:
              </option>
              {states.map((st) => (
                <option value={st} className="text-black">
                  {st}
                </option>
              ))}
            </select>
          </div>

          <div className="div20">
            <select
              name="position"
              id="pcDropdown"
              disabled={isTemporary || isFaded["PC"]}
              required={!isTemporary}
              onChange={(e) => setPCFunc(e.target.value)}
            >
              <option
                value="0"
                className="text-black"
                disabled={true}
                selected={false}
              >
                Select:
              </option>
              {PCs &&
                PCs.map((st) => (
                  <option value={st} className="text-black">
                    {st}
                  </option>
                ))}
            </select>
          </div>

          <div className="div21">
            <select
              name="position"
              id="acDropdown"
              disabled={isTemporary || isFaded["AC"]}
              required={!isTemporary}
              onChange={(e) => setACFunc(e.target.value)}
            >
              <option
                value="0"
                className="text-black"
                disabled={true}
                selected={false}
              >
                Select:
              </option>
              {ACs &&
                ACs.map((st) => (
                  <option value={st} className="text-black">
                    {st}
                  </option>
                ))}
            </select>
          </div>

          <div className="div22">
            <select
              name="position"
              id="roleDropdown"
              disabled={isTemporary}
              required={!isTemporary}
              onChange={(e) => setRoleFunc(e.target.value)}
            >
              <option
                value="0"
                className="text-black"
                disabled={true}
                selected={false}
              >
                Select:
              </option>
              {roles &&
                roles.map((st) => (
                  <option value={st} className="text-black">
                    {st}
                  </option>
                ))}
            </select>
          </div>

          <div className="div23">
            <input
              id="formUserAltNumber1"
              type={"tel"}
              required
              placeholder="00000 00000"
            />
          </div>

          <div className="div24">
            <input
              id="formUserAltNumber2"
              type={"tel"}
              required
              placeholder="00000 00000"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateUser;

import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { ReactComponent as Createuser } from "../../assets/CreateUser.svg";
import "./styles/createuser.css";
import styles from "./styles/createuser.css";
import 'antd/dist/antd.css'
import { Switch } from "antd"


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

  const navigate = useNavigate()



  const lev5 = { "TU": null }
  const lev4A = { DDEO: lev5, RO: null, "RO/ARO": null, WHM: lev5, TU: null };
  const lev3A = { Nos: null, DEO: lev4A, "CEO-Office": null };
  const lev3B = { "ECI-Users": lev5, "WHM-Mfr": lev5 };
  const lev2 = { CEO: lev3A, "Mfr-Admin": lev3B };
  const lev1 = {
    "ECI-Admin": lev2,
  };

  const [isTemporary, setIsTemporary] = useState(false);
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
  const [roles, setRoles] = useState([]);
  const [rolesCode, setRolesCode] = useState([]);

  async function getState() {

    try {
      const response = await fetch(
        "http://evm.iitbhilai.ac.in:8100/user/getStateList",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data2 = await response.json();
      console.log(data2);
      setStates(data2["states"]);
      setStatesCode(data2["stcodes"]);
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    if (window.sessionStorage.getItem("sessionToken") === null) {
      window.location.pathname = "/session/home";
    }
    getState();
  }, []);

  useEffect(() => {

    console.log(states)

    // console.log("session", window.sessionStorage.getItem("sessionToken"));
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
          // document.getElementById("stateDropdown").value =
          //   states[
          //   statesCode.indexOf(
          //     window.sessionStorage
          //       .getItem("sessionToken")
          //       .substring(0, 2)
          //   )
          //   ];
        }
        setStateFunc(
          states[statesCode.indexOf(window.sessionStorage.getItem("sessionToken").substring(0, 2))],
          false
        );
      } else {
        if (document.getElementById("stateDropdown"))
          document.getElementById("stateDropdown").value = "Select:";
      }
    }
  }, [states]);

  useEffect(() => {
    console.log(PCs, PCsCode)
    if (window.sessionStorage.getItem("sessionToken")) {
      // console.log(window.sessionStorage.getItem("sessionToken"));

      var ppcode = parseInt(
        window.sessionStorage.getItem("sessionToken").substring(2, 4)
      ).toString();
      const pwpcode = window.sessionStorage
        .getItem("sessionToken")
        .substring(2, 4);
      if (PCs[PCsCode.indexOf(pwpcode)] != -1) {
        ppcode = pwpcode
      } console.log("pc", ppcode);
      if (1) {
        console.log("pp", ppcode);
        if (1) {
          // document.getElementById("pcDropdown").value =
          //   PCs[PCsCode.indexOf(ppcode)];
        }
        setPCFunc(PCs[PCsCode.indexOf(ppcode)], false);
      } else {
        if (document.getElementById("pcDropdown"))
          document.getElementById("pcDropdown").value = "Select:";
      }
    }

  }, [PCs]);
  useEffect(() => {
    console.log(ACs, ACsCode)
    if (window.sessionStorage.getItem("sessionToken") && ACs && ACsCode) {
      // console.log(window.sessionStorage.getItem("sessionToken").substring(7));

      const accode = window.sessionStorage
        .getItem("sessionToken")
        .substring(4, 7)
        .toString();
      console.log("pc", accode);
      if (1) {
        console.log("pp", accode);
        if (1) {
          // document.getElementById("acDropdown").value =
          //   ACs[ACsCode.indexOf(accode)];
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



  }, [ACs]);





  const onFormSubmit = async (e) => {
    e.preventDefault();

    addUser(); // Perform API Call here
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
            `http://evm.iitbhilai.ac.in:8100/user/getPCListbyState/${statesCode[states.indexOf(st)]
            }`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          const data2 = await response.json();
          if (data2["pccode"] && data2["pcname"]) {
            setPCs(data2["pcname"]);
            setPCsCode(data2["pccode"]);
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
    }
  }

  const toggler = () => {
    isTemporary ? setIsTemporary(false) : setIsTemporary(true);
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
            `http://evm.iitbhilai.ac.in:8100/user/getACListbyStatePC/${state}`,
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
          setACs(data2["acname"]);
          setACsCode(data2["accode"]);
        } catch (err) {
          console.log(err);
        }
      }
      if (changeUserID) {
        setUserID(
          state + ("00" + PCsCode[PCs.indexOf(st)]).slice(-2) + AC + role
        );
      }
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
        `http://evm.iitbhilai.ac.in:8100/user/getRoleList/`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data2 = await response.json();
      console.log(data2);
      if (["EC", "ME", "MB"].includes(
        window.sessionStorage.getItem("sessionToken").substring(0, 2)
      )) {
        setRoles(data2["roleName"]);
        setRolesCode(data2["roleCode"]);


      }
      else {

        let rcode = [];
        //
        // here is the function for filtering the role for which new user can be created by the logged in user
        //
        //  for (let key in yourobject) {
        //    console.log(key, yourobject[key]);
        //  }

        var q = new Queue();

        if (filterStr in lev1) {
          q.enqueue(lev1[filterStr]);
        }
        else if (filterStr in lev2) {
          q.enqueue(lev2[filterStr]);
        }
        else if (filterStr in lev3A) {
          q.enqueue(lev3A[filterStr]);
        }
        else if (filterStr in lev3B) {
          q.enqueue(lev3B[filterStr]);
        }

        else if (filterStr in lev4A) {
          q.enqueue(lev4A[filterStr]);
        }
        else if (filterStr in lev5) {
          q.enqueue(lev5[filterStr]);
        }


        while (!q.isEmpty) {
          var f = q.peek();
          q.dequeue();
          if (f == null) continue;
          for (let key in f) {
            q.enqueue(f[key]);
            if (key != filterStr) {
              rcode.push(key);
            }
          }

        }
        rcode = [...new Set(rcode)];
        console.log(rcode);
        let rc = [];
        let rname = []
        for (let i = 0; i < data2["roleCode"].length; i++) {
          console.log(data2["roleCode"][i]);
          if (rcode.includes(data2["roleCode"][i])) {
            console.log("hh");
            rc.push(data2["roleCode"][i]);
            rname.push(data2["roleName"][i]);
          }
        }
        console.log(rname, rc)
        setRoles(rname);
        setRolesCode(rc);
      }
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
  }

  async function setRoleFunc(st, changeUserID = true) {
    if (st !== "Select:") {
      setRole(rolesCode[roles.indexOf(st)]);
      if (changeUserID) {
        setUserID(
          state + ("00" + PC).slice(-2) + AC + rolesCode[roles.indexOf(st)]
        );
      }
      console.log(userID);
    }
  }

  useEffect(() => {
    setUserID(
      state + ("00" + PC).slice(-2) + AC + role
    );
  }, [state, AC, PC, role])

  async function addUser() {
    console.log(userID)
    try {
      const response = await fetch(
        "http://evm.iitbhilai.ac.in:8100/user/createUser",
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
            othercontactnum2:
              document.getElementById("formUserAltNumber2").value,
            active: isTemporary ? "I" : "A",
            activationtime: "2022-09-14T17:14:33.658Z",
            photofilename: "imagefile",
            createdby: window.sessionStorage.getItem("sessionToken"),
            creationtime: "2022-09-14T17:14:33.658Z",
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
    return () => { };
  }, [isTemporary]);
  console.log(isTemporary);
  return (

    <div className="flex-col justify-center align-middle">
      <form
        id="create-User-form"
        className="myForm"
        onSubmit={onFormSubmit}
      >
        <div className="PageTitle">
          <h4>
            <button
              className="flex justify-center rounded-full aspect-square "
              onClick={() => {
                navigate('/session/usermanagement')
              }}
              style={{ "background": "#84587C", color: "white" }}
            >
              <AiOutlineArrowLeft />
            </button>
            <Createuser />
            <span>Create User</span>
          </h4>
        </div>

        <div className="userTemporaryToggle">
          <span className={isTemporary ? styles.inactive : styles.active}>Permanent </span>
          <Switch onClick={toggler} />
          <span className={isTemporary ? styles.active : styles.inactive}>Temporary </span>
        </div>

        <div className="five-column-grid">
          <div className="form_label">
            <label htmlFor="">Name:<span className="text-red-500 text-lg">*</span></label>
          </div>
          <div className="form_group">
            <div className="form_input">
              <input
                required
                id="formUserName"
                type={"text"}
                step="any"
                name=""
                className=""
                placeholder="Full Name"
              />
            </div>
          </div>

          <div className="form_label">
            <label htmlFor="">Address:<span className="text-red-500 text-lg">*</span></label>
          </div>
          <div className="form_group">
            <div className="form_input">
              <input
                required
                id="formUserAddress"
                type={"text"}
                step="any"
                name=""
                className=""
                placeholder="Address"
              />
            </div>
          </div>

          <div className="form_label">
            <label htmlFor="">Email Address:<span className="text-red-500 text-lg">*</span></label>
          </div>
          <div className="form_group">
            <div className="form_input">
              <input
                required
                id="formUserEmail"
                type={"text"}
                step="any"
                name=""
                className=""
                placeholder="Email Address"
              />
            </div>
          </div>

          <div className="form_label">
            <label htmlFor="">State:<span className="text-red-500 text-lg">*</span></label>
          </div>
          <div className="form_group">
            <div className="form_select">
              <select
                disabled = {isTemporary}
                required
                name=""
                id="input_state"
                onChange={(e) => setStateFunc(e.target.value)}
              >
                <option value="0" disabled selected>
                  --Select--
                </option>
                {states && states.map((st) => (
                  <option value={st} className="text-black">
                    {st}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form_label">
            <label htmlFor="">Mobile Number:<span className="text-red-500 text-lg">*</span></label>
          </div>
          <div className="form_group">
            <div className="form_input">
              <input
                required
                id="formUserMobileNumber"
                type={"tel"}
                step="any"
                name=""
                className=""
                placeholder="00000 00000"
              />
            </div>
          </div>

          <div className="form_label">
            <label htmlFor="">PC:<span className="text-red-500 text-lg">*</span></label>
          </div>
          <div className="form_group">
            <div className="form_select">
              <select
                disabled = {isTemporary}
                required
                name=""
                id="input_PC"
                onChange={(e) => setPCFunc(e.target.value)}
              >
                <option value="" disabled selected>
                  --Select--
                </option>
                {PCs && PCs.map((st) => (
                  <option value={st} className="text-black">
                    {st}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form_label">
            <label htmlFor="">Alt Contact 1:</label>
          </div>
          <div className="form_group">
            <div className="form_input">
              <input
                id="formUserAltNumber1"
                type={"tel"}
                step="any"
                name=""
                className=""
                placeholder="00000 00000"
              />
            </div>
          </div>

          <div className="form_label">
            <label htmlFor="">AC:<span className="text-red-500 text-lg">*</span></label>
          </div>
          <div className="form_group">
            <div className="form_select">
              <select
                disabled = {isTemporary}
                required
                name=""
                id="input_AC"
                onChange={(e) => setACFunc(e.target.value)}
              >
                <option value="" disabled selected>
                  --Select--
                </option>
                {ACs && ACs.map((st) => (
                  <option value={st} className="text-black">
                    {st}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form_label">
            <label htmlFor="">Alt Contact 2:</label>
          </div>
          <div className="form_group">
            <div className="form_input">
              <input
                id="formUserAltNumber2"
                type={"tel"}
                step="any"
                name=""
                className=""
                placeholder="00000 00000"
              />
            </div>
          </div>

          <div className="form_label">
            <label htmlFor="">Role/s:<span className="text-red-500 text-lg">*</span></label>
          </div>
          <div className="form_group">
            <div className="form_select">
              <select
                disabled = {isTemporary}
                required={!isTemporary}
                name=""
                id="input_Roles"
                onChange={(e) => setRoleFunc(e.target.value)}
              >
                <option value="" disabled selected>
                  --Select--
                </option>
                {roles && roles.map((st) => (
                  <option value={st} className="text-black">
                    {st}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form_label">
            <label htmlFor="">User Image:
                  {isTemporary?<span className="text-red-500 text-lg">*</span>: <span></span> }
            </label>
          </div>
          <div className="form_group">
            <input
              id="formUserImage"
              required={isTemporary}
              type="file"
              placeholder="Choose Image (Upto 5 MB)"
            />
          </div>
        </div>

        <center>
          <input type={"submit"} className="mySubmit">
          </input>
        </center>


      </form >
    </div >
  );
}

export default CreateUser;
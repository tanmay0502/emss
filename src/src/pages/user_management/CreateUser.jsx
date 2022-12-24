import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { ReactComponent as Createuser } from "../../assets/CreateUser.svg";
import "./styles/createuser.css";
import styles from "./styles/createuser.css";
import 'antd/dist/antd.css'
import { Switch } from "antd"
import { getKeyByValue } from '../../assets/helper/ObjectHelpers.js'
import imageCompression from 'browser-image-compression';

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
  const [baseImage, setBaseImage ] = useState("");
  const [state, setState] = useState("");
  const [states, setStates] = useState({});
  const [statesCode, setStatesCode] = useState({});
  const [Dists, setDists] = useState([]);
  const [DistsCode, setDistsCode] = useState(["00"]);
  const [ACs, setACs] = useState([]);
  const [ACsCode, setACsCode] = useState(["00"]);
  const [userID, setUserID] = useState("");
  const [Dist, setDist] = useState("");
  const [AC, setAC] = useState("");
  const [role, setRole] = useState("TU");
  const [roles, setRoles] = useState([]);
  const [rolesCode, setRolesCode] = useState([]);
  const [photoFileName, setPhotoFileName] = useState("")
  const [photoFileData, setPhotoFileData] = useState("")

  const [stateDisable, setStateDisable] = useState(false);
  const [DistDisable, setDistDisable] = useState(false);
  const [acDisable, setAcDisable] = useState(false);
  const [realm, setRealm] = useState();
  const [imageName, setImageName] = useState();
  

  async function getRealm() {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_SERVER}/user/getRealm`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: 'include',
        }
      );
      const data2 = await response.json();
      // console.log(response);
      // console.log(data2);
      setRealm(data2['data'])
    } catch (err) {
      console.log(err);
    }


  }

  function filterRoleList(
    data2,
    changeUserID = true,
    filterStr = window.sessionStorage.getItem("sessionToken").substring(7)
  ) {
    if (["EC", "ME", "MB"].includes(
      window.sessionStorage.getItem("sessionToken").substring(0, 2)
    )) {
      setRoles(data2["roleName"]);
      setRolesCode(data2["roleCode"]);
    }
    else {

      let rcode = [];
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
      // console.log(rcode);
      let rc = [];
      let rname = []
      for (let i = 0; i < data2["roleCode"].length; i++) {
        // console.log(data2["roleCode"][i]);
        if (rcode.includes(data2["roleCode"][i])) {
          // console.log("hh");
          rc.push(data2["roleCode"][i]);
          rname.push(data2["roleName"][i]);
        }
      }
      // console.log(rname, rc)
      setRoles(rname);
      setRolesCode(rc);
    }
  }
  useEffect(() => {
    if (window.sessionStorage.getItem("sessionToken") === null) {
      window.location.pathname = "/session/home";
    }
    getRealm();
  }, []);

  useEffect(() => {
    // console.log(states)
    if (states && states != {}) {
      if (window.sessionStorage.getItem("sessionToken")) {
        const statecode = window.sessionStorage.getItem("sessionToken").substring(0, 2);

        if (statecode in ['BL', 'IN', 'EL'] && 0) {
          if (document.getElementById("input_state"))
            // document.getElementById("input_state").value = "";
            document.getElementById("input_state").setAttribute('disabled', 'false')
        } else {
          setStateFunc(getKeyByValue(states, statecode));
          setState(statecode)

          var LoggedUserStateName = getKeyByValue(
            states,
            statecode
          );

          // console.log('State Name = "' + LoggedUserStateName + '"')

          // document.getElementById("input_state").value = LoggedUserStateName;
          // document.getElementById("input_state").setAttribute('disabled', 'true')
        }
      }
    }
  }, [states]);

  useEffect(() => {
    if (window.sessionStorage.getItem("sessionToken")) {
      const pwDistode = window.sessionStorage
        .getItem("sessionToken")
        .substring(2, 4);
      if (getKeyByValue(Dists, pwDistode) != -1) {
        if (1) {
          console.log("pp", pwDistode);
        }
        setDistFunc(Dists[DistsCode.indexOf(pwDistode)]);
        // document.getElementById("input_state").setAttribute('disabled', 'true')
      }
    } else {
      if (document.getElementById("DistDropdown"))
        document.getElementById("DistDropdown").value = "";
      document.getElementById("input_state").setAttribute('disabled', 'false')
    }
  }, [Dists]);

  useEffect(() => {
    console.log(ACs, ACsCode)
    if (window.sessionStorage.getItem("sessionToken") && ACs && ACsCode) {
      // console.log(window.sessionStorage.getItem("sessionToken").substring(7));

      const accode = window.sessionStorage
        .getItem("sessionToken")
        .substring(4, 7)
        .toString();
      console.log("Dist", accode);
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

  async function setStateFunc(st, changeUserID = true, filterStr = window.sessionStorage.getItem("sessionToken").substring(7)) {
    if (st !== "Select:" && states != {}) {
      setState(states[st]);
      // alert(states[st])
      if (role == 'CEO' || role == 'CEO-Office') return;
      if (
        states[st] == "IN" ||
        states[st] == "EL" ||
        states[st] == "BL"
      ) {
      }
      else {
        
      }
      if (changeUserID) {
        setUserID(
          states[st] + ("00" + Dist).slice(-2) + AC + role
        );
      }
    }
  }

  const toggler = () => {

    isTemporary ? setIsTemporary(false) : setIsTemporary(true);
    document.getElementById("formUserEmail").value = '';
    document.getElementById("formUserName").value = '';
    document.getElementById("formUserMobileNumber").value = '';
    document.getElementById("formUserAddress").value = '';
    document.getElementById("formUserAltNumber1").value = '';
    document.getElementById("formUserAltNumber2").value = '';
    document.getElementById("formUserImage").value = '';
    document.getElementById("input_Roles").value = '';
    document.getElementById("input_Dist").value = '';
    document.getElementById("input_AC").value = '';

  }


  async function setDistFunc(st, changeUserID = true, filterStr = window.sessionStorage.getItem("sessionToken").substring(7)) {
    setDist(Dists[st]);

    if ((filterStr == 'CEO' && role == 'DEO') || (filterStr == 'CEO' && role == 'DDEO')) return;
    if (state && state.trim() != "" && state !== "Select:") {
      if (state == "IN" || state == "EL" || state == "BL") {
      } else {
        console.log("State Val at setDistFunc: " + state)
      }
      if (changeUserID) {
        setUserID(
          state + ("00" + Dists[st]).slice(-2) + AC + role
        );
      }
    }
  }

  async function setACFunc(st, changeUserID = true,) {
    setAC(ACs[st]);
    // console.log(ACs[st]);

    if (changeUserID) {
      setUserID(
        state +
        ("00" + Dist).slice(-2) +
        ("000" + ACs[st]).slice(-3) +
        role
      );
    }
  }

  async function setRoleFunc(
    st,
    changeUserID = true,
    filterStr = window.sessionStorage.getItem("sessionToken").substring(7)
  ) {

    if (st !== "Select:") {
      setRole(rolesCode[roles.indexOf(st)]);

      //Reset
      setStateDisable(false);
      setDistDisable(false);
      setAcDisable(false);

      if ((filterStr == 'ECI-Admin') && (st == 'Chief Electoral Officer' || st == 'Chief Electoral Officer Office' || st == 'STATE NODAL OFFICER')) {
        setDist("00");
        setDistDisable(true);
        setAC("000");
        setAcDisable(true);
      }
      else if ((filterStr == 'CEO' && st == "STATE NODAL OFFICER") || (filterStr == 'CEO' && st == "Chief Electoral Officer Office")) {
        setStateDisable(true);
        setStateFunc(window.sessionStorage.getItem("sessionToken").substring(0, 2));
        setDist("00");
        setDistDisable(true);
        setAC("000");
        setAcDisable(true);
      }
      else if ((filterStr == 'CEO' && st == 'District Election Officer') ||
        (filterStr == 'CEO' && st == "Deputy District Election Officer")) {
        setStateDisable(true);
        setStateFunc(window.sessionStorage.getItem("sessionToken").substring(0, 2));
        setAC("000");
        setAcDisable(true);
      }

      if (changeUserID) {
        setUserID(
          state + (Dist != undefined ? ("00" + Dist).slice(-2) : '00') + AC + rolesCode[roles.indexOf(st)]
        );
      }
      console.log(userID);
    }
  }

  useEffect(() => {
    setUserID(
      state + (Dist != undefined ? ("00" + Dist).slice(-2) : '00') + AC + role
    );
  }, [state, AC, Dist, role])

  function ValidateEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return (true)
    }
    alert("You have entered an invalid email address!")
    return (false)
  }

  function validate_number(MobNumber) {
    const regex = new RegExp(
      '^\\d{10}$'
    );

    if (regex.test(MobNumber))
      return true
    else {
      alert("You have entered an invalid mobile number!")
      return false
    }
  }


  async function addUser() {

    // console.log(userID)
    const id = (isTemporary)? (document.getElementById("input_state").value + document.getElementById("input_Dist").value + document.getElementById("input_AC").value + "TMP"):(document.getElementById("input_state").value + document.getElementById("input_Dist").value + document.getElementById("input_AC").value + document.getElementById("input_Roles").value);
    console.log(id)
    if (ValidateEmail(document.getElementById("formUserEmail").value) == false) {
      console.log("Invalid Email")
      document.getElementById("formUserEmail").value = ''
      return;
    }
    else if (validate_number(document.getElementById("formUserMobileNumber").value) == false) {
      console.log("Invalid Mobile Number")
      document.getElementById("formUserMobileNumber").value = ''
      return;
    }
    if (document.getElementById("formUserAltNumber1").value != '') {

      if (!validate_number(document.getElementById("formUserAltNumber1").value)) {
        console.log("Invalid Mobile Number1")
        document.getElementById("formUserAltNumber1").value = ''
        return;
      }

    }
    if (document.getElementById("formUserAltNumber2").value != '') {

      if (!validate_number(document.getElementById("formUserAltNumber2").value)) {
        console.log("Invalid Mobile Number2")
        document.getElementById("formUserAltNumber2").value = ''
        return;
      }

    }

    try {
      // let token = localStorage.getItem("token");
      // const access_token = JSON.parse(token)["access_token"];

      const bodyData = {
        userID: id,
        email: document.getElementById("formUserEmail").value,
        name: document.getElementById("formUserName").value,
        mobileNumber: document.getElementById("formUserMobileNumber").value,
        address: document.getElementById("formUserAddress").value,
        otherContactNum1: document.getElementById("formUserAltNumber1").value,
        otherContactNum2: document.getElementById("formUserAltNumber2").value,
        photoFilename: imageName,
        photoFileData: baseImage,
        active: "A"
        // createdBy: window.sessionStorage.getItem("sessionToken")
      }
      console.log(bodyData)

      const response = await fetch(
        `${process.env.REACT_APP_API_SERVER}/user/createUser`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // 'Authorization': 'Bearer ' + access_token,
          },
          credentials: 'include',
          body: JSON.stringify(bodyData),

          mode: 'cors'

        }
      );

      console.log(bodyData);
      console.log(response);
      const data2 = await response.json();
      console.log(data2);
      if (response.status === 200) {
        alert("User Created Successfully");
        window.location.pathname = "/session/usermanagement";
        document.getElementById("createUserForm").reset();
      } else {
        alert(data2["message"]);
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

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);

        fileReader.onload = () => {
            resolve(fileReader.result);
        }

        fileReader.onerror = (error) => {
            reject(error);
        }
    })
}


  const uploadImage = async (e) =>{
    const files = e.target.files;
    console.log(files)
    const file = e.target.files[0];
    const fullFileName = file.name;
    console.log(fullFileName)
    const options = {
      maxSizeMB: 0.5,
      maxWidthOrHeight: 960,
      useWebWorker: true
    }
    const compressedFile = await imageCompression(file, options);
    console.log(compressedFile.arrayBuffer)
    const convertedFile = await convertBase64(compressedFile);
    setBaseImage(convertedFile)
    setImageName(fullFileName)
}
// console.log(baseImage)




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
            <label htmlFor="">Role:<span className="text-red-500 text-lg">*</span></label>
          </div>
          <div className="form_group">
            <div className="form_select">
              <select
                disabled={isTemporary}
                required={!isTemporary}
                name=""
                id="input_Roles"
                onChange={(e) => setRoleFunc(e.target.value)}
              >
                <option value="" disabled selected>
                  --Select--
                </option>
                {/* {roles && roles.map((st) => (
                  <option value={st} className="text-black">
                    {st}
                  </option>
                ))} */}
                {
                  realm && realm["roles"] && realm["roles"].map((val) => (
                    <option value={val} className="text-black">
                      {val}
                    </option>
                  ))
                }

              </select>
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
                disabled={false}
                required
                name=""
                id="input_state"
                onChange={(e) => setStateFunc(e.target.value)}
              >
                <option value="0" selected>
                  --Select--
                </option>
                {/* {states && states != {} && Object.keys(states).map((st) => (
                  <option value={st} className="text-black">
                    {st}
                  </option>
                ))} */}
                {/* {realm && realm["state"] && realm["state"].length} */}
                {
                  realm && realm["state"] && realm["state"].map((val) => (
                    <option value={val} className="text-black">
                      {val}
                    </option>
                  ))
                }
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
                type="number"
                step="any"
                name=""
                className=""
                placeholder="00000 00000"
              />
            </div>
          </div>

          <div className="form_label">
            <label htmlFor="">District:<span className="text-red-500 text-lg">*</span></label>
          </div>
          <div className="form_group">
            <div className="form_select">
              <select
                disabled={false}
                name=""
                id="input_Dist"
                onChange={(e) => setDistFunc(e.target.value)}
              >
                <option value="" disabled selected>
                  --Select--
                </option>
                {/* {Dists && Dists != {} && Object.keys(Dists).map((st) => (
                  <option value={st} className="text-black">
                    {st}
                  </option>
                ))} */}
                {
                  realm && realm["dist"] && realm["dist"].map((val) => (
                    <option value={val} className="text-black">
                      {val}
                    </option>
                  ))
                }
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
                type="number"
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
                disabled={false}
                name=""
                id="input_AC"
                onChange={(e) => setACFunc(e.target.value)}
              >
                <option value="" disabled selected>
                  --Select--
                </option>
                {/* {ACs && ACs != {} && Object.keys(ACs).map((st) => (
                  <option value={st} className="text-black">
                    {st}
                  </option>
                ))} */}
                {
                  realm && realm["ac"] && realm["ac"].map((val) => (
                    <option value={val} className="text-black">
                      {val}
                    </option>
                  ))
                }
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
                type="number"
                step="any"
                name=""
                className=""
                placeholder="00000 00000"
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
            <label htmlFor="">User Image:
              {isTemporary ? <span className="text-red-500 text-lg">*</span> : <span></span>}
            </label>
          </div>
          <div className="form_group">

            <input
              id="formUserImage"
              required={isTemporary}
              type="file"
              placeholder="Choose Image (Upto 500KB)"
              accept="image/png"
              onChange={(e) => {
                uploadImage(e);
            }}
            />
          </div>
        </div>

        <div className="flex justify-center">
        <button className="bg-red-500 hover:bg-red-700 text-white px-4 rounded-full mr-8 cursor-pointer"
              onClick={() => {
                navigate('/session/usermanagement')
              }}
          >
            Cancel
          </button>

          <input type={"submit"} className="mySubmit">
          </input>
        </div>


      </form >
    </div >
  );
}

export default CreateUser;
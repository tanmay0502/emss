import React, { useEffect } from "react";
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { ReactComponent as WarehouseManagementIcon } from "../../assets/WarehouseManagement.svg";
import { FaWarehouse } from "react-icons/fa";
import { FaRegBuilding } from "react-icons/fa";
import { FaMapMarkedAlt } from "react-icons/fa";
import { FaLaptopHouse } from "react-icons/fa";
import { BsShieldLockFill } from "react-icons/bs";
import { BsFillPersonFill } from "react-icons/bs";
import { useState } from "react";
import './css/AddWarehouse.css'
import { useNavigate } from "react-router-dom";
import { getKeyByValue } from '../../assets/helper/ObjectHelpers.js'
import { formatRealm2 } from "../../components/utils";

export default function AddWarehouse() {

  const userId = sessionStorage.getItem('sessionToken');
  const first2 = userId.slice(0, 2);
  const navigate = useNavigate();
  const [doubleLockSystem, setDoubleLockSystem] = useState(true);
  const [states, setStates] = useState([]);
  const [statesCode, setStatesCode] = useState([]);
  const [dists, setdists] = useState([]);
  const [ACs, setACs] = useState([]);
  const [distcodes, setdistcodes] = useState([]);

  const [doubleLockUser1, setdoubleLockUser1] = useState("")
  const [doubleLockUser2, setdoubleLockUser2] = useState("")

  //Form filed states....
  const [myState, setmyState] = useState("");
  const [mydistcode, setmydistcode] = useState("");
  const [myACcode, setmyACcode] = useState("");
  const [WarehouseType, setWarehouseType] = useState("");
  const [userState, setUserState] = useState("");
  //Form filed states end....

  // Get realm Start
  const [realm, setRealm] = useState([]);
  
  async function getRealm() {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_SERVER}/user/getRealm`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body:JSON.stringify({
            "module_name": "Warehouse",
            "operation": "CreateWarehouse"
          }),
          credentials: 'include',
        }
      );
      const data2 = await response.json();


      console.log(response);


      console.log({data2});
      setRealm(data2["data"])
    } catch (err) {
      console.log(err);
    }

  }
  const [state2, setState2] = useState([])
  const [dist, setDist] = useState([])
  const [AC, setAC] = useState([])

  useEffect(() => {
    if(realm && realm !== []){
      setState2(formatRealm2(realm))
      setCurrState(state2);
    }
   
  }, [realm]);
  
  useEffect(() => {
    if(myState && myState !== []){
      // console.log(myState)
      setDist(formatRealm2(realm, myState))
      // setCurrDist(dist)
    }

  }, [myState,realm]);
  useEffect(() => {
    setCurrDist(dist)
  }, [dist]);


  useEffect(() => {
    if(mydistcode && mydistcode !== []){
      console.log(mydistcode)
      setAC(formatRealm2(realm, myState, mydistcode))
      // setCurrAC(AC);
    }

  }, [mydistcode,realm,myState]);

  useEffect(() => {
    setCurrAC(AC);
  }, [AC]);
  // Get Subordinate Users
  const [subUsers, setSubUsers] = useState([]);
  
  async function getSubUsers() {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_SERVER}/user/getSubordinateUsers`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: 'include',
        }
      );
      const data = await response.json();


      console.log(data);

      if(response.status === 200){
        setSubUsers(data["data"])
      }
      else{
        alert("Unable to fetch Sub-ordinate Users.")
      }
    } catch (err) {
      console.log(err);
    }


  }
 
 

  useEffect(() => {
    if (window.sessionStorage.getItem("sessionToken") === null) {
      window.location.pathname = "/session/home";
    }
    // getState();
    // getRoleList();
    getRealm();
    getSubUsers();
  }, []);

  const [currAC, setCurrAC] = useState([])
  const [currDist, setCurrDist] = useState([])
  const [currState, setCurrState] = useState([])
  useEffect(() => {
    try{
      // setCurrAC(realm["ac"])
      // setCurrDist(realm["dist"])
      // setCurrState(realm["state"])

    }catch(err){
      console.log("Error in setting Current vars"+err)
    }
  }, [realm]);
  // console.log(currAC)

  // Realm End 


  const onFormSubmit = async (e) => {


    console.log("sjdjd")


    e.preventDefault()

    if (validate(document.getElementById("input_personName_1").value, "") == false) {
      document.getElementById("input_personName_1").value = '';
      document.getElementById("input_personName_2").value = '';
    }

    else if (doubleLockSystem && validate(document.getElementById("input_personName_2").value) == false) {
      document.getElementById("input_personName_2").value = '';
      document.getElementById("input_personName_1").value = '';
    }
    else if (((document.getElementById("input_lat").value <= -90) || (document.getElementById("input_lat").value >= 90))) {
      alert("Latitude is Out Of Range");
      document.getElementById("input_lat").value = '';
    }
    else if ((document.getElementById("input_lng").value <= -180 || document.getElementById("input_lng").value >= 180)) {
      alert("Longitude is Out Of Range");
      document.getElementById("input_lng").value = '';
    }

    else {
      const warehouseType = document.getElementById("input_warehousetype").value;
      const buildingType = document.getElementById("input_buildingtype").value;
      const state = document.getElementById("input_state").value;
      const dist = document.getElementById("input_dist").value;
      const AC = document.getElementById("input_AC").value;
      const lat = document.getElementById("input_lat").value;
      const lon = document.getElementById("input_lng").value;

      const address = document.getElementById("input_address").value;
      const person1_ID = document.getElementById("input_personName_1").value;
      const person2_ID = doubleLockSystem ? document.getElementById("input_personName_2").value : "";

      const sealed = document.getElementById("input_sealed").value;



      var reqBody = {
        warehouseType: warehouseType,
        warehouseBuildingType: buildingType,
        warehouseState: state,
        warehouseDist: dist,
        warehouseLatLong: [lat, lon],
        warehouseAddress: address,
        // doubleLock: "TRUE", //double_lock.toString().toUpperCase(),
        UIDKey1: person1_ID,
        UIDKey2: person2_ID,
        updateTime: new Date().toISOString(),
        updatedByUID: window.sessionStorage.getItem("sessionToken"),
        // warehouseStatus: "A",
        warehouseAC: AC,
        incharge: sealed
      };
      console.log(JSON.stringify(reqBody))
      console.log(dists)

      if (doubleLockSystem) {
        reqBody["UIDKey2"] = person2_ID;
      }

      const response = fetch(
        `${process.env.REACT_APP_API_SERVER}/warehouse/createWarehouse`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: 'include',
          body: JSON.stringify(reqBody),
        }
      );
      const status = await response;
      // console.log(status)
      // alert("hello")
      alert(
        status.status === 200
          ? "Warehouse Created Successfully"
          : "Error Creating Warehouse."
      );
      if (status.status === 200) {
        // document.getElementById("create-warehouse-form").reset();
        // window.location.reload();
        navigate('/session/warehousemanagement')
      }
    }
  };

  async function setStateFunc(st) {
    if (st !== "-1") {
      // console.log(st, states, statesCode);
      const selectedCode = states[st];
      setmyState(selectedCode);
    }
  }

  async function setdistFunc(dist) {
    if (dist !== "-1") {
      const distCode = dists[dist];
      setmydistcode(distCode);
    }
  }
  async function setAcFunc(Ac) {
    if (Ac !== "-1") {
      const acCode = ACs[Ac];
      setmyACcode(acCode);
    }
  }


  function validate(ID) {

    if (/^[A-Z]{5}[0-9]{3}[A-Z]{3,10}$/.test(ID)) {
      return (true)
    }
    alert("You have entered invalid UserId!")
    return (false)
  }


  return (
    <div className="create-warehouse flex-col justify-center align-middle">
      <form
        id="create-warehouse-form"
        className="myForm"
        onSubmit={(e)=>onFormSubmit(e)}
      >
        <div className="">
          <div class="warehouse-type">
            <div className="PageTitle">
              <h4>
                <button
                  className="flex justify-center rounded-full aspect-square "
                  type="button"
                  onClick={() => {
                    navigate('/session/warehousemanagement')
                  }}
                  style={{ "background": "#84587C", color: "white" }}
                >
                  <AiOutlineArrowLeft />
                </button>
                <WarehouseManagementIcon />
                <span>Create Warehouse</span>
              </h4>
            </div>
            <div
              className="input_group"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gridGap: "5px 30px",
              }}
            >
              <div className="form_group">
                <div className="form_label" >
                  <label htmlFor="">Warehouse Type<span className="text-red-500 text-lg">*</span></label>
                </div>
                <div className="form_select">
                  <select
                    required={true}
                    name=""
                    id="input_warehousetype"
                    onChange={(e) => setWarehouseType(e.target.value)}
                  >
                    <option
                      value=""
                      className="FirstOption"
                      disabled
                      selected
                    >
                      --Select--
                    </option>
                    <option value="A">National Reserve Warehouse</option>
                    <option value="B">State Central Warehouse</option>
                    <option value="C">District Warehouse</option>
                    <option value="D">District Strong Room</option>

                    <option value="E">Strong Room for AC</option>
                    <option value="F">Strong Room for AS (dist)</option>
                    <option value="G">Strong Room for Polled Units</option>
                    <option value="H">
                      Strong Room for Units under Counting
                    </option>

                    <option value="I">
                      Strong Room for units under EP Period
                    </option>
                    <option value="J">Strong Room for EP Marked units</option>
                    <option value="K">Defective EVM Warehouse</option>
                    <option value="L">Reserve Units Strong Room</option>

                    <option value="M">T&A Warehouse</option>
                    <option value="N">Virtual Warehouse</option>
                    <option value="O">Virtual Strong Room</option>
                    <option value="P">Manufacturer Warehouse</option>
                  </select>
                  <div className="input_icon">
                    <FaWarehouse size="1em" />
                  </div>
                </div>
              </div>

              <div className="form_group">
                <div className="form_label">
                  <label htmlFor="">State<span className="text-red-500 text-lg">*</span></label>
                </div>
                <div className="form_select">

                  <select
                    required
                    name=""
                    id="input_state"
                    onChange={(e) => {
                      setmyState(e.target.value)
                    }}
                  >
                    <option
                      value=""
                      className="FirstOption"
                      disabled
                      selected
                    >
                      --Select--
                    </option>
                    {currState && currState.map((st) => (
                      <option value={st["stCode"]} className="text-black">
                        {st["stCode"]+ " ("+st["stName"]+")"}
                      </option>
                    ))}
                  </select>
                  <div className="input_icon">
                    <FaMapMarkedAlt size="1em" />
                  </div>
                </div>
              </div>

              <div className="form_group">
                <div className="form_label">
                  <label htmlFor="">Building Type<span className="text-red-500 text-lg">*</span></label>
                </div>
                <div className="form_select">
                  <select
                    required
                    name=""
                    id="input_buildingtype"
                  >
                    <option
                      value=""
                      className="FirstOption"
                      disabled
                      selected
                    >
                      --Select--
                    </option>
                    <option value="O">Own Building</option>
                    <option value="G">Government Building</option>
                    <option value="P">Private Building</option>
                  </select>
                  <div className="input_icon">
                    <FaRegBuilding size="1em" />
                  </div>
                </div>
              </div>
              <div className="form_group"
              // style={{gridArea:"2 / 1 / 3 / 3"}}
              >
                <div className="form_label">
                  <label htmlFor="">Address<span className="text-red-500 text-lg">*</span></label>
                </div>
                <div className="form_input">
                  <input
                    required
                    id="input_address"
                    name=""
                    className=""
                    placeholder="Warehouse Address"
                  />
                  <div className="input_icon">
                    <FaMapMarkedAlt size="1em" />
                  </div>
                </div>
              </div>
              <div className="form_group">
                <div className="form_label">
                  <label htmlFor="">Warehouse Incharge<span className="text-red-500 text-lg">*</span></label>
                </div>
                <div className="form_input">
                  <input
                    required
                    placeholder="SSDDDAAARRR"
                    id="input_sealed"
                    list="userList1"
                    name="doubleLockUser1"
                    value={doubleLockUser1}
                    autoComplete="off"
                    onChange={(e)=>{setdoubleLockUser1(e.target.value)}}
                  />
                  <datalist id="userList1">
                    {
                      subUsers && subUsers['users'] && subUsers['users'].map((val) => {
                        if(val['userid'] !== doubleLockUser2)
                        return <option value={val['userid']}>
                          {val['name']}
                        </option>
                      })
                    }
                  </datalist>
                  <div className="input_icon">
                    <BsFillPersonFill size="1em" />
                  </div>
                </div>
                
              </div>

              <div className="form_group">
                <div className="form_label">
                  <label htmlFor="">District<span className="text-red-500 text-lg">*</span></label>
                </div>
                <div className="form_select">
                  <select
                    required
                    name=""
                    id="input_dist"
                    onChange={(e) => setmydistcode(e.target.value)}
                  >
                    <option value="">--Select--</option>
                    {currDist && currDist.map((dist) => (
                      <option value={dist['dtCode']} className="text-black">
                        {dist['dtName']}
                      </option>
                    ))}
                  </select>
                  <div className="input_icon">
                    <FaLaptopHouse size="1em" />
                  </div>
                </div>
              </div>
              <div className="form_group">
                <div className="form_label">
                  <label htmlFor="">AC<span className="text-red-500 text-lg">*</span></label>
                </div>
                <div className="form_select">
                  <select
                    required
                    name=""
                    id="input_AC"
                    onChange={(e) => setmyACcode(e.target.value)}
                  >
                    <option value="">--Select--</option>
                    {currAC && currAC.map((ac) => (
                      <option value={ac["acCode"]} className="text-black">
                        {ac["acName"]}
                      </option>
                    ))}
                  </select>
                  <div className="input_icon">
                    <FaLaptopHouse size="1em" />
                  </div>
                </div>
              </div>

              {/* <div></div>
              <div className="three-column-grid">----------------------------------------------- */}

              <div className="form_group">
                <div className="form_label">
                  <label htmlFor="">Latitude<span className="text-red-500 text-lg">*</span></label>
                </div>
                <div className="form_input">
                  <input
                    required
                    type={"number"}
                    step="any"
                    id="input_lat"
                    name=""
                    className=""
                    placeholder="Latitude"
                  />
                  <div className="input_icon">
                    <FaLaptopHouse size="1em" />
                  </div>
                </div>
              </div>

              <div className="form_group">
                <div className="form_label">
                  <label htmlFor="">Longitude<span className="text-red-500 text-lg">*</span></label>
                </div>
                <div className="form_input">
                  <input
                    required
                    id="input_lng"
                    type={"number"}
                    step="any"
                    name=""
                    className=""
                    placeholder="Longitude"
                  />
                  <div className="input_icon">
                    <FaLaptopHouse size="1em" />
                  </div>
                </div>
              </div>

              {/* </div>-------------------------------------------------------------- */}
            </div>
          </div>
          <div class="warehouse-personnel">
            {/* <h5>Warehouse Personnel Details</h5> */}
                  {/* <input type={"radio"}>Hello</input> */}

            <div className="input_group three-column-grid">
              <div
                className="form_group"
                style={{ gridArea: "1 / 1 / 2 / 3", textAlign: "center" }}
              >
                <div className="form_radio">
                  <label htmlFor="double_lock_yes">
                    The warehouse has a Double Lock <span className="text-red-500 text-lg">*</span> 
                  </label>
                  
                  {/* <label htmlFor="double_lock_yes" className={`${doubleLockSystem?'bg-stone-200 text-black p-2 rounded-md':'bg-orange-500 text-white p-2 rounded-md'}`}>Yes </label> */}
                  <input
                    type="checkbox"
                    // name="double_lock"
                    // id="double_lock_yes"
                    // defaultChecked={true}
                    required="true"
                    value="1"
                    onChange={(e) => {
                      setDoubleLockSystem(true);
                    }}
                  />

                  
                  
                </div>
              </div>
              <div className="form_group">
                <div className="form_label">
                  <label htmlFor="">User ID of First Key Holder<span className="text-red-500 text-lg">*</span></label>
                </div>
                <div className="form_input">
                  <input
                    required
                    placeholder="SSDDDAAARRR"
                    id="input_personName_1"
                    list="userList1"
                    name="doubleLockUser1"
                    value={doubleLockUser1}
                    autoComplete="off"
                    onChange={(e)=>{setdoubleLockUser1(e.target.value)}}
                  />
                  <datalist id="userList1">
                    {
                      subUsers && subUsers['users'] && subUsers['users'].map((val) => {
                        if(val['userid'] !== doubleLockUser2)
                        return <option value={val['userid']}>
                          {val['name']}
                        </option>
                      })
                    }
                  </datalist>
                  <div className="input_icon">
                    <BsFillPersonFill size="1em" />
                  </div>
                </div>
              </div>

              <div className="form_group" hidden={!doubleLockSystem}>
                <div className="form_label">
                  <label htmlFor="">User ID of Second Key Holder<span className="text-red-500 text-lg">*</span></label>
                </div>
                <div className="form_input">
                  <input
                    required={doubleLockSystem}
                    placeholder="SSDDDAAARRR"
                    id="input_personName_2"
                    name=""
                    list="userList2"
                    value={doubleLockUser2}
                    autoComplete="off"
                    onChange={(e)=>{setdoubleLockUser2(e.target.value)}}
                  />
                  <datalist id="userList2">
                    {
                      subUsers && subUsers['users'] && subUsers['users'].map((val) => {
                        if(val['userid'] !== doubleLockUser1)
                        return <option value={val['userid']}>
                          {val['name']}
                        </option>
                      })
                    }
                  </datalist>
                  <div className="input_icon">
                    <BsFillPersonFill size="1em" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <center>
          <button type="submit" className="text-white bg-orange-500 rounded-md p-2"  >
            Submit
          </button>
        </center>
      </form>
    </div>
  );
}

import React, { useEffect } from "react";
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { ReactComponent as WarehouseManagementIcon } from "../../assets/WarehouseManagement.svg";
import { FaWarehouse } from "react-icons/fa";
import { FaRegBuilding } from "react-icons/fa";
// import { FaMapMarkerAlt } from 'react-icons/fa';
import { FaMapMarkedAlt } from "react-icons/fa";
import { FaLaptopHouse } from "react-icons/fa";
// import { FaLock } from 'react-icons/fa';
import { BsShieldLockFill } from "react-icons/bs";
import { BsFillPersonFill } from "react-icons/bs";
// import { BsFillTelephoneFill } from 'react-icons/bs'
// import { MdWork } from "react-icons/md";
// import { BsCheck2 } from 'react-icons/bs'
import { useState } from "react";
import './css/AddWarehouse.css'
import { useNavigate } from "react-router-dom";

export default function AddWarehouse() {

  const userId =  sessionStorage.getItem('sessionToken');
  const first2 = userId.slice(0, 2);



  const navigate = useNavigate();
  const [doubleLockSystem, setDoubleLockSystem] = useState(true);

  const [states, setStates] = useState([]);
  const [statesCode, setStatesCode] = useState([]);
  const [PCs, setPCs] = useState([]);
  const [PCcodes, setPCcodes] = useState([]);

  //Form filed states....
  const [myState, setmyState] = useState("");
  const [myPCcode, setmyPCcode] = useState("");
  const [WarehouseType, setWarehouseType] = useState("");
  const [userState,setUserState] = useState("");
  //Form filed states end....

  const onFormSubmit = async (e) => {
    e.preventDefault()

    const warehouseType = document.getElementById("input_warehousetype").value;
    const buildingType = document.getElementById("input_buildingtype").value;
    const state =
      statesCode[states.indexOf(document.getElementById("input_state").value)];
    const PC = PCcodes[PCs.indexOf(document.getElementById("input_PC").value)];

    const lat = document.getElementById("input_lat").value;
    const lon = document.getElementById("input_lng").value;

    const address = document.getElementById("input_address").value;
    const double_lock = document.getElementById("double_lock_yes").checked;

    const person1_ID = document.getElementById("input_personName_1").value;
    const person2_ID = double_lock
      ? document.getElementById("input_personName_2").value :
      "";

    const sealed = document.getElementById("input_sealed").value;

    var reqBody = {
      warehouseType: warehouseType,
      warehouseBuildingType: buildingType,
      warehouseState: state,
      warehousePC: PC,
      warehouseLatLong: [lat, lon],
      warehouseAddress: address,
      doubleLock: double_lock.toString().toUpperCase(),
      UIDKey1: person1_ID,
      updateTime: new Date().toISOString(),
      updatedByUID: window.sessionStorage.getItem("sessionToken"),
      warehouseStatus: sealed,
    };

    if(double_lock){
      reqBody["UIDKey2"] = person2_ID;
    }

    const response = fetch(
      `http://evm.iitbhilai.ac.in:8100/warehouse/createWarehouse`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reqBody),
      }
    );
    const status = await response;
    console.log(status)
    alert(
      status.status == 200
        ? "Warehouse Created Successfully"
        : "Error Creating Warehouse."
    );
    if (status.status == 200) {
      // document.getElementById("create-warehouse-form").reset();
      // window.location.reload();
      navigate('/session/warehousemanagement')
    }
  };

  //Get state list

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
      const StateData = await response.json();
      console.log(StateData)

      const ans = StateData.states[StateData.stcodes.indexOf(first2)]
    
      if(["EC", "ME", "MB"].includes(
        window.sessionStorage.getItem("sessionToken").substring(0, 2)
      )){
        setStates(StateData['states']);
      setStatesCode(StateData['stcodes']);
      }
     else{
      setStates([ans]);
      setStatesCode([first2]);
     }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getState();
  }, []);

  async function generateWarehouseId() {
    try {
      const response = await fetch(
        "http://evm.iitbhilai.ac.in:8100/warehouse/listWarehouses",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            stateCode: myState,
            pcCode: myPCcode,
          }),
        }
      );
    } catch (error) {
      console.log(error);
    }

    return myState + myPCcode + WarehouseType;
  }
  async function setStateFunc(st) {
    if (st !== "-1") {
      console.log(st, states, statesCode);
      const selectedCode = statesCode[states.indexOf(st)];
      setmyState(selectedCode);
      console.log(selectedCode)

      try {
        const response = await fetch(
          `http://evm.iitbhilai.ac.in:8100/user/getPCListbyState/${selectedCode}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();
        setPCs(data["pcname"]);
        setPCcodes(data["pccode"]);
      } catch (error) {
        console.log(error);
        setPCs(["00"]);
        setPCcodes(["00"]);
      }

    }
  }

  async function setPcFunc(pc) {
    if (pc !== "-1") {
      const pcCode = PCcodes[PCs.indexOf(pc)];
      setmyPCcode(pcCode);
    }
  }

  return (
    <div className="flex-col justify-center align-middle">
      <form
        id="create-warehouse-form"
        className="myForm"
        onSubmit={onFormSubmit}
      >
        <div className="">
          <div class="warehouse-type">
            <div className="PageTitle">
              <h4>
              <button
                className="flex justify-center rounded-full aspect-square "
                onClick={()=>{
                  navigate('/session/warehousemanagement')
                }}
                style={{"background" : "#84587C", color: "white"}}
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
                  <label htmlFor="">Room Type</label>
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
                    <option value="F">Strong Room for AS (PC)</option>
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
                  <label htmlFor="">State</label>
                </div>
                <div className="form_select">
                  <select
                    required
                    name=""
                    id="input_state"
                    onChange={(e)=> {
                      setStateFunc(e.target.value)
                    }}
                    disabled = {true}
                  >
                    {/* <option value="" disabled selected>
                      --Select--
                    </option> */}
                    {console.log(states)}
                    {states && states.map((st) => (
                      <option value={st} className="text-black" selected={st == first2 ? true : false}>
                        {st}
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
                  <label htmlFor="">Building Type</label>
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
                    <option value="P">Permanent</option>
                    <option value="T">Temporary</option>
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
                  <label htmlFor="">Address</label>
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
                  <label htmlFor="">Sealed</label>
                </div>
                <div className="form_select">
                  <select
                    required
                    name=""
                    id="input_sealed"
                  >
                    <option value="" className="FirstOption">
                      --Select--
                    </option>
                    <option value="I">Yes</option>
                    <option value="A">No</option>
                  </select>
                  <div className="input_icon">
                    <BsShieldLockFill size="1em" />
                  </div>
                </div>
              </div>

              <div className="form_group">
                <div className="form_label">
                  <label htmlFor="">PC Code</label>
                </div>
                <div className="form_select">
                  <select
                    required
                    name=""
                    id="input_PC"
                    onChange={(e) => setPcFunc(e.target.value)}
                  >
                    <option value="">--Select--</option>
                    {PCs.map((pc) => (
                      <option value={pc} className="text-black">
                        {pc}
                      </option>
                    ))}
                  </select>
                  <div className="input_icon">
                    <FaLaptopHouse size="1em" />
                  </div>
                </div>
              </div>
              <div></div>
              <div className="three-column-grid">
                <div className="form_group">
                  <div className="form_label">
                    <label htmlFor="">Latitude</label>
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
                    <label htmlFor="">Longitude</label>
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
              </div>
            </div>
          </div>
          <div class="warehouse-personnel">
            {/* <h5>Warehouse Personnel Details</h5> */}
            <div className="input_group three-column-grid">
              <div
                className="form_group"
                style={{ gridArea: "1 / 1 / 2 / 3", textAlign: "center" }}
              >
                <div className="form_radio">
                  <label htmlFor="double_lock_yes">
                    Double Lock System:{" "}
                  </label>
                  <label htmlFor="double_lock_yes">Yes </label>
                  <input
                    type={"radio"}
                    name="double_lock"
                    id="double_lock_yes"
                    defaultChecked={true}
                    value="1"
                    onChange={(e) => {
                      setDoubleLockSystem(true);
                    }}
                  />
                  <label htmlFor="double_lock_no">No </label>
                  <input
                    type={"radio"}
                    name="double_lock"
                    id="double_lock_no"
                    value="0"
                    onChange={(e) => {
                      setDoubleLockSystem(false);
                    }}
                  />
                </div>
              </div>
              <div className="form_group">
                <div className="form_label">
                  <label htmlFor="">User ID of First Key Holder</label>
                </div>
                <div className="form_input">
                  <input
                    required
                    placeholder="AA000000RRRRR"
                    id="input_personName_1"
                    name=""
                  />
                  <div className="input_icon">
                    <BsFillPersonFill size="1em" />
                  </div>
                </div>
              </div>

              <div className="form_group" hidden={!doubleLockSystem}>
                <div className="form_label">
                  <label htmlFor="">User ID of Second Key Holder</label>
                </div>
                <div className="form_input">
                  <input
                    required={doubleLockSystem}
                    placeholder="AA000000RRRRR"
                    id="input_personName_2"
                    name=""
                  />
                  <div className="input_icon">
                    <BsFillPersonFill size="1em" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <center>
          <input type={"submit"} className="mySubmit">
          </input>
        </center>
      </form>
    </div>
  );
}

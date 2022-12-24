import React, { useEffect } from "react";
import { ReactComponent as ChevronRightIcon } from "../../assets/ChevronRight.svg";
import { ReactComponent as WarehouseManagementIcon } from "../../assets/WarehouseManagement.svg";
import { FaWarehouse } from "react-icons/fa";
import { FaRegBuilding } from "react-icons/fa";
import { FaMapMarkedAlt } from "react-icons/fa";
import { FaLaptopHouse } from "react-icons/fa";
import { BsShieldLockFill } from "react-icons/bs";
import { BsFillPersonFill } from "react-icons/bs";
import { useState } from "react";
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { useNavigate } from "react-router-dom";
import loader from './css/auditpage.module.css';

export default function ModifyWarehouse() {
  const navigate = useNavigate();

  const [Warehouseid, setWarehouseId] = useState("");
  const [Whdetails, setWhdetails] = useState("");

  //Form filed states....
  const [BuildingType, setBuildingType] = useState("");
  const [Status, setStatus] = useState("");
  const [Address, setAddress] = useState("");
  const [Lat, setLat] = useState("");
  const [Lng, setLng] = useState("");
  const [userId1, setUserId1] = useState("");
  const [userId2, setUserId2] = useState("");
  const [doubleLockSystem, setDoubleLockSystem] = useState("");
  const [whIncharge, setWhIncharge] = useState("")
  const [WarehouseDetails, setWarehousDetails] = useState([]);
  
  //Form filed states end....



  const onFormSubmit = async (e) => {
    e.preventDefault();
    const buildingType = document.getElementById("input_buildingtype").value;
    const lat = document.getElementById("input_lat").value;
    const lon = document.getElementById("input_lng").value;
    const address = document.getElementById("input_address").value;
    let double_lock = document.getElementById("double_lock_yes").checked;
    console.log(double_lock);
    const person2_ID = double_lock ? document.getElementById("input_personName_2").value : "";
    double_lock = double_lock == true ? "TRUE" : "FALSE";
    const person1_ID = document.getElementById("input_personName_1").value;

    let reqBody = {};
    if (double_lock === "TRUE") {
      reqBody = {
        warehouseID: Warehouseid,
        warehouseBuildingType: buildingType,
        warehouseLatLong: [lat, lon],
        warehouseAddress: address,
        doubleLock: double_lock,
        UIDKey1: person1_ID,
        UIDKey2: person2_ID,
        updatedByUID: window.sessionStorage.getItem("sessionToken"),
      };
    } else {
      reqBody = {
        warehouseID: Warehouseid,
        warehouseBuildingType: buildingType,
        warehouseLatLong: [lat, lon],
        warehouseAddress: address,
        doubleLock: double_lock,
        UIDKey1: person1_ID,
        updatedByUID: window.sessionStorage.getItem("sessionToken"),
      };
    }
    // console.log(reqBody);

    const response = await fetch(
      `${process.env.REACT_APP_API_SERVER}/warehouse/modifyWarehouse`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials:"include",
        body: JSON.stringify(reqBody),
      }
    );
    const status = await response;
    console.log(status);
    console.log("Submitting: ",reqBody)
    alert(
      status.status == 200
        ? "Warehouse Updated Successfully"
        : "Error Updating Warehouse."
    );
    if (status.status == 200) {
      window.location = '/session/warehousemanagement'
    }
  };



	function logOut() {
		const response = fetch(
			`${process.env.REACT_APP_API_SERVER}/user/UserLogout`,
			{
			  method: "GET",
			  credentials: 'same-origin',
			  headers: {
				"Content-Type": "application/json",
			  },
			  mode: 'no-cors'
			}
		  );

		sessionStorage.removeItem("sessionToken", null);
		// props.SetSession(null)
		// setUserData(null)
		// localStorage.setItem("token", null);
		window.location.replace("/login");
	}


  async function getDetails(e) {
    console.log(e)
		try {
			const response = await fetch(
				`${process.env.REACT_APP_API_SERVER}/warehouse/warehouseDetails`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
          credentials: 'include',
          body: JSON.stringify({
            warehouseID:e,
          }),
				})

			const data = await response.json();
			console.log(data);
			setWhdetails(data["data"])
      const status = await response;
      console.log(status.status);
			// console.log(data["data"], "data")
      if(status.status === 401){
        logOut();
        alert("Your session expired please login again")
        
      }
		} catch (error) {

			console.log(error)
		}

	}
  // console.log(Whdetails[0])

  useEffect(() => {
    
    try{
    const coordinates = Whdetails[2];
    const myArr = coordinates.split(",");
    const lat = myArr[0].substring(1);
    const lng = myArr[1].slice(0, -1);

    setDoubleLockSystem(Whdetails[4]);
    setAddress(Whdetails[3]);
    setBuildingType(Whdetails[1]);
    setLat(lat);
    setLng(lng);
    setUserId1(Whdetails[5]);
    setUserId2(Whdetails[6]);
    setStatus(Whdetails[10]);
    setWhIncharge(Whdetails[11]);
    }catch(err){
      console.log(err)
    }


  }, [Whdetails]);

  useEffect(() => {
    const URL = window.location.href;
    const arr = URL.split("/");
    const param = arr[arr.length - 1];
    const arr1 = param.split("=");
    const myId = arr1[1];
    setWarehouseId(myId);

  }, []);

  useEffect(() => {
    getDetails(Warehouseid);
  }, [Warehouseid]);

  console.log(Whdetails)
  const [edit, setEdit] = useState(true);
  console.log(doubleLockSystem)
  return (
    // <div className="flex-col justify-center align-middle">
    // <div className="myWrapper">
    <div>
      <div className="PageTitle" style={{ marginLeft: '1%' }}>
        <h4>
          <button
            className="flex justify-center rounded-full aspect-square "
            onClick={() => {
              navigate('/session/warehousemanagement')
            }}
            style={{ "background": "#84587C", color: "white" }}
          >
            <AiOutlineArrowLeft />
          </button>
          <FaWarehouse />

          <div 
            className="hover:cursor-pointer"
            onClick = {() => {setEdit(true)}}
          ><span>Modify Warehouse Details - {Warehouseid}</span></div>
        </h4>
      </div>
      {Status === "A" || Status === "I"? 
      <form
        id="create-warehouse-form"
        className="myForm"
        onSubmit={onFormSubmit}
      >
        <div className="">
          <div class="warehouse-type">
            <div
              className="input_group"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gridGap: "5px 30px",
              }}
            >
              <div className="form_group">
                <div className="form_label">
                  <label htmlFor="">Building Type</label>
                </div>
                
                {edit === false ?
                <div className="form_input disabled">
                    <input 
                    id="input_buildingtype"
                    disabled = {true}
                    defaultValue={BuildingType}
                    type = "text"
                    className=" selectBox"
                    
                    >
                    </input></div>:
                  <>
                  <div className="form_select">
                  <select
                    required
                    name=""
                    id="input_buildingtype"
                    onChange={(e) => setBuildingType(e.target.value)}
                    defaultValue={BuildingType}
                  >                    
                    <option selected={BuildingType === "O" ? true : false} value="O">Own</option>
                    <option selected={BuildingType === "G" ? true : false} value="G">Govt. Building</option>
                    <option selected={BuildingType === "P" ? true : false} value="P">Private</option>
                  </select>
                  </div>
                  </>
                  }  
                  <div className="input_icon">
                    <FaRegBuilding size="1em" />
                  </div>  
              </div>

              <div className="form_group">
                <div className="form_label">
                  <label htmlFor="">Warehouse Status</label>
                </div>
                {edit === false ?
                <div className="form_input disabled">
                    <input 
                    id="input_buildingtype"
                    disabled = {true}
                    defaultValue={Status}
                    type = "text"
                    className=" selectBox"
                    
                    >
                    
                    </input></div>:
                <div className="form_select">
                  <select
                    required
                    name=""
                    id="input_sealed"
                    defaultValue={Status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="I" selected={Status === "I" ? true : false}>Inactive</option>
                    <option value="A" selected={Status === "A" ? true : false}>Active</option>
                  </select>

                </div>
                }
                  <div className="input_icon">
                    <BsShieldLockFill size="1em" />
                  </div>
              </div>
              <div className="form_group">
                <div className="form_label">
                  <label htmlFor="">Latitude</label>
                </div>


                {edit === false ?
                <div className="form_input disabled">
                    <input 
                    id="input_buildingtype"
                    disabled = {true}
                    defaultValue={Lat}
                    type = "text"
                    className=" selectBox"
                    
                    >
                    
                    </input></div>:
                <div className="form_input">
                  <input
                    required
                    type={"number"}
                    step="any"
                    id="input_lat"
                    name=""
                    className=""
                    placeholder="Latitude"
                    onChange={(e) => setLat(e.target.value)}
                    value={Lat}
                  />
                  {/* <div className="input_icon">
                    <FaLaptopHouse size="1em" />
                  </div> */}
                </div>
                }
                  <div className="input_icon">
                    <FaLaptopHouse size="1em" />
                  </div>
              </div>

              <div className="form_group">
                <div className="form_label">
                  <label htmlFor="">Longitude</label>
                </div>
                {edit === false ?
                <div className="form_input disabled">
                    <input 
                    id="input_buildingtype"
                    disabled = {true}
                    defaultValue={Lng}
                    type = "text"
                    className=" selectBox"
                    
                    >
                    </input></div>:
                    <>
                <div className="form_input">
                  <input
                    required
                    id="input_lng"
                    type={"number"}
                    step="any"
                    name=""
                    className=""
                    placeholder="Longitude"
                    onChange={(e) => setLng(e.target.value)}
                    value={Lng}
                  />

                </div>

                </>
                }
                <div className="input_icon">
                  <FaLaptopHouse size="1em" />
                </div>
              </div>
              <div className="form_group">
                <div className="form_label">
                  <label htmlFor="">Address</label>
                </div>
                {edit === false ?
                <div className="form_input disabled">
                    <input 
                    id="input_buildingtype"
                    disabled = {true}
                    defaultValue={Address}
                    type = "text"
                    className=" selectBox"
                    
                    >
                    
                    </input></div>:
                    <>
                <div className="form_input">
                  <input
                    required
                    id="input_address"
                    name=""
                    className=""
                    onChange={(e) => setAddress(e.target.value)}
                    value={Address}
                    placeholder="Warehouse Address"
                  />

                </div>


                  </>
                    }
                  <div className="input_icon">
                  <FaMapMarkedAlt size="1em" />
                  </div>
              </div>
              {/* Uncomment the below once the Warehouse Incharge is added in backend */}
              
              {/* <div className="form_group">
                <div className="form_label">
                  <label htmlFor="">Warehouse Incharge</label>
                </div>
                {edit === false ?
                <div className="form_input disabled">
                    <input 
                    id="input_buildingtype"
                    disabled = {true}
                    defaultValue={whIncharge}
                    type = "text"
                    className=" selectBox"                
                    >            
                    </input></div>:
                    <>
                <div className="form_input">
                  <input
                    required
                    id="input_address"
                    name=""
                    className=""
                    onChange={(e) => setWhIncharge(e.target.value)}
                    value={whIncharge}
                    placeholder="Warehouse Incharge"
                  />
                </div>
                  </>
                    }
                
                  <div className="input_icon">
                    <BsFillPersonFill size="1em" />
                  </div> 
              </div> */}

            </div>
          </div>
          <div class="warehouse-personnel">
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
                    // defaultChecked={true}
                    disabled = {!edit}
                    value="1"
                    onChange={(e) => {
                      setDoubleLockSystem(true);
                    }}
                    checked={doubleLockSystem}
                  />
                  <label htmlFor="double_lock_no">No </label>
                  <input
                    type={"radio"}
                    name="double_lock"
                    id="double_lock_no"
                    disabled={!edit}
                    value="0"
                    onChange={(e) => {
                      setDoubleLockSystem(false);
                    }}
                    checked={!doubleLockSystem}
                  />
                </div>
              </div>
              <div className="form_group">
                <div className="form_label">
                  <label htmlFor="">User ID of First Key Holder</label>
                </div>
                {edit === false ?
                <div className="form_input disabled">
                    <input 
                    id="input_buildingtype"
                    disabled = {true}
                    defaultValue={userId1}
                    type = "text"
                    className=" selectBox"
                    
                    >
                    
                    </input></div>:
                <div className="form_input">
                  <input
                    required
                    placeholder="AA000000RRRRR"
                    id="input_personName_1"
                    name=""
                    onChange={(e) => setUserId1(e.target.value)}
                    value={userId1}
                  />

                </div>
                    }
                  <div className="input_icon">
                    <BsFillPersonFill size="1em" />
                  </div>
              </div>

              <div className="form_group" hidden={!doubleLockSystem}>
                <div className="form_label">
                  <label htmlFor="">User ID of Second Key Holder</label>
                </div>
                {edit === false ?
                <div className="form_input disabled">
                    <input 
                    id="input_buildingtype"
                    disabled = {true}
                    defaultValue={userId2}
                    type = "text"
                    className=" selectBox"
                    
                    >
                    
                    </input></div>:
                <div className="form_input">
                  <input
                    required={doubleLockSystem}
                    placeholder="AA000000RRRRR"
                    id="input_personName_2"
                    name=""
                    onChange={(e) => setUserId2(e.target.value)}
                    value={userId2}
                  />
                </div>
                  }
                  <div className="input_icon">
                    <BsFillPersonFill size="1em" />
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
      : <div className="flex justify-center"><p className={`${loader.loader}`}></p></div> }
    </div>
  );
}



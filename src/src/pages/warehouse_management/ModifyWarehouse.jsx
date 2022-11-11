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

export default function ModifyWarehouse() {
  const navigate = useNavigate();

  const [WarehouseId, setWarehouseId] = useState("");

  //Form filed states....
  const [BuildingType, setBuildingType] = useState("");
  const [isSealed, setisSealed] = useState("");
  const [Address, setAddress] = useState("");
  const [Lat, setLat] = useState("");
  const [Lng, setLng] = useState("");
  const [userId1, setUserId1] = useState("");
  const [userId2, setUserId2] = useState("");
  const [doubleLockSystem, setDoubleLockSystem] = useState(true);
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
        warehouseID: WarehouseId,
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
        warehouseID: WarehouseId,
        warehouseBuildingType: buildingType,
        warehouseLatLong: [lat, lon],
        warehouseAddress: address,
        doubleLock: double_lock,
        UIDKey1: person1_ID,
        updatedByUID: window.sessionStorage.getItem("sessionToken"),
      };
    }
    console.log(reqBody);

    const response = await fetch(
      `${process.env.REACT_APP_API_SERVER}/warehouse/modifyWarehouse`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reqBody),
      }
    );
    const status = await response;
    console.log(status);
    alert(
      status.status == 200
        ? "Warehouse Updated Successfully"
        : "Error Updating Warehouse."
    );
    if (status.status == 200) {
      window.location = '/session/warehousemanagement'
    }
  };

  //Get state list

  const getDetails = async () => {
    const URL = window.location.href;
    const arr = URL.split("/");
    const param = arr[arr.length - 1];
    const arr1 = param.split("=");
    const myId = arr1[1];
    setWarehouseId(myId);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_SERVER}/warehouse/warehouseDetails/${myId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          }
        }
      )

      const dataObj = await response.json();
      const data = dataObj["data"];
      const coordinates = data[5];
      const myArr = coordinates.split(",");
      const lat = myArr[0].substring(1);
      const lng = myArr[1].slice(0, -1);
      data.push(lat);
      data.push(lng);

      console.log(data[7]);
      setDoubleLockSystem(data[7]);
      setAddress(data[6]);
      setBuildingType(data[2]);
      setLat(data[14]);
      setLng(data[15]);
      setUserId1(data[8]);
      setUserId2(data[9]);
      // setWarehousDetails(data);
      // setValues(data);


    } catch (error) {
      console.log(error);
    }


  }


  useEffect(() => {
    getDetails();
  }, []);


  return (
    <div className="flex-col justify-center align-middle">
      {/* <div className="content-path">
        <WarehouseManagementIcon />
        <a href="/session/warehousemanagement">
          <span>Warehouse Management</span>
        </a>
        <ChevronRightIcon />
        <span>Modify Warehouse Details</span>
      </div> */}

      <div className="myWrapper">
        {/* <div className="PageTitle">
          <h4>
            <FaWarehouse />
            <span>Modify Warehouse Details - {WarehouseId}</span>
          </h4>
        </div> */}
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
            <span>Modify Warehouse Details - {WarehouseId}</span>
          </h4>
        </div>
        <form
          id="create-warehouse-form"
          className="myForm"
          onSubmit={onFormSubmit}
        >
          <div className="form_Grid">
            <div class="warehouse-type">
              <h5>Warehouse Type</h5>
              <div
                className="input_group"
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr",
                  gridGap: "5px 15px",
                }}
              >

                <div className="form_group">
                  <div className="form_label">
                    <label htmlFor="">Building Type : </label>
                  </div>
                  <div className="form_select">
                    <select
                      required
                      name=""
                      id="input_buildingtype"
                      onChange={(e) => setBuildingType(e.target.value)}
                    >
                      <option value="P" selected={BuildingType == "P" ? true : false}>Permanent</option>
                      <option value="T" selected={BuildingType == "T" ? true : false}>Temporary</option>
                    </select>
                    <div className="input_icon">
                      <FaRegBuilding size="1em" />
                    </div>
                  </div>
                </div>

                <div className="form_group">
                  <div className="form_label">
                    <label htmlFor="">Sealed : </label>
                  </div>
                  <div className="form_select">
                    <select
                      required
                      name=""
                      id="input_sealed"
                      onChange={(e) => setisSealed(e.target.value)}
                    >
                      <option value="I">Yes</option>
                      <option value="A">No</option>
                    </select>
                    <div className="input_icon">
                      <BsShieldLockFill size="1em" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="warehouse-location" style={{ gridArea: '3 / 1 / 4 / 3' }}>
              <h5>Warehouse Location</h5>
              <div className="input_group">
                <div
                  className="form_group"
                  style={{ gridArea: "1 / 1 / 2 / 3" }}
                >
                  <div className="form_label">
                    <label htmlFor="">Address : </label>
                  </div>
                  <div className="form_input">
                    <input
                      required
                      id="input_address"
                      name=""
                      className=""
                      placeholder="Warehouse Address"
                      onChange={(e) => setAddress(e.target.value)}
                      value={Address}
                    />
                    <div className="input_icon">
                      <FaMapMarkedAlt size="1em" />
                    </div>
                  </div>
                </div>

                <div className="form_group">
                  <div className="form_label">
                    <label htmlFor="">Latitude : </label>
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
                      onChange={(e) => setLat(e.target.value)}
                      value={Lat}
                    />
                    <div className="input_icon">
                      <FaLaptopHouse size="1em" />
                    </div>
                  </div>
                </div>

                <div className="form_group">
                  <div className="form_label">
                    <label htmlFor="">Longitude : </label>
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
                      onChange={(e) => setLng(e.target.value)}
                      value={Lng}
                    />
                    <div className="input_icon">
                      <FaLaptopHouse size="1em" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="warehouse-personnel">
              <h5>Warehouse Personnel Details</h5>
              <div className="input_group three-column-grid">
                <div
                  className="form_group"
                  style={{ gridArea: "1 / 1 / 2 / 4" }}
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
                      value={true}
                      onChange={(e) => {
                        setDoubleLockSystem(true);
                      }}
                      checked={doubleLockSystem === true ? true : false}
                    />
                    <label htmlFor="double_lock_no">No </label>
                    <input
                      type={"radio"}
                      name="double_lock"
                      id="double_lock_no"
                      onChange={(e) => {
                        setDoubleLockSystem(false);
                      }}
                      value={false}
                      checked={doubleLockSystem === false ? true : false}
                    />
                  </div>
                </div>
                <div className="form_group">
                  <div className="form_label" style={{ width: '20%' }}>
                    <label htmlFor="">Personnel 1 ID : </label>
                  </div>
                  <div className="form_input">
                    <input
                      required
                      placeholder="AA000000RRRRR"
                      id="input_personName_1"
                      name=""
                      onChange={(e) => setUserId1(e.target.value)}
                      value={userId1}
                    />
                    <div className="input_icon">
                      <BsFillPersonFill size="1em" />
                    </div>
                  </div>
                </div>


                <div className="form_group" hidden={!doubleLockSystem}>
                  <div className="form_label" style={{ width: '20%' }}>
                    <label htmlFor="">Personnel 2 ID : </label>
                  </div>
                  <div className="form_input">
                    <input
                      required={doubleLockSystem}
                      placeholder="AA000000RRRRR"
                      id="input_personName_2"
                      name=""
                      onChange={(e) => setUserId2(e.target.value)}
                      value={userId2}
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
            <input type={"submit"} className="mySubmit" value={"Submit Changes"}>
            </input>
          </center>
        </form>
      </div>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { ReactComponent as ChevronRightIcon } from '../../assets/ChevronRight.svg';
import { ReactComponent as WarehouseManagementIcon } from '../../assets/WarehouseManagement.svg';
import { FaWarehouse } from 'react-icons/fa';

export default function WarehouseDetails() {

    const [doubleLockSystem, setDoubleLockSystem] = useState(true);
    const [WarehouseDetails, setWarehousDetails] = useState([]);

    const getDetails = async () => {
        //fetching the WarehouseId
        const URL = window.location.href;
        const arr = URL.split("/");
        const param = arr[arr.length - 1];
        const arr1 = param.split("=");
        const myId = arr1[1];
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
            setDoubleLockSystem(data[7])
            const myArr = coordinates.split(",");
            const lat = myArr[0].substring(1);
            const lng = myArr[1].slice(0, -1);
            data.push(lat);
            data.push(lng);
            getWarehouseType(data[1]).then((val) => {
                console.log(val);
                data[1] = val;
            });

            getStateName(data[3]).then((val) => {
                data[3] = val;
            });

            getPCName(data[3], data[4], data);

        } catch (error) {
            console.log(error);
        }
    }
    const getWarehouseType = async (code) => {
        try {
            const response = await fetch(
                `${process.env.REACT_APP_API_SERVER}/warehouse/warehouseTypes`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    }
                }
            )
            const typesObj = await response.json();
            const types = typesObj['data'];
            for (let i = 0; i < types.length; i++) {
                if (types[i][0] == code) return types[i][1];
            }
        } catch (error) {
            console.log(error);
        }
    }

    const getStateName = async (state_code) => {
        try {
            const response = await fetch(
                'http://evm.iitbhilai.ac.in:8100/user/getStateList',
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    }
                }
            )

            const list = await response.json();
            const list_name = list["states"];
            const list_codes = list["stcodes"];

            for (let i = 0; i < list_codes.length; i++) {
                if (list_codes[i] == state_code) return list_name[i];
            }
        } catch (error) {
            console.log(error);
        }

    }

    const getPCName = async (state_code, pc_code, data) => {
        try {
            const response = await fetch(
                `${process.env.REACT_APP_API_SERVER}/user/getPCListbyState/${state_code}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    }
                }
            )

            const list_pc = await response.json();
            const pc_codes = list_pc["pccode"];
            const pc_names = list_pc["pcname"];

            for (let i = 0; i < pc_codes.length; i++) {
                if (pc_codes[i] == pc_code) {
                    data[4] = pc_names[i];
                    break;
                }
            }
            setWarehousDetails(data);
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
            <WarehouseManagementIcon /><a href='/session/warehousemanagement'><span>Warehouse Management</span></a><ChevronRightIcon /><span>Warehouse Details</span>
        </div> */}

            <div className="myWrapper">
                <div className='PageTitle'>
                    <h4><FaWarehouse /><span>Warehouse Details</span></h4>
                </div>
                <form id="create-warehouse-form" className="myForm" >
                    <div className="formGrid">
                        <div class="warehouse-type">
                            <h5>
                                Warehouse Type
                            </h5>
                            <div className="input_group" style={{ display: "grid", gridTemplateColumns: "1fr", gridGap: "5px 15px" }}>
                                <div className="form_group">
                                    <div className="form_label1">
                                        <label htmlFor="">Type : </label>
                                    </div>
                                    <div className="form_input">
                                        {WarehouseDetails[1]}
                                    </div>

                                </div>

                                <div className="form_group">
                                    <div className="form_label1">
                                        <label htmlFor="">Building Type : </label>
                                    </div>
                                    <div className="form_input">
                                        {WarehouseDetails[2] === "T" ? "Temporary" : "Permenant"}
                                    </div>
                                </div>

                                <div className="form_group">
                                    <div className="form_label1">
                                        <label htmlFor="">Sealed : </label>
                                    </div>
                                    <div className="form_input">
                                        Yes
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="warehouse-location">
                            <h5>
                                Warehouse Location
                            </h5>
                            <div className="input_group">
                                <div className="form_group" style={{ gridArea: "1 / 1 / 2 / 3" }}>
                                    <div className="form_label1">
                                        <label htmlFor="">Address : </label>
                                    </div>
                                    <div className="form_input">
                                        {WarehouseDetails[6]}
                                    </div>
                                </div>

                                <div className="form_group">
                                    <div className="form_label1">
                                        <label htmlFor="">State : </label>
                                    </div>
                                    <div className="form_input">
                                        {WarehouseDetails[3]}
                                    </div>

                                </div>

                                <div className="form_group">
                                    <div className="form_label1">
                                        <label htmlFor="">PC Code : </label>
                                    </div>
                                    <div className="form_input">
                                        {WarehouseDetails[4]}
                                    </div>
                                </div>

                                <div className="form_group">
                                    <div className="form_label1">
                                        <label htmlFor="">Latitude : </label>
                                    </div>
                                    <div className="form_input">
                                        {WarehouseDetails[WarehouseDetails.length - 2]}
                                    </div>
                                </div>

                                <div className="form_group">
                                    <div className="form_label1">
                                        <label htmlFor="">Longitude : </label>
                                    </div>
                                    <div className="form_input">
                                        {WarehouseDetails[WarehouseDetails.length - 1]}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="warehouse-personnel">
                            <h5>
                                Warehouse Personnel Details
                            </h5>
                            <div className="input_group three-column-grid">
                                <div className="form_group" style={{ gridArea: "1 / 1 / 2 / 4" }}>
                                    <div className="form_radio">
                                        Double Lock System: {doubleLockSystem ? "Yes" : "No"}
                                        {/* <label htmlFor="double_lock_yes">Double Lock System: </label>
                                    <label htmlFor="double_lock_yes">Yes </label>
                                    <input type={"radio"} name="double_lock" id="double_lock_yes" defaultChecked={true} value="1" onChange={(e) => {
                                        // console.log("Yes")
                                        // console.log(e.target.checked)
                                        setDoubleLockSystem(true)
                                    }} />
                                    <label htmlFor="double_lock_no">No </label>
                                    <input type={"radio"} name="double_lock" id="double_lock_no" value="0" onChange={(e) => {
                                        console.log("No")
                                        // console.log(e.target.checked)
                                        setDoubleLockSystem(false)
                                    }} /> */}
                                    </div>
                                </div>
                                <div className="form_group" style={{ gridArea: (doubleLockSystem ? "" : "2 / 1 / 3 / 3") }}>
                                    <div className="form_label1">
                                        <label htmlFor="">Personnel 1 User ID : </label>
                                    </div>
                                    <div className="form_input">
                                        {WarehouseDetails[8]}
                                    </div>
                                </div>



                                <div className="form_group" style={{ display: (doubleLockSystem ? "" : "none") }}>
                                    <div className="form_label1">
                                        <label htmlFor="">Personnel 2 User ID : </label>
                                    </div>
                                    <div className="form_input">
                                        {WarehouseDetails[9]}
                                    </div>
                                </div>



                            </div>
                        </div>
                    </div>
                    {/* <center>
                    <input type={"submit"} className="mySubmit">
                    </input>
                </center> */}
                </form>

            </div>
        </div>
    )
}
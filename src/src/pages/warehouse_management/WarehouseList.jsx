import React, { useEffect } from "react";
import './css/Datatable.css';
import { HiDocumentDuplicate } from "react-icons/hi";
import { FaEdit } from "react-icons/fa";
import { FaListUl } from "react-icons/fa";
import { AiOutlinePlus } from "react-icons/ai";
import { FaClipboardList } from 'react-icons/fa';
import { FaWarehouse } from 'react-icons/fa';
import './css/warehouse.css'
import { actions } from "react-table/dist/react-table.development";
import { FaKey } from 'react-icons/fa';
import { FaCircle } from 'react-icons/fa';
import ToggleSwitch from "../../components/ToggleSwitch";

const $ = require('jquery')
$.DataTable = require('datatables.net');

$(document).ready(function () {
    // let table = $('#table_id').DataTable();
    setTimeout(() => {
        let table = $('#table_id').DataTable();
    }, 350);

});

export default function WarehouseList() {
    const [Details, setDetails] = React.useState([]);
    const [isLoaded, setisLoaded] = React.useState(false);

    async function getList() {
        let userId = sessionStorage.getItem('sessionToken');
        const code = userId.slice(0, 2);
        console.log(code);
        try {
            const response = await fetch(
                `${process.env.REACT_APP_API_SERVER}/warehouse/listWarehouses`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        "stateCode": code
                    }),
                })

            const data = await response.json();
            console.log(data);
            MapWarehouseTypes(data["data"]);
        } catch (error) {
            console.log(error)
        }

    }
    useEffect(() => {
        getList();
    }, [])

    const MapWarehouseTypes = async (data) => {
        try {
            const response = await fetch(
                `${process.env.REACT_APP_API_SERVER}/warehouse/warehouseTypes`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            )
            const types = await response.json();
            data.map(arr => {
                types['data'].map(val => {
                    if (arr[1] === val[0]) {
                        arr[1] = val[1];
                    }
                })
            })
            console.log("data" +data);
            setDetails(data);
        } catch (error) {
            console.log(error);
        }
    }


    const ActivateWarehouse = async (myId) => {
        if (window.confirm(`Are you sure you want to Activate Warehouse ${myId}? `)) {
            try {

                const response = await fetch(
                    `${process.env.REACT_APP_API_SERVER}/warehouse/activateWarehouse/${myId}`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                )

                const status = response;
                if (status.status == 200) {
                    alert("Warehouse Activated Successfully");
                    window.location.href = '/session/warehousemanagement';
                }
                else {
                    alert("Deactivation Failed");
                }

            } catch (error) {
                console.log(error);
            }
        }
    }

    const DectivateWarehouse = async (myId) => {
        if (window.confirm(`Are you sure you want to Deactivate Warehouse ${myId}? `)) {
            try {

                const response = await fetch(
                    `${process.env.REACT_APP_API_SERVER}/warehouse/deactivateWarehouse/${myId}`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                )

                const status = response;
                if (status.status == 200) {
                    alert("Warehouse Deactivated Successfully");
                    window.location.href = '/session/warehousemanagement';
                }
                else {
                    alert("Deactivation Failed");
                }

            } catch (error) {
                console.log(error);
            }
        }
    }

    const action = (myId, mode) => {
        console.log(myId)
        if (mode == "1") ActivateWarehouse(myId);
        else DectivateWarehouse(myId);
    }

    return (
        <div className="myWrapper" style={{ position: "relative" }}>
            <div className='PageTitle'>
                <h4><FaClipboardList /> <span>List of Warehouses</span></h4>
                <div className="myIconLabels">
                    <ul>
                        <li><React.Fragment><FaKey className="myBlue" /><FaKey className="myBlue" /></React.Fragment> <span>Double Lock Present</span></li>
                        <li><FaKey className="myBlue" /> <span>Double Lock Absent</span></li>
                        <li><FaWarehouse className="tempWarehouse" /> <span>Temporary Warehouse</span></li>
                        <li><FaWarehouse className="perWarehouse" /> <span>Permanent Warehouse</span></li>
                        <li><FaCircle className="activeCircle" /> <span>Active Warehouse</span></li>
                        <li><FaCircle className="inactiveCircle" /> <span>Inactive Warehouse</span></li>
                    </ul>
                </div>
            </div>
            <button className='myAddbtn' onClick={() => {
                window.location.href = "/session/warehousemanagement/addwarehouse"
            }}><AiOutlinePlus />Add</button>
            <table id="table_id" className="display">
                <thead className="tableHeading">
                    <tr>
                        <th>Active</th>
                        <th>WarehouseId</th>
                        <th>Warehouse Type</th>
                        <th className="btn_group">Details</th>
                        <th className="btn_group">Edit</th>
                        <th className="btn_group">Activate/Deactivate</th>
                    </tr>
                </thead>
                <tbody>
                    {Details.length && Details.map((value) => (
                        <tr>
                            <td>
                                <center>{value[13] == "A" ? <FaCircle className="activeCircle" /> : <FaCircle className="inactiveCircle" />}</center>
                            </td>
                            <td className="text_center">
                                <span> {value[2] === "T" ? <FaWarehouse className='tempWarehouse' /> : <FaWarehouse className='perWarehouse' />}</span>
                                <span> {value[0]} </span>
                                <span className="twoKeys"> {value[7] === true ? <React.Fragment><FaKey size='1em' /> <FaKey size='1em' /></React.Fragment> : <FaKey size='1em' />}</span>
                            </td>
                            <td>
                                {value[1]}
                            </td>
                            <td><div className="btn_details" id={value[0]} onClick={() => window.location = `session/warehousemanagement/warehousedetails/id=${value[0]}`}><FaListUl /></div></td>
                            <td><div className="btn_edit" id={value[0]} onClick={() => window.location = `session/warehousemanagement/modifywarehouse/id=${value[0]}`}><FaEdit /></div></td>

                            <td>
                                <ToggleSwitch key={value[0]} warehouseID={value[0]} label={value[13] == "A" ? "Deactivate" : "Activate"} checked={value[13] == "A"} onToggle={(e) => value[13] == "A" ? action(e, 0) : action(e, 1)} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
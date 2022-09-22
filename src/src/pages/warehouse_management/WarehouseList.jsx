import React, { useEffect } from "react";
import './css/Datatable.css';
import { HiDocumentDuplicate } from "react-icons/hi";
import { FaEdit } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import { AiOutlinePlus } from "react-icons/ai";
import {FaClipboardList} from 'react-icons/fa';
import './css/warehouse.css'


const $ = require('jquery')
$.DataTable = require('datatables.net');

$(document).ready(function () {
    $('#table_id').DataTable();
});

export default function WarehouseList() {
    const [Details,setDetails] = React.useState([]);
    async function getList(){
        try {
            const response = await fetch(
                `http://evm.iitbhilai.ac.in:8100/warehouse/listWarehouses`,
                {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        "stateCode": "MH",
                        "pcCode": "13"
                    }),
                })

                const data = await response.json();
                   data.map((val)=>{
                        fetch(
                            `http://evm.iitbhilai.ac.in:8100/warehouse/warehouseDetails/${val[0]}`,
                            {
                                method: "GET",
                                headers: {
                                "Content-Type": "application/json",
                                }
                            }
                        ).then((res) => res.json())
                        .then((json) => {
                            setDetails(current => [...current, json]);
                        })
                })
        } catch (error) {
            console.log(error)
        }

    }

    useEffect(()=>{
        getList();
    },[])

    return (
        <div className="myWrapper" style={{position: "relative"}}>
            <div className='PageTitle'>
				<h4><FaClipboardList/> <span>List of Warehouses</span></h4>
		    </div>
            <button className='myAddbtn' onClick={() => {
                window.location.href = "/session/warehousemanagement/addwarehouse"
            }}><AiOutlinePlus />Add</button>
            <table id="table_id" className="display">
                <thead className="tableHeading">
                    <tr>
                        <th>ID</th>
                        <th>Type</th>
                        <th>Double Lock</th>
                        <th>Building Type</th>
<<<<<<< src/src/pages/warehouse_management/WarehouseList.jsx
                        {/* <th>Sealed</th> */}
=======
                        <th>Sealed</th>
>>>>>>> src/src/pages/warehouse_management/WarehouseList.jsx
                        <th className="btn_group">Details</th>
                        <th className="btn_group">Edit</th>
                        <th className="btn_group">Delete</th>
                    </tr>
                </thead>
                <tbody>
<<<<<<< src/src/pages/warehouse_management/WarehouseList.jsx
                {Details.length && Details.map((value) =>(
                        <tr>
                            <td>
                                {value[0]}
                            </td>
                            <th>
                                {value[1]}
                            </th>
                            <th>
                                {value[7] === true ? "Yes" : "No"}
                            </th>
                            <th>
                                {value[2] === "T" ? "Temporary" : "Permanaet"}
                            </th>
                            <td><div className="btn_details"><HiDocumentDuplicate size="1em" />  <span>  Details </span></div> </td>
                            <td><div className="btn_edit"><FaEdit /> <span> Edit </span></div> </td>
                            <td><div className="btn_delete"><FaTrashAlt /> <span> Delete</span></div> </td>
                        </tr>
                    ))}
=======
                    <tr>
                        <td>MH12A1</td>
                        <th>National Reserve Warehouse</th>
                        <th>Yes</th>
                        <th>Temporary</th>
                        <th>Yes</th>
                        <td><div className="btn_details"><HiDocumentDuplicate size="1em" />  <span>  Details </span></div> </td>
                        <td><div className="btn_edit"><FaEdit /> <span> Edit </span></div> </td>
                        <td><div className="btn_delete"><FaTrashAlt /> <span> Delete</span></div> </td>
                    </tr>
                    <tr>
                        <td>UP12B1</td>
                        <th>State Central Warehouse</th>
                        <th>Yes</th>
                        <th>Temporary</th>
                        <th>Yes</th>
                        <td><div className="btn_details"><HiDocumentDuplicate size="1em" />  <span>  Details </span></div> </td>
                        <td><div className="btn_edit"><FaEdit /> <span> Edit </span></div> </td>
                        <td><div className="btn_delete"><FaTrashAlt /> <span> Delete</span></div> </td>
                    </tr>
                    <tr>
                        <td>DL05C2</td>
                        <th>District Warehouse</th>
                        <th>Yes</th>
                        <th>Temporary</th>
                        <th>Yes</th>
                        <td><div className="btn_details"><HiDocumentDuplicate size="1em" />  <span>  Details </span></div> </td>
                        <td><div className="btn_edit"><FaEdit /> <span> Edit </span></div> </td>
                        <td><div className="btn_delete"><FaTrashAlt /> <span> Delete</span></div> </td>
                    </tr>
                    <tr>
                        <td>MH12A1</td>
                        <th>National Reserve Warehouse</th>
                        <th>Yes</th>
                        <th>Temporary</th>
                        <th>Yes</th>
                        <td><div className="btn_details"><HiDocumentDuplicate size="1em" />  <span>  Details </span></div> </td>
                        <td><div className="btn_edit"><FaEdit /> <span> Edit </span></div> </td>
                        <td><div className="btn_delete"><FaTrashAlt /> <span> Delete</span></div> </td>
                    </tr>
                    <tr>
                        <td>UP12B1</td>
                        <th>State Central Warehouse</th>
                        <th>Yes</th>
                        <th>Temporary</th>
                        <th>Yes</th>
                        <td><div className="btn_details"><HiDocumentDuplicate size="1em" />  <span>  Details </span></div> </td>
                        <td><div className="btn_edit"><FaEdit /> <span> Edit </span></div> </td>
                        <td><div className="btn_delete"><FaTrashAlt /> <span> Delete</span></div> </td>
                    </tr>
                    <tr>
                        <td>DL05C2</td>
                        <th>District Warehouse</th>
                        <th>Yes</th>
                        <th>Temporary</th>
                        <th>Yes</th>
                        <td><div className="btn_details"><HiDocumentDuplicate size="1em" />  <span>  Details </span></div> </td>
                        <td><div className="btn_edit"><FaEdit /> <span> Edit </span></div> </td>
                        <td><div className="btn_delete"><FaTrashAlt /> <span> Delete</span></div> </td>
                    </tr>
                    <tr>
                        <td>MH12A1</td>
                        <th>National Reserve Warehouse</th>
                        <th>Yes</th>
                        <th>Temporary</th>
                        <th>Yes</th>
                        <td><div className="btn_details"><HiDocumentDuplicate size="1em" />  <span>  Details </span></div> </td>
                        <td><div className="btn_edit"><FaEdit /> <span> Edit </span></div> </td>
                        <td><div className="btn_delete"><FaTrashAlt /> <span> Delete</span></div> </td>
                    </tr>
                    <tr>
                        <td>UP12B1</td>
                        <th>State Central Warehouse</th>
                        <th>Yes</th>
                        <th>Temporary</th>
                        <th>Yes</th>
                        <td><div className="btn_details"><HiDocumentDuplicate size="1em" />  <span>  Details </span></div> </td>
                        <td><div className="btn_edit"><FaEdit /> <span> Edit </span></div> </td>
                        <td><div className="btn_delete"><FaTrashAlt /> <span> Delete</span></div> </td>
                    </tr>
                    <tr>
                        <td>DL05C2</td>
                        <th>District Warehouse</th>
                        <th>Yes</th>
                        <th>Temporary</th>
                        <th>Yes</th>
                        <td><div className="btn_details"><HiDocumentDuplicate size="1em" />  <span>  Details </span></div> </td>
                        <td><div className="btn_edit"><FaEdit /> <span> Edit </span></div> </td>
                        <td><div className="btn_delete"><FaTrashAlt /> <span> Delete</span></div> </td>
                    </tr>
                    <tr>
                        <td>MH12A1</td>
                        <th>National Reserve Warehouse</th>
                        <th>Yes</th>
                        <th>Temporary</th>
                        <th>Yes</th>
                        <td><div className="btn_details"><HiDocumentDuplicate size="1em" />  <span>  Details </span></div> </td>
                        <td><div className="btn_edit"><FaEdit /> <span> Edit </span></div> </td>
                        <td><div className="btn_delete"><FaTrashAlt /> <span> Delete</span></div> </td>
                    </tr>
                    <tr>
                        <td>UP12B1</td>
                        <th>State Central Warehouse</th>
                        <th>Yes</th>
                        <th>Temporary</th>
                        <th>Yes</th>
                        <td><div className="btn_details"><HiDocumentDuplicate size="1em" />  <span>  Details </span></div> </td>
                        <td><div className="btn_edit"><FaEdit /> <span> Edit </span></div> </td>
                        <td><div className="btn_delete"><FaTrashAlt /> <span> Delete</span></div> </td>
                    </tr>
                    <tr>
                        <td>DL05C2</td>
                        <th>District Warehouse</th>
                        <th>Yes</th>
                        <th>Temporary</th>
                        <th>Yes</th>
                        <td><div className="btn_details"><HiDocumentDuplicate size="1em" />  <span>  Details </span></div> </td>
                        <td><div className="btn_edit"><FaEdit /> <span> Edit </span></div> </td>
                        <td><div className="btn_delete"><FaTrashAlt /> <span> Delete</span></div> </td>
                    </tr>
                    <tr>
                        <td>MH12A1</td>
                        <th>National Reserve Warehouse</th>
                        <th>Yes</th>
                        <th>Temporary</th>
                        <th>Yes</th>
                        <td><div className="btn_details"><HiDocumentDuplicate size="1em" />  <span>  Details </span></div> </td>
                        <td><div className="btn_edit"><FaEdit /> <span> Edit </span></div> </td>
                        <td><div className="btn_delete"><FaTrashAlt /> <span> Delete</span></div> </td>
                    </tr>
                    <tr>
                        <td>UP12B1</td>
                        <th>State Central Warehouse</th>
                        <th>Yes</th>
                        <th>Temporary</th>
                        <th>Yes</th>
                        <td><div className="btn_details"><HiDocumentDuplicate size="1em" />  <span>  Details </span></div> </td>
                        <td><div className="btn_edit"><FaEdit /> <span> Edit </span></div> </td>
                        <td><div className="btn_delete"><FaTrashAlt /> <span> Delete</span></div> </td>
                    </tr>
                    <tr>
                        <td>DL05C2</td>
                        <th>District Warehouse</th>
                        <th>Yes</th>
                        <th>Temporary</th>
                        <th>Yes</th>
                        <td><div className="btn_details"><HiDocumentDuplicate size="1em" />  <span>  Details </span></div> </td>
                        <td><div className="btn_edit"><FaEdit /> <span> Edit </span></div> </td>
                        <td><div className="btn_delete"><FaTrashAlt /> <span> Delete</span></div> </td>
                    </tr>
>>>>>>> src/src/pages/warehouse_management/WarehouseList.jsx
                </tbody>
            </table>
        </div>
    )
}
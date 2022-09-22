import React, { useEffect } from "react";
import './css/Datatable.css';
import { HiDocumentDuplicate } from "react-icons/hi";
import { FaEdit } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import { AiOutlinePlus } from "react-icons/ai";
import {FaClipboardList} from 'react-icons/fa';
import {FaLockOpen} from 'react-icons/fa';
import {FaLock} from 'react-icons/fa';
import {FaWarehouse} from 'react-icons/fa';
import './css/warehouse.css'


const $ = require('jquery')
$.DataTable = require('datatables.net');

$(document).ready(function () {
    // let table = $('#table_id').DataTable();
  setTimeout(() => {
    let table = $('#table_id').DataTable(); 
  }, 350);
  
});

export default function WarehouseList() {
<<<<<<< src/src/pages/warehouse_management/WarehouseList.jsx

    
    const [Details,setDetails] = React.useState([]);
    const [isLoaded,setisLoaded] = React.useState(false);
    
    async function getList(){
        let userId = sessionStorage.getItem('sessionToken');
        const code =  userId.slice(0, 2);
=======
    const [Details,setDetails] = React.useState([]);
    async function getList(){
>>>>>>> src/src/pages/warehouse_management/WarehouseList.jsx
        try {
            const response = await fetch(
                `http://evm.iitbhilai.ac.in:8100/warehouse/listWarehouses`,
                {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
<<<<<<< src/src/pages/warehouse_management/WarehouseList.jsx
                        "stateCode": code
=======
                        "stateCode": "MH",
                        "pcCode": "13"
>>>>>>> src/src/pages/warehouse_management/WarehouseList.jsx
                    }),
                })

                const data = await response.json();
<<<<<<< src/src/pages/warehouse_management/WarehouseList.jsx
                MapWarehouseTypes(data);
           
=======
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
>>>>>>> src/src/pages/warehouse_management/WarehouseList.jsx
        } catch (error) {
            console.log(error)
        }

    }
<<<<<<< src/src/pages/warehouse_management/WarehouseList.jsx
=======

>>>>>>> src/src/pages/warehouse_management/WarehouseList.jsx
    useEffect(()=>{
        getList();
    },[])

<<<<<<< src/src/pages/warehouse_management/WarehouseList.jsx
    const  MapWarehouseTypes = async (data) => {
        try{
            const response = await fetch(
                'http://evm.iitbhilai.ac.in:8100/warehouse/warehouseTypes',
                {
                    method: "GET",
                    headers: {
                      "Content-Type": "application/json",
                    },
                }
            )
            const types = await response.json();
            data.map(arr => {
                types.map(val => {
                    if(arr[1] === val[0]){
                        arr[1] = val[1];
                    }
                })    
            })
            setDetails(data);
        } catch (error) {
            console.log(error);
        }
    }

=======
>>>>>>> src/src/pages/warehouse_management/WarehouseList.jsx
    return (
        <div className="myWrapper" style={{position: "relative"}}>
            <div className='PageTitle'>
				<h4><FaClipboardList/> <span>List of Warehouses</span></h4>
                <div className="myIconLabels">
                    <ul>
                        <li><FaLockOpen className="text-center"/> <span>Double Lock Absent</span></li>
                        <li><FaLock className="text-center"/> <span>Double Lock Present</span></li>
                        <li><FaWarehouse className="tempWarehouse"/> <span>Temporary Warehouse</span></li>
                        <li><FaWarehouse className="perWarehouse"/> <span>Permanent Warehouse</span></li>
                    </ul>
                </div>
		    </div>
            <button className='myAddbtn' onClick={() => {
                window.location.href = "/session/warehousemanagement/addwarehouse"
            }}><AiOutlinePlus />Add</button>
            <table id="table_id" className="display">
                <thead className="tableHeading">
                    <tr>
                        <th>WarehouseId</th>
                        <th>Warehouse Type</th>
                        <th>Double Lock</th>
<<<<<<< src/src/pages/warehouse_management/WarehouseList.jsx
                        <th>Warehouse Building Type</th>
=======
                        <th>Building Type</th>
                        {/* <th>Sealed</th> */}
>>>>>>> src/src/pages/warehouse_management/WarehouseList.jsx
                        <th className="btn_group">Details</th>
                        <th className="btn_group">Edit</th>
                        <th className="btn_group">Delete</th>
                    </tr>
                </thead>
                <tbody>
<<<<<<< src/src/pages/warehouse_management/WarehouseList.jsx
                    {Details.length && Details.map((value) =>(
=======
                {Details.length && Details.map((value) =>(
>>>>>>> src/src/pages/warehouse_management/WarehouseList.jsx
                        <tr>
                            <td>
                                {value[0]}
                            </td>
<<<<<<< src/src/pages/warehouse_management/WarehouseList.jsx
                            <td>
                                {value[1]}
                            </td>
                            <td className="text-center">
                               <center> {value[7] === true ? <FaLock size='1.5em' /> : <FaLockOpen size='1.5em' />}</center>
                            </td>
                            <td>
                               <center> {value[2] === "T" ? <FaWarehouse size='1.5em' className="tempWarehouse"/> : <FaWarehouse size='1.5em' className="perWarehouse"/>}</center>
                            </td>
=======
                            <th>
                                {value[1]}
                            </th>
                            <th>
                                {value[7] === true ? "Yes" : "No"}
                            </th>
                            <th>
                                {value[2] === "T" ? "Temporary" : "Permanaet"}
                            </th>
>>>>>>> src/src/pages/warehouse_management/WarehouseList.jsx
                            <td><div className="btn_details"><HiDocumentDuplicate size="1em" />  <span>  Details </span></div> </td>
                            <td><div className="btn_edit"><FaEdit /> <span> Edit </span></div> </td>
                            <td><div className="btn_delete"><FaTrashAlt /> <span> Delete</span></div> </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}


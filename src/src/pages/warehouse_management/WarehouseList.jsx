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
import {FaCaretDown} from 'react-icons/fa';
import './css/warehouse.css'
import { actions } from "react-table/dist/react-table.development";


const $ = require('jquery')
$.DataTable = require('datatables.net');

$(document).ready(function () {
    // let table = $('#table_id').DataTable();
  setTimeout(() => {
    let table = $('#table_id').DataTable(); 
  }, 350);
  
});

export default function WarehouseList() {
    const [Details,setDetails] = React.useState([]);
    const [isLoaded,setisLoaded] = React.useState(false);
    
    async function getList(){
        let userId = sessionStorage.getItem('sessionToken');
        const code =  userId.slice(0, 2);
        console.log(code);
        try {
            const response = await fetch(
                `http://evm.iitbhilai.ac.in:8100/warehouse/listWarehouses`,
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
    useEffect(()=>{
        getList();
    },[])

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
                types['data'].map(val => {
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

    function myFunction() {
        document.getElementById("myDropdown").classList.toggle("show");
      }
      
      // Close the dropdown if the user clicks outside of it
      window.onclick = function(event) {
        if (!event.target.matches('.btn_delete')) {
          var dropdowns = document.getElementsByClassName("dropdown-content");
          var i;
          for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
              openDropdown.classList.remove('show');
            }
          }
        }
      }

      const ActivateWarehouse = async (myId) =>{
        if(window.confirm(`Are you sure you want to Activate Warehouse ${myId}? `)){
                try {
                    
                    const response = await fetch(
                        `http://evm.iitbhilai.ac.in:8100/warehouse/activateWarehouse/${myId}`,
                        {
                            method : "GET",
                            headers: {
                                "Content-Type": "application/json",
                              },
                        }
                    )

                    const status = response;
                    if(status.status == 200){
                      alert("Warehouse Activated Successfully");
                      window.location.href = '/session/warehousemanagement';
                    }
                    else{
                      alert("Deactivation Failed");
                    }

                } catch (error) {
                    console.log(error);
                }
        }
  }

      const DectivateWarehouse = async (myId) =>{
            if(window.confirm(`Are you sure you want to Deactivate Warehouse ${myId}? `)){
                    try {
                        
                        const response = await fetch(
                            `http://evm.iitbhilai.ac.in:8100/warehouse/deactivateWarehouse/${myId}`,
                            {
                                method : "GET",
                                headers: {
                                    "Content-Type": "application/json",
                                  },
                            }
                        )

                        const status = response;
                        if(status.status == 200){
                          alert("Warehouse Deactivated Successfully");
                          window.location.href = '/session/warehousemanagement';
                        }
                        else{
                          alert("Deactivation Failed");
                        }

                    } catch (error) {
                        console.log(error);
                    }
            }
      }

      const action = (myId,mode) => {
          if(mode=="1") ActivateWarehouse(myId);
          else DectivateWarehouse(myId);
      }
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
                        <th>Warehouse Building Type</th>
                        <th>Active/Inactive</th>
                        <th className="btn_group">Details</th>
                        <th className="btn_group">Edit</th>
                        <th className="btn_group">Activate/Deactivate</th>
                    </tr>
                </thead>
                <tbody>
                    {Details.length && Details.map((value) =>(
                        <tr>
                            <td>
                                {value[0]}
                            </td>
                            <td>
                                {value[1]}
                            </td>
                            <td className="text-center">
                               <center>{value[7] === true ? <FaLock size='1.5em' /> : <FaLockOpen size='1.5em' />}</center>
                            </td>
                            <td>
                               <center>{value[2] === "T" ? <FaWarehouse size='1.5em' className="tempWarehouse"/> : <FaWarehouse size='1.5em' className="perWarehouse"/>}</center>
                            </td>
                            <td>
                                {value[13] == "A" ? "Active" : "Inactive"}
                            </td>
                            <td><div className="btn_details" id={value[0]} onClick={()=> window.location = `warehousemanagement/warehousedetails/id=${value[0]}`}><HiDocumentDuplicate size="1em"  /><span>Details</span></div></td>
                            <td><div className="btn_edit"><FaEdit /><span>Edit</span></div></td>
                            
                            <td>
                                <select id={value[0]} className="mySelect" onChange={(e) => action(e.target.id,e.target.value)}>
                                    <option value="-1">--Select--</option>
                                    <option value='1' style={value[13] == "A" ? {display : 'none'} : {display : 'block'}} >Activate</option>
                                    <option value='0' style={value[13] == "I" ? {display : 'none'} : {display : 'block'}} disabled={value[13] == "I" ? true : false}>Deactivate</option>
                                </select>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}


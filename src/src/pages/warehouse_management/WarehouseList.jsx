import React from "react";
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
                        <th>Sealed</th>
                        <th className="btn_group">Details</th>
                        <th className="btn_group">Edit</th>
                        <th className="btn_group">Delete</th>
                    </tr>
                </thead>
                <tbody>
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
                </tbody>
            </table>
        </div>
    )
}
import React from "react";
import './css/Datatable.css';
import { HiDocumentDuplicate } from "react-icons/hi";
import { FaEdit } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import { AiOutlinePlus } from "react-icons/ai";


const $ = require('jquery')
$.DataTable = require('datatables.net');

$(document).ready(function () {
    $('#table_id').DataTable();
});

export default function WarehouseList() {
    return (
        <div className="myWrapper" style={{position: "relative"}}>
            <button className='myAddbtn' onClick={() => {
                window.location.href = "/session/warehousemanagement/addwarehouse"
            }}><AiOutlinePlus />Add</button>
            <table id="table_id" className="display">
                <thead className="tableHeading">
                    <tr>
                        <th>Warehouse Name</th>
                        <th className="btn_group">Details</th>
                        <th className="btn_group">Edit</th>
                        <th className="btn_group">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>WareHouse 1</td>
                        <td><div className="btn_details"><HiDocumentDuplicate size="1em" />  <span>  Details </span></div> </td>
                        <td><div className="btn_edit"><FaEdit /> <span> Edit </span></div> </td>
                        <td><div className="btn_delete"><FaTrashAlt /> <span> Delete</span></div> </td>
                    </tr>
                    <tr>
                        <td>WareHouse 2</td>
                        <td><div className="btn_details"><HiDocumentDuplicate size="1em" />  <span>  Details </span></div> </td>
                        <td><div className="btn_edit"><FaEdit /> <span> Edit </span></div> </td>
                        <td><div className="btn_delete"><FaTrashAlt /> <span> Delete</span></div> </td>
                    </tr>
                    <tr>
                        <td>WareHouse 3</td>
                        <td><div className="btn_details"><HiDocumentDuplicate size="1em" />  <span>  Details </span></div> </td>
                        <td><div className="btn_edit"><FaEdit /> <span> Edit </span></div> </td>
                        <td><div className="btn_delete"><FaTrashAlt /> <span> Delete</span></div> </td>
                    </tr>
                    <tr>
                        <td>WareHouse 4</td>
                        <td><div className="btn_details"><HiDocumentDuplicate size="1em" />  <span>  Details </span></div> </td>
                        <td><div className="btn_edit"><FaEdit /> <span> Edit </span></div> </td>
                        <td><div className="btn_delete"><FaTrashAlt /> <span> Delete</span></div> </td>
                    </tr>
                    <tr>
                        <td>WareHouse 5</td>
                        <td><div className="btn_details"><HiDocumentDuplicate size="1em" />  <span>  Details </span></div> </td>
                        <td><div className="btn_edit"><FaEdit /> <span> Edit </span></div> </td>
                        <td><div className="btn_delete"><FaTrashAlt /> <span> Delete</span></div> </td>
                    </tr>
                    <tr>
                        <td>WareHouse 6</td>
                        <td><div className="btn_details"><HiDocumentDuplicate size="1em" />  <span>  Details </span></div> </td>
                        <td><div className="btn_edit"><FaEdit /> <span> Edit </span></div> </td>
                        <td><div className="btn_delete"><FaTrashAlt /> <span> Delete</span></div> </td>
                    </tr>
                    <tr>
                        <td>WareHouse 7</td>
                        <td><div className="btn_details"><HiDocumentDuplicate size="1em" />  <span>  Details </span></div> </td>
                        <td><div className="btn_edit"><FaEdit /> <span> Edit </span></div> </td>
                        <td><div className="btn_delete"><FaTrashAlt /> <span> Delete</span></div> </td>
                    </tr>
                    <tr>
                        <td>WareHouse 8</td>
                        <td><div className="btn_details"><HiDocumentDuplicate size="1em" />  <span>  Details </span></div> </td>
                        <td><div className="btn_edit"><FaEdit /> <span> Edit </span></div> </td>
                        <td><div className="btn_delete"><FaTrashAlt /> <span> Delete</span></div> </td>
                    </tr>
                    <tr>
                        <td>WareHouse 9</td>
                        <td><div className="btn_details"><HiDocumentDuplicate size="1em" />  <span>  Details </span></div> </td>
                        <td><div className="btn_edit"><FaEdit /> <span> Edit </span></div> </td>
                        <td><div className="btn_delete"><FaTrashAlt /> <span> Delete</span></div> </td>
                    </tr>
                    <tr>
                        <td>WareHouse 10</td>
                        <td><div className="btn_details"><HiDocumentDuplicate size="1em" />  <span>  Details </span></div> </td>
                        <td><div className="btn_edit"><FaEdit /> <span> Edit </span></div> </td>
                        <td><div className="btn_delete"><FaTrashAlt /> <span> Delete</span></div> </td>
                    </tr>
                    <tr>
                        <td>WareHouse 11</td>
                        <td><div className="btn_details"><HiDocumentDuplicate size="1em" />  <span>  Details </span></div> </td>
                        <td><div className="btn_edit"><FaEdit /> <span> Edit </span></div> </td>
                        <td><div className="btn_delete"><FaTrashAlt /> <span> Delete</span></div> </td>
                    </tr>

                    <tr>
                        <td>WareHouse 12</td>
                        <td><div className="btn_details"><HiDocumentDuplicate size="1em" />  <span>  Details </span></div> </td>
                        <td><div className="btn_edit"><FaEdit /> <span> Edit </span></div> </td>
                        <td><div className="btn_delete"><FaTrashAlt /> <span> Delete</span></div> </td>
                    </tr>
                    <tr>
                        <td>WareHouse 13</td>
                        <td><div className="btn_details"><HiDocumentDuplicate size="1em" />  <span>  Details </span></div> </td>
                        <td><div className="btn_edit"><FaEdit /> <span> Edit </span></div> </td>
                        <td><div className="btn_delete"><FaTrashAlt /> <span> Delete</span></div> </td>
                    </tr>
                    <tr>
                        <td>WareHouse 14</td>
                        <td><div className="btn_details"><HiDocumentDuplicate size="1em" />  <span>  Details </span></div> </td>
                        <td><div className="btn_edit"><FaEdit /> <span> Edit </span></div> </td>
                        <td><div className="btn_delete"><FaTrashAlt /> <span> Delete</span></div> </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
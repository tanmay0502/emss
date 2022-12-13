import React from "react";
import { useState, useEffect } from "react";
import "./styles/order.css";
import "../home/styles/Newversion.css";
import { Fragment } from 'react';
import { FaCircle } from 'react-icons/fa'
import { FaKey } from 'react-icons/fa'
import { FaSearch } from "react-icons/fa";
import SomeStats from "../../assets/someStats.svg";
import { ReactComponent as SearchInputElement } from "../../assets/searchInputIcon.svg";
import {
    AiOutlineSortAscending,
    AiOutlineSortDescending,
} from "react-icons/ai";
import ToggleButton from '../../components/ToggleButton';
import { useNavigate } from 'react-router-dom'
import { ReactComponent as ArrowLeft } from "../../assets/ArrowLeft.svg";
import { ReactComponent as ArrowRight } from "../../assets/ArrowRight.svg";
import { ReactComponent as ChevronDown } from "../../assets/ChevronDown.svg";
import { ReactComponent as SearchIcon } from "../../assets/search.svg";
import { ReactComponent as SourceIcon } from "../../assets/SourceIcon.svg";

import { ReactComponent as DestIcon } from "../../assets/DestIcon.svg";

export default function VehicleDetails() {


    const navigate = useNavigate();
    const units = [['M2', 50, 50], ['M2', 50, 50], ['M2', 50, 50], ['M2', 50, 50]]
    const units_1 = [['M2', 50, 50, 50], ['M2', 50, 50, 50]]
    const Unit_length = [1]
    const To_Send = [1, 2, 3]
    const To_Receive = [1, 2, 3]
    const block_1 = [1, 2, 3, 4, 5]

    const [vehicleNumber, setVehicleNumber] = useState();
    const [senderIncharge, setSenderIncharge] = useState();
    const [drivername, setDriverName] = useState();
    const [drivernumber, setDriverNumber] = useState();
    const [escortName, setEcsortName] = useState();
    const [escortnumber, setEscortNumber] = useState();
    const [addvehicle,setAddVehicle]=useState(-1);




    function AddVehicle(id){
        if(addvehicle==id){
            setAddVehicle(-1);
        }
        else{
            setAddVehicle(id);
        }
    }


    // console.log(document.getElementById('formVehicleNumber').value, senderIncharge, drivername, drivernumber, escortName, escortnumber, "Hello")
    return (
        <div>

            <div className="MyContainer">
                <div className="myCard d-flex d-flex-column">
                    <div className="myCardHeader myPadding">Vehicle Details</div>
                    <div className="w-100 myCardBody myPadding SCROLL_5">
                        {block_1.length > 0 &&
                            block_1.map((val, id) => (
                                <div className="block bg-white pt-2 pl-10 pr-10 pb-5 rounded-lg mb-10">
                                    <div>
                                        <div className="d-flex d-flex-apart" style={{ marginTop: "18px", marginLeft: "15px" }}>
                                            {/* <Group
                                                LabelText="Order ID"
                                                value="OM12993455"
                                                className="myFont"
                                            /> */}
                                        </div>
                                        
                                    </div>
                                    <div>
                                        <div
                                            className="w-100 source_dest d-flex d-flex-apart"
                                            style={{ marginTop: "20px", marginBottom: "15px", width: '100px' }}
                                        >
                                            <div className="d-flex">
                                                <SourceIcon />
                                                {/* <Group LabelText="Source" value="CG01A2" /> */}
                                            </div>
                                            <div className="d-flex" style={{ marginRight: "30px" }}>
                                                <DestIcon />
                                                {/* <Group
                                                    LabelText="Destination"
                                                    value="DL02D1"
                                                    custom={true}
                                                /> */}
                                            </div>
                                        </div>
                                        <div className="box1">
                                            <table className="w-100" cellPadding="12px 25px">
                                                <thead className="HeadRow">
                                                    <tr>
                                                        <th>Model</th>
                                                        <th>Quantity CU</th>
                                                        <th>Quantity BU</th>
                                                        <th>Quantity VVPAT </th>
                                                    </tr>
                                                </thead>
                                                <tbody className="BodyRow">
                                                    {units_1.length > 0 &&
                                                        units_1.map((value) => (
                                                            <tr>
                                                                <td className="text-black text-sm">{value[0]}</td>
                                                                <td className="text-black text-sm">{value[1]}</td>
                                                                <td className="text-black text-sm">{value[2]}</td>
                                                                <td className="text-black text-sm">{value[3]}</td>
                                                            </tr>
                                                        ))}
                                                </tbody>
                                            </table>
                                        </div>
                                        
                                    </div>
                                    {addvehicle!=id &&<div className="flex justify-start"><button className="text-white mt-5" onClick={(e)=>AddVehicle(id)}>Add vehicle details</button></div>}
                                    {addvehicle==id  && <div className="box mt-10">
                                            <div className="flex SPAN w-full mb-10">
                                                <div className="w-1/3 mr-16">
                                                <div className="form_label text-left mb-1 ml-1" style={{ marginRight: "10px", color: "#F56A3F " }}>
                                                    <label htmlFor="">Vehicle Number:</label>
                                                </div>
                                                <div className="form_group ">
                                                    <div className="form_input INPUT">
                                                        <input
                                                            required
                                                            id={id}
                                                            type={"text"}
                                                            step="any"
                                                            name=""
                                                            className=""
                                                            placeholder="Vehicle Number"
                                                            onChange={(e) => {
                                                                setVehicleNumber(e)
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                                </div>
                                                <div className="w-1/3">
                                                <div className="form_label text-left ml-1 mb-1" style={{ marginRight: "10px", color: "#F56A3F " }}>
                                                    <label htmlFor="">Sender Incharge:</label>
                                                </div>
                                                <div className="form_group">
                                                    <div className="form_input INPUT">
                                                        <input
                                                            required
                                                            id="formSenderIncharge"
                                                            type={"text"}
                                                            step="any"
                                                            name=""
                                                            className=""
                                                            placeholder="Sender Incharge"
                                                            onChange={(e) => {
                                                                setSenderIncharge(e)
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                                </div>
                                            </div>
                                            <div className="flex SPAN w-full mb-10">
                                                <div className="w-1/3 mr-16">
                                                <div className="form_label text-left mb-1 ml-1" style={{ marginRight: "10px", color: "#F56A3F " }}>
                                                    <label htmlFor="">Driver Name:</label>
                                                </div>
                                                <div className="form_group ">
                                                    <div className="form_input INPUT">
                                                        <input
                                                            required
                                                            id={id}
                                                            type={"text"}
                                                            step="any"
                                                            name=""
                                                            className=""
                                                            placeholder="Driver Name"
                                                            onChange={(e) => {
                                                                setVehicleNumber(e)
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                                </div>
                                                <div className="w-1/3">
                                                <div className="form_label text-left ml-1 mb-1" style={{ marginRight: "10px", color: "#F56A3F " }}>
                                                    <label htmlFor="">Driver Contact:</label>
                                                </div>
                                                <div className="form_group">
                                                    <div className="form_input INPUT">
                                                        <input
                                                            required
                                                            id="formSenderIncharge"
                                                            type={"text"}
                                                            step="any"
                                                            name=""
                                                            className=""
                                                            placeholder="9060163599"
                                                            onChange={(e) => {
                                                                setSenderIncharge(e)
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                                </div>
                                            </div>
                                            <div className="flex SPAN w-full mb-10">
                                                <div className="w-1/3 mr-16">
                                                <div className="form_label text-left mb-1 ml-1" style={{ marginRight: "10px", color: "#F56A3F " }}>
                                                    <label htmlFor="">Escort Name:</label>
                                                </div>
                                                <div className="form_group ">
                                                    <div className="form_input INPUT">
                                                        <input
                                                            required
                                                            id={id}
                                                            type={"text"}
                                                            step="any"
                                                            name=""
                                                            className=""
                                                            placeholder="Escort Name"
                                                            onChange={(e) => {
                                                                setVehicleNumber(e)
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                                </div>
                                                <div className="w-1/3">
                                                <div className="form_label text-left ml-1 mb-1" style={{ marginRight: "10px", color: "#F56A3F " }}>
                                                    <label htmlFor="">Escort Contact:</label>
                                                </div>
                                                <div className="form_group">
                                                    <div className="form_input INPUT">
                                                        <input
                                                            required
                                                            id="formSenderIncharge"
                                                            type={"text"}
                                                            step="any"
                                                            name=""
                                                            className=""
                                                            placeholder="9060163599"
                                                            onChange={(e) => {
                                                                setSenderIncharge(e)
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                                </div>
                                            </div>
                                            
                                            
                                          
                                        </div>}

                                        {addvehicle==id && <div className="flex mt-5">
                                            <button className="text-white" onClick={(e)=>AddVehicle(id)}>Done</button>
                                            </div>}
                                </div>
                            ))}
                        <center>
                            <input type={"submit"} className="mySubmit">
                            </input>
                        </center>
                    </div>
                </div>
            </div>
            </div >
    );
}
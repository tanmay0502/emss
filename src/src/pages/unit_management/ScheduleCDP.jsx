import { DynamicDataTable } from '@langleyfoxall/react-dynamic-data-table'
import React, { useState } from 'react'
import styles from './styles/ScheduleCDP.module.css'
import { TagsInput } from "react-tag-input-component";
import { parse, stringify, toJSON, fromJSON } from 'flatted';

function ScheduleCDP() {


    const [Add_Temporary_Users, setAdd_Temporary_Users] = React.useState([]);
    const [CDP_Incharge, setCDP_Incharge] = React.useState([]);
    const [Process, setProcess] = React.useState([]);
    const [unittype, setUnitType] = React.useState([]);
    const [unitquantity, setUnitQuantity] = React.useState([]);
    const [Manufacturer, setManufacturer] = React.useState([]);
    const [Startdate, setStartDate] = React.useState([]);
    const [enddate, setEndDate] = React.useState([]);


    async function Submit_CDP() {

        try {
            const response = await fetch(
                `${process.env.REACT_APP_API_SERVER}/unit/schedule_cdp`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        CDPIncharge: document.getElementById("CDPIncharge") ? document.getElementById("CDPIncharge").value : "",
                        Process: document.getElementById("Process") ? document.getElementById("Process").value : "",
                        UnitQnty: document.getElementById("UnitQnty") ? document.getElementById("UnitQnty").value : "",
                        UnitType: document.getElementById("UnitType") ? document.getElementById("UnitType").value : "",
                        StartDate: document.getElementById("StartDate") ? document.getElementById("StartDate").value : "",
                        EndDate: document.getElementById("EndDate") ? document.getElementById("EndDate").value : "",
                        Manufacturer: document.getElementById("Manufacturer") ? document.getElementById("Manufacturer").value : "",
                        tempUsers: Add_Temporary_Users
                    }),
                }
            );

            const data3 = await response.json();
            console.log(data3, "data3")
            if (response.status === 200) {
                alert("Schedule CDP Created Successfully");
                window.location.pathname = "/session/unitmanagement/Schedule_List_CDP"
            } else {
                alert("Unable to Create Schedule CDP.");
            }

        } catch (err) {
            console.log(err);
        }

    }


    const onFormSubmit = async (e) => {
        e.preventDefault();
        Submit_CDP();
    };

    console.log(
        "CDPIncharge", document.getElementById("CDPIncharge") ? document.getElementById("CDPIncharge").value : "",
        "Process:", document.getElementById("Process") ? document.getElementById("Process").value : "",
        "UnitQnty:", document.getElementById("UnitQnty") ? document.getElementById("UnitQnty").value : "",
        "UnitType:", document.getElementById("UnitType") ? document.getElementById("UnitType").value : "",
        "StartDate:", document.getElementById("StartDate") ? document.getElementById("StartDate").value : "",
        " EndDate:", document.getElementById("EndDate") ? document.getElementById("EndDate").value : "",
        "Manufacturer", document.getElementById("Manufacturer") ? document.getElementById("Manufacturer").value : "",
        "engineers", Add_Temporary_Users
        , "Add_TEmporay_Users")

    return (
        <form onSubmit={onFormSubmit}>
            <div className={styles.Schedule_container}>
                <div className={styles.Schedule_header}>
                    <h4>
                        Schedule CDP
                    </h4>
                </div>

                <div class={styles.parent}>
                    <div class={styles.div1}>
                        <p> CDP Incharge</p>
                        <input
                            id="CDPIncharge"
                            type="text"
                            required
                            placeholder='Enter UserID'
                        >
                        </input>
                    </div>


                    <div class={styles.div2}>
                        <p> Process</p>
                        <select
                            id="Process"
                            required
                            className=" selectBox"
                        >
                            <option value="" selected>
                                Select
                            </option>
                            <option value="Commissioning"  >
                                Commissioning
                            </option>
                            <option value="Dispersal"  >
                                Dispersal
                            </option>
                            <option value="Polling"  >
                                Polling
                            </option>
                        </select>
                    </div>

                    <div class={styles.div3}>
                        <p> Unit Type</p>
                        <select
                            id="UnitType"
                            required
                            className=" selectBox"
                        >
                            <option value="" selected>
                                Select
                            </option>
                            <option value="BU" >
                                BU
                            </option>
                            <option value="CU" >
                                CU
                            </option>
                            <option value="VT" >
                                VT
                            </option>
                            <option value="SC" >
                                SC
                            </option>
                        </select>
                    </div>


                    <div class={styles.div4}>
                        <p> Unit Quantity</p>
                        <input
                            id="UnitQnty"
                            type="number"
                            required
                            className=" selectBox"
                            placeholder='Enter Number'
                        >
                        </input>
                    </div>


                    <div class={styles.div5}>
                        <p> Manufacturer</p>
                        <select
                            id="Manufacturer"
                            required
                            className=" selectBox"
                        >
                            <option value="" selected>
                                Select
                            </option>
                            <option value="ECIL" >
                                ECIL
                            </option>
                            <option value="BEL" >
                                BEL
                            </option>
                        </select>
                    </div>

                    <div class={styles.div6}>
                        <p> Start date</p>
                        <input
                            id="StartDate"
                            required
                            class={styles.dateInput}
                            type="date"
                            className=" selectBox"
                        ></input>
                    </div>

                    <div class={styles.div7}>
                        <p> End date</p>
                        <input
                            id="EndDate"
                            required
                            class={styles.dateInput}
                            type="date"
                            className=" selectBox"
                        ></input>
                    </div>

                    <div class={styles.div8}>
                        <p> Add Temporary Users</p>
                        <TagsInput
                            id="engineers"
                            required
                            value={Add_Temporary_Users}
                            onChange={setAdd_Temporary_Users}
                            placeHolder="WB00000CEO, AP00000DEO"
                        />

                    </div>

                </div>

            </div>
            <center><input type={"submit"} className={styles.mySubmit} ></input></center>
        </form>
    )
}

export default ScheduleCDP
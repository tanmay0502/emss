import { DynamicDataTable } from '@langleyfoxall/react-dynamic-data-table'
import React, { useState } from 'react'
import styles from './styles/ScheduleNew.module.css'
import { TagsInput } from "react-tag-input-component";

function PhysicalVerification() {


    const [Add_Temporary_Users, setAdd_Temporary_Users] = React.useState([]);


    async function Submit_EPV() {

        try {
            const response = await fetch(
                `${process.env.REACT_APP_API_SERVER}/unit/physical_verification_schedule`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({

                        WarehouseID: document.getElementById("WarehouseID") ? document.getElementById("WarehouseID").value : "",
                        Status: "Progress",
                        Startdate: document.getElementById("Startdate") ? document.getElementById("Startdate").value : "",
                        Enddate: document.getElementById("Enddate") ? document.getElementById("Enddate").value : "",
                        tempUsers: Add_Temporary_Users
                    }),
                }
            );

            const data3 = await response.json();
            console.log(data3, "data3")
            if (response.status === 200) {
                alert("Physical verification schedule Created Successfully");
                window.location.pathname = "/session/unitmanagement/schedule_verification_list"
            } else {
                alert("Unable to Create Physical verification schedule.");
            }

        } catch (err) {
            console.log(err);
        }

    }



    const onFormSubmit = async (e) => {
        e.preventDefault();
        Submit_EPV();
    };

    return (
        <form onSubmit={onFormSubmit}>
            <div className={styles.Schedule_container}>
                <div className={styles.Schedule_header}>
                    <h4>
                        Physical Verification
                    </h4>
                </div>
                <div class={styles.parent}>


                    <div class={styles.div1}>
                        <p> Warehouse ID</p>
                        <input
                            id="WarehouseID"
                            type="text"
                            required
                            placeholder='Enter Warehouse ID'
                        >
                        </input>
                    </div>



                    <div class={styles.div2}>
                        <p> Start date</p>
                        <input
                            id="Startdate"
                            required
                            class={styles.dateInput}
                            type="date"
                            className=" selectBox"
                        ></input>
                    </div>

                    <div class={styles.div3}>
                        <p> End date</p>
                        <input
                            id="Enddate"
                            required
                            class={styles.dateInput}
                            type="date"
                            className=" selectBox"
                        ></input>
                    </div>


                    <div class={styles.div4}>
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

            <center ><input type={"submit"} className={styles.mySubmit} style={{ marginTop: "2%" }} ></input></center>


        </form >
    )
}

export default PhysicalVerification
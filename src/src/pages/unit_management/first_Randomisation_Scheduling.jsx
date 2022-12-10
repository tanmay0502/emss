import { DynamicDataTable } from '@langleyfoxall/react-dynamic-data-table'
import React, { useState } from 'react'
import styles from './styles/first_Randomisation_Scheduling.module.css'
import { TagsInput } from "react-tag-input-component";

function First_Randomisation_Scheduling() {


    const [ceouserid, setceouserid] = useState('')
    const [deouserid, setdeouserid] = useState('')
    const [electiontype, setelectiontype] = useState('')
    const [startdate, setstartdate] = useState('')
    const [enddate, setenddate] = useState('')

    async function Submit_First_randomization() {

        var currentdate = new Date();
        var hrs = currentdate.getHours();
        var mins = currentdate.getMinutes();
        var secs = currentdate.getSeconds();

        if (hrs < 10) {
            hrs = "0" + hrs;

        }
        if (mins < 10) {
            mins = "0" + mins;
        }
        if (secs < 10) {
            secs = "0" + secs;
        }

        var time = hrs + ":"
            + mins + ":"
            + secs;

        console.log(time, document.getElementById("enddate") ? document.getElementById("enddate").value + " " + time : "")

        try {
            const response = await fetch(
                `${process.env.REACT_APP_API_SERVER}/unit/scheduleFirstRandomization`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        ceouserid: document.getElementById("ceouserid") ? document.getElementById("ceouserid").value : "",
                        deouserid: document.getElementById("deouserid") ? document.getElementById("deouserid").value : "",
                        electiontype: document.getElementById("electiontype") ? document.getElementById("electiontype").value : "",
                        startdate: document.getElementById("startdate") ? document.getElementById("startdate").value + " " + time : "",
                        enddate: document.getElementById("enddate") ? document.getElementById("enddate").value + " " + time : "",
                    }),
                }
            );

            const data3 = await response.json();
            console.log(data3, "data3")
            if (response.status === 200) {
                alert("Schedule First Randomization Created Successfully");
                window.location.pathname = "/session/unitmanagement"
            } else {
                alert("Unable to Create Schedule First Randomization.");
                document.getElementById("ceouserid").value = ""
                document.getElementById("deouserid").value = ""
                document.getElementById("electiontype").value = ""
                document.getElementById("startdate").value = ""
                document.getElementById("enddate").value = ""
            }

        } catch (err) {
            console.log(err);
        }

    }


    console.log(
        "ceouserid", document.getElementById("ceouserid") ? document.getElementById("ceouserid").value : "",
        "deouserid:", document.getElementById("deouserid") ? document.getElementById("deouserid").value : "",
        "electiontype:", document.getElementById("electiontype") ? document.getElementById("electiontype").value : "",
        "startdate:", document.getElementById("startdate") ? document.getElementById("startdate").value : "",
        "enddate:", document.getElementById("enddate") ? document.getElementById("enddate").value : "",
    )


    const onFormSubmit = async (e) => {
        e.preventDefault();
        Submit_First_randomization();
    };


    return (
        <form onSubmit={onFormSubmit}>
            <div className={styles.Schedule_container}>
                <div className={styles.Schedule_header}>
                    <h4>
                        Schedule First Randomisation
                    </h4>
                </div>

                <div class={styles.parent}>
                    <div class={styles.div1}>
                        <p> CEO User ID</p>
                        <input
                            id="ceouserid"
                            type="text"
                            required
                            placeholder='Enter CEO User ID'
                            onChange={(e) => { setceouserid(e) }}
                        >
                        </input>
                    </div>


                    <div class={styles.div2}>
                        <p> DEO User ID</p>
                        <input
                            id="deouserid"
                            type="text"
                            required
                            placeholder='Enter DEO User ID'
                            onChange={(e) => { setdeouserid(e) }}

                        >
                        </input>
                    </div>

                    <div class={styles.div3}>
                        <p> Election Type</p>
                        <input
                            id="electiontype"
                            type="text"
                            required
                            placeholder='Enter Election Type'
                            onChange={(e) => { setelectiontype(e) }}

                        >
                        </input>
                    </div>

                    <div class={styles.div4}>
                        <p> Start date</p>
                        <input
                            id="startdate"
                            required
                            class={styles.dateInput}
                            type="date"
                            className=" selectBox"
                            onChange={(e) => { setstartdate(e) }}

                        ></input>
                    </div>

                    <div class={styles.div5}>
                        <p> End date</p>
                        <input
                            id="enddate"
                            required
                            class={styles.dateInput}
                            type="date"
                            className="selectBox"
                            onChange={(e) => { setenddate(e) }}
                        ></input>
                    </div>

                </div>

            </div>
            <center><input type={"submit"} className={styles.mySubmit} ></input></center>
        </form>
    )
}

export default First_Randomisation_Scheduling
import { DynamicDataTable } from '@langleyfoxall/react-dynamic-data-table'
import React, { useState } from 'react'
import styles from './styles/second_Randomisation_Scheduling.module.css'
import { TagsInput } from "react-tag-input-component";

function Second_Randomisation_Scheduling() {


    const [ceouserid, setceouserid] = useState('')
    const [deouserid, setdeouserid] = useState('')
    const [electiontype, setelectiontype] = useState('')
    const [startdate, setstartdate] = useState('')
    const [enddate, setenddate] = useState('')
    const [accode, setaccode] = useState('')

    async function Submit_Second_randomization() {
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
                `${process.env.REACT_APP_API_SERVER}/unit/schedule-second-randomization`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        ascode: document.getElementById("ascode") ? document.getElementById("ascode").value : "",
                        electiontype: document.getElementById("electiontype") ? document.getElementById("electiontype").value : "",
                        startdate: document.getElementById("startdate") ? document.getElementById("startdate").value + " " + time : "",
                        enddate: document.getElementById("enddate") ? document.getElementById("enddate").value + " " + time : "",
                    }),
                }
            );

            const data3 = await response.json();
            console.log(data3, "data3")
            if (response.status === 200) {
                alert("Schedule Second Randomization Created Successfully");
                window.location.pathname = "/session/unitmanagement"
            } else {
                alert(data3.message);
                document.getElementById("ascode").value = ""
                document.getElementById("electiontype").value = ""
                document.getElementById("startdate").value = ""
                document.getElementById("enddate").value = ""
            }

        } catch (err) {
            console.log(err);
        }

    }


    console.log(
        "electiontype:", document.getElementById("electiontype") ? document.getElementById("electiontype").value : "",
        "startdate:", document.getElementById("startdate") ? document.getElementById("startdate").value : "",
        "enddate:", document.getElementById("enddate") ? document.getElementById("enddate").value : "",
    )


    const onFormSubmit = async (e) => {
        e.preventDefault();
        Submit_Second_randomization();
    };


    return (
        <form onSubmit={onFormSubmit}>
            <div className={styles.Schedule_container}>
                <div className={styles.Schedule_header}>
                    <h4>
                        Schedule Second Randomisation
                    </h4>
                </div>

                <div class={styles.parent}>


                    <div class={styles.div1}>
                        <p> AC Code</p>
                        <input
                            id="ascode"
                            type="text"
                            required
                            placeholder='Enter AC Code'
                            onChange={(e) => { setaccode(e) }}
                        >
                        </input>
                    </div>

                    <div class={styles.div2}>
                        <p> Election Type</p>
                        <select id="electiontype" onSelect={(e) => { setelectiontype(e)}}>
                            <option value="" >Select:</option>
                            <option value="A">Assembly-A</option>
                            <option value="L">Lok Sabha-L</option>
                            <option value="B">By elections-B</option>
                        </select>
                    </div>

                    <div class={styles.div3}>
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

                    <div class={styles.div4}>
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

export default Second_Randomisation_Scheduling

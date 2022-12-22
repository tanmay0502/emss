import React, { useState, useEffect } from 'react'
import { DynamicDataTable } from '@langleyfoxall/react-dynamic-data-table'
import styles from './styles/announce_flc.module.css'





function Announce_Flc() {

    var currentdate = new Date();
    var hrs = currentdate.getHours();
    var mins = currentdate.getMinutes();
    var secs = currentdate.getSeconds();
    const [District, setDistrict] = useState([])

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

    console.log(time)

    async function GetDistrict() {

        try {
            const response = await fetch(
                `${process.env.REACT_APP_API_SERVER}/user/getRealm`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: 'same-origin',
                }
            );

            const data = await response.json();
            console.log(data, "I am response");

            if (response.status == 200) {
                setDistrict(data['dist'])
            }

        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        GetDistrict();
    }, []);





    async function AnnounceFLC() {

        try {
            const response = await fetch(
                `${process.env.REACT_APP_API_SERVER}/unit/flc_announce`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: 'include',
                    body: JSON.stringify({

                        district: document.getElementById("1") ? document.getElementById("1").value : "",
                        ManufacturerName: document.getElementById("3") ? document.getElementById("3").value : "",
                        ManufacturerMobNo: document.getElementById("8") ? document.getElementById("8").value : "",
                        ManufacturerEmailID: document.getElementById("7") ? document.getElementById("7").value : "",
                        ECISupervisor: document.getElementById("4") ? document.getElementById("4").value : "",
                        TentativeYear: document.getElementById("2") ? document.getElementById("2").value : "",
                        TentativeMonth: document.getElementById("6") ? document.getElementById("6").value : "",
                        ElectionType: document.getElementById("5") ? document.getElementById("5").value : "",

                    }),
                }
            );
            const data = await response.json();

            if (response.status === 200) {
                document.getElementById("form").reset();
                alert("Successful");
                window.location.pathname = "/session/unitmanagement/flc_list";
            } else {
                alert("Failed!");
            }
        } catch (err) {
            console.log(err);
        }
    }

    const onFormSubmit = async (e) => {
        e.preventDefault();
        console.log("submit button clicked")
        AnnounceFLC();
    };



    return (
        <>
            <form onSubmit={onFormSubmit} id="form">
                <div className={styles.Schedule_container}>
                    <div className={styles.Schedule_header}>
                        <h4>
                            Announce FLC
                        </h4>
                    </div>

                    <div class={styles.parent}>

                        <div class={styles.div1}>
                            <p>FLC District</p>
                            <input
                                class={styles.input}
                                type="text"
                                id="1"
                                className="selectBox"
                                placeholder='Enter District'
                            ></input>
                            {/* <select
                                disabled={District.length == 0 ? true : false}
                                required
                                name=""
                                id="1"
                                className=" selectBox"
                            //   onChange={(e) => setRoleFunc(e.target.value)}
                            >
                                <option value="" disabled selected>
                                    Select District
                                </option>
                                {District.length > 0 && District.map((val) => (
                                    <option value={val} >
                                        {val}
                                    </option>
                                ))
                                }

                            </select> */}
                        </div>

                        <div class={styles.div2}>
                            <p>Tentative Year Of Election</p>
                            <input
                                class={styles.input}
                                type="number"
                                id="2"
                                className="selectBox"
                                placeholder='Enter Year'
                            ></input>

                        </div>


                        <div class={styles.div3}>
                            <p> Manufacturer </p>
                            <input
                                class={styles.input}
                                type="text"
                                id="3"
                                className="selectBox"
                                placeholder='Full Name'
                            ></input>

                        </div>

                        <div class={styles.div4}>
                            <p> Election Supervisor</p>
                            <input
                                class={styles.input}
                                type="text"
                                id="4"
                                className="selectBox"
                                placeholder='Full Name'
                            ></input>
                        </div>

                        <div class={styles.div5}>
                            <p> Type of election</p>
                            <select
                                //   required={!isTemporary}
                                required
                                name=""
                                id="5"
                                className=" selectBox"
                            //   onChange={(e) => setRoleFunc(e.target.value)}
                            >
                                <option value="" disabled selected>
                                    Select
                                </option>
                                <option value="A">
                                    Assembly-A
                                </option>
                                <option value="L">
                                    Lok Sabha-L
                                </option>
                                <option value="B">
                                    By elections
                                </option>
                            </select>
                        </div>

                        <div class={styles.div6}>
                            <p>Tentative month of election</p>
                            <select
                                required
                                name=""
                                id="6"
                                className=" selectBox"
                            //   onChange={(e) => setRoleFunc(e.target.value)}
                            >
                                <option value="" disabled selected>
                                    Select
                                </option>
                                <option value="January">
                                    January
                                </option>
                                <option value="February">
                                    February
                                </option>
                                <option value="March">
                                    March
                                </option>
                                <option value="April">
                                    April
                                </option>
                                <option value="May">
                                    May
                                </option>
                                <option value="June">
                                    June
                                </option>
                                <option value="July">
                                    July
                                </option>
                                <option value="August">
                                    August
                                </option>
                                <option value="September">
                                    September
                                </option>
                                <option value="October">
                                    October
                                </option>
                                <option value="November">
                                    November
                                </option>
                                <option value="December">
                                    December
                                </option>

                            </select>
                        </div>


                        <div class={styles.div7}>
                            <p>Manufacturer Email ID</p>
                            <input
                                class={styles.input}
                                type="email"
                                id="7"
                                className="selectBox"
                                placeholder='xyz@example.com'
                            ></input>
                        </div>

                        <div class={styles.div8}>
                            <p>Manufacturer Mobile No.</p>
                            <input
                                class={styles.input}
                                type="number"
                                id="8"
                                className="selectBox"
                                placeholder='Enter Number'
                            ></input>
                        </div>

                    </div>

                </div>
                <button class={styles.submitBtn} type={"submit"} > Submit </button>
            </form>
        </>
    )
}

export default Announce_Flc
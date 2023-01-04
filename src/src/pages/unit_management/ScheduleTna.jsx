import { DynamicDataTable } from '@langleyfoxall/react-dynamic-data-table'
import React, { useEffect, useState } from 'react'
import styles from './styles/ScheduleTNA.module.css'
import { TagsInput } from "react-tag-input-component";

function ScheduleTna() {

    const [tags, setTags] = React.useState([]);
    const [details, setDetails] = useState([])
    const [polling, setPolling] = useState([])

    const [countDef, setCountDef] = useState("")
    const [percDef, setPercDef] = useState("")
    const poll = 200



    const checkCount = () => {
        setCountDef(Math.ceil(polling / 10))
    }


    const checkPerc = () => {
        setPercDef((countDef / polling) * 100)
    }

    useEffect(() => {
        checkCount();
    }, [polling])

    useEffect(() => {
        checkPerc();
    }, [countDef])

    useEffect(() => {
        setCountDef(Math.ceil((percDef * polling) / 100));
    }, [percDef])

    async function getList() {

        try {
            const response = await fetch(
                `${process.env.REACT_APP_API_SERVER}/warehouse/listWarehouses`,
                {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                    }),
                })

            const data = await response.json();
            console.log(data);
            setDetails(data["data"])
            console.log(data["data"], "data")
        } catch (error) {
            console.log(error)
        }

    }
    async function getPoll() {

        try {
            const response = await fetch(
                `${process.env.REACT_APP_API_SERVER}/unit/countPolling`,
                {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                    }),
                })

            const data = await response.json();
            console.log(data);
            setPolling(data["data"][0])
            console.log(data["data"], "data")
        } catch (error) {
            console.log(error)
        }

    }

    useEffect(() => {
        getList();
        getPoll();
    }, [])
    useEffect(() => {
        console.log(details)
    }, [details])

    async function postTna() {

        try {
            const response = await fetch(
                `${process.env.REACT_APP_API_SERVER}/unit/trainingAwarenessSchedule`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: 'same-origin',
                    body: JSON.stringify({
                        sourceStrongRoom: document.getElementById("1").value,
                        destinationStrongRoom: document.getElementById("2").value,
                        awarnessUnits: document.getElementById("3").value,
                        personHandedOverToName: document.getElementById("4").value,
                        personHandedOverToMobNo: document.getElementById("5").value,
                        personHandedOverToDesignation: document.getElementById("6").value,
                        startDate: document.getElementById("7").value,
                        endDate: document.getElementById("8").value,
                        tempUsers: tags
                    }),
                }
            );


            console.log(response);
            const data = await response.json();
            console.log("data" + data);
            console.log("Message:" + data["message"])
            if (data["message"] === "Insertion successful") {
                document.getElementById("form").reset();
                alert("Successful");
                window.location.pathname = "/session/unitmanagement/schedule_tna_list";
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
        postTna();

    };

    return (
        <>
            <form onSubmit={onFormSubmit} id="form">
                <div className={styles.Schedule_container}>
                    <div className={styles.Schedule_header}>
                        <h4>
                            Schedule Training and Awareness
                        </h4>
                    </div>
                    <div class={styles.parent}>

                        <div class={styles.div1}>
                            <p>Source Strong Room</p>
                            <select
                                //   required={!isTemporary}
                                required
                                name=""
                                id="1"
                                className=" selectBox"
                            //   onChange={(e) => setRoleFunc(e.target.value)}
                            >
                                <option value="" disabled selected>
                                    Select Source Strong Room
                                </option>
                                {details && details.map(item => (
                                    <option value={item.warehouseid}>{item.warehouseid}</option>
                                ))}
                            </select>

                        </div>

                        <div class={styles.div3}>
                            <p>Destination Strong Room</p>
                            <select
                                //   required={!isTemporary}
                                required
                                name=""
                                id="2"
                                className=" selectBox"
                            //   onChange={(e) => setRoleFunc(e.target.value)}
                            >
                                <option value="" disabled selected>
                                    Select Destination Strong Room
                                </option>
                                {details && details.map(item => (
                                    <option value={item.warehouseid}>{item.warehouseid}</option>
                                ))}
                            </select>

                        </div>

                        <div class={styles.div2}>
                            <p> Number of Polling Stations:</p>
                            <input
                                class={styles.input}
                                type="number"
                                disabled={true}
                                value={polling}
                                // id="3"
                                className="selectBox"
                                placeholder='Fetching Number of Polling Stations'
                            ></input>

                        </div>


                        <div class={styles.div4}>
                            <h5>Awareness Units:</h5>
                        </div>


                        <div class={styles.div5}>
                            <input
                                class={styles.input}
                                type="number"
                                id="x"
                                className="selectBox"
                                value={percDef}
                                placeholder='Awareness Units in Percentage'
                                onChange={(e) => setPercDef(e.target.value)}
                            ></input>
                            <h5 className='pl-2 pt-2 flex items-center' >(%)</h5>
                        </div>


                        <div class={styles.div6}>

                            <input
                                class={styles.input}
                                type="number"
                                id="3"
                                className="selectBox"
                                value={countDef}
                                placeholder='Number of Awareness Units'
                                onChange={(e) => setCountDef(e.target.value)}
                            ></input>
                            <h5 className='pl-2 pt-2 flex items-center' >(Count)</h5>
                        </div>


                        <div class={styles.div10}>
                            <h4 className='pt-12'> Person Handed over to: </h4>

                        </div>


                        <div class={styles.div13}>
                            <p>Name</p>
                            <input
                                class={styles.input}
                                type="text"
                                id="4"
                                className="selectBox"
                                placeholder='Enter Name'
                            ></input>

                        </div>


                        <div class={styles.div14}>
                            <p>Mobile Number</p>
                            <input
                                class={styles.input}
                                type="number"
                                id="5"
                                className="selectBox"
                                placeholder='Enter Mobile Number'
                            ></input>

                        </div>


                        <div class={styles.div15}>
                            <p>Designation</p>
                            <input
                                class={styles.input}
                                type="text"
                                id="6"
                                className="selectBox"
                                placeholder='Enter Designation'
                            ></input>

                        </div>


                        <div class={styles.div16}>
                            <p>Start Date</p>
                            <input
                                class={styles.dateInput}
                                type="date"
                                id="7"
                                className=" selectBox"
                            ></input>


                        </div>


                        <div class={styles.div18}>
                            <p>End Date</p>
                            <input
                                class={styles.dateInput}
                                type="date"
                                id="8"
                                className=" selectBox"
                            ></input>

                        </div>


                        {/* <div class={styles.div19}>
                    <h5> Temporary Users:</h5>
                </div> */}
                        <div class={styles.div17}>
                            <p>Temporary Users</p>

                            <TagsInput
                                className='li_noti hide-scroll-bar tagInput'
                                value={tags}
                                id="formTags"
                                onChange={setTags}
                                placeHolder="SSPPAAARRR, SSPPAAARRR"
                            />

                        </div>

                    </div>

                </div>
                <button class={styles.submitBtn} type='submit'> Submit </button>
            </form>
        </>
    )
}

export default ScheduleTna
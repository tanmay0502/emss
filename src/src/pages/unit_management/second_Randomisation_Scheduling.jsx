import dist, { DynamicDataTable } from '@langleyfoxall/react-dynamic-data-table'
import React, { useEffect, useState } from 'react'
import styles from './styles/second_Randomisation_Scheduling.module.css'
import { TagsInput } from "react-tag-input-component";
import { Select } from 'antd';
import { getRealm, formatRealm, formatRealm2 } from '../../components/utils'

function Second_Randomisation_Scheduling() {
    const [ceouserid, setceouserid] = useState('')
    const [deouserid, setdeouserid] = useState('')
    const [electiontype, setelectiontype] = useState([])
    const [startdate, setstartdate] = useState('')
    const [enddate, setenddate] = useState('')
    const [stateCode, setStateCode] = useState('')
    const [districtCode, setDistrictCode] = useState('')
    const [ACCodes, setACCodes] = useState(new Set());

    const [districtList, setDistrictList] = useState([]);
    const [ACList, setACList] = useState([]);
    const [IsLoading, setIsLoading] = useState(0);
    const [realm, setRealm] = useState([]);
    const randomizationid = 6;

    useEffect(() => {
        getRealmData();
    }, [])

    const getRealmData = async () => {
        setRealm(await getRealm('Unit', 'ScheduleSecondRandomization'));
    }

    console.log(districtList, "districtlist")
    useEffect(() => {
        if (realm && realm !== []) {
            // console.log(formatRealm2(realm)[0])
            let stateVal = formatRealm2(realm)[0]
            if (stateVal) {
                let districts = formatRealm2(realm, stateVal['stCode'])
                setStateCode(stateVal['stCode'])
                setDistrictCode(districts[0]['dtCode'])
                setDistrictList(districts)
            }
        }
    }, [realm])

    useEffect(() => {
        if (stateCode !== '' && districtCode !== '') {
            setACList(formatRealm2(realm, stateCode, districtCode))
        }
    }, [districtCode])

    useEffect(() => {
        console.log(ACList, 'AClist')
    }, [ACList])


    async function fetch_election_list() {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_SERVER}/unit/listElections`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include"
            });
            const data = await response.json();
            if (response.status === 200) {
                setelectiontype(data, 'electiontype');
                console.log(data)
            }
        } catch (err) {
            alert('Error occured during scheduling');
        }
    }


    useEffect(
        () => {

            setIsLoading(1);

            let timer1 = setTimeout(() => fetch_election_list(), 1 * 1000);

            return () => {
                clearTimeout(timer1);
            };
        },
        [setIsLoading]
    );

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

        console.log({
            district: districtCode,
            acs: [...ACCodes],
            electionid: document.getElementById("electiontype") ? document.getElementById("electiontype").value : "",
            startdate: document.getElementById("startdate") ? document.getElementById("startdate").value + " " + time : "",
            enddate: document.getElementById("enddate") ? document.getElementById("enddate").value + " " + time : "",
            supplementary: document.getElementById("supplementary") ? document.getElementById("supplementary").value : "f",
        })
        try {
            const response = await fetch(
                `${process.env.REACT_APP_API_SERVER}/unit/schedule-second-randomization`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        district: districtCode,
                        acs: [...ACCodes],
                        electionid: document.getElementById("electiontype") ? document.getElementById("electiontype").value : "",
                        startdate: document.getElementById("startdate") ? document.getElementById("startdate").value + " " + time : "",
                        enddate: document.getElementById("enddate") ? document.getElementById("enddate").value + " " + time : "",
                        supplementary: document.getElementById("supplementary") ? document.getElementById("supplementary").value : "f",
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

    const onFormSubmit = async (e) => {
        e.preventDefault();
        // console.log(ACCodes)
        if (ACCodes.size > 0) {
            Submit_Second_randomization();
        }
        else {
            alert('Please select atleast One Assembly Segment!')
        }
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
                        <p>District Code</p>
                        <select
                            id="districtCode"
                            type="text"
                            required
                            placeholder='Enter District Code'
                            value={districtCode}
                            onChange={(e) => { setDistrictCode(e.target.value) }}
                        >
                            {''}
                            <option hidden>select</option>
                            {
                                districtList.map((val) => {
                                    return (
                                        <option value={val['dtCode']}>
                                            {val['dtCode']}&nbsp;({val['dtName']})
                                        </option>
                                    )
                                })
                            }
                        </select>
                    </div>

                    <div class={styles.div2}>
                        <p> Election </p>
                        <select id="electiontype"
                            type="text"
                            required
                            placeholder='Select Election'
                        >
                            {''}
                            <option hidden>select</option>
                            {
                                electiontype.map((val) => {
                                    return (
                                        <option value={val['election_id']}>
                                            {val['electiontype']}&nbsp;({val['startdate']})
                                        </option>
                                    )
                                })
                            }
                        </select>
                    </div>

                    <div class={styles.div6}>
                        <p> Supplementary? </p>
                        <select id="supplementary">
                            <option value="f">No</option>
                            <option value="t">Yes</option>
                        </select>
                    </div>
                    <div class={styles.div3}>
                        <p>Start date</p>
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
                        <p>End date</p>
                        <input
                            id="enddate"
                            required
                            class={styles.dateInput}
                            type="date"
                            className="selectBox"
                            onChange={(e) => { setenddate(e) }}
                        ></input>
                    </div>

                    <div className={styles.div5}>
                        {districtCode && districtCode === '' ?
                            <h3>Select a District to display ACs.</h3>
                            :
                            <DynamicDataTable
                                renderCheckboxes={true}
                                renderMasterCheckbox={false}
                                isCheckboxChecked={({ acCode }) => ACCodes.has(acCode)}
                                onMasterCheckboxChange={(_, rows) => {
                                    let all = true

                                    rows.forEach(({ id }) => {
                                        if (!all) {
                                            return;
                                        }
                                        if (!ACCodes.has(id)) {
                                            all = false
                                        }
                                    })

                                    rows.forEach(({ id }) => {
                                        var tmp = new Set(ACCodes)
                                        if (all) {
                                            tmp.delete(id)
                                        } else if (!tmp.has(id)) {
                                            tmp.add(id)
                                        }
                                        setACCodes(tmp)
                                    })
                                }}
                                onCheckboxChange={(_, { acCode }) => {
                                    var tmp = new Set(ACCodes)
                                    if (ACCodes.has(acCode)) {
                                        tmp.delete(acCode)
                                    } else {
                                        tmp.add(acCode)
                                    }
                                    setACCodes(tmp)
                                }}

                                rows={ACList}
                                buttons={[]}
                                fieldMap={
                                    {
                                        'acCode': 'AC Code',
                                        'acName': 'AC Name'
                                    }
                                }
                            />
                        }
                    </div>

                </div>



            </div>
            <center><input type={"submit"} className={styles.mySubmit} ></input></center>
        </form>
    )
}

export default Second_Randomisation_Scheduling

import dist, { DynamicDataTable } from '@langleyfoxall/react-dynamic-data-table'
import React, { useState, useEffect } from 'react'
import styles from './styles/ScheduleCDP.module.css'
import { TagsInput } from "react-tag-input-component";
import { AiOutlineClose } from "react-icons/ai"
import { formatRealm2, getRealm } from "../../components/utils"

function ScheduleCDP() {


    const [tags, setTags] = React.useState([]);
    const [listElections, setListElections] = useState([])
    const [Type_of_election, setType_of_election] = useState('');
    const [Type_of_election_sf, setType_of_election_sf] = useState('');
    const [electionid, setelectionid] = useState(-1)
    const [District, setDistrict] = useState([])
    const [ACList, setACList] = useState([])
    const [CDPIncharge, setCDPIncharge] = useState('');
    const [Process, setprocess] = useState('CDP');
    const [ac, setac] = useState('');
    const [numberofengineer, setnumberofengineer] = useState('')
    const [cuCount, setcuCount] = useState('');
    const [buCount, setbuCount] = useState('');
    const [vtcount, setvtcount] = useState('');
    const [StartDate, setStartDate] = useState('');
    const [EndDate, setEndDate] = useState('');
    const [manufacture, setmanufacture] = useState('')
    const userID = sessionStorage.getItem("sessionToken");
    const [currState, setCurrState] = useState(userID.slice(0, 2));
    const User_ID = sessionStorage.getItem("sessionToken");
    const Role = User_ID.substring(8)

    console.log({
        "CDPIncharge": CDPIncharge,
        "Process": Process,
        "cuCount": cuCount,
        "buCount": buCount,
        "vtcount": vtcount,
        "StartDate": StartDate,
        "EndDate": EndDate,
        "Manufacturer": manufacture,
        "ac": ac,
        "electionID": electionid,
        "tempUsers": tags
    })




    async function getListElections() {

        try {
            const response = await fetch(
                `${process.env.REACT_APP_API_SERVER}/unit/listElections`,
                {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
            const data = await response.json();
            if (data.length) {
                setListElections(data)
            }
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(
        () => {
            let timer1 = setTimeout(() => getListElections(), 1 * 1000);

            return () => {
                clearTimeout(timer1);
            };
        },
        []
    );


    async function getDistrictsList() {
        try {
            const response = await fetch(
                `${process.env.REACT_APP_API_SERVER}/user/getRealm`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: 'include',
                    body: JSON.stringify({
                        "module_name": "Unit",
                        "operation": "ScheduleCDP"
                    }),
                }
            )

            const data = await response.json();
            console.log(data)
            if (response.status === 200) {
                setDistrict(data['data']);
            }
        } catch (error) {
            console.log(error)
        }
    }

    console.log(District)


    useEffect(
        () => {
            let timer1 = setTimeout(() => getDistrictsList(), 1 * 1000);

            return () => {
                clearTimeout(timer1);
            };
        },
        []
    );

    useEffect(() => {
        if (currState && currState !== "") {
            setACList(formatRealm2(District, currState))
        }

    }, [currState, District]);




    const handleInputChange = (e) => {
        setelectionid(Number(listElections[e.target.value]['election_id']));
    };

    useEffect(
        () => {
            if (Role == 'RO') {
                if (District.length)
                    setac(District[0][2][0])
            }
        },
        [District]
    );




    async function CDPSchedule() {
        if (electionid !== -1) {

            try {
                const response = await fetch(
                    `${process.env.REACT_APP_API_SERVER}/unit/schedule_cdp`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        credentials: 'include',
                        body: JSON.stringify({
                            "CDPIncharge": CDPIncharge,
                            "Process": Process,
                            "cuCount": cuCount,
                            "buCount": buCount,
                            "vtcount": vtcount,
                            "StartDate": StartDate,
                            "EndDate": EndDate,
                            "Manufacturer": manufacture,
                            "numengineers": numberofengineer,
                            "ac": ac,
                            "electionID": electionid,
                            "tempUsers": tags
                        }),
                    }
                );

                const data = await response.json();
                if (response.status === 200) {
                    document.getElementById("form").reset();
                    alert(data.message);
                    window.location.pathname = "/session/unitmanagement/Schedule_List_CDP";
                } else {
                    document.getElementById("form").reset();
                    setelectionid(-1);
                    setTags([]);
                    setCDPIncharge('');
                    setcuCount('');
                    setbuCount('');
                    setvtcount('');
                    setEndDate('');
                    setStartDate('');
                    setac('');
                    setmanufacture('');
                }
            } catch (err) {
                console.log(err);
            }
        }


    }

    console.log(ACList)


    const onFormSubmit = async (e) => {
        e.preventDefault();
        CDPSchedule();
    };


    return (
        <form onSubmit={onFormSubmit} id="form">
            <div className='m-auto flex justify-center gap-5 w-96'><h5 className='self-center'>Select Election</h5>
                <div className='w-48'>
                    <select
                        required
                        name="electionid"
                        onChange={(e) => handleInputChange(e)}
                    // value={electionid}
                    >
                        {" "}
                        <option hidden>Select</option>
                        {listElections &&
                            listElections.map((val, ind) => {
                                return (<>
                                    <option value={ind}>{`${val.electiontype} ${val.startdate ? val.startdate.slice(6, 11) : ''}`}</option>
                                </>)
                            })}
                    </select>
                </div>
            </div>

            <div className={styles.Schedule_container}>
                <div className={styles.Schedule_header}>
                    <h4>
                        Schedule CDP
                    </h4>
                </div>

                <div class={styles.parent}>
                    <div class={styles.div1}>
                        <p> AC</p>{Role == 'PCRO' ?

                            <select
                                disabled={electionid !== -1 ? false : true}
                                required
                                name=""
                                id="ac"
                                placeholder='Select AC'
                                value={ac}
                                onChange={(e) => { setac(e.target.value) }}
                            >
                                <option value="" hidden >
                                    Select
                                </option>
                                {District.length > 0 && District.map((val, ind) => (
                                    <option value={val[2][0]} >
                                        {val[2][1]}
                                    </option>
                                ))
                                }
                            </select> : ((Role == 'RO') ?
                                <input
                                    disabled={true}
                                    type="text"
                                    required
                                    name=""
                                    id="incharge"
                                    placeholder='Enter UserID'
                                    value={District.length ? District[0][2][1] : ''}
                                    onChange={(e) => { setac(e.target.value) }}
                                >
                                </input> : '')
                        }
                    </div>

                    <div class={styles.div2}>
                        <p> CDP Incharge</p>
                        <input
                            disabled={electionid !== -1 ? false : true}
                            type="text"
                            required
                            name=""
                            id="incharge"
                            placeholder='Enter UserID'
                            value={CDPIncharge}
                            onChange={(e) => { setCDPIncharge(e.target.value) }}
                        >
                        </input>
                    </div>


                    <div class={styles.div3}>
                        <p> Process</p>
                        <select
                            type='text'
                            required
                            name=""
                            id="process"
                            className=" selectBox"
                            value={Process}
                            onChange={(e) => { setprocess(e.target.value) }}
                        >
                            <option hidden>Select</option>
                            <option>Commissioning</option>
                            <option>Dispersal</option>
                            <option>Polling</option>
                        </select>
                    </div>

                    <div class={styles.div4}>
                        <p> BU</p>
                        <input
                            disabled={electionid !== -1 ? false : true}
                            type="number"
                            required
                            name=""
                            id="bu"
                            placeholder='Enter Number'
                            value={buCount}
                            onChange={(e) => { setbuCount(e.target.value) }}
                        >
                        </input>
                    </div>


                    <div class={styles.div5}>
                        <p> CU</p>
                        <input
                            disabled={electionid !== -1 ? false : true}
                            type="number"
                            required
                            name=""
                            id="cu"
                            placeholder='Enter Number'
                            value={cuCount}
                            onChange={(e) => { setcuCount(e.target.value) }}
                        >
                        </input>

                    </div>
                    <div class={styles.div6}>
                        <p> VVPAT</p>
                        <input
                            disabled={electionid !== -1 ? false : true}
                            type="number"
                            required
                            name=""
                            id="vvpat"
                            placeholder='Enter Number'
                            value={vtcount}
                            onChange={(e) => { setvtcount(e.target.value) }}
                        >
                        </input>
                    </div>

                    <div class={styles.div7}>
                        <p> Manufacturer</p>
                        <select
                            disabled={electionid !== -1 ? false : true}
                            required
                            name=""
                            id="manufacturer"
                            className=" selectBox"
                            value={manufacture}
                            onChange={(e) => { setmanufacture(e.target.value) }}
                        >
                            {" "}
                            <option hidden>Select</option>
                            {["BEL", "ECIL"].map((val) => {
                                return <option value={val}>{val}</option>
                            })}
                        </select>
                    </div>

                    <div class={styles.div8}>
                        <p> Start date</p>
                        <input
                            disabled={electionid !== -1 ? false : true}
                            class={styles.dateInput}
                            type="date"
                            id='startdate'
                            value={StartDate}
                            onChange={(e) => { setStartDate(e.target.value) }}
                        ></input>
                    </div>
                    <div class={styles.div9}>
                        <p> End date</p>
                        <input
                            disabled={electionid !== -1 ? false : true}
                            class={styles.dateInput}
                            type="date"
                            id='enddate'
                            value={EndDate}
                            onChange={(e) => { setEndDate(e.target.value) }}
                        ></input>
                    </div>

                    <div class={styles.div10}>
                        <p>Number Of Engineer</p>
                        <input
                            disabled={electionid !== -1 ? false : true}
                            type="number"
                            required
                            name=""
                            id="numberofengineer"
                            placeholder='Enter Number'
                            value={numberofengineer}
                            onChange={(e) => { setnumberofengineer(e.target.value) }}
                        ></input>
                    </div>

                    <div class={styles.div11}>
                        <p> Add Temporary Users</p>
                        <TagsInput
                            disabled={electionid !== -1 ? false : true}
                            className='li_noti hide-scroll-bar tagInput p-2'
                            value={tags}
                            id="formTags"
                            onChange={setTags}
                            placeHolder="WB00000CEO, AP00000DEO"
                        />

                    </div>

                </div>

            </div>
            <button class={styles.submitBtn} type={"submit"} > Submit </button>
        </form >
    )
}

export default ScheduleCDP
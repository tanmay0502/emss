import React, { useState, useEffect } from 'react'
import styles from './styles/ScheduleCDP_edit.module.css'
import { ReactComponent as SearchInputElement } from '../../assets/searchInputIcon.svg';
import DynamicDataTable from "@langleyfoxall/react-dynamic-data-table";
import UserImageTest from '../../assets/UserImageTest.png'
import { TagsInput } from "react-tag-input-component";

function ScheduleCDP_edit() {


    const [edit, setEdit] = useState('')
    const [ACList, setACList] = useState([])
    const [CDPIncharge, setCDPIncharge] = useState('');
    const [Process, setprocess] = useState('CDP');
    const [ac, setac] = useState('');
    const [cuCount, setcuCount] = useState('');
    const [buCount, setbuCount] = useState('');
    const [vtcount, setvtcount] = useState('');
    const [manufacture, setmanufacture] = useState('')
    const [numberofengineer, setnumberofengineer] = useState('')
    const [IsLoading, setIsLoading] = useState(0);
    const [startdate, setstartdate] = useState('')
    const [startdateshow, setstartdateshow] = useState('')
    const [enddate, setenddate] = useState('')
    const [isEdit_Assigned_Engineer, setEdit_Assigned_Engineer] = React.useState(-1);
    const [isEdit_Temporary_Users, setEdit_Temporary_Users] = React.useState(-1);
    const [tags, setTags] = React.useState([]);
    const [listtags, setlisttags] = React.useState([]);
    const User_ID = sessionStorage.getItem("sessionToken");
    const Role = User_ID.substring(8)

    const issueId = () => {
        const URL = window.location.href;
        const arr = URL.split("/");
        const param = arr[arr.length - 1];
        const arr1 = param.split("=");
        return arr1[0];
    }


    async function getcdp() {
        let id = issueId();
        try {
            const response = await fetch(
                `${process.env.REACT_APP_API_SERVER}/unit/viewCDP`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: 'include',
                    body: JSON.stringify(
                        {
                            "CDPID": Number(id)
                        }
                    )
                }
            );


            const data = await response.json();
            console.log(data['data'], "viewcdp")
            if (response.status === 200) {
                if (data['data'].length) {
                    setmanufacture((data['data'][0]['manufacturer'] !== null) ? data['data'][0]['manufacturer'] : '');
                    setCDPIncharge((data['data'][0]['cdpincharge'] !== null) ? data['data'][0]['cdpincharge'] : '');
                    setprocess((data['data'][0]['process'] !== null) ? data['data'][0]['process'] : '');
                    setac((data['data'][0]['acName'] !== null) ? data['data'][0]['acName'] : '')
                    setbuCount((data['data'][0]['bucount'] !== null) ? data['data'][0]['bucount'] : '')
                    setcuCount((data['data'][0]['cucount'] !== null) ? data['data'][0]['cucount'] : '')
                    setvtcount((data['data'][0]['vtcount'] !== null) ? data['data'][0]['vtcount'] : '')
                    setstartdate(data['data'][0]['startdate'] ? data['data'][0]['startdate'].split('T')[0] : '')
                    setenddate(data['data'][0]['enddate'] ? data['data'][0]['enddate'].split('T')[0] : '')
                    setlisttags(data['data'][0]['temporaryUsers'] ? data['data'][0]['temporaryUsers'] : '')
                    setnumberofengineer(data['data'][0]['numengineers'] !== null ? data['data'][0]['numengineers'] : '0')
                }
            }

        } catch (err) {
            console.log({ err });
        }
    }

    console.log(listtags, 'listtags', tags, 'tags')

    useEffect(
        () => {

            setIsLoading(1);
            let timer1 = setTimeout(() => getcdp(), 1 * 1000);

            return () => {
                clearTimeout(timer1);
            };
        },

        []
    );


    useEffect(
        () => {
            if (listtags) {
                for (let k = 0; k < listtags.length; k++) {
                    if (!tags.includes(listtags[k][0]))
                        setTags((prev) => {
                            let kk = [...prev]
                            kk.push(listtags[k][0])
                            return kk;
                        })
                }
            }
        },

        [listtags]
    );


    console.log(tags, "tags")
    async function FinalSubmit() {
        let id = issueId();
        try {
            const response = await fetch(
                `${process.env.REACT_APP_API_SERVER}/unit/edit_cdp_schedule`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: 'include',
                    body: JSON.stringify(
                        {
                            "CDPID": Number(id),
                            "CDPIncharge": CDPIncharge,
                            "Process": Process,
                            "cuCount": cuCount,
                            "buCount": buCount,
                            "vtcount": vtcount,
                            "StartDate": startdate,
                            "EndDate": enddate,
                            "Manufacturer": manufacture,
                            "numengineers": numberofengineer,
                            "tempUsers": tags
                        }
                    )
                }
            );


            const data = await response.json();
            console.log(data['data'], "viewcdp")
            if (response.status === 200) {
                alert(data.message);
                window.location.pathname = "/session/unitmanagement/Schedule_List_CDP";
            }

        } catch (err) {
            console.log({ err });
        }
    }

    const onFormSubmit = async (e) => {

        e.preventDefault();
        if (Role === 'RO' || Role == 'PCRO')
            FinalSubmit();
    };

    return (
        <>
            {(Role === 'RO' || Role == 'PCRO') && edit === '' &&
                <button className="text-white mb-4 flex"
                    onClick={() => { setEdit(Role) }}
                >
                    Edit CDP Schedule
                </button>
            }

            <form className="p-3" onSubmit={onFormSubmit}>
                <div class={styles.Schedule_container1}>
                    <div class={styles.Schedule_header1}>
                        <h4>
                            Schedule CDP
                        </h4>
                    </div>

                    <div class={styles.parent1}>
                        <div class={styles.div1}>
                            <p> AC</p>
                            <input
                                disabled
                                type="text"
                                required
                                name=""
                                id="incharge"
                                placeholder='Select AC'
                                value={ac}
                                onChange={(e) => { setac(e.target.value) }}
                            >
                            </input>
                        </div>

                        <div class={styles.div2}>
                            <p> CDP Incharge</p>
                            <input
                                disabled={(edit == 'RO' || edit == 'PCRO') ? false : true}
                                type="text"
                                required
                                name=""
                                id="formLevel"
                                placeholder='Enter UserID'
                                value={CDPIncharge}
                                onChange={(e) => {
                                    setCDPIncharge(e.target.value)
                                }}
                            >
                            </input>
                        </div>

                        <div class={styles.div3}>
                            <p> Process</p>
                            <select
                                disabled={(edit == 'RO' || edit == 'PCRO') ? false : true}
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
                                disabled={(edit == 'RO' || edit == 'PCRO') ? false : true}
                                type="number"
                                className={styles.numberdiv}
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
                                disabled={(edit == 'RO' || edit == 'PCRO') ? false : true}
                                className={styles.numberdiv}
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
                                disabled={(edit == 'RO' || edit == 'PCRO') ? false : true}
                                className={styles.numberdiv}
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
                                disabled={(edit == 'RO' || edit == 'PCRO') ? false : true}
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
                                required
                                disabled={(edit == 'RO' || edit == 'PCRO') ? false : true}
                                class={styles.dateInput}
                                type="date"
                                id='startdate'
                                value={startdate}
                                onChange={(e) => { setstartdate(e.target.value) }}
                            ></input>
                        </div>

                        <div class={styles.div9}>
                            <p> End date</p>
                            <input
                                required
                                disabled={(edit == 'RO' || edit == 'PCRO') ? false : true}
                                class={styles.dateInput}
                                type="date"
                                id='enddate'
                                value={enddate}
                                onChange={(e) => { setenddate(e.target.value) }}
                            ></input>
                        </div>

                        <div class={styles.div10}>
                            <p> Number Of Engineer</p>
                            <input
                                disabled={(edit == 'RO' || edit == 'PCRO') ? false : true}
                                className={styles.numberdiv}
                                type="number"
                                required
                                name=""
                                id="numberofengineer"
                                placeholder='Enter Number'
                                value={numberofengineer}
                                onChange={(e) => { setnumberofengineer(e.target.value) }}
                            >
                            </input>
                        </div>
                        <div class={styles.div11}>
                            <p> Add Temporary Users</p>
                            <TagsInput
                                disabled={(edit == 'RO' || edit == 'PCRO') ? false : true}
                                className='li_noti hide-scroll-bar tagInput p-2'
                                value={tags}
                                id="formTags"
                                onChange={setTags}
                                placeHolder="WB00000CEO, AP00000DEO"
                            />

                        </div>


                    </div>
                </div>
                {edit != '' ? <button class={styles.submitBtn1} type='submit' > Submit </button> : ''}
            </form >
        </>
    )
}

export default ScheduleCDP_edit

{/* <tr onClick={(e) => FillCapacity(id)}> */ }
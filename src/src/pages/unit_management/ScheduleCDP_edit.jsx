import React, { useState, useEffect } from 'react'
import styles from './styles/ScheduleCDP_edit.module.css'
import { ReactComponent as SearchInputElement } from '../../assets/searchInputIcon.svg';
import DynamicDataTable from "@langleyfoxall/react-dynamic-data-table";
import UserImageTest from '../../assets/UserImageTest.png'


function ScheduleCDP_edit() {


    const row11 = {
        'Name': 'Jane Cooper',
        'Mobile': '8845244243',
        "EmailID": 'abc@gmail.com',
        '': <div className="flex justify-end " style={{ marginLeft: "3%" }}><button type="button" className="text-white bg-orange-600 p-1 text-2xl w-8 h-8 -mt-4 " style={{ borderRadius: "50%", marginTop: "2%" }} >-</button></div>
    }

    const row12 = {
        'Name': 'Jane Cooper',
        'Mobile': '8845244243',
        "EmailID": 'abc@gmail.com',
        '': <div className="flex justify-end " style={{ marginLeft: "3%" }}><button type="button" className="text-white bg-orange-600 p-1 text-2xl w-8 h-8 -mt-4 " style={{ borderRadius: "50%", marginTop: "2%" }} >-</button></div>
    }


    const row21 = {
        'User_ID': 'MH00000CEO',
        "": <div style={{ display: "flex", flexDirection: "row", alignItems: "right", justifyContent: "flex-start", paddingLeft: "40px" }}><img src={UserImageTest} /></div>,
        'Name': 'Jane Cooper',
        ' ': <div className="flex justify-end " style={{ marginLeft: "3%" }}><button type="button" className="text-white bg-orange-600 p-1 text-2xl w-8 h-8 -mt-4 " style={{ borderRadius: "50%", marginTop: "2%" }}>-</button></div>

    }

    const row22 = {
        'User_ID': 'MH00000CEO',
        "": <div style={{ display: "flex", flexDirection: "row", alignItems: "right", justifyContent: "flex-start", paddingLeft: "40px" }}><img src={UserImageTest} /></div>,
        'Name': 'Jane Cooper',
        ' ': <div className="flex justify-end " style={{ marginLeft: "3%" }}><button type="button" className="text-white bg-orange-600 p-1 text-2xl w-8 h-8 -mt-4 " style={{ borderRadius: "50%", marginTop: "2%" }}>-</button></div>

    }


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
    const [enddateshow, setenddateshow] = useState('')
    const data1 = [row11, row12];
    const data2 = [row21, row22];
    const [tableFilter, setTableFilter] = useState("");
    const [rows_Assigned_Engineer, setRows_Assigned_Engineer] = useState([...data1]);
    const [rows_Temporary_Users, setRows_Temporary_Users] = useState([...data2]);
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
                        setTags([...tags, listtags[k][0]])
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

    console.log({
        "CDPIncharge": CDPIncharge,
        "Process": Process,
        "cuCount": cuCount,
        "buCount": buCount,
        "vtcount": vtcount,
        "StartDate": startdate,
        "EndDate": enddate,
        "Manufacturer": manufacture,
        "tempUsers": tags
    })

    const onFormSubmit = async (e) => {

        e.preventDefault();
        if (Role === 'RO' || Role == 'PCRO')
            FinalSubmit();
    };


    const handleRemoveClick_Temporary_Users = (i) => {
        if (window.confirm(`Are you sure you want to delete from temporary Users table?`)) {
            const list = [...rows_Temporary_Users];
            list.splice(i, 1);
            setRows_Temporary_Users(list);

        }
    };


    const handleAdd_Temporary_Users = () => {
        setRows_Temporary_Users([
            ...rows_Temporary_Users,
            {
                User_ID: "",
                "": <div style={{ display: "flex", flexDirection: "row", alignItems: "right", justifyContent: "flex-start", paddingLeft: "40px" }}><img src={UserImageTest} /></div>,
                Name: "",
                " ": <div className="flex justify-end " style={{ marginLeft: "3%" }}><button type="button" className="text-white bg-orange-600 p-1 text-2xl w-8 h-8 -mt-4 " style={{ borderRadius: "50%", marginTop: "2%" }} >-</button></div>
            },
        ]);
        setEdit_Temporary_Users(rows_Temporary_Users.length);
    };


    const handleInputChange_Temporary_Users = (e, index) => {
        const { name, value } = e.target;
        const list = [...rows_Temporary_Users];
        list[index][name] = value;
        setRows_Temporary_Users(list);
    };



    const handleEdit_Temporary_Users = (i) => {
        setEdit_Temporary_Users(i);
    };


    return (
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

                </div>

            </div>

            <div class={styles.parent2}>
                <div class={styles.Schedule_container2}>
                    <div class={styles.Schedule_header2}>
                        <h4>
                            Temporary Users
                        </h4>
                        <div style={{ display: "flex", "flexDirection": "row", alignItems: "center", justifyContent: "center", background: "#F9FBFF", borderRadius: "10px", padding: "7.5px 15px 7.5px 0", fontSize: "0.8em" }}>
                            <SearchInputElement style={{ margin: "0 7.5px", width: "20px" }} />
                            <input type={'search'} defaultValue={tableFilter} onChange={(e) => { setTableFilter(e.target.value) }} placeholder='Search' style={{ outline: "none", background: "transparent" }} />
                        </div>
                    </div>
                    <div class={styles.Schedule_CDP_table}>
                        {/* <DynamicDataTable rows={data2} buttons={[]} /> */}
                        <table >
                            <thead >
                                <tr>
                                    <th style={{ color: "#f56a3f", padding: "20px" }}>User ID</th>
                                    <th style={{ color: "#f56a3f", padding: "20px" }}></th>
                                    <th style={{ color: "#f56a3f", padding: "20px" }}>Name</th>
                                    <th style={{ color: "#f56a3f", padding: "20px" }}></th>
                                </tr>
                            </thead>
                            {rows_Temporary_Users.length > 0 &&
                                rows_Temporary_Users.map((val, id) => {
                                    return (isEdit_Temporary_Users != id ?
                                        <tbody >
                                            <tr onDoubleClick={() => { handleEdit_Temporary_Users(id) }}>
                                                <td className="text-black text-sm">{val['User_ID']}</td>
                                                <td className="text-black text-sm">{val['']}</td>
                                                <td className="text-black text-sm">{val['Name']}</td>
                                                <td className="text-black text-sm" onClick={() => handleRemoveClick_Temporary_Users(id)}>{val[' ']}</td>
                                            </tr>
                                        </tbody>
                                        :
                                        <tbody >
                                            <tr onDoubleClick={() => { handleEdit_Temporary_Users(-1) }}>
                                                <td >
                                                    <input
                                                        className={styles.Assigned_Engineer_Tr}
                                                        value={val.User_ID}
                                                        name="User_ID"
                                                        placeholder="User ID"
                                                        onChange={(e) => handleInputChange_Temporary_Users(e, id)}
                                                    />
                                                </td >
                                                <td className="text-black text-sm" >{val['']}</td>
                                                <td >
                                                    <input
                                                        className={styles.Assigned_Engineer_Tr}
                                                        value={val.Name}
                                                        placeholder="Name"
                                                        name="Name"
                                                        onChange={(e) => handleInputChange_Temporary_Users(e, id)}
                                                    />
                                                </td>
                                                <td className="text-black text-sm" onClick={() => handleRemoveClick_Temporary_Users(id)}>{val[' ']}</td>
                                            </tr>
                                        </tbody>
                                    )
                                })}
                        </table>
                    </div>
                    <button type="button" className="text-white bg-orange-600 p-1 text-2xl w-8 h-8 -mt-4 " style={{ borderRadius: "50%", marginLeft: "85%", marginTop: "1%" }} onClick={() => { handleAdd_Temporary_Users() }}>+</button>
                </div>
            </div>

            <button class={styles.submitBtn1} type='submit' > Submit </button>
        </form >
    )
}

export default ScheduleCDP_edit

{/* <tr onClick={(e) => FillCapacity(id)}> */ }
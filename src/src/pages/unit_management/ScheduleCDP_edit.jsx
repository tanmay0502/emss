
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


    const [Num, setNum] = useState(Number(window.location.href.split("/")[6]));
    const data1 = [row11, row12];
    const data2 = [row21, row22];
    const [tableFilter, setTableFilter] = useState("");
    const [rows_Assigned_Engineer, setRows_Assigned_Engineer] = useState([]);
    const [rows_Temporary_Users, setRows_Temporary_Users] = useState([...data2]);
    const [isEdit_Assigned_Engineer, setEdit_Assigned_Engineer] = React.useState(-1);
    const [isEdit_Temporary_Users, setEdit_Temporary_Users] = React.useState(-1);
    const [CDPList, setCDPList] = React.useState([]);
    const [Process, setProcess] = React.useState('');
    const [CDP_Incharge, setCDP_Incharge] = React.useState('');
    const [unittype, setUnitType] = React.useState('');
    const [unitquantity, setUnitQuantity] = React.useState('');
    const [Startdate, setStartDate] = React.useState('');
    const [enddate, setEndDate] = React.useState('');
    const [Manufacturer, setManufacturer] = React.useState('');
    const [Temporary_Users, setTemporary_Users] = React.useState([]);
    const [userid, setUserId] = React.useState([]);
    const [assign_engineer_number, setassign_engineer_number] = React.useState([]);
    const [assign_engineer_email, setassign_engineer_email] = React.useState([]);
    const [assign_engineer_name, setassign_engineer_name] = React.useState([]);
    const [edit_upper_part, setedit_upper_part] = React.useState(0);
    const [edit_lower_part, setedit_lower_part] = React.useState(0);
    const [fl, steFl] = useState(0)
    const User_ID = sessionStorage.getItem("sessionToken");


    async function List_Of_CDP() {

        try {
            const response = await fetch(
                `${process.env.REACT_APP_API_SERVER}/unit/viewCDP/${Num}`,
                {
                    method: "GET",
                    credentials: 'same-origin',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    mode: "cors"
                }
            );

            const CDP = await response.json();
            if (response.status == 200) {
                if (CDP) {
                    setCDPList(CDP["cdp"][0]);
                    setTemporary_Users(CDP["temp_users"])
                    setRows_Assigned_Engineer(CDP['engineers'])
                    steFl(1)
                }
            }
        } catch (err) {
            console.log(err);
        }
    }



    useEffect(() => {
        List_Of_CDP();
    }, []);


    useEffect(() => {
        if (Temporary_Users != []) {

            const Temp = [...userid]
            Temporary_Users.map((val, id) => {
                Temp[id] = val['userid'][0] == '@' ? val['userid'].slice(1, val["userid"].length) : val['userid'];
            })
            setUserId(Temp)
        }
    }, [Temporary_Users]);


    async function Submit_edit() {

        try {
            const response = await fetch(
                `${process.env.REACT_APP_API_SERVER}/unit/edit_cdp_schedule`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        CDPID: Num,
                        CDPIncharge: document.getElementById("CDPIncharge") ? document.getElementById("CDPIncharge").value : "",
                        Process: document.getElementById("Process") ? document.getElementById("Process").value : "",
                        UnitQnty: document.getElementById("UnitQnty") ? document.getElementById("UnitQnty").value : "",
                        UnitType: document.getElementById("UnitType") ? document.getElementById("UnitType").value : "",
                        StartDate: document.getElementById("StartDate") ? document.getElementById("StartDate").value : "",
                        EndDate: document.getElementById("EndDate") ? document.getElementById("EndDate").value : "",
                        Manufacturer: document.getElementById("Manufacturer") ? document.getElementById("Manufacturer").value : "",
                        tempUsers: userid
                    }),
                }
            );

            const data4 = await response.json();
            if (response.status === 200) {
                alert("Schedule CDP Updated Successfully");
                window.location.pathname = "/session/unitmanagement/Schedule_List_CDP"
            } else {
                alert("Unable to Update Schedule CDP.");
            }
        } catch (err) {
            console.log(err);
        }
    }

    async function Final_Submit_Assign_Engineer() {
        try {
            const response = await fetch(
                `${process.env.REACT_APP_API_SERVER}/unit/assign_engineers`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        engineerName: assign_engineer_name,
                        engineerMobNo: assign_engineer_number,
                        engineerEmailID: assign_engineer_email,
                        Process: 'CDP',
                        ProcessID: Num,
                    }),
                }
            );
            const data4 = await response.json();
            if (response.status === 200) {
                alert("Schedule CDP Updated Successfully");
                window.location.pathname = "/session/unitmanagement/Schedule_List_CDP"
            } else {
                alert("Unable to Update Schedule CDP.");
            }
        } catch (err) {
            console.log(err);
        }

    }

    console.log(assign_engineer_number, assign_engineer_email, assign_engineer_name)

    useEffect(() => {
        if (fl) {
            setCDP_Incharge(CDPList["cdpincharge"])
            setProcess(CDPList["process"])
            setUnitQuantity(CDPList["unitqnty"])
            setUnitType(CDPList["unittype"])
            setManufacturer(CDPList["manufacturer"])
            setStartDate(CDPList['startdate'].split('T')[0])
            setEndDate(CDPList['enddate'].split('T')[0])
        }
    }, [CDPList]);

    const handleRemoveClick_Assigned_Engineer = (i) => {

        if (edit_lower_part) {

            if (window.confirm(`Are you sure you want to delete entry?`)) {
                const list_all = [...rows_Assigned_Engineer];
                list_all.splice(i, 1);
                const list_number = [...assign_engineer_number];
                list_number.splice(i, 1);
                const list_email = [...assign_engineer_email];
                list_email.splice(i, 1);
                const list_name = [...assign_engineer_name];
                list_name.splice(i, 1);


                setRows_Assigned_Engineer(list_all);
                setassign_engineer_email(list_email)
                setassign_engineer_name(list_name)
                setassign_engineer_number(list_number)
                setEdit_Assigned_Engineer(-1);
            }
        }
    };

    const handleRemoveClick_Temporary_Users = (i) => {
        if (edit_upper_part) {
            if (window.confirm(`Are you sure you want to delete entry?`)) {
                let list = [...rows_Temporary_Users];
                let temp = [...userid]
                temp.splice(i, 1)
                setUserId(temp)
            }
        }
    };



    const handleAdd_Assigned_Engineer = () => {
        if (assign_engineer_email[assign_engineer_email.length - 1] != "" && assign_engineer_name[assign_engineer_name.length - 1] != "" && assign_engineer_number[assign_engineer_number.length - 1] != "") {

            if (edit_lower_part) {

                setassign_engineer_email([...assign_engineer_email, ""])
                setassign_engineer_name([...assign_engineer_name, ""])
                setassign_engineer_number([...assign_engineer_number, ""])
                setRows_Assigned_Engineer([
                    ...rows_Assigned_Engineer,
                    {
                        enggname: "",
                        enggmobno: "",
                        enggemail: "",
                        "": <div className="flex justify-end " style={{ marginLeft: "3%" }}><button type="button" className="text-white bg-orange-600 p-1 text-2xl w-8 h-8 -mt-4 " style={{ borderRadius: "50%", marginTop: "2%" }} >-</button></div>
                    },
                ]);

                setEdit_Assigned_Engineer(rows_Assigned_Engineer.length);
            }
        }
        else {
            alert("Please fill the field or don't left empty")
        }
    };


    const handleAdd_Temporary_Users = () => {

        if (userid[userid.length - 1] != "") {
            if (edit_upper_part ? 1 : 0) {
                setUserId([
                    ...userid, ""
                    // {
                    //     User_ID: "",
                    //     "": <div style={{ display: "flex", flexDirection: "row", alignItems: "right", justifyContent: "flex-start", paddingLeft: "40px" }}><img src={UserImageTest} /></div>,
                    //     Name: "Jane Cooper",
                    //     " ": <div className="flex justify-end " style={{ marginLeft: "3%" }}><button type="button" className="text-white bg-orange-600 p-1 text-2xl w-8 h-8 -mt-4 " style={{ borderRadius: "50%", marginTop: "2%" }} >-</button></div>
                    // },
                ]);
                setEdit_Temporary_Users(userid.length);
            }
        }
        else {
            alert("Please fill the field or don't left empty")
        }
    };

    const handleInputChange_Assigned_Engineer = (e, index) => {
        const { name, value } = e.target;
        const list1 = [...rows_Assigned_Engineer];
        list1[index][name] = value;
        setRows_Assigned_Engineer(list1);
    };

    const handleInputChange_Assigned_Engineer_name = (e, index) => {
        console.log("name")
        const { name, value } = e.target;
        const list = [...assign_engineer_name];
        list[index] = value;
        const list1 = [...rows_Assigned_Engineer];
        list1[index][name] = value;
        setRows_Assigned_Engineer(list1);
        setassign_engineer_name(list);
    };

    const handleInputChange_Assigned_Engineer_number = (e, index) => {
        console.log("number")
        const { name, value } = e.target;
        const list = [...assign_engineer_number];
        list[index] = value;
        const list1 = [...rows_Assigned_Engineer];
        list1[index][name] = value;
        setRows_Assigned_Engineer(list1);
        setassign_engineer_number(list);
    };

    const handleInputChange_Assigned_Engineer_email = (e, index) => {
        console.log("email")
        const { name, value } = e.target;
        const list = [...assign_engineer_email];
        list[index] = value;
        const list1 = [...rows_Assigned_Engineer];
        list1[index][name] = value;
        setRows_Assigned_Engineer(list1);
        setassign_engineer_email(list);
    };

    const handleInputChange_Temporary_Users = (e, index) => {
        const { name, value } = e.target;
        const Temp = [...userid]
        Temp[index] = value;
        setUserId(Temp)
    };

    const handleEdit_Assigned_Engineer = (i) => {
        if (i == -1 && assign_engineer_email[assign_engineer_email.length - 1] != "" && assign_engineer_name[assign_engineer_name.length - 1] != "" && assign_engineer_number[assign_engineer_number.length - 1] != "") {
            setEdit_Assigned_Engineer(i)
        }
        if (i != -1) {
            setEdit_Assigned_Engineer(i);
        }

    };

    const handleEdit_Temporary_Users = (i) => {

        if (i == -1 && userid[userid.length - 1] != "") {
            setEdit_Temporary_Users(i)
        }
        if (i != -1) {
            setEdit_Temporary_Users(i);
        }
    };



    const Submit_edit_All = async (e) => {
        e.preventDefault();
        if (User_ID.substring(8) == "Mfr-User")
            Final_Submit_Assign_Engineer()
        else
            Submit_edit()

    };


    useEffect(() => {
        if (rows_Assigned_Engineer != []) {

            const Temp_email = [...assign_engineer_email]
            const Temp_number = [...assign_engineer_number]
            const Temp_name = [...assign_engineer_name]
            rows_Assigned_Engineer.map((val, id) => {
                Temp_email[id] = val['enggemail']
                Temp_name[id] = val['enggname']
                Temp_number[id] = val['enggmobno']
            })
            setassign_engineer_email(Temp_email)
            setassign_engineer_name(Temp_name)
            setassign_engineer_number(Temp_number)
        }
    }, [rows_Assigned_Engineer]);



    console.log(assign_engineer_email, assign_engineer_name, assign_engineer_number)

    return (
        <form className="p-3" onSubmit={Submit_edit_All}>
            {User_ID.substring(8) != "Mfr-User" &&
                <div class={styles.submitBtn2} onClick={(e) => { edit_upper_part == 1 ? setedit_upper_part(0) : setedit_upper_part(1) }}> Edit </div>
            }
            <div class={styles.Schedule_container1}>
                <div class={styles.Schedule_header1}>
                    <h4>
                        Schedule CDP
                    </h4>
                </div>

                <div class={styles.parent1}>
                    <div class={styles.div1}>
                        <p> CDP Incharge</p>
                        <input
                            id="CDPIncharge"
                            type={"text"}
                            required
                            placeholder='Enter UserID'
                            value={CDP_Incharge}
                            onChange={(e) => { setCDP_Incharge(e.target.value) }}
                            disabled={edit_upper_part ? 0 : 1}
                        >
                        </input>
                    </div>

                    <div class={styles.div2}>
                        <p> Process</p>
                        <select
                            id="Process"
                            required
                            className=" selectBox"
                            value={Process}
                            onChange={(e) => { setProcess(e.target.value) }}
                            disabled={edit_upper_part ? 0 : 1}
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
                            value={unittype}
                            onChange={(e) => { setUnitType(e.target.value) }}
                            disabled={edit_upper_part ? 0 : 1}
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
                            disabled={edit_upper_part ? 0 : 1}
                            defaultValue={unitquantity}
                            onChange={(e) => { setUnitQuantity(e.target.value) }}
                        >
                        </input>
                    </div>

                    <div class={styles.div5}>
                        <p> Manufacturer</p>
                        <select
                            id="Manufacturer"
                            required
                            className=" selectBox"
                            value={Manufacturer}
                            onChange={(e) => { setManufacturer(e.target.value) }}
                            disabled={edit_upper_part ? 0 : 1}
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
                        <p> Number Of Engineers</p>
                        <input
                            type='text'
                            placeHolder=""
                            id="Number Of Engineers"
                            disabled
                            defaultValue={23}
                        >
                        </input>
                    </div>


                    <div class={styles.div7}>
                        <p> Start date</p>
                        <input
                            id="StartDate"
                            required
                            class={styles.dateInput}
                            type="date"
                            className=" selectBox"
                            onChange={(e) => { setStartDate(e.target.value) }}
                            defaultValue={Startdate}
                            disabled={edit_upper_part ? 0 : 1}
                        ></input>
                    </div>

                    <div class={styles.div8}>
                        <p> End date</p>
                        <input
                            id="EndDate"
                            required
                            class={styles.dateInput}
                            type="date"
                            className=" selectBox"
                            onChange={(e) => { setEndDate(e.target.value) }}
                            defaultValue={enddate}
                            disabled={edit_upper_part ? 0 : 1}
                        ></input>
                    </div>

                </div>

            </div>
            {User_ID.substring(8) == "Mfr-User" &&
                <div class={styles.submitBtn3} onClick={(e) => { edit_lower_part == 1 ? setedit_lower_part(0) : setedit_lower_part(1) }} > Edit </div>
            }
            <div class={styles.parent2}>
                <div class={styles.Schedule_container2}>
                    <div class={styles.Schedule_header2}>
                        <h4>
                            Assigned Engineer
                        </h4>

                        <div style={{ display: "flex", "flexDirection": "row", alignItems: "center", justifyContent: "center", background: "#F9FBFF", borderRadius: "10px", padding: "7.5px 15px 7.5px 0", fontSize: "0.8em" }}>
                            <SearchInputElement style={{ margin: "0 7.5px", width: "20px" }} />
                            <input type={'search'} defaultValue={tableFilter} onChange={(e) => { setTableFilter(e.target.value) }} placeholder='Search' style={{ outline: "none", background: "transparent" }} />
                        </div>
                    </div>
                    <div class={styles.Schedule_CDP_table}>
                        {/* <DynamicDataTable rows={data1} buttons={[]} /> */}
                        <table >
                            <thead >
                                <tr>
                                    <th style={{ color: "#f56a3f", padding: "20px" }}>Name</th>
                                    <th style={{ color: "#f56a3f", padding: "20px" }}>Mobile</th>
                                    <th style={{ color: "#f56a3f", padding: "20px" }}>Email ID</th>
                                </tr>
                            </thead>
                            {rows_Assigned_Engineer.length > 0 &&
                                rows_Assigned_Engineer.map((val, id) => {
                                    return (isEdit_Assigned_Engineer != id ?
                                        <tbody >
                                            <tr onDoubleClick={() => { handleEdit_Assigned_Engineer(id) }}>
                                                <td className="text-black text-sm">{assign_engineer_name[id]}</td>
                                                <td className="text-black text-sm">{assign_engineer_number[id]}</td>
                                                <td className="text-black text-sm">{assign_engineer_email[id]}</td>
                                                <td className="text-black text-sm" onClick={() => handleRemoveClick_Assigned_Engineer(id)}>{row12['']}</td>
                                            </tr>
                                        </tbody>
                                        :
                                        <tbody >
                                            <tr onDoubleClick={() => { handleEdit_Assigned_Engineer(-1) }}>
                                                <td >
                                                    <input
                                                        className={styles.Assigned_Engineer_Tr}
                                                        required
                                                        value={assign_engineer_name[id]}
                                                        name="enggname"
                                                        placeholder="Name"
                                                        onChange={(e) => handleInputChange_Assigned_Engineer_name(e, id)}
                                                        disabled={edit_lower_part ? 0 : 1}
                                                    />
                                                </td >
                                                <td >
                                                    <input
                                                        className={styles.Assigned_Engineer_Tr}
                                                        value={assign_engineer_number[id]}
                                                        placeholder="Mobile Number"
                                                        required
                                                        name="enggmobno"
                                                        onChange={(e) => handleInputChange_Assigned_Engineer_number(e, id)}
                                                        disabled={edit_lower_part ? 0 : 1}
                                                    />
                                                </td>
                                                <td >
                                                    <input
                                                        className={styles.Assigned_Engineer_Tr}
                                                        value={assign_engineer_email[id]}
                                                        required
                                                        placeholder="Email ID"
                                                        name="enggemail"
                                                        onChange={(e) => handleInputChange_Assigned_Engineer_email(e, id)}
                                                        disabled={edit_lower_part ? 0 : 1}
                                                    />
                                                </td>
                                                <td className="text-black text-sm" onClick={() => handleRemoveClick_Assigned_Engineer(id)}>{row12['']}</td>
                                            </tr>
                                        </tbody>
                                    )
                                })}
                        </table>
                    </div>
                    <button type="button" className="text-white bg-orange-600 p-1 text-2xl w-8 h-8 -mt-4 " style={{ borderRadius: "50%", marginLeft: "91%", marginTop: "1%" }} onClick={() => { handleAdd_Assigned_Engineer() }}>+</button>
                </div>


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
                            {userid.length > 0 &&
                                userid.map((val, id) => {
                                    return (isEdit_Temporary_Users != id ?
                                        <tbody >
                                            <tr onDoubleClick={() => { handleEdit_Temporary_Users(id) }}>
                                                <td className="text-black text-sm">{val}</td>
                                                <td className="text-black text-sm">{rows_Temporary_Users[0]['']}</td>
                                                <td className="text-black text-sm"> {rows_Temporary_Users[0]['Name']}</td>
                                                <td className="text-black text-sm"
                                                    onClick={() => { handleRemoveClick_Temporary_Users(id) }}>{rows_Temporary_Users[0][' ']}</td>
                                            </tr>
                                        </tbody>
                                        :
                                        <tbody >
                                            <tr onDoubleClick={() => { handleEdit_Temporary_Users(-1) }} disabled={edit_upper_part ? 0 : 1}>
                                                <td >
                                                    <input
                                                        className={styles.Assigned_Engineer_Tr}
                                                        value={val}
                                                        required
                                                        name="User_ID"
                                                        placeholder="User ID"
                                                        onChange={(e) => handleInputChange_Temporary_Users(e, id)}
                                                        disabled={edit_upper_part ? 0 : 1}
                                                    />
                                                </td >
                                                <td className="text-black text-sm">{rows_Temporary_Users[0]['']}</td>
                                                <td >
                                                    <input
                                                        className={styles.Assigned_Engineer_Tr}
                                                        value={"jane Cooper"}
                                                        placeholder="Name"
                                                        required
                                                        name="Name"
                                                        disabled
                                                        onChange={(e) => handleInputChange_Temporary_Users(e, id)}
                                                    />
                                                </td>
                                                <td className="text-black text-sm" onClick={() => handleRemoveClick_Temporary_Users(id)} disabled={edit_upper_part ? 0 : 1}>{rows_Temporary_Users[0][' ']}</td>
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


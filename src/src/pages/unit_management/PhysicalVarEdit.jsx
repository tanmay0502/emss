import { DynamicDataTable } from '@langleyfoxall/react-dynamic-data-table'
import React, { useState, useEffect } from 'react'
import styles from './styles/ScheduleEPV_edit.module.css'
import { TagsInput } from "react-tag-input-component";
import { ReactComponent as SearchInputElement } from '../../assets/searchInputIcon.svg';

import UserImageTest from '../../assets/UserImageTest.png'

function EditPhysicalVerification() {


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
    const data2 = [row21, row22];
    const [tableFilter, setTableFilter] = useState("");
    const [rows_Temporary_Users, setRows_Temporary_Users] = useState([...data2]);
    const [isEdit_Temporary_Users, setEdit_Temporary_Users] = React.useState(-1);
    const [EPVList, setEPVList] = React.useState([]);
    const [warehouseId, setWarehouseID] = React.useState('');
    const [Startdate, setStartDate] = React.useState('');
    const [enddate, setEndDate] = React.useState('');
    const [Temporary_Users, setTemporary_Users] = React.useState([]);
    const [userid, setUserId] = React.useState([]);
    const [status, setStatus] = React.useState([]);
    const [fl, steFl] = useState(0)


    async function List_Of_EPV() {

        try {
            const response = await fetch(
                `${process.env.REACT_APP_API_SERVER}/unit/viewEPV/${Num}`,
                {
                    method: "GET",
                    credentials: 'same-origin',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    mode: "cors"
                }
            );

            const EPV = await response.json();
            if (response.status == 200) {
                if (EPV) {
                    const data = EPV['data']
                    setEPVList(data["epv"][0]);
                    setTemporary_Users(data["temp_users"])
                    steFl(1)
                }
            }
            else
                alert(EPV['message'])
        } catch (err) {
            console.log(err);
        }
    }



    useEffect(() => {
        List_Of_EPV();
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


    console.log(Temporary_Users, "Temporary_Users")

    useEffect(() => {
        if (fl) {
            setWarehouseID(EPVList["warehouseid"])
            setStatus(EPVList["status"])
            setStartDate(EPVList['startdate'].split('T')[0])
            setEndDate(EPVList['enddate'].split('T')[0])
        }
    }, [EPVList]);



    const handleRemoveClick_Temporary_Users = (i) => {
        if (window.confirm(`Are you sure you want to delete entry?`)) {
            let list = [...rows_Temporary_Users];
            let temp = [...userid]
            temp.splice(i, 1)
            setUserId(temp)
        }
    };


    const handleAdd_Temporary_Users = () => {
        setUserId([
            ...userid, ""
        ]);
        setEdit_Temporary_Users(userid.length);
    };


    const handleInputChange_Temporary_Users = (e, index) => {
        const { name, value } = e.target;
        const Temp = [...userid]
        Temp[index] = value;
        setUserId(Temp)
    };


    const handleEdit_Temporary_Users = (i) => {
        setEdit_Temporary_Users(i);
    };


    async function Submit_EPV() {

        try {
            const response = await fetch(
                `${process.env.REACT_APP_API_SERVER}/unit/edit_pv_schedule`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        OrderID: Num,
                        WarehouseID: document.getElementById("WarehouseID") ? document.getElementById("WarehouseID").value : "",
                        Status: document.getElementById("status") ? document.getElementById("status").value : "",
                        Startdate: document.getElementById("Startdate") ? document.getElementById("Startdate").value : "",
                        Enddate: document.getElementById("Enddate") ? document.getElementById("Enddate").value : "",
                        tempUsers: userid
                    }),
                }
            );

            const data3 = await response.json();
            console.log(data3, "data3")
            if (response.status === 200) {
                alert("Physical verification schedule Updated  Successfully");
                window.location.pathname = "/session/unitmanagement/schedule_verification_list"
            } else {
                alert("Unable to Updated Physical verification schedule.");
            }

        } catch (err) {
            console.log(err);
        }

    }

    console.log(EPVList)
    console.log(userid, "userid")
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
                            value={warehouseId}
                            onChange={(e) => { setWarehouseID(e.target.value) }}
                        >
                        </input>
                    </div>


                    <div class={styles.div2}>
                        <p> Start date</p>
                        <input
                            className=" selectBox"
                            onChange={(e) => { setStartDate(e.target.value) }}
                            defaultValue={Startdate}
                            id="Startdate"
                            required
                            class={styles.dateInput}
                            type="date"
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
                            onChange={(e) => { setEndDate(e.target.value) }}
                            defaultValue={enddate}
                        ></input>
                    </div>


                    <div class={styles.div4}>
                        <p> Status</p>
                        <select
                            id="status"
                            required
                            className=" selectBox"
                            value={status}
                            onChange={(e) => { setStatus(e.target.value) }}
                        >
                            <option value="" selected>
                                Select
                            </option>
                            <option value="Progress" >
                                In Progress
                            </option>
                            <option value="Completed" >
                                Completed
                            </option>
                        </select>
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
                            {userid.length > 0 &&
                                userid.map((val, id) => {
                                    return (isEdit_Temporary_Users != id ?
                                        <tbody >
                                            <tr onDoubleClick={() => { handleEdit_Temporary_Users(id) }}>
                                                <td className="text-black text-sm">{val}</td>
                                                <td className="text-black text-sm">{rows_Temporary_Users[0]['']}</td>
                                                <td className="text-black text-sm"> {rows_Temporary_Users[0]['Name']}</td>
                                                <td className="text-black text-sm"
                                                    onClick={() => handleRemoveClick_Temporary_Users(id)}>{rows_Temporary_Users[0][' ']}</td>
                                            </tr>
                                        </tbody>
                                        :
                                        <tbody >
                                            <tr onDoubleClick={() => { handleEdit_Temporary_Users(-1) }}>
                                                <td >
                                                    <input
                                                        className={styles.Assigned_Engineer_Tr}
                                                        value={val}
                                                        name="User_ID"
                                                        placeholder="User ID"
                                                        onChange={(e) => handleInputChange_Temporary_Users(e, id)}
                                                    />
                                                </td >
                                                <td className="text-black text-sm">{rows_Temporary_Users[0]['']}</td>
                                                <td >
                                                    <input
                                                        className={styles.Assigned_Engineer_Tr}
                                                        value={"jane Cooper"}
                                                        placeholder="Name"
                                                        name="Name"
                                                        disabled
                                                        onChange={(e) => handleInputChange_Temporary_Users(e, id)}
                                                    />
                                                </td>
                                                <td className="text-black text-sm" onClick={() => handleRemoveClick_Temporary_Users(id)}>{rows_Temporary_Users[0][' ']}</td>
                                            </tr>
                                        </tbody>
                                    )
                                })}
                        </table>
                    </div>
                    <button type="button" className="text-white bg-orange-600 p-1 text-2xl w-8 h-8 -mt-4 " style={{ borderRadius: "50%", marginLeft: "87%", marginTop: "1%" }} onClick={() => { handleAdd_Temporary_Users() }}>+</button>
                </div>
            </div>
            <center><input type={"submit"} className={styles.mySubmit} ></input></center>
        </form>
    )
}

export default EditPhysicalVerification






import React, { useState } from 'react'
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



    const data1 = [row11, row12];
    const data2 = [row21, row22];
    const [tableFilter, setTableFilter] = useState("");
    const [rows_Assigned_Engineer, setRows_Assigned_Engineer] = useState([...data1]);
    const [rows_Temporary_Users, setRows_Temporary_Users] = useState([...data2]);
    const [isEdit_Assigned_Engineer, setEdit_Assigned_Engineer] = React.useState(-1);
    const [isEdit_Temporary_Users, setEdit_Temporary_Users] = React.useState(-1);





    const handleRemoveClick_Assigned_Engineer = (i) => {
        if (window.confirm(`Are you sure you want to delete row from Assigned Engineer table?`)) {
            const list = [...rows_Assigned_Engineer];
            list.splice(i, 1);
            setRows_Assigned_Engineer(list);
            setEdit_Assigned_Engineer(-1);
        }
    };

    const handleRemoveClick_Temporary_Users = (i) => {
        if (window.confirm(`Are you sure you want to delete from temporary Users table?`)) {
            const list = [...rows_Temporary_Users];
            list.splice(i, 1);
            setRows_Temporary_Users(list);

        }
    };


    const handleAdd_Assigned_Engineer = () => {
        setRows_Assigned_Engineer([
            ...rows_Assigned_Engineer,
            {
                Name: "",
                Mobile: "",
                EmailID: "",
                "": <div className="flex justify-end " style={{ marginLeft: "3%" }}><button type="button" className="text-white bg-orange-600 p-1 text-2xl w-8 h-8 -mt-4 " style={{ borderRadius: "50%", marginTop: "2%" }} >-</button></div>
            },
        ]);
        setEdit_Assigned_Engineer(rows_Assigned_Engineer.length);
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

    const handleInputChange_Assigned_Engineer = (e, index) => {
        const { name, value } = e.target;
        const list = [...rows_Assigned_Engineer];
        list[index][name] = value;
        setRows_Assigned_Engineer(list);
    };

    const handleInputChange_Temporary_Users = (e, index) => {
        const { name, value } = e.target;
        const list = [...rows_Temporary_Users];
        list[index][name] = value;
        setRows_Temporary_Users(list);
    };

    const handleEdit_Assigned_Engineer = (i) => {
        setEdit_Assigned_Engineer(i);
    };

    const handleEdit_Temporary_Users = (i) => {
        setEdit_Temporary_Users(i);
    };

    const onFormSubmit = async (e) => { }


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
                        <p> CDP Incharge</p>
                        <input
                            type="text"
                            required
                            name=""
                            id="formLevel"
                            placeholder='Enter UserID'
                        >
                        </input>
                    </div>


                    <div class={styles.div2}>
                        <p> Process</p>
                        <select
                            required
                            name=""
                            id="formLevel"
                            class=" selectBox"
                        >
                            <option value="" disabled selected>
                                Select
                            </option>
                        </select>
                    </div>

                    <div class={styles.div3}>
                        <p> Unit Type</p>
                        <select
                            required
                            name=""
                            id="formLevel"
                            class=" selectBox"
                        >
                            <option value="" disabled selected>
                                Select
                            </option>
                        </select>
                    </div>


                    <div class={styles.div4}>
                        <p> Unit Quantity</p>
                        <input
                            type="number"
                            required
                            name=""
                            id="formLevel"
                            placeholder='Enter Number'
                        >
                        </input>

                    </div>
                    <div class={styles.div5}>
                        <p> Manufacturer</p>
                        <select
                            required
                            name=""
                            id="formLevel"
                            class=" selectBox"
                        >
                            <option value="" disabled selected>
                                Select
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
                        >

                        </input>

                    </div>

                    <div class={styles.div7}>
                        <p> Start date</p>
                        <input
                            class={styles.dateInput}
                            type="date"

                        ></input>
                    </div>

                    <div class={styles.div8}>
                        <p> End date</p>
                        <input
                            class={styles.dateInput}
                            type="date"
                        ></input>
                    </div>

                </div>

            </div>

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
                                                <td className="text-black text-sm">{val['Name']}</td>
                                                <td className="text-black text-sm">{val['Mobile']}</td>
                                                <td className="text-black text-sm">{val['EmailID']}</td>
                                                <td className="text-black text-sm" onClick={() => handleRemoveClick_Assigned_Engineer(id)}>{val['']}</td>
                                            </tr>
                                        </tbody>
                                        :
                                        <tbody >
                                            <tr onDoubleClick={() => { handleEdit_Assigned_Engineer(-1) }}>
                                                <td >
                                                    <input
                                                        className={styles.Assigned_Engineer_Tr}
                                                        value={val.Name}
                                                        name="Name"
                                                        placeholder="Name"
                                                        onChange={(e) => handleInputChange_Assigned_Engineer(e, id)}
                                                    />
                                                </td >
                                                <td >
                                                    <input
                                                        className={styles.Assigned_Engineer_Tr}
                                                        value={val.Mobile}
                                                        placeholder="Mobile Number"
                                                        name="Mobile"
                                                        onChange={(e) => handleInputChange_Assigned_Engineer(e, id)}
                                                    />
                                                </td>
                                                <td >
                                                    <input
                                                        className={styles.Assigned_Engineer_Tr}
                                                        value={val.EmailID}
                                                        placeholder="Email ID"
                                                        name="EmailID"
                                                        onChange={(e) => handleInputChange_Assigned_Engineer(e, id)}
                                                    />
                                                </td>
                                                <td className="text-black text-sm" onClick={() => handleRemoveClick_Assigned_Engineer(id)}>{val['']}</td>
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
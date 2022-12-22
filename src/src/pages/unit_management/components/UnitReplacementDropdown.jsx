import React, { useState, useEffect } from 'react'
import styles from '../styles/UnitReplacementDropdown.module.css'


function UnitReplacementDropdown(props) {

    const row12 = {
        'Name': 'Jane Cooper',
        'Mobile': '8845244243',
        "EmailID": 'abc@gmail.com',
        '': <div className="flex justify-end " style={{ marginLeft: "3%" }}><button type="button" className="text-white bg-orange-600 p-1 text-2xl w-8 h-8 -mt-4 " style={{ borderRadius: "50%", marginTop: "2%" }} >-</button></div>
    }

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

    const [rows_Assigned_Engineer, setRows_Assigned_Engineer] = useState([]);
    const [isEdit_Assigned_Engineer, setEdit_Assigned_Engineer] = React.useState(-1);
    const [edit, setEdit] = useState(false);
    const [manufacture_edit, setmanufacture_edit] = useState(false);
    const [assign_engineer_number, setassign_engineer_number] = React.useState([]);
    const [assign_engineer_email, setassign_engineer_email] = React.useState([]);
    const [assign_engineer_name, setassign_engineer_name] = React.useState([]);

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



    const onFormSubmit = async (e) => {

    };


    const handleRemoveClick_Assigned_Engineer = (i) => {

        if (manufacture_edit) {

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

    const handleAdd_Assigned_Engineer = () => {
        if (assign_engineer_email[assign_engineer_email.length - 1] != "" && assign_engineer_name[assign_engineer_name.length - 1] != "" && assign_engineer_number[assign_engineer_number.length - 1] != "") {

            if (manufacture_edit) {

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
        else if (manufacture_edit) {
            alert("Please fill the field or don't left empty")
        }

    };

    const handleEdit_Assigned_Engineer = (i) => {
        if (i == -1 && assign_engineer_email[assign_engineer_email.length - 1] != "" && assign_engineer_name[assign_engineer_name.length - 1] != "" && assign_engineer_number[assign_engineer_number.length - 1] != "") {
            setEdit_Assigned_Engineer(i)
        }
        if (i != -1) {
            setEdit_Assigned_Engineer(i);
        }

    };

    const handleInputChange_Assigned_Engineer_name = (e, index) => {

        const { name, value } = e.target;
        const list = [...assign_engineer_name];
        list[index] = value;
        const list1 = [...rows_Assigned_Engineer];
        list1[index][name] = value;
        setRows_Assigned_Engineer(list1);
        setassign_engineer_name(list);
    };

    const handleInputChange_Assigned_Engineer_number = (e, index) => {

        const { name, value } = e.target;
        const list = [...assign_engineer_number];
        list[index] = value;
        const list1 = [...rows_Assigned_Engineer];
        list1[index][name] = value;
        setRows_Assigned_Engineer(list1);
        setassign_engineer_number(list);
    };

    const handleInputChange_Assigned_Engineer_email = (e, index) => {

        const { name, value } = e.target;
        const list = [...assign_engineer_email];
        list[index] = value;
        const list1 = [...rows_Assigned_Engineer];
        list1[index][name] = value;
        setRows_Assigned_Engineer(list1);
        setassign_engineer_email(list);
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

    return (
        <>

            <form id="form" onSubmit={onFormSubmit}>
                <div class={styles.parent2}>
                    <div class={styles.Schedule_container2}>
                        {/* <div class={styles.Schedule_header2}>
                            <h4>
                                Assigned Engineer
                            </h4>

                            <div style={{ display: "flex", "flexDirection": "row", alignItems: "center", justifyContent: "center", background: "#F9FBFF", borderRadius: "10px", padding: "7.5px 15px 7.5px 0", fontSize: "0.8em" }}>
                                <SearchInputElement style={{ margin: "0 7.5px", width: "20px" }} />
                                <input type={'search'} defaultValue={tableFilter} onChange={(e) => { setTableFilter(e.target.value) }} placeholder='Search' style={{ outline: "none", background: "transparent" }} />
                            </div>
                            {Role == 'Mfr-User' && manufacture_edit == false && <button className={scheduleStyles.editBtn} onClick={(e) => { manufacture_edit == true ? setmanufacture_edit(false) : setmanufacture_edit(true) }}> Edit </button>}

                        </div> */}
                        <div class={styles.ReplacementDropdown}>
                            <table >
                                <thead >
                                    <tr>
                                        <th style={{ color: "#f56a3f", padding: "20px" }}>Polling Station</th>
                                        <th style={{ color: "#f56a3f", padding: "20px" }}>Replacement Level</th>
                                    </tr>
                                </thead>
                                {rows_Assigned_Engineer.length > 0 &&
                                    rows_Assigned_Engineer.map((val, id) => {
                                        return (isEdit_Assigned_Engineer != id ?
                                            <tbody >
                                                <tr onDoubleClick={() => { handleEdit_Assigned_Engineer(id) }}>
                                                    <td className="text-black text-sm">{assign_engineer_name[id]}</td>
                                                    <td className="text-black text-sm">{assign_engineer_number[id]}</td>
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
                                                            type="text"
                                                            value={assign_engineer_name[id]}
                                                            name="enggname"
                                                            placeholder="Name"
                                                            onChange={(e) => handleInputChange_Assigned_Engineer_name(e, id)}
                                                            disabled={manufacture_edit === true ? false : true}
                                                        />
                                                    </td >
                                                    <td >
                                                        <input
                                                            className={styles.Assigned_Engineer_Tr}
                                                            value={assign_engineer_number[id]}
                                                            placeholder="Mobile Number"
                                                            type="number"
                                                            required
                                                            name="enggmobno"
                                                            onChange={(e) => handleInputChange_Assigned_Engineer_number(e, id)}
                                                            disabled={manufacture_edit === true ? false : true}
                                                        />
                                                    </td>
                                                    {manufacture_edit == true && <td className="text-black text-sm" onClick={() => handleRemoveClick_Assigned_Engineer(id)}>{row12['']}</td>}
                                                </tr>
                                            </tbody>
                                        )
                                    })}
                            </table>
                        </div>
                        {manufacture_edit == true && <button type="button" className="text-white bg-orange-600 p-1 text-2xl w-8 h-8 -mt-4 " style={{ borderRadius: "50%", marginLeft: "91%", marginTop: "1%" }} onClick={() => { handleAdd_Assigned_Engineer() }}>+</button>}
                    </div>
                </div>
                {(edit === true || manufacture_edit === true) &&
                    <center>
                        <input type={"submit"} className="mySubmit">
                        </input>
                    </center>

                }
            </form>
        </>

    )

}

export default UnitReplacementDropdown


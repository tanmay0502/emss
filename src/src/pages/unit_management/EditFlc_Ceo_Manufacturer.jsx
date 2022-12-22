import React, { useState, useEffect } from 'react'
import scheduleStyles from './styles/ScheduleFlc.module.css'
import { ReactComponent as SearchInputElement } from '../../assets/searchInputIcon.svg';
// import styles from './styles/ScheduleCDP_edit.module.css'
import styles from './styles/ScheduleFlc.module.css'
import Modal from 'react-modal';
import load from '../issue_request_management/styles/issue.module.css'
import UserImageTest from '../../assets/UserImageTest.png'



function EditFlc_Ceo_Manufacturer(props) {



    const [photoFileName, setPhotoFileName] = useState("")
    const [photoFileData, setPhotoFileData] = useState("")

    const [modalIsOpen, setIsOpen] = React.useState(false);
    console.log(photoFileName, "filename")


    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        //   subtitle.style.color = '#f00';
    }

    function closeModal() {
        setIsOpen(false);
    }

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };

    const issueId = () => {
        return props.ID;
    }

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

    const [tableFilter, setTableFilter] = useState("");
    const [rows_Assigned_Engineer, setRows_Assigned_Engineer] = useState([]);
    const [isEdit_Assigned_Engineer, setEdit_Assigned_Engineer] = React.useState(-1);
    const [Num, setNum] = useState(Number(window.location.href.split("/")[6]));
    const [edit, setEdit] = useState(false);
    const [manufacture_edit, setmanufacture_edit] = useState(false);
    const [assign_engineer_number, setassign_engineer_number] = React.useState([]);
    const [assign_engineer_email, setassign_engineer_email] = React.useState([]);
    const [assign_engineer_name, setassign_engineer_name] = React.useState([]);
    const [flc, setFlc] = useState([]);
    const [details, setDetails] = useState([]);
    const [currStart, setCurrStart] = useState("")
    const [currEnd, setCurrEnd] = useState("")
    const User_ID = sessionStorage.getItem("sessionToken");
    const Role = User_ID.substring(8)
    // const Role = "Mfr-User"
    const [district, setdistrict] = useState('');
    const [tentativeyear, settentativeyear] = useState('');
    const [tentativemonth, settentativemonth] = useState('');
    const [manufcature, setmanufcature] = useState('');
    const [ecisupervisor, setecisupervisor] = useState('');
    const [typeofelection, settypeofelection] = useState('');
    const [manufcatureemailid, setmanufcatureemailid] = useState('');
    const [startdate, setstartdate] = useState('');
    const [enddate, setenddate] = useState('');
    const [manufcaturemobile, setmanufcaturemobile] = useState('');
    const [flag, setflag] = useState(0)

    console.log(
        'I am console',
        district, tentativeyear, tentativemonth, manufcature, ecisupervisor, typeofelection, manufcatureemailid, startdate + 'T' + time, enddate + 'T' + time, manufcaturemobile
    )


    async function getcertificate() {
        setflag(1)

        try {
            const response = await fetch(
                `${process.env.REACT_APP_API_SERVER}/unit/getunitdocument/${photoFileName}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: 'include',
                    mode: "cors"
                }
            );
            const data = await response.json();
            if (response.status == 200) {
                setPhotoFileData(data)
            }

        } catch (err) {
            console.log({ err });
        }
    }

    if (flag == 0) {
        if (photoFileName) {
            getcertificate();
        }
    }


    async function getFLC() {

        try {
            const response = await fetch(
                `${process.env.REACT_APP_API_SERVER}/unit/viewFLC/${props.ID}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: 'same-origin',
                    mode: "cors"
                }
            );
            const data = await response.json();
            if (response.status == 200) {
                setRows_Assigned_Engineer(data['engineers'])
                setFlc(data['flc'][0]);
                setstartdate(data['flc'][0]['startdate'].slice(0, 10));
                setenddate(data['flc'][0]['enddate'].slice(0, 10));
                setPhotoFileName(data['flc'][0]['preparenesscertificatename'])
                setdistrict(data['flc'][0]['district'])
                settentativeyear(data['flc'][0]['tentativeyear'])
                setmanufcature(data['flc'][0]['manufacturername'])
                setecisupervisor(data['flc'][0]['ecisupervisor'])
                settypeofelection(data['flc'][0]['electiontype'])
                settentativemonth(data['flc'][0]['tentativemonth'])
                setmanufcatureemailid(data['flc'][0]['manufactureremailid'])
                setmanufcaturemobile(data['flc'][0]['manufacturermobno'])
            }

        } catch (err) {
            console.log({ err });
        }
    }

    useEffect(() => {
        getFLC();
    }, []);



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








    async function edit_Schedule() {

        try {
            let id = issueId();
            const response = await fetch(
                `${process.env.REACT_APP_API_SERVER}/unit/edit_flc_announce`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: 'include',
                    body: JSON.stringify({
                        ID: Number(id),
                        ManufacturerName: manufcature,
                        ManufacturerMobNo: manufcaturemobile,
                        ManufacturerEmailID: manufcatureemailid,
                        ECISupervisor: ecisupervisor,
                        TentativeYear: tentativeyear,
                        TentativeMonth: tentativemonth,
                        StartDate: startdate + 'T' + time,
                        EndDate: enddate + 'T' + time,
                        ElectionType: typeofelection,
                    }),
                }
            );

            const data = await response.json();

            if (response.status == 200) {
                alert("Updated Successful");
                window.location.pathname = "/session/unitmanagement/flc_list";
            } else {
                alert("Edit Failed! ");

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
                    credentials: 'include',
                    body: JSON.stringify({
                        engineerName: assign_engineer_name,
                        engineerMobNo: assign_engineer_number,
                        engineerEmailID: assign_engineer_email,
                        Process: 'FLC',
                        ProcessID: flc['flcid'],
                    }),
                }
            );

            const data4 = await response.json();
            if (response.status === 200) {
                alert("Successful");
                window.location.pathname = "/session/unitmanagement/flc_list";
            } else {
                alert("Unable to Assign Engineers");
            }
        } catch (err) {
            console.log(err);
        }

    }


    const onFormSubmit = async (e) => {
        e.preventDefault();
        if (Role == "CEO") {
            edit_Schedule();
        }
        else if (Role == "Mfr-User") {
            Final_Submit_Assign_Engineer();
        }
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


    console.log(manufcature, manufcaturemobile, manufcatureemailid)
    return (
        <>

            <form id="form" onSubmit={onFormSubmit}>
                <div className={scheduleStyles.Schedule_container}>
                    <div className={scheduleStyles.Schedule_header}>

                        <h4>
                            Schedule FLC
                        </h4>

                        {Role == 'CEO' && edit == false && <button className={scheduleStyles.editBtn} onClick={(e) => { edit == true ? setEdit(false) : setEdit(true) }}> Edit </button>}
                    </div>
                    <div class={scheduleStyles.parent}>

                        <div class={scheduleStyles.div1}>
                            <p>FLC District</p>
                            <input
                                required
                                class={scheduleStyles.input}
                                type="text"
                                id="1"
                                className="selectBox"
                                placeholder='Enter Warehouse ID'
                                defaultValue={district}
                                disabled={edit === true ? false : true}
                                onChange={(e) => { setdistrict(e.target.value) }}
                            ></input>

                        </div>

                        <div class={scheduleStyles.div2}>
                            <p> Tentative year of election</p>
                            <input
                                required
                                class={scheduleStyles.input}
                                type="number"
                                defaultValue={tentativeyear}
                                id="2"
                                className="selectBox"
                                disabled={edit === true ? false : true}
                                placeholder='Enter Year'
                                onChange={(e) => { settentativeyear(e.target.value) }}
                            ></input>
                        </div>

                        <div class={scheduleStyles.div3}>
                            <p> Manufacturer</p>
                            <input
                                required
                                class={scheduleStyles.input}
                                type="text"
                                defaultValue={manufcature}
                                id="3"
                                className="selectBox"
                                disabled={edit === true ? false : true}
                                placeholder='Full Name'
                                onChange={(e) => { setmanufcature(e.target.value) }}
                            ></input>
                        </div>


                        <div class={scheduleStyles.div4}>
                            <p> ElectionSupervisor</p>
                            <input
                                class={scheduleStyles.input}
                                required
                                type="text"
                                defaultValue={ecisupervisor}
                                id="4"
                                className="selectBox"
                                disabled={edit === true ? false : true}
                                placeholder='Full Name'
                                onChange={(e) => { setecisupervisor(e.target.value) }}
                            ></input>
                        </div>

                        <div class={scheduleStyles.div5}>
                            <p> Type of election</p>

                            {edit === false ?
                                <input
                                    class={scheduleStyles.dateInput}
                                    disabled={true}
                                    defaultValue={typeofelection}
                                    type="text"
                                    className=" selectBox"

                                ></input> :
                                <select
                                    //   required={!isTemporary}
                                    required
                                    name=""
                                    id="5"
                                    disabled={edit === true ? false : true}
                                    defaultValue={typeofelection}
                                    className=" selectBox"
                                    onChange={(e) => settypeofelection(e.target.value)}
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
                                        By elections-B
                                    </option>
                                </select>
                            }
                        </div>

                        <div class={scheduleStyles.div6}>
                            <p>Tentative month of election</p>
                            {edit === false ?
                                <input
                                    class={styles.dateInput}
                                    disabled={true}
                                    defaultValue={tentativemonth}
                                    type="text"
                                    className=" selectBox"

                                ></input> :
                                <select
                                    //   required={!isTemporary}
                                    required
                                    name=""
                                    id="6"
                                    disabled={edit === true ? false : true}
                                    className="selectBox"
                                    defaultValue={tentativemonth}
                                    onChange={(e) => { settentativemonth(e.target.value) }}
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
                            }
                        </div>

                        <div class={scheduleStyles.div7}>
                            <p>Manufacturer Email ID</p>
                            <input
                                class={scheduleStyles.input}
                                type="email"
                                id="7"
                                disabled={edit === true ? false : true}
                                className="selectBox"
                                placeholder='xyz@example.com'
                                defaultValue={manufcatureemailid}
                                onChange={(e) => { setmanufcatureemailid(e.target.value) }}
                            ></input>
                        </div>

                        <div class={scheduleStyles.div8}>
                            <p>Start date</p>
                            {edit === false ?
                                <input
                                    class={styles.dateInput}
                                    disabled={true}
                                    defaultValue={startdate}
                                    type="text"
                                    className=" selectBox"
                                ></input> :
                                <input
                                    class={styles.dateInput}
                                    defaultValue={startdate}
                                    type="date"
                                    id="8"
                                    className=" selectBox"
                                    onChange={(e) => { setstartdate(e.target.value) }}
                                ></input>
                            }
                        </div>

                        <div class={scheduleStyles.div9}>
                            <p>End date</p>

                            {edit === false ?
                                <input
                                    class={styles.dateInput}
                                    disabled={true}
                                    defaultValue={enddate}
                                    type="text"
                                    className=" selectBox"
                                ></input> :
                                <input
                                    class={styles.dateInput}
                                    defaultValue={enddate}
                                    type="date"
                                    id="9"
                                    className=" selectBox"
                                    onChange={(e) => { setenddate(e.target.value) }}
                                ></input>
                            }

                        </div>

                        <div class={scheduleStyles.div10}>
                            <p>Manufacturer Mobile No.</p>
                            <input
                                required
                                class={scheduleStyles.input}
                                type="number"
                                id="10"
                                className="selectBox"
                                defaultValue={manufcaturemobile}
                                disabled={edit === true ? false : true}
                                placeholder='Enter Number'
                                onChange={(e) => { setmanufcaturemobile(e.target.value) }}
                            ></input>
                        </div>

                        <div class={scheduleStyles.div11}>
                            <p>Number of Assigned Engineers: </p>
                            <input
                                required
                                class={scheduleStyles.dateInput}
                                type="number"
                                className=" selectBox"
                                disabled
                                value={rows_Assigned_Engineer.length}
                            ></input>
                        </div>
                        {
                            <div class={styles.div12}>
                                <p style={{ color: "white" }}>s </p>
                                <div onClick={() => { openModal(); }}
                                    style={{ padding: "10px", background: "white", color: "black", overflow: "hidden", display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                                >  <u> View Preparedness Certificate </u>  </div>
                            </div>
                        }
                        <Modal
                            isOpen={modalIsOpen}
                            onAfterOpen={afterOpenModal}
                            onRequestClose={closeModal}
                            style={customStyles}
                        >
                            <div id="root" className=''>
                                <div className='flex justify-center items-center'>
                                    {console.log("Name: ", photoFileName)}
                                    {console.log("DATA: ", photoFileData["data"])}
                                    {/* {<embed style={{ width: "600px", height: "600px", padding: "10px" }} src={``} />} */}
                                    {photoFileData["data"] && <embed style={{ width: "1000px", height: "800px", padding: "10px" }} src={`${photoFileData["data"]}`} />}
                                </div>
                                <button style={{ color: "white", }} onClick={closeModal}>Close</button>
                            </div>
                        </Modal>
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
                            {Role == 'Mfr-User' && manufacture_edit == false && <button className={scheduleStyles.editBtn} onClick={(e) => { manufacture_edit == true ? setmanufacture_edit(false) : setmanufacture_edit(true) }}> Edit </button>}

                        </div>
                        <div class={styles.Schedule_FLC_table}>
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
                                                    <td >
                                                        <input
                                                            className={styles.Assigned_Engineer_Tr}
                                                            value={assign_engineer_email[id]}
                                                            required
                                                            placeholder="Email ID"
                                                            type="email"
                                                            name="enggemail"
                                                            onChange={(e) => handleInputChange_Assigned_Engineer_email(e, id)}
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

export default EditFlc_Ceo_Manufacturer


import React, { useState, useEffect } from 'react'
import scheduleStyles from './styles/ScheduleFlc.module.css'
import Modal from 'react-modal';
import { getBase64 } from "../../assets/helper/FileHelpers";
function FlcEdit() {



    const [modalIsOpen_Preparedness_Certificate, setIsOpen_Preparedness_Certificate] = React.useState(false);
    const [modalIsOpen_flcreport, setIsOpen_flc_report] = React.useState(false);
    const [modalIsOpen_Acknowledgment, setIsOpen_Acknowledgment] = React.useState(false);
    const [modalIsOpen_Intimation_Letter] = React.useState(false);
    const [isenddateopen, setisenddateopen] = React.useState(0);
    const [IsLoading, setIsLoading] = useState(0);


    function openModal_Preparedness_Certificate() {
        setIsOpen_Preparedness_Certificate(true);
    }

    function afterOpenModal_Preparedness_Certificate() {
        // references are now sync'd and can be accessed.
        //   subtitle.style.color = '#f00';
    }

    function closeModal_Preparedness_Certificate() {
        setIsOpen_Preparedness_Certificate(false);
    }
    // ======================================================
    function openModal_flcreport() {
        setIsOpen_flc_report(true);
    }

    function afterOpenModal_flcreport() {
        // references are now sync'd and can be accessed.
        //   subtitle.style.color = '#f00';
    }

    function closeModal_flcreport() {
        setIsOpen_flc_report(false);
    }

    // ===================================================

    function openModal_Acknowledgment() {
        setIsOpen_Acknowledgment(true);
    }

    function afterOpenModal_Acknowledgment() {
        // references are now sync'd and can be accessed.
        //   subtitle.style.color = '#f00';
    }

    function closeModal_Acknowledgment() {
        setIsOpen_Acknowledgment(false);
    }

    // =====================================================

    function openModal_Intimation_Letter() {
        setIntimation_Letter(true);
    }

    function afterOpenModal_Intimation_Letter() {
        // references are now sync'd and can be accessed.
        //   subtitle.style.color = '#f00';
    }

    function closeModal_Intimation_Letter() {
        setIntimation_Letter(false);
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
        const URL = window.location.href;
        const arr = URL.split("/");
        const param = arr[arr.length - 1];
        const arr1 = param.split("=");
        return arr1[0];
    }



    const [edit, setEdit] = useState('')
    const [flc, setFlc] = useState([]);
    const [district, setdistrict] = useState('');
    const [flcsupervisoremailid, setflcsupervisoremailid] = useState('');
    const [flcsupervisormobno, setflcsupervisormobno] = useState('');
    const [flcsupervisorname, setflcsupervisorname] = useState('');
    const [flcvenue, setflcvenue] = useState('');
    const [manufacture, setmanufacture] = useState('')
    const [Manufacturer_State_Coordinator_Name, setManufacturer_State_Coordinator_Name] = useState('')
    const [Manufacturer_State_Coordinator_Email_ID, setManufacturer_State_Coordinator_Email_ID] = useState('')
    const [Manufacturer_State_Coordinator_Mobile_No, setManufacturer_State_Coordinator_Mobile_No] = useState('')
    const [manufacturerdistrictcoordinatoremailid, setmanufacturerdistrictcoordinatoremailid] = useState('')
    const [manufacturerdistrictcoordinatormobno, setmanufacturerdistrictcoordinatormobno] = useState('')
    const [manufacturerdistrictcoordinatorname, setmanufacturerdistrictcoordinatorname] = useState('')
    const [startdate, setstartdate] = useState('')
    const [startdateshow, setstartdateshow] = useState('')
    const [enddate, setenddate] = useState('')
    const [enddateshow, setenddateshow] = useState('')
    const [Tentative_Year_Of_Election, setTentative_Year_Of_Election] = useState('')
    const [Tentative_month_of_election, setTentative_month_of_election] = useState('')
    const [Type_of_election, setType_of_election] = useState('');
    const [numengineers, setnumengineers] = useState('');
    const [Type_of_election_sf, setType_of_election_sf] = useState('');
    const [photoFileData, setPhotoFileData] = useState("")
    const [photoFileName, setPhotoFileName] = useState("")
    const [flcreport, setflcreport] = useState("")
    const [flcreportname, setflcreportname] = useState("")
    const [Acknowledgmentname, setAcknowledgmentname] = useState("")
    const [inputflcreport, setinputflcreport] = useState(-1)
    const [inputphotoFileData, setinputphotoFileData] = useState(-1)
    const [Acknowledgment, setAcknowledgment] = useState("")
    const [InputAcknowledgment, setInputAcknowledgment] = useState(-1)
    const [Intimation_Letter, setIntimation_Letter] = useState("")
    const [ListFLC_Assembly_Warehouse, setListFLC_Assembly_Warehouse] = useState([]);
    const [ListDistrict_Strong_Room, setListDistrict_Strong_Room] = useState([]);
    const [ListDefective_Warehouse, setListDefective_Warehouse] = useState([]);
    const [FLC_Assembly_Warehouse, setFLC_Assembly_Warehouse] = useState('');
    const [District_Strong_Room, setDistrict_Strong_Room] = useState('');
    const [Defective_Warehouse, setDefective_Warehouse] = useState('');
    const User_ID = sessionStorage.getItem("sessionToken");
    const Role = User_ID.substring(8)

    async function getListN() {

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
                        "Type": 'N'
                    }),
                })

            const data = await response.json();
            setListFLC_Assembly_Warehouse(data["data"])
        } catch (error) {
            console.log(error)
        }

    }



    useEffect(
        () => {
            let timer1 = setTimeout(() => getListN(), 1 * 500);
            return () => {
                clearTimeout(timer1);
            };
        },
        []
    );



    async function getListD() {

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
                        "Type": 'D'
                    }),
                })

            const data = await response.json();
            setListDistrict_Strong_Room(data["data"])
        } catch (error) {
            console.log(error)
        }

    }


    useEffect(
        () => {
            let timer1 = setTimeout(() => getListD(), 1 * 1000);
            return () => {
                clearTimeout(timer1);
            };
        },
        []
    );
    async function getListK() {

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
                        "Type": 'K'
                    }),
                })

            const data = await response.json();
            console.log(data, 'datak')
            setListDefective_Warehouse(data["data"])
        } catch (error) {
            console.log(error)
        }

    }
    useEffect(
        () => {
            let timer1 = setTimeout(() => getListK(), 1 * 1500);
            return () => {
                clearTimeout(timer1);
            };
        },

        []
    );





    async function getFLC() {
        let id = issueId();
        try {
            const response = await fetch(
                `${process.env.REACT_APP_API_SERVER}/unit/viewFLC`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: 'include',
                    body: JSON.stringify(
                        {
                            flcId: id
                        }
                    )
                }
            );


            const data = await response.json();
            console.log(data, "viewflc")
            if (response.status === 200) {
                if (data['data'].length) {
                    setFlc((data['data'] !== null) ? data['data'] : [])
                    setdistrict((data['data'][0]['districtName'] !== null) ? data['data'][0]['districtName'] : '')
                    setmanufacture((data['data'][0]['manufacturer'] !== null) ? data['data'][0]['manufacturer'] : '')
                    setTentative_month_of_election((data['data'][0]['tentativemonth'] !== null) ? data['data'][0]['tentativemonth'] : '')
                    setTentative_Year_Of_Election((data['data'][0]['tentativeyear'] !== null) ? data['data'][0]['tentativeyear'] : '')
                    setManufacturer_State_Coordinator_Name((data['data'][0]['manufacturerstatecoordinatorname'] !== null) ? data['data'][0]['manufacturerstatecoordinatorname'] : '')
                    setManufacturer_State_Coordinator_Email_ID((data['data'][0]['manufacturerstatecoordinatoremailid'] !== null) ? data['data'][0]['manufacturerstatecoordinatoremailid'] : '')
                    setManufacturer_State_Coordinator_Mobile_No((data['data'][0]['manufacturerstatecoordinatormobno'] !== null) ? data['data'][0]['manufacturerstatecoordinatormobno'] : '')
                    setflcsupervisoremailid((data['data'][0]['flcsupervisoremailid'] !== null) ? data['data'][0]['flcsupervisoremailid'] : '')
                    setflcsupervisorname((data['data'][0]['flcsupervisorname'] !== null) ? data['data'][0]['flcsupervisorname'] : '')
                    setflcsupervisormobno((data['data'][0]['flcsupervisormobno'] !== null) ? data['data'][0]['flcsupervisormobno'] : '')
                    setflcvenue((data['data'][0]['flcvenue'] !== null) ? data['data'][0]['flcvenue'] : '')
                    setmanufacturerdistrictcoordinatoremailid((data['data'][0]['manufacturerdistrictcoordinatoremailid'] !== null) ? data['data'][0]['manufacturerdistrictcoordinatoremailid'] : '')
                    setmanufacturerdistrictcoordinatormobno((data['data'][0]['manufacturerdistrictcoordinatormobno'] !== null) ? data['data'][0]['manufacturerdistrictcoordinatormobno'] : '')
                    setmanufacturerdistrictcoordinatorname((data['data'][0]['manufacturerdistrictcoordinatorname'] !== null) ? data['data'][0]['manufacturerdistrictcoordinatorname'] : '')
                    setnumengineers((data['data'][0]['numengineers'] !== null) ? data['data'][0]['numengineers'] : 0)
                    setFLC_Assembly_Warehouse((data['data'][0]['flcassemblywarehouse']))
                    setDistrict_Strong_Room((data['data'][0]['districtstrongroom']))
                    setDefective_Warehouse((data['data'][0]['defectivewarehouse']))


                    if (data['data'][0]['startdate']) {
                        let StartDate = data['data'][0]['startdate'].split('T')[0];
                        setstartdate(StartDate.slice(6) + '-' + StartDate.slice(3, 5) + "-" + StartDate.slice(0, 2))
                        // setstartdate(data['data'][0]['startdate'])
                        setstartdateshow(data['data'][0]['startdate'])
                    }
                    if (data['data'][0]['enddate']) {
                        let EndDate = data['data'][0]['enddate'].split('T')[0];
                        setenddate(EndDate.slice(6) + '-' + EndDate.slice(3, 5) + "-" + EndDate.slice(0, 2))
                        // setenddate(data['data'][0]['enddate'])
                        setenddateshow(data['data'][0]['enddate'])
                    }

                    if (data['data'][0]['electiontype'] === 'GA') {
                        setType_of_election('General Assembly')
                        setType_of_election_sf('GA')
                    }
                    else if (data['data'][0]['electiontype'] === 'GP') {
                        setType_of_election('General Parliamentary')
                        setType_of_election_sf('GP')
                    }
                    else if (data['data'][0]['electiontype'] === 'BA') {
                        setType_of_election('By-poll Assembly')
                        setType_of_election_sf('BA')
                    }
                    else if (data['data'][0]['electiontype'] === 'BP') {
                        setType_of_election('By-poll Parliamentary')
                        setType_of_election_sf('BP')
                    }

                }
            }

        } catch (err) {
            console.log({ err });
        }
    }

    useEffect(
        () => {

            setIsLoading(1);
            let timer1 = setTimeout(() => getFLC(), 1 * 1000);

            return () => {
                clearTimeout(timer1);
            };
        },

        []
    );





    async function getpreparednesscertificate() {
        let id = issueId();
        try {
            const response = await fetch(
                `${process.env.REACT_APP_API_SERVER}/unit/getunitdocument`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: 'include',
                    body: JSON.stringify(
                        {
                            "fileType": "preparednessCertificate",
                            "flcID": Number(id)
                        }
                    )
                }
            );


            const data = await response.json();
            if (response.status === 200) {
                setPhotoFileData(data['data'])
                setinputphotoFileData(1)
            }

        } catch (err) {
            console.log({ err });
        }
    };

    useEffect(
        () => {
            let timer1 = setTimeout(() => getpreparednesscertificate(), 1 * 1500);
            return () => {
                clearTimeout(timer1);
            };
        },
        []
    );





    async function getflcreport() {
        let id = issueId();
        try {
            const response = await fetch(
                `${process.env.REACT_APP_API_SERVER}/unit/getunitdocument`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: 'include',
                    body: JSON.stringify(
                        {
                            "fileType": "flcReport",
                            "flcID": Number(id)
                        }
                    )
                }
            );


            const data = await response.json();

            if (response.status === 200) {
                setflcreport(data['data'])
                setinputflcreport(1)
            }

        } catch (err) {
            console.log({ err });
        }
    }

    useEffect(
        () => {
            let timer1 = setTimeout(() => getflcreport(), 1 * 500);
            return () => {
                clearTimeout(timer1);
            };
        },
        []
    );


    async function getacknowledgement() {
        let id = issueId();
        try {
            const response = await fetch(
                `${process.env.REACT_APP_API_SERVER}/unit/getunitdocument`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: 'include',
                    body: JSON.stringify(
                        {
                            "fileType": "acknowledgement",
                            "flcID": Number(id)
                        }
                    )
                }
            );


            const data = await response.json();

            if (response.status === 200) {
                setAcknowledgment(data['data'])
                setInputAcknowledgment(1);
            }

        } catch (err) {
            console.log({ err });
        }
    }

    useEffect(
        () => {
            let timer1 = setTimeout(() => getacknowledgement(), 1 * 1000);
            return () => {
                clearTimeout(timer1);
            };
        },
        []
    );



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


    async function postFlc() {

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
                        "flcId": Number(id),
                        "manufacturer": manufacture,
                        "manufacturerStateCoordinatorName": Manufacturer_State_Coordinator_Name,
                        "manufacturerStateCoordinatorMobNo": Manufacturer_State_Coordinator_Mobile_No,
                        "manufacturerStateCoordinatorEmailId": Manufacturer_State_Coordinator_Email_ID,
                        "manufacturerDistrictCoordinatorName": manufacturerdistrictcoordinatorname,
                        "manufacturerDistrictCoordinatorMobNo": manufacturerdistrictcoordinatormobno,
                        "manufacturerDistrictCoordinatorEmailId": manufacturerdistrictcoordinatoremailid,
                        "flcSupervisorName": flcsupervisorname,
                        "flcSupervisorMobNo": flcsupervisormobno,
                        "flcSupervisorEmailId": flcsupervisoremailid,
                        "numEngineers": numengineers,
                        "startDate": startdate ? startdate.slice(8) + '-' + startdate.slice(5, 7) + "-" + startdate.slice(0, 4) : '',
                        "endDate": enddate ? enddate.slice(8) + '-' + enddate.slice(5, 7) + "-" + enddate.slice(0, 4) : '',
                        "flcVenue": flcvenue,
                        "flcassemblywarehouse": FLC_Assembly_Warehouse ? FLC_Assembly_Warehouse : '',
                        "districtstrongroom": District_Strong_Room ? District_Strong_Room : '',
                        "defectivewarehouse": Defective_Warehouse ? Defective_Warehouse : '',
                    }),
                }
            );

            const data = await response.json();
            if (data["message"] === "Success") {
                document.getElementById("form").reset();
                alert("Successful");
                window.location.pathname = "/session/unitmanagement/flc_list";
            } else {
                alert("Edit Failed! ");
            }
        } catch (err) {
            console.log(err);
        }
    }

    // "flcID": "42",
    // "manufacturerDistrictCoordinatorName": "sushant",
    // "manufacturerDistrictCoordinatorMobNo": "8805619501",
    // "manufacturerDistrictCoordinatorEmailId": "str4ing@gmail.com",
    // "flcSupervisorName": "sushant",
    // "flcSupervisorMobNo": "8805619501",
    // "flcSupervisorEmailId": "str4ing@gmail.com",
    // "numEngineers": "11",
    // "flcVenue": "address"

    async function postFlcdistrict() {

        try {
            let id = issueId();

            const response = await fetch(
                `${process.env.REACT_APP_API_SERVER}/unit/flcDistrictDetails`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: 'include',
                    body: JSON.stringify({
                        "flcID": String(id),
                        "manufacturerDistrictCoordinatorName": manufacturerdistrictcoordinatorname,
                        "manufacturerDistrictCoordinatorMobNo": manufacturerdistrictcoordinatormobno,
                        "manufacturerDistrictCoordinatorEmailId": manufacturerdistrictcoordinatoremailid,
                        "flcSupervisorName": flcsupervisorname,
                        "flcSupervisorMobNo": flcsupervisormobno,
                        "flcSupervisorEmailId": flcsupervisoremailid,
                        "numEngineers": numengineers,
                        "flcVenue": flcvenue,
                        "flcassemblywarehouse": FLC_Assembly_Warehouse,
                        "districtstrongroom": District_Strong_Room,
                        "defectivewarehouse": Defective_Warehouse
                    }),
                }
            );

            // const data = await response.json();
            if (response.status === 200) {
                document.getElementById("form").reset();
                alert("Successful");
                window.location.pathname = "/session/unitmanagement/flc_list";
            } else {
                alert("Edit Failed! ");

            }
        } catch (err) {
            console.log(err);
        }
    }


    async function FinalSetEndDate(val) {
        try {
            let id = issueId();
            const response = await fetch(
                `${process.env.REACT_APP_API_SERVER}/unit/flcEndDateEdit`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: 'include',
                    body: JSON.stringify({
                        "endDate": val ? val.slice(8) + '-' + val.slice(5, 7) + "-" + val.slice(0, 4) : '',
                        "flcId": Number(id)
                    }),
                }
            );

            // const data = await response.json()x;
            if (response.status === 200) {
                setisenddateopen(0);
            }

        } catch (err) {
            console.log(err);
        }
    }



    const SetEndDate = async (e) => {
        const date = e.target.value;
        e.preventDefault();
        setenddate(date)
        setenddateshow(((date) ? date.slice(8) + '-' + date.slice(5, 7) + "-" + date.slice(0, 4) : ''))
        if (isenddateopen === 1 || Role === 'CEO')
            FinalSetEndDate(e.target.value);
    };


    async function SubmitAcknowledgment() {

        setInputAcknowledgment(1);

        try {
            let id = issueId();
            const response = await fetch(
                `${process.env.REACT_APP_API_SERVER}/unit/uploadUnitDocument`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: 'include',
                    body: JSON.stringify({
                        "fileType": "acknowledgement",
                        "flcID": Number(id),
                        "fileData": Acknowledgment
                    }),
                }
            );

            const data = await response.json();
            if (data["message"] === "Success") {
                document.getElementById("form").reset();
                alert("Successful");
                window.location.pathname = "/session/unitmanagement/flc_list";
            } else {
                alert("Edit Failed! ");

            }
        } catch (err) {
            console.log(err);
        }
    }



    const UploadAcknowledgment = async (e) => {
        e.preventDefault();
        SubmitAcknowledgment();
    };

    async function SubmitPreparednesscertificate() {

        setinputphotoFileData(1);

        try {
            let id = issueId();
            const response = await fetch(
                `${process.env.REACT_APP_API_SERVER}/unit/uploadUnitDocument`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: 'include',
                    body: JSON.stringify({
                        "fileType": "preparednessCertificate",
                        "flcID": Number(id),
                        "fileData": photoFileData
                    }),
                }
            );

            const data = await response.json();
            if (data["message"] === "Success") {
                document.getElementById("form").reset();
                alert("Successful");
                window.location.pathname = "/session/unitmanagement/flc_list";
            } else {
                alert("Edit Failed! ");

            }
        } catch (err) {
            console.log(err);
        }
    }

    const Uploadpreparednesscertificate = async (e) => {
        e.preventDefault();
        SubmitPreparednesscertificate();
    };



    async function SubmitFlcReport() {
        setinputflcreport(1)
        try {
            let id = issueId();
            const response = await fetch(
                `${process.env.REACT_APP_API_SERVER}/unit/uploadUnitDocument`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: 'include',
                    body: JSON.stringify({
                        "fileType": "flcReport",
                        "flcID": Number(id),
                        "fileData": flcreport
                    }),
                }
            );

            const data = await response.json();

            if (data["message"] === "Success") {
                document.getElementById("form").reset();
                alert("Successful");
                window.location.pathname = "/session/unitmanagement/flc_list";
            } else {
                alert("Edit Failed! ");
            }
        } catch (err) {
            console.log(err);
        }
    }


    const UploadFlcReport = async (e) => {
        e.preventDefault();
        SubmitFlcReport();
    };


    const onFormSubmit = async (e) => {

        e.preventDefault();
        if (Role === 'CEO')
            postFlc();
        else if (Role === "DEO") {
            postFlcdistrict()
        }

    };


    return (
        <>
            {(Role === 'CEO') && edit === '' &&
                <button className="text-white mb-4 flex"
                    onClick={() => { setEdit(Role) }}
                >
                    Edit Flc Schedule
                </button>
            }
            <form id="form">
                <div className={scheduleStyles.Schedule_container}>
                    <div className={scheduleStyles.Schedule_header}>
                        <h4>
                            FLC
                        </h4>
                    </div>

                    <div class={scheduleStyles.parent}>
                        <div class={scheduleStyles.div1}>
                            <p> Type of election</p>
                            <input
                                class={scheduleStyles.dateInput}
                                disabled={true}
                                value={Type_of_election}
                                onChange={(e) => { setType_of_election(e.target.value) }}
                                type="text"
                                className=" selectBox"
                                placeholder='Type of election'
                            ></input>
                        </div>

                        <div class={scheduleStyles.div2}>
                            <p>Tentative month of election</p>
                            <input
                                class={scheduleStyles.dateInput}
                                disabled={true}
                                value={Tentative_month_of_election}
                                type="text"
                                className=" selectBox"
                                placeholder='Tentative month of election'
                            ></input>
                        </div>


                        <div class={scheduleStyles.div3}>
                            <p> Tentative year of election</p>
                            <input
                                class={scheduleStyles.numberfield}
                                type="number"
                                value={Tentative_Year_Of_Election}
                                onChange={(e) => { setTentative_Year_Of_Election(e) }}
                                id="3"
                                disabled={true}
                                placeholder='Enter Year'
                            ></input>

                        </div>

                        <div class={scheduleStyles.div4}>
                            <p>District</p>
                            <input
                                disabled
                                class={scheduleStyles.input}
                                type="text"
                                id="1"
                                className="selectBox"
                                placeholder='Enter District'
                                value={district}
                                onChange={(e) => { setdistrict(e.target.value) }}
                            ></input>

                        </div>

                        <div class={scheduleStyles.div5}>
                            <p>Start date</p>
                            {edit === 'CEO' ?
                                <input
                                    class={scheduleStyles.dateInput}
                                    type="date"
                                    className=" selectBox"
                                    value={startdate}
                                    placeholder='Start Date'
                                    required pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"
                                    onChange={(e) => {
                                        setstartdate(e.target.value)
                                    }}
                                    disabled={edit === 'CEO' ? false : true}
                                    id="10"
                                ></input>
                                :
                                <input
                                    class={scheduleStyles.dateInput}
                                    value={startdateshow}
                                    type="text"
                                    className=" selectBox"
                                    placeholder='Start Date'
                                    disabled={edit === 'CEO' ? false : true}
                                ></input>
                            }
                        </div>

                        <div class={(Role === 'DEO' || isenddateopen === 1) ? scheduleStyles.div6_DEO : scheduleStyles.div6_CEO}>
                            <p>End date</p>
                            {(isenddateopen === 1 || edit === 'CEO') ?
                                <input
                                    class={scheduleStyles.dateInput}
                                    type="date"
                                    className=" selectBox"
                                    value={enddate}
                                    placeholder='End Date'
                                    required pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"
                                    onChange={(e) => {
                                        SetEndDate(e)
                                    }}
                                    disabled={(edit === 'CEO' || isenddateopen === 1) ? false : true}
                                    id="10"
                                ></input>
                                :
                                <input
                                    class={scheduleStyles.dateInput}
                                    value={enddateshow}
                                    type="text"
                                    className=" selectBox"
                                    placeholder='End Date'
                                    disabled={true}
                                ></input>
                            }
                        </div>

                        {isenddateopen === 0 && Role === 'DEO' &&
                            <div class={scheduleStyles.enddatediv}>
                                <div class={scheduleStyles.enddatebutton} onClick={(e) => { setisenddateopen(1) }}> Edit</div>
                            </div>
                        }

                        <div class={scheduleStyles.div7}>
                            <p> Manufacturer State Coordinator Name</p>
                            <input
                                class={scheduleStyles.input}
                                type="text"
                                id="7"
                                disabled={edit === 'CEO' ? false : true}
                                className="selectBox"
                                placeholder='Enter Full Name'
                                value={Manufacturer_State_Coordinator_Name}
                                onChange={(e) => { setManufacturer_State_Coordinator_Name(e.target.value) }}
                            ></input>
                        </div>

                        <div class={scheduleStyles.div8}>
                            <p> Manufacturer State Coordinator EmailID</p>
                            <input
                                class={scheduleStyles.input}
                                type="email"
                                id="8"
                                disabled={edit === 'CEO' ? false : true}
                                className="selectBox"
                                placeholder='xyz@example.com'
                                value={Manufacturer_State_Coordinator_Email_ID}
                                onChange={(e) => { setManufacturer_State_Coordinator_Email_ID(e.target.value) }}
                            ></input>
                        </div>

                        <div class={scheduleStyles.div9}>
                            <p> Manufacturer State Coordinator Mobile No.</p>
                            <input
                                class={scheduleStyles.numberfield}
                                type="number"
                                id="7"
                                disabled={edit === 'CEO' ? false : true}
                                placeholder='Enter Mobile No.'
                                value={Manufacturer_State_Coordinator_Mobile_No}
                                onChange={(e) => { setManufacturer_State_Coordinator_Mobile_No(e.target.value) }}
                            ></input>
                        </div>


                        <div class={scheduleStyles.div10}>
                            <p> Manufacturer</p>
                            <input
                                class={scheduleStyles.input}
                                type="text"
                                placeholder='Manufacturer'
                                value={manufacture}
                                onChange={(e) => { setmanufacture(e.target.value) }}
                                id="4"
                                className="selectBox"
                                disabled={edit === 'CEO' ? false : true}
                            ></input>
                        </div>

                        {Role === "DEO" && edit === '' &&

                            <div class={scheduleStyles.div13}>
                                <button className="text-white mb-4 flex"
                                    onClick={() => { setEdit(Role) }}
                                >
                                    Edit Flc Schedule
                                </button>
                            </div>
                        }

                        <div class={scheduleStyles.div14}>
                            <p>Number Of Engineer</p>
                            <input
                                class={scheduleStyles.numberfield}
                                type="number"
                                id="7"
                                disabled={edit === 'CEO' || edit === 'DEO' ? false : true}
                                placeholder='Number Of Engineer'
                                value={numengineers}
                                onChange={(e) => { setnumengineers(e.target.value) }}
                            ></input>
                        </div>

                        <div class={scheduleStyles.div15}>
                            <p>Flc venue</p>
                            <input

                                class={scheduleStyles.input}
                                type="text"
                                id="7"
                                disabled={edit === 'CEO' || edit === 'DEO' ? false : true}
                                className="selectBox"
                                placeholder='Flc Venue'
                                value={flcvenue}
                                onChange={(e) => { setflcvenue(e.target.value) }}
                            ></input>
                        </div>

                        <div class={scheduleStyles.div16}>
                            <p> Flc Supervisor Name</p>
                            <input

                                class={scheduleStyles.input}
                                type="text"
                                id="7"
                                disabled={edit === 'CEO' || edit === 'DEO' ? false : true}
                                className="selectBox"
                                placeholder='Flc Supervisor Name'
                                value={flcsupervisorname}
                                onChange={(e) => { setflcsupervisorname(e.target.value) }}
                            ></input>
                        </div>

                        <div class={scheduleStyles.div17}>
                            <p>flc Supervisor Email ID</p>
                            <input

                                class={scheduleStyles.input}
                                type="email"
                                id="7"
                                disabled={edit === 'CEO' || edit === 'DEO' ? false : true}
                                placeholder='Flc Supervisor Email ID'
                                value={flcsupervisoremailid}
                                onChange={(e) => { setflcsupervisoremailid(e.target.value) }}
                            ></input>
                        </div>

                        <div class={scheduleStyles.div18}>
                            <p>Flc Supervisor Mobile No.</p>
                            <input

                                class={scheduleStyles.numberfield}
                                type="number"
                                id="7"
                                disabled={edit === 'CEO' || edit === 'DEO' ? false : true}
                                placeholder='Flc Supervisor Mobile No.'
                                value={flcsupervisormobno}
                                onChange={(e) => { setflcsupervisormobno(e.target.value) }}
                            ></input>
                        </div>


                        <div class={scheduleStyles.div19}>
                            <p> Manufacturer district coordinator Name</p>
                            <input

                                class={scheduleStyles.input}
                                type="text"
                                id="7"
                                disabled={edit === 'CEO' || edit === 'DEO' ? false : true}
                                className="selectBox"
                                placeholder='Enter Full Name'
                                value={manufacturerdistrictcoordinatorname}
                                onChange={(e) => { setmanufacturerdistrictcoordinatorname(e.target.value) }}
                            ></input>
                        </div>

                        <div class={scheduleStyles.div20}>
                            <p> Manufacturer district coordinator Email ID</p>
                            <input

                                class={scheduleStyles.input}
                                type="email"
                                id="7"
                                disabled={edit === 'CEO' || edit === 'DEO' ? false : true}
                                className="selectBox"
                                placeholder='Enter Email ID'
                                value={manufacturerdistrictcoordinatoremailid}
                                onChange={(e) => { setmanufacturerdistrictcoordinatoremailid(e.target.value) }}
                            ></input>
                        </div>

                        <div class={scheduleStyles.div21}>
                            <p> Manufacturer district coordinator Mobile No.</p>
                            <input
                                class={scheduleStyles.numberfield}
                                type="number"
                                id="7"
                                disabled={edit === 'CEO' || edit === 'DEO' ? false : true}
                                placeholder='Enter Mobile Number'
                                value={manufacturerdistrictcoordinatormobno}
                                onChange={(e) => { setmanufacturerdistrictcoordinatormobno(e.target.value) }}
                            ></input>
                        </div>
                        <div class={scheduleStyles.div22}>
                            <p> FLC Assembly Warehouse</p>
                            <select
                                onChange={(e) => { setFLC_Assembly_Warehouse(e.target.value) }}
                                disabled={edit === 'CEO' || edit === 'DEO' ? false : true}
                                value={FLC_Assembly_Warehouse}
                                placeholder='Select FLC Assembly Warehouse'
                            >
                                {" "}
                                <option hidden>select</option>
                                {ListFLC_Assembly_Warehouse &&
                                    ListFLC_Assembly_Warehouse.map((val, ind) => {
                                        return (<>
                                            <option value={val['warehouseid']}>{val['warehouseid']}</option>
                                        </>)
                                    })}
                            </select>
                        </div>
                        <div class={scheduleStyles.div23}>
                            <p> District Strong Room</p>
                            <select
                                onChange={(e) => { setDistrict_Strong_Room(e.target.value) }}
                                disabled={edit === 'CEO' || edit === 'DEO' ? false : true}
                                value={District_Strong_Room}
                                placeholder='Select District Strong Room'
                            >
                                {" "}
                                <option hidden>select</option>
                                {ListDistrict_Strong_Room &&
                                    ListDistrict_Strong_Room.map((val, ind) => {
                                        return (<>
                                            <option value={val['warehouseid']}>{val['warehouseid']}</option>
                                        </>)
                                    })}
                            </select>
                        </div>
                        <div class={scheduleStyles.div24}>
                            <p> Defective Warehouse</p>
                            <select
                                onChange={(e) => { setDefective_Warehouse(e.target.value) }}
                                disabled={edit === 'CEO' || edit === 'DEO' ? false : true}
                                value={Defective_Warehouse}
                                placeholder='Select Defective Warehouse'
                            >
                                {" "}
                                <option hidden>select</option>
                                {ListDefective_Warehouse &&
                                    ListDefective_Warehouse.map((val, ind) => {
                                        return (<>
                                            <option value={val['warehouseid']}>{val['warehouseid']}</option>
                                        </>)
                                    })}
                            </select>
                        </div>
                    </div>

                    <>
                        {edit === 'CEO' || edit === 'DEO' ?
                            <button class={scheduleStyles.submitBtn} onClick={onFormSubmit}> Submit </button>

                            : " "}
                    </>
                    <div className={scheduleStyles.parent3}>
                        <label htmlFor="" style={{ paddingTop: "11px", fontSize: "20px", marginRight: '53%' }}>  Preparedness Certificate: </label>
                        {photoFileData !== '' && inputphotoFileData === 1 &&
                            <div onClick={openModal_Preparedness_Certificate}
                                style={{ marginRight: '60%', background: "white", color: "black", overflow: "hidden", display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                            ><u>View Preparedness Certificate</u></div>
                        }

                        {photoFileData === '' && Role !== 'DEO' &&
                            <div
                                style={{ marginRight: '79%', background: "white", color: "black", overflow: "hidden", display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                            >  <u> Not Uploaded </u>  </div>
                        }

                        {photoFileData === '' && inputphotoFileData === -1 && Role === 'DEO' &&
                            <input
                                id="formUserImage"
                                type="file"
                                required
                                onChange={async (e) => {
                                    setPhotoFileName(e.target.value.replace(/^.*[\\/]/, ''))
                                    setPhotoFileData(await getBase64(e.target.files[0]))
                                }}
                            />
                        }

                        {photoFileData !== '' && inputphotoFileData === -1 && Role === 'DEO' &&
                            <button class={scheduleStyles.uploadBtn} onClick={Uploadpreparednesscertificate}> Upload </button>
                        }

                        <Modal
                            isOpen={modalIsOpen_Preparedness_Certificate}
                            onAfterOpen={afterOpenModal_Preparedness_Certificate}
                            onRequestClose={closeModal_Preparedness_Certificate}
                            style={customStyles}
                        >
                            <div id="root" className=''>
                                <div className='flex justify-center items-center'>
                                    {<embed style={{ width: "600px", height: "600px", padding: "10px" }} src={`${photoFileData}`} />}
                                </div>
                                <button style={{ color: "white", }} onClick={closeModal_Preparedness_Certificate}>Close</button>
                            </div>
                        </Modal>
                        {/* <label htmlFor="" style={{ paddingTop: "11px", fontSize: "20px", marginRight: '53%' }}> Preparedness Certificate: </label>
                        <div onClick={openModal_Preparedness_Certificate}
                            style={{ marginRight: '61%', background: "white", color: "black", overflow: "hidden", display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                        >  <u> View Preparedness Certificate </u>  </div>

                        <Modal
                            isOpen={modalIsOpen_Preparedness_Certificate}
                            onAfterOpen={afterOpenModal_Preparedness_Certificate}
                            onRequestClose={closeModal_Preparedness_Certificate}
                            style={customStyles}
                        >
                            <div id="root" className=''>
                                <div className='flex justify-center items-center'>
                                    {<embed style={{ width: "600px", height: "600px", padding: "10px" }} src={`${photoFileData}`} />}
                                </div>
                                <button style={{ color: "white", }} onClick={closeModal_Preparedness_Certificate}>Close</button>
                            </div>
                        </Modal> */}

                        <label htmlFor="" style={{ paddingTop: "11px", fontSize: "20px", marginRight: '67%' }}>  Intimation Letter: </label>
                        <div onClick={openModal_Intimation_Letter}
                            style={{ marginRight: '86%', background: "white", color: "black", overflow: "hidden", display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                        >  <u> Generate </u>  </div>

                        <Modal
                            isOpen={modalIsOpen_Intimation_Letter}
                            onAfterOpen={afterOpenModal_Intimation_Letter}
                            onRequestClose={closeModal_Intimation_Letter}
                            style={customStyles}
                        >
                            <div id="root" className=''>
                                <div className='flex justify-center items-center'>
                                    {<embed style={{ width: "600px", height: "600px", padding: "10px" }} src={`${Intimation_Letter}`} />}
                                </div>
                                <button style={{ color: "white", }} onClick={closeModal_Intimation_Letter}>Close</button>
                            </div>
                        </Modal>

                        <label htmlFor="" style={{ paddingTop: "11px", fontSize: "20px", marginRight: '65%' }}>  Acknowledgment: </label>
                        {Acknowledgment !== '' && InputAcknowledgment === 1 &&
                            <div onClick={openModal_Acknowledgment}
                                style={{ marginRight: '70%', background: "white", color: "black", overflow: "hidden", display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                            ><u>View Acknowledgment</u></div>
                        }

                        {Acknowledgment === '' && Role !== 'DEO' &&
                            <div
                                style={{ marginRight: '79%', background: "white", color: "black", overflow: "hidden", display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                            >  <u> Not Uploaded </u>  </div>
                        }

                        {Acknowledgment === '' && InputAcknowledgment === -1 && Role === 'DEO' &&
                            <input
                                id="formUserImage"
                                type="file"
                                required
                                onChange={async (e) => {
                                    setAcknowledgmentname(e.target.value.replace(/^.*[\\/]/, ''))
                                    setAcknowledgment(await getBase64(e.target.files[0]))
                                }}
                            />
                        }

                        {Acknowledgment !== '' && InputAcknowledgment === -1 && Role === 'DEO' &&
                            <button class={scheduleStyles.uploadBtn} onClick={UploadAcknowledgment}> Upload </button>
                        }

                        <Modal
                            isOpen={modalIsOpen_Acknowledgment}
                            onAfterOpen={afterOpenModal_Acknowledgment}
                            onRequestClose={closeModal_Acknowledgment}
                            style={customStyles}
                        >
                            <div id="root" className=''>
                                <div className='flex justify-center items-center'>
                                    {<embed style={{ width: "600px", height: "600px", padding: "10px" }} src={`${Acknowledgment}`} />}
                                </div>
                                <button style={{ color: "white", }} onClick={closeModal_Acknowledgment}>Close</button>
                            </div>
                        </Modal>

                        <label htmlFor="" style={{ paddingTop: "11px", fontSize: "20px", marginRight: '79%' }}>  Flc Report: </label>

                        {flcreport !== '' && inputflcreport === 1 &&
                            <div onClick={openModal_flcreport}
                                style={{ marginRight: '79%', background: "white", color: "black", overflow: "hidden", display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                            >  <u> View Flc Report </u>  </div>
                        }

                        {flcreport === '' && Role !== 'DEO' &&
                            <div
                                style={{ marginRight: '79%', background: "white", color: "black", overflow: "hidden", display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                            >  <u> Not Uploaded </u>  </div>
                        }

                        {flcreport === '' && inputflcreport === -1 && Role === 'DEO' &&
                            <input
                                id="formUserImage"
                                type="file"
                                required
                                onChange={async (e) => {
                                    setflcreportname(e.target.value.replace(/^.*[\\/]/, ''))
                                    setflcreport(await getBase64(e.target.files[0]))
                                }}
                            />
                        }

                        {flcreport !== '' && inputflcreport === -1 && Role === 'DEO' &&
                            <button class={scheduleStyles.uploadBtn} onClick={UploadFlcReport}> Upload </button>
                        }

                        <Modal
                            isOpen={modalIsOpen_flcreport}
                            onAfterOpen={afterOpenModal_flcreport}
                            onRequestClose={closeModal_flcreport}
                            style={customStyles}
                        >
                            <div id="root" className=''>
                                <div className='flex justify-center items-center'>
                                    {<embed style={{ width: "600px", height: "600px", padding: "10px" }} src={`${flcreport}`} />}
                                </div>
                                <button style={{ color: "white", }} onClick={closeModal_flcreport}>Close</button>
                            </div>
                        </Modal>
                    </div>
                </div>

            </form>
        </>

    )



}

export default FlcEdit
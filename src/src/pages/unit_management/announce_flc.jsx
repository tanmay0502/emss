import React, { useState, useEffect } from 'react'
// import { DynamicDataTable } from '@langleyfoxall/react-dynamic-data-table'
import styles from './styles/announce_flc.module.css'
import { AiOutlineClose } from "react-icons/ai"
import Modal from 'react-modal';
import { formatRealm2 } from '../../components/utils';

function Announce_Flc() {

    var currentdate = new Date();
    var hrs = currentdate.getHours();
    var mins = currentdate.getMinutes();
    var secs = currentdate.getSeconds();
    const [District, setDistrict] = useState([])
    // const [details, setDetails] = useState([])
    const [details, setDetails] = useState([])
    const [listElections, setListElections] = useState([])
    const [electionid, setelectionid] = useState(-1)
    const [manufacture, setmanufacture] = useState('')
    const [Manufacturer_State_Coordinator_Name, setManufacturer_State_Coordinator_Name] = useState('')
    const [Manufacturer_State_Coordinator_Email_ID, setManufacturer_State_Coordinator_Email_ID] = useState('')
    const [Manufacturer_State_Coordinator_Mobile_No, setManufacturer_State_Coordinator_Mobile_No] = useState('')
    const [startdate, setstartdate] = useState('')
    const [enddate, setendate] = useState('')
    const [Tentative_Year_Of_Election, setTentative_Year_Of_Election] = useState('')
    const [Tentative_month_of_election, setTentative_month_of_election] = useState('')
    const [Type_of_election, setType_of_election] = useState('');
    const [Type_of_election_sf, setType_of_election_sf] = useState('');
    const [selectedDistricts, setSelectedDistricts] = useState([])
    const [selectedDistrictssf, setSelectedDistrictssf] = useState([])
    const [preparednessStatistics, setpreparednessStatistics] = useState([])
    const [photoFileData, setPhotoFileData] = useState("")
    // const [flcid, setflcid] = useState(-1)
    const [modalIsOpen, setIsOpen] = React.useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        //   subtitle.style.color = '#f00';
    }

    function closeModal() {
        setPhotoFileData('')
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

    // const issueId = () => {
    //     const URL = window.location.href;
    //     const arr = URL.split("/");
    //     const param = arr[arr.length - 1];
    //     const arr1 = param.split("=");
    //     return arr1[0];
    // }


    if (hrs < 10) {
        hrs = "0" + hrs;

    }
    if (mins < 10) {
        mins = "0" + mins;
    }
    if (secs < 10) {
        secs = "0" + secs;
    }

    // var time = hrs + ":"
    //     + mins + ":"
    //     + secs;


    // async function getList() {


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
                        "operation": "AnnounceFLC"
                    }),
                }
            )

            const data = await response.json();
            console.log(data)
            if (response.status === 200) {
                let distList = formatRealm2(data['data'], window.sessionStorage.getItem("sessionToken").substring(0, 2), "", "", "");
                console.log("adi", distList)
                setDistrict(distList);
            }
        } catch (error) {
            console.log(error)
        }
    }


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
            console.log(data)
            if (response.status == 200) {
                setListElections(data['data'])
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




    async function getList() {

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
                    }),
                })

            const data = await response.json();
            setDetails(data["data"])

        } catch (error) {
            console.log(error)
        }
    }
    useEffect(
        () => {
            let timer1 = setTimeout(() => getList(), 1 * 1000);

            return () => {
                clearTimeout(timer1);
            };
        },
        [setDetails]
    );


    useEffect(
        () => {
            let timer1 = setTimeout(() => getDistrictsList(), 1 * 1000);

            return () => {
                clearTimeout(timer1);
            };
        },
        []
    );



    async function getpreparednessStatistics(id_election) {

        if (id_election !== -1) {
            try {
                const response = await fetch(
                    `${process.env.REACT_APP_API_SERVER}/unit/preparednessStatistics`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        credentials: 'include',
                        body: JSON.stringify(
                            {
                                "electionID": Number(id_election)
                            }
                        )
                    }
                );


                const data = await response.json();

                if (response.status === 200) {
                    setpreparednessStatistics(data['data'])
                }

            } catch (err) {
                console.log({ err });
            }
        }
    }


    useEffect(
        () => {

            let timer1 = setTimeout(() => getpreparednessStatistics(electionid), 1 * 1000);

            return () => {
                clearTimeout(timer1);
            };
        },
        [electionid]
    );


    async function getpreparednesscertificate(id) {
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
                openModal()
            }
        } catch (err) {
            console.log({ err });
        }
    }


    // useEffect(
    //     () => {
    //         let timer1 = setTimeout(() => openModal(), 1 * 1000);

    //         return () => {
    //             clearTimeout(timer1);
    //         };
    //     },
    //     [photoFileData]
    // );


    const setDistrictFunction = (e) => {

        if (!selectedDistricts.includes(District[e.target.value]['dtName'])) {
            setSelectedDistricts([...selectedDistricts, District[e.target.value]['dtName']])
            setSelectedDistrictssf([...selectedDistrictssf, District[e.target.value]['dtCode']])
        }
    }

    console.log(District, 'DistrictDistrict')

    const handleInputChange = (e) => {
        let month = listElections[e.target.value].startdate.slice(3, 5);
        setelectionid(Number(listElections[e.target.value]['election_id']));
        setTentative_Year_Of_Election(listElections[e.target.value]['startdate'].slice(6, 11));


        // set Type of election 
        if (listElections[e.target.value]['electiontype'] === 'GP') {
            setType_of_election('General Parliamentary')
            setType_of_election_sf('GP')
        }
        else if (listElections[e.target.value]['electiontype'] === 'GA') {
            setType_of_election('General Assembly')
            setType_of_election_sf('GA')
        }
        else if (listElections[e.target.value]['electiontype'] === 'BA') {
            setType_of_election('By-Poll Assembly')
            setType_of_election_sf('BA')
        }
        else if (listElections[e.target.value]['electiontype'] === 'BP') {
            setType_of_election('By-Poll Parliamentary')
            setType_of_election_sf('BP')
        }


        // set month of election 

        if (month === "01") {
            setTentative_month_of_election("January")
        }
        else if (month === "02") {
            setTentative_month_of_election("February")
        }
        else if (month === "03") {
            setTentative_month_of_election("March")
        }
        else if (month === "04") {
            setTentative_month_of_election("April")
        }
        else if (month === "05") {
            setTentative_month_of_election("May")
        }
        else if (month === "06") {
            setTentative_month_of_election("June")
        }
        else if (month === "07") {
            setTentative_month_of_election("July")
        }
        else if (month === "08") {
            setTentative_month_of_election("August")
        }
        else if (month === "09") {
            setTentative_month_of_election("September")
        }
        else if (month === "10") {
            setTentative_month_of_election("October")
        }
        else if (month === "11") {
            setTentative_month_of_election("November")
        }
        else if (month === "12") {
            setTentative_month_of_election("December")
        }

    };

    console.log({
        "district": selectedDistrictssf,
        "manufacturer": manufacture,
        "manufacturerStateCoordinatorName": Manufacturer_State_Coordinator_Name,
        "manufacturerStateCoordinatorMobNo": Manufacturer_State_Coordinator_Mobile_No,
        "manufacturerStateCoordinatorEmailId": Manufacturer_State_Coordinator_Email_ID,
        "startDate": startdate ? startdate.slice(8) + '-' + startdate.slice(5, 7) + "-" + startdate.slice(0, 4) : '',
        "endDate": enddate ? enddate.slice(8) + '-' + enddate.slice(5, 7) + "-" + enddate.slice(0, 4) : '',
        "tentativeYear": Tentative_Year_Of_Election,
        "tentativeMonth": Tentative_month_of_election,
        "electionType": Type_of_election_sf,
        "electionID": electionid
    })
    async function AnnounceFLC() {

        if (electionid !== -1) {

            try {
                const response = await fetch(
                    `${process.env.REACT_APP_API_SERVER}/unit/flc_announce`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        credentials: 'include',
                        body: JSON.stringify({
                            "district": selectedDistrictssf,
                            "manufacturer": manufacture,
                            "manufacturerStateCoordinatorName": Manufacturer_State_Coordinator_Name,
                            "manufacturerStateCoordinatorMobNo": Manufacturer_State_Coordinator_Mobile_No,
                            "manufacturerStateCoordinatorEmailId": Manufacturer_State_Coordinator_Email_ID,
                            "startDate": startdate ? startdate.slice(8) + '-' + startdate.slice(5, 7) + "-" + startdate.slice(0, 4) : '',
                            "endDate": enddate ? enddate.slice(8) + '-' + enddate.slice(5, 7) + "-" + enddate.slice(0, 4) : '',
                            "tentativeYear": Tentative_Year_Of_Election,
                            "tentativeMonth": Tentative_month_of_election,
                            "electionType": Type_of_election_sf,
                            "electionID": electionid
                        }),
                    }
                );

                const data = await response.json();
                if (response.status === 200) {
                    document.getElementById("form").reset();
                    alert(data.message);
                    window.location.pathname = "/session/unitmanagement/flc_list";
                } else {
                    document.getElementById("form").reset();
                    alert("Failed!");
                }
            } catch (err) {
                console.log(err);
            }
        }
        else {
            alert("Please fill all entries")
        }
    }

    const handleRemoveClick = (i) => {

        const listSelectedDistricts = [...selectedDistricts];
        listSelectedDistricts.splice(i, 1);
        const listSelectedDistrictssf = [...selectedDistrictssf];
        listSelectedDistrictssf.splice(i, 1);
        setSelectedDistricts(listSelectedDistricts);
        setSelectedDistrictssf(listSelectedDistrictssf)
    };


    console.log(selectedDistricts, selectedDistrictssf)

    const onFormSubmit = async (e) => {
        e.preventDefault();
        AnnounceFLC();
    };


    return (<>
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
        <div className='flex justify-between'>
            <form onSubmit={onFormSubmit} id="form" className='w-2/3 m-5'>
                <div className={styles.Schedule_container}>
                    <div className={styles.Schedule_header}>
                        <h4>
                            Announce FLC
                        </h4>
                    </div>

                    <div className='w-full text-left p-4'>

                        <div className='w-1/2 m-2' >
                            <p>Districts</p>
                            <select
                                required
                                disabled={electionid !== -1 ? false : true}
                                value={selectedDistricts}
                                name=""
                                id="1"
                                className=" selectBox"
                                onChange={(e) => {
                                    setDistrictFunction(e)
                                }}
                            >
                                {" "}
                                <option hidden>Select District</option>
                                {District.length > 0 && District.map((val, ind) => (
                                    <option value={ind} >
                                        {`${val.dtCode} (${val.dtName})`}
                                    </option>
                                ))
                                }

                            </select>
                        </div>


                        <div className='flex flex-wrap w-full  items-center'>
                            {selectedDistricts && selectedDistricts.map((val, index) => (
                                <div className='rounded-lg gap-1 m-1 p-2 flex align-middle shadow-md shadow-black'>{val}
                                    <AiOutlineClose className='cursor-pointer text-red-400' onClick={() => {
                                        handleRemoveClick(index)
                                    }} /></div>
                            ))}
                        </div>

                        <div className='grid grid-cols-2 gap-6'>

                            <div className=''>
                                <p> Manufacturer</p>
                                <select
                                    disabled={electionid !== -1 ? false : true}
                                    required
                                    name=""
                                    id="1"
                                    value={manufacture}
                                    className=" selectBox"
                                    onChange={(e) => {
                                        setmanufacture(e.target.value)
                                    }}
                                >
                                    {" "}
                                    <option hidden>Select</option>
                                    {["BEL", "ECIL"].map((val) => {
                                        return <option value={val}>{val}</option>
                                    })}
                                </select>
                            </div>
                            <div className=''>
                                <p> Manufacturer State Coordinator Name</p>
                                <input
                                    required
                                    disabled={electionid !== -1 ? false : true}
                                    class={styles.input}
                                    type="text"
                                    id="2"
                                    className="selectBox"
                                    placeholder='Full Name'
                                    value={Manufacturer_State_Coordinator_Name}
                                    onChange={(e) => {
                                        setManufacturer_State_Coordinator_Name(e.target.value)
                                    }}
                                ></input>
                            </div>
                            <div className=''>
                                <p>Manufacturer State Coordinator Email ID</p>
                                <input
                                    required
                                    disabled={electionid !== -1 ? false : true}
                                    class={styles.input}
                                    type="email"
                                    id="3"
                                    className="selectBox"
                                    placeholder='xyz@example.com'
                                    value={Manufacturer_State_Coordinator_Email_ID}
                                    onChange={(e) => {
                                        setManufacturer_State_Coordinator_Email_ID(e.target.value)
                                    }}
                                ></input>
                            </div>
                            <div className=''>
                                <p>Manufacturer State Coordinator Mobile No.</p>
                                <input
                                    required
                                    disabled={electionid !== -1 ? false : true}
                                    class={styles.input}
                                    type="number"
                                    id="4"
                                    className={styles.numberfield}
                                    placeholder='Enter Number'
                                    value={Manufacturer_State_Coordinator_Mobile_No}
                                    onChange={(e) => {
                                        setManufacturer_State_Coordinator_Mobile_No(e.target.value)
                                    }}
                                ></input>
                            </div>
                            <div className=''>
                                <p>Start date</p>
                                <input
                                    disabled={electionid !== -1 ? false : true}
                                    class={styles.dateInput}
                                    type="date"
                                    id="5"
                                    className="selectBox"
                                    value={startdate}
                                    required pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"
                                    onChange={(e) => {
                                        setstartdate(e.target.value)
                                    }}
                                ></input>
                            </div>
                            <div className='' >
                                <p>End date</p>
                                <input
                                    required
                                    disabled={electionid !== -1 ? false : true}
                                    class={styles.dateInput}
                                    type="date"
                                    id="6"
                                    className=" selectBox"
                                    value={enddate}
                                    onChange={(e) => {
                                        setendate(e.target.value)
                                    }}
                                ></input>
                            </div>
                            <div className=''>
                                <p>Tentative Year Of Election</p>
                                <input
                                    class={styles.input}
                                    type="text"
                                    id="7"
                                    required pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"
                                    className="selectBox"
                                    placeholder='Enter Year'
                                    value={Tentative_Year_Of_Election}
                                    disabled
                                ></input>
                            </div>

                            <div className=''>
                                <p>Tentative month of election</p>
                                <input
                                    disabled
                                    type="text"
                                    required
                                    name=""
                                    placeholder='Enter Month'
                                    id="8"
                                    className=" selectBox"
                                    value={Tentative_month_of_election}
                                ></input>
                            </div>
                            <div className='' >
                                <p> Type of election</p>
                                <input
                                    required
                                    class={styles.input}
                                    type="text"
                                    id="7"
                                    className="selectBox"
                                    placeholder='Type of election'
                                    value={Type_of_election}
                                    disabled
                                ></input>
                            </div>
                        </div>
                    </div>
                </div>
                <button class={styles.submitBtn} type={"submit"} > Submit </button>
            </form>

            <div className='w-1/3 m-5'>
                <div className={styles.Schedule_container}>
                    <div className={styles.Schedule_header}>

                    </div>
                    <div className='mt-10'>
                        <div className='grid grid-cols-2'>
                            <h4 className='m-auto'>Total Districts</h4>
                            <div>{((Object.keys(preparednessStatistics).length !== 0) ? preparednessStatistics['notReadyDistricts'].length : 0) + ((Object.keys(preparednessStatistics).length !== 0) ? Object.keys(preparednessStatistics['readyDistricts']).length : 0)}</div>
                        </div>
                        <div className='grid grid-cols-2 mt-10 gap-30'>
                            <h5>No. of Districts ready</h5>
                            <div>{((Object.keys(preparednessStatistics).length !== 0) ? Object.keys(preparednessStatistics['readyDistricts']).length : 0)}</div>
                            <h5>No. of Districts pending</h5>
                            <div>{((Object.keys(preparednessStatistics).length !== 0) ? preparednessStatistics['notReadyDistricts'].length : 0)}</div>
                        </div>
                        <div className='mt-5 grid gap-2'>
                            <h5>Districts :</h5>
                            {Object.keys(preparednessStatistics).length !== 0 && Object.keys(preparednessStatistics['readyDistricts']).length !== 0 && Object.keys(preparednessStatistics['readyDistricts']).map((val) => {
                                return <div className='grid grid-cols-2 text-left'>
                                    <div>{val}</div>
                                    <div className='cursor-pointer text-black' style={{ fontSize: '19px' }} onClick={() => { getpreparednesscertificate(preparednessStatistics['readyDistricts'][val]) }} > <u> View</u></div>
                                </div>
                            })}

                            {Object.keys(preparednessStatistics).length !== 0 && preparednessStatistics['notReadyDistricts'].length !== 0 && preparednessStatistics['notReadyDistricts'].map((val) => {
                                return <div className='grid grid-cols-2 text-left'>
                                    <div>{val}</div>
                                    <div className='cursor-pointer text-black' > Not Uploaded</div>
                                </div>
                            })}

                            <Modal
                                isOpen={modalIsOpen}
                                onAfterOpen={afterOpenModal}
                                onRequestClose={closeModal}
                                style={customStyles}
                            >
                                <div id="root" className=''>
                                    <div className='flex justify-center items-center'>
                                        {<embed style={{ width: "600px", height: "600px", padding: "10px" }} src={`${photoFileData}`} />}
                                    </div>
                                    <button style={{ color: "white", }} onClick={closeModal}>Close</button>
                                </div>
                            </Modal>
                        </div>

                    </div>
                </div>
            </div>
        </div >
    </>
    )
}

export default Announce_Flc
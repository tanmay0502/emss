import React, { useState, useEffect } from 'react'
import styles from './styles/ScheduleFlc.module.css'
import scheduleStyles from './styles/ScheduleFlc.module.css'
import Modal from 'react-modal';


function EditFlc_Ceo(props) {
    
    const [photoFileName, setPhotoFileName] = useState("")
    const [photoFileData, setPhotoFileData] = useState("")
    const [flag, setflag] = useState(0);
    const [modalIsOpen, setIsOpen] = React.useState(false);

    console.log(photoFileName+ ".pdf", ":filename")

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

    async function getcertificate() {
        setflag(1)

        try {
            const response = await fetch(
                `${process.env.REACT_APP_API_SERVER}/unit/getPreparenessCertificate/${photoFileName+ ".pdf"}`,
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



    const Status = props.Status;
    var currentdate = new Date();
    var hrs = currentdate.getHours();
    var mins = currentdate.getMinutes();
    var secs = currentdate.getSeconds();
    const [Schedule, setSchedule] = useState(0);
    const [flc, setFlc] = useState([]);
    const FLC_ID = props.ID;

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

    async function getFLC() {

        try {
            const response = await fetch(
                `${process.env.REACT_APP_API_SERVER}/unit/viewFLC/${FLC_ID}`,
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
            console.log(data, "data")
            if (response.status == 200) {
                setFlc(data['flc'][0]);
                setPhotoFileName(data['flc'][0]['preparenesscertificatename'].slice(0,-4))
            }

        } catch (err) {
            console.log({ err });
        }
    }

    // console.log(flc['preparenesscertificatename'])

    // {flc['preparenesscertificatename'] && setPhotoFileName(flc['preparenesscertificatename'].slice(0,-4));}


    useEffect(() => {
        getFLC();
    }, []);

    // useEffect(() => {
    //     setPhotoFileName(flc['preparenesscertificatename'].slice(0,-4));
    // }, [flc]);


    async function Schedule_flc() {

        try {
            const response = await fetch(
                `${process.env.REACT_APP_API_SERVER}/unit/schedule_flc`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: 'include',
                    body: JSON.stringify({

                        "startDate": document.getElementById("9") ? document.getElementById("9").value + "T" + time : "",
                        "endDate": document.getElementById("10") ? document.getElementById("10").value + "T" + time : "",
                        "flcid": Number(FLC_ID),
                    }),
                }
            );

            console.log(response);
            const data = await response.json();
            console.log("data" + data);
            console.log("Message:" + data["message"])
            if (response.status == 200) {
                document.getElementById("form").reset();
                alert("Successful");
                window.location.pathname = "/session/unitmanagement/flc_list";
            } else {
                alert("Failed!");
            }
        } catch (err) {
            console.log(err);
        }
    }


    const onFormSubmit = async (e) => {
        e.preventDefault();
        console.log("submit button clicked")
        Schedule_flc()
        // console.log(document.getElementById("9") ? document.getElementById("9").value + "T" + time : "", document.getElementById("10") ? document.getElementById("10").value + "T" + time : "", FLC_ID)
    };

    const Scheduling = async (e) => {
        if (Schedule == 0) {
            setSchedule(1);
        }
        else {
            setSchedule(0);
        }
    };


    return (
        <>
            <form onSubmit={onFormSubmit} id="form">
                {Schedule == 0 && Status == "schedule pending" && <button class={styles.ScheduleButton} onClick={Scheduling}> Schedule </button>}
                <div className={styles.Schedule_container}>
                    <div className={styles.Schedule_header}>
                        <h4>
                            Schedule FLC
                        </h4>
                    </div>

                    <div class={scheduleStyles.parent}>

                        <div class={scheduleStyles.div1}>
                            <p>FLC District</p>
                            <input
                                // required
                                class={scheduleStyles.input}
                                type="text"
                                id="1"
                                className="selectBox"
                                placeholder='Enter FLC District'
                                defaultValue={flc['district']}
                                disabled
                            ></input>

                        </div>

                        <div class={scheduleStyles.div2}>
                            <p> Tentative year of election</p>
                            <input
                                required
                                class={scheduleStyles.input}
                                type="number"
                                defaultValue={flc['tentativeyear']}
                                id="2"
                                className="selectBox"
                                disabled
                                placeholder='Enter Year'
                            ></input>
                        </div>

                        <div class={scheduleStyles.div3}>
                            <p> Manufacturer</p>
                            <input
                                required
                                class={scheduleStyles.input}
                                type="text"
                                value={flc['manufacturername']}
                                id="3"
                                className="selectBox"
                                disabled
                                placeholder='Full Name'
                            ></input>
                        </div>


                        <div class={scheduleStyles.div4}>
                            <p> ECI Supervisor</p>
                            <input
                                class={scheduleStyles.input}
                                required
                                type="text"
                                value={flc['ecisupervisor']}
                                id="4"
                                className="selectBox"
                                disabled
                                placeholder='Full Name'
                            ></input>
                        </div>

                        <div class={scheduleStyles.div5}>
                            <p> Type of election</p>
                            <select
                                //   required={!isTemporary}
                                required
                                name=""
                                id="5"
                                disabled
                                value={flc['electiontype']}
                                className=" selectBox"
                            //   onChange={(e) => setRoleFunc(e.target.value)}
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

                        </div>

                        <div class={scheduleStyles.div6}>
                            <p>Tentative month of election</p>
                            <select
                                //   required={!isTemporary}
                                required
                                name=""
                                id="6"
                                type="number"
                                disabled
                                className=" selectBox"
                                value={flc['tentativemonth']}

                            //   onChange={(e) => setRoleFunc(e.target.value)}
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

                        </div>

                        <div class={scheduleStyles.div7}>
                            <p>Manufacturer Email ID</p>
                            <input
                                class={scheduleStyles.input}
                                type="email"
                                id="7"
                                disabled
                                className="selectBox"
                                placeholder='xyz@example.com'
                                value={flc['manufactureremailid']}
                            ></input>
                        </div>

                        <div class={scheduleStyles.div8}>
                            <p>Manufacturer Mobile No.</p>
                            <input
                                required
                                class={scheduleStyles.input}
                                type="number"
                                id="8"
                                className="selectBox"
                                value={flc['manufacturermobno']}
                                disabled
                                placeholder='Enter Number'
                            ></input>
                        </div>
                        {Schedule == 0 && Status != "upload pending" &&
                            <div class={styles.div9}>
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
                                    {console.log("This Data:")}
                                    {/* {console.log(photoFileData["data"].slice(0,-1))} */}
                                    {/* {console.log(fileData)} */}
                                    {console.log("Fetched Data:- ",photoFileData["data"])}
                                    {/* {<embed style={{ width: "600px", height: "600px", padding: "10px" }} src={fileData} />} */}
                                    {photoFileData["data"] !== undefined && <embed type="text/html" style={{ width: "1000px", height: "800px", padding: "10px" }} src={photoFileData["data"]} />}
                                </div>
                                <button style={{ color: "white", }} onClick={closeModal}>Close</button>
                            </div>
                        </Modal>

                        {Schedule == 1 && <>
                            <div class={scheduleStyles.div9}>
                                <p>Start date</p>
                                <input
                                    required
                                    class={scheduleStyles.dateInput}
                                    type="date"
                                    className=" selectBox"
                                    id="9"
                                ></input>
                            </div>

                            <div class={scheduleStyles.div10}>
                                <p>End date</p>
                                <input
                                    required
                                    class={scheduleStyles.dateInput}
                                    type="date"
                                    className=" selectBox"
                                    id="10"
                                ></input>
                            </div>

                            <div class={styles.div11}>
                                <p style={{ color: "white" }}>s </p>
                                <div onClick={() => { openModal(); }}
                                    style={{ padding: "10px", background: "white", color: "black", overflow: "hidden", display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                                >  <u> View Preparedness Certificate </u>  </div>
                            </div>

                        </>
                        }
                    </div>
                </div>

                {Schedule == 1 && <button class={scheduleStyles.submitBtn} type='submit'> Submit </button>}
            </form>
        </>
    )
}

export default EditFlc_Ceo








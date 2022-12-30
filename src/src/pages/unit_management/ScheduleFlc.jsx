import React, { useState, useEffect } from 'react'
import { DynamicDataTable } from '@langleyfoxall/react-dynamic-data-table'
import styles from './styles/ScheduleFlc.module.css'
import Prepared_Certificate from './preparedness_certificate'
import Modal from 'react-modal';
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'

function ScheduleFLC() {

    const [modalIsOpen, setIsOpen] = React.useState(false);
    const navigate = useNavigate()
    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        //   references are now sync'd and can be accessed.
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

    var currentdate = new Date();
    var hrs = currentdate.getHours();
    var mins = currentdate.getMinutes();
    var secs = currentdate.getSeconds();

    const [Schedule, setSchedule] = useState(0);
    const [flc, setflc] = useState(0);


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

    console.log(time)

    async function getFLC() {

        try {
            const response = await fetch(
                `${process.env.REACT_APP_API_SERVER}/unit/getflcdetail`,
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
            console.log(data)
            if (response.status == 200) {
                setflc(data['data']);
            }

        } catch (err) {
            console.log({ err });
        }
    }

    useEffect(() => {
        getFLC();
    }, []);


    const onFormSubmit = async (e) => {
        e.preventDefault();
        console.log("submit button clicked")
    };



    const [photoFileName, setPhotoFileName] = useState("")
    const [photoFileData, setPhotoFileData] = useState("")

    async function UploadPhoto() {
        setflag(1);
        try {
            const response = await fetch(
                `${process.env.REACT_APP_API_SERVER}/unit/preparedness_certificate`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: 'include',
                    body: JSON.stringify({
                        "flcID": Number(flc[0]),
                        "filedata": photoFileData
                    }),
                    mode: "cors"
                }
            );
            const data = await response.json();
            console.log(data, "data")
            if (response.status == 200) {
                alert("Successfully Submitted File")
            }

        } catch (err) {
            console.log({ err });
        }
    }

    const [flag, setflag] = useState(0);

    console.log(photoFileData)


    useEffect(() => {
        if (flag == 0) {
            if (photoFileData) {
                UploadPhoto()
            }
        }
    }, [photoFileData]);


    return (
        <>
            <form onSubmit={onFormSubmit} id="form" className={styles.scheduleFLCForm}>
                {flag == 1 && <button
                    class={styles.backbutton}
                    onClick={() => {
                        navigate('/session/unitmanagement')
                    }}
                >
                    <AiOutlineArrowLeft />
                </button>}
                <div className={styles.Schedule_container}>
                    <div className={styles.Schedule_header}>

                        <h4>
                            Schedule FLC
                        </h4>
                    </div>
                    <div class={styles.parent}>

                        <div class={styles.div1}>
                            <p>Warehouse ID</p>
                            <input
                                class={styles.input}
                                type="text"
                                id="1"
                                className="selectBox"
                                placeholder='Enter District'
                                disabled
                                defaultValue={flc !== undefined && flc[1]}
                            ></input>
                            {/* <select
                                //   required={!isTemporary}
                                required
                                name=""
                                id="1"
                                className=" selectBox"
                            //   onChange={(e) => setRoleFunc(e.target.value)}
                            >
                                <option value="" disabled selected>
                                    Select District
                                </option>
                            </select> */}
                        </div>

                        <div class={styles.div2}>
                            <p>Tentative Year Of Election</p>
                            <input
                                class={styles.input}
                                type="number"
                                id="2"
                                className="selectBox"
                                placeholder='Enter Year'
                                disabled
                                defaultValue={flc !== undefined && flc[9]}
                            ></input>
                        </div>

                        <div class={styles.div3}>
                            <p> Manufacturer</p>
                            <input
                                class={styles.input}
                                type="text"
                                id="3"
                                className="selectBox"
                                placeholder='Full Name'
                                disabled
                                defaultValue={flc !== undefined && flc[2]}
                            ></input>
                        </div>

                        <div class={styles.div4}>
                            <p> ECI Supervisor</p>
                            <input
                                class={styles.input}
                                type="text"
                                id="4"
                                className="selectBox"
                                placeholder='ECI Supervisor Name'
                                disabled
                                defaultValue={flc !== undefined && flc[5]}
                            ></input>

                        </div>


                        <div class={styles.div5}>
                            <p> Type of election</p>
                            <input
                                class={styles.input}
                                type="text"
                                id="5"
                                className="selectBox"
                                placeholder='Type of election'
                                disabled
                                defaultValue={flc !== undefined && flc[11]}
                            ></input>
                            {/* <select
                                //   required={!isTemporary}
                                required
                                name=""
                                id="6"
                                className=" selectBox"
                                disabled
                                defaultValue={flc[9]}
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
                                    By elections
                                </option>
                            </select> */}
                        </div>

                        <div class={styles.div6}>
                            <p>Tentative month of election</p>
                            <input
                                class={styles.input}
                                type="text"
                                id="6"
                                className="selectBox"
                                placeholder='Tentative month of election'
                                disabled
                                defaultValue={flc !== undefined && flc[10]}
                            ></input>
                        </div>

                        <div class={styles.div7}>
                            <p>Manufacturer Email ID</p>
                            <input
                                class={styles.input}
                                type="email"
                                id="7"
                                className="selectBox"
                                placeholder='xyz@example.com'
                                disabled
                                defaultValue={flc !== undefined && flc[4]}
                            ></input>
                        </div>

                        <div class={styles.div8}>
                            <p>Manufacturer Mobile No.</p>
                            <input
                                class={styles.input}
                                type="number"
                                id="8"
                                className="selectBox"
                                placeholder='Enter Number'
                                disabled
                                defaultValue={flc !== undefined && flc[3]}
                            ></input>
                        </div>
                        {photoFileName !== "" &&
                            <div class={styles.div9}>
                                <p style={{ color: "white" }}>s </p>
                                <button onClick={() => { openModal(); }}
                                    style={{ padding: "10px", background: "white", color: "black", overflow: "hidden", display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                                >  <u> View Preparedness Certificate </u>  </button>
                            </div>
                        }
                    </div>
                </div>

                <Modal
                    isOpen={modalIsOpen}
                    onAfterOpen={afterOpenModal}
                    onRequestClose={closeModal}
                    style={customStyles}
                >
                    <div id="root" className=''>
                        <div className='flex justify-center items-center'>
                            {photoFileData !== undefined && <embed style={{ width: "1000px", height: "800px", padding: "10px" }} src={`${photoFileData}`} />}
                        </div>
                        <button style={{ color: "white", }} onClick={closeModal}>Close</button>
                    </div>
                </Modal>
                {
                    photoFileName == "" &&
                    <div style={{ marginTop: "2%" }}>
                        <Prepared_Certificate setPhotoFileName={setPhotoFileName} setPhotoFileData={setPhotoFileData} photoFileName={photoFileName} photoFileData={photoFileData} />
                    </div>
                }

            </form>
        </>
    )
}

export default ScheduleFLC
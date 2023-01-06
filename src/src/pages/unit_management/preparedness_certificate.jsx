import React, { useEffect, useState } from "react";
import styles from './styles/preparedness_certificate.module.css';
import { getBase64 } from "../../assets/helper/FileHelpers";
import { ReactComponent as Checkmark } from "../../assets/checkmark.svg";
import scheduleStyles from './styles/ScheduleFlc.module.css'
import Modal from 'react-modal';

export default function Prepared_Certificate(props) {

    const [photoFileName, setPhotoFileName] = useState("")
    const [photoFileData, setPhotoFileData] = useState("")
    const [electionid, setelectionid] = useState(-1)
    const [show, setShow] = useState('');
    const [ID, setID] = useState(-1);
    const [time, settime] = useState('');
    const [uploaded, setuploaded] = useState(-1);
    const [listElections, setListElections] = useState([])
    const [modalIsOpen_Preparedness_Certificate, setIsOpen_Preparedness_Certificate] = React.useState(false);


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

    async function getpreparednesscertificate() {
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
                            "flcID": Number(ID)
                        }
                    )
                }
            );

            const data = await response.json();
            console.log(data, "Harshith")
            if (response.status == 200) {
                setPhotoFileData(data['data'])
            }

        } catch (err) {
            console.log({ err });
        }
    }


    useEffect(
        () => {
            if (ID != -1) {
                let timer1 = setTimeout(() => getpreparednesscertificate(), 1 * 1000);
                return () => {
                    clearTimeout(timer1);
                };
            }
        },
        [ID]
    );

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
            if (response.status==200) {
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




    async function handleFormSubmit() {

        if (electionid != -1) {
            try {
                const response = await fetch(
                    `${process.env.REACT_APP_API_SERVER}/unit/uploadPreparednessCertificate`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        credentials: 'include',
                        body: JSON.stringify({
                            "fileData": photoFileData,
                            "electionID": electionid
                        }),
                    }
                );
                const data = await response.json();

                if (response.status == 200) {
                    let electionID = electionid;
                    document.getElementById("form").reset();
                    setuploaded(1);
                    alert(data.message)
                    GetRecentPreparedness(electionID)
                    setelectionid(-1);
                    setPhotoFileData('');
                }
                else {
                    document.getElementById("form").reset();
                    alert(data.message)
                    setelectionid(-1);
                    setPhotoFileData('');
                }
            } catch (err) {
                console.log({ err });
            }
        }
        else {
            alert("Please fill all entries")
        }
    }


    async function GetRecentPreparedness() {
        try {
            const response = await fetch(
                `${process.env.REACT_APP_API_SERVER}/unit/getRecentPreparedness`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: 'include',
                    body: JSON.stringify({
                        "electionID": electionid
                    }),
                }
            );
            const data = await response.json();

            if (response.status == 200) {
                let date = data ? data['data'][0]['preparenesscertificateuploadedon'].split('T')[0] : '';
                let uploadedtime = data ? data['data'][0]['preparenesscertificateuploadedon'].split('T')[1].slice(0, 8) : '';
                console.log(date)
                settime(uploadedtime)
                setShow(data ? date.slice(8) + '-' + date.slice(5, 7) + "-" + date.slice(0, 4) : '')
                setID(data['data'][0]['flcid']);
            }
        } catch (err) {
            console.log({ err });
        }
    }

    useEffect(
        () => {
            if (electionid != -1) {
                let timer1 = setTimeout(() => GetRecentPreparedness(), 1 * 1000);

                return () => {
                    clearTimeout(timer1);
                };
            }
        },
        [electionid]
    );






    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setelectionid(Number(value));
    };

    const onFormSubmit = async (e) => {
        e.preventDefault();
        handleFormSubmit()

    };

    console.log(listElections,'listElectionslistElectionslistElections')

    return (
        <form id='form' onSubmit={onFormSubmit}>
            <div className='m-auto mb-5 flex justify-center gap-5 w-96'><h5 className='self-center'>Select Election</h5>
                <div className='w-48'>
                    <select
                        required
                        name="electionid"
                        onChange={(e) => handleInputChange(e)}
                        value={electionid}
                    >
                        {" "}
                        <option hidden>Select</option>
                        {listElections &&
                            listElections.map((val, ind) => {
                                return (<>
                                    <option value={val.election_id}>{`${val.electiontype} ${val.startdate.slice(6, 11)}`}</option>
                                </>)
                            })}
                    </select>
                </div>
            </div>
            <div className={styles.prepared_Certificate_container}>
                <div className={styles.prepared_Certificate_header}>
                    <h4>
                        Preparedness Certificate
                    </h4>
                </div>
                <div className={styles.Upload}>
                    {uploaded != -1 &&
                        <div className="flex" style={{ paddingTop: '2px' }}>
                            <div onClick={openModal_Preparedness_Certificate} style={{ fontSize: "15px" }}>  <u> View Preparedness Certificate </u>  </div>
                            <div className="pl-2" style={{ fontSize: "15px" }}>Uploaded on {show} {time}</div>
                        </div>
                    }

                    {uploaded == -1 && show != '' && time != '' &&
                        <div className="flex" style={{ paddingTop: '2px' }}>
                            <div onClick={openModal_Preparedness_Certificate} style={{ fontSize: "15px" }}>  <u> View Preparedness Certificate </u>  </div>
                            <div className="pl-2" style={{ fontSize: "15px" }}>Uploaded on {show} {time}</div>
                        </div>
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
                </div>
                <div className={styles.Upload}>
                    <div className={styles.mess}>
                        <div>
                            <Checkmark />
                        </div>
                        <div style={{ marginRight: "10%" }}>I hereby declare that district is ready for first level checking </div>
                    </div>
                    <input
                        id="formUserImage"
                        type="file"
                        required
                        className={electionid == -1 ? "cursor-not-allowed" : ''}
                        disabled={electionid == -1 ? true : false}
                        // placeholder="Choose Image (Upto 5 MB)"
                        // accept="image/*"
                        onChange={async (e) => {
                            setPhotoFileName(e.target.value.replace(/^.*[\\\/]/, ''))
                            setPhotoFileData(await getBase64(e.target.files[0]))
                        }}
                    />

                </div>
                <button className={scheduleStyles.submitBtn} type='submit' style={{ marginBottom: "1%" }} disabled={electionid == -1 ? true : false}> Submit </button>
            </div>

        </form >
    )
}





{/* <div style={{ paddingTop: "11px", fontSize: "20px", marginRight: '72%' }}>Uploaded on {show} {time}</div>
                        <div onClick={openModal_Preparedness_Certificate}
                            style={{ marginRight: '78%', background: "white", color: "black", overflow: "hidden", display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                        >  <u> View Preparedness Certificate </u>  </div> */}
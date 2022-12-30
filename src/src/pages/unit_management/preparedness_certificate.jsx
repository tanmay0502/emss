import React, { useEffect, useState } from "react";
import styles from './styles/preparedness_certificate.module.css';
import { getBase64 } from "../../assets/helper/FileHelpers";
import { ReactComponent as Checkmark } from "../../assets/checkmark.svg";
import scheduleStyles from './styles/ScheduleFlc.module.css'

export default function Prepared_Certificate(props) {

    const [photoFileName, setPhotoFileName] = useState("")
    const [photoFileData, setPhotoFileData] = useState("")
    const [electionid, setelectionid] = useState(-1)


    const [listElections, setListElections] = useState([])
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

            if (data.length) {
                setListElections(data)
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


    const ID = window.sessionStorage.getItem('sessionToken');

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
                    document.getElementById("form").reset();
                    alert("Successfully Submitted File")
                }
                else {
                    document.getElementById("form").reset();
                    alert(data.message)
                    setelectionid(-1);
                }
            } catch (err) {
                console.log({ err });
            }
        }
        else {
            alert("Please fill all entries")
        }
    }


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setelectionid(Number(value));
    };

    const onFormSubmit = async (e) => {
        e.preventDefault();
        handleFormSubmit()

    };

    return (
        <form onSubmit={onFormSubmit}>
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
                        // placeholder="Choose Image (Upto 5 MB)"
                        // accept="image/*"
                        onChange={async (e) => {
                            setPhotoFileName(e.target.value.replace(/^.*[\\\/]/, ''))
                            setPhotoFileData(await getBase64(e.target.files[0]))
                        }}
                    />
                </div>
                <button className={scheduleStyles.submitBtn} type='submit' style={{ marginBottom: "1%" }}> Submit </button>
            </div >
        </form >
    )
}






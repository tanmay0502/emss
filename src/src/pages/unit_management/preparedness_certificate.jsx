import React, { useEffect, useState } from "react";
import styles from './styles/preparedness_certificate.module.css';
import { getBase64 } from "../../assets/helper/FileHelpers";
import { ReactComponent as Checkmark } from "../../assets/checkmark.svg";


export default function Prepared_Certificate(props) {

    const [photoFileName, setPhotoFileName] = useState("")
    const [photoFileData, setPhotoFileData] = useState("")


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
            console.log("/unit/listElections",data);
            if (data.length) {
                setListElections(data)
            }
        } catch (error) {
            console.log(error)
        }

    }
    useEffect(()=>{
        getListElections()
    },[])

    const ID = window.sessionStorage.getItem('sessionToken');

    async function submit() {
        console.log({
            "state": ID.slice(0,2),
            "district": ID.slice(2,5),
            "fileData": photoFileData,
            "electionID": "f",
        })
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
                        "state": ID.slice(0,2),
                        "district": ID.slice(2,5),
                        "fileData": photoFileData,
                        "electionID": "f",
                    }),
                }
            );
            const data = await response.json();
            console.log("/unit/preparedness_certificate", data)
            if (response.status == 200) {
                alert("Successfully Submitted File")
            }
        } catch (err) {
            console.log({ err });
        }
    }



    return (<>
        <div className='m-auto mb-5 flex justify-center gap-5 w-96'><h5 className='self-center'>Select Election</h5>
            <div className='w-48'>
                <select>
                    <option value="">Select:</option>
                    {listElections.map((val, ind) => {
                        return (<>
                            <option value="">{`${val.electiontype} ${val.startdate.slice(6, 11)}`}</option>
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
                    // placeholder="Choose Image (Upto 5 MB)"
                    // accept="image/*"
                    onChange={async (e) => {
                        setPhotoFileName(e.target.value.replace(/^.*[\\\/]/, ''))
                        setPhotoFileData(await getBase64(e.target.files[0]))
                    }}
                />
            </div>
            <button className="text-white" onClick={()=>submit()}>Submit</button>
        </div >
    </>
    )
}






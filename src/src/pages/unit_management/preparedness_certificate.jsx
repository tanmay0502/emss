import React, { useEffect, useState } from "react";
import styles from './styles/preparedness_certificate.module.css';
import { getBase64 } from "../../assets/helper/FileHelpers";
import { ReactComponent as Checkmark } from "../../assets/checkmark.svg";


export default function Prepared_Certificate(props) {

    return (
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
                        props.setPhotoFileName(e.target.value.replace(/^.*[\\\/]/, ''))
                        props.setPhotoFileData(await getBase64(e.target.files[0]))
                    }}
                />
            </div>
        </div >
    )
}






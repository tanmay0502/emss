import React from 'react'

import styles from './styles/RecievedMessageGroup.module.css'
import {ReactComponent as PDFIcon} from '../../../assets/PDFFileIndicator.svg'
import {ReactComponent as JPGIcon} from '../../../assets/JPGFileIndicator.svg'
import {ReactComponent as GenericFileIcon} from '../../../assets/GenericFileIndicator.svg'

function RecievedMessageGroup(props) {

    const sender = "DEO Gwalior"

    const messages = [
        'Recieved Message Group',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        'Recieved Message Value 2'
    ]

    const supportingDocuments = [
        'https://www.clickdimensions.com/links/TestPDFfile.pdf',
        'https://www.pakainfo.com/wp-content/uploads/2021/09/image-url-for-testing.jpg'
    ]

    return (
        <div className={styles.recievedMsgGroup}>
            <div className={styles.msgGroup}>
                {props.data && props.data.map( (val, ind) => {
                    return (
                        val['remarks'] !== "" ?
                        <p key={val['madeon']}>
                            {ind === 0 && val['remarks'] ? <b>{val['remarkeruserid']}</b> : ""}
                            {val['lodgeruserid'] ? val['subject'] : val['remarks']}
                        </p>
                        : <></>
                    )
                } )}
                {
                    props.data[0]['lodgeruserid'] ? <span className={styles.statusText}>
                                                        Issue Registered
                                                    </span>  
                    : <></>
                }
            </div>
            <div className={styles.msgSenderImage}>

            </div>
        </div>
    )
}

export default RecievedMessageGroup
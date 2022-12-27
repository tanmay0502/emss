import React from 'react'

import styles from './styles/SentMessageGroup.module.css'
import { ReactComponent as PDFIcon } from '../../../assets/PDFFileIndicator.svg'
import { ReactComponent as JPGIcon } from '../../../assets/JPGFileIndicator.svg'
import { ReactComponent as GenericFileIcon } from '../../../assets/GenericFileIndicator.svg'

function SentMessageGroup(props) {

    const messages = [
        'Sent Message Group',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        'Sent Message Value 2'
    ]

    const supportingDocuments = [
        'https://www.clickdimensions.com/links/TestPDFfile.pdf',
        'https://www.pakainfo.com/wp-content/uploads/2021/09/image-url-for-testing.jpg'
    ]

    return (
        <div className={styles.sentMsgGroup}>
            {/* <div className={styles.msgSenderImage}>

            </div> */}
            <div className={styles.msgGroup}>
                {
                    props.data && props.data.map((val, ind) => {
                        if (val['remarks'] !== "") {
                            return (
                                <>
                                    <p key={val['madeon']}>
                                        {val['lodgeruserid'] ? val['subject'] : val['remarks']}
                                    </p>
                                </>
                            )
                        }
                        return <></>
                    })
                }
                {/* <div className={styles.documentsMessage}>
                    Supporting Documents
                    {
                        supportingDocuments.map(val => {
                            return (
                                <a onClick={()=>{
                                    window.open(val, '_blank')
                                }}>
                                    {
                                        val.endsWith(".pdf") || val.endsWith(".PDF") ?
                                            <PDFIcon />
                                            :
                                            val.endsWith(".jpg") || val.endsWith(".JPG") || val.endsWith(".jpeg") || val.endsWith(".JPEG") ? <JPGIcon /> 
                                            : <GenericFileIcon />
                                    }
                                    {val.split('/').slice(-1)[0]}
                                </a>
                            )
                        })
                    }
                </div> */}
                {
                    props.data[0]['lodgeruserid'] ? <span className={styles.statusText}>
                        Issue Registered
                    </span>
                        : <></>
                }
            </div>
        </div>
    )
}

export default SentMessageGroup
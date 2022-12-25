import React from 'react'
import styles from './styles/ChatUpdate.module.css'
import styleSent from './styles/SentMessageGroup.module.css'
import styleRec from './styles/RecievedMessageGroup.module.css'

import { ReactComponent as PDFIcon } from '../../../assets/PDFFileIndicator.svg'
import { ReactComponent as JPGIcon } from '../../../assets/JPGFileIndicator.svg'
import { ReactComponent as GenericFileIcon } from '../../../assets/GenericFileIndicator.svg'

function ChatUpdate(props) {

	const msgStylesObj = props.message[0]['remarkeruserid'] === window.sessionStorage.getItem('sessionToken') ? styleSent : styleRec

	return (
		<>
			<div className={styles.ChatUpdateContainer}>
				<p>
					{
						props.message ?
							props.message[0]['remarks'] : ""}
				</p>
			</div>
			<div className={props.message[0]['remarkeruserid'] === window.sessionStorage.getItem('sessionToken') ? styleSent.sentMsgGroup : styleRec.recievedMsgGroup}>
				<div className={msgStylesObj.msgGroup}>
					{
						<>
							{
								props.docData && props.docData[props.message[0]['remarkid']] && props.docData[props.message[0]['remarkid']]!==undefined && props.docData[props.message[0]['remarkid']].length > 0 ?
									<div className={msgStylesObj.documentsMessage}>
										{msgStylesObj === styleRec ? <b>{props.message[0]['remarkeruserid']}</b> : <></>}
										Supporting Documents
										{
											props.docData[props.message[0]['remarkid']].map(val => {
												// console.log(val)
												return (
													<a onClick={() => {
														window.open('/session/issuemanagement/fetchfile/' + val[0] + '?remarkID=' + props.message[0]['remarkid'], '_blank')
													}}>
														{
															val[0].endsWith(".pdf") || val[0].endsWith(".PDF") ?
																<PDFIcon />
																:
																val[0].endsWith(".jpg") || val[0].endsWith(".JPG") || val[0].endsWith(".jpeg") || val[0].endsWith(".JPEG") ? <JPGIcon />
																	: <GenericFileIcon />
														}
														{val[0]}
													</a>
												)
											})
										}
									</div> :
									<></>
							}
						</>
					}
				</div>
				{ props.docData && props.docData[props.message[0]['remarkid']].length > 0 ? <div className={msgStylesObj.msgSenderImage}>

				</div> : <></>}
			</div>
		</>



	)
}

export default ChatUpdate
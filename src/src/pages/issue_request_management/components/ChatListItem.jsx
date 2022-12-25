import React from 'react'
import styles from './styles/ChatListItem.module.css'

import defaultImage from '../../../assets/issueUserImage.png'

function ChatListItem(props) {

    const getDateValue = ()=>{
        var date = new Date(Date.parse(props.updateTime))
        var now = new Date()
        if(date.getFullYear() !== now.getFullYear()) return date.toLocaleString('en', { "day": "2-digit", "month" :"short", "year": "2-digit" });
        else if(date.getDate() !== now.getDate() || date.getMonth() !== now.getMonth()) return date.toLocaleString('en', { "day": "numeric", "month" :"short" })
        else return date.toLocaleTimeString('en', { "hour": "2-digit", minute: "2-digit" })
    }

  return (
    <div className={styles.chatListItem}>
        <input className='issueSelectorCheckbox' type="radio" name="chatlistItem" id={"issueItem-" + props.issueID} onClick={()=>{
            props.setSelectedissue(props.issueID)
        }} />
        <label htmlFor={"issueItem-" + props.issueID}>
            <img src={defaultImage} alt="" />
            <div className={styles.chatListItemInfo}>
                <b>
                    {props.issueID}
                </b>
                <span>
                    {props.subject}
                </span>
            </div>
            <div className={styles.ChatListItemUpdates}>
                <span>
                    {
                        getDateValue()
                    }
                </span>
                {/* <button>
                    5
                </button> */}
            </div>
        </label>
    </div>
  )
}

export default ChatListItem
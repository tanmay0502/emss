import React, { useEffect, useRef } from 'react'
import styles from './styles/ChatListItem.module.css'

import defaultImage from '../../../assets/issueUserImage.png'

function ChatListItem(props) {
    const chatListItemInput = useRef();
    const getDateValue = ()=>{
        var date = new Date(Date.parse(props.updateTime))
        var now = new Date()
        if(date.getFullYear() !== now.getFullYear()) return date.toLocaleString('en', { "day": "2-digit", "month" :"short", "year": "2-digit" });
        else if(date.getDate() !== now.getDate() || date.getMonth() !== now.getMonth()) return date.toLocaleString('en', { "day": "numeric", "month" :"short" })
        else return date.toLocaleTimeString('en', { "hour": "2-digit", minute: "2-digit" })
    }

    useEffect(() => {
      console.log(props.defaultChecked)
      chatListItemInput.current.checked = props.defaultChecked
      return () => {
        
      }
    }, [])
    

  return (
    <div className={styles.chatListItem}>
        <input ref={chatListItemInput} className='issueSelectorCheckbox' type="radio" name="chatlistItem" id={"issueItem-" + props.issueID} onClick={()=>{
            chatListItemInput.current.checked = true
            props.setSelectedissue(props.issueID)
        }} />
        <label htmlFor={"issueItem-" + props.issueID}>
            <img src={defaultImage} alt="" />
            <div className={styles.chatListItemInfo}>
                <span>
                    <b>
                        {props.subject}
                    </b>
                </span>
                <p>
                    Issue ID: {props.issueID}
                </p>
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

ChatListItem.defaultProps= {
    defaultChecked: false
}

export default ChatListItem
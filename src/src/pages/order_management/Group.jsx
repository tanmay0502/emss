import React from 'react';
import styles from '../issue_request_management/styles/issue.module.css'


export default function Group(props){
    return (
        <div className={props.class ? `${styles.myGroup} ${styles.first_child}` : `${styles.myGroup}`} >
            <label className={props.custom ? `${styles.LabelText} ${styles.CustomLabel}` : `${styles.LabelText}`}> {props.LabelText}:  </label>
            <span>{props.value}</span>
        </div>
    )
}

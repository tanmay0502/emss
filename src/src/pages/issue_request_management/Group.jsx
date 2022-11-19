import React from 'react';
import styles from './styles/issue.module.css'


export default function Group(props){
    return (
        <div className={props.class ? `${styles.myGroup} ${styles.first_child}` : `${styles.myGroup}`}  >
            <label className={`${styles.LabelText}`}>{props.LabelText}: </label>
            <span className={props.value === "Resolved" ? `${styles.greenText}`:`${styles.rednText}` }>{props.value}</span>
        </div>
    )
}

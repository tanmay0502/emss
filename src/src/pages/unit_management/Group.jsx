import React from 'react';
import styles from './styles/StatusHistory.module.css'


export default function Group(props) {
    return (
        <div className={props.class ? `${styles.myGroup} ${styles.first_child}` : `${styles.myGroup}`} >
            <label className={`${styles.LabelText}`}>{props.LabelText}: </label>
            <span>{props.value}</span>
        </div>
    )
}
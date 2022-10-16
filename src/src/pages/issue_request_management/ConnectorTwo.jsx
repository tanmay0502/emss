import React from 'react';
import styles from './styles/issue.module.css'

export default function ConnectorTwo(){
    return (
        <div className={`${styles.ConnectorTwoBox}`}>
            <div className={`${styles.ConnectorTwo}`}>
                <div className={`${styles.Line}`}></div>
            </div>
        </div>
    )
}
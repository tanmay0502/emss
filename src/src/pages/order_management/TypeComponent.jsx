import React from 'react';
import styles from './styles/order1.module.css';

export default function TypeComponent(props){

    return (
        <div className={`${styles.TypeComponent} p-4`} id={"order-type-"+props.id.toString()} onClick={() => props.setSelected("order-type-"+props.id.toString())}>
          {props.text}
        </div>
    )
}
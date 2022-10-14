import React from 'react';
import './styles/order.css';


export default function TypeComponent(props){

    return (
        <div className='TypeComponent d-flex d-flex-center d-flex-column' id={"order-type-"+props.id.toString()} onClick={() => props.setSelected("order-type-"+props.id.toString())}>
            <div className='TypeCode'>
                {props.code}
            </div>
            <div className='TypeText'>
                {props.text}
            </div>
        </div>
    )
}
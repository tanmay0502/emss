import React from 'react';
import './styles/order.css';


export default function TypeComponent(props){

    return (
        <div className='TypeComponent p-4' id={"order-type-"+props.id.toString()} onClick={() => props.setSelected("order-type-"+props.id.toString())}>
          {props.text}
            
        </div>
    )
}
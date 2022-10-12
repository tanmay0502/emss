import React from 'react';


export default function Group(props){
    return (
        <div className={props.class ? "myGroup first-child" : "myGroup"} >
            <label className='LabelText'>{props.LabelText}:</label>
            <span>{props.value}</span>
        </div>
    )
}

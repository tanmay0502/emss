import React from 'react'
import { useState } from 'react'
import OrderFlowTwo from './OrderFlowTwo'
import OrderFlowTwoSender from './OrderFlowTwoSender'

function OrderActions2(props) {

    console.log("Order action:", props.Order)
    const order=props.Order[0]
    console.log(props.Order)

    console.log("action 2")

    const [isSender,setIsSender] = useState(2);

    const ID=sessionStorage.getItem("sessionToken").substring(8);

    if(ID===order["source"]){
        setIsSender(1);
    }
    else if(ID==order["destination"]){
        setIsSender(2);
    }

    
    return (
        <div className='mt-10'>
            {isSender==1 && <OrderFlowTwoSender Order={props.Order} OrderID={props.Order[0]["orderid"]}/> }
            {isSender==2 && <OrderFlowTwo Order={props.Order} OrderID={props.Order[0]["orderid"]}/> }
           
        </div>
    )
}

export default OrderActions2
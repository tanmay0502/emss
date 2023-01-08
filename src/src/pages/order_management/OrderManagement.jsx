import React from 'react';
import OrderList from './OrderList';

export default function OrderManagement(){

    const arr = [{text: 'Order Management', href: "/session/ordermanagement"},{text: 'Order List', href: "/session/ordermanagement"}];
    return (
        <div style={{height: "100%"}}>
            {/* <Navigator navicon={<GenOrderIcon/>}  navtext = {arr}/> */}
            <OrderList/>
        </div>
    )
}
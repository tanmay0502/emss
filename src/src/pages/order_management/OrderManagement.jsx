import React from 'react';
import './styles/order.css';
import OrderList from './OrderList';
import Navigator from './Navigator';
import { ReactComponent as GenOrderIcon } from '../../assets/GenOrder.svg';

export default function OrderManagement(){

    const arr = [{text: 'Order Management', href: "/session/ordermanagement"},{text: 'Order List', href: "/session/ordermanagement"}];
    return (
        <div style={{height: "100%"}}>
            {/* <Navigator navicon={<GenOrderIcon/>}  navtext = {arr}/> */}
            <OrderList/>
        </div>
    )
}
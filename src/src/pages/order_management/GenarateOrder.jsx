import React, {useState,useEffect} from "react";
import { useParams } from "react-router-dom"
import GenarateOrderDEF from "./GenarateOrderDEF";
import GenarateOrderINTF from "./GenarateOrderINTF";
import GenarateOrderITAS from "./GenarateOrderITAS";
import GenarateOrderITRS from "./GenarateOrderITRS";
import GenarateOrderNEW from "./GenarateOrderNEW";
import GenarateOrderREP from "./GenarateOrderREP";
import GenarateOrderSEC from "./GenarateOrderSEC";

export default function GenarateOrder (){

    const {orderType} = useParams()
    console.log(orderType);
    return (
        <>
        {orderType=="ITRS" && <GenarateOrderITRS/>}
        {orderType=="ITAS" && <GenarateOrderITAS/>}
        {orderType=="DEF" && <GenarateOrderDEF/>}
        {orderType=="INTF" && <GenarateOrderINTF/>}
        {orderType=="NEW" && <GenarateOrderNEW/>}
        {orderType=="REP" && <GenarateOrderREP/>}
        {orderType=="SEC" && <GenarateOrderSEC/>}
        </>
    )
}
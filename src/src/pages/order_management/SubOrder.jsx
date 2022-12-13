import React from 'react'
import { DynamicDataTable } from '@langleyfoxall/react-dynamic-data-table'
import styles from './styles/orderdetails.module.css'
import { useState, useEffect } from "react";
import SourceLocationPin from '../../assets/src_location_pin.png'
import DestLocationPin from '../../assets/dest_location_pin.png'

function SubOrder(props) {

  const mapOrderStatus={
    "OG":"Order Generated",
    "SC":"Sender Supply Information Provided",
    "RC":"Receiver Demand Information Provided",
    "RA":"Receiver Accepted Allocation",
    "SI":"Sender Issued Order",
    "IT":"In Transit",
    "OC":"Order Completed",
    "OT":"Order Terminated(Canceled)"
  }


  const Order = props.Order
  let myrow=[]
  for(let i=0;i<Order["units"].length;i++){
      myrow.push(
        { "Type": Order["units"][i]["item"], "Quantity": Order["units"][i]["itemquantity"], "Model": Order["units"][i]["itemmodel"],  "Manufacturer": Order["units"][i]["manufacturer"] }
      )
  }


  return (

    <>
      <div className="border-2 border-black rounded-lg p-10 w-full">
        <div className={styles.detailsPaneLocation}>
          <div className={styles.detailsPaneLocationSource} ><img src={SourceLocationPin} /> Source: <span>{Order["source"]}</span></div>
          <div className={styles.detailsPaneLocationDest} ><img src={DestLocationPin} /> Destination: <span>{Order["destination"]}</span></div>
        </div>
        <div className={styles.orderUnitDetails}>
          <h5 className='mt-3 ml-2'>Units Description</h5>
          <div className={styles.orderUnitDataContainer}>
            <DynamicDataTable rows={myrow} buttons={[]} />
          </div>
          <p>Status: {mapOrderStatus[Order["orderstatus"]]}</p>
        </div>
      </div>
    </>

  )
}

export default SubOrder

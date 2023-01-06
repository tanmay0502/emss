import React from 'react'
import { DynamicDataTable } from '@langleyfoxall/react-dynamic-data-table'
import styles from './styles/orderdetails.module.css'
import { useState, useEffect } from "react";
import SourceLocationPin from '../../assets/src_location_pin.png'
import DestLocationPin from '../../assets/dest_location_pin.png'

function SubOrder(props) {

  const mapOrderStatus = {
    "OG": "Order Generated",
    "SC": "Sender Supply Information Provided",
    "RC": "Receiver Demand Information Provided",
    "RA": "Receiver Accepted Allocation",
    "SI": "Sender Issued Order",
    "IT": "In Transit",
    "OC": "Order Completed",
    "OT": "Order Terminated(Canceled)"
  }


  const unsortedOrder = props.Order

  const Order = unsortedOrder.sort(function (a, b) {
    if (a.manufacturer < b.manufacturer) {
      return -1;
    } else if (a.manufacturer > b.manufacturer) {
      return 1;
    } else {
      if (a.itemmodel < b.itemmodel) {
        return -1;
      } else if (a.itemmodel > b.itemmodel) {
        return 1;
      } else {
        return 0;
      }
    }
  });
  let source = ""
  let destination = ""
  console.log("order", Order)
  let myrow = []
  if (Order && Order.length) {
    for (let i = 0; i < Order.length; i++) {
      let buQuantity = (Order[i]["item"] === "BU") ? Order[i]["itemquantity"] : 0;
      let cuQuantity = (Order[i]["item"] === "CU") ? Order[i]["itemquantity"] : 0;
      let vvpatQuantity = (Order[i]["item"] === "VVPAT") ? Order[i]["itemquantity"] : 0;
      if (props.isSubOrder) {

        if (i > 0 && Order[i]["manufacturer"] === Order[i - 1]["manufacturer"] && Order[i]["itemmodel"] === Order[i - 1]["itemmodel"]) {
          myrow.pop();
          buQuantity += (Order[i - 1]["item"] === "BU") ? Order[i - 1]["itemquantity"] : 0;
          cuQuantity += (Order[i - 1]["item"] === "CU") ? Order[i - 1]["itemquantity"] : 0;
          vvpatQuantity += (Order[i - 1]["item"] === "VVPAT") ? Order[i - 1]["itemquantity"] : 0;
          myrow.push(
            { "Order Id": Order[i]["orderid"], "Manufacturer": Order[i]["manufacturer"], "Model": Order[i]["itemmodel"], "BU": buQuantity, "CU": cuQuantity, "VVPAT": vvpatQuantity }
          )

        } else {
          myrow.push(
            { "Order Id": Order[i]["orderid"], "Manufacturer": Order[i]["manufacturer"], "Model": Order[i]["itemmodel"], "BU": buQuantity, "CU": cuQuantity, "VVPAT": vvpatQuantity }
          )
        }
      }
      else {
        if (i > 0 && Order[i]["manufacturer"] === Order[i - 1]["manufacturer"] && Order[i]["itemmodel"] === Order[i - 1]["itemmodel"]) {
          myrow.pop();
          buQuantity += (Order[i - 1]["item"] === "BU") ? Order[i - 1]["itemquantity"] : 0;
          cuQuantity += (Order[i - 1]["item"] === "CU") ? Order[i - 1]["itemquantity"] : 0;
          vvpatQuantity += (Order[i - 1]["item"] === "VVPAT") ? Order[i - 1]["itemquantity"] : 0;
          myrow.push(
            { "Manufacturer": Order[i]["manufacturer"], "Model": Order[i]["itemmodel"], "BU": buQuantity, "CU": cuQuantity, "VVPAT": vvpatQuantity }
          )

        } else {
          myrow.push(
            { "Manufacturer": Order[i]["manufacturer"], "Model": Order[i]["itemmodel"], "BU": buQuantity, "CU": cuQuantity, "VVPAT": vvpatQuantity }
          )
        }
      }
      source = Order[0].sourcestate;
      destination = Order[0].destinationstate;

    }
  }
  console.log("table", myrow)
  function renderSwitch(item) {
    switch (item) {
      case "OG":
        return <p><strong>Status: Order Generated</strong><br />Waiting for receiver district demand information</p>
      case "RD":
        return <p><strong>Status: Receiver District Demand Information Provided</strong><br />Waiting for receiver warehouse demand information</p>
      case "RC":
        return <p><strong>Status: Receiver Warehouse Demand Information Provided</strong><br />Waiting for sender district supply information</p>
      case "SD":
        return <p><strong>Status: Sender district supply information provided</strong><br />Waiting for sender warehouse supply information</p>
      case "SC":
        return <p><strong>Status: Sender warehouse supply information provided</strong><br />Waiting for reciever accepted allocation</p>
      case "RA":
        return <p><strong>Status: Receiver Accepted Allocation</strong><br />Waiting for sender to issue order</p>
      case "SI":
        return <p><strong>Status: Sender Issued Order</strong><br />Waiting for in transit</p>
      case "IT":
        return <p><strong>Status: In Transit</strong><br />Waiting for order completion</p>
      case "OC":
        return <p><strong>Status: Order Completed</strong></p>
      case "OT":
        return <p><strong>Status: Order Terminated(Canceled)</strong></p>

      default:
        return <p>Order Generated<br />Waiting for receiver district demand information</p>
    }
  }


  return (

    <>
      <div className="border-2 border-black rounded-lg p-10 w-full">
        <div className={styles.detailsPaneLocation}>
          <div className={styles.detailsPaneLocationSource} ><img src={SourceLocationPin} /> Source: <span>{source}</span></div>
          <div className={styles.detailsPaneLocationDest} ><img src={DestLocationPin} /> Destination: <span>{destination}</span></div>
        </div>
        <div className={styles.orderUnitDetails}>
          <h5 className='mt-3 ml-2'>Units Description</h5>
          <div className={styles.orderUnitDataContainer}>
            <DynamicDataTable rows={myrow} buttons={[]} />
          </div>
          {/* {Order && <p>Status: {[Order[0].orderstatus]}</p>} */}
          {Order && <p>{
            renderSwitch(Order[0].orderstatus)
          }</p>}
        </div>
      </div>
    </>

  )
}

export default SubOrder
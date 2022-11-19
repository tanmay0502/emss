import React from 'react'
import {DynamicDataTable} from '@langleyfoxall/react-dynamic-data-table'

import styles from './styles/orderdetails.module.css'
import SourceLocationPin from '../../assets/src_location_pin.png'
import DestLocationPin from '../../assets/dest_location_pin.png'

function SubOrder(props) {
  return (
    <div className={styles.detailsPane}>
        <div className={styles.detailsPaneLocation}>
            <div className={styles.detailsPaneLocationSource} ><img src={SourceLocationPin} /> Source: <span>{props.Source}</span></div>
            <div className={styles.detailsPaneLocationDest} ><img src={DestLocationPin} /> Destination: <span>{props.Destination}</span></div>
        </div>
        <div className={styles.orderUnitDetails}>
            <h5>Units Description</h5>
            <div className={styles.orderUnitDataContainer}>
                <DynamicDataTable />
            </div>
        </div>
    </div>
  )
}

export default SubOrder

import DynamicDataTable from "@langleyfoxall/react-dynamic-data-table";
import React from 'react'
import { useState } from 'react'
import {ReactComponent as AddRow} from '../../assets/AddRow.svg'
import {ReactComponent as RemoveRow} from '../../assets/RemoveRow.svg'

function OrderItem(props) {

    const newRow = {
        "Type": 'Select',
        "Quantity": 'Type',
        "Model": 'Select',
        "": <button className={props.styles.addRow} onClick={(e)=>{
            e.preventDefault()
         }}><AddRow /></button>
    }
    const [orderContents, setOrderContents] = useState([
        {
            "Type": 'CU',
            "Quantity": 50,
            "Model": 'M3',
            "": <button className={props.styles.removeRow} onClick={(e)=>{
                e.preventDefault()
             }}><RemoveRow /></button>
        },
        newRow
    ])

  return (
    <div className={props.styles.orderItem}>
        <div className={props.styles.selectContainer}>
            <div className={props.styles.selectGroup}>
                <label htmlFor="source">Source</label>
                <select required name="source" id="source">
                    <option>Select</option>
                </select>
            </div>
            <div className={props.styles.selectGroup}>
                <label htmlFor="destination">Destination</label>
                <select required name="destination" id="destination">
                    <option>Select</option>
                </select>
            </div>
        </div>
        <div className={props.styles.orderTableContainer}>
            <span>Unit Description</span>
            <DynamicDataTable className={props.styles.orderTable}
            rows={orderContents}
            buttons={[]}
            columnWidths={{
                // 10%
                '': '20px',}}
             />
        </div>
    </div>
  )
}

export default OrderItem
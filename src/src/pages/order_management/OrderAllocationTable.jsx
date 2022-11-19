import React, {useState, useEffect} from 'react'

import styles from './styles/optimisedAllocationTable.module.css'
import {ReactComponent as EditAllocation} from '../../assets/EditAllocation.svg'
import SourceLocationPin from '../../assets/src_location_pin.png'
import DestLocationPin from '../../assets/dest_location_pin.png'
import { DynamicDataTable } from '@langleyfoxall/react-dynamic-data-table'

function OrderAllocationTable() {

    const [data, setData] = useState([
        {
            'Model': 'M1',
            'Quantity CU': 50,
            'Quantity BU': 50,
            'Quantity VVPAT': 20
        },
        {
            'Model': 'M2',
            'Quantity CU': 50,
            'Quantity BU': 50,
            'Quantity VVPAT': 20
        }
    ])

    const [editableData, setEditableData] = useState([])
    const [editMode, setEditMode] = useState(false)

    const updateModelValues = (model, param, value) => {
        setData(data.map((val)=>{
            if(val['Model'] == model){
                return {...val, [param] : value}
            }
            else{
                return val
            }
        }))
    }

    useEffect(() => {
        if(!editMode){
            setEditableData(data.map((val) => {
                return {
                    'Model': val['Model'],
                    'Quantity CU': <input type={'number'} defaultValue={val['Quantity CU']} onChange={(e)=>{updateModelValues( val['Model'], 'Quantity CU', e.target.value )}} />,
                    'Quantity BU': <input type={'number'} defaultValue={val['Quantity BU']} onChange={(e)=>{updateModelValues( val['Model'], 'Quantity BU', e.target.value )}} />,
                    'Quantity VVPAT': <input type={'number'} defaultValue={val['Quantity VVPAT']} onChange={(e)=>{updateModelValues( val['Model'], 'Quantity VVPAT', e.target.value )}} />
                }
              }))
        }
      return () => {
        
      }
    }, [data])
    

  return (
    <div className={styles.optimisedAllocationTable}>
        <button className={styles.editAllocationButton} onClick={()=>{
            setEditMode(!editMode)
        }} >
            <EditAllocation />
        </button>
        <div className={styles.allocationLocationDetails}>
            {
                // Icon - Source Details - Arrow - Icon - Dest Details
            }
            <div className={styles.allocationLocationIcon} >
                <img src={SourceLocationPin} />
            </div>
            <div>
                <p className={styles.allocationLocationDetailsSource}><span>Source: </span> {'AA1122'} </p>
                <p><span>Incharge: </span> {'Jane'} </p>
            </div>
            <div className={styles.allocationLocationArrow}>
                
            </div>
            <div className={styles.allocationLocationIcon} >
                <img src={DestLocationPin} />
            </div>
            <div>
                <p className={styles.allocationLocationDetailsDestination}><span>Destination: </span> {'BB1122'} </p>
                <p><span>Incharge: </span> {'Jose'} </p>
            </div>
        </div>
        <div className={styles.allocationDetailsTable}>
            <DynamicDataTable rows={editMode ? editableData : data} buttons={[]} />
        </div>
    </div>
  )
}

export default OrderAllocationTable
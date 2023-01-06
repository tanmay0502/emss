import React, {useState, useEffect} from 'react'

import styles from './styles/optimisedAllocationTable.module.css'
import {ReactComponent as EditAllocation} from '../../assets/EditAllocation.svg'
import SourceLocationPin from '../../assets/src_location_pin.png'
import DestLocationPin from '../../assets/dest_location_pin.png'
import { DynamicDataTable } from '@langleyfoxall/react-dynamic-data-table'
import { getVehicleDetails } from './Utils'

function SuborderTable(props) {
    const initialVisibilityValues = {
        vehicleDetails: false
      };

    const [cardVisibility, setCardVisibility] = useState(initialVisibilityValues);

    const [data, setData] = useState(props.val.details)
    console.log(props)

    

    const VehicleDetails = ({isVisible}) => {
        return (isVisible?<div className={styles.allocationDetailsTable}>
                    <DynamicDataTable rows={props.vehicleData} buttons={[]} />
                </div>:<></>);
    }

    const ActionButton = ({ isActive, text, name, onClick }) => {
        return (
          <button
            className={`font-mediumisActive mx-auto mb-8 w-5/5 border-[1px] border-solid border-secondary hover:bg-secondary hover:text-white ${
              isActive ? "bg-secondary text-white" : "bg-white  text-secondary"
            }`}
            name={name ? name : text}
            onClick={onClick}
          >
            {text}
          </button>
        );
      };

        const handleButtonClick = (e) => {
            const { name } = e.currentTarget;
            const update = { ...initialVisibilityValues };
            if (cardVisibility[name]) {
              update[name] = false;
            } else {
              update[name] = true;
            }
            setCardVisibility(update);
          };
      


  return (
    <div className={styles.optimisedAllocationTable}>
        <div className={styles.allocationLocationDetails}>
            {
                // Icon - Source Details - Arrow - Icon - Dest Details
            }
            <div className={styles.allocationLocationIcon} >
                <img src={SourceLocationPin} />
            </div>
            <div>
                <p className={styles.allocationLocationDetailsSource}><span><strong>Source</strong> </span> <br/> {props.val.source}: {props.val.sourcedistrict}</p>
               
            </div>
            <div className={styles.allocationLocationArrow}>
                
            </div>
            <div className={styles.allocationLocationIcon} >
                <img src={DestLocationPin} />
            </div>
            <div>
                <p className={styles.allocationLocationDetailsDestination}><span><strong>Destination</strong> </span> <br/>{props.val.destination}: {props.val.destinationdistrict}</p>
  
            </div>
        </div>
        <div className={styles.allocationDetailsTable}>
            <DynamicDataTable rows={data} buttons={[]} fieldMap={{'sourcedistrict': 'Source District','item': 'Item Type','itemmodel': 'Model','itemquantity': 'Quantity','destinationdistrict': 'Destination District' }} />
        </div>
        <div>
        <ActionButton
              isActive={cardVisibility.vehicleDetails}
              text="Vehicle Details"
              name="vehicleDetails"
              onClick={handleButtonClick}
            />
        </div>
        <VehicleDetails isVisible={cardVisibility.vehicleDetails}/>
    </div>
  )
}

export default SuborderTable

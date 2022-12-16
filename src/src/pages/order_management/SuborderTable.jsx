import React, {useState, useEffect} from 'react'

import styles from './styles/optimisedAllocationTable.module.css'
import {ReactComponent as EditAllocation} from '../../assets/EditAllocation.svg'
import SourceLocationPin from '../../assets/src_location_pin.png'
import DestLocationPin from '../../assets/dest_location_pin.png'
import { DynamicDataTable } from '@langleyfoxall/react-dynamic-data-table'

function SuborderTable() {

    const initialVisibilityValues = {
        vehicleDetails: false
      };

    const [cardVisibility, setCardVisibility] = useState(initialVisibilityValues);

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

    const [vehicleData,setVehicleDate] = useState([
        {
            "Vehicle Number": "GJ0138B8171",
            "Driver Name": "Suresh Kumar",
            "Driver Contact": "7990763895",
            "Escort Name": "Suraj Dev",
            "Escort Contact": "9489958352",
        }
    ]);

    const VehicleDetails = ({isVisible}) => {
        return (isVisible?<div className={styles.allocationDetailsTable}>
                    <DynamicDataTable rows={vehicleData} buttons={[]} />
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
            <DynamicDataTable rows={data} buttons={[]} />
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
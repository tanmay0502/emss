import React from 'react'
import { useState } from 'react'
import AllocateOrder from './AllocateOrder'

import styles from './styles/orderactions.module.css'

function OrderActions() {

    const [action, setAction] = useState(null)

    const roles = [
        "sender", // fill availability
        "recipient", // fill demand, optimal allocation, view vehicle details
        "creator" // view
    ]

    const actions = (role) =>{
        if(role == 'sender'){
            return [
                "Fill Availability"
            ]
        }
        else if(role == 'recipient') {
            return [
                "Fill Demand",
                "Optimal Allocation",
                "Vehicle Details",
            ]
        }
    }

    const ind = 1;

    const renderAction = (actionIndex) => {
        if(roles[ind] == 'sender'){
            switch(actions(roles[ind])[actionIndex]){
                case 'Fill Availability':
                    return "Fill Availability"
            }
        }
        else if(roles[ind] == 'recipient'){
            switch(actions(roles[ind])[actionIndex]){
                case 'Fill Demand':
                    return "Fill Demand"
                case 'Optimal Allocation':
                    return <AllocateOrder />
                case 'Vehicle Details':
                    return "Vehicle Details"
            }
        }
    }

    return (
        <>
            <div className={styles.actionButtonContainer}>
                {
                    ind == 0 ? <>
                        <button className={styles.fillAvailabilityButton} onClick={()=>{
                            setAction(renderAction(0))
                        }}>
                            Fill Availability
                        </button>
                    </>
                    :
                    <>
                        <button onClick={()=>{
                            setAction(renderAction(0))
                        }} >
                            Fill Demand
                        </button>
                        <button onClick={()=>{
                            setAction(renderAction(1))
                        }} >
                            Optimal Allocation
                        </button>
                        <button disabled onClick={()=>{
                            setAction(renderAction(2))
                        }} >
                            Vehicle Details
                        </button>
                    </>
                }
            </div>
            {action && <div className={styles.actionContainer}>
                { 
                    action
                }
            </div>}
        </>
    )
}

export default OrderActions
import React from 'react'
import { useState } from 'react'
import AllocateOrder from './AllocateOrder'
import FillDemand from './FillDemand'
import styles from './styles/orderactions.module.css'
import { useNavigate } from 'react-router-dom'
import WareHouseListUnitTrackerFillDemand from './warehouseListUnitTrackerfilldemand'
import VehicleDetails from './vehicledetails'
import WareHouseListUnitTrackerFillAvailability from './warehouseListUnitTrackerfillavailability'
import { useEffect } from 'react'
import OrderFlowOne from './OrderFlowOne'
import DistrictFillDemand from './DistrictFillDemand'
import DistrictFillAvailability from './DistrictFillAvailability'

function OrderActions(props) {

    console.log("Order acetion:", props.Order)
    const order=props.Order[0]
    console.log(props.Order)
    console.log("action 1")

    const [action, setAction] = useState(null)
    const [senderOrder,setSenderOrder] =useState([])
    const [recipientOrder,setRecipientOrder] =useState([])
    const [f1,setf1]=useState(0)
    const [f2,setf2]=useState(0)
    const [f3,setf3]=useState(0)
    const [f4,setf4]=useState(0)
    const [f5,setf5]=useState(0)
    const [f6,setf6]=useState(0)
    
    const [ind,setInd]=useState(4);
    const [filldemand, setFilldemand] = useState(0);
    const [permissionSenderDistrict, setpermissionSenderDistrict] = useState(false)
    const [permissionRecieverDistrict, setpermissionRecieverDistrict] = useState(false)
    const navigate = useNavigate()
    const roles = [
        "sender", // fill availability
        "recipient", // fill demand, optimal allocation, view vehicle details
        "both",
        "creator", // view
        "other", // view
        "admin"
    ]

    async function validatepermissionSender_District() {
        try {
          const body = {
            "moduleName": "Order",
            "operation": "OrderActionsForSenderDistrict",
            "operandState": order["source"],
            "operandDist": sessionStorage.getItem("sessionToken").substring(2,5),
            "operandAC": "000",
            "operandRole": "-"
          }
          console.log(body)
          const response = await fetch(
            `${process.env.REACT_APP_API_SERVER}/user/validate_permissionAPI/`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              credentials: 'include',
              body: JSON.stringify(body)
            }
          );
          console.log("fetcjed", response.status)
          if (response.status === 200) {
            setpermissionSenderDistrict(true);
          }
        } catch (err) {
          console.log(err);
        }
    }
    async function validatepermissionReciever_District() {
        try {
          const body = {
            "moduleName": "Order",
            "operation": "OrderActionsForRecieverDistrict",
            "operandState": order["destination"],
            "operandDist": sessionStorage.getItem("sessionToken").substring(2,5),
            "operandAC": "000",
            "operandRole": "-"
          }
          console.log("", body)
          const response = await fetch(
            `${process.env.REACT_APP_API_SERVER}/user/validate_permissionAPI/`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              credentials: 'include',
              body: JSON.stringify(body)
            }
          );
          console.log("boddi", body)
          console.log("fetcjed", response.status)
          if (response.status === 200) {
            setpermissionRecieverDistrict(true);
          }
        } catch (err) {
          console.log(err);
        }
    }

    useEffect(()=>{
        validatepermissionSender_District()
        validatepermissionReciever_District()
    },[])

    useEffect(()=>{  
        const userid=sessionStorage.getItem("sessionToken");
        let sender_order=[]
        let recipient_order=[]

        props.Order.map((order)=>{

        
        
            console.log(userid.substring(8))
            if(permissionSenderDistrict){
                    console.log("Inside if")
                    sender_order.push(order);
               
                    if(order["orderstatus"]=="SD"){
                        setf1(1);
                    }
                    else {
                        setf1(0);
                    }
                    if(order["orderstatus"]=="RA" || order["orderstatus"]=="SI" || order["orderstatus"]=="IT" || order["orderstatus"]=="OC"){
                        setf5(1);
                    }
                    else {
                        setf5(0);
                    }
                    if(order["orderstatus"]=="");
                
                
            }
            else if(permissionRecieverDistrict){
               
                recipient_order.push(order)
                
                if(order["orderstatus"]=="RD"){
                    setf2(1);
                }
                else {
                    setf2(0);
                }
                  

                if(order["orderstatus"]=="SC"){
                    setf3(1);
                }
                else {
                    setf3(0);
                }
                if(order["orderstatus"]=="RA" || order["orderstatus"]=="SI" || order["orderstatus"]=="IT" || order["orderstatus"]=="OC"){
                    setf4(1);
                }
                else {
                    setf4(0);
                }

            }
            else if("ADM"==userid.substring(8)){
                setInd(5);
                if(order["orderstatus"]=="RA" || order["orderstatus"]=="SI" || order["orderstatus"]=="IT" || order["orderstatus"]=="OC"){
                    setf6(1);
                }
            }
        
        })
        
        // flags are
        // f1 for availability
        // f2 for demand
        // f3 for allocation
        // f4 for vehicle
        // f5 for Issued

        
        
        console.log(f1,f2,f3,f4,f5,f6);
            setSenderOrder(sender_order);
         
            setRecipientOrder(recipient_order);
    
        
       
        if(sender_order.length>0 && recipient_order.length>0){
            setInd(2);
        }
        else if(sender_order.length>0){
            setInd(0)
        }
        else if(recipient_order.length>0){
            setInd(1);
        }
        else if("ADM"==userid.substring(8)){
            setInd(5);
        }
        else{
            setInd(4)
        }
        console.log(sender_order)
        console.log(recipient_order)
        console.log(ind)
    },[permissionSenderDistrict, permissionRecieverDistrict])

    const actions = (role) => {
        if (role == 'sender') {
            return [
                "Fill Availability",
                "Issue Order"
            ]
        }
        else if (role == 'recipient') {
            return [
                "Fill Demand",
                "Optimal Allocation",
                "Vehicle Details",
            ]
        }
        else if (role == 'both') {
            return [
                "Fill Demand",
                "Fill Availability",
                "Optimal Allocation",
                "Vehicle Details",
            ]
        }
        else if (role == 'admin') {
            return [
                "admin",
            ]
        }
        else {
            return []
        }
    }


    const renderAction = (actionIndex) => {
        if (roles[ind] == 'sender') {
            switch (actions(roles[ind])[actionIndex]) {
                case 'Fill Availability':
                    return <WareHouseListUnitTrackerFillAvailability unitDetails = {props.unitDetails} Order={senderOrder} OrderID={props.OrderID} />
                case 'Issue Order':
                    return <OrderFlowOne Order={senderOrder} OrderID={props.OrderID} isSender={1}/>
            }
        }
        else if (roles[ind] == 'recipient') {
            switch (actions(roles[ind])[actionIndex]) {
                case 'Fill Demand':
                    return <WareHouseListUnitTrackerFillDemand unitDetails = {props.unitDetails} Order={recipientOrder} OrderID={props.OrderID}/>
                case 'Optimal Allocation':
                    return <AllocateOrder OrderID={props.OrderID} type={order.type}/>
                case 'Vehicle Details':
                    return <OrderFlowOne Order={recipientOrder} OrderID={props.OrderID} isSender={0}/>
            }
        }
        else if (roles[ind] == 'both') {
            switch (actions(roles[ind])[actionIndex]) {
                case 'Fill Demand':
                    return <WareHouseListUnitTrackerFillDemand unitDetails = {props.unitDetails} Order={recipientOrder} OrderID={props.OrderID}/>
                case 'Fill Availability':
                    return <WareHouseListUnitTrackerFillAvailability unitDetails = {props.unitDetails} Order={senderOrder} OrderID={props.OrderID}/>
                case 'Optimal Allocation':
                    return <AllocateOrder />
                case 'Vehicle Details':
                    return <VehicleDetails/>
            }
        }
        else if (roles[ind] == 'admin') {
            console.log("ss")
            switch (actions(roles[ind])[actionIndex]) {
                case 'admin':
                    return <OrderFlowOne OrderID={props.OrderID} isSender={0}/>
            }
        }
    }

    return (
        <>
            {
                filldemand == 0 &&
                <div className=' text-white m-5 p-5'>
                    {
                        ind == 0 && <div className='flex justify-between w-full'>
                            <button disabled={!f1}  className={`${f1==0 ? 'bg-gray-400' : 'bg-orange-500'}`} onClick={() => {
                                setAction(renderAction(0))
                            }}>
                                Fill Availability
                            </button>
                            <button disabled={!f5}  className={`${f5==0 ? 'bg-gray-400' : 'bg-orange-500'}`} onClick={() => {
                                setAction(renderAction(1))
                            }}>
                                Order Details
                            </button>
                        </div>
                    }
               
                    {    ind ==1 && 
                            <div className='flex justify-between w-full'>
                                <button disabled={!f2}  className={`${f2==0 ? 'bg-gray-400' : 'bg-orange-500'}`} onClick={() => {
                                    setAction(renderAction(0))
                                }}>
                                    Fill Demand
                                </button>
                                {/* <button disabled={!f3}  className={`${f3==0 ? 'bg-gray-400' : 'bg-orange-500'}`}  onClick={() => {
                                    setAction(renderAction(1))
                                }} >
                                    Optimal Allocation
                                </button> */}
                                <button disabled={!f4}  className={`${f4==0 ? 'bg-gray-400' : 'bg-orange-500'}`}  onClick={() => {
                                    setAction(renderAction(2))
                                }} >
                                    Order Details
                                </button>
                            </div>
                    }
                    {    ind ==2 && 
                            <div className='flex justify-between w-full'>
                                <button disabled={!f2}  className={`${f2==0 ? 'bg-gray-400' : 'bg-orange-500'}`} onClick={() => {
                                    setAction(renderAction(0))
                                }}>
                                    Fill Demand
                                </button>
                                <button disabled={!f1}  className={`${f1==0 ? 'bg-gray-400' : 'bg-orange-500'}`} onClick={() => {
                                    setAction(renderAction(1))
                                }}>
                                    Fill Availability
                                </button>
                                {/* <button disabled={!f3}  className={`${f3==0 ? 'bg-gray-400' : 'bg-orange-500'}`} onClick={() => {
                                    setAction(renderAction(2))
                                }} >
                                    Optimal Allocation
                                </button> */}
                                <button disabled={!f4}  className={`${f4==0 ? 'bg-gray-400' : 'bg-orange-500'}`}  onClick={() => {
                                    setAction(renderAction(3))
                                }} >
                                    Vehicle Details
                                </button>
                            </div>
                    }
                    {    ind ==5 && 
                            <div className='flex justify-center w-full'>
                                <button disabled={!f6}  className={`${f6==0 ? 'bg-gray-400' : 'bg-orange-500'}`} onClick={() => {
                                    setAction(renderAction(0))
                                }}>
                                    Order Details
                                </button>
                                
                            </div>
                    }
                </div>
            }

            {
                action && <div className={styles.actionContainer}>
                    {
                        action
                    }
                </div>
            }
        </>
    )
}

export default OrderActions
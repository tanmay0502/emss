import React, { useState, useEffect } from "react";
import UnitDescription from "./Unit_description"
import { useParams } from "react-router-dom";
import styles from './styles/order.module.css'
import OrderActions from "./OrderActions";
import OrderActions2 from "./OrderActions2";

export default function ViewOrderDetails() {
  const OrderID = useParams();
  const id=OrderID?OrderID["orderID"]:[];
  let orderID="";
  for(let i=0;i<id.length;i++){
    if(id[i]=='-'){
      orderID+="/";
    }
    else
    orderID+=id[i];
  }


  const [flow,setFlow] = useState(1);

  const [Order, setOrder] = useState([]);
  const [allOrders, setAllOrders] = useState([]);
  const [validallOrders, setValidAllOrders] = useState([]);
  const [orderById, setOrderById] = useState({});
  const [orderDetailPage, setOrderDetailPage] = useState("-1");
  const UserId = window.sessionStorage.getItem('sessionToken');
  const [flag, setFlag] = useState(0);

  useEffect(() => {
    async function getOrders() {
      try {
        const body = {"orderid": orderID}
        console.log(body)
        const response = await fetch(
          `${process.env.REACT_APP_API_SERVER}/order/view_order/`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: 'include',
            body: JSON.stringify(body)
          }
        );
        const data2 = await response.json();
        console.log("fetcjed", data2)
        if (data2["data"]) {
          setAllOrders(data2["data"])
        }
      } catch (err) {
        console.log(err);
      }
    }
    if (orderID) {
      getOrders();
    }

  },[OrderID])


  
  useEffect(() => {
    let orderBy_Id = {}
    if (flag == 0 && allOrders != [] && allOrders) {
      setOrder([]);
      let validOrder=[]
      let myorder={
        units:[]
      }
      const ID = sessionStorage.getItem("sessionToken").substring(8);
      
      allOrders.map((order) => {
        console.log(ID)

        if((ID=="WHM" && order["referenceorderid"].split(':__').length>1) || (ID!="WHM" && order["referenceorderid"].split(':__').length==1)){
          validOrder.push(order)
          if(ID=="WHM"){
            console.log("under whm")
            setFlow(2);
          }
          
        }

        setFlag(1)
        
        const id = (orderID)
        if(order["referenceorderid"]==id){
          myorder["orderid"]=order["referenceorderid"]
          myorder["creatoruserid"]=order["creatoruserid"]
          myorder["orderstatus"]=order["orderstatus"]
          myorder["source"]=order["source"]
          myorder["destination"]=order["destination"]
          myorder["type"]=order["type"]
          let unit={}
          unit["item"]=order["item"]
          unit["itemmodel"]=order["itemmodel"]
          unit["itemquantity"]=order["itemquantity"]
          unit["manufacturer"]=order["manufacturer"]
          myorder["units"].push(unit)
          myorder["timestamp"]=order["timestamp"]
        }
        
      })
      setOrder(myorder)
      setValidAllOrders(validOrder)
    }
    
   

    setOrderById(orderBy_Id)
  }, [allOrders])



  return (
    <div className={styles.viewDetailsContainer}>
      {
        flag == 1 &&
        <>
          {validallOrders && <UnitDescription Order={validallOrders} OrderID={orderID} />}
          {validallOrders && flow==1 && <OrderActions Order={validallOrders} OrderID={orderID}/>}
          {validallOrders && flow==2 && <OrderActions2 Order={validallOrders} OrderID={orderID}/>}
        </>
      }
    </div >
  );
}
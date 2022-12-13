import React, { useState, useEffect } from "react";
import UnitDescription from "./Unit_description"
import { useParams } from "react-router-dom";
import styles from './styles/order.module.css'
import OrderActions from "./OrderActions";

export default function ViewOrderDetails() {
  const OrderID = useParams();
  console.log(OrderID["orderID"], "Orderid")
  const id=OrderID["orderID"];
  let orderID="";
  for(let i=0;i<id.length;i++){
    if(id[i]=='-'){
      orderID+="/";
    }
    else
    orderID+=id[i];
  }
  console.log(orderID)


  const [Order, setOrder] = useState([]);
  const [allOrders, setAllOrders] = useState([ {
    "orderid": "ECI/M/DL000MP000/12122022/0003:__1",
    "referenceorderid": "ECI/M/DL000MP000/12122022/0003",
    "creatoruserid": "MP000000CEO",
    "orderstatus": "RC",
    "manufacturer": "BEL",
    "source": "DL",
    "destination": "MP",
    "type": "ITRS",
    "item": "VVPAT",
    "itemmodel": "M3",
    "itemquantity": "1000",
    "timestamp": "2022-12-12T17:52:31.507353"
},
{
    "orderid": "ECI/M/DL000MP000/12122022/0003:__2",
    "referenceorderid": "ECI/M/DL000MP000/12122022/0003",
    "creatoruserid": "MP000000CEO",
    "orderstatus": "RC",
    "manufacturer": "BEL",
    "source": "DL",
    "destination": "MP",
    "type": "ITRS",
    "item": "CU",
    "itemmodel": "M3",
    "itemquantity": "1000",
    "timestamp": "2022-12-12T17:52:31.507353"
}]);
  const [isPageLoaded, setIsPageLoaded] = useState(0);
  const [orderById, setOrderById] = useState({});
  const [orderDetailPage, setOrderDetailPage] = useState("-1");
  const UserId = window.sessionStorage.getItem('sessionToken');
  const [flag, setFlag] = useState(0);

  async function getOrders() {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_SERVER}/order/list_orders/`,
        // `${process.env.REACT_APP_API_SERVER}/order/list_orders/CH01001DEO`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          mode: "cors"
        }
      );
      const data2 = await response.json();
      setAllOrders(data2["data"])
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    if (isPageLoaded == 0) {
      getOrders();
      setIsPageLoaded(1)
    }

  })


  
  useEffect(() => {
    let orderBy_Id = {}
    console.log(allOrders, "allorders")
    if (flag == 0 && allOrders != []) {
      setOrder([]);
      let myorder={
        units:[]
      }
      
      allOrders.map((order) => {

        setFlag(1)
        
        const id = (orderID)
        // const id = getId(order["orderID"])
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
      console.log(myorder)
      setOrder(myorder)
    }
    

    setOrderById(orderBy_Id)
  }, [allOrders])

  useEffect(()=>{
    console.log(Order)
  },[Order])


  return (
    <div className={styles.viewDetailsContainer}>
      {
        flag == 1 &&
        <>
          <UnitDescription Order={Order} OrderID={orderID} />
          <OrderActions Order={Order} OrderID={orderID}/>
        </>
      }
    </div >
  );
}
import React, { useState, useEffect } from "react";
import UnitDescription from "./Unit_description"
import { useParams } from "react-router-dom";
import styles from './styles/order.module.css'
import OrderActions from "./OrderActions";
import OrderActions2 from "./OrderActions2";

export default function ViewOrderDetails() {
  const param = useParams();
  const id=param?param["orderID"]:[];
  const [newId,setNewId] = useState("0")
  const [isPageLoaded,setIsPageLoaded]=useState(0);
  const [orderID,setOrderID]  = useState()

  useEffect(()=>{
    if(isPageLoaded==0){
    let pp="";
    let showingSubOrder = ""
    let f=0;
    for(let i=0;i<id.length;i++){
  
      if(f==1){
        showingSubOrder+=id[i];
        continue;
      }
      if(id[i]==","){
        f=1;
        continue;
      }
      if(id[i]=='-'){
        pp+="/";
      }
      else{
      pp+=id[i];
      }
    }
    setOrderID(pp)
  
    console.log(pp,showingSubOrder)
  
    if(showingSubOrder!="") setNewId(showingSubOrder)
  setIsPageLoaded(1);
  }
  })
 
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

  },[orderID])


  
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
      console.log(validOrder)
      setValidAllOrders(validOrder)
    }
    
   

    setOrderById(orderBy_Id)
  }, [allOrders])



  return (
    <div className={styles.viewDetailsContainer}>
      {
        flag == 1 &&
        <>
          {validallOrders && <UnitDescription Order={validallOrders} OrderID={newId=="0"?orderID:newId} />}
          {validallOrders && flow==1 && <OrderActions Order={validallOrders} OrderID={newId=="0"?orderID:newId}/>}
          {validallOrders && flow==2 && <OrderActions2 Order={validallOrders} OrderID={newId=="0"?orderID:newId}/>}
        </>
      }
    </div >
  );
}
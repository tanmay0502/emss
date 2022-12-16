import React, { useState, useEffect } from "react";
import UnitDescription from "./Unit_description"
import { useParams } from "react-router-dom";
import styles from './styles/order.module.css'
import OrderActions from "./OrderActions";
import OrderAllocationTable from './OrderAllocationTable'
import styles2 from './styles/suborder.module.css'
import UnitTrackerTable from './UnitTrackerTable'
import SuborderTable from './SuborderTable';

export default function OrderFlowOne() {
  const OrderID = useParams();
  const id=OrderID["orderID"];
  console.log(id);
  let orderID="";
  for(let i=0;i<id.length;i++){
    if(id[i]=='-'){
      orderID+="/";
    }
    else
    orderID+=id[i];
  }


  const [Order, setOrder] = useState([]);
  const [allOrders, setAllOrders] = useState([]);
  const [isPageLoaded, setIsPageLoaded] = useState(0);
  const [orderById, setOrderById] = useState({});
  const [orderDetailPage, setOrderDetailPage] = useState("-1");
  const UserId = window.sessionStorage.getItem('sessionToken');
  const [flag, setFlag] = useState(0);

  useEffect(() => {
    async function getOrders() {
      try {
        const body = {"orderid": orderID}
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
        if(data2['data'])
            setAllOrders(data2["data"])
      } catch (err) {
        console.log(err);
      }
    }
    if (isPageLoaded == 0) {
      getOrders();
      setIsPageLoaded(1)
    }

  },[])


  
  useEffect(() => {
    let orderBy_Id = {}
    if (flag == 0 && allOrders != []) {
      setOrder([]);
      let myorder={
        units:[]
      }
      
      allOrders.map((order) => {

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
    }
    

    setOrderById(orderBy_Id)
  }, [allOrders])



  return (
    <>
    <div className={styles.viewDetailsContainer}>
      {
        flag == 1 &&
        <>
          <UnitDescription Order={allOrders} OrderID={orderID} />
          <OrderActions Order={allOrders} OrderID={orderID}/>
        </>
      }
    </div >
    {/* <div className={styles2.orderAllocationContainer}> */}
			<div className={styles2.optimisedAllocationContainer}>
				<div className={styles2.optimisedAllocationHeader}>
					<h4>Suborder List</h4>
				</div>
				<div className={styles2.optimisedAllocationTablesContainer}>
					<div className={styles2.optimisedAllocationTablesScrollContainer}>
						<div className={styles2.optimisedAllocationTables}>
							<SuborderTable />
							<SuborderTable />
							<SuborderTable />
						</div>
					</div>
				</div>
			</div>
		{/* </div> */}
    </>
  );
}
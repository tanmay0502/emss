import React, { useState, useEffect } from "react";
import styles2 from './styles/suborder.module.css'
import SuborderTable from './SuborderTable';

export default function OrderFlowOne({OrderID,isSender}) {
  
  const id=OrderID
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
  const [subDat,setSubDat] = useState([]);
  const [flag, setFlag] = useState(0);
  const [type,setType] = useState(0);

  function getSubOrder(val) {
    let suborderid = [];
    val.map(function(order){
      if(order['referenceorderid']===orderID) {
        suborderid.push(order['orderid']);
        setType(order["orderstatus"]=="RA")
      }
    });
    let suborderdat = [];
    suborderid.map(function(v){
      val.map(function(order){
        if(order['referenceorderid']===v) {
          suborderdat.push({
            "source" : order['source'],
            "destination" : order['destination'],
            "item" : order["item"],
            "itemmodel": order['itemmodel'],
            "itemquantity": order['itemquantity']
          });
        }
      });
    });
    let finalsubdat = [];
    let i = 0;
    let included ={}

    console.log(suborderdat)

    suborderdat.map((val)=>{
      console.log(val)
      let detail={
        "item":val["item"],
        "itemmodel":val["itemmodel"],
        "itemquantity":val["itemquantity"]
      }
      if(val["source"] in included){
        if(val["destination"] in included[val["source"]]){
          
          
          included[val["source"]][val["destination"]].push(detail)
        }
        else{
          included[val["source"]][val["destination"]]=[]
          included[val["source"]][val["destination"]].push(detail)
        }
      }
      else{
        included[val["source"]]={
          [val["destination"]]:[]
        }
        included[val["source"]][val["destination"]].push(detail)

      }

    })

    console.log(included)
    Object.keys(included).map((val)=>{
      Object.keys(included[val]).map((val2)=>{
        finalsubdat.push(
          {
            "source":val,
            "destination":val2,
            "details":included[val][val2]
          }
        )
      })
    })
    console.log(included)

    console.log(finalsubdat)
    setSubDat(finalsubdat);
  }

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
        if(data2['data']) {
          console.log(data2["data"])
            getSubOrder(data2['data']);
            setAllOrders(data2["data"]);
        }
      } catch (err) {
        console.log(err);
      }
    }
    if (isPageLoaded == 0) {
      getOrders();
      setIsPageLoaded(1)
    }

  },[])

  async function fun() {
    try {
      const body = orderID
      const response = await fetch(
        `${process.env.REACT_APP_API_SERVER}/order/senderOrderApproval/?orderID=${orderID}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: 'include'
        }
      );
      const data2 = await response.json();
      if(data2) {
          alert("Order Issued Successfully");
          window.location = '/session/ordermanagement'
      }
    } catch (err) {
      console.log(err);
    }
  }
  
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
   
    {/* <div className={styles2.orderAllocationContainer}> */}
			<div className={styles2.optimisedAllocationContainer}>
				<div className={styles2.optimisedAllocationHeader}>
					<h4>Suborder List</h4>
				</div>
				<div className={styles2.optimisedAllocationTablesContainer}>
					<div className={styles2.optimisedAllocationTablesScrollContainer}>
						<div className={styles2.optimisedAllocationTables}>
							{subDat.map(function(dat){
                return <SuborderTable val={dat}/>
              })}
              {isSender==1 && <button onClick={fun} disabled={!type}  className={`${type==0 ? 'bg-gray-400 text-white' : 'bg-orange-500 text-white'}`}>Hand Shake</button>}
						</div>
					</div>
				</div>
			</div>
		{/* </div> */}
    </>
  );
}



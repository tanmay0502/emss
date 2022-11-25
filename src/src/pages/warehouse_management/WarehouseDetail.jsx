import React, { useEffect,useState } from "react";
import { AiOutlineArrowLeft, AiOutlineEdit } from 'react-icons/ai'
import { createSearchParams, useNavigate } from "react-router-dom";
import { ReactComponent as PermanentWarehouses } from '../../assets/PermanentWarehouses.svg';
import { ReactComponent as TemporaryWarehouses } from '../../assets/TemporaryWarehouses.svg';

function WarehouseDetail(props) {
  const navigate = useNavigate();
  const [lat,setLat]=useState("")
  const [long,setLong]=useState("")

  function getlatlong(latlong){
    let p=latlong.slice(1,(latlong.length-1))
    console.log(p)

    let lat=""
    let long=""
    let f=0
    for(let i=0;i<p.length;i++){
      if(p[i]!=',' && f==0){
        lat = lat + p[i];
      }
      else if(p[i]==","){
        f=1;
        continue
      }
      if(f==1){
        long = long + p[i];

      }
    }
    console.log(lat,"jj",long)

    setLat(lat)
    setLong(long)

  }

useEffect(()=>{
  getlatlong(props.detail["warehouselatlong"])
})
  
  

  return (<div>
    <div className="flex justify-between mb-2">
    <button
      className="flex justify-center rounded-full aspect-square p-5 text-lg "
      onClick={props.close}
      style={{"background" : "#84587C", color: "white"}}
    >
      <AiOutlineArrowLeft />
    </button>
    <button
      className="flex justify-center rounded-full aspect-square p-5 text-lg "
      style={{"background" : "#16c09861", color: "#008767"}}
    onClick={()=>{
      navigate({
        pathname: `/session/warehousemanagement/modifywarehouse/id=${props.detail['warehouseid']}`
      })
    }}
    >
      <AiOutlineEdit />
    </button>
  </div>
   <p className="text-left text-lg font-bold">Warehouse Details - {props.detail["warehouseid"]}</p>
    <div className="user-details">
     

      { (
        <div className="w-full px-2 mt-2">
          <div className="w-full ">
            <div className="flex justify-between w-full ">
             <div>
              <label className="font-semibold pl-1 flex">
                <p className="text-left">Type</p>
              </label>
              <div className="bg-stone-100 p-3 mt-0 mb-0 rounded-md" style={{width:"330px"}}>
                <p className="text-left">Normal</p>
              </div>
             </div>
             <div>
             <label className="font-semibold pl-1 flex">
                <p className="text-left">PC</p>
              </label>
              <div className="bg-stone-100 p-3 mt-0 mb-0 rounded-md" style={{width:"330px"}}>
                <p className="text-left"> {props.detail["warehousepc"]}</p>
              </div>
             </div>
          </div>
            <div className="flex justify-between w-full" style={{marginTop:"16px"}}>
             <div>
              <label className="font-semibold pl-1 flex">
                <p className="text-left">Address</p>
              </label>
              <div className="bg-stone-100 p-3 mt-0 mb-0 rounded-md" style={{width:"330px"}}>
                <p className="text-left"> {props.detail["warehouseaddress"]}</p>
              </div>
             </div>
             <div>
             <label className="font-semibold pl-1 flex">
                <p className="text-left">State</p>
              </label>
              <div className="bg-stone-100 p-3 mt-0 mb-0 rounded-md" style={{width:"330px"}}>
                <p className="text-left">{props.detail["warehousestate"]}</p>
              </div>
             </div>
          </div>
            <div className="flex justify-between w-full" style={{marginTop:"16px"}}>
             <div>
              <label className="font-semibold pl-1 flex">
                <p className="text-left">Coordinates</p>
              </label>
              <div className="flex justify-between" style={{width:"330px"}}>
              <div className="bg-stone-100 p-3 mt-0 mb-0 rounded-md w-2/5" >
                <p className="text-left">{lat}</p>
              </div>
              <div className="bg-stone-100 p-3 mt-0 mb-0 rounded-md w-2/5" >
                <p className="text-left">{long}</p>
              </div>
              </div>
             </div>
             <div>
             <label className="font-semibold pl-1 flex">
                <p className="text-left">Double Lock System</p>
              </label>
              <div className="bg-stone-100 p-3 mt-0 mb-0 rounded-md" style={{width:"330px"}}>
                <p className="text-left">{props.detail["doublelock"] ? "Yes" : "No"} </p>
              </div>
             </div>
          </div>
            <div className="flex justify-between w-full" style={{marginTop:"16px"}}>
             <div>
              <label className="font-semibold pl-1 flex">
                <p className="text-left">Building Type</p>
              </label>
              <div className="bg-stone-100 p-3 mt-0 mb-0 rounded-md" style={{width:"330px"}}>
                <p className="text-left">{props.detail["warehousebuildingtype"]}</p>
              </div>
             </div>
             <div>
             <label className="font-semibold pl-1 flex">
                <p className="text-left">Status</p>
              </label>
              <div className="bg-stone-100 p-3 mt-0 mb-0 rounded-md" style={{width:"330px"}}>
                <p className="text-left"> {props.detail["warehousestatus"] === "A" ? "Active" : "Inactive"}</p>
              </div>
             </div>
          </div>
            <div className="flex justify-between w-full" style={{marginTop:"16px"}}>
             <div>
              <label className="font-semibold pl-1 flex">
                <p className="text-left">First Key Holder</p>
              </label>
              <div className="bg-stone-100 p-3 mt-0 mb-0 rounded-md" style={{width:"330px"}}>
                <p className="text-left">{props.detail["uidkey1"]}</p>
              </div>
             </div>
             <div>
             <label className="font-semibold pl-1 flex">
                <p className="text-left">Second Key Holder</p>
              </label>
              <div className="bg-stone-100 p-3 mt-0 mb-0 rounded-md" style={{width:"330px"}}>
                <p className="text-left"> {props.detail["uidkey2"] !== "" ? props.detail["uidkey2"] : "N/A"}</p>
              </div>
             </div>
          </div>
            <div className="flex justify-between w-full" style={{marginTop:"16px"}}>
             <div>
              <label className="font-semibold pl-1 flex">
                <p className="text-left">Creation Time</p>
              </label>
              <div className="bg-stone-100 p-3 mt-0 mb-0 rounded-md" style={{width:"330px"}}>
                <p className="text-left">{props.detail["creationtime"]}</p>
              </div>
             </div>
             <div>
             <label className="font-semibold pl-1 flex">
                <p className="text-left">Last Update Time</p>
              </label>
              <div className="bg-stone-100 p-3 mt-0 mb-0 rounded-md" style={{width:"330px"}}>
                <p className="text-left">{props.detail["updatetime"]}</p>
              </div>
             </div>
           
          </div>
            <div className="flex justify-between w-full" style={{marginTop:"16px"}}>
             <div>
              <label className="font-semibold pl-1 flex">
                <p className="text-left">Last Upadated By</p>
              </label>
              <div className="bg-stone-100 p-3 mt-0 mb-0 rounded-md" style={{width:"330px"}}>
                <p className="text-left">{props.detail["updatedbyuid"]}</p>
              </div>
             </div>
             
           
          </div>
          </div>
        </div>
      )}
    </div>
    </div>
  );
}
export default WarehouseDetail;

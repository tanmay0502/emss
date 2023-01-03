import React from "react";
import { useState, useEffect } from "react";
import styles from './styles/warehouseListUnitTrackerfilldemand.css'
import "../home/styles/Newversion.css";
import { Fragment } from 'react';
import { FaCircle } from 'react-icons/fa'
import { FaKey } from 'react-icons/fa'
import {
    AiOutlineSortAscending,
    AiOutlineSortDescending,
} from "react-icons/ai";
import ToggleButton from '../../components/ToggleButton';
import { ReactComponent as ChevronDown } from "../../assets/ChevronDown.svg";
import { ReactComponent as SearchIcon } from "../../assets/search.svg";
import { UnitCount } from "./Utils";


export default function WareHouseListUnitTrackerFillAvailability(props) {
    console.log(props.Order)
    const [tableFilter, setTableFilter] = useState("");
    const [sortBy, setSortBy] = useState("None");
    const [sortOrder, setSortOrder] = useState("asc");
    const [WareHouse_List, setWareHouse_List] = React.useState([]);
    const [warehouseMapping, setWarehouseMapping] = useState({})
    const [Details, setDetails] = React.useState([]);
    const [pageLoaded,setPageLoaded] =  useState(0);


    const units = [['CU', 50, 'M3'], ['CU', 50, 'M3'], ['CU', 50, 'M3'], ['CU', 50, 'M3'], ['CU', 50, 'M3'], ['CU', 50, 'M3']]

    const models=["M2","M3"]
    const [showFill, setShowFill] = useState([]);
    const sortMapping = {
        "None": null,
        "Warehouse ID": "Warehouse ID",
        "Building Type": "BuildingType",
        "Room Type": "Room Type",
    }


    const  [total_BU_M2, settotal_BU_M2] = useState(0)
    const  [filled_BU_M2, setfilled_BU_M2] = useState(0)
    const  [leftout_BU_M2, setleftout_BU_M2] = useState(0)
    const  [total_BU_M3, settotal_BU_M3] = useState(0)
    const  [filled_BU_M3, setfilled_BU_M3] = useState(0)
    const  [leftout_BU_M3, setleftout_BU_M3] = useState(0)


    const  [total_CU_M2, settotal_CU_M2] = useState(0)
    const  [filled_CU_M2, setfilled_CU_M2] = useState(0)
    const  [leftout_CU_M2, setleftout_CU_M2] = useState(0)
    const  [total_CU_M3, settotal_CU_M3] = useState(0)
    const  [filled_CU_M3, setfilled_CU_M3] = useState(0)
    const  [leftout_CU_M3, setleftout_CU_M3] = useState(0)

    const  [total_VVPAT_M2, settotal_VVPAT_M2] = useState(0)
    const  [filled_VVPAT_M2, setfilled_VVPAT_M2] = useState(0)
    const  [leftout_VVPAT_M2, setleftout_VVPAT_M2] = useState(0)
    const  [total_VVPAT_M3, settotal_VVPAT_M3] = useState(0)
    const  [filled_VVPAT_M3, setfilled_VVPAT_M3] = useState(0)
    const  [leftout_VVPAT_M3, setleftout_VVPAT_M3] = useState(0)
    const  [availableUnits, setAvailableUnits] = useState([])

    useEffect(()=>{
        const getUnits = async ()=>{
            try {
              const ID = window.sessionStorage.getItem('sessionToken');
              console.log("available_units ID = ", ID)
              const response = await fetch(
                `${process.env.REACT_APP_API_SERVER}/unit/available_units/`,
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  credentials: 'include',
                  body:JSON.stringify({
                    "oprnd": ID
                  })
                }
              );
              const data = await response.json();
              console.log("/unit/available_units/",data);
              if (data.data.length) {
                setAvailableUnits(data.data);
              }
            } catch (err) {
              console.log({ err });
            }
        }
        getUnits()
    },[])

    const [unitsDetails, setUnitsDetails] = useState({});

    useEffect(()=>{
        let ppp = { 
        "EM2":{
            "CU":[0,0],
            "BU":[0,0],
            "VVPAT":[0,0]
        },
        "EM3":{
            "CU":[0,0],
            "BU":[0,0],
            "VVPAT":[0,0]
        },
        "BM2":{
            "CU":[0,0],
            "BU":[0,0],
            "VVPAT":[0,0]
        },
        "BM3":{
            "CU":[0,0],
            "BU":[0,0],
            "VVPAT":[0,0]
        }
       
    }

    props.unitDetails.map((val)=>{
        let p = val[6].substring(0,1)+val[3];
        ppp[p][val[2]][0]+=Number(val[4]);
    })
    console.log(ppp)
    setUnitsDetails(ppp);

    },[props.unitDetails])

    const countAvlUnits = (item, manufacturer, itemmodel)=>{
        let sum = 0;
        const dict = {
            "B": "BEL",
            "E": "ECIL",
            "BU": "BU",
            "CU": "CU",
            "VT": "VVPAT",
          }
        for (let i = 0; i < availableUnits.length; i++) {
            const e = availableUnits[i];
            if (dict[e.unit_type] === item && dict[e.manufacturer] === manufacturer && e.model === itemmodel) {
              sum+=e.count;
            }
        }
          return sum;
    }

    function setUnits(){
        const stateCode = sessionStorage.getItem("sessionToken").substring(0,2);
        if(pageLoaded==0){
        props.Order.map((order)=>{
            setPageLoaded(1);
            if(order["source"]==stateCode){
                if(order["item"]=="CU" && order["itemmodel"]=="M2"){
                    settotal_CU_M2(total_CU_M2+ Number(order["itemquantity"]));
                    setleftout_CU_M2(total_CU_M2+ Number(order["itemquantity"]));
                }
                if(order["item"]=="CU" && order["itemmodel"]=="M3"){
                    settotal_CU_M3(total_CU_M3+ Number(order["itemquantity"]));
                    setleftout_CU_M3(total_CU_M3+ Number(order["itemquantity"]));
                }
                if(order["item"]=="BU" && order["itemmodel"]=="M2"){
                    settotal_BU_M2(total_BU_M2+ Number(order["itemquantity"]));
                    setleftout_BU_M2(total_BU_M2+ Number(order["itemquantity"]));
                }
                if(order["item"]=="BU" && order["itemmodel"]=="M3"){
                    settotal_BU_M3(total_BU_M3+ Number(order["itemquantity"]));
                    setleftout_BU_M3(total_BU_M3+ Number(order["itemquantity"]));
                }
                if(order["item"]=="VVPAT" && order["itemmodel"]=="M2"){
                    settotal_VVPAT_M3(total_VVPAT_M2+ Number(order["itemquantity"]));
                    setleftout_VVPAT_M3(total_VVPAT_M2+ Number(order["itemquantity"]));
                }
                if(order["item"]=="VVPAT" && order["itemmodel"]=="M3"){
                    settotal_VVPAT_M3(total_VVPAT_M3+ Number(order["itemquantity"]));
                    setleftout_VVPAT_M3(total_VVPAT_M3+ Number(order["itemquantity"]));
                }
            }
        })
        }
    }

    useEffect(()=>{
        setUnits()
    },[pageLoaded])


    const [orderCount,setOrderCount] = useState({});

    function increaseOne(index,type="select",model="select",mnf = "select") {
        let v3={
            "type":type,
            "quantity":"0",
            "model":model,
            "manufacturer":mnf
        }
        let temp = orderCount;
        if(Object.keys(temp[index]).length==0) {
           
            temp[index]["0"]=v3;
        }
        else{
            console.log((Object.keys(temp[index]).length - 1).toString())
            temp[index][(parseInt(Object.keys(temp[index])[(Object.keys(temp[index]).length - 1).toString()]) + 1).toString()]=v3
        }
        
        console.log(temp)
        setOrderCount({ ...temp });
       
       
    
      }
    
    
      function calculate(id1 , id2, key, value ) {
        

        let _total_BU_M2 =0
        let _total_BU_M3 =0
        let _total_CU_M2 =0
        let _total_CU_M3 =0
        let _total_VVPAT_M2 =0
        let _total_VVPAT_M3 =0

        let new_wdetails=WareHouse_List;
        
        console.log("calculate",id1,id2,key, value)
        let dummy2 =orderCount;
        if(key=="quantity")
        dummy2[id1][id2][key]=Number(value).toString();
        else
        dummy2[id1][id2][key]=value

        Object.keys(dummy2).map((key1)=>{
            new_wdetails[key1]["maxCUM2ECIL"]=countAvlUnits("CU", "ECIL", "M2")
                new_wdetails[key1]["maxCUM2BEL"]=countAvlUnits("CU", "BEL", "M2")
                new_wdetails[key1]["maxCUM3ECIL"]=countAvlUnits("CU", "ECI", "M3")
                new_wdetails[key1]["maxCUM3BEL"]=countAvlUnits("CU", "BEL", "M3")
                new_wdetails[key1]["maxBUM2ECIL"]=countAvlUnits("BU", "ECIL", "M2")
                new_wdetails[key1]["maxBUM2BEL"]=countAvlUnits("BU", "BEL", "M2")
                new_wdetails[key1]["maxBUM3ECIL"]=countAvlUnits("BU", "ECIL", "M3")
                new_wdetails[key1]["maxBUM3BEL"]=countAvlUnits("BU", "BEL", "M3")
                new_wdetails[key1]["maxVVPATM2ECIL"]=countAvlUnits("VVPAT", "ECIL", "M2")
                new_wdetails[key1]["maxVVPATM2BEL"]=countAvlUnits("VVPAT", "BEL", "M2")
                new_wdetails[key1]["maxVVPATM3ECIL"]=countAvlUnits("VVPAT", "ECIL", "M3")
                new_wdetails[key1]["maxVVPATM3BEL"]=countAvlUnits("VVPAT", "BEL", "M3")
                new_wdetails[key1]["fillCUM2ECIL"]=0
                new_wdetails[key1]["fillCUM2BEL"]=0
                new_wdetails[key1]["fillCUM3ECIL"]=0
                new_wdetails[key1]["fillCUM3BEL"]=0
                new_wdetails[key1]["fillBUM2ECIL"]=0
                new_wdetails[key1]["fillBUM2BEL"]=0
                new_wdetails[key1]["fillBUM3ECIL"]=0
                new_wdetails[key1]["fillBUM3BEL"]=0
                new_wdetails[key1]["fillVVPATM2ECIL"]=0
                new_wdetails[key1]["fillVVPATM2BEL"]=0
                new_wdetails[key1]["fillVVPATM3ECIL"]=0
                new_wdetails[key1]["fillVVPATM3BEL"]=0
            Object.keys(dummy2[key1]).map((key2)=>{
                if(dummy2[key1][key2]["type"]!="select" && dummy2[key1][key2]["model"]!="select" && dummy2[key1][key2]["manufacturer"]!="select"){
                    
                    let temp=""
                    temp += "_total_" + dummy2[key1][key2]["type"] + "_" + dummy2[key1][key2]["model"];
                    let temp2=eval(temp)
                    temp2+=parseInt(dummy2[key1][key2]["quantity"])
                    new_wdetails[key1]["fill"+dummy2[key1][key2]["type"]+dummy2[key1][key2]["model"]+dummy2[key1][key2]["manufacturer"]]+=parseInt(dummy2[key1][key2]["quantity"])
                    eval(temp + " = " + temp2.toString());
                }
            })
        })

       
      
        
    
        setfilled_BU_M2(_total_BU_M2)
        setfilled_BU_M3(_total_BU_M3)
        setfilled_CU_M2(_total_CU_M2)
        setfilled_CU_M3(_total_CU_M3)
        setfilled_VVPAT_M2(_total_VVPAT_M2)
        setfilled_VVPAT_M3(_total_VVPAT_M3)
        setleftout_BU_M2(total_BU_M2 - _total_BU_M2)
        setleftout_BU_M3(total_BU_M3 - _total_BU_M3)
        setleftout_CU_M2(total_CU_M2 - _total_CU_M2)
        setleftout_CU_M3(total_CU_M3 - _total_CU_M3)
        setleftout_VVPAT_M2(total_VVPAT_M2 - _total_VVPAT_M2)
        setleftout_VVPAT_M3(total_VVPAT_M3 - _total_VVPAT_M3)
        
        
    
        
        setOrderCount({...dummy2})
        setWareHouse_List(new_wdetails);
      }

    const rightArrow = ">";


    const ActivateWarehouse = async (myId) => {
        if (window.confirm(`Are you sure you want to Activate Warehouse ${myId}? `)) {
            try {

                const response = await fetch(
                    `${process.env.REACT_APP_API_SERVER}/warehouse/activateWarehouse/${myId}`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        credentials: 'same-origin',
                    }
                )

                const status = response;
                if (status.status == 200) {
                    alert("Warehouse Activated Successfully");
                    // navigate('/session/warehousemanagement');
                    getList();
                }
                else {
                    alert("Deactivation Failed");
                }

            } catch (error) {
                console.log(error);
            }
        }
    }

    const DectivateWarehouse = async (myId) => {
        if (window.confirm(`Are you sure you want to Deactivate Warehouse ${myId}? `)) {
            try {

                const response = await fetch(
                    `${process.env.REACT_APP_API_SERVER}/warehouse/deactivateWarehouse/${myId}`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        credentials: 'same-origin',
                    }
                )

                const status = response;
                if (status.status == 200) {
                    alert("Warehouse Deactivated Successfully");
                    // window.location.href = '/session/warehousemanagement';
                    getList();
                }
                else {
                    alert("Deactivation Failed");
                }

            } catch (error) {
                console.log(error);
            }
        }
    }

    useEffect(() => {
        var data = Details.filter((elem) => {
            if (tableFilter === "") {
                return true;
            }
            else {
                const filter = tableFilter.toLowerCase();
                return (elem[0].toLowerCase().includes(filter) || elem[1].toLowerCase().includes(filter))
            }
        }).map((val) => {
            return {
                "Warehouse ID": val["type"] == 'P' ? <Fragment><span style={{ display: 'flex', justifyContent: 'left', alignItems: 'left', marginLeft: "35%" }}><FaCircle size='0.8em' className='PermaWarehouse' /><span style={{ marginLeft: '10px', marginRight: '10px' }}>{val["warehouseid"]}</span>{val['doublelock'] ? <Fragment><FaKey className='keyColor' /><FaKey className='keyColor' /></Fragment> : <FaKey className='keyColor' />}</span></Fragment> : <Fragment><span style={{ display: 'flex', justifyContent: 'left', alignItems: 'left', marginLeft: "35%" }}><FaCircle size='0.8em' className='TempWarehouse' /><span style={{ marginLeft: '10px', marginRight: '10px' }}>{val["warehouseid"]}</span>{val['doublelock'] ? <Fragment><FaKey className='keyColor' /><FaKey className='keyColor' /></Fragment> : <FaKey className='keyColor' />}</span></Fragment>,
                "Room Type": warehouseMapping.data ? warehouseMapping["data"][val[2]] : "",
                "Warehouse Type": val["type"]=="P" ?"Parmanent" : "Temporary",
                "Status": <ToggleButton userID={val["warehouseid"]} checked={val[3] === 'A'} onToggle={(e) => {
                    if (val["status"] !== "A") {
                        ActivateWarehouse(e)
                    }
                    else {
                        DectivateWarehouse(e)
                    }
                }}
                    customLabels={{
                        "active": "Active",
                        "inactive": "Inactive"
                    }}
                />,
                "maxCUM2ECIL":1000,
                "maxCUM2BEL":1000,
                "maxCUM3ECIL":1000,
                "maxCUM3BEL":1000,
                "maxBUM2ECIL":1000,
                "maxBUM2BEL":1000,
                "maxBUM3ECIL":1000,
                "maxBUM3BEL":1000,
                "maxVVPATM2ECIL":1000,
                "maxVVPATM2BEL":1000,
                "maxVVPATM3ECIL":1000,
                "maxVVPATM3BEL":1000,
                "fillCUM2ECIL":0,
                "fillCUM2BEL":0,
                "fillCUM3ECIL":0,
                "fillCUM3BEL":0,
                "fillBUM2ECIL":0,
                "fillBUM2BEL":0,
                "fillBUM3ECIL":0,
                "fillBUM3BEL":0,
                "fillVVPATM2ECIL":0,
                "fillVVPATM2BEL":0,
                "fillVVPATM3ECIL":0,
                "fillVVPATM3BEL":0,

            }
        })
        data.sort(function (a, b) {
            if (sortMapping[sortBy] !== null) {
                return a[sortMapping[sortBy]].localeCompare(b[sortMapping[sortBy]])
            }
            else return 0;
        });
        if (sortMapping[sortBy] !== null && sortOrder === 'desc') {
            data.reverse();
        }
        setWareHouse_List(data)
        return () => {
        }
    }, [Details, warehouseMapping])

   


    async function getList() {
        let userId = sessionStorage.getItem('sessionToken');
        const code = userId.slice(0, 2);
        try {
            const response = await fetch(
                `${process.env.REACT_APP_API_SERVER}/warehouse/listWarehouses`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        "stateCode": code
                    }),
                    credentials:'include'
                })

            const data = await response.json();
            let activedata=[]

            console.log(data["data"])
           
            data["data"].map((warehouse)=>{
                
                    activedata.push(warehouse)

                
            })
           

            setDetails(activedata);

        } catch (error) {
            console.log(error);
        }

    }
    useEffect(() => {
        MapWarehouseTypes();
        getList();
    }, [])

    


    function run(){
        WareHouse_List.map((val,id)=>{
            props.Order.map((val2,id2)=>{
                const type= val2["item"]
                const model= val2["itemmodel"]
                const mnf= val2["manufacturer"]
                increaseOne(id,type,model,mnf)
            })
        })
    }
    const [fl, setFl] = useState(0);

    useEffect(()=>{
        let fillDemand = {}
        Details.map((val,id)=>{
            fillDemand[id.toString()]={};
        })
        
        console.log(fillDemand)
        setOrderCount(fillDemand);
        if(props.Order ) {
           
            console.log(orderCount)

            if (Object.keys(orderCount).length != 0 && fl == 0) {
                setFl(1);
                run();
            }
            
    }
    },[Details])


    const [boxId, setBoxId] = useState([]);

    function setBox(id){
        if(boxId.length==1 && boxId[0]==id){
            setBoxId([])
        }
        else{
            setBoxId([id]);
        }
        
    }

    const MapWarehouseTypes = async () => {
        try {
            const response = await fetch(
                `${process.env.REACT_APP_API_SERVER}/warehouse/warehouseTypes`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            )
            const types = await response.json();
            setWarehouseMapping(types);
        } catch (error) {
            console.log(error);
        }
    }
    const FillCapacity = async (id) => {
        if (showFill.includes(id) == true) {
            setShowFill(showFill.filter(item => item !== id));
        }
        else {
            setShowFill([...showFill, id]);
        }
    };


    const  handleSubmit= async (e)=>{
        let data={
            "orderid": props.OrderID,
            "flag": "A",
            "details": [
              
                ]
          
        }

        Object.keys(orderCount).map((order)=>{
            let detail = {
                "warehouseid":Details[order]["warehouseid"] ,
                "unitDetails": [
                  
                ]
              }
              Object.keys(orderCount[order]).map((miniorder)=>{
                let temp=  {
                    "item": orderCount[order][miniorder]["type"],
                    "itemmodel": orderCount[order][miniorder]["model"],
                    "itemquantity": orderCount[order][miniorder]["quantity"],
                    "manufacturer": orderCount[order][miniorder]["manufacturer"]
                  }
                if(temp["item"]!="select" && temp["itemmodel"]!="select" && temp["manufacturer"]!="select" && temp["itemquantity"]!=0)
                detail["unitDetails"].push(temp);
              })
              if(detail["unitDetails"].length!=0)
              data["details"].push(detail);
        })

        try {
            const response = await fetch(
              `${process.env.REACT_APP_API_SERVER}/order/fillCapacity/`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                credentials: 'include',
                body: JSON.stringify(data),
      
                mode: "cors",
      
              }
            );
            const data2 = await response.json();
              if (response["status"] == 200) {
                alert("Fill availability done sucessfully");
              }
              if (response["status"] == 200) {
                window.location = '/session/ordermanagement'
              }
              else{
                alert(data2.message)
              }
           
          } catch (err) {
            console.log(err);
          }
      

    }


    
    const [Units, setTUnits] = useState({});

    useEffect(()=>{
        console.log(Units)
           let p = Object.keys(Units).length;
           if(p<Details.length){
                let timer2 = setTimeout(()=>getTUnits(Details[p]["warehouseid"]),100);
    
                return (()=>{
                    clearTimeout(timer2);
                })
           }
           
        },[Details,Units])

    async function getTUnits(oprnd){
        let body ={
            "oprnd": oprnd,
            "status": "Available for Use"
          }

          let data = await UnitCount(body);
          console.log(data)
          if(!(oprnd in units)){
         setTUnits((prev)=>{
           
            let ppp = {...prev};
            let EM2CU = 0;
            let EM3CU = 0;
            let BM2CU = 0;
            let BM3CU = 0;
            let EM2BU = 0;
            let EM3BU = 0;
            let BM2BU = 0;
            let BM3BU = 0;
            let EM2VT = 0;
            let EM3VT = 0;
            let BM2VT = 0;
            let BM3VT = 0;
            data.map((val)=>{
                let p = "";
                p+=val["manufacturer"]+val["model"]+"BU";
                if(val["model"]!="BU" && val["model"]!="CU"){
                let pp = eval(p)+val["BU"];
                eval(p +" = "+pp);
                }
                p = "";
                p+=val["manufacturer"]+val["model"]+"CU";
                if(val["model"]!="BU" && val["model"]!="CU"){
                let pp = eval(p)+val["CU"];
                eval(p +" = "+pp);
                }
                p = "";
                p+=val["manufacturer"]+val["model"]+"VT";
                if(val["model"]!="BU" && val["model"]!="CU"){
                let pp = eval(p)+val["VT"];
                eval(p +" = "+pp);
                }
            })
            ppp[oprnd] = {
                "EM2CU" : EM2CU,
                "EM3CU" : EM3CU,
                "BM2CU" : BM2CU,
                "BM3CU" : BM3CU,
                "EM2BU" : EM2BU,
                "EM3BU" : EM3BU,
                "BM2BU" : BM2BU,
                "BM3BU" : BM3BU,
                "EM2VVPAT" : EM2VT,
                "EM3VVPAT" : EM3VT,
                "BM2VVPAT" : BM2VT,
                "BM3VVPAT" : BM3VT,
            };
            console.log(ppp)
            return ppp;
            
         })
        }



    }



    return (
        <div>
            <div className="flex w-full">
                <div className=" w-3/5">
                    <div className="bg-white p-6 rounded-lg shadow-lg mt-2 w-full">
                        <div
                            className="rounded-t-lg p-2 text-left flex "
                            style={{ backgroundColor: "#84587C" }}
                        >
                            <span className="text-white text-lg ml-5">WareHouses List</span>
                            <div className="w-1/5 d-flex serach_1" style={{ marginLeft: "10%" }} >
                                <SearchIcon />
                                <input
                                    type="text"
                                    placeholder="Search"
                                    style={{ fontSize: "15px" }}
                                />
                            </div>
                            <div className="flex" >
                                <span className="text-white" style={{ minWidth: "max-content", paddingInlineStart: "7.5px", marginTop: "2%" }}>Sort by : &nbsp;</span>
                                <select
                                    className="text-white"
                                    style={{ textAlign: "center", outline: "none", background: "transparent", padding: "0px", border: "none" }}
                                    onChange={(e) => setSortBy(e.target.value)}>
                                    <option value={"None"}>Default</option>
                                    <option value={"Warehouse ID"}>Warehouse ID</option>
                                    <option value={"Room Type"}>Room Type</option>
                                    <option value={"Building Type"}>Building Type</option>
                                </select>
                                <ChevronDown />
                                <button className='sortOrderButton text-white' onClick={() => {
                                    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
                                }}>
                                    {sortOrder === 'asc' ? <AiOutlineSortAscending /> : <AiOutlineSortDescending />}
                                </button>
                            </div>
                        </div>
                        <div className="p-2">
                        <table className="w-full mt-4 ">
                                <thead className="HeadRow border-b-2">
                                    <tr  className="flex justify-start">

                                        <th style={{ color: "#f56a3f", padding: "20px" }}>Sl. No.</th>
                                        <th style={{ color: "#f56a3f", padding: "20px" }}>WareHouse ID</th>
                                        {/* <th style={{ color: "#f56a3f", padding: "20px" }}>WareHouse Type</th> */}
                                        {/* <th style={{ color: "#f56a3f", padding: "20px" }}>Usage Status</th> */}
                                    </tr>
                                   

                                </thead>
                            </table>
                        <div  className="overflow-x-scroll overflow-y-hidden  p-5" style={{height:"700px"}}>
                           
                        <table className="w-11/12 m-2">
                                <tbody >
                                
                                    {WareHouse_List.length > 0 &&
                                    
                                        WareHouse_List.map((val, id) => (<>
                                             <tr onClick={(e) => setBox(id) } className="flex justify-start ml-10 ">
                                                <td className="text-black text-sm">{id+1}</td>
                                                <td className="text-black text-sm">{val["Warehouse ID"]}</td>
                                                {/* <td className="text-black text-sm">{val["Warehouse Type"]}</td> */}
                                                {/* <td className="text-black text-sm">{val['Status']}</td> */}
                                                </tr>
                                                <tr>
                                                    <td colSpan={20}>
                                                        <div className="flex w-full">
                                                            <div className="w-1/5">Type</div>
                                                            <div className="w-1/5">Model</div>
                                                            <div className="w-1/5">Manufacturer</div>
                                                            <div className="w-1/5">Available Units</div>
                                                            <div className="w-1/5">Filled Units</div>
                                                        </div>
                                                    </td>
                                                </tr>
                                                {orderCount && <tr className="pb-10 ">
                                            <td colSpan="2" className="">
                                                {Object.keys(orderCount[id]).map((key)=>(
                                                    <div className="">
                                                        
                                                        {orderCount[id][key]["type"]!="select" && orderCount[id][key]["model"]!="select" && orderCount[id][key]["manufacturer"]!="select" && <div className="flex justify-between p-3 h-6 text-sm pb-2 text-black">
                                                            {/* <p>{orderCount[id][key]["type"]}</p><p>{"-->"}</p><p>{orderCount[id][key]["model"]}</p><p>{"-->"}</p><p>{orderCount[id][key]["manufacturer"]}</p><p>{"-->"}</p><p>{orderCount[id][key]["quantity"]}</p> */}
                                                            <div className="w-full flex">
                                                                <div className="w-1/5">{orderCount[id][key]["type"]}</div>
                                                                <div className="w-1/5">{orderCount[id][key]["model"]}</div>
                                                                <div className="w-1/5">{orderCount[id][key]["manufacturer"]}</div>
                                                                <div className="w-1/5">
                                                                   
                                                                   {Object.keys(Units).map((k1,ind)=>(
                                                                    <>
                                                                        {ind==id && ( <div className={`${Units[k1][orderCount[id][key]["manufacturer"].substring(0,1)+orderCount[id][key]["model"]+orderCount[id][key]["type"]] >= orderCount[id][key]["quantity"]?"text-green-500":"text-red-500"}`}> {Units[k1][orderCount[id][key]["manufacturer"].substring(0,1)+orderCount[id][key]["model"]+orderCount[id][key]["type"]]}</div>)}

                                                                    </>
                                                                   ))}
                                                                  
                                                                   </div>
                                                                <div className="w-1/5"><input type="number" placeholder="No of Unit" className="border " value={orderCount[id][key]["quantity"]} onChange={(e)=>{
                                                                    setOrderCount((prev)=>{
                                                                        let ppp = {...prev}
                                                                        let f=0
                                                                        ppp[id][key]["quantity"]=e.target.value;
                                                                        let kkk = {...unitsDetails}
                                                                        Object.keys(ppp).map((k1,ind)=>{
                                                                            Object.keys(ppp[k1]).map((k2)=>{
                                                                                let p = ppp[k1][k2]["manufacturer"].substring(0,1)+ppp[k1][k2]["model"];
                                                                                if(ind==0){
                                                                                    kkk[p][ppp[k1][k2]["type"]][1]=Number(ppp[k1][k2]["quantity"])
                                                                                }
                                                                                else
                                                                                kkk[p][ppp[k1][k2]["type"]][1]+=Number(ppp[k1][k2]["quantity"])
                                                                                console.log(kkk[p][ppp[k1][k2]["type"]][1],kkk[p][ppp[k1][k2]["type"]][0])
                                                                                if(kkk[p][ppp[k1][k2]["type"]][1]>kkk[p][ppp[k1][k2]["type"]][0]) f=1;
                                                                            })
                                                                        })

                                                                        setUnitsDetails(kkk);
                                                                       
                                                                       
                                                                        return ppp;
                                                                    })

                                                                }} required></input></div>
                                                            </div>
                                                        </div> }
                                                    </div>
                                                ))}

                                            </td>
                                        </tr>}
                                       
                                            
                                              <tr>
                                                <td colSpan="2">
                                                    <hr className="border-1 border-black"/>
                                                </td>
                                              </tr>
                                              
                                        
                                        </>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                        </div>
                    </div>
                </div>
                <div className="w-2/5 m-3 " >
                    <div className="w-full bg-white rounded-md p-4">
                        <div className=" h-12 "><p className="text-orange-600 text-3xl text-left">Units Tracker</p></div>
                        <div className="flex w-full h-16 text-orange-600">
                            <div className="w-1/5">Manufacturer</div>
                            <div className="w-1/5">Model</div>
                            <div className="w-1/5">Total CU / Filled CU</div>
                            <div className="w-1/5">Total BU / Filled BU</div>
                            <div className="w-1/5">Total VVPAT / Filled VVPAT</div>
                        </div>
                        <hr />
                       
                       { Object.keys(unitsDetails).map((key)=>(<>
                        <div className="flex w-full h-14 pt-4">
                            <div className="w-1/5">{key.substring(0,1)=="E"?"ECIL":"BEL"}</div>
                            <div className="w-1/5">{key.substring(1,3)}</div>
                            <div className={`w-1/5 ${unitsDetails[key]["CU"][0] > unitsDetails[key]["CU"][1] ? "text-red-400":"text-green-400"}`}>{unitsDetails[key]["CU"][0]+ "/" + unitsDetails[key]["CU"][1]}</div>
                            <div className={`w-1/5 ${unitsDetails[key]["BU"][0] > unitsDetails[key]["BU"][1] ? "text-red-400":"text-green-400"}`}>{unitsDetails[key]["BU"][0]+ "/" + unitsDetails[key]["BU"][1]}</div>
                            <div className={`w-1/5 ${unitsDetails[key]["VVPAT"][0] > unitsDetails[key]["VVPAT"][1] ? "text-red-400":"text-green-400"}`}>{unitsDetails[key]["VVPAT"][0]+ "/" + unitsDetails[key]["VVPAT"][1]}</div>
                         
                        </div>
                        <hr />
                       </>))}
                      
                      
                        
                      
                        
                        
                        
                    </div>
                </div>
            </div >
           <center>
            <button className="text-white" onClick={handleSubmit}>
                Submit
            </button>
           </center>
        </div >
    );
}
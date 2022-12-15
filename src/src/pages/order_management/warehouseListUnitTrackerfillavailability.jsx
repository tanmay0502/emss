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


export default function WareHouseListUnitTrackerFillAvailability(props) {
    console.log(props.Order)
    const [tableFilter, setTableFilter] = useState("");
    const [sortBy, setSortBy] = useState("None");
    const [sortOrder, setSortOrder] = useState("asc");
    const [WareHouse_List, setWareHouse_List] = React.useState([]);
    const [warehouseMapping, setWarehouseMapping] = useState(null)
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

    function setUnits(){
        const stateCode = sessionStorage.getItem("sessionToken").substring(0,2);
        console.log(stateCode)
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
        console.log(total_BU_M2,total_BU_M3,total_CU_M3,total_CU_M2,total_VVPAT_M2,total_VVPAT_M3);
    }

    useEffect(()=>{
        setUnits()
    },[pageLoaded])


    const [orderCount,setOrderCount] = useState({});

    function increaseOne(index) {
        let v3={
            "type":"select",
            "quantity":0,
            "model":"select",
            "manufacturer":"select"
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
        
        console.log(orderCount)
        console.log("calculate",id1,id2,key, value)
        // console.log((filled_CU_M2),filled_BU_M3)
        let dummy2 =orderCount;
        if(key=="quantity")
        dummy2[id1][id2][key]=Number(value).toString();
        else
        dummy2[id1][id2][key]=value
        console.log(dummy2)

        Object.keys(dummy2).map((key1)=>{
            new_wdetails[key1]["maxCUM2ECIL"]=1000
                new_wdetails[key1]["maxCUM2BEL"]=1000
                new_wdetails[key1]["maxCUM3ECIL"]=1000
                new_wdetails[key1]["maxCUM3BEL"]=1000
                new_wdetails[key1]["maxBUM2ECIL"]=1000
                new_wdetails[key1]["maxBUM2BEL"]=1000
                new_wdetails[key1]["maxBUM3ECIL"]=1000
                new_wdetails[key1]["maxBUM3BEL"]=1000
                new_wdetails[key1]["maxVVPATM2ECIL"]=1000
                new_wdetails[key1]["maxVVPATM2BEL"]=1000
                new_wdetails[key1]["maxVVPATM3ECIL"]=1000
                new_wdetails[key1]["maxVVPATM3BEL"]=1000
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

       
      
        
    
        console.log(_total_CU_M2, _total_CU_M3, _total_BU_M2, _total_BU_M3, _total_VVPAT_M2, _total_VVPAT_M3)
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
        console.log(WareHouse_List)
        console.log(new_wdetails)
        setWareHouse_List(new_wdetails);
      }

    const rightArrow = ">";


    const ActivateWarehouse = async (myId) => {
        if (window.confirm(`Are you sure you want to Activate Warehouse ${myId}? `)) {
            try {

                const response = await fetch(
                    `${process.env.REACT_APP_API_SERVER}/warehouse/activateWarehouse/${myId}`,
                    {
                        method: "GET",
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
                        method: "GET",
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
                "Room Type": warehouseMapping ? warehouseMapping["data"][val[2]] : "",
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
        console.log(data)
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
                })

            const data = await response.json();
            console.log(data)
            let activedata=[]
           
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

    useEffect(()=>{
        let fillDemand = {}
        Details.map((val,id)=>{
            fillDemand[id.toString()]={};
        })
        
        console.log(fillDemand)
        setOrderCount(fillDemand);
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
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            )
            const types = await response.json();
            // data.map(arr => {
            // 	arr = {...arr, "warehousebuildingtype": }
            // })
            // console.log(data);
            setWarehouseMapping(types);
        } catch (error) {
            console.log(error);
        }
    }
    const FillCapacity = async (id) => {
        if (showFill.includes(id) == true) {
            console.log(showFill.includes(id))
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
        console.log(data)

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
              console.log(response)
              if (response["status"] == 200) {
                alert("Fill availability done sucessfully");
              }
              if (response["status"] == 200) {
                window.location = '/session/ordermanagement'
              }
           
          } catch (err) {
            console.log(err);
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
                                    <tr>

                                        <th style={{ color: "#f56a3f", padding: "20px" }}>Sl. No.</th>
                                        <th style={{ color: "#f56a3f", padding: "20px" }}>WareHouse ID</th>
                                        {/* <th style={{ color: "#f56a3f", padding: "20px" }}>WareHouse Type</th> */}
                                        {/* <th style={{ color: "#f56a3f", padding: "20px" }}>Usage Status</th> */}
                                    </tr>
                                   

                                </thead>
                                <tbody>

                                    {WareHouse_List.length > 0 &&
                                        WareHouse_List.map((val, id) => (<>
                                             <tr onClick={(e) => setBox(id)}>
                                                <td className="text-black text-sm">{id+1}</td>
                                                <td className="text-black text-sm">{val["Warehouse ID"]}</td>
                                                {/* <td className="text-black text-sm">{val["Warehouse Type"]}</td> */}
                                                {/* <td className="text-black text-sm">{val['Status']}</td> */}
                                                </tr>
                                                {orderCount && <tr className="pb-10 ">
                                            <td colSpan="20" className="">
                                                {Object.keys(orderCount[id]).map((key)=>(
                                                    <div className="">
                                                        
                                                        {orderCount[id][key]["type"]!="select" && orderCount[id][key]["model"]!="select" && orderCount[id][key]["manufacturer"]!="select" && <div className="flex justify-between p-3 h-6 text-sm pb-2 ">
                                                            <p>{orderCount[id][key]["type"]}</p><p>{"-->"}</p><p>{orderCount[id][key]["model"]}</p><p>{"-->"}</p><p>{orderCount[id][key]["manufacturer"]}</p><p>{"-->"}</p><p>{orderCount[id][key]["quantity"]}</p>
                                                        </div> }
                                                    </div>
                                                ))}

                                            </td>
                                        </tr>}
                                       
                                              { boxId.length==1 && boxId[0]==id && (
                                                <tr>
                                                    <td colSpan="10">
                                                    <div className="border rounded-md p-3">
                                                        <table className="w-full">
                                                        <tr className="border-b-2 ">
                                                            <th className="font-normal">Type</th>
                                                            <th className="font-normal">Model</th>
                                                            <th className="font-normal">Manufacturer</th>                                                            
                                                            <th className="font-normal">Quantity</th>
                                                            <th className="font-normal">Avialable units</th>
                                                        
                                                        </tr>
                                                        <br />

                                                        {
                                                            Object.keys(orderCount[id]).map((v2) => (
                                                            <tr className="">
                                                                <td><select className="border p-2 mb-2 text-black"
                                                                id={id.toString() + "_" + v2.toString() + "_type"}
                                                                required
                                                                onChange={(e)=>calculate(id,v2,"type",e.target.value)}
                                                                value={orderCount[id][v2]["type"]}

                                                                >
                                                                <option value="select"
                                                                >select</option>
                                                                <option value="BU">BU</option>
                                                                <option value="CU">CU</option>
                                                                <option value="VVPAT">VVPAT</option>
                                                                </select></td>
                                                               
                                                                <td>
                                                                <select className="border p-2 mb-2 text-black"
                                                                    id={id.toString() + "_" + v2.toString() + "_Model"}
                                                                    required
                                                                    onChange={(e)=>calculate(id,v2,"model",e.target.value)}
                                                                    value={orderCount[id][v2]["model"]}

                                                                >
                                                                    <option value="select"
                                                                    >select</option>
                                                                    <option value="M2">M2</option>
                                                                    <option value="M3">M3</option>
                                                                </select>
                                                                </td>
                                                                <td>
                                                                <select className="border p-2 mb-2 text-black"
                                                                    id={id.toString() + "_" + v2.toString() + "_manufacturer"}
                                                                    required
                                                                    onChange={(e)=>calculate(id,v2,"manufacturer",e.target.value)}
                                                                    value={orderCount[id][v2]["manufacturer"]}

                                                                >
                                                                    <option value="select"
                                                                    >select</option>
                                                                    <option value="ECIL">ECIL</option>
                                                                    <option value="BEL">BEL</option>
                                                                </select>
                                                                </td>
                                                                <td>
                                                                <input disabled={!(orderCount[id][v2]["type"]!="select" && orderCount[id][v2]["model"]!="select" && orderCount[id][v2]["manufacturer"]!="select")} type="number" placeholder="No of Unit" className="Input border mb-2 text-black" id={id.toString() + "_" + v2.toString() + "_quantity"} onChange={(e)=>calculate(id,v2,"quantity",e.target.value)} value={orderCount[id][v2]["quantity"]} required></input>
                                                                </td>
                                                               <td>
                                                                {(orderCount[id][v2]["type"]!="select" && orderCount[id][v2]["model"]!="select" && orderCount[id][v2]["manufacturer"]!="select")?(<>
                                                                {WareHouse_List[id]["max"+orderCount[id][v2]["type"]+orderCount[id][v2]["model"]+orderCount[id][v2]["manufacturer"]]-WareHouse_List[id]["fill"+orderCount[id][v2]["type"]+orderCount[id][v2]["model"]+orderCount[id][v2]["manufacturer"]]}
                                                                </>):(
                                                                    <>Pending</>
                                                                ) }
                                                                </td>
                                                               
                                                            </tr>
                                                            ))
                                                        }
                                                        </table>
                                                        <div className="flex justify-end w-full mt-1"><button type="button" onClick={() => increaseOne(id)} className="bg-orange-600 text-white  p-2 text-sm   " >Add row</button></div>
                                                    </div>
                                                    </td>
                                                </tr>
                                              )}
                                              <tr>
                                                <td colSpan="20">
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
                <div className="w-2/5">
                    <div className="bg-white p-6 rounded-lg shadow-lg mt-2 w-full m-4" style={{ width: "97%" }}>
                        <p className="text-left font-semibold">Recent Orders <span className="text-gray-400">{rightArrow} Delhi</span></p>
                        <div className="rounded-lg shadow-md mt-5 bg-white">
                            <div
                                className="rounded-t-lg p-2 text-left "
                                style={{ backgroundColor: "#84587C" }}
                            >
                                <span className="text-white text-lg ml-5">Ballot Units</span>
                            </div>
                            <div className="p-2">
                                <table className="w-full mt-4 ">
                                    <tr className="text-red-400 border-b-2 ">
                                        <td>Model</td>
                                        <td>Total</td>
                                        <td>Filled</td>
                                        <td>LeftOut</td>
                                    </tr>
                                    <br />
                                    <tr className=" border-b-2 ">
                                        <td>M2</td>
                                        <td>{total_BU_M2}</td>
                                        <td>{filled_BU_M2}</td>
                                        <td>{leftout_BU_M2}</td>
                                    </tr>
                                    <br />
                                    <tr className=" border-b-2 ">
                                        <td>M3</td>
                                        <td>{total_BU_M3}</td>
                                        <td>{filled_BU_M3}</td>
                                        <td>{leftout_BU_M3}</td>
                                    </tr>
                                    <br />
                                </table>
                            </div>
                        </div>

                        <div className="rounded-lg shadow-md mt-5 bg-white">
                            <div
                                className="rounded-t-lg p-2 text-left "
                                style={{ backgroundColor: "#84587C" }}
                            >
                                <span className="text-white text-lg ml-5">Control Units</span>
                            </div>
                            <div className="p-2">
                                <table className="w-full mt-4 ">
                                    <tr className="text-red-400 border-b-2 ">
                                        <td>Model</td>
                                        <td>Total</td>
                                        <td>Filled</td>
                                        <td>LeftOut</td>
                                    </tr>
                                    <br />
                                    <tr className=" border-b-2 ">
                                        <td>M2</td>
                                        <td>{total_CU_M2}</td>
                                        <td>{filled_CU_M2}</td>
                                        <td>{leftout_CU_M2}</td>
                                    </tr>
                                    <br />
                                    <tr className=" border-b-2 ">
                                        <td>M3</td>
                                        <td>{total_CU_M3}</td>
                                        <td>{filled_CU_M3}</td>
                                        <td>{leftout_CU_M3}</td>
                                    </tr>
                                    <br />

                                </table>

                            </div>
                        </div>
                        <div className="rounded-lg shadow-md mt-5 bg-white">
                            <div
                                className="rounded-t-lg p-2 text-left "
                                style={{ backgroundColor: "#84587C" }}
                            >
                                <span className="text-white text-lg ml-5">VVPAT</span>
                            </div>
                            <div className="p-2">
                                <table className="w-full mt-4 ">
                                    <tr className="text-red-400 border-b-2 ">
                                        <td>Model</td>
                                        <td>Total</td>
                                        <td>Filled</td>
                                        <td>LeftOut</td>
                                    </tr>
                                    <br />
                                    <tr className=" border-b-2 ">
                                        <td>M2</td>
                                        <td>{total_VVPAT_M2}</td>
                                        <td>{filled_VVPAT_M2}</td>
                                        <td>{leftout_VVPAT_M2}</td>
                                    </tr>
                                    <br />
                                    <tr className=" border-b-2 ">
                                        <td>M3</td>
                                        <td>{total_VVPAT_M3}</td>
                                        <td>{filled_VVPAT_M3}</td>
                                        <td>{leftout_VVPAT_M3}</td>
                                    </tr>
                                    <br />
                                </table>
                            </div>
                        </div>
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
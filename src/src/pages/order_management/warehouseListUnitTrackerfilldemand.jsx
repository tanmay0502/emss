import React from "react";
import { useState, useEffect } from "react";
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
import styles from '../unit_management/styles/Homepage.module.css';


export default function WareHouseListUnitTrackerFillDemand(props) {
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
        console.log(Details)
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
                />
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
                    credentials: 'include',
                    body:JSON.stringify({
        
                      })
                    
                })

            const data = await response.json();
            console.log("warehouse list",data)
            let activedata=[]
           
            data["data"].map((warehouse)=>{
                    activedata.push(warehouse)
            })
            console.log("Active data",activedata)
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
        if(props.Order && Object.keys(orderCount).length!=0) {
            console.log(orderCount)
        
        WareHouse_List.map((val,id)=>{
            props.Order.map((val2,id2)=>{
                const type= val2["item"]
                const model= val2["itemmodel"]
                const mnf= val2["manufacturer"]
                increaseOne(id,type,model,mnf)
            })
        })
    }
    }

    const [fl, setFl] = useState(0);

    useEffect(()=>{

        if(Object.keys(orderCount).length==0 && WareHouse_List.length!=0){
        let fillDemand = {}
        WareHouse_List.map((val,id)=>{
            fillDemand[id.toString()]={};
        })
        console.log(fillDemand)
        if(Object.keys(orderCount).length==0)
        setOrderCount(fillDemand);
    }
        if(Object.keys(orderCount).length!=0 && fl==0){
            setFl(1);
            run();
        }
       
    },[Details,WareHouse_List,orderCount])


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
        let f=0;
        { Object.keys(unitsDetails).map((key)=>{
            if(unitsDetails[key]["CU"][0]!=unitsDetails[key]["CU"][1] || unitsDetails[key]["BU"][0]!=unitsDetails[key]["BU"][1] || unitsDetails[key]["VVPAT"][0]!=unitsDetails[key]["VVPAT"][1]){
                f=1;
            }
        })}
        if(f){
            // console.log("ddddd");
            alert("Filled Capacity is not in accordance of Disrict unit allocation")
           
            return
        }
        console.log("dd")
        let data={
            "orderid": props.OrderID,
            "flag": "D",
            "details": [
              
                ]
          
        }

        console.log(Details)

        Object.keys(orderCount).map((order)=>{
            // console.log(Details[order])
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
              if(detail["unitDetails"].length)
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
      
      
              }
            );
            const data2 = await response.json();
              console.log(response)
              if (response["status"] == 200) {
                alert("Fill demand done sucessfully");
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




    return (
        <div>
            <div className="flex w-full">
                <div className=" w-3/5" >
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
                        <div  className="overflow-x-scroll p-2" style={{height:"700px"}}>
                           
                        <table className="w-11/12">
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
                                                            <div className="w-1/4">Type</div>
                                                            <div className="w-1/4">Model</div>
                                                            <div className="w-1/4">Manufacturer</div>
                                                            <div className="w-1/4">Filled Units</div>
                                                        </div>
                                                    </td>
                                                </tr>
                                                {orderCount && <tr className="pb-10 ">
                                            <td colSpan="2" className="">
                                                {orderCount && orderCount[id] && Object.keys(orderCount[id]).map((key)=>(
                                                    <div className="">
                                                        
                                                        {orderCount[id][key]["type"]!="select" && orderCount[id][key]["model"]!="select" && orderCount[id][key]["manufacturer"]!="select" && <div className="flex justify-between p-3 h-6 text-sm pb-2 text-black">
                                                            {/* <p>{orderCount[id][key]["type"]}</p><p>{"-->"}</p><p>{orderCount[id][key]["model"]}</p><p>{"-->"}</p><p>{orderCount[id][key]["manufacturer"]}</p><p>{"-->"}</p><p>{orderCount[id][key]["quantity"]}</p> */}
                                                            <div className="w-full flex">
                                                                <div className="w-1/4">{orderCount[id][key]["type"]}</div>
                                                                <div className="w-1/4">{orderCount[id][key]["model"]}</div>
                                                                <div className="w-1/4">{orderCount[id][key]["manufacturer"]}</div>
                                                                <div className="w-1/4"><input type="number" placeholder="No of Unit" className="border  w-32" value={orderCount[id][key]["quantity"]} onChange={(e)=>{
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
                <div className="w-2/5 m-3 " >
                    <div className="w-full bg-white rounded-md p-4">
                        <div className=" h-12 "><p className="text-orange-600 text-3xl text-left">Units Tracker</p></div>
                        <div className="flex w-full h-16 text-orange-600">
                            <div className="w-1/5">Manufacturer</div>
                            <div className="w-1/5">Model</div>
                            <div className="w-1/5">Total BU / Filled BU</div>
                            <div className="w-1/5">Total CU / Filled CU</div>
                            <div className="w-1/5">Total VVPAT / Filled VVPAT</div>
                        </div>
                        <hr />
                       
                       { Object.keys(unitsDetails).map((key)=>(<>
                        <div className="flex w-full h-14 pt-4">
                            <div className="w-1/5">{key.substring(0,1)=="E"?"ECIL":"BEL"}</div>
                            <div className="w-1/5">{key.substring(1,3)}</div>
                            <div className={`w-1/5 ${unitsDetails[key]["BU"][0] !== unitsDetails[key]["BU"][1] ? "text-red-400":"text-green-400"}`}>{unitsDetails[key]["BU"][0]+ "/" + unitsDetails[key]["BU"][1]}</div>
                            <div className={`w-1/5 ${unitsDetails[key]["CU"][0] !== unitsDetails[key]["CU"][1] ? "text-red-400":"text-green-400"}`}>{unitsDetails[key]["CU"][0]+ "/" + unitsDetails[key]["CU"][1]}</div>
                            <div className={`w-1/5 ${unitsDetails[key]["VVPAT"][0] !== unitsDetails[key]["VVPAT"][1] ? "text-red-400":"text-green-400"}`}>{unitsDetails[key]["VVPAT"][0]+ "/" + unitsDetails[key]["VVPAT"][1]}</div>
                         
                        </div>
                        <hr />
                       </>))}
                      
                      
                        
                      
                        
                        
                        
                    </div>
                </div>
            </div >
           <center>
            <button className="text-white mt-2" onClick={handleSubmit}>
                Submit
            </button>
           </center>
        </div >
    );
}
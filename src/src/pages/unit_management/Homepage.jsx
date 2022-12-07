import React, { useEffect, useState } from "react";
import styles from './styles/Homepage.module.css';
import Data from './Data';
import Card from './Card';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import ListCard from './ListCard';

// const uri = process.env.REACT_APP_API_SERVER+"/unit/total_counts?oprnd=IN000000ADM&access_token="
const uri = "http://localhost:8100/unit/total_counts?oprnd=IN000000ADM"

export default function HomePage() {
    const [unitData, setUnitData] = useState([]);
    const [statusData, setStatusData] = useState([]);
    const [cDat,setCDat] = useState([]);
    const [bDat,setBDat] = useState([]);
    const [vDat,setVDat] = useState([]);

    function creatListCard(val) {
        if(val.val.unit_type==="CU") {
            return <ListCard type='Control Unit' value={cDat}/>
        }
        else if(val.val.unit_type==="BU") {
            return <ListCard type='Ballot Unit' value={bDat}/>
        }
        else if(val.val.unit_type==="VT") {
            return <ListCard type='VVPAT' value={vDat}/>
        }
        else    return <div></div>
    };

    useEffect(()=>{
        let getData = () => {
            try {
            //   const response = await fetch(
            //     uri,
            //     {
            //       method: "GET",
            //       headers: {
            //         "Content-Type": "application/json",
            //       },
            //       credentials:'include'
            //     }
            //   );
            //     let data2 = await response.json();
            //     console.log("Data fetched", data2);
                // console.log("Data fetched", data2['data']);
                // let data = data2['data'];
                let data = Data;
                // let data = [];
                let finalData = [
                    {
                        unit_type: "CU",
                        BEL: [],
                        ECIL: []
                    },
                    {
                        unit_type: "VT",
                        BEL: [],
                        ECIL: []
                    },
                    {
                        unit_type: "BU",
                        BEL: [],
                        ECIL: []
                    }
                ]

                let cuDat = [];
                let buDat = [];
                let vtDat = [];
                data.map(function(val){
                    if(val.unit_type==='CU') {
                        cuDat.push({
                            modelId: val.unit_list[0],
                            modelStatus: val.unit_list[1],
                            modelType: val.unit_list[2],
                            model_Id: val.unit_list[3]
                        });
                    }
                    else if(val.unit_type==='BU') {
                        buDat.push({
                            modelId: val.unit_list[0],
                            modelStatus: val.unit_list[1],
                            modelType: val.unit_list[2],
                            model_Id: val.unit_list[3]
                        });
                    }
                    else if(val.unit_type==='VT') {
                        vtDat.push({
                            modelId: val.unit_list[0],
                            modelStatus: val.unit_list[1],
                            modelType: val.unit_list[2],
                            model_Id: val.unit_list[3]
                        });
                    }
                });
                
                for (let i = 0; i < data.length; i++) {
                    const ele = data[i];
                    if(ele.unit_type === 'CU') {
                        if(ele.manufacturer === 'E'){
                            finalData[0].ECIL.push({
                                status: ele.status,
                                model: ele.model,
                                count: ele.count
                            })
                        }
                        if(ele.manufacturer === 'B'){
                            finalData[0].BEL.push({
                                status: ele.status,
                                model: ele.model,
                                count: ele.count
                            })
                        }
                    }
                    if(ele.unit_type === 'VT') {
                        if(ele.manufacturer === 'E'){
                            finalData[1].ECIL.push({
                                status: ele.status,
                                model: ele.model,
                                count: ele.count
                            })
                        }
                        if(ele.manufacturer === 'B'){
                            finalData[1].BEL.push({
                                status: ele.status,
                                model: ele.model,
                                count: ele.count
                            })
                        }
                    }
                    if(ele.unit_type === 'BU') {
                        if(ele.manufacturer === 'E'){
                            finalData[2].ECIL.push({
                                status: ele.status,
                                model: ele.model,
                                count: ele.count
                            })
                        }
                        if(ele.manufacturer === 'B'){
                            finalData[2].BEL.push({
                                status: ele.status,
                                model: ele.model,
                                count: ele.count
                            })
                        }
                    }

                }
                for (let i = 0; i < finalData.length; i++) {
                    // console.log(finalData[i])
                    if(!finalData[i].BEL.length){
                        finalData[i].BEL.push({
                            model: "0",
                            count: "0"
                        })
                    }
                    if(!finalData[i].ECIL.length){
                        finalData[i].ECIL.push({
                            model: "0",
                            count: "0"
                        })
                    }
                }
                // console.log(finalData)
                
                let statusData = [];
                for (let i = 0; i < data.length; i++) {
                    let isContain = false;
                    for (let j = 0; j < statusData.length; j++) {
                        if (data[i].status === statusData[j].status) {
                            isContain = true;
                            // break;
                        }
                    }
                    if (!isContain) {
                        statusData.push({
                            status: data[i].status,
                            type: [
                                {unit_type: "CU", ECIL: [], BEL: []},
                                {unit_type: "VT", ECIL: [], BEL: []},
                                {unit_type: "BU", ECIL: [], BEL: []}
                            ],
                            unitList: []
                        })
                    }
                }
                for (let i = 0; i < data.length; i++) {
                    let ele = data[i];
                    for (let j = 0; j < statusData.length; j++) {
                        if (ele.status === statusData[j].status) {
                            let found = false;
                            for (let k = 0; k < statusData[j].type.length; k++) {
                                const e = statusData[j].type[k];
                                if (e.unit_type === ele.unit_type) {
                                    found = true;
                                    if (ele.manufacturer === "E") {
                                        statusData[j].type[k].ECIL.push({model: ele.model, count: ele.count})
                                    }
                                    if (ele.manufacturer === "B") {
                                        statusData[j].type[k].BEL.push({model: ele.model, count: ele.count})
                                    }
                                    break;
                                }
                            }
                            statusData[j].unitList.push({
                                modelId : data[i].unit_list[0],
                                modelStatus: data[i].unit_list[1],
                                modelType: data[i].unit_list[2],
                                model_Id: data[i].unit_list[3]
                            });
                            if (!found) {
                                let temp = {
                                    unit_type: ele.unit_type,
                                    ECIL: [],
                                    BEL: []
                                }
                                if (ele.manufacturer === "E") {
                                    temp.ECIL.push({model: ele.model, count: ele.count})
                                }
                                if (ele.manufacturer === "B") {
                                    temp.BEL.push({model: ele.model, count: ele.count})
                                }
                                statusData[j].type.push(temp);
                                break;
                            }
                            break;
                        }
                    }
                }

                for (let i = 0; i < statusData.length; i++) {
                    for (let j = 0; j < statusData[i].type.length; j++) {
                        if(!statusData[i].type[j].ECIL.length){
                            statusData[i].type[j].ECIL.push({
                                model: "0",
                                count: "0"
                            })
                        }
                        if(!statusData[i].type[j].BEL.length){
                            statusData[i].type[j].BEL.push({
                                model: "0",
                                count: "0"
                            })
                        }
                        
                    }
                    
                }
                return [finalData, statusData, cuDat, buDat, vtDat];
            } catch (err) {
              console.log(err);
              return [[],[]];
            }
          }
        //   console.log(getData())
        //   console.log(formatedData)
          
        setUnitData(getData()[0])
        setStatusData(getData()[1])
        setCDat(getData()[2])
        setBDat(getData()[3])
        setVDat(getData()[4])
        
        },[])
        // console.log({statusData})
        // console.log({unitData})
        

    let dataByStatus = statusData;
    let dataByUnitType = unitData;

 

    const rightArrow = ">";

    function DisplayMachineCountByModel({val}) {
        return <div>{val.count!="0"?val.count+" "+val.model:"0"}</div>
    }

    function createCard(cardVal) {
        return (<Card value={cardVal}/>);
    }

    return (

        <div className={styles.parent}>
            <div className={styles.parent3}>
                <div className={styles.myCardSample}>
                    <div className={styles.s}>
                        <span>State Wise Unit Count</span>
                    </div>
                    <div>
                        <select
                            id="Process"
                            required
                            className=" selectBox"
                            style={{ height: '15%' }}
                        >
                            <option value="" selected>
                                Select
                            </option>
                        </select>

                        <table >
                            <thead >
                                <tr>
                                    <th style={{ color: "#f56a3f", paddingLeft: "33px", textAlign: "left" }}>Units</th>
                                    <th style={{ color: "#f56a3f", paddingLeft: "33px" }}>ECIL</th>
                                    <th style={{ color: "#f56a3f", paddingLeft: "33px" }}>BEL</th>
                                </tr>
                            </thead>
                            {dataByUnitType != [] && dataByUnitType.length > 0 &&
                                dataByUnitType.map((val) => {
                                    // console.log(val)
                                    return (
                                        <tbody >
                                            <tr>
                                                <td className="text-black text-sm" style={{ textAlign: "left" }}>
                                                <Popup trigger={<div> {val.unit_type}</div>} position="right center">
                                                        <div>{creatListCard({val})}</div>
                                                    </Popup>
                                                </td>
                                                <td className="text-black text-sm mr-2 pl-5">
                                                    {val.ECIL.map((val,ind)=>{
                                                        return(
                                                            <DisplayMachineCountByModel val={val}/>
                                                        )})}
                                                </td>
                                                <td className="text-black text-sm pl-7">
                                                    {val.BEL.map((val,ind)=>{
                                                        return(
                                                            <DisplayMachineCountByModel val={val}/>
                                                        )})}
                                                </td>
                                            </tr>
                                        </tbody>
                                    )
                                })}
                        </table>
                    </div>
                </div>


                <div className={styles.myCardSample}>
                    <div className={styles.card_title}>
                        <span>FLC Scheduling</span>
                    </div>
                    <div className={styles.Box123}>
                        <div className="flex" >
                            <div style={{ marginLeft: "5%", fontSize: "15px" }}> WareHouse ID  <div style={{ marginLeft: "25%", fontSize: "15px" }}> AA1122 </div> </div>
                            <div className={styles.Line} style={{ marginLeft: "12%" }}></div>
                            <div style={{ marginLeft: "15%", fontSize: "15px" }}> Manufacturer <div style={{ marginLeft: "35%", fontSize: "15px" }}> ECIL </div></div>
                        </div>
                    </div>

                    <div className={styles.LI_TAG}>
                        <li className="mb-4">
                            <span>
                                <span>
                                    <span></span>
                                    Number Of Engineers
                                    <span className="ml-6">132</span>

                                </span>
                            </span>
                        </li>
                        <li className="mb-4">
                            <span>
                                <span>
                                    <span></span>
                                    Start Date
                                    <span className="ml-4"></span>
                                    <span className="ml-4"></span>
                                    <span className="ml-4"></span>
                                    <span className="ml-4"></span>
                                    <span className="ml-4"></span>
                                    <span className="ml-6">25-03-12</span>

                                </span>
                            </span>
                        </li>
                        <li className="mb-4">
                            <span>
                                <span>
                                    <span></span>
                                    End Date
                                    <span className="ml-4"></span>
                                    <span className="ml-4"></span>
                                    <span className="ml-4"></span>
                                    <span className="ml-4"></span>
                                    <span className="ml-4"></span>
                                    <span className="ml-8">25-03-12</span>

                                </span>
                            </span>
                        </li>
                    </div>
                </div>
                <div className={styles.myCardSample}>
                    <div className={styles.card_title}>
                        <span>Election Scheduling</span>
                    </div>
                    <div className={styles.Box123}>
                        <div className="flex" >
                            <div style={{ marginLeft: "3%", fontSize: "15px" }}> <span style={{ marginLeft: "25%", fontSize: "15px" }}>  State</span>  <div style={{ fontSize: "15px" }}> Madhya Pradesh </div> </div>
                            <div className={styles.Line} style={{ marginLeft: "3%" }}></div>
                            <div style={{ marginLeft: "5%", fontSize: "15px" }}>  <span style={{ marginLeft: "25%", fontSize: "15px" }}>  PC</span>  <div style={{ fontSize: "15px" }}> Bhopal </div></div>
                            <div className={styles.Line} style={{ marginLeft: "3%" }}></div>
                            <div style={{ marginLeft: "5%", fontSize: "15px" }}>  <span style={{ marginLeft: "25%", fontSize: "15px" }}>  AC</span>  <div style={{ fontSize: "15px" }}> Govindpura </div></div>
                        </div>
                    </div>

                    <div className={styles.LI_TAG}>
                        <li className="mb-4">
                            <span>
                                <span>
                                    <span></span>
                                    Election Type
                                    <span className="ml-4"></span>
                                    <span className="ml-4"></span>
                                    <span className="ml-4"></span>
                                    <span className="ml-8">Assembly</span>

                                </span>
                            </span>
                        </li>
                        <li className="mb-4">
                            <span>
                                <span>
                                    <span></span>
                                    Start Date
                                    <span className="ml-4"></span>
                                    <span className="ml-4"></span>
                                    <span className="ml-4"></span>
                                    <span className="ml-4"></span>
                                    <span className="ml-4"></span>
                                    <span className="ml-6">25-03-12</span>

                                </span>
                            </span>
                        </li>
                        <li className="mb-4">
                            <span>
                                <span>
                                    <span></span>
                                    End Date
                                    <span className="ml-4"></span>
                                    <span className="ml-4"></span>
                                    <span className="ml-4"></span>
                                    <span className="ml-4"></span>
                                    <span className="ml-4"></span>
                                    <span className="ml-8">25-03-12</span>

                                </span>
                            </span>
                        </li>
                    </div>
                </div>


                <div className={styles.myCardSample}>
                    <div className={styles.card_title}>
                        <span>CDP Scheduling</span>
                    </div>
                    <div className={styles.Box123}>
                        <div className="flex" >
                            <div style={{ marginLeft: "3%", fontSize: "15px" }}> <span style={{ fontSize: "15px" }}>  Unit Quantity </span>  <div style={{ marginLeft: "20%", fontSize: "15px" }}> 2567 </div> </div>
                            <div className={styles.Line} style={{ marginLeft: "6%" }}></div>
                            <div style={{ marginLeft: "5%", fontSize: "15px" }}>  <span style={{ fontSize: "15px" }}>  Unit Type</span>  <div style={{ marginLeft: "20%", fontSize: "15px" }}> CU </div></div>
                            <div className={styles.Line} style={{ marginLeft: "6%" }}></div>
                            <div style={{ marginLeft: "5%", fontSize: "15px" }}>  <span style={{ marginLeft: "10%", fontSize: "15px" }}>  Process</span>  <div style={{ marginLeft: "20%", fontSize: "15px" }}> Polling </div></div>
                        </div>
                    </div>

                    <div className={styles.LI_TAG}>
                        <li className="mb-4">
                            <span>
                                <span>
                                    <span></span>
                                    Number Of Engineers
                                    <span className="ml-6">132</span>

                                </span>
                            </span>
                        </li>
                        <li className="mb-4">
                            <span>
                                <span>
                                    <span></span>
                                    Start Date
                                    <span className="ml-4"></span>
                                    <span className="ml-4"></span>
                                    <span className="ml-4"></span>
                                    <span className="ml-4"></span>
                                    <span className="ml-4"></span>
                                    <span className="ml-6">25-03-12</span>

                                </span>
                            </span>
                        </li>
                        <li className="mb-4">
                            <span>
                                <span>
                                    <span></span>
                                    End Date
                                    <span className="ml-4"></span>
                                    <span className="ml-4"></span>
                                    <span className="ml-4"></span>
                                    <span className="ml-4"></span>
                                    <span className="ml-4"></span>
                                    <span className="ml-8">25-03-12</span>

                                </span>
                            </span>
                        </li>
                    </div>
                </div>
                <div className={styles.myCardSample}>
                    <div className={styles.card_title}>
                        <span>TnA Scheduling</span>
                    </div>
                    <div className={styles.Box123}>
                        <div className="flex" >
                            <div style={{ marginLeft: "3%", fontSize: "15px" }}> <span style={{ fontSize: "15px" }}>  Unit Quantity </span>  <div style={{ marginLeft: "20%", fontSize: "15px" }}> 2567 </div> </div>
                            <div className={styles.Line} style={{ marginLeft: "6%" }}></div>
                            <div style={{ marginLeft: "5%", fontSize: "15px" }}>  <span style={{ fontSize: "15px" }}>  Unit Type</span>  <div style={{ marginLeft: "20%", fontSize: "15px" }}> CU </div></div>
                            <div className={styles.Line} style={{ marginLeft: "6%" }}></div>
                            <div style={{ marginLeft: "5%", fontSize: "15px" }}>  <span style={{ marginLeft: "10%", fontSize: "15px" }}>  Process</span>  <div style={{ marginLeft: "20%", fontSize: "15px" }}> Polling </div></div>
                        </div>
                    </div>

                    <div className={styles.LI_TAG}>
                        <li className="mb-4">
                            <span>
                                <span>
                                    <span></span>
                                    Number Of Engineers
                                    <span className="ml-6">132</span>

                                </span>
                            </span>
                        </li>
                        <li className="mb-4">
                            <span>
                                <span>
                                    <span></span>
                                    Start Date
                                    <span className="ml-4"></span>
                                    <span className="ml-4"></span>
                                    <span className="ml-4"></span>
                                    <span className="ml-4"></span>
                                    <span className="ml-4"></span>
                                    <span className="ml-6">25-03-12</span>

                                </span>
                            </span>
                        </li>
                        <li className="mb-4">
                            <span>
                                <span>
                                    <span></span>
                                    End Date
                                    <span className="ml-4"></span>
                                    <span className="ml-4"></span>
                                    <span className="ml-4"></span>
                                    <span className="ml-4"></span>
                                    <span className="ml-4"></span>
                                    <span className="ml-8">25-03-12</span>

                                </span>
                            </span>
                        </li>
                    </div>
                </div>
                <div className={styles.myCardSample}>
                    <div className={styles.card_title}>
                        <span>Physical Verification</span>
                    </div>
                    <div className={styles.Box123}>
                        <div className="flex" >
                            <div style={{ marginLeft: "15%", fontSize: "15px" }}> Order ID <div style={{ fontSize: "15px" }}> XYZ/20__1 </div></div>
                            <div className={styles.Line} style={{ marginLeft: "12%" }}></div>
                            <div style={{ marginLeft: "5%", fontSize: "15px" }}> WareHouse ID  <div style={{ marginLeft: "25%", fontSize: "15px" }}> AA1122 </div> </div>
                        </div>
                    </div>

                    <div className={styles.LI_TAG}>
                        <li className="mb-4">
                            <span>
                                <span>
                                    <span></span>
                                    Status
                                    <span className="ml-4"></span>
                                    <span className="ml-4"></span>
                                    <span className="ml-4"></span>
                                    <span className="ml-4"></span>
                                    <span className="ml-4"></span>
                                    <span className="ml-4"></span>
                                    <span className="ml-8">In Progress</span>

                                </span>
                            </span>
                        </li>
                        <li className="mb-4">
                            <span>
                                <span>
                                    <span></span>
                                    Start Date
                                    <span className="ml-4"></span>
                                    <span className="ml-4"></span>
                                    <span className="ml-4"></span>
                                    <span className="ml-4"></span>
                                    <span className="ml-4"></span>
                                    <span className="ml-6">25-03-12</span>

                                </span>
                            </span>
                        </li>
                        <li className="mb-4">
                            <span>
                                <span>
                                    <span></span>
                                    End Date
                                    <span className="ml-4"></span>
                                    <span className="ml-4"></span>
                                    <span className="ml-4"></span>
                                    <span className="ml-4"></span>
                                    <span className="ml-4"></span>
                                    <span className="ml-8">25-03-12</span>

                                </span>
                            </span>
                        </li>
                    </div>
                </div>
                <div className={styles.myCardSample}>
                    <div className={styles.card_title}>
                        <span>2nd Randomisation Scheduling</span>
                    </div>
                    <div className={styles.Box123}>
                        <div className="flex" >
                            <div style={{ marginLeft: "3%", fontSize: "15px" }}> <span style={{ fontSize: "15px" }}>  Unit Quantity </span>  <div style={{ marginLeft: "20%", fontSize: "15px" }}> 2567 </div> </div>
                            <div className={styles.Line} style={{ marginLeft: "6%" }}></div>
                            <div style={{ marginLeft: "5%", fontSize: "15px" }}>  <span style={{ fontSize: "15px" }}>  Unit Type</span>  <div style={{ marginLeft: "20%", fontSize: "15px" }}> CU </div></div>
                            <div className={styles.Line} style={{ marginLeft: "6%" }}></div>
                            <div style={{ marginLeft: "5%", fontSize: "15px" }}>  <span style={{ marginLeft: "10%", fontSize: "15px" }}>  Process</span>  <div style={{ marginLeft: "20%", fontSize: "15px" }}> Polling </div></div>
                        </div>
                    </div>
                    <div className={styles.LI_TAG}>
                        <li className="mb-4">
                            <span>
                                <span>
                                    <span></span>
                                    Election Type
                                    <span className="ml-4"></span>
                                    <span className="ml-4"></span>
                                    <span className="ml-4"></span>
                                    <span className="ml-8">Assembly</span>

                                </span>
                            </span>
                        </li>
                        <li className="mb-4">
                            <span>
                                <span>
                                    <span></span>
                                    Start Date
                                    <span className="ml-4"></span>
                                    <span className="ml-4"></span>
                                    <span className="ml-4"></span>
                                    <span className="ml-4"></span>
                                    <span className="ml-4"></span>
                                    <span className="ml-6">25-03-12</span>

                                </span>
                            </span>
                        </li>
                        <li className="mb-4">
                            <span>
                                <span>
                                    <span></span>
                                    End Date
                                    <span className="ml-4"></span>
                                    <span className="ml-4"></span>
                                    <span className="ml-4"></span>
                                    <span className="ml-4"></span>
                                    <span className="ml-4"></span>
                                    <span className="ml-8">25-03-12</span>

                                </span>
                            </span>
                        </li>
                    </div>
                </div>
                <div className={styles.myCardSample}>
                    <div className={styles.card_title}>
                        <span>1nd Randomisation Scheduling</span>
                    </div>
                    <div className={styles.Box123}>
                        <div className="flex" >
                            <div style={{ marginLeft: "3%", fontSize: "15px" }}> <span style={{ fontSize: "15px" }}>  Unit Quantity </span>  <div style={{ marginLeft: "20%", fontSize: "15px" }}> 2567 </div> </div>
                            <div className={styles.Line} style={{ marginLeft: "6%" }}></div>
                            <div style={{ marginLeft: "5%", fontSize: "15px" }}>  <span style={{ fontSize: "15px" }}>  Unit Type</span>  <div style={{ marginLeft: "20%", fontSize: "15px" }}> CU </div></div>
                            <div className={styles.Line} style={{ marginLeft: "6%" }}></div>
                            <div style={{ marginLeft: "5%", fontSize: "15px" }}>  <span style={{ marginLeft: "10%", fontSize: "15px" }}>  Process</span>  <div style={{ marginLeft: "20%", fontSize: "15px" }}> Polling </div></div>
                        </div>
                    </div>
                    <div className={styles.LI_TAG}>
                        <li className="mb-4">
                            <span>
                                <span>
                                    <span></span>
                                    Election Type
                                    <span className="ml-4"></span>
                                    <span className="ml-4"></span>
                                    <span className="ml-4"></span>
                                    <span className="ml-8">Assembly</span>

                                </span>
                            </span>
                        </li>
                        <li className="mb-4">
                            <span>
                                <span>
                                    <span></span>
                                    Start Date
                                    <span className="ml-4"></span>
                                    <span className="ml-4"></span>
                                    <span className="ml-4"></span>
                                    <span className="ml-4"></span>
                                    <span className="ml-4"></span>
                                    <span className="ml-6">25-03-12</span>

                                </span>
                            </span>
                        </li>
                        <li className="mb-4">
                            <span>
                                <span>
                                    <span></span>
                                    End Date
                                    <span className="ml-4"></span>
                                    <span className="ml-4"></span>
                                    <span className="ml-4"></span>
                                    <span className="ml-4"></span>
                                    <span className="ml-4"></span>
                                    <span className="ml-8">25-03-12</span>

                                </span>
                            </span>
                        </li>
                    </div>
                </div>
            </div>

            <div className={styles.parent2} >
               {dataByStatus.map(createCard)};
               {/* {console.log(dataByStatus)} */}
            </div>
        </div >
    );
}






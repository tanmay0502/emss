import React, { useEffect, useState } from "react";
import styles from './styles/Homepage.module.css';
import Data from './Data';
import Card from './Card';


export default function HomePage() {

    let dataByStatus = [];
    let dataByUnitType = [];

    Data.map(function(statusVal){
        statusVal.unit_types.map(function(unitObj){
            if(dataByUnitType.length===0) {
                if(unitObj.manufacturer==='E') {
                    let E = [{
                        model: unitObj.model,
                        count: unitObj.count
                    }];
                    dataByUnitType.push({
                        unit_type: unitObj.unit_type,
                        ECIL: E,
                        BEL: []
                    });
                }
                else if(unitObj.manufacturer==='B') {
                    let B = [{
                        model: unitObj.model,
                        count: unitObj.count
                    }];
                    dataByUnitType.push({
                        unit_type: unitObj.unit_type,
                        ECIL: [],
                        BEL: B
                    });
                }
            }
            else {
                let i = 0;
                dataByUnitType.map(function(unitVal){
                    if((unitVal.unit_type===unitObj.unit_type)) {
                        i = 1;
                        if(unitObj.manufacturer==='E') {
                            let y = 0;
                            unitVal.ECIL.map(function(o){
                                if(o.model===unitObj.model) {
                                    y = 1;
                                    o.count = o.count + unitObj.count;
                                }
                            });
                            if(y==0) {
                                unitVal.ECIL.push({
                                    model: unitObj.model,
                                    count: unitObj.count
                                });
                            }
                        }
                        else if(unitObj.manufacturer==='B') {
                            let y = 0;
                            unitVal.BEL.map(function(o){
                                if(o.model===unitObj.model) {
                                    y = 1;
                                    o.count = o.count + unitObj.count;
                                }
                            });
                            if(y==0) {
                                unitVal.BEL.push({
                                    model: unitObj.model,
                                    count: unitObj.count
                                });
                            }
                        }
                    }
                    
                });
                if(i===0) {
                    if(unitObj.manufacturer==='E') {
                        let E = [{
                            model: unitObj.model,
                            count: unitObj.count
                        }];
                        dataByUnitType.push({
                            unit_type: unitObj.unit_type,
                            ECIL: E,
                            BEL: []
                        });
                    }
                    else if(unitObj.manufacturer==='B') {
                        let B = [{
                            model: unitObj.model,
                            count: unitObj.count
                        }];
                        dataByUnitType.push({
                            unit_type: unitObj.unit_type,
                            ECIL: [],
                            BEL: B
                        });
                }
            }
            }
        });
    });

    Data.map(function(statusVal){
        statusVal.unit_types.map(function(unitVal){
            if(dataByStatus.length===0) {
                
                if(unitVal.manufacturer==='E') {
                    let E = [{
                        model: unitVal.model,
                        count: unitVal.count
                    }];
                    dataByStatus.push({
                        status: statusVal.status,
                        type: [{
                            unit_type: unitVal.unit_type,
                            ECIL: E,
                            BEL: []
                        }]
                    });
                }
                else if(unitVal.manufacturer==='B') {
                    let B = [{
                        model: unitVal.model,
                        count: unitVal.count
                    }];
                    dataByStatus.push({
                        status: statusVal.status,
                        type: [{
                            unit_type: unitVal.unit_type,
                            ECIL: [],
                            BEL: B
                        }]
                    });
                }
            }
            else {
                let u = 0;
                dataByStatus.map(function(sVal){
                    if(sVal.status===statusVal.status) {
                        u = 1;
                        let p = 0;

                        sVal.type.map(function(t){
                            if(t.unit_type===unitVal.unit_type) {
                                p = 1;
                                if(unitVal.manufacturer==='E') {
                                    let k = 0;
                                    t.ECIL.map(function(eObj){
                                        if(eObj.model===unitVal.model) {
                                            k = 1;
                                            eObj.count = eObj.count + unitVal.count
                                        }
                                    });
                                    if(k===0) {
                                        t.ECIL.push({
                                            model: unitVal.model,
                                            count: unitVal.count
                                        })
                                    }
                                }
                                else if(unitVal.manufacturer==='B') {
                                    let k = 0;
                                    t.BEL.map(function(eObj){
                                        if(eObj.model===unitVal.model) {
                                            k = 1;
                                            eObj.count = eObj.count + unitVal.count
                                        }
                                    });
                                    if(k===0) {
                                        t.BEL.push({
                                            model: unitVal.model,
                                            count: unitVal.count
                                        })
                                    }
                                }
                            }
                        });
                        if(p===0) {
                            if(unitVal.manufacturer==='E') {
                                let E = [{
                                    model: unitVal.model,
                                    count: unitVal.count
                                }];
                                
                                    sVal.type.push({
                                        unit_type: unitVal.unit_type,
                                        ECIL: E,
                                        BEL: []
                                    });
                            }
                            else if(unitVal.manufacturer==='B') {
                                let B = [{
                                    model: unitVal.model,
                                    count: unitVal.count
                                }];
                               
                                 
                                    sVal.type.push({
                                        unit_type: unitVal.unit_type,
                                        ECIL: [],
                                        BEL: B
                                    });
                                
                            }
                        }
                    }
                })
                if(u===0) {
                    if(unitVal.manufacturer==='E') {
                        let E = [{
                            model: unitVal.model,
                            count: unitVal.count
                        }];
                        dataByStatus.push({
                            status: statusVal.status,
                            type: [{
                                unit_type: unitVal.unit_type,
                                ECIL: E,
                                BEL: []
                            }]
                        });
                    }
                    else if(unitVal.manufacturer==='B') {
                        let B = [{
                            model: unitVal.model,
                            count: unitVal.count
                        }];
                        dataByStatus.push({
                            status: statusVal.status,
                            type: [{
                                unit_type: unitVal.unit_type,
                                ECIL: [],
                                BEL: B
                            }]
                        });
                    }
                }
            }
        });
    });

    const rightArrow = ">";

    function displayMachineCountByModel(val) {
        return <div>{val.model} {val.count}</div>
    }

    function createCard(cardVal) {
        return (<Card value={cardVal}/>);
    }

    return (

        <div className={styles.parent}>
            <div className={styles.parent3}>
                <div className={styles.myCardSample}>
                    <div className={styles.card_title}>
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
                                    return (
                                        <tbody >
                                            <tr>
                                                <td className="text-black text-sm" style={{ textAlign: "left" }}>
                                                    <div> {val.unit_type}</div>
                                                </td>
                                                <td className="text-black text-sm mr-2 pl-5">
                                                    {val.ECIL.map(displayMachineCountByModel)}
                                                </td>
                                                <td className="text-black text-sm pl-7">
                                                    {val.BEL.map(displayMachineCountByModel)}
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
            </div>
        </div >
    );
}






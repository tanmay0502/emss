import React, { useEffect, useState } from "react";
import styles from './styles/Homepage.module.css';


export default function HomePage() {


    const data = [
        {
            Units: 'Ballot Unit',
            ECIL: "100 M1",
            BEL: "100 M1",

        },
        {
            Units: 'Control Unit',
            ECIL: "100 M1",
            BEL: "100 M1",


        },
        {
            Units: 'VVPAT',
            ECIL: "100 M1",
            BEL: "100 M1"

        }
    ]

    const rightArrow = ">";

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
                            {data != [] && data.length > 0 &&
                                data.map((val, id) => {
                                    return (
                                        <tbody >
                                            <tr>
                                                <td className="text-black text-sm" style={{ textAlign: "left" }}>
                                                    <div> {val['Units']}</div>
                                                </td>
                                                <td className="text-black text-sm mr-2 pl-5">
                                                    <div>{val['ECIL']}</div>
                                                    <div>{val['ECIL']}</div>

                                                </td>
                                                <td className="text-black text-sm pl-7">

                                                    <div>{val['BEL']}</div>
                                                    <div>{val['BEL']}</div>
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
                <div className={styles.myCardSample}>
                    <div className={styles.card_title}>
                        <span>Units {rightArrow} Available For Use</span>
                    </div>

                    <div className="cardSampleBody">
                        <table >
                            <thead >
                                <tr>
                                    <th style={{ color: "#f56a3f", paddingLeft: "33px", textAlign: "left" }}>Units</th>
                                    <th style={{ color: "#f56a3f", paddingLeft: "33px" }}>ECIL</th>
                                    <th style={{ color: "#f56a3f", paddingLeft: "33px" }}>BEL</th>
                                </tr>
                            </thead>
                            {data != [] && data.length > 0 &&
                                data.map((val, id) => {
                                    return (
                                        <tbody >
                                            <tr>
                                                <td className="text-black text-sm" style={{ textAlign: "left" }}>
                                                    <div> {val['Units']}</div>
                                                </td>
                                                <td className="text-black text-sm mr-2 pl-5">
                                                    <div>{val['ECIL']}</div>
                                                    <div>{val['ECIL']}</div>

                                                </td>
                                                <td className="text-black text-sm pl-7">

                                                    <div>{val['BEL']}</div>
                                                    <div>{val['BEL']}</div>
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
                        <span>Units {rightArrow} EP</span>
                    </div>

                    <div className="cardSampleBody">
                        <table >
                            <thead >
                                <tr>
                                    <th style={{ color: "#f56a3f", paddingLeft: "33px", textAlign: "left" }}>Units</th>
                                    <th style={{ color: "#f56a3f", paddingLeft: "33px" }}>ECIL</th>
                                    <th style={{ color: "#f56a3f", paddingLeft: "33px" }}>BEL</th>
                                </tr>
                            </thead>
                            {data != [] && data.length > 0 &&
                                data.map((val, id) => {
                                    return (
                                        <tbody >
                                            <tr>
                                                <td className="text-black text-sm" style={{ textAlign: "left" }}>
                                                    <div> {val['Units']}</div>
                                                </td>
                                                <td className="text-black text-sm mr-2 pl-5">
                                                    <div>{val['ECIL']}</div>
                                                    <div>{val['ECIL']}</div>

                                                </td>
                                                <td className="text-black text-sm pl-7">

                                                    <div>{val['BEL']}</div>
                                                    <div>{val['BEL']}</div>
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
                        <span>Units {rightArrow} Defective</span>
                    </div>
                    <div className="cardSampleBody">
                        <table >
                            <thead >
                                <tr>
                                    <th style={{ color: "#f56a3f", paddingLeft: "33px", textAlign: "left" }}>Units</th>
                                    <th style={{ color: "#f56a3f", paddingLeft: "33px" }}>ECIL</th>
                                    <th style={{ color: "#f56a3f", paddingLeft: "33px" }}>BEL</th>
                                </tr>
                            </thead>
                            {data != [] && data.length > 0 &&
                                data.map((val, id) => {
                                    return (
                                        <tbody >
                                            <tr>
                                                <td className="text-black text-sm" style={{ textAlign: "left" }}>
                                                    <div> {val['Units']}</div>
                                                </td>
                                                <td className="text-black text-sm mr-2 pl-5">
                                                    <div>{val['ECIL']}</div>
                                                    <div>{val['ECIL']}</div>

                                                </td>
                                                <td className="text-black text-sm pl-7">

                                                    <div>{val['BEL']}</div>
                                                    <div>{val['BEL']}</div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    )
                                })}
                        </table>
                    </div>
                </div>
            </div>
        </div >
    );
}






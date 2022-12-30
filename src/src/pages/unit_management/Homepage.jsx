import React, { useEffect, useState } from "react";
import styles from './styles/Homepage.module.css';
import { useNavigate } from 'react-router-dom';
import Data from './Data';
import Card from './Card';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import ListCard from './ListCard';
import statesCode from "../home/StatesCode";


const uri = process.env.REACT_APP_API_SERVER + "/unit/total_counts"
const uri2 = process.env.REACT_APP_API_SERVER + "/unit/fetch-first-randomization-schedule"

let expD = [];
function fun(dat) {
    expD = dat;
}

export { expD };


export default function HomePage() {
    const [unitData, setUnitData] = useState([]);
    const [statusData, setStatusData] = useState([]);
    const [cDat, setCDat] = useState([]);
    const [bDat, setBDat] = useState([]);
    const [vDat, setVDat] = useState([]);
    const [stDat, setStDat] = useState([]);
    const [flcOkCountCU, setFlcOkCountCU] = useState(0);
    const [flcOkCountBU, setFlcOkCountBU] = useState(0);
    const [flcOkCountVT, setFlcOkCountVT] = useState(0);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [data, setData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const getDataTotal = async () => {
            try {
                const ID = window.sessionStorage.getItem('sessionToken');
                const response = await fetch(
                    uri,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        credentials: 'include',
                        body: JSON.stringify(
                            {
                                oprnd: ID
                            }
                        )
                    }
                );
                let data2 = await response.json();
                console.log("/unit/total_counts", data2.data);
                if (data2.data.length) {
                    console.log("data updated")
                    setData(data2["data"]);
                }
            } catch (err) {
                console.log(err)
            }
        }
        getDataTotal()
    }, [])

    useEffect(() => {
        let getData = async () => {
            try {
                const response2 = await fetch(
                    uri2,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        credentials: 'include'
                    }
                );

                let rDat = await response2.json();

                console.log(rDat, "rdat")
                setStartDate(rDat.start_date);
                setEndDate(rDat.end_date);
                // console.log(data);
                // let data = Data;
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
                let sDat = [];
                let flcCU = 0;
                let flcBU = 0;
                let flcVT = 0;
                data.map(function (val) {
                    if (val.unit_type === 'CU') {
                        cuDat.push({
                            modelId: val.unit_type,
                            modelStatus: val.status,
                            modelType: val.model
                            // model_Id: v[3]
                        });

                    }
                    else if (val.unit_type === 'BU') {

                        buDat.push({
                            modelId: val.unit_type,
                            modelStatus: val.status,
                            modelType: val.model
                            // model_Id: v[3]
                        });

                    }
                    else if (val.unit_type === 'VT') {

                        vtDat.push({
                            modelId: val.unit_type,
                            modelStatus: val.status,
                            modelType: val.model
                            // model_Id: v[3]
                        });

                    }
                });
                data.map(function (val) {
                    let k = 0;
                    sDat.map(function (v) {
                        if (v.status === val.status) {
                            k = 1;
                            v.type.push({
                                modelId: val.unit_type,
                                modelStatus: val.status,
                                modelType: val.model
                                // model_Id: v[3]
                            });
                        }
                    });
                    if (k == 0) {
                        let T = [];
                        T.push({
                            modelId: val.unit_type,
                            modelStatus: val.status,
                            modelType: val.model
                            // model_Id: v[3]
                        });

                        sDat.push({
                            status: val.status,
                            type: T
                        });
                    }
                });

                data.map(function (val) {
                    if (val.status === 'FLC OK') {
                        if (val.unit_type === 'CU') flcCU += val.count;
                        else if (val.unit_type === 'BU') flcBU += val.count;
                        else if (val.unit_type === 'VT') flcVT += val.count;
                    }
                });

                for (let i = 0; i < data.length; i++) {
                    const ele = data[i];
                    if (ele.unit_type === 'CU') {
                        if (ele.manufacturer === 'E') {
                            let found = false;
                            for (let a = 0; a < finalData[0].ECIL.length; a++) {
                                if (finalData[0].ECIL[a].model === ele.model) {
                                    found = true;
                                    finalData[0].ECIL[a].count += ele.count;
                                }
                            }
                            if (!found) {
                                finalData[0].ECIL.push({
                                    status: ele.status,
                                    model: ele.model,
                                    count: ele.count
                                })
                            }
                        }
                        if (ele.manufacturer === 'B') {
                            let found = false;
                            for (let a = 0; a < finalData[0].BEL.length; a++) {
                                if (finalData[0].BEL[a].model === ele.model) {
                                    found = true;
                                    finalData[0].BEL[a].count += ele.count;
                                }
                            }
                            if (!found) {
                                finalData[0].BEL.push({
                                    status: ele.status,
                                    model: ele.model,
                                    count: ele.count
                                })
                            }
                        }
                    }
                    if (ele.unit_type === 'VT') {
                        if (ele.manufacturer === 'E') {
                            let found = false;
                            for (let a = 0; a < finalData[1].ECIL.length; a++) {
                                if (finalData[1].ECIL[a].model === ele.model) {
                                    found = true;
                                    finalData[1].ECIL[a].count += ele.count;
                                }
                            }
                            if (!found) {
                                finalData[1].ECIL.push({
                                    status: ele.status,
                                    model: ele.model,
                                    count: ele.count
                                })
                            }
                        }
                        if (ele.manufacturer === 'B') {
                            let found = false;
                            for (let a = 0; a < finalData[1].BEL.length; a++) {
                                if (finalData[1].BEL[a].model === ele.model) {
                                    found = true;
                                    finalData[1].BEL[a].count += ele.count;
                                }
                            }
                            if (!found) {
                                finalData[1].BEL.push({
                                    status: ele.status,
                                    model: ele.model,
                                    count: ele.count
                                })
                            }
                        }
                    }
                    if (ele.unit_type === 'BU') {
                        if (ele.manufacturer === 'E') {
                            let found = false;
                            for (let a = 0; a < finalData[2].ECIL.length; a++) {
                                if (finalData[2].ECIL[a].model === ele.model) {
                                    found = true;
                                    finalData[2].ECIL[a].count += ele.count;
                                }
                            }
                            if (!found) {
                                finalData[2].ECIL.push({
                                    status: ele.status,
                                    model: ele.model,
                                    count: ele.count
                                })
                            }
                        }
                        if (ele.manufacturer === 'B') {
                            let found = false;
                            for (let a = 0; a < finalData[2].BEL.length; a++) {
                                if (finalData[2].BEL[a].model === ele.model) {
                                    found = true;
                                    finalData[2].BEL[a].count += ele.count;
                                }
                            }
                            if (!found) {
                                finalData[2].BEL.push({
                                    status: ele.status,
                                    model: ele.model,
                                    count: ele.count
                                })
                            }
                        }
                    }

                }
                for (let i = 0; i < finalData.length; i++) {
                    // console.log(finalData[i])
                    if (!finalData[i].BEL.length) {
                        finalData[i].BEL.push({
                            model: "0",
                            count: "0"
                        })
                    }
                    if (!finalData[i].ECIL.length) {
                        finalData[i].ECIL.push({
                            model: "0",
                            count: "0"
                        })
                    }
                }
                console.log("Final data displayed", finalData)

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
                                { unit_type: "CU", ECIL: [], BEL: [] },
                                { unit_type: "VT", ECIL: [], BEL: [] },
                                { unit_type: "BU", ECIL: [], BEL: [] }
                            ],
                            unitList: []
                        })
                    }
                }
                console.log("jaadu", data);
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
                                        statusData[j].type[k].ECIL.push({ model: ele.model, count: ele.count })
                                    }
                                    if (ele.manufacturer === "B") {
                                        statusData[j].type[k].BEL.push({ model: ele.model, count: ele.count })
                                    }
                                    break;
                                }
                            }
                            statusData[j].unitList.push({
                                modelId: data[i].unit_type,
                                modelStatus: data[i].status,
                                modelType: data[i].model
                                // model_Id: data[i].unit_list[3]
                            });
                            if (!found) {
                                let temp = {
                                    unit_type: ele.unit_type,
                                    ECIL: [],
                                    BEL: []
                                }
                                if (ele.manufacturer === "E") {
                                    let found = false;
                                    for (let a = 0; a < temp.ECIL.length; a++) {
                                        if (temp.ECIL[i].model === ele.model) {
                                            found = true;
                                            temp.ECIL[i].count += ele.count;
                                            break;
                                        }
                                    }
                                    if (!found) {
                                        temp.ECIL.push({ model: ele.model, count: ele.count })
                                    }
                                }
                                if (ele.manufacturer === "B") {
                                    let found = false;
                                    for (let a = 0; a < temp.BEL.length; a++) {
                                        if (temp.BEL[i].model === ele.model) {
                                            found = true;
                                            temp.BEL[i].count += ele.count;
                                            break;
                                        }
                                    }
                                    if (!found) {
                                        temp.BEL.push({ model: ele.model, count: ele.count })
                                    }
                                    temp.BEL.push({ model: ele.model, count: ele.count })
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
                        if (!statusData[i].type[j].ECIL.length) {
                            statusData[i].type[j].ECIL.push({
                                model: "0",
                                count: "0"
                            })
                        }
                        if (!statusData[i].type[j].BEL.length) {
                            statusData[i].type[j].BEL.push({
                                model: "0",
                                count: "0"
                            })
                        }

                    }

                }


                setUnitData(finalData)
                setStatusData(statusData)
                setCDat(cuDat)
                setBDat(buDat)
                setVDat(vtDat)
                setStDat(sDat)
                setFlcOkCountCU(flcCU);
                setFlcOkCountBU(flcBU);
                setFlcOkCountVT(flcVT);
                return [finalData, statusData, cuDat, buDat, vtDat, sDat, flcCU, flcBU, flcVT];
            } catch (err) {
                console.log(err);
                return [[], []];
            }
        }
        console.log(getData());

    }, [data])

    let dataByStatus = statusData;
    let dataByUnitType = unitData;
    const User_ID = sessionStorage.getItem("sessionToken");
    const Role = User_ID.substring(8)
    // const Role = "DEO"


    const rightArrow = ">";
    const [flc, setflc] = useState([]);
    async function getFLC() {

        try {
            const response = await fetch(
                `${process.env.REACT_APP_API_SERVER}/unit/getflcdetail`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: 'include',
                    // mode: "cors"
                }
            );
            const data = await response.json();
            console.log(data)
            if (response.status == 200) {
                setflc(data['data']);
            }

        } catch (err) {
            console.log({ err });
        }
    }

    useEffect(() => {
        getFLC();
    }, []);




    function DisplayMachineCountByModel({ val }) {
        return <div>{val.count != "0" ? val.count + " " + val.model : "0"}</div>
    }

    const countUnites = (data) => {
        let sum = 0;
        data.map((val) => {
            val.model != "0" ? sum += val.count : sum += 0;
        })
        return sum;
    }
    function createCard(cardVal) {
        let exp = [];
        stDat.map(function (v) {
            if (cardVal.status === v.status) {
                exp = v.type;
            }
        });
        return (
            <div className={styles.myCardSample}>
                <div className={styles.card_title}>
                    <button onClick={handleButtonClick} name={cardVal.status} style={{ backgroundColor: 'white' }}>Units {rightArrow} {cardVal.status}</button>
                </div>
                <div className={styles.Scroll}>
                    <table >
                        <thead >
                            <tr>
                                <th style={{ color: "#f56a3f", paddingLeft: "33px", textAlign: "left" }}>Units</th>
                                <th style={{ color: "#f56a3f", paddingLeft: "33px" }}>ECIL</th>
                                <th style={{ color: "#f56a3f", paddingLeft: "33px" }}>BEL</th>
                            </tr>
                        </thead>
                        {cardVal.type != [] && cardVal.type.length > 0 &&
                            cardVal.type.map((val) => {
                                return (
                                    <tbody >
                                        <tr>
                                            <td className="text-black text-sm" style={{ textAlign: "left" }}>
                                                <div>{val.unit_type}<br />
                                                    {`ECIL:${countUnites(val.ECIL)}`}
                                                    <br />
                                                    {`BEL:${countUnites(val.BEL)}`}
                                                </div>
                                            </td>
                                            <td className="text-black text-sm mr-2 pl-5">
                                                {val.ECIL.map((val, ind) => {
                                                    return (
                                                        <DisplayMachineCountByModel val={val} />
                                                    )
                                                })}

                                            </td>
                                            <td className="text-black text-sm pl-7">
                                                {val.BEL.map((val, ind) => {
                                                    return (
                                                        <DisplayMachineCountByModel val={val} />
                                                    )
                                                })}
                                            </td>
                                        </tr>
                                    </tbody>
                                )
                            })}
                    </table>
                </div>
            </div>
        );
    }


    const handleButtonClick = (e) => {
        // console.log("clicked" + e.target.name);
        if (e.target.name === 'CU') fun(cDat);
        else if (e.target.name === 'BU') fun(bDat);
        else if (e.target.name === 'VT') fun(vDat);
        else {
            stDat.map(function (val) {
                if (val.status === e.target.name) {
                    fun(val.type);
                }
            })
        }
        navigate('/session/unitmanagement/unitlist');
    };



    const Redirect = (e) => {
        navigate("/session/unitmanagement/flc_list")
    };

    const First_Randomisation_call = (e) => {
        if (Role == "CEO") {
            navigate(`/session/unitmanagement/first_randomisation_scheduling`)
        }
        else if (Role == "DEO") {
            navigate(`/session/unitmanagement/firstrandomization`)

        }
    };

    const Second_Randomisation_call = (e) => {
        if (Role == "DEO") {
            navigate(`/session/unitmanagement/second_randomisation_scheduling`)
        }
        else if (Role == "RO") {
            navigate(`/session/unitmanagement/secondrandomization`)

        }
    };


    return (

        <div className={styles.parent}>
            <div className={styles.parent3}>
                <div className={styles.myCardSampleHome}>
                    <div className={styles.s}>
                        <span>State Wise Unit Count</span>
                    </div>
                    {/* <div>
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
                    </div> */}
                    <div className={styles.Scroll}>

                        <table className='w-100 '>
                            <thead >
                                <tr>
                                    <th>Units</th>
                                    <th>ECIL</th>
                                    <th>BEL</th>
                                </tr>
                            </thead>

                            {dataByUnitType != [] && dataByUnitType.length > 0 &&
                                dataByUnitType.map((val) => {

                                    return (
                                        <tbody >
                                            <tr>
                                                <td>
                                                    <button style={{ backgroundColor: 'white' }} onClick={handleButtonClick} name={val.unit_type}>{val.unit_type}
                                                        <br />
                                                        {`ECIL:${countUnites(val.ECIL)}`}
                                                        <br />
                                                        {`BEL:${countUnites(val.BEL)}`}
                                                    </button>
                                                </td>
                                                <td>
                                                    {val.ECIL.map((val, ind) => {
                                                        return (
                                                            <DisplayMachineCountByModel val={val} />
                                                        )
                                                    })}
                                                </td>
                                                <td >
                                                    {val.BEL.map((val, ind) => {
                                                        return (
                                                            <DisplayMachineCountByModel val={val} />
                                                        )
                                                    })}
                                                </td>
                                            </tr>

                                        </tbody>
                                    )
                                })}
                        </table>
                    </div>
                </div>
                {/* {flc !== undefined && */}
                <div className={styles.myCardSampleHover}
                    onClick={Redirect} >
                    <div className={styles.card_title}>
                        <span>FLC Scheduling</span>
                    </div>

                    <div className={styles.Box123}>
                        <div className="flex" >
                            <div style={{ marginLeft: "13%", fontSize: "15px" }}> District <div style={{ fontSize: "15px" }}> {flc !== undefined && flc[1]} </div> </div>
                            <div className={styles.Line} style={{ marginLeft: "12%" }}></div>
                            <div style={{ marginLeft: "15%", fontSize: "15px" }}> Manufacturer <div style={{ marginLeft: "35%", fontSize: "15px" }}> {flc !== undefined && flc[2]}  </div></div>
                        </div>
                    </div>

                    <div className={styles.LI_TAG}>
                        <li className="mb-4">
                            <span>
                                <span>
                                    <span></span>
                                    Number Of Engineers
                                    <span className="ml-6">{flc !== undefined && flc[6]} </span>

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
                                    <span className="ml-6">{flc !== undefined && flc[7] && flc[7].slice(0, 10)} </span>

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
                                    <span className="ml-8">{flc !== undefined && flc[8] && flc[8].slice(0, 10)} </span>

                                </span>
                            </span>
                        </li>
                    </div>
                </div>
                {/* } */}
                <div className={styles.myCardSampleHover} onClick={First_Randomisation_call}>
                    <div className={styles.card_title}>
                        <span>1st Randomisation Scheduling</span>
                    </div>
                    <div className={styles.Box123}>
                        <div className="flex" >
                            <div style={{ marginLeft: "10%", fontSize: "15px" }}> <span style={{ fontSize: "15px" }}>  Units CU </span>  <div style={{ marginLeft: "20%", fontSize: "15px" }}> {flcOkCountCU} </div> </div>
                            <div className={styles.Line} style={{ marginLeft: "6%" }}></div>
                            <div style={{ marginLeft: "10%", fontSize: "15px" }}> <span style={{ fontSize: "15px" }}>  Units BU </span>  <div style={{ marginLeft: "20%", fontSize: "15px" }}> {flcOkCountBU} </div> </div>
                            <div className={styles.Line} style={{ marginLeft: "6%" }}></div>
                            <div style={{ marginLeft: "10%", fontSize: "15px" }}> <span style={{ fontSize: "15px" }}>  Units VT </span>  <div style={{ marginLeft: "20%", fontSize: "15px" }}> {flcOkCountVT} </div> </div>                              </div>
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
                                    <span className="ml-6">{startDate}</span>

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
                                    <span className="ml-8">{endDate}</span>

                                </span>
                            </span>
                        </li>
                    </div>
                </div>
                <div className={styles.myCardSampleHover} onClick={Second_Randomisation_call}>
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
                <div className={styles.myCardSampleHover} onClick={() => { navigate(`/session/unitmanagement/schedule_list`) }}>
                    <div className={styles.card_title}>
                        {/* /session/unitmanagement/schedule_list */}
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


                {/* <div className={styles.myCardSample}>
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
                </div> */}
                <div className={styles.myCardSampleHover} onClick={() => { navigate(`/session/unitmanagement/schedule_tna_list`) }}>
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
                <div className={styles.myCardSampleHover} onClick={() => { navigate(`/session/unitmanagement/schedule_varification_list`) }}>
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
                <div className={styles.myCardSampleHover} onClick={() => { navigate(`/session/unitmanagement/orders`) }}>
                    <div className={styles.card_title}>
                        {/* /session/unitmanagement/schedule_list */}
                        <span>Orders</span>
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
            </div>

            <div className={styles.parent2} >
                {dataByStatus.map(createCard)}
                {/* {console.log(dataByStatus)} */}
            </div>
        </div >
    );
}


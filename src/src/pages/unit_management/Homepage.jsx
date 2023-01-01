import React, { useEffect, useState } from "react";
import styles from './styles/Homepage.module.css';
import { useNavigate } from 'react-router-dom';
import Data from './Data';
import Card from './Card';
import {AiOutlineArrowLeft, AiOutlineArrowRight} from 'react-icons/ai'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import ListCard from './ListCard';
import statesCode from "../home/StatesCode";
import { formatRealm2, getRealm, getTotalCounts, totalStatusAvailable } from "../../components/utils";
import HomePageCardBottom from "./HomePageCardBottom";

const uri = process.env.REACT_APP_API_SERVER + "/unit/total_counts"
const uri2 = process.env.REACT_APP_API_SERVER + "/unit/fetch-first-randomization-schedule"

let expD = [];
function fun(dat) {
    expD = dat;
}

export { expD };


const ID = window.sessionStorage.getItem('sessionToken');

export default function HomePage() {
    const [unitData, setUnitData] = useState([]);
    const [statusData, setStatusData] = useState({});
    const [status1, setStatus1] = useState(totalStatusAvailable[0]);
    const [status2, setStatus2] = useState(totalStatusAvailable[1]);
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
    const [realm, setRealm] = useState([]);
    const [states, setStates] = useState([]);
    const [state, setState] = useState(ID.slice(0,2));
    const [districts, setDistricts] = useState([]);
    const [district, setDistrict] = useState(ID.slice(2,5));
    const [unitCount, setUnitCount] = useState({
        B_M2: [0,0,0],
        B_M3: [0,0,0],
        E_M2: [0,0,0],
        E_M3: [0,0,0]
    });
    const navigate = useNavigate();

    
    const getDataTotal = async (oprnd) => {
        const data2 = await getTotalCounts(oprnd)
        const data = data2.data;
        if (data2.districts) {
            setDistricts(data2.districts)
        }
        console.log("total counts data", data);
        let temp = {
            B_M2: [0,0,0],
            B_M3: [0,0,0],
            E_M2: [0,0,0],
            E_M3: [0,0,0]
        }
        data.map((val)=>{
            if (val.manufacturer==="B"&& val.model==="M2") {
                temp.B_M2[0] += val.BU;
                temp.B_M2[1] += val.CU;
                temp.B_M2[2] += val.VT;
            }
            if (val.manufacturer==="B"&& val.model==="M3") {
                temp.B_M3[0] += val.BU;
                temp.B_M3[1] += val.CU;
                temp.B_M3[2] += val.VT;
            }
            if (val.manufacturer==="E"&& val.model==="M2") {
                temp.E_M2[0] += val.BU;
                temp.E_M2[1] += val.CU;
                temp.E_M2[2] += val.VT;
            }
            if (val.manufacturer==="E"&& val.model==="M3") {
                temp.E_M3[0] += val.BU;
                temp.E_M3[1] += val.CU;
                temp.E_M3[2] += val.VT;
            }
        })
        setUnitCount(temp)
        const tempStatusData = {}
        const temp2 = {
            B_M2: [0,0,0],
            B_M3: [0,0,0],
            E_M2: [0,0,0],
            E_M3: [0,0,0]
        }
        data.map((val)=>{
            if ( !tempStatusData[val.status] ) {
                tempStatusData[val.status] = {
                    B_M2: [0,0,0],
                    B_M3: [0,0,0],
                    E_M2: [0,0,0],
                    E_M3: [0,0,0]
                };
            }
            if (val.manufacturer==="B"&& val.model==="M2") {
                tempStatusData[val.status].B_M2[0] += val.BU;
                tempStatusData[val.status].B_M2[1] += val.CU;
                tempStatusData[val.status].B_M2[2] += val.VT;
            }
            if (val.manufacturer==="B"&& val.model==="M3") {
                tempStatusData[val.status].B_M3[0] += val.BU;
                tempStatusData[val.status].B_M3[1] += val.CU;
                tempStatusData[val.status].B_M3[2] += val.VT;
            }
            if (val.manufacturer==="E"&& val.model==="M2") {
                tempStatusData[val.status].E_M2[0] += val.BU;
                tempStatusData[val.status].E_M2[1] += val.CU;
                tempStatusData[val.status].E_M2[2] += val.VT;
            }
            if (val.manufacturer==="E"&& val.model==="M3") {
                tempStatusData[val.status].E_M3[0] += val.BU;
                tempStatusData[val.status].E_M3[1] += val.CU;
                tempStatusData[val.status].E_M3[2] += val.VT;
            }
        })
        console.log("temp status data",tempStatusData)
        setStatusData(tempStatusData);
    }
    useEffect(() => {
        // const realmData = await getRealm("Warehouse","ListWarehouse")
        const fun = async ()=>{
            const realmData = await getRealm( "User", "CreateUser")
            setRealm(realmData)
            const statesData = formatRealm2(realmData)
            setStates(statesData);
            console.log("get totle counts")
        }
        // fun();
    }, [])
    useEffect(()=>{
        let oprnd = window.sessionStorage.getItem('sessionToken');
        if (state!="IN") {
            oprnd = state+oprnd.slice(2,8)
            if (district!="ALL"){
                oprnd = state+district+oprnd.slice(5,7)
            }
        } 
        getDataTotal(oprnd)
    },[state, district])

    // useEffect(() => {
    //     let getData = async () => {
    //         try {
    //             const response2 = await fetch(
    //                 uri2,
    //                 {
    //                     method: "POST",
    //                     headers: {
    //                         "Content-Type": "application/json",
    //                     },
    //                     credentials: 'include'
    //                 }
    //             );
    //         } catch (err) {
    //             console.log(err);
    //         }
    //     }
    //     console.log(getData());

    // }, [data])

    
    // const Role = "DEO"


    const rightArrow = ">";
    
	

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
    function CreateCard({status, setStatus}) {
        console.log(status)
        let data = statusData[status];
        if (!data) {
            data= {
                B_M2: [0,0,0],
                B_M3: [0,0,0],
                E_M2: [0,0,0],
                E_M3: [0,0,0]
            }
        }
        return ( !data?"":
            <div className={styles.myCardSample}>
                <div className={styles.card_title}>
                    <div className={"flex align-middle"}>
                        <select className={"bg-[#84587C] text-white"} onClick={(e)=>{
                            setStatus(e.target.value);
                        }}>
                            <option value={status}>{"Units > "+status}</option>
                            {totalStatusAvailable.map((val,keys)=>{
                                if (val===status) {
                                    return<></>
                                }
                                return <option className="" value={val}>{"Units > "} {val}</option>
                            })}
                        </select>
                    <button onClick={handleButtonClick} name={status} style={{ backgroundColor: 'white' }}><AiOutlineArrowRight className="text-red-600" /></button>
                        
                    </div>
                </div>
                <div className={styles.Scroll}>
                    <table >
                        <thead >
                            <tr>
                                <th className="w-32">Manufacture</th>
                                <th className="w-14">Model</th>
                                <th>BU</th>
                                <th>VU</th>
                                <th>VVPAT</th>
                            </tr>
                        </thead>
                        <tbody >
                            <tr>
                                <td>BEL</td>
                                <td>M2</td>
                                <td>{data.B_M2[0]}</td>
                                <td>{data.B_M2[1]}</td>
                                <td>{data.B_M2[2]}</td>
                            </tr>
                            <tr>
                                <td>BEL</td>
                                <td>M3</td>
                                <td>{data.B_M3[0]}</td>
                                <td>{data.B_M3[1]}</td>
                                <td>{data.B_M3[2]}</td>
                            </tr>
                            <tr>
                                <td>ECIL</td>
                                <td>M2</td>
                                <td>{data.E_M2[0]}</td>
                                <td>{data.E_M2[1]}</td>
                                <td>{data.E_M2[2]}</td>
                            </tr>
                            <tr>
                                <td>ECIL</td>
                                <td>M3</td>
                                <td>{data.E_M3[0]}</td>
                                <td>{data.E_M3[1]}</td>
                                <td>{data.E_M3[2]}</td>
                            </tr>
                        </tbody>
                        
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

    const [upVisible, setUpVisible] = useState(false);
    useEffect(()=>{
        if (state === ID.slice(0,2)) {
            if (district===ID.slice(2,5)) {
                setUpVisible(false);
            }else {
                setUpVisible(true);
            }
        } else {
            setUpVisible(true);
        }
    },[state, district])
    return (

        <div className={styles.parent}>
            <div className={styles.parent3}>
                <div className={styles.myCardSampleHome +" col-span-2 m-auto"}>
                    <div className={styles.s+" flex"}>
                        {upVisible?<div className=" absolute text-red-600 cursor-pointer text-lg" onClick={()=>{
                            if (district!=ID.slice(2,5)) {
                                setDistrict(ID.slice(2,5));
                                return
                            }
                            if (state!=ID.slice(0,2)) {
                                setState(ID.slice(0,2));
                                return
                            }
                        }}><AiOutlineArrowLeft/></div>:""}
                        {state!="IN"?<span className="ml-6">{`State: ${state}`}</span>:<><span className="ml-6">State: </span>
                        <select onChange={(e)=>{
                            console.log(e.target.value)
                            setState(e.target.value);
                        }}>
                            <option value="">ALL</option>
                            {states.map((val,ind)=>{
                                return(
                                    <option value={val.stCode}>{`${val.stCode} (${val.stName})`}</option>
                                    )
                                })}
                        </select></>}
                        
                        {state!="IN"?district!="ALL"?<><span className="px-4">{`District: ${district}`}</span></>:<> <br/><span>{"District: "}</span>
                        <select onChange={(e)=>{
                            console.log(e.target.value)
                            setDistrict(e.target.value);
                        }}>
                            <option value="">ALL</option>
                            {districts.map((val,ind)=>{
                                return(
                                    <option value={val.distCode}>{`${val.distCode} (${val.distName})`}</option>
                                )
                            })}
                        </select></>:<></>}
                    </div>
                    <div className={styles.Scrolll}>
                        <table className='w-100 '>
                            <thead >
                                <tr>
                                    <th className="">Manufacture</th>
                                    <th className="">Model</th>
                                    <th>BU</th>
                                    <th>VU</th>
                                    <th>VVPAT</th>
                                </tr>
                            </thead>
                                <tbody >
                                    <tr>
                                        <td>BEL</td>
                                        <td>M2</td>
                                        <td>{unitCount.B_M2[0]}</td>
                                        <td>{unitCount.B_M2[1]}</td>
                                        <td>{unitCount.B_M2[2]}</td>
                                    </tr>
                                    <tr>
                                        <td>BEL</td>
                                        <td>M3</td>
                                        <td>{unitCount.B_M3[0]}</td>
                                        <td>{unitCount.B_M3[1]}</td>
                                        <td>{unitCount.B_M3[2]}</td>
                                    </tr>
                                    <tr>
                                        <td>ECIL</td>
                                        <td>M2</td>
                                        <td>{unitCount.E_M2[0]}</td>
                                        <td>{unitCount.E_M2[1]}</td>
                                        <td>{unitCount.E_M2[2]}</td>
                                    </tr>
                                    <tr>
                                        <td>ECIL</td>
                                        <td>M3</td>
                                        <td>{unitCount.E_M3[0]}</td>
                                        <td>{unitCount.E_M3[1]}</td>
                                        <td>{unitCount.E_M3[2]}</td>
                                    </tr>
                                </tbody>
                        </table>
                    </div>
                </div>

                <HomePageCardBottom/>
                <HomePageCardBottom/>
			</div>

            <div className={styles.parent2} >
                <CreateCard status={status1} setStatus={setStatus1}/>
                <CreateCard status={status2} setStatus={setStatus2}/>
            </div>
        </div >
    );
}


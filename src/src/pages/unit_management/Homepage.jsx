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
import RightArrow from "../../assets/icons8-right-arrow-32.png"
import FLCSchedulecard from "./FLCSchedulecard";
import FirstRandcard from "./FirstRandcard";
import SecondRandCard from "./SecondRandCard";
import ElecSchedulingCard from "./ElecSchedulingCard";
import TnASchdulingCard from "./TnASchdulingCard";
import PhysVerificationCard from "./PhysVerificationCard";

const uri = process.env.REACT_APP_API_SERVER + "/unit/total_counts"
const uri2 = process.env.REACT_APP_API_SERVER + "/unit/fetch-first-randomization-schedule"

let expD = [];
function fun(dat) {
    expD = dat;
}

export { expD };


const ID = window.sessionStorage.getItem('sessionToken');

export default function HomePage() {
    const [unitData, setUnitData] = useState({});
    const [statusData, setStatusData] = useState({});
    const [status1, setStatus1] = useState(totalStatusAvailable[0]);
    const [statusData1, setStatusData1] = useState([]);
    const [status2, setStatus2] = useState(totalStatusAvailable[1]);
    const [statusData2, setStatusData2] = useState([]);
    const [cDat, setCDat] = useState([]);
    const [bDat, setBDat] = useState([]);
    const [vDat, setVDat] = useState([]);
    const [cardVal, setcardVal] = useState("FLC Scheduling");
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
        let data = []
        if (data2.data) {
            data = data2.data;
        }
        if (data2.states) {
            setStates(data2.states)
        }
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
        let oprnd = window.sessionStorage.getItem('sessionToken');
        if (state!="IN") {
            oprnd = state+oprnd.slice(2,8)
            if (district!="ALL"){
                oprnd = state+district+oprnd.slice(5,7)
            }
        } 
        const fun = async ()=>{
            const data2 = await getTotalCounts(oprnd, status1)
            let data = data2.data
            statusData1(data);
            console.log("StatusData1", data2)
        }
        fun();
    }, [status1])
    useEffect(() => {
        let oprnd = window.sessionStorage.getItem('sessionToken');
        if (state!="IN") {
            oprnd = state+oprnd.slice(2,8)
            if (district!="ALL"){
                oprnd = state+district+oprnd.slice(5,7)
            }
        } 
        const fun = async ()=>{
            const data2 = await getTotalCounts(oprnd, status2)
            let data = data2.data
            statusData2(data);
            console.log("StatusData2", data2)
        }
        fun();
    }, [status2])
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

    const User_ID = sessionStorage.getItem("sessionToken");
    const Role = User_ID.substring(8)
    // const Role = "DEO"


    const rightArrow = ">";
    
	const [flc, setflc] = useState([]);
    async function getFLC() {

        try {
            const response = await fetch(
                `${process.env.REACT_APP_API_SERVER}/unit/dashboard_cards`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: 'include',
					body: JSON.stringify({
						"stateFilter": "TS",
						"distFilter": "BDK"
					}),
                }
            );
            const data = await response.json()
			console.log('mydata');
			console.log(data);

            if (data["data"].length !== 0) {
				setflc({...data["data"]["flc"]})
				console.log(flc);
            }

        } catch (err) {
            console.log({ err });
        }
    }

    useEffect(() => {
        console.log("statusData1",statusData1)
    }, [statusData1]);

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

    function CreateCard({status, setStatus, statusData}) {
        console.log(status)
        console.log(statusData)
        let data;
        // if (Object.keys(statusData).length) {
        //     data= statusData;
        // } else {
            data= {
                B_M2: [0,0,0],
                B_M3: [0,0,0],
                E_M2: [0,0,0],
                E_M3: [0,0,0]
            }
        // }
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



    const cardRedirect = (e) => {
		if(cardVal === "FLC Scheduling"){
        	navigate("/session/unitmanagement/flc_list")
		}
		else if(cardVal === "1st Randomisation Scheduling"){
        	First_Randomisation_call()
		}
		else if(cardVal === "2nd Randomisation Scheduling"){
        	Second_Randomisation_call()
		}
		else if(cardVal === "Election Scheduling"){
			navigate(`/session/unitmanagement/schedule_list`)
		}
		else if(cardVal === "TnA Scheduling"){
        	navigate(`/session/unitmanagement/schedule_tna_list`)
		}
		else if(cardVal === "Physical Verification"){
        	navigate(`/session/unitmanagement/schedule_varification_list`)
		}
    };

    const First_Randomisation_call = async(e) => {
	const response = await fetch(
            `${process.env.REACT_APP_API_SERVER}/user/validate_permissionAPI`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: 'include',
                body: JSON.stringify({
		    "moduleName": "Unit",
		    "operation": "ScheduleFirstRandomization",
		    "operandState": User_ID.substring(0,2),
		    "operandDist": User_ID.substring(2,5),
		    "operandAC": User_ID.substring(5,8),
		    "operandRole": "-"
                }),
            }
        );

        const data = await response.json();

        if (response.status === 200) {
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
                    <div className={styles.s+""}>
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
                                    <option value={val.distCode}>{`${val.distCode} (${val.distName})`}</option>
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

                <div className={styles.myCardSampleHover}>
					
					<div className="flex justify-center">
						<select className={styles.Box123} style={{fontSize: "20px", display: "flex", margin: "auto", width: "88%"}} value={cardVal}
							onChange={(e)=>{
									setcardVal(e.target.value)
								}
							}
						>
							<option className="bg-white text-black" value="FLC Scheduling">FLC Scheduling</option>
							<option className="bg-white text-black" value="1st Randomisation Scheduling">1st Randomisation Scheduling</option>
							<option className="bg-white text-black" value="2nd Randomisation Scheduling">2nd Randomisation Scheduling</option>
							<option className="bg-white text-black" value="Election Scheduling">Election Scheduling</option>
							<option className="bg-white text-black" value="TnA Scheduling">TnA Scheduling</option>
							<option className="bg-white text-black" value="Physical Verification">Physical Verification</option>
						</select>

						<img src={RightArrow} alt="" style={{ display: "flex", margin: "auto", height: "100%"}} onClick={cardRedirect} />
					</div>
					{
						(() =>{

							if(cardVal === "FLC Scheduling"){
								return <FLCSchedulecard data={flc["flc"]} />
							}
							else if(cardVal === "1st Randomisation Scheduling"){
								return <FirstRandcard/>
							}
							else if(cardVal === "2nd Randomisation Scheduling"){
								return <SecondRandCard/>
							}
							else if(cardVal === "Election Scheduling"){
								return <ElecSchedulingCard/>
							}
							else if(cardVal === "TnA Scheduling"){
								return <TnASchdulingCard/>
							}
							else if(cardVal === "Physical Verification"){
								return <PhysVerificationCard/>
							}
						})()
					}
               
            	</div>
			</div>

            <div className={styles.parent2} >
                <CreateCard status={status1} setStatus={setStatus1} statusData={statusData1}/>
                <CreateCard status={status2} setStatus={setStatus2} statusData={statusData2}/>
            </div>
        </div >
    );
}


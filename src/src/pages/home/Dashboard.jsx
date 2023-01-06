import React, { useState, useEffect, ReactComponent } from 'react'
import jwt_decode from "jwt-decode";
import { timeSince } from "../../assets/helper/DateTimeHelpers.js";

import "./styles/Home1.css"
import "./styles/Newversion.css";
import MapDialog from '../../components/MapDialog.js';
import MapIndia from '../../components/MapIndia.js';
import { ReactComponent as Vector } from '../../assets/Vector.svg'
import CUImg from '../../assets/CU_1.png'
import BUImg from '../../assets/BU 1.png'
import VVPAT from '../../assets/VVPAT 1.png'
import SourceIcon from '../../assets/placeholder 1.png'
import DestIcon from '../../assets/location-pin 1.png'

import { ReactComponent as ChevronRight } from '../../assets/chevron-right.svg';
import { ReactComponent as OtherServicesIcon } from '../../assets/OtherServices.svg';
import { useNavigate } from 'react-router-dom';
import UnitCard from './UnitCard.jsx';
import { PieChart } from 'react-minimal-pie-chart';
import Data from './Data.js';
import statesCode from './StatesCode.js';


function Home1() {
	const [content, setContent] = useState();

	const [issues, setIssues] = useState([])

	const navigate = useNavigate();

	if (typeof content === 'undefined') {
		setContent(",232389,236266,894373");
	}
	const compost = (typeof content === 'undefined') ? ",232389,236266,894373" : content;
	// const st = compost.split(',')[0];
	const bu = Number(compost.split(',')[1]).toLocaleString();
	const cu = Number(compost.split(',')[2]).toLocaleString();
	const vvpat = Number(compost.split(',')[3]).toLocaleString();
	// console.log("compost: " + compost);


	const [content2, setContent2] = useState("");
	const [STName, setSTName] = useState("")
	const [show, setShow] = useState(false);
	const [show2, setShow2] = useState(true);
	const [totalCU, setTotalCU] = useState(0);
	const [totalBU, setTotalBU] = useState(0);
	const [totalVT, setTotalVT] = useState(0);
	const [statusData, setStatusData] = useState([]);
	const [fetchData, setFetchData] = useState([]);
	const [indiaMap, setIndiaMap] = useState(0);

	const uri = process.env.REACT_APP_API_SERVER + "/unit/total_counts"

	const stateID = window.sessionStorage.getItem('sessionToken').slice(0, 2)

	useEffect(() => {
		if (stateID != "IN") {
			if (statesCode.find(e => e.code == stateID)) {
				setIndiaMap(0);
				setSTName(statesCode.find(e => e.code == stateID).state)
			}
		} else {
			setIndiaMap(1)
		}
	}, [stateID])
	useEffect(() => {
		if (content2 && statesCode.find(e => e.state == content2) && !indiaMap) {
			const ID = statesCode.find(e => e.state == content2).code + window.sessionStorage.getItem('sessionToken').slice(2, 11);
			console.log(ID)
			let getData = async () => {
				try {
					// console.log("GET "+uri+ID)
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
					console.log("Data fetched", data2);
					let data = data2['data'];
					console.log(data2)
					setFetchData(data);
				} catch (err) {
					console.log(err);
				}
			}
			getData();
		}
	}, [content2, indiaMap])
	useEffect(() => {
		if (indiaMap) {
			console.log("ddd")
			let getData = async () => {
				try {
					const ID = "IN" + window.sessionStorage.getItem('sessionToken').slice(2, 11);
					// console.log("GET "+uri+ID)
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
								})
						}
					);
					let data2 = await response.json();
					let data = data2['data'];
					console.log(data2)
					setFetchData(data);
				} catch (err) {
					console.log(err);
				}
			}
			getData();
			setContent2("")
		}
	}, [indiaMap])

	useEffect(() => {
		data = fetchData;
		let countCU = 0;
		let countBU = 0;
		let countVT = 0;
		// count the number of unit type in use
		for (let i = 0; i < data.length; i++) {
			const ele = data[i];
			console.log(ele)
			countBU += ele.BU
			countCU += ele.CU
			countVT += ele.VT
			console.log(countBU, countCU, countVT)
		}
		console.log(countBU, countCU, countVT)
		setTotalBU(countBU)
		setTotalCU(countCU)
		setTotalVT(countVT)
		// find the total status available in data
		let status = [];
		for (let i = 0; i < data.length; i++) {
			let found = false;
			for (let j = 0; j < status.length; j++) {
				if (status[j] === data[i].status) {
					found = true;
				}
			}
			if (!found) {
				status.push(data[i].status);
			}
		}

		// sort the data according to their status
		let statusData = [];
		for (let i = 0; i < status.length; i++) {
			let ele = status[i];
			statusData.push({
				status: ele,
				data: data.filter((val) => { return (val.status === ele) })
			})
		}
		// console.log(statusData)
		setStatusData(statusData);
	}, [fetchData])


	const handleClose = () => {
		setIndiaMap(1);
		document.getElementById("statesDropdownHome").selectedIndex = "0";
	}
	const handleOpen = () => {
		setIndiaMap(0);
		for (let i = 0; i < statesCode.length; i++) {
			const ele = statesCode[i];
			if (ele.state === content2) {
				document.getElementById("statesDropdownHome").selectedIndex = i + 1;
			}
		}
	}




	var obj = window.localStorage.getItem(window.sessionStorage.getItem('sessionToken'));
	var data = [];
	var otherElements = []

	if (obj != null) {
		obj = JSON.parse(obj);
		data = obj.states;
		otherElements = obj.others;
	}
	else {
		data = ['Counting', 'In Poll', 'In Reserve', 'Block']
		otherElements = ['District', 'Warehouse', 'Notifications', 'Order Status', 'Recent Issues']
	}

	async function getIssues() {
		const ID = window.sessionStorage.getItem('sessionToken')

		const response = await fetch(
			`${process.env.REACT_APP_API_SERVER}/issue_requests/list_request`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				credentials: 'include',
			}
		);

		const respJSON = await response.json();
		var data = respJSON['data'].slice(-10)
		console.log(data)


		data = data.sort((a, b) => {
			return (new Date(a['createdon'])).getTime() - (new Date(b['createdon'])).getTime()
		})
		// console.log(data)
		data.reverse();
		setIssues(data)
	}

	useEffect(() => {
		getIssues()

		return () => {

		}
	}, [])


	return (
		<div className='dashboard_container'>

			<div className="w-100 gridCustom mt-4" >
				<div className="gross_box d-flex justify-content-evenly">
					<div className="left_sec">
						<img src={BUImg} alt="" />
					</div>
					<div className="right_sec">
						<p>{totalBU}</p>
						<p>Ballot Units</p>
					</div>
				</div>
				<div className="gross_box d-flex justify-content-evenly">
					<div className="left_sec">
						<img src={CUImg} alt="" />
					</div>
					<div className="right_sec">
						<p>{totalCU}</p>
						<p>Control Units</p>
					</div>
				</div>
				<div className="gross_box d-flex justify-content-evenly">
					<div className="left_sec">
						<img src={VVPAT} alt="" />
					</div>
					<div className="right_sec">
						<p>{totalVT}</p>
						<p>VVPAT</p>
					</div>
				</div>
			</div>

			<div className='w-100 gridCustom  pb-10'>
				{otherElements.includes("District") && <div className="myCardSample" style={{ padding: "15px 30px 0" }}>
					{stateID === "IN" ? <><label className="card_title">
						Select State:
					</label>
						<select name="" id="statesDropdownHome" onChange={(e) => {setSTName(e.target.value);setIndiaMap(0); setShow(true); setShow2(false);setContent2(e.target.value) }}>
							<option>{"None"}</option>
							{statesCode.map((val, ind) => {
								return (
									<option value={val.state} onClick={() => { setIndiaMap(0); setShow(true); setShow2(false);setContent2(val.state) }} >{val.state}</option>
								)
							})}
						</select></> : ""}

					<div style={{ height: '75%', overflow: 'hidden' }}>
						<span className="heading" style={{ maxWidth: "100%", display: "block", "textOverflow": "ellipsis", "whiteSpace": "nowrap" }}> {"India:" + content2}</span>
						<div className='map' >
							{/* {console.log(STName)} */}
							{indiaMap === 0 && <MapDialog show={show} StateName={STName} closeModal={handleClose} setTooltipContent={setContent2} />}
							{indiaMap === 1 && <MapIndia show2={show2} closeModal2={handleOpen} setTooltipContent={setContent2} setStateName={setSTName} setShowDistrict={setShow} showInfo={setContent} />}
						</div>
					</div>
				</div>}
				{/* {console.log({statusData})} */}
				{/* {data.length && data.map(val => (

					<UnitCard title={val} statusData={statusData} />

				))} */}


				{/* {otherElements.includes('Warehouse') && <div
					className="myCardSample hover:cursor-pointer transition delay-50 hover:scale-105"
					onClick={() => {
						navigate("/session/warehousemanagement")
					}}
				>
					<div className="card_title d-flex justify-content-between">
						<span>Warehouse</span> <OtherServicesIcon />
					</div>

					<div className="cardSampleBody">
						<center>
							<select name="" id="">
							</select>
						</center>

						<div className='piechart'>
							<div className='text-right' style={{ marginTop: '15px' }}><span>Warehouse count </span> <span className='whCount'>20</span>
							</div>
							<div className='d-flex justify-content-between align-items-top'>
								<PieChart
									data={[
										{ title: 'BU', value: 10, color: '#165BAA' },
										{ title: 'CU', value: 15, color: '#F765A3' },
										{ title: 'VVPAT', value: 20, color: '#16BFD6' },
									]}
									radius={35}
									className='shiftChart'
								/>
								<ul>
									<li><div className='ballot_unit'></div>BU</li>
									<li><div className='control_unit'></div>CU</li>
									<li><div className='VVPAT'></div>VVPAT</li>
								</ul>
							</div>
						</div>
					</div>

				</div>} */}

				{otherElements.includes("Notifications") && <div className="myCardSample " >

					<div className="card_header_noti ">
						<div className="heading">Notifications</div>
						<div className='hBox overflow-x-clip overflow-y-scroll max-h-[350px]' >
							<ul className='li_noti '>
								<li>
									<span>
										<span>
											First Randomisation completed in districts - Bhind, Gwalior, Indore, Bhopal
										</span>
										<span>3hrs ago</span>
									</span>
								</li>
								<li>
									<span>
										<span>
											<span></span>
											Request Ticket raised by DEO Gwalior regarding movement of units.
										</span>
										<span>3hrs ago</span>
									</span>
								</li>
								<li>
									<span>
										<span>
											<span></span>
											Request Ticket raised by DEO Gwalior regarding movement of units.
										</span>
										<span>3hrs ago</span>
									</span>
								</li>
								<li>
									<span>
										<span>
											First Randomisation completed in districts - Bhind, Gwalior, Indore, Bhopal
										</span>
										<span>3hrs ago</span>
									</span>
								</li>
								<li>
									<span>
										<span>
											First Randomisation completed in districts - Bhind, Gwalior, Indore, Bhopal
										</span>
										<span>3hrs ago</span>
									</span>
								</li>
								<li>
									<span>
										<span>
											First Randomisation completed in districts - Bhind, Gwalior, Indore, Bhopal
										</span>
										<span>3hrs ago</span>
									</span>
								</li>
							</ul>
						</div>
					</div>

				</div>}


				

				{otherElements.includes("Recent Issues") &&

					<div
						className="myCardSample hover:cursor-pointer transition delay-100 hover:scale-105 !h-auto"
						onClick={() => {
							navigate("/session/issuemanagement")
						}}
					>

						<div

							className="card_header_noti">
							<div className="heading">Issues and Resolutions</div>
							<div className='hBox overflow-x-clip overflow-y-scroll max-h-[350px] h-[350px]'>
								<ul className='li_noti '>
									{
										issues.map((val) => {
											return (
												<li>
													<span>
														<span>
															{val['severity'] == 'H' ? <span></span> : <></>}
															{val['subject']}
														</span>
														<span>{timeSince(new Date(val['createdon']))}</span>
													</span>
												</li>
											)
										})
									}
								</ul>
							</div>
						</div>

					</div>}

					{otherElements.includes("Order Status") &&
					<div
						className="myCardSample transCard hover:cursor-pointer transition delay-50 hover:scale-105"
						onClick={() => {
							navigate("/session/ordermanagement")
						}}
					>
						<div className="card_title"><span>Order Status</span></div>

						<div className="cardBody cardList" >
							<div className='TransitCard'>
								<div className="transit d-flex justify-content-between align-items-center mt-15">
									<span className='d-flex align-items-center'><img src={SourceIcon} alt="" /> Delhi</span>
									<div className='w-100 text-center'>
										<div className='progressText'>in progress</div>
										<div className='d-flex align-items-center'><div className='border_dashed'></div> <ChevronRight className='chevron mt-che' /></div>
									</div>
									<span className='d-flex'><img src={DestIcon} alt="" /> Haryana</span>
								</div>
								<div className="transitCount d-flex">
									<div className='d-flex'><div className='cuDot'></div> 344 CU</div>
									<div className='d-flex'><div className='buDot'> </div> 344 BU</div>
									<div className='d-flex'><div className='vvpatDot'></div> 344 VVPAT</div>
								</div>
							</div>

							<div className='TransitCard'>
								<div className="transit d-flex justify-content-between align-items-center mt-15">
									<span className='d-flex align-items-center'><img src={SourceIcon} alt="" /> Delhi</span>
									<div className='w-100 text-center'>
										<div className='progressText'>in progress</div>
										<div className='d-flex align-items-center'><div className='border_dashed'></div> <ChevronRight className='chevron mt-che' /></div>
									</div>
									<span className='d-flex'><img src={DestIcon} alt="" /> Haryana</span>
								</div>
								<div className="transitCount d-flex">
									<div className='d-flex'><div className='cuDot'></div> 344 CU</div>
									<div className='d-flex'><div className='buDot'> </div> 344 BU</div>
									<div className='d-flex'><div className='vvpatDot'></div> 344 VVPAT</div>
								</div>
							</div>

							<div className='TransitCard'>
								<div className="transit d-flex justify-content-between align-items-center mt-15">
									<span className='d-flex align-items-center'><img src={SourceIcon} alt="" /> Delhi</span>
									<div className='w-100 text-center'>
										<div className='progressText'>in progress</div>
										<div className='d-flex align-items-center'><div className='border_dashed'></div> <ChevronRight className='chevron mt-che' /></div>
									</div>
									<span className='d-flex'><img src={DestIcon} alt="" /> Haryana</span>
								</div>
								<div className="transitCount d-flex">
									<div className='d-flex'><div className='cuDot'></div> 344 CU</div>
									<div className='d-flex'><div className='buDot'> </div> 344 BU</div>
									<div className='d-flex'><div className='vvpatDot'></div> 344 VVPAT</div>
								</div>
							</div>

							<div className='TransitCard'>
								<div className="transit d-flex justify-content-between align-items-center mt-15">
									<span className='d-flex align-items-center'><img src={SourceIcon} alt="" /> Delhi</span>
									<div className='w-100 text-center'>
										<div className='progressText'>in progress</div>
										<div className='d-flex align-items-center'><div className='border_dashed'></div> <ChevronRight className='chevron mt-che' /></div>
									</div>
									<span className='d-flex'><img src={DestIcon} alt="" /> Haryana</span>
								</div>
								<div className="transitCount d-flex">
									<div className='d-flex'><div className='cuDot'></div> 344 CU</div>
									<div className='d-flex'><div className='buDot'> </div> 344 BU</div>
									<div className='d-flex'><div className='vvpatDot'></div> 344 VVPAT</div>
								</div>
							</div>

							<div className='TransitCard'>
								<div className="transit d-flex justify-content-between align-items-center mt-15">
									<span className='d-flex align-items-center'><img src={SourceIcon} alt="" /> Delhi</span>
									<div className='w-100 text-center'>
										<div className='progressText'>in progress</div>
										<div className='d-flex align-items-center'><div className='border_dashed'></div> <ChevronRight className='chevron mt-che' /></div>
									</div>
									<span className='d-flex'><img src={DestIcon} alt="" /> Haryana</span>
								</div>
								<div className="transitCount d-flex">
									<div className='d-flex'><div className='cuDot'></div> 344 CU</div>
									<div className='d-flex'><div className='buDot'> </div> 344 BU</div>
									<div className='d-flex'><div className='vvpatDot'></div> 344 VVPAT</div>
								</div>
							</div>

							<div className='TransitCard'>
								<div className="transit d-flex justify-content-between align-items-center mt-15">
									<span className='d-flex align-items-center'><img src={SourceIcon} alt="" /> Delhi</span>
									<div className='w-100 text-center'>
										<div className='progressText'>in progress</div>
										<div className='d-flex align-items-center'><div className='border_dashed'></div> <ChevronRight className='chevron mt-che' /></div>
									</div>
									<span className='d-flex'><img src={DestIcon} alt="" /> Haryana</span>
								</div>
								<div className="transitCount d-flex">
									<div className='d-flex'><div className='cuDot'></div> 344 CU</div>
									<div className='d-flex'><div className='buDot'> </div> 344 BU</div>
									<div className='d-flex'><div className='vvpatDot'></div> 344 VVPAT</div>
								</div>
							</div>


							<div className='TransitCard'>
								<div className="transit d-flex justify-content-between align-items-center mt-15">
									<span className='d-flex align-items-center'><img src={SourceIcon} alt="" /> Delhi</span>
									<div className='w-100 text-center'>
										<div className='progressText'>in progress</div>
										<div className='d-flex align-items-center'><div className='border_dashed'></div> <ChevronRight className='chevron mt-che' /></div>
									</div>
									<span className='d-flex'><img src={DestIcon} alt="" /> Haryana</span>
								</div>
								<div className="transitCount d-flex">
									<div className='d-flex'><div className='cuDot'></div> 344 CU</div>
									<div className='d-flex'><div className='buDot'> </div> 344 BU</div>
									<div className='d-flex'><div className='vvpatDot'></div> 344 VVPAT</div>
								</div>
							</div>


							<div className='TransitCard'>
								<div className="transit d-flex justify-content-between align-items-center mt-15">
									<span className='d-flex align-items-center'><img src={SourceIcon} alt="" /> Delhi</span>
									<div className='w-100 text-center'>
										<div className='progressText'>in progress</div>
										<div className='d-flex align-items-center'><div className='border_dashed'></div> <ChevronRight className='chevron mt-che' /></div>
									</div>
									<span className='d-flex'><img src={DestIcon} alt="" /> Haryana</span>
								</div>
								<div className="transitCount d-flex">
									<div className='d-flex'><div className='cuDot'></div> 344 CU</div>
									<div className='d-flex'><div className='buDot'> </div> 344 BU</div>
									<div className='d-flex'><div className='vvpatDot'></div> 344 VVPAT</div>
								</div>
							</div>


							<div className='TransitCard'>
								<div className="transit d-flex justify-content-between align-items-center mt-15">
									<span className='d-flex align-items-center'><img src={SourceIcon} alt="" /> Delhi</span>
									<div className='w-100 text-center'>
										<div className='progressText'>in progress</div>
										<div className='d-flex align-items-center'><div className='border_dashed'></div> <ChevronRight className='chevron mt-che' /></div>
									</div>
									<span className='d-flex'><img src={DestIcon} alt="" /> Haryana</span>
								</div>
								<div className="transitCount d-flex">
									<div className='d-flex'><div className='cuDot'></div> 344 CU</div>
									<div className='d-flex'><div className='buDot'> </div> 344 BU</div>
									<div className='d-flex'><div className='vvpatDot'></div> 344 VVPAT</div>
								</div>
							</div>

						</div>
					</div>}
			</div>
		</div>
	);
}

export default Home1

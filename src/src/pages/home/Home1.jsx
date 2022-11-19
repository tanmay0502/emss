import React, { useState, useEffect, ReactComponent } from 'react'
import jwt_decode from "jwt-decode";
import { timeSince } from "../../assets/helper/DateTimeHelpers.js";

import "./styles/Home1.css"
import "./styles/Newversion.css";
import MapDialog from '../../components/MapDialog';
import MapIndia from '../../components/MapIndia';
import { ReactComponent as Vector } from '../../assets/Vector.svg'
import CUImg from '../../assets/CU_1.png'
import BUImg from '../../assets/BU 1.png'
import VVPAT from '../../assets/VVPAT 1.png'
import SourceIcon from '../../assets/placeholder 1.png'
import DestIcon from '../../assets/location-pin 1.png'

import { ReactComponent as ChevronRight } from '../../assets/chevron-right.svg';
import { ReactComponent as OtherServicesIcon } from '../../assets/OtherServices.svg';
import { useNavigate } from 'react-router-dom';
import UnitCard from './UnitCard';
import { PieChart } from 'react-minimal-pie-chart';



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
	console.log("compost: " + compost);


	const [content2, setContent2] = useState("");
	const [STName, setSTName] = useState("")
	const [show, setShow] = useState(false);
	const [show2, setShow2] = useState(true);


	const handleClose = () => setIndiaMap(1);
	const handleOpen = () => setIndiaMap(0);


	const [indiaMap, setIndiaMap] = useState(1);

	const blocked = [
		['Ballot Units', 1, 2], ['Control Units', 1, 2], ['VVPAT', 3, 5]
	]

	const ep = [
		['Ballot Units', 200, 0], ['Control Units', 200, 0], ['VVPAT', 400, 0]
	]

	const defective = [
		['Ballot Units', 400, 20], ['Control Units', 500, 10], ['VVPAT', 800, 50]
	]
	const available = [
		['Ballot Units', 6349, 278], ['Control Units', 4299, 288], ['VVPAT', 13747, 90]
	]

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

	async function getIssues(){
		const ID = window.sessionStorage.getItem('sessionToken')

		const response = await fetch(
			`${process.env.REACT_APP_API_SERVER}/issue_requests/list_request/${ID}`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
				credentials: 'same-origin',
				mode: "cors",
			}
		);

		const respJSON = await response.json();
		var data = respJSON['data'].slice(-10);
		// data.reverse();
		data = data.sort((a,b) => {
			return (new Date(a['createdon'])).getTime() - (new Date(b['createdon'])).getTime()
		})
		console.log(data)
		setIssues(data)
	}

	useEffect(() => {
		getIssues()

		return () => {

		}
	}, [])


	return (
		<div className='dashboard_container'>

			<div className='edit_view_button'>
				<Vector /> <span onClick={() => navigate("/session/home/editview")}>Edit View</span>
			</div>

			<div className="w-100 gridCustom mt-4" >
				<div className="gross_box d-flex justify-content-evenly">
					<div className="left_sec">
						<img src={CUImg} alt="" />
					</div>
					<div className="right_sec">
						<p>45,00,512</p>
						<p>Control Units</p>
					</div>
				</div>
				<div className="gross_box d-flex justify-content-evenly">
					<div className="left_sec">
						<img src={BUImg} alt="" />
					</div>
					<div className="right_sec">
						<p>51,06,525</p>
						<p>Ballot Units</p>
					</div>
				</div>
				<div className="gross_box d-flex justify-content-evenly">
					<div className="left_sec">
						<img src={VVPAT} alt="" />
					</div>
					<div className="right_sec">
						<p>31,79,532</p>
						<p>VVPAT</p>
					</div>
				</div>
			</div>

			<div className='w-100 gridCustom  pb-10'>
				{otherElements.includes("District") && <div className="myCardSample">
					<div className="card_title">
						District
					</div>
					<select name="" id="">
						<option value=""></option>
					</select>

					<div style={{ height: '70%', overflow: 'hidden' }}>
						<span className="heading" style={{ maxWidth: "100%", display: "block", "textOverflow": "ellipsis", "whiteSpace": "nowrap" }}> India: {content2}</span>
						<div className='map' >
							{indiaMap == 0 && <MapDialog show={show} StateName={STName} closeModal={handleClose} />}
							{indiaMap == 1 && <MapIndia show2={show2} closeModal2={handleOpen} setTooltipContent={setContent2} setStateName={setSTName} setShowDistrict={setShow} showInfo={setContent} />}
						</div>
					</div>
				</div>}

				{data.length && data.map(val => (
					<UnitCard title={val} data={defective} />
				))}


				{otherElements.includes('Warehouse') && <div className="myCardSample">
					<div className="card_title d-flex justify-content-between">
						<span>Warehouse</span> <OtherServicesIcon />
					</div>

					<div className="cardSampleBody">
						<center>
							<select name="" id="">
								{/* <option value="">National Reserve Warehouse</option> */}
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

				</div>}

				{otherElements.includes("Notifications") && <div className="myCardSample " >

					<div className="card_header_noti ">
						<div className="heading">Notifications</div>
						<div className='hBox'>
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


				{otherElements.includes("Order Status") && <div className='myCardSample transCard' >
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

				{otherElements.includes("Recent Issues") && <div className="myCardSample " >

					<div className="card_header_noti ">
						<div className="heading">Recent Issues</div>
						<div className='hBox'>
							<ul className='li_noti '>
								{
									issues.map((val)=>{
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
			</div>
		</div>
	);
}

export default Home1

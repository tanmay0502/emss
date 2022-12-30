import React, { ReactComponent } from 'react'
import { useState, useEffect } from "react";
import './css/WarehouseList.css'
import WarehouseDetail from './WarehouseDetail';
import { FaUserEdit } from "react-icons/fa";
import { AiOutlineSortAscending, AiOutlineSortDescending } from "react-icons/ai";

import { useNavigate } from 'react-router-dom'
import { ReactComponent as SearchInputElement } from '../../assets/searchInputIcon.svg';
import { ReactComponent as ChevronDown } from '../../assets/ChevronDown.svg';
import { Fragment } from 'react';
import {AiOutlineDownload} from 'react-icons/ai'
import DynamicDataTable from "@langleyfoxall/react-dynamic-data-table";
import ToggleButton from '../../components/ToggleButton';

import UserImageTest from '../../assets/UserImageTest.png'
import {CSVLink, CSVDownload} from 'react-csv';


// React Icons
import { FaCircle } from 'react-icons/fa'
import { FaKey } from 'react-icons/fa'

const uri = process.env.REACT_APP_API_SERVER;

function WarehouseList() {
	const navigate = useNavigate();
	const [Details, setDetails] = React.useState([]);
	
	const [warehouseMapping, setWarehouseMapping] = useState(null)
	// console.log(window.localStorage.getItem("token"))

	async function getList() {

		try {
			const response = await fetch(
				`${process.env.REACT_APP_API_SERVER}/warehouse/listWarehouses`,
				{
					method: "POST",
					credentials: "include",
					headers: {
						"Content-Type": "application/json",
					},
				})

			const data = await response.json();
			console.log(data);
			setDetails(data["data"])
			console.log(data["data"], "data")
		} catch (error) {
			console.log(error)
		}

	}
	
	useEffect(() => {
		MapWarehouseTypes();
		getList();
	}, [])

	const MapWarehouseTypes = async () => {
		try {
			const response = await fetch(
				`${process.env.REACT_APP_API_SERVER}/warehouse/warehouseTypes`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					credentials: 'include'
				}
			)
			const types = await response.json();
			setWarehouseMapping(types);
		} catch (error) {
			console.log(error);
		}
	}

	const [isDetail, setIsDetail] = useState(0);

	const [tableData, setTableData] = useState([])
	const [tableFilter, setTableFilter] = useState("")
	const [user, setUser] = useState();
	const [sortBy, setSortBy] = useState("None")
	const [sortOrder, setSortOrder] = useState("asc")

	const sortMapping = {
		"None": null,
		"Warehouse ID": "warehouseid",
		"Status": "status",
		"Type": "Room Type",
	}

	const [id, setID] = useState("")
	// useEffect(() => {
	// 	console.log(tableData[0]['warehouseid'])
	// }, [tableData])

	useEffect(() => {
		console.log(user);
		if (user) {
			console.log({ user });
			setIsDetail(1);
		}
	}, [user]);

	function details(value) {
		console.log(value);
		setUser(value);
	}

	function close() {
		setIsDetail(0);
		setUser(null)
	}

	useEffect(() => {
		var data = Details.filter((elem) => {
			if (tableFilter === "") {
				return true;
			}
			else {
				console.log(data)
				const filter = tableFilter.toLowerCase();
				return (elem['warehouseid'].toLowerCase().includes(filter) || elem['type'].toLowerCase().includes(filter))
			}
		}).map((val) => {
			return {
				"Warehouse ID": val["type"] == 'P' ?
					<Fragment><span style={{ display: 'flex', justifyContent: 'left', alignItems: 'center', marginLeft: "12%" }}>
						<FaCircle size='0.8em' className= 'PermaWarehouse' />
						<span style={{ marginLeft: '25px', marginRight: '25px' }}>
							{val['warehouseid']}</span>{val['doublelock'] ?
								<Fragment><FaKey className='keyColor' />
									<FaKey className='keyColor' /></Fragment>
								:
								<FaKey className='keyColor' />}</span></Fragment>
					:
					<Fragment><span style={{ display: 'flex', justifyContent: 'left', alignItems: 'center', marginLeft: "12%" }}>
						<FaCircle size='0.8em' className= {val["type"] === 'T'? 'TempWarehouse':'PrivateWarehouse' } />
						<span style={{ marginLeft: '25px', marginRight: '25px' }}>{val['warehouseid']}</span>{val['doublelock'] ?
							<Fragment>
								<FaKey className='keyColor' />
								<FaKey className='keyColor' />
							</Fragment> :
							<FaKey className='keyColor' />}
					</span>
					</Fragment>,
				"warehouseid": val['warehouseid'],
				"Room Type": warehouseMapping ? warehouseMapping["data"][val["type"]] : "",
				"room_type": warehouseMapping ? warehouseMapping["data"][val["type"]] : "",
				Details: val,
				Edit: <button className="modifyBtn p-2 text-white" disabled={true}>
					<FaUserEdit style={{ transform: "translateX(1px)" }} />
				</button>,
				"status":val["status"],
				"Status": <ToggleButton warehouseID={val["warehouseid"]} checked={val["status"] == 'A'} onToggle={(e) => {
					if (val["status"] == "A") {
						DectivateWarehouse(val["warehouseid"])
					}
					else {
						ActivateWarehouse(val["warehouseid"])
					}
					console.log(val["warehouseid"])
				}}/>
			}
		})

		let finalData = []
		let tmpWare = [], tmpStrong = []

		tmpWare = data.filter((val) => {
			return val['Room Type'] && val['Room Type'].startsWith('W')
		}).sort((a, b) => {
			return a['room_type'] && (a['room_type'].localeCompare(b['room_type']))
		})

		tmpStrong = data.filter((val) => {
			return val['Room Type'] && val['Room Type'].startsWith('S')
		}).sort((a, b) => {
			return a['room_type'] && (a['room_type'].localeCompare(b['room_type']))
		})

		data = tmpWare.concat(...tmpStrong)


		if (sortMapping[sortBy] !== null) {
			data.sort(function (a, b) {
				if (sortMapping[sortBy] !== null) {
					// console.log(data)
					
					return (a[sortMapping[sortBy]].toString()).localeCompare(b[sortMapping[sortBy]].toString())
				}
				else return 0;
			});
			if (sortOrder === 'desc') {
				data.reverse();
			}
		}
		// console.log(data)

		setTableData(data)
		return () => {

		}
	}, [Details, warehouseMapping, tableFilter, sortBy, sortOrder])


	const ActivateWarehouse = async (myId) => {
		if (window.confirm(`Are you sure you want to Activate Warehouse ${myId}? `)) {
			try {

				const response = await fetch(
					`${process.env.REACT_APP_API_SERVER}/warehouse/activateWarehouse`,
					{
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						credentials: "include",
						body: JSON.stringify({
							"warehouseID": myId
						})
					}
				)

				const status = response;
				if (status.status == 200) {
					alert("Warehouse Activated Successfully");
					// navigate('/session/warehousemanagement');
					getList();
				}
				else {
					alert("Activation Failed");
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
					`${process.env.REACT_APP_API_SERVER}/warehouse/deactivateWarehouse/`,
					{
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						credentials: "include",
						body: JSON.stringify({
							"warehouseID": myId
						})
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
	// console.log(users);
	return (
		<div className="warehouse-list-grid">
			{/* {console.log(tableData["Status"])} */}
			<div className="myWrapper" style={{ position: "relative", height: "100%", gridArea: "1 / 1 / 6 / 2" }}>
				<div className='label_list'>
					<div className='label d-flex d-flex-center'><span><FaCircle className='PermaWarehouse' /></span> Goverment Building</div>
					<div className='label d-flex d-flex-center'><span><FaCircle className='PrivateWarehouse' /></span> Private Building</div>
					<div className='label d-flex d-flex-center'><span><FaCircle className='TempWarehouse' /></span> Dedicated Building</div>
					<div className='label d-flex d-flex-center'><span><Fragment><span className='d-flex d-flex-center'><FaKey className='keyColor' /><FaKey className='keyColor' /></span></Fragment></span> Double Lock Present</div>
					<div className='label d-flex d-flex-center'><span><FaKey className='keyColor' /></span> Double Lock Absent</div>
				</div>
				{isDetail == 0 ? <div style={{ display: "flex", "flexDirection": "row", "justifyContent": "space-between" }}>
					<h4>Associated Warehouses</h4>
					<div style={{ display: "flex", "flexDirection": "row", alignItems: "center", justifyContent: "center" }}>
						<button className='createUserBtn' onClick={() => {
							navigate("/session/warehousemanagement/addwarehouse")
						}}>Create New</button>
						<div style={{ display: "flex", "flexDirection": "row", alignItems: "center", justifyContent: "center", background: "var(--lightGrayBG )", borderRadius: "10px", padding: "7.5px 15px 7.5px 0", fontSize: "0.8em" }}>
							<SearchInputElement style={{ margin: "0 7.5px", width: "20px" }} />
							<input className="w-24" type={'search'} defaultValue={tableFilter} onChange={(e) => { setTableFilter(e.target.value) }} placeholder='Search' style={{ outline: "none", background: "transparent" }} />
						</div>
						<div style={{ display: "flex", "flexDirection": "row", alignItems: "center", justifyContent: "center", marginLeft: "10px", background: "var(--lightGrayBG )", borderRadius: "10px", padding: "7.5px 15px 7.5px 0", fontSize: "0.8em" }}>
							<span style={{ minWidth: "max-content", paddingInlineStart: "7.5px" }}>Sort by : &nbsp;</span>
							<select
								style={{ textAlign: "center", outline: "none", background: "transparent", padding: "0px", border: "none" }}
								onChange={(e) => setSortBy(e.target.value)}>
								<option value={"None"}>Default</option>
								<option value={"Warehouse ID"}>Warehouse ID</option>
								<option value={"Status"}>Status</option>
								{/* <option value={"Type"}>Type</option> */}
							</select>
							<ChevronDown />
							<button className='sortOrderButton' onClick={() => {
								setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
							}}>
								{sortOrder === 'asc' ? <AiOutlineSortAscending /> : <AiOutlineSortDescending />}
							</button>
					<CSVLink filename={"wareHouseList.csv"} data={Details}><div className="text-gray-400 text-lg m-2 py-1 px-2" title="Export To CSV"><AiOutlineDownload/></div></CSVLink>

						</div>
					</div>

				</div> : <></>}
							{/* {console.log(tableData)} */}
				{isDetail == 0 ? <DynamicDataTable className="warehouses-table"
				
					rows={tableData}
					fieldsToExclude={["Details", "Edit", "BuildingType", "room_type", "warehouseid","status"]}
					orderByField={sortMapping[sortBy]}
					orderByDirection={sortOrder}
					onClick={(event, row) => {
						details(row)
					}}
					fieldMap={{
						"Warehouse ID": (<div className="cursor-pointer" onClick={()=>{setSortBy("Warehouse ID")}}>Warehouse ID</div>),
						"Status": (<div className="cursor-pointer" onClick={()=>{setSortBy("Status")}}>Status</div>)
					}}
					buttons={[]}
					allowOrderingBy={[
						'warehouseid', 'status', "type"
					]} />
					:
					<WarehouseDetail detail={user} close={close} warehouseMapping={warehouseMapping} />
				}
			</div>
			<div className='myWrapper' style={{ "gridArea": "1 / 2 / 3 / 3" }}>
				<h4>Warehouse Count</h4>
				<ul className='warehouseStats'>
					<li className='tableHeader'></li>
					<li className='tableHeader'>Active</li>
					<li className='tableHeader'>Inactive</li>
					<li className='tableHeader'>Total</li>
					{/* Private Count */}
					<li className='tableHeader'>Private</li>
					<li>
						{tableData.filter((elem) => {
							return elem["Details"] && elem["Details"]["type"] === 'P' && elem["Details"]["status"] === "A"
						}).length.toLocaleString()}
					</li>
					<li>
						{tableData.filter((elem) => {
							return elem["Details"] && elem["Details"]["type"] === 'P' && elem["Details"]["status"] === "I"
						}).length.toLocaleString()}
					</li>
					<li>
						{tableData.filter((elem) => {
							return elem["Details"] && elem["Details"]["type"] === 'P'
						}).length.toLocaleString()}
					</li>
					{/* Govt. Count */}
					<li className='tableHeader'>Govt.</li>
					<li>
						{tableData.filter((elem) => {
							return elem["Details"] && elem["Details"]["type"] === 'G' && elem["Details"]["status"] === "A"
						}).length.toLocaleString()}
					</li>
					<li>
						{tableData.filter((elem) => {
							return elem["Details"] && elem["Details"]["type"] === 'G' && elem["Details"]["status"] === "I"
						}).length.toLocaleString()}
					</li>
					<li>
						{tableData.filter((elem) => {
							return elem["Details"] && elem["Details"]["type"] === 'G'
						}).length.toLocaleString()}
					</li>
					{/* Own Count */}
					<li className='tableHeader'>Dedicated</li>
					<li>
						{tableData.filter((elem) => {
							return elem["Details"] && elem["Details"]["type"] === 'O' && elem["Details"]["status"] === "A"
						}).length.toLocaleString()}
					</li>
					<li>
						{tableData.filter((elem) => {
							return elem["Details"] && elem["Details"]["type"] === 'O' && elem["Details"]["status"] === "I"
						}).length.toLocaleString()}
					</li>
					<li>
						{tableData.filter((elem) => {
							return elem["Details"] && elem["Details"]["type"] === 'O'
						}).length.toLocaleString()}
					</li>
					{/* All Count */}
					<li className='tableHeader'>All</li>
					<li>
						{tableData.filter((elem) => {
							return elem["Details"] && elem["Details"]["status"] === "A"
						}).length.toLocaleString()}
					</li>
					<li>
						{tableData.filter((elem) => {
							return elem["Details"] && elem["Details"]["status"] === "I"
						}).length.toLocaleString()}
					</li>
					<li>
						{tableData.filter((elem) => {
							return elem["Details"]
						}).length.toLocaleString()}
					</li>
				</ul>
			</div>
			<div className='myWrapper' style={{ "gridArea": "3 / 2 / 6 / 3" }}>
				<h4>Notifications</h4>
				<ul className='li_noti hide-scroll-bar'>
					<li>
						<span>
							<span>
								First Randomisation completed in districts- Bhind, Gwalior, Indore, Bhopal
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
								First Randomisation completed in districts- Bhind, Gwalior, Indore, Bhopal
							</span>
							<span>3hrs ago</span>
						</span>
					</li>
					<li>
						<span>
							<span>
								First Randomisation completed in districts- Bhind, Gwalior, Indore, Bhopal
							</span>
							<span>3hrs ago</span>
						</span>
					</li>
					<li>
						<span>
							<span>
								First Randomisation completed in districts- Bhind, Gwalior, Indore, Bhopal
							</span>
							<span>3hrs ago</span>
						</span>
					</li>
				</ul>
			</div>
		</div>
	);
}
export default WarehouseList

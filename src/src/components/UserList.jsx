import React, { ReactComponent } from 'react'
import { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import './styles/UserList.css'
import UserDetail from './UserDetail';
import { FaUserEdit, FaCircle } from "react-icons/fa";
import { AiOutlineSortAscending, AiOutlineSortDescending } from "react-icons/ai";

import { useNavigate } from 'react-router-dom'
import { ReactComponent as SearchInputElement } from '../assets/searchInputIcon.svg';
import { ReactComponent as ChevronDown } from '../assets/ChevronDown.svg';
import { ReactComponent as LoggedinUsers } from '../assets/LoggedinUsers.svg';
import { ReactComponent as TotalUsers } from '../assets/TotalUsers.svg';
import { ReactComponent as ActiveUsers } from '../assets/ActiveUsers.svg';
import { ReactComponent as InActiveUsers } from '../assets/InActiveUsers.svg';

import DynamicDataTable from "@langleyfoxall/react-dynamic-data-table";
import ToggleButton from './ToggleButton';
import { CSVLink, CSVDownload } from 'react-csv';
import { AiOutlineDownload } from 'react-icons/ai'
import UserImageTest from '../assets/UserImageTest.png'
import EditUser from '../pages/user_management/EditUser';

import { Switch } from "antd"

function UserList() {
	const navigate = useNavigate();

	const [isDetail, setIsDetail] = useState(0);
	const [isEdit, setIsEdit] = useState(0);

	const [users, setUsers] = useState([]);
	const [tableData, setTableData] = useState([])
	const [tableFilter, setTableFilter] = useState("")
	const [user, setUser] = useState();
	const [sortBy, setSortBy] = useState("None")
	const [sortOrder, setSortOrder] = useState("asc")

	const [loggedinUsers, setLoggedinUsers] = useState(0);
	const [noOfActiveUsers, setNoOfActiveUsers] = useState(0);
	const [noOfInActiveUsers, setNoOfInActiveUsers] = useState(0);
	const [noOfTotalUsers, setNoOfTotalUsers] = useState(0);
	const [pUsers, setPerUsers] = useState(0);
	const [tUsers, setTempUsers] = useState(0);
	const [isTemporary, setIsTemporary] = useState(false);

	const [ceo, setCeo] = useState(0);
	const [deo, setDeo] = useState(0);
	const [whm, setWhm] = useState(0);

	const [aPUsers, setAPUsers] = useState(0);
	const [aTUsers, setATUsers] = useState(0);
	const [iPUsers, setIPUsers] = useState(0);
	const [iTUsers, setITUsers] = useState(0);

	const [roles, setRoles] = useState({})

	const sortMapping = {
		"None": "status",
		"User ID": "User ID",
		"Name": "User Name",
		"Role": "newUserId",
	}


	useEffect(() => {
		// console.log(user);
		if (user) {
			// console.log(user);
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

	function editPage() {
		setIsEdit(1)
		setIsDetail(0)
	}

	useEffect(() => {
		if (users) {

			console.log({ users })


			var data = users.filter((elem) => {

				if (isTemporary) {
					const filter = "tmp";
					return (elem["userid"].slice(8, 11).toLowerCase().includes(filter));
				}
				else {
					const filter = "tmp";
					return !(elem["userid"].slice(8, 11).toLowerCase().includes(filter));
				}
			}).filter((elem) => {
				if (tableFilter === "") {
					return true;
				}
				else {
					const filter = tableFilter.toLowerCase();
					return (elem["userid"].toLowerCase().includes(filter) || elem["name"].toLowerCase().includes(filter))
				}
			}).map((val) => {
				return {
					" ": <FaCircle size='0.8em' style={{ color: val["loggedin"] ? "#008767" : "#888888" }} />,
					"User ID": val["userid"],
					"": <div style={{ borderRadius: "50%", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", paddingRight: "15px" }}>
						<img className='thimage' style={{ height: "35px", width: "35px" }} src={val["photodata"] !== '' ? val["photodata"] : UserImageTest} alt="Img" />
					</div>,
					"User Name": val["name"],
					"status": val["active"] + val["userid"],
					"newUserId": (val["userid"].slice(0, 2)).concat(val["userid"].slice(8), val["userid"].slice(2, 6), val["userid"].slice(6, 8)),
					"Phone Number": val["mobilenumber"].substring(0, 5) + " " + val["mobilenumber"].substring(5),
					"Role": val["userid"].slice(8),
					Details: val,
					Edit: <button className="modifyBtn p-2 text-white" disabled={true}>
						<FaUserEdit style={{ transform: "translateX(1px)" }} />
					</button>,
					"Status": <ToggleButton userID={val["userid"]} checked={val["active"] == 'A'} onToggle={(e) => {
						if (val["active"] == "A") {
							deactivateUser(e)
						}
						else {
							activateUser(e)
						}
					}}
					/>
				}
			})
			data.sort(function (a, b) {
				if (sortMapping[sortBy] !== null) {
					// console.log(data)
					return (a[sortMapping[sortBy]].toString()).localeCompare(b[sortMapping[sortBy]].toString())
				}
				else return 0;
			});
			if (sortMapping[sortBy] !== null && sortOrder === 'desc') {
				data.reverse();
			}

			setTableData(data)

		}
		return () => {

		}
	}, [users, tableFilter, sortBy, sortOrder, isTemporary])

	async function getUser() {

		try {
			const response = await fetch(
				`${process.env.REACT_APP_API_SERVER}/user/getSubordinateUsers`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					credentials: 'include'
				}
			);
			const tmp = await response.json();

			console.log("/user/getSubordinateUsers", tmp)
			if (tmp['message'] != "Permission Denied") {

				setLoggedinUsers(tmp["data"]["loggedin_users"]);
				setNoOfActiveUsers(tmp["data"]["active_users"]);
				setNoOfInActiveUsers(tmp["data"]["inactive_users"]);
				setNoOfTotalUsers(tmp["data"]["total_users"]);
				setUsers(tmp["data"]["users"]);


				let tUsers = 0;
				let pUsers = 0;
				let ceo = 0;
				let deo = 0;
				let whm = 0;
				let aPUsers = 0;
				let aTUsers = 0;
				let iPUsers = 0;
				let iTUsers = 0;

				let currRoles = {}

				for (const i in tmp["data"]["users"]) {
					let currId = tmp["data"]["users"][i]["userid"]
					let active = tmp["data"]["users"][i]["active"]
					let check = currId.substring(8)
					console.log(check)
					if (check[0] === "T" && check[1] === "M" && check[2] === "P") {
						tUsers = tUsers + 1
						if (active === "A") {
							aTUsers = aTUsers + 1;
						} else {
							iTUsers = iTUsers + 1;
						}
					} else {
						pUsers = pUsers + 1
						if (check === "CEO") {
							ceo = ceo + 1;
						} else if (check === "DEO") {
							deo = deo + 1;
						} else if (check === "WHM") {
							whm = whm + 1;
						}

						if (active === "A") {
							aPUsers = aPUsers + 1;
						} else {
							iPUsers = iPUsers + 1;
						}
						if (currRoles[check] === undefined) {
							currRoles[check] = [0, 0]
							if (active === "A") {
								currRoles[check] = [1, 0]
							} else {
								currRoles[check] = [0, 1]
							}
						} else {
							if (active === "A") {
								currRoles[check][0] = currRoles[check][0] + 1
							} else {
								currRoles[check][1] = currRoles[check][1] + 1
							}
						}

					}
				}
				console.log(currRoles)
				setTempUsers(tUsers)
				setPerUsers(pUsers)
				setCeo(ceo)
				setDeo(deo)
				setWhm(whm)
				setAPUsers(aPUsers)
				setATUsers(aTUsers)
				setIPUsers(iPUsers)
				setITUsers(iTUsers)
				setRoles(currRoles)
			}


		} catch (err) {
			console.log(err);
		}
	}

	useEffect(() => {
		getUser();
	}, []);

	const activateUser = async (myId) => {
		if (window.confirm(`Are you sure you want to Activate user ${myId} ?`)) {
			// let token = localStorage.getItem("token");
			// const access_token=JSON.parse(token)["access_token"];
			try {
				const response = await fetch(
					`${process.env.REACT_APP_API_SERVER}/user/ModifyUserDetails`,
					{
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						credentials: 'include',
						body: JSON.stringify({
							"userID": myId,
							"active": "A"
						})
					}
				);
				const status = response;
				if (status.status == 200) {
					alert("User Activated Successfully");
					getUser();
				}
				else {
					alert("Activation Failed");
				}
			} catch (error) {
				console.log(error)
			}
		}
	}

	const toggler = () => {

		isTemporary ? setIsTemporary(false) : setIsTemporary(true);
	}

	const deactivateUser = async (myId) => {
		if (window.confirm(`Are you sure you want to Deactivate User: ${myId} ?`)) {
			try {
				const response = await fetch(
					`${process.env.REACT_APP_API_SERVER}/user/ModifyUserDetails`,
					{
						method: "POST",
						headers: {
							"Content-Type": "application/json",

						},
						credentials: 'include',
						body: JSON.stringify({
							"userID": myId,
							"active": "I"
						})
					}
				);
				const status = response;
				if (status.status == 200) {
					alert("User Deactivated Successfully");

					getUser();
				}
				else {
					alert("Deactivation Failed");
				}
			} catch (error) {
				console.log(error)
			}
		}
	}
	// console.log(users);
	return (
		<div className="user-list-grid">
			<div className="myWrapper userList" style={{ position: "relative", height: "100%", gridArea: "1 / 1 / 6 / 3" }}>
				{isDetail == 0 && isEdit == 0 ? <div style={{ display: "flex", "flexDirection": "row", "justifyContent": "space-between" }}>
					<h4 style={{
						maxWidth: 'min-content'
					}}>Dependent Users</h4>
					<div style={{ display: "flex", "flexDirection": "row", alignItems: "center", justifyContent: "center", gap: '10px' }}>
						<div className="userTemporaryToggle">
							<span >Perm. </span>
							<Switch onClick={toggler} />
							<span >Temp. </span>
						</div>
						<button className='createUserBtn' onClick={() => {
							navigate("/session/usermanagement/createUser")
						}}>Add User</button>
						<div style={{ display: "flex", "flexDirection": "row", alignItems: "center", justifyContent: "center", background: "var(--lightGrayBG )", borderRadius: "10px", padding: "7.5px 15px 7.5px 0", fontSize: "0.85em" }}>
							<SearchInputElement style={{ margin: "0 7.5px", width: "20px" }} />
							<input type={'search'} defaultValue={tableFilter} onChange={(e) => { setTableFilter(e.target.value) }} placeholder='Search' style={{ outline: "none", background: "transparent" }} />
						</div>
						<div style={{ display: "flex", "flexDirection": "row", alignItems: "center", justifyContent: "center", background: "var(--lightGrayBG )", borderRadius: "10px", padding: "7.5px 0 7.5px 7.5px", fontSize: "0.85em", height: "40px" }}>
							<span className='SampleText' style={{ minWidth: "max-content", paddingInlineStart: "0 7.5px" }}>Sort by : &nbsp;</span>
							<select
								style={{ textAlign: "center", outline: "none", background: "transparent", padding: "0px", border: "none" }}
								onChange={(e) => setSortBy(e.target.value)}>
								<option value={"None"}>None</option>
								<option value={"User ID"}>User ID</option>
								<option value={"Name"}>Name</option>
								<option value={"Role"}>Role</option>
							</select>
							<ChevronDown />
							<button className='sortOrderButton' onClick={() => {
								setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
							}}>
								{sortOrder === 'asc' ? <AiOutlineSortAscending /> : <AiOutlineSortDescending />}
							</button>
							<CSVLink filename={"UserList.csv"} data={users}><div className="text-gray-400 text-lg m-2 py-1 px-2" title='Export To CSV'><AiOutlineDownload /></div></CSVLink>

						</div>
					</div>

				</div> : <></>}
				{isDetail == 0 && isEdit == 0 ? <DynamicDataTable className="users-table"
					rows={tableData}
					fieldsToExclude={["Details", "Edit", "status", "newUserId"]}
					orderByField={sortMapping[sortBy]}
					orderByDirection={sortOrder}
					columnWidths={{
						"": "50px"
					}}
					onClick={(event, row) => {
						details(row["Details"])
						// console.log(row)
					}}
					fieldMap={{
						"User ID": (<div className="cursor-pointer" onClick={() => { setSortBy("User ID"); if (sortOrder === 'desc') { setSortOrder("asc") } else { setSortOrder("desc") } }}>User ID</div>),
						"User Name": (<div className="cursor-pointer" onClick={() => { setSortBy("Name"); if (sortOrder === 'desc') { setSortOrder("asc") } else { setSortOrder("desc") } }}>User Name</div>),
						"Role": (<div className="cursor-pointer" onClick={() => { setSortBy("Role"); if (sortOrder === 'desc') { setSortOrder("asc") } else { setSortOrder("desc") } }}>Role</div>),
						"Phone Number": (<div className="cursor-pointer" onClick={() => { setSortBy("Role"); if (sortOrder === 'desc') { setSortOrder("asc") } else { setSortOrder("desc") } }}>Phone Number</div>),
						"Status": (<div className="cursor-pointer" onClick={() => { setSortBy("None"); if (sortOrder === 'desc') { setSortOrder("asc") } else { setSortOrder("desc") } }}>Status</div>)
					}}
					buttons={[]}
					allowOrderingBy={[
						'User ID', 'User Name', 'Role', "Status"
					]} />
					:
					<></>
				}

				{
					isDetail == 1 ? <UserDetail detail={user} close={close} editPage={editPage} />
						:
						<></>
				}

				{
					isEdit == 1 ? <EditUser userdata={user} />
						:
						<></>

				}
			</div>
			<div className='myWrapper userCount !overflow-scroll' style={{ "gridArea": "1 / 3 / 3 / 4", display: "flex", flexDirection: "column", "alignItems": "center", "justifyContent": "center" }}>
				<ul className='userStats'>
					<li>
						<div className="icon">
							<TotalUsers />
						</div>
						<div className="userStatsText">
							<span>Total Users</span>
							{/* <h3>{tableData.length.toLocaleString()}</h3> */}
							<h3>{noOfTotalUsers}</h3>
						</div>
					</li>
					<li>
						<div className="icon">
							<LoggedinUsers />
						</div>
						<div className="userStatsText">
							<span>Logged in Users</span>
							{/* <h3>{tableData.length.toLocaleString()}</h3> */}
							<h3>{loggedinUsers}</h3>
						</div>
					</li>
					<li>
						<div className="icon">
							<ActiveUsers />
						</div>
						<div className="userStatsText">
							<span>Active Users</span>
							{/* <h3>{tableData.filter((elem) => {
								return elem["Details"] && elem["Details"][7] === 'A'
							}).length.toLocaleString()}</h3> */}
							<h3>{noOfActiveUsers}</h3>
						</div>
					</li>
					<li>
						<div className="icon">
							<InActiveUsers />
						</div>
						<div className="userStatsText">
							<span>Inactive Users</span>

							<h3>{noOfInActiveUsers}</h3>
						</div>
					</li>
				</ul>
			</div>
			<div className="myWrapperDetail userSubCount overflow-y-scroll !pb-0 !mb-0 !px-8" style={{ "gridArea": "3 / 3 / 4 / 4" }}>
				<div className='' style={{height: '100%', width:'100%', display: 'flex', 'flexDirection': 'column', 'alignItems': 'center', 'justifyContent': 'center'}}>
					<div className='myparent'>
						<div className='mydiv1'>
							<h5>Users</h5>
						</div>
						<div className='mydiv2'>
							<div className='text-green-700 font-semibold'>Active</div>
						</div>
						<div className='mydiv3'>
							<div className='text-red-700 font-semibold'>Inactive</div>
						</div>
						<div className='mydiv4'>
							<h5>Permanent</h5>
						</div>
						<div className='mydiv5'>
							<div className='text-lg text-green-700'>{aPUsers}</div>
						</div>
						<div className='mydiv6'>
							<div className='text-lg text-red-700'>{iPUsers}</div>
						</div>
						<div className='mydiv7'>
							<h5>Temporary</h5>
						</div>
						<div className='mydiv8'>
							<div className='text-lg text-green-700'>{aTUsers}</div>
						</div>
						<div className='mydiv9'>
							<div className='text-lg text-red-700'>{iTUsers}</div>
						</div>


					</div>
				</div>
			</div>
			<div className="myWrapperDetail userCountRoleWise overflow-y-scroll !pb-0 !mb-0 !px-8" style={{ "gridArea": "4 / 3 / 6 / 4" }}>

				<div className='!flex pt-2 pb-4'>
					{/* <div className="icon">
							<TotalUsers />
						</div> */}
					<h4 className='flex items-center'>Role-wise (Permanent Users):</h4>
				</div>

				<div className='grid grid-cols-3'>
					<div></div>
					<div className='text-green-700 font-semibold'>Active</div>
					<div className='text-red-700 font-semibold'>Inactive</div>
				</div>
				{Object.keys(roles).map((keyName, i) => {
					return (
						<div className=''>
							<div className='grid grid-cols-3'>
								<div className=''><h5>{keyName} </h5></div>
								<div className='flex justify-center text-green-700 text-lg'>{roles[keyName][0]}</div>
								<div className='flex justify-center text-red-700 text-lg'>{roles[keyName][1]}</div>
							</div>

						</div>
					)
				})}


			</div>
		</div>

	);
}
export default UserList

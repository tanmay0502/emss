import React, { ReactComponent } from 'react'
import { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import './styles/UserList.css'
import UserDetail from './UserDetail';
import { FaUserEdit } from "react-icons/fa";
import { AiOutlineSortAscending, AiOutlineSortDescending } from "react-icons/ai";

import { useNavigate } from 'react-router-dom'
import { ReactComponent as SearchInputElement } from '../assets/searchInputIcon.svg';
import { ReactComponent as ChevronDown } from '../assets/ChevronDown.svg';
import { ReactComponent as TotalUsers } from '../assets/TotalUsers.svg';
import { ReactComponent as ActiveUsers } from '../assets/ActiveUsers.svg';
import { ReactComponent as InActiveUsers } from '../assets/InActiveUsers.svg';

import DynamicDataTable from "@langleyfoxall/react-dynamic-data-table";
import ToggleButton from './ToggleButton';

import UserImageTest from '../assets/UserImageTest.png'
import EditUser from '../pages/user_management/EditUser';

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

	const [noOfActiveUsers, setNoOfActiveUsers] = useState(0);
	const [noOfInActiveUsers, setNoOfInActiveUsers] = useState(0);
	const [noOfTotalUsers, setNoOfTotalUsers] = useState(0);
	const [currImage, setCurrImage] = useState("");

	const sortMapping = {
		"None": null,
		"User ID": "User ID",
		"Name": "User Name",
		"Role": "Role",
	}


	useEffect(() => {
		console.log(user);
		if (user) {
			console.log(user);
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
				
				if (tableFilter === "") {
					return true;
				}
				else {
					const filter = tableFilter.toLowerCase();
					return (elem["userid"].toLowerCase().includes(filter) || elem["name"].toLowerCase().includes(filter))
				}
			}).map((val) => {
				console.log(val["photodata"])
				return {
					"User ID": val["userid"],
					"": <div  style={{borderRadius: "50%", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", paddingRight: "15px" }}>
						<img className='thimage' style={{ height: "35px", width: "35px" }} src={val["photodata"] !== '' ? val["photodata"]: UserImageTest} alt="Img"/>
						</div>,
					"User Name": val["name"],
					"Phone Number": val["mobilenumber"].substring(0, 3) + " " + val["mobilenumber"].substring(3, 6) + " " + val["mobilenumber"].substring(6),
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
					}} />
				}
			})

			setTableData(data)

		}
		return () => {

		}
	}, [users, tableFilter, sortBy, sortOrder])

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


			console.log({ tmp })

			setNoOfActiveUsers(tmp["active_users"]);
			setNoOfInActiveUsers(tmp["inactive_users"]);
			setNoOfTotalUsers(tmp["total_users"]);
			setUsers(tmp["users"]);

		} catch (err) {
			console.log(err);
		}
	}

	useEffect(() => {
		console.log("Use Effect Here")
		getUser();
		// getCurrImage("TS657000DEO")
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
			<div className="myWrapper" style={{ position: "relative", height: "100%", gridArea: "1 / 1 / 6 / 2" }}>

				{isDetail == 0 && isEdit == 0 ? <div style={{ display: "flex", "flexDirection": "row", "justifyContent": "space-between" }}>
					<h4>Dependent Users</h4>
					<div style={{ display: "flex", "flexDirection": "row", alignItems: "center", justifyContent: "center" }}>
						<button className='createUserBtn' onClick={() => {
							navigate("/session/usermanagement/createUser")
						}}>Create User</button>
						<div style={{ display: "flex", "flexDirection": "row", alignItems: "center", justifyContent: "center", background: "var(--lightGrayBG )", borderRadius: "10px", padding: "7.5px 15px 7.5px 0", fontSize: "0.8em" }}>
							<SearchInputElement style={{ margin: "0 7.5px", width: "20px" }} />
							<input type={'search'} defaultValue={tableFilter} onChange={(e) => { setTableFilter(e.target.value) }} placeholder='Search' style={{ outline: "none", background: "transparent" }} />
						</div>
						<div style={{ display: "flex", "flexDirection": "row", alignItems: "center", justifyContent: "center", marginLeft: "10px", background: "var(--lightGrayBG )", borderRadius: "10px", padding: "7.5px 15px 7.5px 0", fontSize: "0.8em" }}>
							<span className='SampleText' style={{ minWidth: "max-content", paddingInlineStart: "7.5px" }}>Sort by : &nbsp;</span>
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
						</div>
					</div>

				</div> : <></>}
				{isDetail == 0 && isEdit == 0 ? <DynamicDataTable className="users-table"
					rows={tableData}
					fieldsToExclude={["Details", "Edit"]}
					orderByField={sortMapping[sortBy]}
					orderByDirection={sortOrder}
					columnWidths={{
						"": "50px"
					}}
					onClick={(event, row) => {
						details(row["Details"])
						// console.log(row)
					}}
					buttons={[]}
					allowOrderingBy={[
						'User ID', 'User Name', 'Role'
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
			<div className='myWrapper' style={{ "gridArea": "1 / 2 / 3 / 3", display: "flex", flexDirection: "column", "alignItems": "center", "justifyContent": "center" }}>
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
export default UserList

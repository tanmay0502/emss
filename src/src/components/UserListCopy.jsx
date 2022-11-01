import React, { ReactComponent } from 'react'
import { useState, useEffect } from "react";
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

function UserList() {
	const navigate = useNavigate();

	const [isDetail, setIsDetail] = useState(0);

	const [users, setUsers] = useState([]);
	const [tableData, setTableData] = useState([])
	const [tableFilter, setTableFilter] = useState("")
	const [user, setUser] = useState();
	const [sortBy, setSortBy] = useState("None")
	const [sortOrder, setSortOrder] = useState("asc")

	const sortMapping = {
		"None" : null,
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

	useEffect(() => {
		var data = users.filter((elem) => {
			if (tableFilter === "") {
				return true;
			}
			else {
				const filter = tableFilter.toLowerCase();
				// console.log(elem[2])
				// return true
				return (elem[0].toLowerCase().includes(filter) || elem[2].toLowerCase().includes(filter))
			}
		}).map((val) => {
			return {
				"User ID": val[0],
				"": <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", paddingRight: "15px" }}><img src={UserImageTest} /></div>,
				"User Name": val[2],
				"Phone Number": val[3].substring(0, 3) + " " + val[3].substring(3, 6) + " " + val[3].substring(6),
				"Role": val[0].slice(7),
				Details: val,
				Edit: <button className="modifyBtn p-2 text-white" disabled={true}>
					<FaUserEdit style={{ transform: "translateX(1px)" }} />
				</button>,
				"Status": <ToggleButton userID={val[0]} checked={val[7] === 'A'} onToggle={(e) => {
					if (val[7] == "A") {
						deactivateUser(e)
					}
					else {
						activateUser(e)
					}
				}} />
			}
		})
		data.sort(function(a, b){ 
			if(sortMapping[sortBy] !== null){
				return a[sortMapping[sortBy]].localeCompare(b[sortMapping[sortBy]]) 
			}
			else return 0;
		});
		if(sortMapping[sortBy] !== null && sortOrder === 'desc'){
			data.reverse();
		}
		// console.log(data)

		setTableData(data)
		return () => {

		}
	}, [users, tableFilter, sortBy, sortOrder])


	async function getUser() {
		try {
			const response = await fetch(
				"http://evm.iitbhilai.ac.in:8100/user/listAllUsers",
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
					mode: "cors"
				}
			);
			const data2 = await response.json();
			// console.log(data2);
			setUsers(data2["data"]);
		} catch (err) {
			console.log(err);
		}
	}
	// getUser();
	useEffect(() => {
		getUser();
	}, []);

	const activateUser = async (myId) => {
		if (window.confirm(`Are you sure you want to Activate user ${myId} ?`)) {
			try {
				const response = await fetch(
					`http://evm.iitbhilai.ac.in:8100/user/activateUser`,
					{
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({
							"userID": myId
						})
					}
				);
				const status = response;
				if (status.status == 200) {
					alert("User Activated Successfully");
					// window.location.href = '/session/usermanagement';
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
		if (window.confirm(`Are you sure you want to Dectivate user ${myId} ?`)) {
			try {
				const response = await fetch(
					`http://evm.iitbhilai.ac.in:8100/user/deactivateUser`,
					{
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({
							"userID": myId
						})
					}
				);
				const status = response;
				if (status.status == 200) {
					alert("User Deactivated Successfully");
					// window.location.href = '/session/usermanagement';
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
				{isDetail == 0 ? <div style={{ display: "flex", "flexDirection": "row", "justifyContent": "space-between" }}>
					<h4>Users</h4>
					<div style={{ display: "flex", "flexDirection": "row", alignItems: "center", justifyContent: "center" }}>
						<button className='createUserBtn' onClick={() => {
							navigate("/session/usermanagement/createUser")
						}}>Create User</button>
						<div style={{ display: "flex", "flexDirection": "row", alignItems: "center", justifyContent: "center", background: "var(--lightGrayBG )" , borderRadius: "10px", padding: "7.5px 15px 7.5px 0", fontSize: "0.8em" }}>
							<SearchInputElement style={{ margin: "0 7.5px", width: "20px" }} />
							<input type={'search'} defaultValue={tableFilter} onChange={(e) => { setTableFilter(e.target.value) }} placeholder='Search' style={{ outline: "none", background: "transparent" }} />
						</div>
						<div style={{ display: "flex", "flexDirection": "row", alignItems: "center", justifyContent: "center", marginLeft: "10px", background: "var(--lightGrayBG )", borderRadius: "10px", padding: "7.5px 15px 7.5px 0", fontSize: "0.8em" }}>
							<span className='SampleText' style={{ minWidth: "max-content", paddingInlineStart: "7.5px" }}>Sort by : &nbsp;</span>
							<select 
							style={{ textAlign: "center", outline: "none", background: "transparent", padding: "0px", border: "none" }}
							onChange={(e)=>setSortBy(e.target.value)}>
								<option value={"None"}>None</option>
								<option value={"User ID"}>User ID</option>
								<option value={"Name"}>Name</option>
								<option value={"Role"}>Role</option>
							</select>
							<ChevronDown />
							<button className='sortOrderButton' onClick={()=>{
								setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
							}}>
								{sortOrder === 'asc' ? <AiOutlineSortAscending /> : <AiOutlineSortDescending />}
							</button>
						</div>
					</div>

				</div> : <></>}
				{isDetail == 0 ? <DynamicDataTable className="users-table"
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
					<UserDetail detail={user} close={close} />
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
							<h3>{tableData.length.toLocaleString()}</h3>
						</div>
					</li>
					<li>
						<div className="icon">
							<ActiveUsers />
						</div>
						<div className="userStatsText">
							<span>Active Users</span>
							<h3>{tableData.filter((elem) => {
								return elem["Details"] && elem["Details"][7] === 'A'
							}).length.toLocaleString()}</h3>
						</div>
					</li>
					<li>
						<div className="icon">
							<InActiveUsers />
						</div>
						<div className="userStatsText">
							<span>Inactive Users</span>
							<h3>{tableData.filter((elem) => {
								return elem["Details"] && elem["Details"][7] !== 'A'
							}).length.toLocaleString()}</h3>
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
		// <div className="">
		//   <div className="myIconLabels">
		//     <ul>
		//       <li><FaCircle className="activeCircle" /> <span>Active User</span></li>
		//       <li><FaCircle className="inactiveCircle" /> <span>Inactive User</span></li>
		//     </ul>
		//   </div>
		//   {isDetail == 1 && <UserDetail detail={user} close={close} />}
		//   {isDetail == 0 && (
		//     <>
		//       <div className="table-container">
		//         <table className="table-columns-header">
		//           <thead>
		//             <tr
		//               style={{
		//                 background: "var(--background-gray)",
		//                 borderRadius: "var(--border-radius)",
		//               }}
		//             >
		//               <th>Active</th>
		//               <th>User ID</th>
		//               <th>User Name</th>
		//               <th>User Profile</th>
		//               <th>Modify</th>
		//               <th>Activate/Deactivate</th>
		//             </tr>
		//           </thead>
		//           <tbody className="table-content">
		//             {users.length > 0 &&
		//               users.map((value) => (
		//                 <tr>
		//                   <td className="text-black text-sm">
		//                     <center>{value[7] == "A" ? <FaCircle className="activeCircle" /> : <FaCircle className="inactiveCircle" />}</center>
		//                   </td>
		//                   <td className="text-black text-sm">{value[0]}</td>
		//                   <td className="text-black text-sm">{value[2]}</td>
		//                   <td>
		//                     <button
		//                       className="userDetailsBtn p-2 text-white"
		//                       onClick={(e) => {
		//                         details(value);
		//                       }}
		//                     >
		//                       <FaUserAlt />
		//                     </button>
		//                   </td>
		//                   <td className="text-black text-sm">
		//                     <button className="modifyBtn p-2 text-white" disabled={true}>
		//                       <FaUserEdit style={{ transform: "translateX(1px)" }} />
		//                     </button>
		//                   </td>
		//                   <td>
		//                     <ToggleSwitch key={value[0]}
		//                       warehouseID={value[0]}
		//                       label={value[7] == "A" ? "Deactivate" : "Activate"}
		//                       checked={value[7] == "A"}
		//                       onToggle={(e) => {
		//                         if (value[7] == "A") {
		//                           deactivateUser(e)
		//                         }
		//                         else {
		//                           activateUser(e)
		//                         }
		//                       }
		//                       }
		//                     />
		//                   </td>
		//                 </tr>
		//               ))}
		//           </tbody>
		//         </table>
		//       </div>
		//       <div className="w-full flex justify-end mt-2">
		//         <button
		//           onClick={() => {
		//             window.location.pathname = "/session/usermanagement/createUser";
		//           }}
		//         >
		//           Add User
		//         </button>
		//       </div>
		//     </>
		//   )}
		// </div>
	);
}
export default UserList

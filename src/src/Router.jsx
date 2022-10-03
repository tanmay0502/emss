import React from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'

import ECIIcon from './assets/eci_logo.png';
import { ReactComponent as DashboardIcon } from './assets/Dashboard.svg';
import { ReactComponent as UserManagementIcon } from './assets/Users.svg';
import { ReactComponent as OrderManagementIcon } from './assets/Order.svg';
import { ReactComponent as UnitManagementIcon } from './assets/UnitManagement.svg';
import { ReactComponent as WarehouseManagementIcon } from './assets/WarehouseManagement.svg';
import { ReactComponent as IssueRequestManagementIcon } from './assets/Issue-RequestManagement.svg';
import { ReactComponent as OtherServicesIcon } from './assets/OtherServices.svg';
import { ReactComponent as MessagesIcon } from './assets/Messages.svg';
import { ReactComponent as DownloadsIcon } from './assets/Downloads.svg';
import { ReactComponent as ChevronRight } from './assets/chevron-right.svg';
import { useState, useEffect } from 'react';

import './sidebar.css';
import './Navbar.css'

function Routed(props) {
	const navigate = useNavigate()
	const location = useLocation()

	const [userData, setUserData] = useState({
		username: null
	})

	const getNav = () => {
		switch (location.pathname) {
			case '/session/home':
				return (<>
					<DashboardIcon />
					<span>Dashboard</span>
				</>);
			case '/session/usermanagement':
				return (<>
					<UserManagementIcon />
					<span>User Management</span>
				</>);
			case '/session/usermanagement/createUser':
				return (<>
					<UserManagementIcon />
					<span>Create New User</span>
				</>);
			case '/session/warehousemanagement':
				return (<>
					<WarehouseManagementIcon />
					<span>Warehouse Management</span>
				</>);
			case '/session/warehousemanagement/addwarehouse':
				return (<>
					<WarehouseManagementIcon />
					<span>Create New Warehouse</span>
				</>);
			default:
				if(location.pathname.startsWith('/session/warehousemanagement/warehousedetails')){
					return (<>
						<WarehouseManagementIcon />
						<span>Warehouse Details</span>
					</>);
				}
				return <></>;
		}
	}

	const fetchUserData = async (userid) => {
		const response = await fetch(
			`http://evm.iitbhilai.ac.in:8100/usermgt/getNameFromUserID/${userid}`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
				mode: "cors"

			}
		);
		return await response.json().then(val => val.name);
	}

	useEffect(() => {
		if (sessionStorage.getItem('sessionToken') === null) {
			window.location.href = '/login'
		}

		fetchUserData(sessionStorage.getItem('sessionToken')).then((val) => {
			setUserData({
				userId: sessionStorage.getItem('sessionToken'),
				username: val
			})
		})
		return () => {

		}
	}, [])

	// const [randomState, setRandomState] = useState(Math.random())

	// useEffect(() => {
	//   setRandomState(Math.random())
	//   console.log("Here!!")
	//   return () => {

	//   }
	// }, [location])


	return (
		<div className="App">
			<main>
				<div className="nav-panel">
					<div className="nav-panel-top">
						<div className='app-info'>
							<img className='App-Icon' src={ECIIcon} />
							EVM Management System
						</div>
						{/* <span>Welcome, {userData.username}</span> */}
						<button className={window.location.pathname.startsWith("/session/home") ? 'nav-button active' : 'nav-button'} onClick={() => {
							navigate("/session/home")
						}}>
							<div>
								<DashboardIcon />Dashboard
							</div>
							<ChevronRight className="chevron" />
						</button>
						<button className={window.location.pathname.startsWith("/session/usermanagement") ? 'nav-button active' : 'nav-button'} onClick={() => {
							navigate("/session/usermanagement")
						}}>
							<div><UserManagementIcon />User</div>
							<ChevronRight className="chevron" />
						</button>
						<button className={window.location.pathname.startsWith("/session/unitmanagement") ? 'nav-button active' : 'nav-button'}>
							<div><UnitManagementIcon />Unit</div>
							<ChevronRight className="chevron" />
						</button>
						<button className={window.location.pathname.startsWith("/session/ordermanagement") ? 'nav-button active' : 'nav-button'}>
							<div><OrderManagementIcon />Order</div>
							<ChevronRight className="chevron" />
						</button>
						<button className={window.location.pathname.startsWith("/session/warehousemanagement") ? 'nav-button active' : 'nav-button'} onClick={() => {
							navigate("/session/warehousemanagement")
						}}>
							<div><WarehouseManagementIcon />Warehouse</div>
							<ChevronRight className="chevron" />
						</button>
						<button className={window.location.pathname.startsWith("/session/issuemanagement") ? 'nav-button active' : 'nav-button'}>
							<div><IssueRequestManagementIcon />Issue/Request</div>
							<ChevronRight className="chevron" />
						</button>
						<button className={window.location.pathname.startsWith("/session/messages") ? 'nav-button active' : 'nav-button'}>
							<div><MessagesIcon />Messages</div>
							<ChevronRight className="chevron" />
						</button>
						<button className={window.location.pathname.startsWith("/session/downloads") ? 'nav-button active' : 'nav-button'}>
							<div><DownloadsIcon />Downloads</div>
							<ChevronRight className="chevron" />
						</button>
						<button className={window.location.pathname.startsWith("/session/otherservices") ? 'nav-button active' : 'nav-button'}>
							<div><OtherServicesIcon />Others</div>
							<ChevronRight className="chevron" />
						</button>
					</div>
					{/* <div className="nav-panel-bottom">
						<button className={window.location.pathname.startsWith("/session/home") ? 'nav-button active' : 'nav-button'} onClick={() => {
							sessionStorage.removeItem('sessionToken')
							window.location.href = '/'
						}}>
							<LogoutIcon />Logout
						</button>
					</div> */}
				</div>
				<div className="content-area">
					<div className='divnav'>
						<div className="nav-left">
							{ getNav() }
						</div>
						<div className="nav-right">
							<div className="userImage">

							</div>
							<div style={{display: "flex", "flexDirection": "column", alignItems: "center", "justifyContent": "center"}}>
								<span>Position: {userData.userId ? userData.userId.slice(7) : ""} <ChevronRight style={{transform: "rotateZ(90deg)", maxWidth: "1.2em", marginLeft: "10px"}} /></span>
								<span>{userData.username}</span>
							</div>
						</div>
					</div>
					<div className="content">
						<Outlet />
					</div>
				</div>
			</main>
		</div>
	)
}

export default Routed
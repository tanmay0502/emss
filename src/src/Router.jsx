import React from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'

import ECIIcon from './assets/eci_logo.png';
import { ReactComponent as DashboardIcon } from './assets/Dashboard.svg';
import { ReactComponent as UserManagementIcon } from './assets/Users.svg';
// import { ReactComponent as OrderManagementIcon } from './assets/Order.svg';
import { ReactComponent as UnitManagementIcon } from './assets/UnitManagement.svg';
import { ReactComponent as WarehouseManagementIcon } from './assets/WarehouseManagement.svg';
import { ReactComponent as IssueRequestManagementIcon } from './assets/Issue-RequestManagement.svg';
import { ReactComponent as OrderManagementIcon } from './assets/OrderManagement.svg';
import { ReactComponent as OtherServicesIcon } from './assets/OtherServices.svg';
import { ReactComponent as MessagesIcon } from './assets/jam_messages.svg';
import { ReactComponent as DownloadsIcon } from './assets/Downloads.svg';
import { ReactComponent as ChevronRight } from './assets/chevron-right.svg';
import { ReactComponent as ServicesIcon } from './assets/ser.svg';
import {ReactComponent as ReportIcon} from './assets/carbon_report.svg';
import Switch from "react-switch";
import { useState, useEffect } from 'react';
import './sidebar.css';
import './Navbar.css'

function Routed(props) {

	// const [profileView,setProfileView]=useState(0);
	// const [profileOption,setProfileOption]=useState(0);

	const [userData, setUserData] = useState({
		username: null
	})
	const theme = () => {
		var r = document.querySelector(':root');
		r.style.setProperty('--light', 'white');
		r.style.setProperty('--background-gray','black');
	  }
	// theme();

	// function viewProfile(){
	// 	if(profileView==0){
	// 		setProfileOption(0);
	// 	}
	// 	setProfileView(profileView^1);	
	// }

	// function optionForProfile(){
	// 	setProfileOption(profileOption^1);
	// }

	function logOut() {
		sessionStorage.setItem("sessionToken", null);
		props.SetSession(null)
		setUserData(null)		
		localStorage.setItem("token",null);
		window.location.replace("/login");
	}
	// getUser();
	//   useEffect(() => {
	// getUser();
	//   }, [userData]);

	const navigate = useNavigate()
	const location = useLocation()

	const [checked,setChecked] = useState(false);
	

	const handleChange = () => {
			setChecked(!checked)
			var r = document.querySelector(':root');
			if(!checked){ //Dark
				r.style.setProperty('--light', 'white');
				r.style.setProperty('--background-gray','#101125');
				r.style.setProperty('--background-secondary','rgb(25, 25, 39)');
				r.style.setProperty('--foreground-primary','#FFFFFF');
				r.style.setProperty('--trans','rgb(25, 25, 39)');
				r.style.setProperty('--second','#FFFFFF');
				r.style.setProperty('--border','#FFFFFF');
				r.style.setProperty('--dashed','#FFFFFF');
				r.style.setProperty('--table-header-light','#FFFFFF');
				r.style.setProperty('--lightGrayBG','transparent');


			}
			else{ //Light
				r.style.setProperty('--light', 'rgba(0, 0, 0, 0.4)');
				r.style.setProperty('--background-gray','#F9F9F9');
				r.style.setProperty('--background-secondary','#FFFFFF');
				r.style.setProperty('--foreground-primary','rgb(25, 25, 39)');
				r.style.setProperty('--trans','#F8F8F8');
				r.style.setProperty('--second','rgba(0, 0, 0, 0.5)');
				r.style.setProperty('--border','rgba(0, 0, 0, 0.1)');
				r.style.setProperty('--dashed','rgba(0, 0, 0, 0.28)');
				r.style.setProperty('--table-header-light','#B5B7C0');
				r.style.setProperty('--lightGrayBG','#F9FBFF');

			}
	}
	const getNav = () => {
		if (location.pathname.startsWith('/session/home')) {
			return (<>
				<DashboardIcon />
				<span>Dashboard</span>
			</>);
		}
		if (location.pathname.startsWith('/session/warehousemanagement')) {
			return (<>
				<WarehouseManagementIcon />
				<span>Warehouse Management</span>
			</>);
		}
		if (location.pathname.startsWith('/session/usermanagement')) {
			return (<>
				<UserManagementIcon />
				<span>User Management</span>
			</>);
		}
		if (location.pathname.startsWith('/session/user-profile')) {
			return (<>
				<UserManagementIcon />
				<span>User Profile</span>
			</>);
		}
		if (location.pathname.startsWith('/session/issuemanagement')) {
			return (<>
				<IssueRequestManagementIcon />
				<span>Issue/Request Management</span>
			</>);
		}
		if (location.pathname.startsWith('/session/ordermanagement')) {
			return (<>
				<OrderManagementIcon />
				<span>Order Management</span>
			</>);
		}
		return <></>;
	}

	const fetchUserData = async (userid) => {
		const response = await fetch(
			`http://evm.iitbhilai.ac.in:8100/user/getNameFromUserID/${userid}`,
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
		console.log(sessionStorage.getItem('sessionToken'))
		const flag = sessionStorage.getItem('sessionToken');
		sessionStorage.setItem("log", null);
		console.log(flag, null)
		if (flag === sessionStorage.getItem("log") || flag === null) {
			console.log(flag)

			window.location.href = '/login'

		}

		setUserData({
			userId: sessionStorage.getItem('sessionToken')
		})

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
						<button className={window.location.pathname.startsWith("/session/ordermanagement") ? 'nav-button active' : 'nav-button'} onClick={() => {
							navigate("/session/ordermanagement")
						}} >
							<div><OrderManagementIcon />Order</div>
							<ChevronRight className="chevron" />
						</button>
						<button className={window.location.pathname.startsWith("/session/warehousemanagement") ? 'nav-button active' : 'nav-button'} onClick={() => {
							navigate("/session/warehousemanagement")
						}}>
							<div><WarehouseManagementIcon />Warehouse</div>
							<ChevronRight className="chevron" />
						</button>



						<button className={window.location.pathname.startsWith("/session/issuemanagement") ? 'nav-button active' : 'nav-button'} onClick={() =>{
							navigate("/session/issuemanagement")
						}}>
							<div><IssueRequestManagementIcon />Issue/Request</div>
							<ChevronRight className="chevron" />
						</button>

						
						<button className={window.location.pathname.startsWith("/session/services") ? 'nav-button active' : 'nav-button'} onClick={() => {
							navigate("/session/services")
						}}>
							<div><ServicesIcon />Other Services</div>
							<ChevronRight className="chevron" />
						</button>

						<div className="horz_line">
							
						</div>

						<button className={window.location.pathname.startsWith("/session/messages") ? 'nav-button active' : 'nav-button'}>
							<div className='filler'><MessagesIcon />Messages</div>
							<ChevronRight className="chevron" />
						</button>
						<button className={window.location.pathname.startsWith("/session/downloads") ? 'nav-button active' : 'nav-button'}>
							<div><DownloadsIcon />Downloads</div>
							<ChevronRight className="chevron" />
						</button>

						<button className={window.location.pathname.startsWith("/session/downloads") ? 'nav-button active' : 'nav-button'}>
							<div><ReportIcon />Report</div>
							<ChevronRight className="chevron" />
						</button>


						<button className={window.location.pathname.startsWith("/session/otherservices") ? 'nav-button active' : 'nav-button'}>
							<div><OtherServicesIcon />Others</div>
							<ChevronRight className="chevron" />
						</button>

						<div className="myToggle">
							<span>Dark Mode</span>
							<Switch onChange={handleChange} checked={checked} onColor="#F56A3F" uncheckedIcon={false}
            checkedIcon={false} />
						</div>
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
				<div className="content-area ">
					<div className='divnav'>
						<div className="nav-left">
							{getNav()}
						</div>
						<div className="nav-right">
							<div className="userImage">

							</div>
							<div style={{ display: "flex", "flexDirection": "column", alignItems: "center", "justifyContent": "center", overflowY: "visible", maxHeight: "100%" }}>
								<span tyle={{ position: "relative" }}>Position: {userData.userId ? userData.userId.slice(7) : ""}
									<button3 tabIndex={1} className="navBarDropDownBtn" style={{ position: "relative", overflowY: "visible" }} onClick={() => {
										console.log("Helloo!")
										document.getElementsByClassName('navBarDropDownBtn')[0].focus()
									}}>
										<ChevronRight style={{ transform: "rotateZ(90deg)", maxWidth: "1.2em", marginLeft: "10px" }} />
										<div id='nav-bar-drop-down' className='navBarDropDown absolute top-12 right-6 rounded-full' style={{ width: "160px", zIndex: "999", "overflow": 'hidden' }}>
											<button className="text-white cursor-pointer w-full p-3   rounded-sm" style={{ backgroundColor: "#84587C" }} onClick={() => {
												navigate('/session/user-profile')
											}} >My Profile</button>
											<hr />
											<button className='text-white cursor-pointer   w-full p-3   rounded-sm' onClick={logOut} style={{ backgroundColor: "#84587C" }}>
												Log Out
											</button>
										</div>
									</button3>
								</span>
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
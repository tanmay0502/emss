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
import Profile from './components/Profile';

function Routed(props) {

	const [profileView,setProfileView]=useState(0);
	const [profileDetail,setProfileDetail]=useState([]);
	const [userData, setUserData] = useState({
		username: null
	})

	function viewProfile(){
		setProfileView(profileView^1);
	}


	async function getUser() {
		try {
		  const response = await fetch(
			"http://evm.iitbhilai.ac.in:8100/usermgt/listAllUsers",
			{
			  method: "GET",
			  headers: {
				"Content-Type": "application/json",
			  },
			  mode: "cors"
			}
		  );
		  const data2 = await response.json();
		  console.log(data2);
		  if(data2["data"]!=undefined){
			console.log("helo")
				for(let i=0;i<data2["data"].length;i++){
					// console.log(data2["data"][i][0],userData.userId)
					if(data2["data"][i][0]==userData.userId){
						setProfileDetail(data2["data"][i]);
						// console.log(data2["data"][i])
						break;
					}
				}
		  }
		} catch (err) {
		  console.log(err);
		}
	  }
	  // getUser();
	  useEffect(() => {
		getUser();
	  }, [userData]);

	const navigate = useNavigate()
	const location = useLocation()

	

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
		return <></>;
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
				<div className="content-area ">
					<div className='divnav'>
						<div className="nav-left">
							{getNav()}
						</div>
						<div className="nav-right">
							<div className="userImage">

							</div>
							<div style={{ display: "flex", "flexDirection": "column", alignItems: "center", "justifyContent": "center" }}>
								<span>Position: {userData.userId ? userData.userId.slice(0) : ""}<button3 onClick={viewProfile}> <ChevronRight style={{ transform: "rotateZ(90deg)", maxWidth: "1.2em", marginLeft: "10px" }} /></button3></span>
								<span>{userData.username}</span>
							</div>
						</div>
					</div>
					<div className="content">
						<Outlet />
						{profileView==1 && (<div className=' absolute top-16 right-6 z-50' style={{width:"45%"}}><Profile detail={profileDetail} /></div>)}
					</div>
					
					
				</div>
			</main>
		</div>
	)
}

export default Routed
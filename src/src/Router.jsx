import React from 'react'
import { Outlet, useNavigate, useLocation, useOutlet } from 'react-router-dom'
import UserImageTest from './assets/UserImageTest.png'
import ECIIcon from './assets/eci_logo.png';
import { ReactComponent as DashboardIcon } from './assets/Dashboard.svg';
import { ReactComponent as UserManagementIcon } from './assets/Users.svg';
import { ReactComponent as UnitManagementIcon } from './assets/UnitManagement.svg';
import { ReactComponent as WarehouseManagementIcon } from './assets/WarehouseManagement.svg';
import { ReactComponent as IssueRequestManagementIcon } from './assets/Issue-RequestManagement.svg';
import { ReactComponent as OrderManagementIcon } from './assets/OrderManagement.svg';
import { ReactComponent as OtherServicesIcon } from './assets/OtherServices.svg';
import { ReactComponent as MessagesIcon } from './assets/jam_messages.svg';
import { ReactComponent as DownloadsIcon } from './assets/Downloads.svg';
import { ReactComponent as ChevronRight } from './assets/chevron-right.svg';
import { ReactComponent as ServicesIcon } from './assets/ser.svg';
import { ReactComponent as ReportIcon } from './assets/carbon_report.svg';
import { ReactComponent as PermissionIcon } from './assets/permission.svg';
import Switch from "react-switch";
import { useState, useEffect } from 'react';
import './sidebar.css';
import './Navbar.css'
// import Invent from './assets/invent.png'
import { ReactComponent as Invent} from './assets/invent.svg'
import { ReactComponent as Manuals} from './assets/manuals.svg'

function Routed(props) {

	// const [profileView,setProfileView]=useState(0);
	// const [profileOption,setProfileOption]=useState(0);

	const outlet = useOutlet();

	const [userData, setUserData] = useState({
		username: null
	})

	function logOut() {
		const response = fetch(
			`${process.env.REACT_APP_API_SERVER}/user/UserLogout`,
			{
			  method: "POST",
			  credentials: 'same-origin',
			  headers: {
				"Content-Type": "application/json",
			  },
			  credentials:'include'
			}
		  );
		sessionStorage.removeItem("sessionToken", null);
		props.SetSession(null)
		setUserData(null)
		// localStorage.setItem("token", null);
		window.location.replace("/login");
	}

	const navigate = useNavigate()
	const location = useLocation()

	const [checked, setChecked] = useState(false);


	const handleChange = () => {
		setChecked(!checked)
		var r = document.querySelector(':root');
		if (!checked) { //Dark
			r.style.setProperty('--light', 'white');
			r.style.setProperty('--background-gray', '#101125');
			r.style.setProperty('--background-secondary', 'rgb(25, 25, 39)');
			r.style.setProperty('--foreground-primary', '#FFFFFF');
			r.style.setProperty('--trans', 'rgb(25, 25, 39)');
			r.style.setProperty('--second', '#FFFFFF');
			r.style.setProperty('--border', '#FFFFFF');
			r.style.setProperty('--dashed', '#FFFFFF');
			r.style.setProperty('--table-header-light', '#FFFFFF');
			r.style.setProperty('--lightGrayBG', 'transparent');


		}
		else { //Light
			r.style.setProperty('--light', 'rgba(0, 0, 0, 0.4)');
			r.style.setProperty('--background-gray', '#F9F9F9');
			r.style.setProperty('--background-secondary', '#FFFFFF');
			r.style.setProperty('--foreground-primary', 'rgb(25, 25, 39)');
			r.style.setProperty('--trans', '#F8F8F8');
			r.style.setProperty('--second', 'rgba(0, 0, 0, 0.5)');
			r.style.setProperty('--border', 'rgba(0, 0, 0, 0.1)');
			r.style.setProperty('--dashed', 'rgba(0, 0, 0, 0.28)');
			r.style.setProperty('--table-header-light', '#B5B7C0');
			r.style.setProperty('--lightGrayBG', '#F9FBFF');

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
		if (location.pathname === '/session/unitmanagement') {
			return (<>
				<UnitManagementIcon />
				<span>Unit Management</span>
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
		if (location.pathname === '/session/unitmanagement') {
			return (<>
				<UnitManagementIcon />
				<span>Unit Management</span>
			</>);
		}
		if (location.pathname === '/session/unitmanagement/election_scheduling' || location.pathname === '/session/unitmanagement/schedule_list' || location.pathname.startsWith('/session/unitmanagement/edit_election')) {
			return (<>
				<UnitManagementIcon />
				<span>Election Scheduling</span>
			</>);
		}
		if (location.pathname === '/session/unitmanagement/schedule_flc' || location.pathname === '/session/unitmanagement/flc_list' || location.pathname.startsWith('/session/unitmanagement/editFlc') || location.pathname.startsWith('/session/unitmanagement/announce_flc')) {
			return (<>
				<UnitManagementIcon />
				<span>FLC Scheduling</span>
			</>);
		}
		if (location.pathname === '/session/unitmanagement/schedule_varification_list' || location.pathname === '/session/unitmanagement/varification_scheduling') {
			return (<>
				<UnitManagementIcon />
				<span>Physical Verification</span>
			</>);
		}
		if (location.pathname === '/session/unitmanagement/schedule_tna_list' || location.pathname === '/session/unitmanagement/tna_scheduling' || location.pathname.startsWith('/session/unitmanagement/edit_tna')) {
			return (<>
				<UnitManagementIcon />
				<span>TnA Scheduling</span>
			</>);
		}
		
		if (location.pathname.startsWith('/session/unitmanagement/first_randomisation_scheduling')) {
			return (<>
				<UnitManagementIcon />
				<span>Schedule 1st Randomisation</span>
			</>);
		}
		if (location.pathname.startsWith('/session/unitmanagement/second_randomisation_scheduling')) {
			return (<>
				<UnitManagementIcon />
				<span>Schedule 2nd Randomisation</span>
			</>);

			
		}
		if (location.pathname.startsWith('/session/viewpermissions')) {
			return (<>
				{/* <UnitManagementIcon /> */}
				<span>Permissions</span>
			</>);
		}
		if (location.pathname.startsWith('/session/setroles')) {
			return (<>
				{/* <UnitManagementIcon /> */}
				<span>Role Managenet</span>
			</>);
		}

		return <></>;
	}
	useEffect(() => {
		if (outlet.key && !sessionStorage.getItem('sessionToken')) {
			// console.log(outlet)
			window.location.href = '/login'
		}

		setUserData({
			userId: sessionStorage.getItem('sessionToken')
		})
		return () => {

		}
	}, [])

	const [currImage, setCurrImage] = useState(0)
    async function getCurrImage(id) {
        try {
            const response = await fetch(
                `${process.env.REACT_APP_API_SERVER}/user/getProfilePicture`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: 'include',
                    body: JSON.stringify({
                      "userID": id
                    }),
                    // mode: "cors"
                }
                
            );
            const data = await response.json();
            if (response.status === 200) {
                if(data["data"] !== undefined){
                  setCurrImage(data["data"])
                }else{
                  setCurrImage(UserImageTest)
                }
            }else if(response.status === 404){
              setCurrImage(UserImageTest)
            }
        } catch (err) {
            console.log({ err });
        }
    }
	useEffect(() => {
		if(userData["userId"] !== ""){
			console.log(userData["userId"])
			getCurrImage(userData["userId"])
		}
	}, [userData])
	//Profile Image End

	return (
		<div className="App">

			<main>
				<div className="nav-panel">
					<div className="nav-panel-top">
						<div className='app-info'>
							<img className='App-Icon' src={ECIIcon} alt="ECI"/>
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
						<button className={window.location.pathname.startsWith("/session/unitmanagement") ? 'nav-button active' : 'nav-button'} onClick={() => {
							navigate("/session/unitmanagement")
						}}>
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



						<button className={window.location.pathname.startsWith("/session/issuemanagement") ? 'nav-button active' : 'nav-button'} onClick={() => {
							navigate("/session/issuemanagement")
						}}>
							<div><IssueRequestManagementIcon />Issue/Request</div>
							<ChevronRight className="chevron" />
						</button>


						{/* <button className={window.location.pathname.startsWith("/session/services") ? 'nav-button active' : 'nav-button'} onClick={() => {
							navigate("/session/services")
						}}>
							<div><ServicesIcon />Other Services</div>
							<ChevronRight className="chevron" />
						</button> */}

						<div className="horz_line">

						</div>

						{/* <button className={window.location.pathname.startsWith("/session/messages") ? 'nav-button active' : 'nav-button'}>
							<div className='filler'><MessagesIcon />Messages</div>
							<ChevronRight className="chevron" />
						</button> */}
						{/* <button className={window.location.pathname.startsWith("/session/downloads") ? 'nav-button active' : 'nav-button'}>
							<div><DownloadsIcon />Downloads</div>
							<ChevronRight className="chevron" />
						</button> */}

						<button className={window.location.pathname.startsWith("/session/downloads") ? 'nav-button active' : 'nav-button'}>
							<div><ReportIcon />Report</div>
							<ChevronRight className="chevron" />
						</button>
						<button className={'nav-button'} onClick={()=>{
							window.open("https://ecodehub.in:8000/consumables")
						}}>
						<div>
							<Invent/>
							Consumables</div>
							<ChevronRight className="chevron" />
						</button>
						<button className={'nav-button'} onClick={() => {navigate("/usermanual")}}>
							<div>
							<Manuals/>
								Users Manuals</div>
							<ChevronRight className="chevron" />
						</button>

						<div className="horz_line">
						
						</div>

						

						<button className={window.location.pathname.startsWith("/session/viewpermissions") ? 'nav-button active' : 'nav-button'}
							onClick={() => {
								navigate('/session/viewpermissions')}
							}>
								
								<div><PermissionIcon/>Permissions</div>
								<ChevronRight className="chevron" />
						</button>

						<button className={window.location.pathname.startsWith("/session/setroles") ? 'nav-button active' : 'nav-button'}
							onClick={() => {
								navigate('/session/setroles')}
							}>
								
								<div><PermissionIcon/>Roles</div>
								<ChevronRight className="chevron" />
						</button>

					</div>

				</div>
				<div className="content-area ">
					<div className='divnav'>
						<div className="nav-left">
							{getNav()}
						</div>
						<div className="nav-right">
							
							<div className="userImage">
									<img
										src={currImage !== 0 ? currImage : UserImageTest}
										style={{borderRadius: "50%", height:"37.5px", width:"37.5px"}}
										alt="profile"
									/>
							</div>
							<div style={{ display: "flex", "flexDirection": "column", alignItems: "center", "justifyContent": "center", overflowY: "visible", maxHeight: "100%" }}>
								<span tyle={{ position: "relative" }}>{userData.userId ? userData.userId : ""}
									<button3 tabIndex={1} className="navBarDropDownBtn" style={{ position: "relative", overflowY: "visible" }} onClick={() => {
										document.getElementsByClassName('navBarDropDownBtn')[0].focus()
									}}>
										<ChevronRight style={{ transform: "rotateZ(90deg)", maxWidth: "1.2em", marginLeft: "10px" }} />
										<div id='nav-bar-drop-down' className='navBarDropDown absolute top-12 right-6 rounded-full' style={{ width: "160px", zIndex: "999", "overflow": 'hidden' }}>
											<button className="text-white cursor-pointer w-full p-3   rounded-sm" style={{ backgroundColor: "#84587C" }} onClick={() => {
												navigate(`/session/user-profile/${userData.userId ? userData.userId : ""}`)
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
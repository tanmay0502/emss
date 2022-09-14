import './App.css';

import {BrowserRouter, Routes, Route} from 'react-router-dom'

import ECIIcon from './assets/eci_logo.png';
import {ReactComponent as HomeIcon} from './assets/Home.svg';
import {ReactComponent as UserManagementIcon} from './assets/Users.svg';
import {ReactComponent as OrderManagementIcon} from './assets/Order.svg';
import {ReactComponent as LogoutIcon} from './assets/Logout.svg';
import CreateUser from './pages/user_management/CreateUser';
import Home from './pages/home/Home';

function App() {
	return (
		<div className="App">
			<header className="App-header">
				<img className='App-Icon' src={ECIIcon} />
				EVM Management System
			</header>
			<main>
				<div className="nav-panel">
					<div className="nav-panel-top">
						<span>Welcome, "username"</span>
						<button className='nav-button' onClick={()=>{
							window.location.href = "/" 
						}}>
						 	<HomeIcon />Home
						</button>
						<button className='nav-button' onClick={()=>{
							window.location.href = "/usermanagement/createuser" 
						}}>
						 	<UserManagementIcon />User Management
						</button>
						<button className='nav-button'>
						 	<OrderManagementIcon />Order Management
						</button>
					</div>
					<div className="nav-panel-bottom">
						<button className='nav-button'>
						 	<LogoutIcon />Logout
						</button>
					</div>
				</div>
				<div className="content-area">
					<div className="content">
						<BrowserRouter>
							<Routes>
								<Route path="/" element={<Home />} /> {/* Dashboard Component goes here */}
								<Route path="/usermanagement/createuser" element={<CreateUser />} />
							</Routes>
						</BrowserRouter>
					</div>
				</div>
			</main>
		</div>
	);
}

export default App;

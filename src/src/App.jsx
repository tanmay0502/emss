import './App.css';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import ActionIssue from './pages/issue_request_management/ActionIssue';
import IssueList from './pages/issue_request_management/Requestlist'
import CreateUser from './pages/user_management/CreateUser';
import EditUser from './pages/user_management/EditUser';
import Home1 from './pages/home/Dashboard';
import ManageUsers from './pages/user_management/ManageUsers';
import WarehouseManagement from './pages/warehouse_management/WarehouseManagement'
import AddWarehouse from './pages/warehouse_management/AddWarehouse';
import ModifyWarehouse from './pages/warehouse_management/ModifyWarehouse';
import HomePage from './pages/unit_management/Homepage'
import Login from './pages/login/Login';
import Routed from './Router';
import { useEffect, useState } from 'react';
import WarehouseDetail from './pages/warehouse_management/WarehouseDetail';
import CreateIssue from './pages/issue_request_management/CreateIssue';
import Profile from './components/Profile';
import ViewRequest from './pages/issue_request_management/ViewRequest';
import OrderFlowOne from './pages/order_management/OrderFlowOne';
import OrderFlowTwo from './pages/order_management/OrderFlowTwo';
import OrderManagement from './pages/order_management/OrderManagement';
import OrderTypes from './pages/order_management/OrderTypes';
import GenerateOrder from './pages/order_management/GenarateOrder';
import ViewOrderDetails from './pages/order_management/ViewOrderDetails';
import UnitList from './pages/unit_management/UnitList';
import ScheduleElection from './pages/unit_management/ScheduleElection';
import ScheduleList from './pages/unit_management/ScheduleList';
import ScheduleTnaList from './pages/unit_management/TnaList';
import ScheduleTna from './pages/unit_management/ScheduleTna'
import PhysicalVarification from './pages/unit_management/PhysicalVar';
import VarificationList from './pages/unit_management/PhysicalVarList';
import ScheduleFLC from './pages/unit_management/ScheduleFlc';
import FLCList from './pages/unit_management/FlcList'

import Schedule_List_CDP from './pages/unit_management/Schedule_List_CDP';
import ScheduleCDP_edit from './pages/unit_management/ScheduleCDP_edit';
import ScheduleCDP from './pages/unit_management/ScheduleCDP';
import First_Randomisation_Scheduling from './pages/unit_management/first_Randomisation_Scheduling'
import Second_Randomisation_Scheduling from './pages/unit_management/second_Randomisation_Scheduling'
import ChangePassword from './components/ChangePassword';

import FirstRandomization from './pages/unit_management/FirstRandomization';
import SecondRandomization from './pages/unit_management/SecondRandomization';

import EditFLC from './pages/unit_management/EditFlc'
import EditTna from './pages/unit_management/EditTna';
import EditElection from './pages/unit_management/EditElection';
import HomePageUnit from './pages/unit_management/Homepage';
import Announce_Flc from './pages/unit_management/announce_flc'
import Usermanual from './components/Usermanual';
import ViewPermission from './components/adminUtilities/ViewPermission';
import SetRoles from './components/adminUtilities/SetRoles';
import LocationDetails from './pages/order_management/LocationDetails';
import AdminUtilities from './components/AdminUtilities';
import Viewunit from './pages/unit_management/ViewUnit';
import StatusHistory from './pages/unit_management/StatusHistory';

import FetchFile from './pages/issue_request_management/FetchFile';
import Orders from './pages/unit_management/Orders';
import Prepared_Certificate from './pages/unit_management/preparedness_certificate';
import NotFound404 from './NotFound404';
import SetModels from './components/adminUtilities/SetModels';
import SetStates from './components/adminUtilities/SetStates';
import SetDefect from './components/adminUtilities/SetDefect';
import SetACs from './components/adminUtilities/SetACs';
import SetDistricts from './components/adminUtilities/SetDistricts';
function App() {

	const [sessionState, setSessionState] = useState({
		userID: null,
		userEmail: null,
		active: null,
		userName: null,
		userImage: null
	})

	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route exact path="/" element={<Navigate exact to="/login" />} />
					<Route path="/login" element={<Login Session={sessionState} SetSession={setSessionState} />} />
					<Route path="/usermanual" element={<Usermanual />} />

					<Route path="/session/" element={<Routed Session={sessionState} SetSession={setSessionState} />} >
						<Route path="/session/home" element={<Home1 />} />{" "}
						Dashboard Component goes here
						<Route
							path="/session/unitmanagement/HomePage"
							element={<HomePage />}
						/>

						<Route path="/session/usermanagement/" element={<ManageUsers />} />
						<Route
							path="/session/usermanagement/createuser"
							element={<CreateUser />}
						/>
						<Route
							path="/session/usermanagement/edituser/:userid"
							element={<EditUser />}
						/>
						<Route
							path="/session/usermanagement/edituser/:userid"
							element={<EditUser />}
						/>
						{/* <Route
              path="/session/unitmanagement/"
              element={<UnitList />}
            /> */}
						<Route
							path="/session/unitmanagement/"
							element={<HomePageUnit />}
						/>
						<Route
							path="/session/unitmanagement/unitlist"
							element={<UnitList />}
						/>
						{/* <Route
              path="/session/unitmanagement/statusHistory"
              element={<kljfd />}
            /> */}
						<Route
							path="/session/unitmanagement/election_scheduling"
							element={<ScheduleElection />}
						/>
						<Route
							path="/session/unitmanagement/preparednesscertificate"
							element={<Prepared_Certificate />}
						/>
						<Route
							path="/session/unitmanagement/first_randomisation_scheduling"
							element={<First_Randomisation_Scheduling />}
						/>
						<Route
							path="/session/unitmanagement/viewunit/:unitId"
							element={<Viewunit />}
						/>
						<Route
							path="/session/unitmanagement/statushistory/:id"
							element={<StatusHistory />}
						/>
						<Route
							path="/session/unitmanagement/second_randomisation_scheduling"
							element={<Second_Randomisation_Scheduling />}
						/>
						<Route
							path="/session/unitmanagement/firstrandomization/:id/:Suppl"
							element={<FirstRandomization />}
						/>
						<Route
							path="/session/unitmanagement/secondrandomization/:id/:Suppl"
							element={<SecondRandomization />}
						/>
						<Route
							path="/session/unitmanagement/schedule_list"
							element={<ScheduleList />}
						/>
						<Route
							path="/session/unitmanagement/edit_election/:id"
							element={<EditElection />}
						/>
						<Route
							path="/session/unitmanagement/schedule_tna_list"
							element={<ScheduleTnaList />}
						/>
						<Route
							path="/session/unitmanagement/tna_scheduling"
							element={<ScheduleTna />}
						/>
						<Route
							path="/session/unitmanagement/edit_tna/:id"
							element={<EditTna />}
						/>
						<Route
							path="/session/unitmanagement/varification_scheduling"
							element={<PhysicalVarification />}
						/>
						<Route
							path="/session/unitmanagement/schedule_varification_list"
							element={<VarificationList />}
						/>
						<Route
							path="/session/unitmanagement/announce_Flc"
							element={<Announce_Flc />}
						/>
						<Route
							path="/session/unitmanagement/schedule_flc"
							element={<ScheduleFLC />}
						/>
						<Route
							path="/session/unitmanagement/flc_list"
							element={<FLCList />}
						/>
						<Route
							path="/session/unitmanagement/editflc/:id"
							element={<EditFLC />}
						/>

						<Route
							path="/session/unitmanagement/ScheduleCDP"
							element={<ScheduleCDP />}
						/>
						<Route
							path="/session/unitmanagement/editcdp/:id"
							element={<ScheduleCDP_edit />}
						/>
						<Route
							path="/session/unitmanagement/Schedule_List_CDP"
							element={<Schedule_List_CDP />}
						/>
						<Route
							path="/session/unitmanagement/orders"
							element={<Orders />}
						/>
						<Route
							path="/session/warehousemanagement/"
							element={<WarehouseManagement />}
						/>
						<Route
							path="/session/warehousemanagement/addwarehouse"
							element={<AddWarehouse />}
						/>
						<Route
							path="/session/warehousemanagement/warehousedetails/:id"
							element={<WarehouseDetail />}
						/>
						<Route
							path="/session/warehousemanagement/modifywarehouse/:id"
							element={<ModifyWarehouse />}
						/>
						<Route path="/session/issuemanagement/" element={<IssueList />} />
						<Route
							path="/session/issuemanagement/createIssue"
							element={<CreateIssue />}
						/>

						{/* <Route
              path='/session/issuemanagement/actionIssue/:id'
              element={<ActionIssue />}
            /> */}
						<Route
							path="/session/user-profile/:id"
							element={<Profile />}
						/>
						<Route
							path="/session/user-profile/changepassword/:id"
							element={<ChangePassword />}
						/>
						<Route
							path="/session/adminutilities/viewpermissions"
							element={<ViewPermission />}
						/>
						<Route
							path="/session/adminutilities/setroles"
							element={<SetRoles />}
						/>
						<Route
							path="/session/adminutilities/setmodels"
							element={<SetModels />}
						/>
						<Route
							path="/session/adminutilities/setdefects"
							element={<SetDefect />}
						/>
						<Route
							path="/session/adminutilities/setstates"
							element={<SetStates />}
						/>
						<Route
							path="/session/adminutilities/setACs"
							element={<SetACs />}
						/>
						<Route
							path="/session/adminutilities/setDistricts"
							element={<SetDistricts />}
						/>
						<Route
							path="/session/ordermanagement"
							element={<OrderManagement />}
						/>
						<Route
							path='/session/issuemanagement/actionIssue/:id'
							element={<ActionIssue />}
						/>
						<Route
							path="/session/ordermanagement/ordertypes"
							element={<OrderTypes />}
						/>

						<Route
							path="/session/ordermanagement/orderdetails/:orderID"
							element={<ViewOrderDetails />}
						/>
						<Route
							path="/session/ordermanagement/createorder/generateorder/:orderType"
							element={<GenerateOrder />}
						/>
						<Route
							path="/session/ordermanagement/orderflowone/:orderID"
							element={<OrderFlowOne />}
						/>
						<Route
							path="/session/ordermanagement/orderflowtwo/:orderID"
							element={<OrderFlowTwo />}
						/>
						<Route
							path="/session/ordermanagement/orderDetails/location/contact/:no"
							element={<LocationDetails />}
						/>
						<Route
							path="/session/services"
							element={<>Other Services</>}
						/>

					</Route>

					<Route
						path="/session/issuemanagement/fetchfile/:filename"
						element={<FetchFile />}
					/>

					<Route path='*' element={<Navigate exact to={'/page-not-found'} />} />
					<Route path='/page-not-found' element={<NotFound404 resource={false} />} />
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;

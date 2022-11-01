import './App.css';

import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'

import ActionIssue from './pages/issue_request_management/ActionIssue';
import IssueList from './pages/issue_request_management/Requestlist'
import CreateUser from './pages/user_management/CreateUser';
import Home from './pages/home/Home';
import ManageUsers from './pages/user_management/ManageUsers';
import WarehouseManagement from './pages/warehouse_management/WarehouseManagement'
import AddWarehouse from './pages/warehouse_management/AddWarehouse';
import ModifyWarehouse from './pages/warehouse_management/ModifyWarehouse';

import Login from './pages/login/Login';
import Routed from './Router';
import { useState } from 'react';
import WarehouseDetails from './pages/warehouse_management/WarehouseDetails';
import CreateIssue from './pages/issue_request_management/CreateIssue';
import Profile from './components/Profile';
import ViewRequest from './pages/issue_request_management/ViewRequest';
import OrderManagement from './pages/order_management/OrderManagement';
import OrderTypes from './pages/order_management/OrderTypes';
import FillAvailability from './pages/order_management/FillAvailability';
import GenerateOrder from './pages/order_management/GenarateOrder';
function App() {

	const [sessionState, setSessionState] = useState({
		userID: null,
		userEmail: null,
		active: null,
		userName: null,
		userImage: null
	})

  const [profileDetail,setProfileDetail]=useState([]);

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
		  if(data2["data"]!=undefined){
			// console.log("helo")
				for(let i=0;i<data2["data"].length;i++){
					// console.log(data2["data"][i][0],userData.userId)
					if(data2["data"][i][0]==sessionStorage.getItem('sessionToken')){
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

	return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Navigate exact to="/login" />} />
          <Route
            path="/login"
            element={
              <Login Session={sessionState} SetSession={setSessionState} />
            }
          />
          <Route
            path="/session/"
            element={
              <Routed Session={sessionState} SetSession={setSessionState} />
            }
          >
            <Route path="/session/home" element={<Home />} /> Dashboard
            Component goes here
            <Route path="/session/usermanagement/" element={<ManageUsers />} />
            <Route
              path="/session/usermanagement/createuser"
              element={<CreateUser />}
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
              element={<WarehouseDetails />}
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
            <Route
              path="/session/issuemanagement/viewRequest/:id"
              element={<ViewRequest />}
            />
            <Route
              path="/session/user-profile"
              element={<Profile detail={profileDetail} />}
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
              path="/session/ordermanagement/orderdetails"
              element={<FillAvailability />}
            />
            <Route
              path="/session/ordermanagement/createorder/generateorder/:orderType"
              element={<GenerateOrder />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

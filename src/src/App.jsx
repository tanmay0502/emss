import './App.css';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import ActionIssue from './pages/issue_request_management/ActionIssue';
import IssueList from './pages/issue_request_management/Requestlist'
import CreateUser from './pages/user_management/CreateUser';
import EditUser from './pages/user_management/EditUser';
import Home1 from './pages/home/Home1';
import ManageUsers from './pages/user_management/ManageUsers';
import WarehouseManagement from './pages/warehouse_management/WarehouseManagement'
import AddWarehouse from './pages/warehouse_management/AddWarehouse';
import ModifyWarehouse from './pages/warehouse_management/ModifyWarehouse';

import Login from './pages/login/Login';
import Routed from './Router';
import { useEffect, useState } from 'react';
import WarehouseDetails from './pages/warehouse_management/WarehouseDetails';
import CreateIssue from './pages/issue_request_management/CreateIssue';
import Profile from './components/Profile';
import ViewRequest from './pages/issue_request_management/ViewRequest';
import OrderManagement from './pages/order_management/OrderManagement';
import OrderTypes from './pages/order_management/OrderTypes';
import GenerateOrder from './pages/order_management/GenarateOrder';
import ViewOrderDetails from './pages/order_management/ViewOrderDetails';
import EditView from './pages/home/EditView';
import UnitList from './pages/unit_management/UnitList';
import ScheduleElection from './pages/unit_management/ScheduleElection';
import ScheduleList from './pages/unit_management/ScheduleList';
import ScheduleTnaList from './pages/unit_management/TnaList';
import ScheduleTna from './pages/unit_management/ScheduleTna'
import PhysicalVarification from './pages/unit_management/PhysicalVar';
import VarificationList from './pages/unit_management/PhysicalVarList';
import ScheduleFLC from './pages/unit_management/ScheduleFlc';
import FLCList from './pages/unit_management/FlcList'

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
          <Route
            path="/login"
            element={
              <Login Session={sessionState} SetSession={setSessionState} />
            }
          />
          <Route path="/session/" element={<Routed Session={sessionState} SetSession={setSessionState} />}>
            <Route path="/session/home" element={<Home1 />} />{" "}
            Dashboard Component goes here

            <Route
              path="/session/home/editview"
              element={<EditView />}
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
              path="/session/unitmanagement/"
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
              path="/session/unitmanagement/schedule_list"
              element={<ScheduleList />}
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
              path="/session/unitmanagement/varification_scheduling"
              element={<PhysicalVarification />}
            />
            <Route
              path="/session/unitmanagement/schedule_varification_list"
              element={<VarificationList />}
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
              path='/session/issuemanagement/actionIssue/:id'
              element={<ActionIssue />}
            />

            <Route
              path="/session/user-profile"
              element={<Profile />}
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
              element={<ViewOrderDetails />}
            />
            <Route
              path="/session/ordermanagement/createorder/generateorder/:orderType"
              element={<GenerateOrder />}
            />
            <Route
              path="/session/services"
              element={<>Other Services</>}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

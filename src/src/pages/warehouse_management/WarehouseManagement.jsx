import React from 'react'
import { ReactComponent as UserManagementIcon } from '../../assets/Users.svg';
import { ReactComponent as ChevronRightIcon } from '../../assets/ChevronRight.svg';
import WarehouseList from './WarehouseListCopy';

function WarehouseManagement() {
  return (
	<div className="" style={{ height: "100%", maxHeight: "100%", overflow: "visible" }}>
		{/* <div className="content-path">
			<UserManagementIcon /><a href='/session/warehousemanagement'><span>Warehouse Management</span></a><ChevronRightIcon /><span>List of Warehouses</span>
		</div> */}
		<WarehouseList/>
	</div>
  )
}

export default WarehouseManagement
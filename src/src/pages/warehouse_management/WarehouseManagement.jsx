import React from 'react'
import { ReactComponent as UserManagementIcon } from '../../assets/Users.svg';
import { ReactComponent as ChevronRightIcon } from '../../assets/ChevronRight.svg';
import WarehouseList from './WarehouseList';

function WarehouseManagement() {
  return (
	<div className="">
		{/* <div className="content-path">
			<UserManagementIcon /><a href='/session/warehousemanagement'><span>Warehouse Management</span></a><ChevronRightIcon /><span>List of Warehouses</span>
		</div> */}
		<WarehouseList/>
	</div>
  )
}

export default WarehouseManagement
import React from 'react'
import { ReactComponent as UserManagementIcon } from '../../assets/Users.svg';
import { ReactComponent as ChevronRightIcon } from '../../assets/ChevronRight.svg';
import './css/warehouse.css'
import WarehouseList from './WarehouseList';
import {FaClipboardList} from 'react-icons/fa'

function WarehouseManagement() {
  return (
	<div className="flex-col justify-center align-middle">
		<div className="content-path">
			<UserManagementIcon /><a href='/session/warehousemanagement'><span>Warehouse Management</span></a><ChevronRightIcon /><span>List of Warehouses</span>
		</div>

        <div className='PageTitle'>
				<h4><FaClipboardList/> <span>List of Warehouses</span></h4>
		</div>
		<WarehouseList/>
	</div>
  )
}

export default WarehouseManagement
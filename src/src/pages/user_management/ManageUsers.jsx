import React from 'react'
import UserList from "../../components/UserListCopy"
import { ReactComponent as UserManagementIcon } from '../../assets/Users.svg';
import { ReactComponent as ChevronRightIcon } from '../../assets/ChevronRight.svg';

function ManageUsers() {
  return (
	<div style={{ height: "100%", maxHeight: "100%", overflow: "visible" }}>
		{/* <div className="content-path">
			<UserManagementIcon /><span>User Management</span><ChevronRightIcon /><span>List of Users</span>
		</div> */}
		<UserList/>
	</div>
  )
}

export default ManageUsers
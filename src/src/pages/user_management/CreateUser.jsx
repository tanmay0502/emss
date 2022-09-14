import React from 'react'
import { useState } from 'react'
import './styles/createuser.css'
import { ReactComponent as UserManagementIcon } from '../../assets/Users.svg';
import { ReactComponent as ChevronRightIcon } from '../../assets/ChevronRight.svg';

function CreateUser() {
	const [isTemporary, setIsTemporary] = useState(false)

	const onFormSubmit = (e) => {
		e.preventDefault()

		const UserId = document.getElementById("formUserID").value
		const UserName = document.getElementById("formUserName").value
		const UserPassword = document.getElementById("formUserPassword").value
		const UserEmail = document.getElementById("formUserEmail").value
		const UserMobile = document.getElementById("formUserMobileNumber").value
		const UserAddress = document.getElementById("formUserAddress").value
		const UserAltContact1 = document.getElementById("formUserAltNumber1").value
		const UserAltContact2 = document.getElementById("formUserAltNumber2").value
		const UserImage = document.getElementById("formUserImage").files[0]

		const PasswordHash = UserPassword // Generate Password hash here

		var fr = new FileReader();
		fr.onload = () => {
			const ReqJSON = {
				"userID": UserId,
				"email": UserEmail,
				"name": UserName,
				"mobilenumber": UserMobile,
				"address": UserAddress,
				"othercontactnum1": UserAltContact1,
				"othercontactnum2": UserAltContact2,
				// "active": "string",
				// "activationtime": "2022-09-13T18:43:47.135Z",
				"photofilename": fr.result,
				// "createdby": "string",
				// "creationtime": "2022-09-13T18:43:47.135Z",
				"passwordhash": PasswordHash
			}
			// Perform API Call here
			console.log(ReqJSON)
			document.getElementById("createUserForm").reset();
		}
		fr.readAsDataURL(UserImage);
	}

	return (
		<div className='create-user-container'>
			<div className="content-path">
				<UserManagementIcon /><a href='/usermanagement'>User Management</a><ChevronRightIcon /><span>Create User</span>
			</div>
			<h4>User Details</h4>
			<div >
				<form id='createUserForm' onSubmit={onFormSubmit} className="form-container">
					<div className="submit-area">
						<input type={"submit"} value="Submit" />
					</div>
					<div className="div2 label">Type:</div>
					<div className="div3 label">Name:</div>
					<div className="div4 label">Email Address:</div>
					<div className="div5 label">Address:</div>
					<div className="div6 label">User Image:</div>
					<div className="div12 label">User ID:</div>
					<div className="div13 label">Password:</div>
					<div className="div14 label">Mobile Number:</div>
					<div className="div15 label">Alt Contact 1:</div>
					<div className="div16 label">Alt Contact 2:</div>

					<div className="div7">
						<select id="user-type" required={true} onChange={(e) => {
							setIsTemporary(e.target.selectedIndex === 1)
						}}>
							<option value="permanent">Permanent User</option>
							<option value="temporary">Temporary User</option>
						</select>
					</div>

					<div className="div17">
						<input id="formUserID" pattern='[a-zA-Z][a-zA-Z]\d\d\d\d\d[a-zA-Z][a-zA-Z][a-zA-Z]' required={!isTemporary} disabled={isTemporary} type={"text"} placeholder="SSPPAAARRR" />
					</div>

					<div className="div8">
						<input id="formUserName" required={true} type={"text"} placeholder="Full Name" />
					</div>

					<div className="div18">
						<input id="formUserPassword" required={true} type={"password"} placeholder="Password" />
					</div>

					<div className="div9">
						<input id="formUserEmail" type={"email"} placeholder="xyz@example.com" />
					</div>

					<div className="div19">
						<input id="formUserMobileNumber" required={true} pattern="^\d{10}" type={"tel"} placeholder="00000 00000" />
					</div>

					<div className="div10">
						<input id="formUserAddress" required={true} type={"text"} placeholder="Address" />
					</div>

					<div className="div20">
						<input id="formUserAltNumber1" type={"tel"} pattern="^\d{10}" placeholder="00000 00000" />
					</div>

					<div className="div11">
						<input id="formUserImage" required={isTemporary} type="file" placeholder='Choose Image (Upto 5 MB)' />
					</div>

					<div className="div21">
						<input id="formUserAltNumber2" type={"tel"} pattern="^\d{10}" placeholder="00000 00000" />
					</div>
				</form>
			</div>
		</div>
	)
}

export default CreateUser
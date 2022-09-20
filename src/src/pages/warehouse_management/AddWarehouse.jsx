import React from "react";
import { ReactComponent as ChevronRightIcon } from '../../assets/ChevronRight.svg';
import { ReactComponent as WarehouseManagementIcon } from '../../assets/WarehouseManagement.svg';
import { FaWarehouse } from 'react-icons/fa';
import { FaRegBuilding } from 'react-icons/fa';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { FaMapMarkedAlt } from 'react-icons/fa';
import { FaLaptopHouse } from 'react-icons/fa';
import { FaLock } from 'react-icons/fa';
import { BsShieldLockFill } from 'react-icons/bs'
import { BsFillPersonFill } from 'react-icons/bs'
import { BsFillTelephoneFill } from 'react-icons/bs'
import { MdWork } from "react-icons/md";
import { BsCheck2 } from 'react-icons/bs'
import { useState } from "react";


export default function AddWarehouse() {

	const [doubleLockSystem, setDoubleLockSystem] = useState(true)

	return (
		<div className="flex-col justify-center align-middle">
			<div className="content-path">
				<WarehouseManagementIcon /><a href='/session/warehousemanagement'><span>Warehouse Management</span></a><ChevronRightIcon /><span>Create Warehouse</span>
			</div>

			<div className="myWrapper">
				<div className='PageTitle'>
					<h4><FaWarehouse /><span>Add New Warehouse</span></h4>
				</div>
				<form className="myForm">
					<div className="formGrid">
						<div class="warehouse-type">
							<h5>
								Warehouse Type
							</h5>
							<div className="input_group">
								<div className="form_group">
									<div className="form_label">
										<label htmlFor="">Type : </label>
									</div>
									<div className="form_select">
										<select name="" id="">
											<option value="-1" className="FirstOption">--Select--</option>
											<option value="01">National Reserve Warehouse</option>
											<option value="02">State Central Warehouse</option>
											<option value="03">District Warehouse</option>
											<option value="04">District Strong Room</option>

											<option value="05">Strong Room for AC</option>
											<option value="06">Strong Room for AS (PC)</option>
											<option value="07">Strong Room for Polled Units</option>
											<option value="08">Strong Room for Units under Counting</option>

											<option value="09">Strong Room for units under EP Period</option>
											<option value="10">Strong Room for EP Marked units</option>
											<option value="11">Defective EVM Warehouse</option>
											<option value="12">Reserve Units Strong Room</option>

											<option value="13">T&A Warehouse</option>
											<option value="14">Virtual Warehouse</option>
											<option value="15">Virtual Strong Room</option>
											<option value="16">Manufacturer Warehouse</option>
										</select>
										<div className="input_icon">
											<FaWarehouse size="1em" />
										</div>
									</div>

								</div>

								<div className="form_group">
									<div className="form_label">
										<label htmlFor="">Building Type : </label>
									</div>
									<div className="form_select">
										<select name="" id="">
											<option value="-1" className="FirstOption">--Select--</option>

											<option value="Temporary">Temporary</option>
											<option value="Permenant">Permanent</option>
										</select>
										<div className="input_icon">
											<FaRegBuilding size="1em" />
										</div>
									</div>
								</div>

								<div className="form_group">
									<div className="form_label">
										<label htmlFor="">Sealed: </label>
									</div>
									<div className="form_select">
										<select name="" id="">
											<option value="-1" className="FirstOption">--Select--</option>
											<option value="Yes">Yes</option>
											<option value="No">No</option>
										</select>
										<div className="input_icon">
											<BsShieldLockFill size="1em" />
										</div>
									</div>

								</div> </div>
						</div>
						<div class="warehouse-location">
							<h5>
								Warehouse Location
							</h5>
							<div className="input_group">
								<div className="form_group">
									<div className="form_label">
										<label htmlFor="">Address : </label>
									</div>
									<div className="form_input">
										<input id="" name="" className="" placeholder="Warehouse Address" />
										<div className="input_icon">
											<FaMapMarkedAlt size="1em" />
										</div>
									</div>

								</div>

								<div className="form_group">
									<div className="form_label">
										<label htmlFor="">Warehouse Code : </label>
									</div>
									<div className="form_input">
										<input id="" name="" className="" placeholder="Warehouse Code" />
										<div className="input_icon">
											<FaLaptopHouse size="1em" />
										</div>
									</div>
								</div>

								<div className="form_group">
									<div className="form_label">
										<label htmlFor="">Location : </label>
									</div>
									<div className="form_input_group_horizontal">
										<div className="form_input">
											<input id="" name="" className="" placeholder="Latitude" />
											<div className="input_icon">
												<FaMapMarkerAlt size="1em" />
											</div>
										</div>
										<div className="form_input">
											<input id="" name="" className="" placeholder="Longitude" />
											<div className="input_icon">
												<FaMapMarkerAlt size="1em" />
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="warehouse-personnel">
							<h5>
								Warehouse Personnel Details
							</h5>
							<div className="input_group three-column-grid">
								<div className="form_group" style={{gridArea: "1 / 1 / 2 / 4"}}>
									<div className="form_radio">
										<label htmlFor="double_lock_yes">Double Lock System: </label>
										<label htmlFor="double_lock_yes">Yes </label>
										<input type={"radio"} name="double_lock" id="double_lock_yes" value="1" defaultChecked={true} onChange={(e) => {
											console.log("Yes")
											// console.log(e.target.checked)
											setDoubleLockSystem(true)
										}} />
										<label htmlFor="double_lock_no">No </label>
										<input type={"radio"} name="double_lock" id="double_lock_no" value="0" onChange={(e) => {
											console.log("No")
											// console.log(e.target.checked)
											setDoubleLockSystem(false)
										}} />
									</div>
								</div>
								<div className="form_group">
									<div className="form_label">
										<label htmlFor="">Person Name: </label>
									</div>
									<div className="form_input">
										<input placeholder="Person 1 Name" id="" name="" />
										<div className="input_icon">
											<BsFillPersonFill size="1em" />
										</div>
									</div>
								</div>

								<div className="form_group">
									<div className="form_label">
										<label htmlFor="">Person Mobile: </label>
									</div>
									<div className="form_input">
										<input type={"tel"} placeholder="Mobile" id="" name="" />
										<div className="input_icon">
											<BsFillTelephoneFill size="1em" />
										</div>
									</div>
								</div>

								<div className="form_group">
									<div className="form_label">
										<label htmlFor="">Person Designation: </label>
									</div>
									<div className="form_select">
										<select name="" id="">
											<option value="-1" className="FirstOption">--Select--</option>
											<option value="Yes">Yes</option>
											<option value="No">No</option>
										</select>
										<div className="input_icon">
											<MdWork size="1em" />
										</div>
									</div>
								</div>

								<div className="form_group" hidden={!doubleLockSystem}>
									<div className="form_label">
										<label htmlFor="">Person Name: </label>
									</div>
									<div className="form_input">
										<input placeholder="Person 2 Name" id="" name="" />
										<div className="input_icon">
											<BsFillPersonFill size="1em" />
										</div>
									</div>
								</div>

								<div className="form_group" hidden={!doubleLockSystem}>
									<div className="form_label">
										<label htmlFor="">Person Mobile: </label>
									</div>
									<div className="form_input">
										<input type={"tel"} placeholder="Mobile" id="" name="" />
										<div className="input_icon">
											<BsFillTelephoneFill size="1em" />
										</div>
									</div>
								</div>

								<div className="form_group" hidden={!doubleLockSystem}>
									<div className="form_label">
										<label htmlFor="">Person Designation: </label>
									</div>
									<div className="form_select">
										<select name="" id="">
											<option value="-1" className="FirstOption">--Select--</option>
											<option value="Yes">Yes</option>
											<option value="No">No</option>
										</select>
										<div className="input_icon">
											<MdWork size="1em" />
										</div>
									</div>
								</div>

							</div>
						</div>
					</div>
					<center>
						<input type={"submit"} className="mySubmit">
							{/* <BsCheck2 size="1em" style={{ fontWeight: "bolder" }} /> <span>	Submit</span> */}
						</input>
					</center>

				</form>

			</div>
		</div>
	)
}
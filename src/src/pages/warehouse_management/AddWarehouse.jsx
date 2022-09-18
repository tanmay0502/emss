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



export default function AddWarehouse() {
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
					<div className="input_group">

						<div className="form_group">
							<div className="form_label">
								<label htmlFor="">Warehouse Type : </label>
							</div>
							<div className="form_select">
								<select name="" id="">
									<option value="-1" className="FirstOption">---Select---</option>
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

							</div>
							<div className="input_icon">
								<FaWarehouse size="1em" />
							</div>
						</div>

						<div className="form_group">
							<div className="form_label">
								<label htmlFor="">Warehouse Building Type : </label>
							</div>
							<div className="form_select">
								<select name="" id="">
									<option value="-1" className="FirstOption">---Select---</option>

									<option value="Temporary">Temporary</option>
									<option value="Permenant">Permenant</option>
								</select>

							</div>
							<div className="input_icon">
								<FaRegBuilding size="1em" />
							</div>
						</div>

						<div className="form_group">
							<div className="form_label">
								<label htmlFor="">Warehouse Address : </label>
							</div>
							<div className="form_input">
								<input id="" name="" className="" placeholder="Address" />

							</div>
							<div className="input_icon">
								<FaMapMarkedAlt size="1em" />
							</div>
						</div>

						<div className="form_group">
							<div className="form_label">
								<label htmlFor="">Warehouse Code : </label>
							</div>
							<div className="form_input">
								<input id="" name="" className="" placeholder="Warehouse Code" />
							</div>
							<div className="input_icon">
								<FaLaptopHouse size="1em" />
							</div>
						</div>

						<div className="form_group">
							<div className="form_label">
								<label htmlFor="">Warehouse Location : </label>
							</div>
							<div className="form_input">
								<input id="" name="" className="" placeholder="Lat, Long" />

							</div>
							<div className="input_icon">
								<FaMapMarkerAlt size="1em" />
							</div>
						</div>

					</div>

					<div className="input_group">

						<div className="form_group">
							<div className="form_label">
								<label htmlFor="">Double Lock System : </label>
							</div>
							<div className="form_select">
								<select name="" id="">
									<option value="-1" className="FirstOption">---Select---</option>
									<option value="Yes">Yes</option>
									<option value="No">No</option>
								</select>
							</div>
							<div className="input_icon">
								<FaLock size="1em" />
							</div>
						</div>

						<div className="form_group">
							<div className="form_label">
								<label htmlFor="">Warehouse Sealed : </label>
							</div>
							<div className="form_select">
								<select name="" id="">
									<option value="-1" className="FirstOption">---Select---</option>
									<option value="Yes">Yes</option>
									<option value="No">No</option>
								</select>

							</div>
							<div className="input_icon">
								<BsShieldLockFill size="1em" />
							</div>
						</div>

					</div>

					<div className="input_group">

						<div className="form_group">
							<div className="form_label">
								<label htmlFor="">Person Name (First Key) : </label>
							</div>
							<div className="form_input">
								<input placeholder="Name" id="" name="" />
							</div>
							<div className="input_icon">
								<BsFillPersonFill size="1em" />
							</div>
						</div>

						<div className="form_group">
							<div className="form_label">
								<label htmlFor="">Person Moblie (First Key) : </label>
							</div>
							<div className="form_input">
								<input placeholder="Name" id="" name="" />
							</div>
							<div className="input_icon">
								<BsFillTelephoneFill size="1em" />
							</div>
						</div>

						<div className="form_group">
							<div className="form_label">
								<label htmlFor="">Person Designation (First Key) : </label>
							</div>
							<div className="form_select">
								<select name="" id="">
									<option value="-1" className="FirstOption">---Select---</option>
									<option value="Yes">Yes</option>
									<option value="No">No</option>
								</select>
							</div>
							<div className="input_icon">
								<MdWork size="1em" />
							</div>
						</div>

					</div>

					<div className="input_group">

						<div className="form_group">
							<div className="form_label">
								<label htmlFor="">Person Name (Second Key) : </label>
							</div>
							<div className="form_input">
								<input placeholder="Name" id="" name="" />
							</div>
							<div className="input_icon">
								<BsFillPersonFill size="1em" />
							</div>
						</div>

						<div className="form_group">
							<div className="form_label">
								<label htmlFor="">Person Moblie (Second Key) : </label>
							</div>
							<div className="form_input">
								<input placeholder="Name" id="" name="" />
							</div>
							<div className="input_icon">
								<BsFillTelephoneFill size="1em" />
							</div>
						</div>

						<div className="form_group">
							<div className="form_label">
								<label htmlFor="">Person Designation (Second Key) : </label>
							</div>
							<div className="form_select">
								<select name="" id="">
									<option value="-1" className="FirstOption">---Select---</option>
									<option value="Yes">Yes</option>
									<option value="No">No</option>
								</select>
							</div>
							<div className="input_icon">
								<MdWork size="1em" />
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
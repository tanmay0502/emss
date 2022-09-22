import React, { useEffect } from "react";
import { ReactComponent as ChevronRightIcon } from '../../assets/ChevronRight.svg';
import { ReactComponent as WarehouseManagementIcon } from '../../assets/WarehouseManagement.svg';
import { FaWarehouse } from 'react-icons/fa';
import { FaRegBuilding } from 'react-icons/fa';
// // import { FaMapMarkerAlt } from 'react-icons/fa';
import { FaMapMarkedAlt } from 'react-icons/fa';
import { FaLaptopHouse } from 'react-icons/fa';
// // import { FaLock } from 'react-icons/fa';
import { BsShieldLockFill } from 'react-icons/bs'
import { BsFillPersonFill } from 'react-icons/bs'
// // import { BsFillTelephoneFill } from 'react-icons/bs'
// // import { MdWork } from "react-icons/md";
// // import { BsCheck2 } from 'react-icons/bs'
import { useState } from "react";


export default function AddWarehouse() {

<<<<<<< src/src/pages/warehouse_management/AddWarehouse.jsx
	const [doubleLockSystem, setDoubleLockSystem] = useState(true);

	const [states, setStates] = useState([]);
	const [statesCode, setStatesCode] = useState([]);
	const [PCs, setPCs] = useState([]);
	const [PCcodes, setPCcodes] = useState([]);
	const [WarehouseId, setWarehouseId] = useState("");

	//Form filed states....
	const [myState, setmyState] = useState("");
	const [myPCcode, setmyPCcode] = useState("");
	const [WarehouseState, setWarehouseState] = useState("");
	const [WarehousePC, setWarehousePC] = useState("");
	const [WarehouseType, setWarehouseType] = useState("");
	const [BuildingType, setBuildingType] = useState("");
	const [isSealed, setisSealed] = useState("");
	const [Address, setAddress] = useState("");
	const [WarhouseCode, setWarehouseCode] = useState("");
	const [Lat, setLat] = useState("");
	const [Lng, setLng] = useState("");
	const [PersonName1, setPersonName1] = useState("");
	const [PersonName2, setPersonName2] = useState("");
	const [PersonMobile1, setPersonMobile1] = useState("");
	const [PersonMobile2, setPersonMobile2] = useState("");
	const [PersonDesignation1, setPersonDesignation1] = useState("");
	const [PersonDesignation2, setPersonDesignation2] = useState("");
	//Form filed states end....


	const onFormSubmit = async (e) => {
		const warehouseType = document.getElementById('input_warehousetype').value
		const buildingType = document.getElementById('input_buildingtype').value
		const state = statesCode[states.indexOf(document.getElementById('input_state').value)]
		const PC = PCcodes[PCs.indexOf(document.getElementById('input_PC').value)]

		const lat = document.getElementById('input_lat').value
		const lon = document.getElementById('input_lng').value

		const address = document.getElementById('input_address').value
		const double_lock = document.getElementById('double_lock_yes').checked

		const person1_ID = document.getElementById('input_personName_1').value
		const person2_ID = double_lock ? document.getElementById('input_personName_2').value : ""

		const sealed = document.getElementById('input_sealed').value

		const reqBody = {
			"warehouseType": warehouseType,
			"warehouseBuildingType": buildingType,
			"warehouseState": state,
			"warehousePC": PC,
			"warehouseLatLong": [
				lat, lon
			],
			"warehouseAddress": address,
			"doubleLock": double_lock,
			"UIDKey1": person1_ID,
			"UIDKey2": person2_ID,
			"updateTime": new Date().toISOString(),
			"updatedByUID": window.sessionStorage.getItem('sessionToken'),
			"warehouseStatus": sealed
		}
		// const whId = generateWarehouseId();
		console.log(reqBody);

		const response = fetch(
			`http://evm.iitbhilai.ac.in:8100/warehouse/createWarehouse`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(reqBody),
			});
		const status = await response;
		alert(status.status == 200 ? "Warehouse Created Successfully" : "Error Creating Warehouse.")
		if(status.status == 200){
			document.getElementById("create-warehouse-form").reset()
		}
	}

	//Get state list

	async function getState() {
		try {
			const response = await fetch(
				"http://evm.iitbhilai.ac.in:8000/getStateList", {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				}
			}
			);
			const StateData = await response.json();
			setStates(StateData["list of states"]);
			setStatesCode(StateData["list of Codes"]);
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		getState();
	}, [])

	async function generateWarehouseId() {

		try {
			const response = await fetch(
				'http://evm.iitbhilai.ac.in:8100/warehouse/listWarehouses',
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						"stateCode": myState,
						"pcCode": myPCcode
					}),
				}
			)

		} catch (error) {
			console.log(error);
		}

		return myState + myPCcode + WarehouseType;
	}
	async function setStateFunc(st) {
		if (st !== "-1") {
			const selectedCode = statesCode[states.indexOf(st)];
			setmyState(selectedCode);
			if (selectedCode == "IN" ||
				selectedCode == "EL" ||
				selectedCode == "BL"
			) { }
			else {
				try {
					const response = await fetch(
						`http://evm.iitbhilai.ac.in:8000/getPCListbyState/${selectedCode}`, {
						method: "GET",
						headers: {
							"Content-Type": "application/json",
						},
					}
					);

					const data = await response.json();
					setPCs(data["list of PC names"]);
					setPCcodes(data["list of PC Codes"]);

				} catch (error) {
					console.log(error);
				}
			}
		}
	}

	async function setPcFunc(pc) {
		if (pc !== "-1") {
			const pcCode = PCcodes[PCs.indexOf(pc)];
			setmyPCcode(pcCode);
		}
	}

=======
	const [doubleLockSystem, setDoubleLockSystem] = useState(false);
	
	const [states,setStates] = useState([]);
	const [statesCode,setStatesCode] = useState([]);
	const [PCs,setPCs] = useState([]);
	const [PCcodes,setPCcodes] = useState([]);
	const [WarehouseId,setWarehouseId] = useState("");
>>>>>>> src/src/pages/warehouse_management/AddWarehouse.jsx

	//Form filed states....
	const [myState, setmyState] = useState("");
	const [myPCcode, setmyPCcode] = useState("");
	const [WarehouseState, setWarehouseState] = useState("");
	const [WarehousePC, setWarehousePC] = useState("");
	const [WarehouseType, setWarehouseType] = useState("");
	const [BuildingType, setBuildingType] = useState("");
	const [isSealed, setisSealed] = useState("");
	const [Address, setAddress] = useState("");
	const [WarhouseCode, setWarehouseCode] = useState("");
	const [Lat, setLat] = useState("");
	const [Lng, setLng] = useState("");
	const [PersonName1, setPersonName1] = useState("");
	const [PersonName2, setPersonName2] = useState("");
	const [PersonMobile1, setPersonMobile1] = useState("");
	const [PersonMobile2, setPersonMobile2] = useState("");
	const [PersonDesignation1, setPersonDesignation1] = useState("");
	const [PersonDesignation2, setPersonDesignation2] = useState("");
	//Form filed states end....


	const onFormSubmit = async (e) => {
		const warehouseType = document.getElementById('input_warehousetype').value
		const buildingType = document.getElementById('input_buildingtype').value
		const state = statesCode[states.indexOf(document.getElementById('input_state').value)]
		const PC = PCcodes[PCs.indexOf(document.getElementById('input_PC').value)]

		const lat = document.getElementById('input_lat').value
		const lon = document.getElementById('input_lng').value

		const address = document.getElementById('input_address').value
		const double_lock = document.getElementById('double_lock_yes').checked

		const person1_ID = document.getElementById('input_personName_1').value
		const person2_ID = double_lock ? document.getElementById('input_personName_2').value : ""

	}


async function getUserID(mobile){
	try {
		const response = fetch(
			`http://evm.iitbhilai.ac.in:8100/warehouse/createWarehouse`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(reqBody),
			});
		const status = await response;
		alert(status.status == 200 ? "Warehouse Created Successfully" : "Error Creating Warehouse.")
		if(status.status == 200){
			document.getElementById("create-warehouse-form").reset()
		}
	}

	//Get state list

	async function getState() {
		try {
			const response = await fetch(
				"http://evm.iitbhilai.ac.in:8100/usermgt/getStateList", {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				}
			}
			);
			const StateData = await response.json();
			setStates(StateData["list of states"]);
			setStatesCode(StateData["list of Codes"]);
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		getState();
	}, [])

	async function generateWarehouseId() {

		try {
			const response = await fetch(
				'http://evm.iitbhilai.ac.in:8100/warehouse/listWarehouses',
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						"stateCode": myState,
						"pcCode": myPCcode
					}),
				}
			)

		} catch (error) {
			console.log(error);
		}

		return myState + myPCcode + WarehouseType;
	}
	async function setStateFunc(st) {
		if (st !== "-1") {
			const selectedCode = statesCode[states.indexOf(st)];
			setmyState(selectedCode);
			if (selectedCode == "IN" ||
				selectedCode == "EL" ||
				selectedCode == "BL"
			) { }
			else {
				try {
					const response = await fetch(
						`http://evm.iitbhilai.ac.in:8100/usermgt/getPCListbyState/${selectedCode}`, {
						method: "GET",
						headers: {
							"Content-Type": "application/json",
						},
					}
					);

					const data = await response.json();
					setPCs(data["list of PC names"]);
					setPCcodes(data["list of PC Codes"]);

				} catch (error) {
					console.log(error);
				}
			}
		}
	}

	async function setPcFunc(pc) {
		if (pc !== "-1") {
			const pcCode = PCcodes[PCs.indexOf(pc)];
			setmyPCcode(pcCode);
		}
	}


	return (
		<div className="flex-col justify-center align-middle">
			<div className="content-path">
				<WarehouseManagementIcon /><a href='/session/warehousemanagement'><span>Warehouse Management</span></a><ChevronRightIcon /><span>Create Warehouse</span>
			</div>

			<div className="myWrapper">
				<div className='PageTitle'>
					<h4><FaWarehouse /><span>Add New Warehouse</span></h4>
				</div>
				<form id="create-warehouse-form" className="myForm" onSubmit={onFormSubmit}>
					<div className="formGrid">
						<div class="warehouse-type">
							<h5>
								Warehouse Type
							</h5>
							<div className="input_group" style={{display: "grid", gridTemplateColumns: "1fr", gridGap: "5px 15px"}} style={{display: "grid", gridTemplateColumns: "1fr", gridGap: "5px 15px"}}>
								<div className="form_group">
									<div className="form_label">
										<label htmlFor="">Type : </label>
									</div>
									<div className="form_select">
										<select required={true} name="" id="input_warehousetype" onChange={(e) => setWarehouseType(e.target.value)}>
											<option value="" className="FirstOption" disabled selected >--Select--</option>
											<option value="A">National Reserve Warehouse</option>
											<option value="B">State Central Warehouse</option>
											<option value="C">District Warehouse</option>
											<option value="D">District Strong Room</option>

											<option value="E">Strong Room for AC</option>
											<option value="F">Strong Room for AS (PC)</option>
											<option value="G">Strong Room for Polled Units</option>
											<option value="H">Strong Room for Units under Counting</option>

											<option value="I">Strong Room for units under EP Period</option>
											<option value="J">Strong Room for EP Marked units</option>
											<option value="K">Defective EVM Warehouse</option>
											<option value="L">Reserve Units Strong Room</option>

											<option value="M">T&A Warehouse</option>
											<option value="N">Virtual Warehouse</option>
											<option value="O">Virtual Strong Room</option>
											<option value="P">Manufacturer Warehouse</option>
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
										<select required name="" id="input_buildingtype" onChange={(e) => setBuildingType(e.target.value)} >
											<option value="" className="FirstOption" disabled selected >--Select--</option>
											<option value="P">Permanent</option>
											<option value="T">Temporary</option>
										</select>
										<div className="input_icon">
											<FaRegBuilding size="1em" />
										</div>
									</div>
								</div>

								<div className="form_group">
									<div className="form_label">
										<label htmlFor="">Sealed  : </label>
									</div>
									<div className="form_select">
										<select required name="" id="input_sealed" onChange={(e) => setisSealed(e.target.value)}>
											<option value="" className="FirstOption">--Select--</option>
											<option value="I">Yes</option>
											<option value="A">No</option>
										</select>
										<div className="input_icon">
											<BsShieldLockFill size="1em" />
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="warehouse-location">
							<h5>
								Warehouse Location
							</h5>
							<div className="input_group">
								<div className="form_group" style={{gridArea : "1 / 1 / 2 / 3" }} style={{gridArea : "1 / 1 / 2 / 3" }}>
									<div className="form_label">
										<label htmlFor="">Address : </label>
									</div>
									<div className="form_input">
										<input required id="input_address" name="" className="" placeholder="Warehouse Address" onChange={(e) => setAddress(e.target.value)} />
										<div className="input_icon">
											<FaMapMarkedAlt size="1em" />
										</div>
									</div>

								</div>

								{/* {/* <div className="form_group">
									<div className="form_label">
										<label htmlFor="">PC Code : </label>
									</div>
<<<<<<< HEAD
									<div className="form_select">
										<select required name="" id="input_PC" onChange={(e) => setPcFunc(e.target.value)}>
											<option value="">--Select--</option>
											{PCs.map((pc) => (
												<option value={pc} className="text-black">
													{pc}
												</option>
											))}
										</select>
=======
									<div className="form_input">
<<<<<<< src/src/pages/warehouse_management/AddWarehouse.jsx
										<input required id="input_code" name="code" className="" placeholder="Warehouse Code" onChange={(e) => setWarehouseCode(e.target.value)} />
=======
										<input id="input_code" name="code" className="" placeholder="Warehouse Code" onChange={(e) => setWarehouseCode(e.target.value)} />
										<div className="input_icon">
											<FaLaptopHouse size="1em" />
										</div>
									</div>
								</div>

								<div className="form_group">
									<div className="form_label">
										<label htmlFor="">State : </label>
									</div>
									<div className="form_select">
										<select required name="" id="input_state" onChange={(e) => setStateFunc(e.target.value)}>
											<option value="" disabled selected >--Select--</option>
											{states.map((st) => (
												<option value={st} className="text-black">
													{st}
												</option>
											))}
										</select>
										<div className="input_icon">
											<FaMapMarkedAlt size="1em" />
										</div>
									</div>

								</div>

								<div className="form_group">
>>>>>>> ed7d1f8 (Revert "Merge branch 'dev' into 'dev'")
									<div className="form_label">
<<<<<<< src/src/pages/warehouse_management/AddWarehouse.jsx
										<label htmlFor="">PC Code : </label>
									</div>
<<<<<<< HEAD
									<div className="form_select">
										<select required name="" id="input_PC" onChange={(e) => setPcFunc(e.target.value)}>
											<option value="">--Select--</option>
											{PCs.map((pc) => (
												<option value={pc} className="text-black">
													{pc}
												</option>
											))}
										</select>
>>>>>>> src/src/pages/warehouse_management/AddWarehouse.jsx
										<div className="input_icon">
											<FaLaptopHouse size="1em" />
										</div>
									</div>
								</div> */}

								<div className="form_group">
									<div className="form_label">
										<label htmlFor="">State : </label>
									</div>
									<div className="form_select">
										<select required name="" id="input_state" onChange={(e) => setStateFunc(e.target.value)}>
											<option value="" disabled selected >--Select--</option>
											{states.map((st) => (
												<option value={st} className="text-black">
													{st}
												</option>
											))}
										</select>
										<div className="input_icon">
											<FaMapMarkedAlt size="1em" />
										</div>
									</div>

								</div>

								<div className="form_group">
									<div className="form_label">
<<<<<<< src/src/pages/warehouse_management/AddWarehouse.jsx
										<label htmlFor="">PC Code : </label>
									</div>
									<div className="form_select">
										<select required name="" id="input_PC" onChange={(e) => setPcFunc(e.target.value)}>
											<option value="">--Select--</option>
											{PCs.map((pc) => (
												<option value={pc} className="text-black">
													{pc}
												</option>
											))}
										</select>
=======
										<label htmlFor="">Latitude : </label>
									</div>
									<div className="form_input">
										<input required type={"number"} step="any" id="input_lat" name="" className="" placeholder="Latitude" onChange={(e) => setLat(e.target.value)} />
>>>>>>> src/src/pages/warehouse_management/AddWarehouse.jsx
										<div className="input_icon">
											<FaLaptopHouse size="1em" />
										</div>
									</div>
								</div>

								<div className="form_group">
									<div className="form_label">
<<<<<<< src/src/pages/warehouse_management/AddWarehouse.jsx
										<label htmlFor="">Latitude : </label>
									</div>
									<div className="form_input">
										<input required type={"number"} step="any" id="input_lat" name="" className="" placeholder="Latitude" onChange={(e) => setLat(e.target.value)} />
										<div className="input_icon">
											<FaLaptopHouse size="1em" />
										</div>
									</div>
								</div>

								<div className="form_group">
									<div className="form_label">
										<label htmlFor="">Longitude : </label>
									</div>
									<div className="form_input">
										<input required id="input_lng" type={"number"} step="any" name="" className="" placeholder="Longitude" onChange={(e) => setLng(e.target.value)} />
=======
										<label htmlFor="">Longitude : </label>
									</div>
									<div className="form_input">
										<input required id="input_lng" type={"number"} step="any" name="" className="" placeholder="Longitude" onChange={(e) => setLng(e.target.value)} />
										<div className="input_icon">
											<FaLaptopHouse size="1em" />
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
								<div className="form_group" style={{  gridArea: "1 / 1 / 2 / 4"  }}>
									<div className="form_radio">
										<label htmlFor="double_lock_yes">Double Lock System: </label>
										<label htmlFor="double_lock_yes">Yes </label>
										<input type={"radio"} name="double_lock" id="double_lock_yes" defaultChecked={true} value="1" onChange={(e) => {
											// console.log("Yes")
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
										<label htmlFor="">Personnel 1 User ID : </label>
									</div>
									<div className="form_input">
										<input required placeholder="AA000000RRRRR" id="input_personName_1" name="" onChange={(e) => setPersonName1(e.target.value)} />
										<div className="input_icon">
											<BsFillPersonFill size="1em" />
										</div>
									</div>
								</div>

								{/* {/* <div className="form_group">
									<div className="form_label">
										<label htmlFor="">Person Mobile: </label>
									</div>
									<div className="form_input">
										<input type={"tel"} placeholder="Mobile" id="input_personMobile_1" name="" onChange={(e) => setPersonMobile1(e.target.value) } />
										<div className="input_icon">
											<BsFillTelephoneFill size="1em" />
										</div>
									</div>
								</div>

								<div className="form_group">
									<div className="form_label">
										<label htmlFor="">Person Designation: </label>
									</div>
									<div className="form_input">
										<input type="text" id="input_personDesignation_1" placeholder="Enter Designation" onChange={(e) => setPersonDesignation1(e.target.value)}/>
										<div className="input_icon">
											<MdWork size="1em" />
										</div>
									</div>
								</div> */} */}

								<div className="form_group" hidden={!doubleLockSystem}>
									<div className="form_label">
										<label htmlFor="">Personnel 2 User ID : </label>
									</div>
									<div className="form_input">
										<input required={doubleLockSystem} placeholder="AA000000RRRRR" id="input_personName_2" name="" onChange={(e) => setPersonName2(e.target.value)} />
										<div className="input_icon">
											<BsFillPersonFill size="1em" />
										</div>
									</div>
								</div>

								{/* {/* <div className="form_group" hidden={!doubleLockSystem}>
									<div className="form_label">
										<label htmlFor="">Person Mobile: </label>
									</div>
									<div className="form_input">
										<input type={"tel"} placeholder="Mobile" id="input_personMobile_2" name="" onChange={(e) => setPersonMobile2(e.target.value)} />
										<div className="input_icon">
											<BsFillTelephoneFill size="1em" />
										</div>
									</div>
								</div>

								<div className="form_group" hidden={!doubleLockSystem}>
									<div className="form_label">
										<label htmlFor="">Person Designation: </label>
									</div>
									<div className="form_input">
										<input type="text" id="input_personDesignation_2" placeholder="Enter Designation" onChange={(e) => setPersonDesignation2(e.target.value)}/>
										<div className="input_icon">
											<MdWork size="1em" />
										</div>
									</div>
								</div> */} */}

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
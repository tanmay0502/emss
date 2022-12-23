import React from "react";
import { useState, useEffect } from "react";
import Footer from "../../components/Footer";
import Otp from "../../components/Otp";
import Password from "../../components/Password";
import SelectUser from "../../components/SelectUser";
import jwt_decode from "jwt-decode";
var sha256 = require("js-sha256");

function getKeyByValue(object, value) {
	return Object.keys(object).find(key => object[key] === value);
}

const Login = () => {
	const myFont = {
		fontFamily: "Nunito Sans",
		fontStyle: "normal",
		fontWeight: "800",
		fontSize: "19px",
		lineHeight: "35px",
		color: "black",
	};

	const [isOTPSent, setIsOTPSent] = useState(0);
	const [isMobile, setIsMobile] = useState(0);
	const [passwordBlock, setPasswordBlock] = useState(0);
	const [selectUserBlock, setSelectUserBlock] = useState(0);
	const [nonce, setNonce] = useState(null)

	// user Details

	const [userID, setUserID] = useState("");
	const [OTP, setOTP] = useState("");
	const [password, setPassword] = useState("");
	const [mobile, setMobile] = useState("");
	const [state, setState] = useState("");
	const [Dist, setDist] = useState("");
	const [AC, setAC] = useState("");
	const [role, setRole] = useState("");
	const [invaliduser, setInvalidUser] = useState("");
	const [invalidOTP, setInvalidOTP] = useState("");
	const [invalidPassword, setInvalidPassword] = useState("");
	const [invalidMobile, setInvalidMobile] = useState("");
	const [invalidUsers, setInvalidUsers] = useState("");

	const [userIDs, setUserIds] = useState([]);
	const [states, setStates] = useState({});
	// const [statesCode, setStatesCode] = useState([]);
	const [Dists, setDists] = useState({});
	// const [DistsCode, setDistsCode] = useState(["00"]);
	const [ACs, setACs] = useState({});
	// const [ACsCode, setACsCode] = useState(["000"]);
	const [roles, setRoles] = useState([]);
	const [rolesCode, setRolesCode] = useState([]);


	const [flag1, setFlag1] = useState(0);




	useEffect(() => {

		if (Dists === {}) {
			if (document.getElementById("DistDropdown"))
				document.getElementById("DistDropdown").value = "0";
		}
		if (ACs === {}) {
			if (document.getElementById("acDropdown"))
				document.getElementById("acDropdown").value = "0";
		}
		if (roles === {}) {
			if (document.getElementById("roleDropdown"))
				document.getElementById("roleDropdown").value = "0";
		}
		if ((Dists && ACs && roles) && (Dists != {} || ACs != {} || roles.length != 0)) {
			// checkEmpty();
		}

	}, [states, Dists, ACs, roles])

	function checkEmpty() {
		if (userID.length == 0) {
			if (document.getElementById("stateDropdown") && document.getElementById("DistDropdown") && document.getElementById("roleDropdown") && document.getElementById("acDropdown")) {
				document.getElementById("stateDropdown").value = "0";
				document.getElementById("DistDropdown").value = "0";
				document.getElementById("acDropdown").value = "0";
				document.getElementById("roleDropdown").value = "0";

			}
			setDists({})
			setACs({})
			setRoles([])
			// console.log("checked")
		}
	}

	useEffect(() => {
		if(userID.length===0){
			checkEmpty();
		}

		if ((userID.length > 0 && Number(userID)) || (userID.length > 0 && userID[0] == "0")) {
			if (document.getElementById("stateDropdown") && document.getElementById("DistDropdown") && document.getElementById("roleDropdown") && document.getElementById("acDropdown") && document.getElementById("dropDowns")) {
				document.getElementById("stateDropdown").setAttribute("disabled", "disabled")
				document.getElementById("DistDropdown").setAttribute("disabled", "disabled")
				document.getElementById("acDropdown").setAttribute("disabled", "disabled")
				document.getElementById("roleDropdown").setAttribute("disabled", "disabled")
				document.getElementById("dropDowns").style.opacity = "1"
				setFlag1(1)
			}
			getState()
			setDists({})
			setACs({})
			setRoles([])
			// console.log("hurry")
		}
		else {
			if (document.getElementById("stateDropdown") && document.getElementById("DistDropdown") && document.getElementById("roleDropdown") && document.getElementById("acDropdown") && document.getElementById("dropDowns")) {
				document.getElementById("stateDropdown").removeAttribute("disabled")
				document.getElementById("DistDropdown").removeAttribute("disabled")
				document.getElementById("acDropdown").removeAttribute("disabled")
				document.getElementById("roleDropdown").removeAttribute("disabled")
				document.getElementById("dropDowns").style.opacity = "1"
				setFlag1(0)
			}
			//  console.log("userid",userID)

			if (userID.length >= 2) {
				const statecode = userID.substring(0, 2);
				// console.log(userID, states)
				var key = states && states != {} ? getKeyByValue(states, statecode) : undefined;
				if (key !== undefined) {
					if (document.getElementById("stateDropdown")) {
						document.getElementById("stateDropdown").value =
							states != {} ? key : "";

					}
					setStateFunc(key, false);
				} else {
					if (document.getElementById("stateDropdown"))
						document.getElementById("stateDropdown").value = "Select:";
				}
			}
			else {
				if (document.getElementById("stateDropdown"))
					document.getElementById("stateDropdown").value = "0";
				setDists([])


			}
			if (userID.length >= 5 && Dists) {
				var Distcode = parseInt(userID.substring(2, 5)).toString();
				const pwDistode = userID.substring(2, 5);
				var key = Dists != {} ? getKeyByValue(Dists, pwDistode) : undefined
				if (key != undefined) {
					Distcode = pwDistode;
				}
				console.log(pwDistode,Distcode)

				if (getKeyByValue(Dists, Distcode) !== undefined) {
					console.log("lkk",key);
					if (document.getElementById("DistDropdown")) {
						console.log("l", Dists[Distcode]);
						document.getElementById("DistDropdown").value =
							Dists != {} ? getKeyByValue(Dists, Distcode) : "";
					}
					setDistFunc(key, false);
				} else {
					console.log("lkk")
					if (document.getElementById("DistDropdown"))
						document.getElementById("DistDropdown").value = "Select:";
				}
			}
			else {
				if (document.getElementById("DistDropdown"))
					document.getElementById("DistDropdown").value = "0";
				setACs({})


			}

			if (userID.length >= 8) {
				const accode = userID.substring(5, 8);
				console.log(accode);
				if (getKeyByValue(ACs, accode) !== undefined) {
					if (document.getElementById("acDropdown")) {
						document.getElementById("acDropdown").value =
							ACs != {} ? getKeyByValue(ACs, accode) : "";
					}
					setACFunc(getKeyByValue(ACs, accode), false);
				} else {
					if (document.getElementById("acDropdown"))
						document.getElementById("acDropdown").value = "";
				}

				const role = userID.substring(8);
				if (Number(role)) {
					setRoles([]);
				}

				if (rolesCode && rolesCode.indexOf(role) !== -1) {
					// console.log("Readable Role:");
					// console.log(roles[rolesCode.indexOf(role)]);
					if (document.getElementById("roleDropdown"))
						document.getElementById("roleDropdown").value =
							roles[rolesCode.indexOf(role)];
					setRoleFunc(roles[rolesCode.indexOf(role)], false);
				}
			}
			else {
				if (document.getElementById("acDropdown"))
					document.getElementById("acDropdown").value = "0";





			}
			if (userID.length <= 8) {
				console.log("ff")
				if (document.getElementById("roleDropdown"))
					document.getElementById("roleDropdown").value = "0";
				setRoles([])
			}
		}

		return () => { };
	}, [userID]);

	async function getState() {
		try {
			const response = await fetch(
				`${process.env.REACT_APP_API_SERVER}/user/getStateList`,
				{
					method: "POST",
					headers: {
					  "Content-Type": "application/json",
					},
					credentials: 'include',
				}
			);
			const data2 = await response.json();
			console.log(data2);
			setStates(data2["data"]);
			checkEmpty()
		} catch (err) {
			console.log(err);
		}
	}
	// getState();

	
	useEffect(() => {
		// sessionStorage.setItem("log", null)
		// console.log(window.sessionStorage.getItem("sessionToken"), sessionStorage.getItem("log"), null)
		if (window.localStorage.getItem("token") !== null) {
			window.location.pathname = "/session/home";
		}

		getState();
		// getRoles();
	}, []);

	async function setStateFunc(st, changeUserID = true) {
		if (st !== "Select:") {
			console.log(st);
			setState(states[st]);

			try {
				const response = await fetch(
					`${process.env.REACT_APP_API_SERVER}/user/getDistrictList`,
					{
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body:JSON.stringify({
							"stateCode":states[st]
						})
					}
				);
				const data2 = await response.json();
				console.log(data2);
				if (userID.length != 0) {
					if (data2["status"] == 502) {
						setDists({});
					}
					else {
						setDists(data2["data"]);
					}

				}

			} catch (err) {
				console.log(err);
				setDists({});
			}
		


			if (changeUserID) {
				setUserID(
					states[st]
				);
			}
			setInvalidUser("");
		}
	}
	async function setDistFunc(st, changeUserID = true) {
		console.log(st,Dists[st])
		setDist(Dists[st]);
		if (state !== "Select:") {
			if (0) {
			} else {
				try {
					const response = await fetch(
						`${process.env.REACT_APP_API_SERVER}/user/getACList`,
						{
							method: "POST",
							headers: {
								"Content-Type": "application/json",
							},
							mode: "cors",
							body:JSON.stringify({
								"stateCode":state,
								"districtCode":Dist
							})
							
						}
					);
					const data2 = await response.json();
					console.log("ACs");
					console.log(data2);

					if (userID.length != 0) {

						if (data2["data"] == 502) {
							setACs({})
						}
						else {
							setACs(data2["acs"])
						}

					}
				} catch (err) {
					console.log(err);
					setACs({})
				}

				setACs(prevState => ({ ...prevState, "None": "000" }));

			}
			if (changeUserID) {
				setUserID(
					state +  Dists[st]
				);
				setDist(Dists[st]);
			}
			setInvalidUser("");
		}
		console.log(Dist)
	}
	async function setACFunc(st, changeUserID = true) {
		setAC(ACs[st]);
		console.log(ACs)
		console.log(Dist)
		try {
			const response = await fetch(
				`${process.env.REACT_APP_API_SERVER}/user/getRolesList`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					}
				}
			);
			const data2 = await response.json();
			console.log(data2);
			// if(userID.length>=8 && userID.substring(5,8)=="000"){
			// 	setACs({"000":"000"});
			// 	console.log("jdjdj")
			// 	if (document.getElementById("acDropdown"))
			// 		document.getElementById("acDropdown").value = "000";
			// 		setAC("000")
			// }

			if (userID.length != 0) {
				let p1 = []
				let p2 = []
				Object.keys(data2["data"]).map((key) => {
					p1.push(key);
					p2.push(data2["data"][key])
				})

				setRoles(p1);
				setRolesCode(p2);
			}


		} catch (err) {
			console.log(err);
		}
		if (changeUserID) {
			setUserID(
				state +
				("000" + Dist).slice(-3) +
				("000" + ACs[st]).slice(-3)
			);
		}
		setInvalidUser("");
	}
	async function setRoleFunc(st, changeUserID = true) {
		if (st !== "Select:") {
			setRole(rolesCode[roles.indexOf(st)]);
			console.log(rolesCode[roles.indexOf(st)]);

			if (changeUserID) {
				setUserID(
					state + ("000" + Dist).slice(-3) + AC + rolesCode[roles.indexOf(st)]
				);
			}
			setInvalidUser("");
			console.log(userID);
		}
	}
	async function requestOTP() {
		if (userID == "") {
			setInvalidUser("Invalid User ID");
			console.log("none");
		} else {
			
			console.log("hiiiiiiiiiiiiiiiiii")
			try {
				const response = await fetch(
					`${process.env.REACT_APP_API_SERVER}/user/GenerateOTPRequest`,
					{
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({
							textBox: userID,
						}),
						mode: "cors",
					}
				);
				const data2 = await response.json();
				console.log(data2);

				if (response.status == 200 && data2["data"]['userID']) {
					setUserIds(data2["data"]['userID'])
					setNonce(data2["data"]['nonce'])
					setMobile(data2["data"]['mobilenumber'])
					if (data2["data"]['userID'].length !== 1) {
						setSelectUserBlock(1)
					}
					else {
						setSelectUserBlock(0)
						setUserID(data2["data"]['userID'][0])
					}
					setIsOTPSent(1);
					setPasswordBlock(1)
				}
			} catch (err) {
				console.log(err);
			}
		}
	}
	

	async function requestDashboard(selectedID = null) {
		console.log(userID, password);
		try {
			const response = await fetch(
				`${process.env.REACT_APP_API_SERVER}/user/VerifyOTPRequest`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					credentials: 'include',

					body: JSON.stringify({
						'mobilenumber': mobile.toString(),
						'userid': userID.toString(),
						'otp': OTP.toString(),
						'nonce': nonce,
						'password': password.toString(),
					}),
					mode: "cors",
				}
			);
			const data2 = await response.json();
			// console.log(data2["token"], "hehgegiugigfk");
			console.log(response)
			if (response.status === 200) {
				// window.localStorage.setItem("token",JSON.stringify(data2["token"]));
				// document.cookie = "username=John Ricks"

				// alert("You are logged In");
				setIsOTPSent(0);
				setPasswordBlock(0);
				setSelectUserBlock(0);
				window.sessionStorage.setItem("sessionToken", userID);
				window.location.replace("/session/home");
			}
			else if (response.status === 401 && data2.message == "Invalid OTP") {
				setInvalidOTP("OTP does not match");
			}
			else {
				setInvalidPassword("Invalid Password");
				setPassword("");
			}
		} catch (err) {
			console.log(err);
		}
	}



	return (
		<div>
			<div className="nav flex">
				<div className="logo m-3 p-1">
					<a href="/">
						<img src="logo.png" className="h-4/5" />
					</a>
				</div>
				<div className="absolute right-3 top-3 w-5 flex">
					<div className="flex justify-between place-content-end  w-full">
						<a href="">
							<img src="Vector.png" />
						</a>
					</div>
				</div>
			</div>
			<div className="body pl-5 pr-5">
				<div className="flex ">
					<div className="img w-2/5 mt-16" style={{ marginLeft: "5%" }}>
						<img src="india.png" className=""></img>
					</div>
					<div
						className="login rounded-lg w-1/3 ml-16 mb-16"
						style={{ boxShadow: "-2px 0px 17px rgb(182, 182, 184)" }}
					>
						<div className="flex m-4 mt-8 h-14 place-content-center">
							<img src="logo.png" className=""></img>
						</div>
						<div className="m-4 mt-4 place-content-center">
							<h3 className="text-center" style={myFont}>
								<span style={{ color: "#F5811F" }}>E</span>
								<span style={{ color: "#2DA5BB" }}>V</span>
								<span style={{ color: "#00A551" }}>M</span>
								&nbsp;Management System
							</h3>
							<h3
								className="text-center "
								style={{
									fontFamily: "nunito sans",
									color: "rgba(0, 0, 0, 0.8)",
									fontSize: "14px",
								}}
							>
								Login to access your account
							</h3>
						</div>
						<hr className="ml-5 mr-5"></hr>
						<div className="m-7 mt-2 place-content-center">
							{isOTPSent == 0 && passwordBlock == 0 && selectUserBlock == 0 && (
								<>
									<p
										className="text-black pl-1 text-sm font-semibold"
										style={{ fontFamily: "nunito sans" }}
									>
										Mobile Number / User ID
									</p>

									<input
										type="text"
										className="pl-3 pr-3 mt-1 mb-4 h-13 text-black outline-none rounded-md w-full"
										placeholder="Enter Mobile Number/User ID"
										value={userID}
										onChange={(e) => setUserID(e.target.value)}
										style={{
											backgroundColor: " rgba(30, 76, 247, 0.1)",
											fontFamily: "nunito sans",
										}}
									></input>
									{invaliduser != "" && (
										<div className="text-red-500">{invaliduser}</div>
									)}
									{invalidMobile != "" && (
										<div className="text-red-500">{invalidMobile}</div>
									)}
									<p
										className="  text-center text-black text-sm font-semibold"
										style={{ fontFamily: "nunito sans" }}
									>
										OR
									</p>
									<div
										className="mobile-tab  place-content-center border-2 mt-2 rounded-lg p-4"
										style={{ border: "1px solid #717171" }}
									>
										<div id="dropDowns">
											<div className="dropdown">
												<p
													htmlFor="state"
													className="text-black ml-2 -mb-6 text-sm font-semibold"
													style={{ fontFamily: "nunito sans" }}
												>
													{(states == {} || flag1 == 1) && <span className="opacity-40">State</span>}
													{states != {} && flag1 == 0 && <>State</>}
												</p>
												{(states == {} || flag1 == 1) && (<select className="pl-3 pr-3 mt-7 h-13 text-black outline-none rounded-md w-full mb-5 opacity-40" disabled
													id="stateDropdown"
												>
													<option value="0" className="text-black">
														Select:
													</option>
												</select>)}
												{states != {} && flag1 == 0 &&
													<select
														className="pl-3 pr-3 mt-7 h-13 text-black outline-none rounded-md w-full mb-5"
														style={{ fontFamily: "nunito sans" }}

														name="state"
														// value={state}
														onChange={(e) => setStateFunc(e.target.value)}
														id="stateDropdown"
													>

														<option value="0" className="text-black">
															Select:
														</option>

														{states &&
															Object.keys(states).map((st) => (
																<option value={st} className="text-black">
																	{st}
																</option>
															))}
														{states == {} && (<option value="0" className="text-black">
															Select:
														</option>)}
													</select>
												}
											</div>
											<div className="dropdown">
												<p
													htmlFor="Dist"
													className="text-black ml-2 -mb-6 text-sm font-semibold"
													style={{ fontFamily: "nunito sans" }}
												>
													{(Dists === {} || flag1 == 1) && <span className="opacity-40">District Code</span>}
													{(Dists !== {} && flag1 == 0) && <>District Code</>}
												</p>
												{Dists == {} && <div>
													<select className="pl-3 pr-3 mt-7 h-13 text-black outline-none rounded-md w-full mb-5 opacity-40" disabled
														id="DistDropdown"
													>
														<option value="0" className="text-black">
															Select:
														</option>
													</select>
												</div>}
												{Dists != {} &&  (
													<select
														className="pl-3 pr-3 mt-7 h-13 text-black outline-none rounded-md w-full mb-5"
														style={{ fontFamily: "nunito sans" }}
														id="DistDropdown"
														name="Dist"
														// value={Dist}
														onChange={(e) => setDistFunc(e.target.value)}
													>
														<option value="0" className="text-black">
															Select:
														</option>
														{Dists &&
															Object.keys(Dists).map((st) => (
																<option value={st} className="text-black">
																	{st}
																</option>
															))}
													</select>
												)}

											</div>
											<div className="dropdown">
												<p
													htmlFor="ac"
													className="text-black ml-2 -mb-6 text-sm font-semibold"
													style={{ fontFamily: "nunito sans" }}
												>
													{(ACs === {} || flag1 == 1) && <span className="opacity-40">AC</span>}
													{(ACs !== {} && flag1 == 0) && <>AC</>}
												</p>
												{ACs == {} && (<select className="pl-3 pr-3  mt-7 h-13 text-black outline-none rounded-md w-full mb-5 opacity-40" disabled
													id="acDropdown"
												>
													<option value="0" className="text-black">
														Select:
													</option>
												</select>)}
												{ACs != {} &&
													<select
														className="pl-3 pr-3  mt-7 h-13 text-black outline-none rounded-md w-full mb-5"
														style={{ fontFamily: "nunito sans" }}
														name="ac"
														id="acDropdown"
														// value={AC}
														onChange={(e) => setACFunc(e.target.value)}
													>
														<option value="0" className="text-black">
															Select:
														</option>
														{ACs &&
															Object.keys(ACs).map((st) => (
																<option value={st} className="text-black">
																	{st}
																</option>
															))}
													</select>
												}
											</div>
											<div className="dropdown">
												<p
													htmlFor="role"
													className="text-black ml-2 -mb-6 text-sm font-semibold"
													style={{ fontFamily: "nunito sans" }}
												>
													{roles && roles.length == 0 ? <>Role</> : <span className="">Role</span>}
												</p>
												{/* {roles.length == 0 && (
													<select
														className="pl-3 pr-3 mt-7 h-13 text-black outline-none rounded-md w-full mb-3 opacity-40"
														disabled
														id="roleDropdown"

													><option value="0" className="text-black">
															Select:
														</option>
													</select>
												)} */}
												{
													<select
														className="pl-3 pr-3 mt-7 h-13 text-black outline-none rounded-md w-full mb-3"
														style={{ fontFamily: "nunito sans" }}
														name="role"
														disabled={roles && roles.length == 0}
														id="roleDropdown"
														// value={role}
														onChange={(e) => setRoleFunc(e.target.value)}
													>
														<option value="0" className="text-black">
															Select:
														</option>
														{roles &&
															roles.map((st) => (
																<option value={st} className="text-black">
																	{st}
																</option>
															))}
													</select>
												}

											</div>

										</div>
										<button
											onClick={requestOTP}
											type="button"
											className="pl-3 pr-3 mt-7 h-12 outline-none rounded-md w-full text-white bg-violet-500 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300"

										>
											Request OTP
										</button>
									</div>

								</>
							)}

							{selectUserBlock == 1 && (
								<SelectUser
									// data={requestDashboard}
									user={setUserID}
									userID={userID}
									userIDs={userIDs}
								/>
							)}
							{isOTPSent == 1 && (
								<Otp
									// data={requestDashboard}
									OTP={OTP}
									setOTP={setOTP}
									invalidOTP={invalidOTP}
								/>
							)}

							{passwordBlock == 1 && (
								<Password
									data={requestDashboard}
									user={userID}
									password={password}
									setPassword={setPassword}
									invalidPassword={invalidPassword}
									OTP={OTP}
								/>
							)}
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default Login;

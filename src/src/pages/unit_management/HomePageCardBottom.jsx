import React from "react";
import styles from "./styles/Homepage.module.css";
import { useState, useEffect } from "react";
import RightArrow from "../../assets/icons8-right-arrow-32.png";
import FLCSchedulecard from "./FLCSchedulecard";
import FirstRandcard from "./FirstRandcard";
import SecondRandCard from "./SecondRandCard";
import ElecSchedulingCard from "./ElecSchedulingCard";
import TnASchdulingCard from "./TnASchdulingCard";
import PhysVerificationCard from "./PhysVerificationCard";
import { useNavigate } from "react-router-dom";

export default function HomePageCardBottom() {
	const navigate = useNavigate()
	const User_ID = sessionStorage.getItem("sessionToken");
	const Role = User_ID.substring(8);
	const First_Randomisation_call = async (e) => {
		const response = await fetch(`${process.env.REACT_APP_API_SERVER}/user/validate_permissionAPI`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
			body: JSON.stringify({
				moduleName: "Unit",
				operation: "ScheduleFirstRandomization",
				operandState: User_ID.substring(0, 2),
				operandDist: User_ID.substring(2, 5),
				operandAC: User_ID.substring(5, 8),
				operandRole: "-",
			}),
		});

		const data = await response.json();

		if (Role == "CEO") {
			navigate(`/session/unitmanagement/first_randomisation_scheduling`);
		}
		// else if (Role == "DEO") {
		// 	navigate(`/session/unitmanagement/firstrandomization`);
		// }
	};

	const Second_Randomisation_call = (e) => {
		if (Role == "DEO") {
			navigate(`/session/unitmanagement/second_randomisation_scheduling`);
		} else if (Role == "RO") {
			navigate(`/session/unitmanagement/secondrandomization`);
		}
	};
	const [cardVal, setcardVal] = useState("FLC Scheduling");

	const cardRedirect = (e) => {
		if (cardVal === "FLC Scheduling") {
			navigate("/session/unitmanagement/flc_list");
		} else if (cardVal === "1st Randomisation Scheduling") {
			First_Randomisation_call();
		} else if (cardVal === "2nd Randomisation Scheduling") {
			Second_Randomisation_call();
		} else if (cardVal === "Election Scheduling") {
			navigate(`/session/unitmanagement/schedule_list`);
		} else if (cardVal === "TnA Scheduling") {
			navigate(`/session/unitmanagement/schedule_tna_list`);
		} else if (cardVal === "Physical Verification") {
			navigate(`/session/unitmanagement/schedule_varification_list`);
		}
	};

	const [flc, setflc] = useState([]);
	async function getFLC() {
		try {
			const response = await fetch(`${process.env.REACT_APP_API_SERVER}/unit/dashboard_cards`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				credentials: "include",
				body: JSON.stringify({

					"stateFilter": "TS",
					"distFilter": "BDK",
					"schedsFilter": "flc"

				}),
			});
			const data = await response.json();
			console.log("mydata");
			console.log(data);

			if (data["data"].length !== 0) {
				setflc({ ...data["data"] });
				console.log(flc);
			}
		} catch (err) {
			console.log({ err });
		}
	}

	useEffect(() => {
		getFLC();
	}, []);

	return (
		<div className={styles.myCardSampleHover}>
			<div className="flex justify-center">
				<select
					className={styles.Box123}
					style={{ fontSize: "20px", display: "flex", margin: "auto", width: "88%" }}
					value={cardVal}
					onChange={(e) => {
						setcardVal(e.target.value);
					}}
				>
					<option className="bg-white text-black" value="FLC Scheduling">
						FLC Scheduling
					</option>
					<option className="bg-white text-black" value="1st Randomisation Scheduling">
						1st Randomisation Scheduling
					</option>
					<option className="bg-white text-black" value="2nd Randomisation Scheduling">
						2nd Randomisation Scheduling
					</option>
					<option className="bg-white text-black" value="Election Scheduling">
						Election Scheduling
					</option>
					<option className="bg-white text-black" value="TnA Scheduling">
						TnA Scheduling
					</option>
					<option className="bg-white text-black" value="Physical Verification">
						Physical Verification
					</option>
				</select>

				<img src={RightArrow} alt="" style={{ display: "flex", margin: "auto", height: "100%" }} onClick={cardRedirect} />
			</div>
			{(() => {
				if (cardVal === "FLC Scheduling") {
					return <FLCSchedulecard data={flc["flc"]} />;
				} else if (cardVal === "1st Randomisation Scheduling") {
					return <FirstRandcard />;
				} else if (cardVal === "2nd Randomisation Scheduling") {
					return <SecondRandCard />;
				} else if (cardVal === "Election Scheduling") {
					return <ElecSchedulingCard />;
				} else if (cardVal === "TnA Scheduling") {
					return <TnASchdulingCard />;
				} else if (cardVal === "Physical Verification") {
					return <PhysVerificationCard />;
				}
			})()}
		</div>
	);
}

import React from 'react'
import { useState, useEffect} from 'react';

export default function FLCSchedulecard({state, dist}) {
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
					"stateFilter": state,
					"distFilter": dist,
					"schedsFilter": "scndRand"
				}),
			});
			const data = await response.json();
			console.log("mydata");
			console.log(data);

			if (data.status === 200) {
				setflc([])
				data["data"].map((el)=>setflc(old => [...old, el]))
				console.log(flc);
			}
		} catch (err) {
			console.log({ err });
		}
	}

	useEffect(() => {
		getFLC();
	}, [state, dist]);

  return (
	<table style={{fontSize: "15px", width: "100%", marginTop: "15px", textAlign: "center"}}>
		<thead>
			<tr style={{padding: "0px", width: "100%", display: "contents", paddingBottom: "20px" }}>
				<th className="pr-2" style={{width: "5%", paddingLeft: "0px"}}>Dist</th>
				<th style={{padding: "0px", width: "85%"}}>Dates</th>
			</tr>
		</thead>

		<tbody>
			{flc !== undefined && flc.map((el)=>{
				return(
					<tr style={{width: "100%"}}>
						<td className="pl-0 pr-2" style={{width: "5%", paddingLeft: "0px"}}>{el["area"]}</td>
						<td className="px-0" style={{width: "85%"}}>{el["startdate"]}-{el["enddate"]}</td>
					</tr>
				)
			})}
		</tbody>
	</table>
  )
}


// import React from "react";
// import DynamicDataTable from "@langleyfoxall/react-dynamic-data-table";
// import { useState, useEffect } from "react";
// import { useNavigate } from 'react-router-dom'
// import styles from './styles/TnaList.module.css';
// import { AiOutlineSortAscending, AiOutlineSortDescending } from "react-icons/ai";
// import { ReactComponent as SearchInputElement } from '../../assets/searchInputIcon.svg';
// import { ReactComponent as ChevronDown } from '../../assets/ChevronDown.svg';

// export default function FirstRandcard() {


// 	const navigate = useNavigate()
// 	const [isDetail, setIsDetail] = useState(0);
// 	const [tableFilter, setTableFilter] = useState("");
// 	const [tableData, setTableData] = useState([])
// 	const [secondrandomization_list, setsecondrandomization_list] = useState([])
// 	const [isLoading, setIsLoading] = useState(0);

// 	// const secondrandomization_list = [{ 'ID': 2, 'Election': 'GA 2022', 'Start_Date': '02-01-2022', 'End_Date': '20-02-2022' }, { 'ID': 3, 'Election': 'GA 2022', 'Start_Date': '02-01-2022', 'End_Date': '20-02-2022' }, { 'ID': 4, 'Election': 'GA 2022', 'Start_Date': '02-01-2022', 'End_Date': '20-02-2022' }, { 'ID': 5, 'Election': 'GA 2022', 'Start_Date': '02-01-2022', 'End_Date': '20-02-2022' }, { 'ID': 6, 'Election': 'GA 2022', 'Start_Date': '02-01-2022', 'End_Date': '20-02-2022' }]

// 	const User_ID = sessionStorage.getItem("sessionToken");
// 	const Role = User_ID.substring(8);

// 	const Second_Randomisation_call = async (id) => {
// 		const response = await fetch(`${process.env.REACT_APP_API_SERVER}/user/validate_permissionAPI`, {
// 			method: "POST",
// 			headers: {
// 				"Content-Type": "application/json",
// 			},
// 			credentials: "include",
// 			body: JSON.stringify({
// 				moduleName: "Unit",
// 				operation: "SecondRandomization",
// 				operandState: User_ID.substring(0, 2),
// 				operandDist: User_ID.substring(2, 5),
// 				operandAC: User_ID.substring(5, 8),
// 				operandRole: "-",
// 			}),
// 		});

// 		const data = await response.json();
// 		if (response.status == 200) {
// 			navigate('/session/unitmanagement/secondrandomization/' + id)
// 		}

// 	};


// 	async function getfetch_second_randamization_schedule() {
// 		try {
// 			const response = await fetch(
// 				`${process.env.REACT_APP_API_SERVER}/unit/fetch-second-randomization-schedule`,
// 				{
// 					method: "POST",
// 					headers: {
// 						"Content-Type": "application/json",
// 					},
// 					credentials: 'include'
// 				}
// 			);
// 			const data = await response.json();
// 			console.log(data, "listFLC")
// 			if (data.length) {
// 				setsecondrandomization_list(data)
// 			}
// 		} catch (err) {
// 			console.log({ err });
// 		}
// 	}

// 	useEffect(
// 		() => {

// 			setIsLoading(1);

// 			let timer1 = setTimeout(() => getfetch_second_randamization_schedule(), 1 * 1000);

// 			return () => {
// 				clearTimeout(timer1);
// 			};
// 		},
// 		[isLoading]
// 	);

// 	useEffect(() => {
// 		if (secondrandomization_list) {
// 			var data = secondrandomization_list.filter((elem) => {
// 				if (tableFilter === "") {
// 					return true;
// 				}
// 				else {
// 					// const filter = tableFilter.toLowerCase();
// 					// return (elem["userid"].toLowerCase().includes(filter) || elem["name"].toLowerCase().includes(filter))
// 				}
// 			}).map((val) => {
// 				let st = ""
// 				let ed = ""
// 				try {
// 					// st = st + val['startdate'].slice(0, 10)
// 					// ed = ed + val["enddate"].slice(0, 10)
// 				} catch (err) {
// 					// st = ""
// 					console.log(err)
// 				}

// 				return {
// 					'ID': val['randomizationid'],
// 					'Election': val['election'],
// 					'Start Date': val['startdate'],
// 					'End Date': val['enddate'],
// 					'Suppl': val['supplementary'] ? 'Yes' : "No",
// 				}
// 			})
// 			setTableData(data)

// 		}
// 		return () => {

// 		}
// 	}, [secondrandomization_list])

// 	return (
// 		<>

// 			{isDetail === 0 ?
// 				<>
// 					<DynamicDataTable
// 						// rows={tableData.length != 0 ? tableData : [{ "": "Not scheduled" }]}
// 						rows={tableData.length != 0 ? tableData : ''}
// 						fieldsToExclude={["ID"]}
// 						buttons={[]}
// 						onClick={(event, row) => {
// 							Second_Randomisation_call(row["ID"])
// 						}}
// 					/>
// 				</>
// 				: <div className={styles.ListLoader}></div>
// 			}
// 		</>
// 	)
// }

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
					"schedsFilter": "frstRand"
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


//   const navigate = useNavigate()
//   const [sortOrder, setSortOrder] = useState("asc");
//   const [sortBy, setSortBy] = useState("None");
//   const [isDetail, setIsDetail] = useState(0);
//   const [tableFilter, setTableFilter] = useState("");
//   const [tableData, setTableData] = useState([])
//   // const [firstrandomization_list, setfirstrandomization_list] = useState([])
//   const [flcValue, setFlcValue] = useState([])
//   const [isLoading, setIsLoading] = useState(0);

//   const firstrandomization_list = [{ 'ID': 2, 'Election': 'GA 2022', 'Start_Date': '02-01-2022', 'End_Date': '20-02-2022' }, { 'ID': 3, 'Election': 'GA 2022', 'Start_Date': '02-01-2022', 'End_Date': '20-02-2022' }, { 'ID': 4, 'Election': 'GA 2022', 'Start_Date': '02-01-2022', 'End_Date': '20-02-2022' }, { 'ID': 5, 'Election': 'GA 2022', 'Start_Date': '02-01-2022', 'End_Date': '20-02-2022' }, { 'ID': 6, 'Election': 'GA 2022', 'Start_Date': '02-01-2022', 'End_Date': '20-02-2022' }]

//   // async function getElectionList() {
//   //   try {
//   //     const response = await fetch(
//   //       `${process.env.REACT_APP_API_SERVER}/unit/fetch-first-randamization-schedule`,
//   //       {
//   //         method: "POST",
//   //         headers: {
//   //           "Content-Type": "application/json",
//   //         },
//   //         credentials: 'include'
//   //       }
//   //     );
//   //     const data = await response.json();
//   //     console.log(data, "listFLC")
//   //     if (data.length) {
//   //       setfirstrandomization_list(data)
//   //     }
//   //   } catch (err) {
//   //     console.log({ err });
//   //   }
//   // }

//   // useEffect(
//   //   () => {

//   //     setIsLoading(1);

//   //     let timer1 = setTimeout(() => getElectionList(), 1 * 1000);

//   //     return () => {
//   //       clearTimeout(timer1);
//   //     };
//   //   },
//   //   []
//   // );

//   useEffect(() => {
//     if (firstrandomization_list) {
//       var data = firstrandomization_list.filter((elem) => {
//         if (tableFilter === "") {
//           return true;
//         }
//         else {
//           // const filter = tableFilter.toLowerCase();
//           // return (elem["userid"].toLowerCase().includes(filter) || elem["name"].toLowerCase().includes(filter))
//         }
//       }).map((val) => {
//         let st = ""
//         let ed = ""
//         try {
//           st = st + val['startdate'].slice(0, 10)
//           ed = ed + val["enddate"].slice(0, 10)
//         } catch (err) {
//           // st = ""
//           console.log(err)
//         }

//         return {
//           'ID': val['ID'],
//           'Election': val['Election'],
//           'Start Date': val['Start_Date'],
//           'End Date': val['End_Date'],
//         }
//       })
//       setTableData(data)

//     }
//     return () => {

//     }
//   }, [firstrandomization_list])

//   console.log(firstrandomization_list, 'firstrandomization_listfirstrandomization_list')



//   return (
//     <>

//       {isDetail === 0 ?
//         <>
//           <DynamicDataTable
//             // rows={tableData.length != 0 ? tableData : [{ "": "Not scheduled" }]}
//             rows={tableData.length != 0 ? tableData : ''}
//             fieldsToExclude={["ID"]}
//             buttons={[]}
//             onClick={(event, row) => {
//               navigate('/session/unitmanagement/FirstRandomization/' + row["ID"])
//             }}
//           />
//         </>
//         : <div className={styles.ListLoader}></div>
//       }
//     </>
//   )
// }

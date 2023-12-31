import React from 'react'
import { useState, useEffect} from 'react';

export default function FLCSchedulecard({state, dist}) {
	const [flc, setflc] = useState([]);
	// let data
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
					"schedsFilter": "flc"
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
	<table style={{fontSize: "15px", width: "100%", marginTop: "15px", textAlign: "center", fontSize: '0.9em'}}>
		<thead>
			<tr style={{padding: "10px 0px", width: "100%", display: "contents"}}>
				<th className="pr-2" style={{width: "5%", paddingLeft: "0px"}}>State</th>
				<th className="px-3" style={{width: "5%"}}>FLC OK</th>
				<th className="px-3" style={{width: "5%"}}>FLC NOK</th>
				<th style={{padding: "0px", width: "85%"}}>Dates</th>
			</tr>
		</thead>

		<tbody>
			{flc !== undefined && flc.map((el)=>{
				return(
					<tr style={{width: "100%"}}>
						<td className="pl-0 pr-2" style={{width: "5%", paddingLeft: "0px"}}>{el["area"]}</td>
						<td className="px-3" style={{width: "5%"}}>{el["flcokunits"] ? el["flcokunits"] : 0}</td>
						<td className="px-3" style={{width: "5%"}}>{el["flcnotokunits"] ? el["flcnotokunits"] : 0}</td>
						<td className="px-0" style={{width: "85%"}}>{el["startdate"]}-{el["enddate"]}</td>
					</tr>
				)
			})}
		</tbody>
	</table>
  )
}

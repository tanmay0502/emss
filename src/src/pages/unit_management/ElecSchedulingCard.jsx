import React from 'react'
import { useState, useEffect} from 'react';

export default function ElecSchedulingCard() {
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
					// "stateFilter": state,
					// "distFilter": dist,
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
	}, []);

  return (
	<table style={{fontSize: "15px", width: "100%", marginTop: "15px", textAlign: "center"}}>
		<thead>
			<tr style={{padding: "0px", width: "100%", display: "contents", paddingBottom: "20px" }}>
				<th className="pr-2" style={{width: "5%", paddingLeft: "0px"}}>Dist</th>
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
						<td className="px-3" style={{width: "5%"}}>{el["flcnokunits"] ? el["flcnotokunits"] : 0}</td>
						<td className="px-0" style={{width: "85%"}}>{el["startdate"]}-{el["enddate"]}</td>
					</tr>
				)
			})}
		</tbody>
	</table>
  )
}

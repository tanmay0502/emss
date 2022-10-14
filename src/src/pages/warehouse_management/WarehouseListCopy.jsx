import React, { ReactComponent } from 'react'
import { useState, useEffect } from "react";
import './css/WarehouseList.css'
import WarehouseDetail from './WarehouseDetail';
import { FaUserEdit } from "react-icons/fa";
import { AiOutlineSortAscending, AiOutlineSortDescending } from "react-icons/ai";

import { useNavigate } from 'react-router-dom'
import { ReactComponent as SearchInputElement } from '../../assets/searchInputIcon.svg';
import { ReactComponent as ChevronDown } from '../../assets/ChevronDown.svg';
import { ReactComponent as TotalWarehouses } from '../../assets/TotalWarehouses.svg';
import { ReactComponent as PermanentWarehouses } from '../../assets/PermanentWarehouses.svg';
import { ReactComponent as TemporaryWarehouses } from '../../assets/TemporaryWarehouses.svg';

import DynamicDataTable from "@langleyfoxall/react-dynamic-data-table";
import ToggleButton from '../../components/ToggleButton';

import UserImageTest from '../../assets/UserImageTest.png'

function WarehouseList() {
	const navigate = useNavigate();
	const [Details, setDetails] = React.useState([]);
	const [warehouseMapping, setWarehouseMapping] = useState(null)

	async function getList() {
        let userId = sessionStorage.getItem('sessionToken');
        const code = userId.slice(0, 2);
        console.log(code);
        try {
            const response = await fetch(
                `http://evm.iitbhilai.ac.in:8100/warehouse/listWarehouses`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        "stateCode": code
                    }),
                })

            const data = await response.json();
			setDetails(data["data"])
        } catch (error) {
            console.log(error)
        }

    }
    useEffect(() => {
		MapWarehouseTypes();
        getList();
    }, [])

    const MapWarehouseTypes = async () => {
        try {
            const response = await fetch(
                'http://evm.iitbhilai.ac.in:8100/warehouse/warehouseTypes',
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            )
            const types = await response.json();
            // data.map(arr => {
			// 	arr = {...arr, "warehousebuildingtype": }
            // })
            // console.log(data);
            setWarehouseMapping(types);
        } catch (error) {
            console.log(error);
        }
    }

	const [isDetail, setIsDetail] = useState(0);

	const [tableData, setTableData] = useState([])
	const [tableFilter, setTableFilter] = useState("")
	const [user, setUser] = useState();
	const [sortBy, setSortBy] = useState("None")
	const [sortOrder, setSortOrder] = useState("asc")

	const sortMapping = {
		"None" : null,
		"Warehouse ID": "Warehouse ID",
		"Building Type": "BuildingType",
		"Room Type": "Room Type",
	}


	useEffect(() => {
		console.log(user);
		if (user) {
			console.log(user);
			setIsDetail(1);
		}
	}, [user]);

	function details(value) {
		console.log(value);
		setUser(value);
	}

	function close() {
		setIsDetail(0);
		setUser(null)
	}

	useEffect(() => {
		var data = Details.filter((elem) => {
			if (tableFilter === "") {
				return true;
			}
			else {
				const filter = tableFilter.toLowerCase();
				return (elem[0].toLowerCase().includes(filter) || elem[1].toLowerCase().includes(filter))
			}
		}).map((val) => {
			return {
				"Warehouse ID": val["warehouseid"],
				"Room Type": warehouseMapping ? warehouseMapping["data"][val["warehousetype"]] : "",
				"Double Locked": val["doublelock"] ? "Yes" : "No",
				Details: val,
				Edit: <button className="modifyBtn p-2 text-white" disabled={true}>
					<FaUserEdit style={{ transform: "translateX(1px)" }} />
				</button>,
				"BuildingType": val["warehousebuildingtype"],
				"Building Type": <ToggleButton userID={val["warehouseid"]} checked={val["warehousebuildingtype"] === 'P'} onToggle={(e) => {
				}} 
				customLabels={{
					"active": "Permanent",
					"inactive": "Temporary"
				}
				}/>,
				"Status": <ToggleButton userID={val["warehouseid"]} checked={val["warehousestatus"] === 'A'} onToggle={(e) => {
					if (val["warehousestatus"] !== "A") {
						ActivateWarehouse(e)
					}
					else {
						DectivateWarehouse(e)
					}
				}} 
				customLabels={{
					"active": "Unsealed",
					"inactive": "\u00a0Sealed\u00a0"
				}}
				/>
			}
		})
		data.sort(function(a, b){ 
			if(sortMapping[sortBy] !== null){
				return a[sortMapping[sortBy]].localeCompare(b[sortMapping[sortBy]]) 
			}
			else return 0;
		});
		if(sortMapping[sortBy] !== null && sortOrder === 'desc'){
			data.reverse();
		}
		// console.log(data)

		setTableData(data)
		return () => {

		}
	}, [Details, warehouseMapping, tableFilter, sortBy, sortOrder])

	
    const ActivateWarehouse = async (myId) => {
        if (window.confirm(`Are you sure you want to Activate Warehouse ${myId}? `)) {
            try {

                const response = await fetch(
                    `http://evm.iitbhilai.ac.in:8100/warehouse/activateWarehouse/${myId}`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                )

                const status = response;
                if (status.status == 200) {
                    alert("Warehouse Activated Successfully");
                    // navigate('/session/warehousemanagement');
					getList();
                }
                else {
                    alert("Deactivation Failed");
                }

            } catch (error) {
                console.log(error);
            }
        }
    }

    const DectivateWarehouse = async (myId) => {
        if (window.confirm(`Are you sure you want to Deactivate Warehouse ${myId}? `)) {
            try {

                const response = await fetch(
                    `http://evm.iitbhilai.ac.in:8100/warehouse/deactivateWarehouse/${myId}`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                )

                const status = response;
                if (status.status == 200) {
                    alert("Warehouse Deactivated Successfully");
                    // window.location.href = '/session/warehousemanagement';
					getList();
                }
                else {
                    alert("Deactivation Failed");
                }

            } catch (error) {
                console.log(error);
            }
        }
    }
	// console.log(users);
	return (
		<div className="warehouse-list-grid">
			<div className="myWrapper" style={{ position: "relative", height: "100%", gridArea: "1 / 1 / 6 / 2" }}>
				{isDetail == 0 ? <div style={{ display: "flex", "flexDirection": "row", "justifyContent": "space-between" }}>
					<h4>Warehouses</h4>
					<div style={{ display: "flex", "flexDirection": "row", alignItems: "center", justifyContent: "center" }}>
						<button className='createUserBtn' onClick={() => {
							navigate("/session/warehousemanagement/addwarehouse")
						}}>Create New</button>
						<div style={{ display: "flex", "flexDirection": "row", alignItems: "center", justifyContent: "center", background: "#F9FBFF", borderRadius: "10px", padding: "7.5px 15px 7.5px 0", fontSize: "0.8em" }}>
							<SearchInputElement style={{ margin: "0 7.5px", width: "20px" }} />
							<input type={'search'} defaultValue={tableFilter} onChange={(e) => { setTableFilter(e.target.value) }} placeholder='Search' style={{ outline: "none", background: "transparent" }} />
						</div>
						<div style={{ display: "flex", "flexDirection": "row", alignItems: "center", justifyContent: "center", marginLeft: "10px", background: "#F9FBFF", borderRadius: "10px", padding: "7.5px 15px 7.5px 0", fontSize: "0.8em" }}>
							<span style={{ minWidth: "max-content", paddingInlineStart: "7.5px" }}>Sort by : &nbsp;</span>
							<select 
							style={{ textAlign: "center", outline: "none", background: "transparent", padding: "0px", border: "none" }}
							onChange={(e)=>setSortBy(e.target.value)}>
								<option value={"None"}>Default</option>
								<option value={"Warehouse ID"}>Warehouse ID</option>
								<option value={"Room Type"}>Room Type</option>
								<option value={"Building Type"}>Building Type</option>
							</select>
							<ChevronDown />
							<button className='sortOrderButton' onClick={()=>{
								setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
							}}>
								{sortOrder === 'asc' ? <AiOutlineSortAscending /> : <AiOutlineSortDescending />}
							</button>
						</div>
					</div>

				</div> : <></>}
				{isDetail == 0 ? <DynamicDataTable className="warehouses-table"
					rows={tableData}
					fieldsToExclude={["Details", "Edit", "BuildingType"]}
					orderByField={sortMapping[sortBy]}
					orderByDirection={sortOrder}
					onClick={(event, row) => {
						details(row["Details"])
					}}
					buttons={[]}
					allowOrderingBy={[
						'Warehouse ID', 'Room Type', 'BuildingType'
					]} />
					:
					<WarehouseDetail detail={user} close={close} warehouseMapping={warehouseMapping} />
				}
			</div>
			<div className='myWrapper' style={{ "gridArea": "1 / 2 / 3 / 3" }}>
				<ul className='warehouseStats'>
					<li>
						<div className="icon">
							<TotalWarehouses />
						</div>
						<div className="warehouseStatsText">
							<span>Total Warehouses</span>
							<h3>{tableData.length.toLocaleString()}</h3>
						</div>
					</li>
					<li>
						<div className="icon">
							<PermanentWarehouses />
						</div>
						<div className="warehouseStatsText">
							<span>Permanent Warehouses</span>
							<h3>{tableData.filter((elem) => {
								return elem["Details"] && elem["Details"]["warehousebuildingtype"] === 'P'
							}).length.toLocaleString()}</h3>
						</div>
					</li>
					<li>
						<div className="icon">
							<TemporaryWarehouses />
						</div>
						<div className="warehouseStatsText">
							<span>Temporary Warehouses</span>
							<h3>{tableData.filter((elem) => {
								return elem["Details"] && elem["Details"]["warehousebuildingtype"] !== 'P'
							}).length.toLocaleString()}</h3>
						</div>
					</li>
				</ul>
			</div>
			<div className='myWrapper' style={{ "gridArea": "3 / 2 / 6 / 3" }}>
				<h4>Notifications</h4>
				<ul className='li_noti hide-scroll-bar'>
					<li>
						<span>
							<span>
								First Randomisation completed in districts- Bhind, Gwalior, Indore, Bhopal
							</span>
							<span>3hrs ago</span>
						</span>
					</li>
					<li>
						<span>
							<span>
								<span></span>
								Request Ticket raised by DEO Gwalior regarding movement of units.
							</span>
							<span>3hrs ago</span>
						</span>
					</li>
					<li>
						<span>
							<span>
								<span></span>
								Request Ticket raised by DEO Gwalior regarding movement of units.
							</span>
							<span>3hrs ago</span>
						</span>
					</li>
					<li>
						<span>
							<span>
								First Randomisation completed in districts- Bhind, Gwalior, Indore, Bhopal
							</span>
							<span>3hrs ago</span>
						</span>
					</li>
					<li>
						<span>
							<span>
								First Randomisation completed in districts- Bhind, Gwalior, Indore, Bhopal
							</span>
							<span>3hrs ago</span>
						</span>
					</li>
					<li>
						<span>
							<span>
								First Randomisation completed in districts- Bhind, Gwalior, Indore, Bhopal
							</span>
							<span>3hrs ago</span>
						</span>
					</li>
				</ul>
			</div>
		</div>
	);
}
export default WarehouseList

import React, {useState, useEffect} from 'react'
import OrderAllocationTable from './OrderAllocationTable'

import styles from './styles/allocateorder.module.css'
import UnitTrackerTable from './UnitTrackerTable'

function AllocateOrder({OrderID, type}) {
	const [total_BU_M2, setTotal_BU_M2] = useState(0)
    const [total_BU_M3, setTotal_BU_M3] = useState(0)
    const [total_CU_M2, setTotal_CU_M2] = useState(0)
    const [total_CU_M3, setTotal_CU_M3] = useState(0)
    const [total_VVPAT_M2, setTotal_VVPAT_M2] = useState(0)
    const [total_VVPAT_M3, setTotal_VVPAT_M3] = useState(0)
	const [update, setUpdate] = useState(0);

	const sampleBody = {
		"referenceorderid": OrderID,
  		"type": type,
        "details": [
          {
            "source": "",
            "destination": "",
            "unitDetails": [
              {
                "item": "",
                "itemmodel": "",
                "manufacturer": "",
                "itemquantity": 0
              }
            ]
          }
        ]
      }

	const [body, setBody] = useState(sampleBody)

	useEffect(()=>{
		async function getState() {
			try {
				let uri = `${process.env.REACT_APP_API_SERVER}/order/getoptimalallocation/`
				const response = await fetch(
				uri,
				{
					method: "POST",
					headers: {
					"Content-Type": "application/json",
					},
					credentials: 'include',
					body: JSON.stringify({"orderid": OrderID})
				}
				);
				const data2 = await response.json();
				console.log("getoptimalallocation",data2.allocation)
				setBody(prev=>{
					prev.details=data2.allocation;
					return prev;
				})
				setUpdate(prev=>(prev+1)%10)
			} catch (err) {
					console.log(err);
				}
			}
			getState();
	},[])

    
    useEffect(() => {
        setTotal_BU_M2(0);
        setTotal_BU_M3(0);
        setTotal_CU_M2(0);
        setTotal_CU_M3(0);
        setTotal_VVPAT_M2(0);
        setTotal_VVPAT_M3(0);
        for (let i = 0; i < body.details.length; i++) {
        const ele = body.details[i];
        for (let j = 0; j < ele.unitDetails.length; j++) {
            const e = ele.unitDetails[j];
            if (e.item === "BU" && e.itemmodel === "M2") {
            setTotal_BU_M2(prev => prev += parseInt(e.itemquantity));
            }
            if (e.item === "BU" && e.itemmodel === "M3") {
            setTotal_BU_M3(prev => prev += parseInt(e.itemquantity));
            }
            if (e.item === "CU" && e.itemmodel === "M2") {
            setTotal_CU_M2(prev => prev += parseInt(e.itemquantity));
            }
            if (e.item === "CU" && e.itemmodel === "M3") {
            setTotal_CU_M3(prev => prev += parseInt(e.itemquantity));
            }
            if (e.item === "VVPAT" && e.itemmodel === "M2") {
            setTotal_VVPAT_M2(prev => prev += parseInt(e.itemquantity));
            }
            if (e.item === "VVPAT" && e.itemmodel === "M3") {
            setTotal_VVPAT_M3(prev => prev += parseInt(e.itemquantity));
            }
        }
        }
    }, [update])

	const submmit = async () => {
		// console.log("submit clicked")
		body.details.map(function (val) {
			let b = [];
			val.unitDetails.map(function (v) {
				b.push(v.item + v.itemmodel + v.manufacturer);
			});
			if ((new Set(b)).size !== b.length) {
				alert("Error : Identical Entries");
				return;
			}
		});
		
		try {
			// console.log("submitted body",body);
		  const response = await fetch(
			`${process.env.REACT_APP_API_SERVER}/order/allocateOrder/`,
			{
			  method: "POST",
			  headers: {
				"Content-Type": "application/json",
			  },
			  credentials: 'include',
			  body: JSON.stringify(body),
			}
		  );
		  const data2 = await response.json();
		//   console.log(data2);
		  if (response["status"] == 200) {
			alert("Order allocated Successfully");
			window.location = '/session/ordermanagement'
		  }
		  if (response["status"] == 200) {
			alert("Order allocated Successfully");
			window.location = '/session/ordermanagement'
		  }
		  if (response["status"] == 200) {
			window.location = '/session/ordermanagement'
		  }
		} catch (err) {
		  console.log(err);
		}
		// console.log("Submitted", body)
	  };
	  
	const [wearhouse, setWearhouse] = useState({})
	useEffect(() => {
		async function getState() {
		try {
			let uri = `${process.env.REACT_APP_API_SERVER}/order/OptimalOrderGeneration/`
			const response = await fetch(
			uri,
			{
				method: "POST",
				headers: {
				"Content-Type": "application/json",
				},
				credentials: 'include',
				body: JSON.stringify({"orderid": OrderID})
			}
			);
			const data2 = await response.json();
			console.log("wearhouse received",data2)
			setWearhouse(data2);
		//   setWearhouse(data2);
			} catch (err) {
				console.log(err);
			}
		}
		getState();
	}, [])
	
	
    

	return (
		<div className={styles.orderAllocationContainer}>
			<div className={styles.optimisedAllocationContainer}>
				<div className={styles.optimisedAllocationHeader}>
					<h4>Optimised Allocation</h4>
				</div>
				<div className={styles.optimisedAllocationTablesContainer}>
					<div className={styles.optimisedAllocationTablesScrollContainer}>
						<div className={styles.optimisedAllocationTables}>
							<OrderAllocationTable body={body} setBody={setBody} setUpdate={setUpdate} update={update} wearhouse={wearhouse}/>
						</div>
					</div>

					<button onClick={()=>submmit()}>
						Submit
					</button>
				</div>
			</div>
			{/* <div className={styles.unitTracker}>
				<h5>Unit Tracker</h5>
				<div className={styles.unitTrackerTables}>
					<UnitTrackerTable title="Ballot Units" />
					<UnitTrackerTable title="Control Units" />
					<UnitTrackerTable title="VVPAT" />
				</div>
			</div> */}
		</div>
	)
}

export default AllocateOrder

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

	const sampleBody = {
		"referenceorderid": OrderID,
  		"type": type,
        "details": [
          {
            "source": "Wearhouse1",
            "destination": "Wearhouse2",
            "unitDetails": [
              {
                "item": "CU",
                "itemmodel": "M1",
                "manufacturer": "ECIL",
                "itemquantity": 101
              },
              {
                "item": "VVPAT",
                "itemmodel": "M3",
                "manufacturer": "ECIL",
                "itemquantity": 102
              },
              {
                "item": "BU",
                "itemmodel": "M2",
                "manufacturer": "BEL",
                "itemquantity": 103
              }
            ]
          },
          {
            "source": "Wearhouse3",
            "destination": "Wearhouse4",
            "unitDetails": [
              {
                "item": "VVPAT",
                "itemmodel": "M3",
                "manufacturer": "BELL",
                "itemquantity": 201
              },
              {
                "item": "CU",
                "itemmodel": "M1",
                "manufacturer": "ECIL",
                "itemquantity": 202
              }
            ]
          }
        ]
      }

	const [body, setBody] = useState(sampleBody)

    const [update, setUpdate] = useState(0);
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
		console.log("submit clicked")
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
			console.log("submitted body",body);
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
		  console.log(data2);
		  if (response["status"] == 200) {
			alert("Order Submitted Successfully");
		  }
		} catch (err) {
		  console.log(err);
		}
		console.log("Submitted", body)
	  };
	
	// useEffect(() => {
	// console.log("use stater", body);
	// }, [body])
	
	
	//   async function getState() {
	// 	try {
	// 	  let uri = `${process.env.REACT_APP_API_SERVER}/user/getRealm`
	// 	  const response = await fetch(
	// 		uri,
	// 		{
	// 		  method: "POST",
	// 		  headers: {
	// 			"Content-Type": "application/json",
	// 		  },
	// 		  credentials: 'include',
	// 		  body: {}
	// 		}
	// 	  );
	// 	  const data2 = await response.json();
	// 	  setStates(data2["state"]);
	// 	} catch (err) {
	// 	  console.log(err);
	// 	}
	//   }
	
    

	return (
		<div className={styles.orderAllocationContainer}>
			<div className={styles.optimisedAllocationContainer}>
				<div className={styles.optimisedAllocationHeader}>
					<h4>Optimised Allocation</h4>
				</div>
				<div className={styles.optimisedAllocationTablesContainer}>
					<div className={styles.optimisedAllocationTablesScrollContainer}>
						<div className={styles.optimisedAllocationTables}>
							<OrderAllocationTable body={body} setBody={setBody} setUpdate={setUpdate} update={update}/>
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
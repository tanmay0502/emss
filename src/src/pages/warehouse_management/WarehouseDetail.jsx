import React, { useEffect, useState } from "react";
import { AiOutlineArrowLeft, AiOutlineEdit } from 'react-icons/ai'
import { json, useNavigate } from "react-router-dom";
import AuditDetail from "./auditpage";
import styles from './css/warehousedetails.module.css';


function WarehouseDetail(props) {
  const [Whdetails, setWhdetails] = useState([]);
  const navigate = useNavigate();
  const [lat, setLat] = useState("")
  const [long, setLong] = useState("")
  const [show, setShow] = useState(0)
  const [whID, setWhID] = useState("")

  console.log(props.detail["Details"]["warehouseid"])
  function getlatlong(latlong) {
    if(latlong !== undefined){
    let p = latlong.slice(1, (latlong.length - 1))
    console.log(p)

    let lat = ""
    let long = ""
    let f = 0
    for (let i = 0; i < p.length; i++) {
      if (p[i] != ',' && f == 0) {
        lat = lat + p[i];
      }
      else if (p[i] == ",") {
        f = 1;
        continue
      }
      if (f == 1) {
        long = long + p[i];

      }
    }
    console.log(lat, "jj", long)

    setLat(lat)
    setLong(long)
   
  }
  }

  useEffect(() => {
    // getlatlong(props.detail["warehouselatlong"])
  },)
  // console.log(props.detail, "details")
	function logOut() {
		const response = fetch(
			`${process.env.REACT_APP_API_SERVER}/user/UserLogout`,
			{
			  method: "POST",
			  credentials: 'include',
			  headers: {
				"Content-Type": "application/json",
			  },
			  mode: 'no-cors'
			}
		  );

		sessionStorage.removeItem("sessionToken", null);
		props.SetSession(null)
		// setUserData(null)
		// localStorage.setItem("token", null);
		window.location.replace("/login");
	}

  async function getDetails(e) {
    console.log(e)
		try {
			const response = await fetch(
				`${process.env.REACT_APP_API_SERVER}/warehouse/warehouseDetails`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
          credentials: 'include',
          body: JSON.stringify({
            warehouseID:e,
          }),
				})

			const data = await response.json();
			console.log(data);
			setWhdetails(data["data"])
      const status = await response;
      console.log(status.status);
			// console.log(data["data"], "data")
      if(status.status === 401 || status.status === 403){
        logOut();
        alert("Your Session has Expired, Please Login Again.")
        
      }
		} catch (error) {

			console.log(error)
		}

	}
  useEffect(() => {
    props.detail["Details"]["warehouseid"]!== undefined && setWhID(props.detail["Details"]["warehouseid"])
    // getDetails(props.detail)
    
  },[props.detail])
  useEffect(() => {
    whID!== "" && getDetails(whID)
    // getDetails(props.detail)
  },[whID])

  console.log({Whdetails})
  const[currLat,setLatitude] = useState("");

  const[currLong , setCurrLong] = useState("");
  useEffect(() => {
  try{
    if(Whdetails !== []){
      
      let rem = Whdetails[2].split(",")
      let lat = rem[0].split("(")[1]
      let long = rem[1].split(")")[0]
      
      setLatitude(lat)
      setCurrLong(long)
      // console.log(long)
      
    }
 

  }catch(err){
    console.log(err)
  }
  },[Whdetails])

  // console.log(Whdetails[6])

  return (
    <div className={styles.Scroll}>
      <div className="flex justify-between mb-2">
        <button
          className="flex justify-center rounded-full aspect-square p-5 text-lg "
          onClick={props.close}
          style={{ "background": "#84587C", color: "white" }}
        >
          <AiOutlineArrowLeft />
        </button>
        <button
          className="flex justify-center rounded-full aspect-square p-5 text-lg "
          style={{ "background": "#16c09861", color: "#008767" }}
          onClick={() => {
            navigate({
              pathname: `/session/warehousemanagement/modifywarehouse/id=${props.detail['warehouseid']}`
            })
          }}
        >
          <AiOutlineEdit />
        </button>
      </div>
      <p className="text-left text-lg font-bold">Warehouse Details - {Whdetails[0]}</p>
      <div className="user-details">
        {(
          <div className="w-full px-2 mt-2">
            <div className="w-full ">
              <div className="flex justify-between w-full ">
                <div style={{ marginLeft: "6%" }}>
                  <label className="font-semibold pl-1 flex">
                    <p className="text-left">Type</p>
                  </label>
                  <div className="bg-stone-100 p-3 mt-0 mb-0 rounded-md" style={{ width: "330px" }}>
                    <p className="text-left">{Whdetails[0] !== undefined && Whdetails[0].slice(8,9)}</p>
                  </div>
                </div>
                <div style={{ marginRight: "6%" }}>
                  <label className="font-semibold pl-1 flex">
                    <p className="text-left">District</p>
                  </label>
                  <div className="bg-stone-100 p-3 mt-0 mb-0 rounded-md" style={{ width: "330px" }}>
                    <p className="text-left"> {Whdetails[0] !== undefined && Whdetails[0].slice(2,5)}</p>
                  </div>
                </div>
              </div>
              <div className="flex justify-between w-full" style={{ marginTop: "16px" }}>
                <div style={{ marginLeft: "6%" }}>
                  <label className="font-semibold pl-1 flex">
                    <p className="text-left">Address</p>
                  </label>
                  <div className="bg-stone-100 p-3 mt-0 mb-0 rounded-md" style={{ width: "330px" }}>
                    <p className="text-left"> {Whdetails[3]}</p>
                  </div>
                </div>
                <div style={{ marginRight: "6%" }}>
                  <label className="font-semibold pl-1 flex">
                    <p className="text-left">State</p>
                  </label>
                  <div className="bg-stone-100 p-3 mt-0 mb-0 rounded-md" style={{ width: "330px" }}>
                    <p className="text-left">{Whdetails[0] !== undefined && Whdetails[0].slice(0,2)}</p>
                  </div>
                </div>
              </div>
              <div className="flex justify-between w-full" style={{ marginTop: "16px" }}>
                <div style={{ marginLeft: "6%" }}>
                  <label className="font-semibold pl-1 flex">
                    <p className="text-left">Coordinates</p>
                  </label>
                  <div className="flex justify-between" style={{ width: "330px" }}>
                    <div className="bg-stone-100 p-3 mt-0 mb-0 rounded-md w-2/5" >
                      <p className="text-left">{currLat}</p>
                    </div>
                    <div className="bg-stone-100 p-3 mt-0 mb-0 rounded-md w-2/5" >
                      <p className="text-left">{currLong}</p>
                    </div>
                  </div>
                </div>
                <div style={{ marginRight: "6%" }}>
                  <label className="font-semibold pl-1 flex">
                    <p className="text-left">Double Lock System</p>
                  </label>
                  <div className="bg-stone-100 p-3 mt-0 mb-0 rounded-md" style={{ width: "330px" }}>
                    <p className="text-left">{Whdetails[4] ? "Yes" : "No"} </p>
                  </div>
                </div>
              </div>
              <div className="flex justify-between w-full" style={{ marginTop: "16px" }}>
                <div style={{ marginLeft: "6%" }}>
                  <label className="font-semibold pl-1 flex">
                    <p className="text-left">Building Type</p>
                  </label>
                  <div className="bg-stone-100 p-3 mt-0 mb-0 rounded-md" style={{ width: "330px" }}>
                    <p className="text-left">
                    {Whdetails[1] === "P" ? "Private" : Whdetails[1] === "G" ? "Govt. Building" : "Own"}
                    </p>

                  </div>
                </div>
                <div style={{ marginRight: "6%" }}>
                  <label className="font-semibold pl-1 flex">
                    <p className="text-left">Status</p>
                  </label>
                  <div className="bg-stone-100 p-3 mt-0 mb-0 rounded-md" style={{ width: "330px" }}>
                    <p className="text-left"> {Whdetails[10] === "A" ? "Active" : "Inactive"}</p>
                  </div>
                </div>
              </div>
              <div className="flex justify-between w-full" style={{ marginTop: "16px" }}>
                <div style={{ marginLeft: "6%" }}>
                  <label className="font-semibold pl-1 flex">
                    <p className="text-left">First Key Holder</p>
                  </label>
                  <div className="bg-stone-100 p-3 mt-0 mb-0 rounded-md" style={{ width: "330px" }}>
                    <p className="text-left">{Whdetails[5]}</p>
                  </div>
                </div>
                <div style={{ marginRight: "6%" }}>
                  <label className="font-semibold pl-1 flex">
                    <p className="text-left">Second Key Holder</p>
                  </label>
                  <div className="bg-stone-100 p-3 mt-0 mb-0 rounded-md" style={{ width: "330px" }}>
                    {/* <p className="text-left"> "N/A"</p> */}
                    <p className="text-left"> {Whdetails[6] !== null ? Whdetails[6] : "N/A"}</p>
                  </div>
                </div>
              </div>
              <div className="flex justify-between w-full" style={{ marginTop: "16px" }}>
                <div style={{ marginLeft: "6%" }}>
                  <label className="font-semibold pl-1 flex">
                    <p className="text-left">Creation Time</p>
                  </label>
                  <div className="bg-stone-100 p-3 mt-0 mb-0 rounded-md" style={{ width: "330px" }}>
                    <p className="text-left">{Whdetails[7] !== undefined && Whdetails[7].slice(0,10)}</p>
                  </div>
                </div>
                <div style={{ marginRight: "6%" }}>
                  <label className="font-semibold pl-1 flex">
                    <p className="text-left">Last Update Time</p>
                  </label>
                  <div className="bg-stone-100 p-3 mt-0 mb-0 rounded-md" style={{ width: "330px" }}>
                    <p className="text-left">{Whdetails[8] !== undefined && Whdetails[8].slice(0,10)}</p>
                  </div>
                </div>

              </div>
              <div className="flex justify-between w-full" style={{ marginTop: "16px" }}>
                <div style={{ marginLeft: "6%" }}>
                  <label className="font-semibold pl-1 flex">
                    <p className="text-left">Last Upadated By</p>
                  </label>
                  <div className="bg-stone-100 p-3 mt-0 mb-0 rounded-md" style={{ width: "330px" }}>
                    <p className="text-left">{Whdetails[9]}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <AuditDetail id={props.detail["warehouseid"]} />
    </div>
  );
}
export default WarehouseDetail;

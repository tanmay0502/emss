import React, { useEffect, useState } from "react";
import { ReactComponent as CreateIssueIcon } from "../../assets/create_issue_request.svg";
import { useParams } from "react-router-dom";
import "./styles/generateOrder.css";

export default function GenarateOrderNEW() {

  const { orderType } = useParams();
  const [states, setStates] = useState([]);
  const [isPageLoaded, setIsPageLoaded] = useState(0);
  const [total_BU_M2, setTotal_BU_M2] = useState(0)
  const [total_BU_M3, setTotal_BU_M3] = useState(0)
  const [total_CU_M2, setTotal_CU_M2] = useState(0)
  const [total_CU_M3, setTotal_CU_M3] = useState(0)
  const [total_VVPAT_M2, setTotal_VVPAT_M2] = useState(0)
  const [total_VVPAT_M3, setTotal_VVPAT_M3] = useState(0)

  const sampleBody = {
    "type": orderType,
    "details": [
      {
        "source": "string",
        "destination": "string",
        "unitDetails": [
          {
            "item": "string",
            "itemmodel": "string",
            "manufacturer": "string",
            "itemquantity": 0
          }
        ]
      }
    ]
  }
  const [body, setBody] = useState(sampleBody)

  const submmit = async () => {
    console.log("Submitted")
    console.log(body)

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_SERVER}/order/generate_order/`,
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
        console.log(response)
      if (response["status"] == 200) {
        alert("Order Generated Successfully");
      }
      if (response["status"] == 200) {
        window.location = '/session/ordermanagement'
      }
    } catch (err) {
      console.log(err);
    }



  };


  async function getState() {
    try {
      let uri = `${process.env.REACT_APP_API_SERVER}/user/getRealm`
      const response = await fetch(
        uri,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: 'include',
          body:{}
        }
      );
      const data2 = await response.json();
      setStates(data2["state"]);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if (isPageLoaded == 0) {
      getState();
      setIsPageLoaded(1);
    }
  })


  const[manufacturer, setManufacturer] = useState("");


  return (
    <div className="p-3">

      <p className="text-left text-lg flex">
        <CreateIssueIcon className="mr-2" />
        Request ID : {body.type}
      </p>
      <div className="flex w-full">
        <div className=" w-3/5">
          {body.details.map((val,ind) => (


            <div className="bg-white p-6 rounded-lg shadow-lg mt-2 w-full">
              <div className="flex justify-between">
                <div className="w-full">
                  <label className="flex  w-full mb-2">Source<span className="text-red-600">*</span></label>

                  <div className="flex">
                    <select
                      className="w-5/6 h-10 p-2 border rounded-md "
                      placeholder="Type"
                      required
                    >
                      <option>Select</option>
                      {["ECIL", "BEL"].map((val) => (
                          <option value={val} className="text-black" onClick={()=>{
                            setBody((prevBody)=>{
                              prevBody.details[ind].source=val;
                              setManufacturer(val);
                              return(prevBody);
                            })
                          }}>
                            {val}
                          </option>
                        ))}
                      {states == [] && (<option value="0" className="text-black">
                        Select:
                      </option>)}
                    </select>
                  </div>
                </div>
                <div className="flex w-full justify-end" >
                  <div className="w-5/6">
                    <label className="flex  w-full mb-2">Destination<span className="text-red-600">*</span></label>

                    <div className="flex w-full">
                      <select
                        className="h-10 p-2 border rounded-md"
                        placeholder="Type"
                        required

                      >
                        {" "}
                        <option>Select</option>
                        {states &&
                          states.map((st) => (
                            <option value={st} className="text-black" onClick={()=>{
                              let prevBody=body;
                              prevBody.details[ind].destination=st;
                              setBody(prevBody);
                            }}>
                              {st}
                            </option>
                          ))}
                        {states == [] && (<option value="0" className="text-black">
                          Select:
                        </option>)}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-left font-bold mt-2 text-lg mb-4" >
                Units Description
              </p>
              <div className="border rounded-md p-3">
                <table className="w-full">
                  <tr>
                    <th className="font-normal w-1/4">Type</th>
                    <th className="font-normal w-1/4">Quantity</th>
                    <th className="font-normal w-1/4">Model</th>
                    <th className="font-normal w-1/4">Manufacturer</th>
                  </tr>
                  <br />
                  
                  {
                    body.details[ind].unitDetails.map((val, ind2) => (
                      <tr className="border-b-2 ">
                        <td><select className="border p-2 mb-2"
                          required
                        >
                          <option
                          >select</option>
                          <option value="BU"onClick={()=>{
                            let prevBody=body;
                            prevBody.details[ind].unitDetails[ind2].item="BU";
                            setBody(prevBody);
                          }}>BU</option>
                          <option value="CU"onClick={()=>{
                            let prevBody=body;
                            prevBody.details[ind].unitDetails[ind2].item="CU";
                            setBody(prevBody);
                          }}>CU</option>
                          <option value="VVPAT"onClick={()=>{
                            let prevBody=body;
                            prevBody.details[ind].unitDetails[ind2].item="VT";
                            setBody(prevBody);
                          }}>VVPAT</option>
                        </select></td>
                        <td>
                          <input type="number" placeholder="No of Unit" className=" w-2/3 p-2 rounded-lg border mb-2" 
                          onChange={(e)=>{
                            let prevBody=body;
                            prevBody.details[ind].unitDetails[ind2].itemquantity=e.target.value;
                            setBody(prevBody);
                          }} required></input>
                        </td>
                        <td>
                          <select className="border p-2 mb-2"
                            required
                            onChange={(e)=>{
                              let prevBody=body;
                              prevBody.details[ind].unitDetails[ind2].itemmodel=e.target.value;
                              prevBody.details[ind].unitDetails[ind2].manufacturer=manufacturer;
                              setBody(prevBody);
                            }}

                          >
                            <option
                            >select</option>
                            <option value="M2">M2</option>
                            <option value="M3">M3</option>
                          </select>
                        </td>
                        <td>
                          <select className="border p-2 mb-2 ml-3 mr-7"
                            required>
                            <option value={manufacturer}>{manufacturer}</option>
                          </select>
                        </td>
                      </tr>
                    ))
                  }
                </table>
                <div className="flex justify-end w-full mt-1"><button type="button" onClick={() => {
                  setBody((prev)=>{
                  let temp = {
                    "item": "string",
                    "itemmodel": "string",
                    "manufacturer": "string",
                    "itemquantity": 0
                  }
                  console.log("add",prev.details[ind].unitDetails[prev.details[ind].unitDetails.length-1].itemquantity)
                  if (prev.details[ind].unitDetails[prev.details[ind].unitDetails.length-1].itemquantity===0) {
                    return prev;
                  }
                  const newBody = {...prev};
                  prev.details[ind].unitDetails.push(temp)
                  return newBody;
                })
                }} className="bg-orange-600 text-white  p-3  " >Add row</button></div>
              </div>
            </div>
          ))}

          <div className="flex justify-end"><button onClick={()=>{
            setBody((prev)=>{
              let temp = {
                "source": "string",
                "destination": "string",
                "unitDetails": [
                  {
                    "item": "string",
                    "itemmodel": "string",
                    "manufacturer": "string",
                    "itemquantity": 0
                  }
                ]
              }
              if (prev.details[prev.details.length-1].destination==="string") {
                return prev;
              }
              const newBody = {...prev};
              newBody.details.push(temp)
              return newBody;
            })
          }} type="button" className="text-white bg-orange-600 p-1 text-2xl w-10 h-10 -mt-5 " style={{ borderRadius: "50%" }}> +</button></div>
        </div>
        <div className="w-2/5">
          <div className="bg-white p-6 rounded-lg shadow-lg mt-2 w-full m-4 ">
            <p className="text-left font-semibold">Recent Orders</p>


            <div className="flex mt-2">
              <div className="w-5"><div className="h-2 w-2 rounded-full mt-1" style={{ backgroundColor: "#84587C" }}></div></div>
              <p className="w-4/6 text-left">First Randomisation completed in district - Bhind, Gwalior, Indor and Bhopal</p>
              <p className="w-2/6 text-right text-sm text-gray-400">3hrs ago</p>
            </div>
            <hr />

            <div className="flex mt-2">
              <div className="w-5"><div className="h-2 w-2 rounded-full mt-1" style={{ backgroundColor: "#84587C" }}></div></div>
              <p className="w-4/6 text-left">First Randomisation completed in district - Bhind, Gwalior, Indor and Bhopal</p>
              <p className="w-2/6 text-right text-sm text-gray-400">3hrs ago</p>
            </div>
            <hr />

            <div className="flex mt-2">
              <div className="w-5"><div className="h-2 w-2 rounded-full mt-1" style={{ backgroundColor: "#84587C" }}></div></div>
              <p className="w-4/6 text-left">First Randomisation completed in district - Bhind, Gwalior, Indor and Bhopal</p>
              <p className="w-2/6 text-right text-sm text-gray-400">3hrs ago</p>
            </div>
            <hr />


          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg mt-2 w-full m-4 ">
            <p className=" text-lg font-semibold text-center">Unit Tracker</p>

            <div className="rounded-lg shadow-md mt-5 bg-white">
              <div
                className="rounded-t-lg p-2 text-left "
                style={{ backgroundColor: "#84587C" }}
              >
                <span className="text-white text-lg ml-5">Ballot Units</span>
              </div>
              <div className="p-2">
                <table className="w-full mt-4 ">
                  <tr className="text-red-400 border-b-2 ">
                    <td className="">Model</td>
                    <td>Quantity</td>
                  </tr>
                  <br />
                  <tr className=" border-b-2 ">
                    <td>M2</td>
                    <td>{total_BU_M2}</td>
                  </tr>
                  <br />
                  <tr className=" border-b-2 ">
                    <td>M3</td>
                    <td>{total_BU_M3}</td>
                  </tr>
                  <br />

                </table>

              </div>
            </div>
            <div className="rounded-lg shadow-md mt-5 bg-white">
              <div
                className="rounded-t-lg p-2 text-left "
                style={{ backgroundColor: "#84587C" }}
              >
                <span className="text-white text-lg ml-5">Control Units</span>
              </div>
              <div className="p-2">
                <table className="w-full mt-4 ">
                  <tr className="text-red-400 border-b-2 ">
                    <td className="">Model</td>
                    <td>Quantity</td>
                  </tr>
                  <br />
                  <tr className=" border-b-2 ">
                    <td>M2</td>
                    <td>{total_CU_M2}</td>
                  </tr>
                  <br />
                  <tr className=" border-b-2 ">
                    <td>M3</td>
                    <td>{total_CU_M3}</td>
                  </tr>
                  <br />

                </table>

              </div>
            </div>
            <div className="rounded-lg shadow-md mt-5 bg-white">
              <div
                className="rounded-t-lg p-2 text-left "
                style={{ backgroundColor: "#84587C" }}
              >
                <span className="text-white text-lg ml-5">VVPAT</span>
              </div>
              <div className="p-2">
                <table className="w-full mt-4 ">
                  <tr className="text-red-400 border-b-2 ">
                    <td className="">Model</td>
                    <td>Quantity</td>
                  </tr>
                  <br />
                  <tr className=" border-b-2 ">
                    <td>M2</td>
                    <td>{total_VVPAT_M2}</td>
                  </tr>
                  <br />
                  <tr className=" border-b-2 ">
                    <td>M3</td>
                    <td>{total_VVPAT_M3}</td>
                  </tr>
                  <br />
                </table>
              </div>
            </div>


          </div>
        </div>
      </div>
      <button className="text-white bg-orange-600" onClick={()=>submmit()}>Submit</button>
    </div>
  );
}





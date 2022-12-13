import React, { useEffect, useState } from "react";
import { ReactComponent as CreateIssueIcon } from "../../assets/create_issue_request.svg";
import { useParams } from "react-router-dom";
import "./styles/generateOrder.css";

export default function GenarateOrderREP() {

  const { orderType } = useParams();
  const [states, setStates] = useState([]);
  const [isPageLoaded, setIsPageLoaded] = useState(0);
  const [orderCount, setOrderCount] = useState({ 1: [1] });
  const [total_BU_M2, setTotal_BU_M2] = useState(0)
  const [total_BU_M3, setTotal_BU_M3] = useState(0)
  const [total_CU_M2, setTotal_CU_M2] = useState(0)
  const [total_CU_M3, setTotal_CU_M3] = useState(0)
  const [total_VVPAT_M2, setTotal_VVPAT_M2] = useState(0)
  const [total_VVPAT_M3, setTotal_VVPAT_M3] = useState(0)

  function increaseOrder() {
    const p = parseInt(Object.keys(orderCount)[Object.keys(orderCount).length - 1]) + 1
    setOrderCount({ ...orderCount, [p]: [1] });

  }

  function increaseOne(index) {

    let temp = orderCount;
    temp[index].push(parseInt(temp[index][temp[index].length - 1]) + 1)
    setOrderCount({ ...temp });

  }

  function calculate() {

    console.log("calculate")
    let _total_CU_M2 = 0
    let _total_CU_M3 = 0
    let _total_BU_M2 = 0
    let _total_BU_M3 = 0
    let _total_VVPAT_M2 = 0
    let _total_VVPAT_M3 = 0

    if ((Object.keys((orderCount)))) {

      (Object.keys(orderCount)).map((index) => {
        orderCount[index].map((index2) => {
          if (document.getElementById(index.toString() + "_" + index2.toString() + "_quantity") && document.getElementById(index.toString() + "_" + index2.toString() + "_type").value != "select" && document.getElementById(index.toString() + "_" + index2.toString() + "_model").value != "select" && document.getElementById(index.toString() + "_" + index2.toString() + "_manufacturer").value!="select") {
            const q = parseInt(document.getElementById(index.toString() + "_" + index2.toString() + "_quantity").value);
            const type = document.getElementById(index.toString() + "_" + index2.toString() + "_type").value
            const model = document.getElementById(index.toString() + "_" + index2.toString() + "_model").value
            const manufacturer = document.getElementById(index.toString() + "_" + index2.toString() + "_manufacturer").value

            let temp = "";
            temp += "_total_" + type + "_" + model;
            console.log(temp, eval(temp))
            let p1 = eval(temp)
            p1 = p1 + q;
            eval(temp + " = " + p1.toString())
            console.log(eval(temp))


          }
        })
      })
    }

    console.log(_total_CU_M2, _total_CU_M3, _total_BU_M2, _total_BU_M3, _total_VVPAT_M2, _total_VVPAT_M3)
    setTotal_BU_M2(_total_BU_M2)
    setTotal_BU_M3(_total_BU_M3)
    setTotal_CU_M2(_total_CU_M2)
    setTotal_CU_M3(_total_CU_M3)
    setTotal_VVPAT_M2(_total_VVPAT_M2)
    setTotal_VVPAT_M3(_total_VVPAT_M3)

  }

  const onFormSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitted")
    let details = []

    Object.keys(orderCount).map((index) => {
      let temp = {}
      if (document.getElementById(index.toString() + "_source")) {
        temp["source"] = states[document.getElementById(index.toString() + "_source").value]
        temp["destination"] = states[document.getElementById(index.toString() + "_destination").value]
        temp["unitDetails"] = []
        orderCount[index].map((index2) => {
          if (document.getElementById(index.toString() + "_" + index2.toString() + "_quantity") && document.getElementById(index.toString() + "_" + index2.toString() + "_type").value != "select" && document.getElementById(index.toString() + "_" + index2.toString() + "_model").value != "select" &&  document.getElementById(index.toString() + "_" + index2.toString() + "_manufacturer").value!="select") {
            const q = parseInt(document.getElementById(index.toString() + "_" + index2.toString() + "_quantity").value);
            const type = document.getElementById(index.toString() + "_" + index2.toString() + "_type").value
            const model = document.getElementById(index.toString() + "_" + index2.toString() + "_model").value
            const manufacturer = document.getElementById(index.toString() + "_" + index2.toString() + "_manufacturer").value

            let temp2 = {};
            temp2["item"] = type
            temp2["itemmodel"] = model
            temp2["itemquantity"] = q
            temp2["manufacturer"] = manufacturer
            temp["unitDetails"].push(temp2)



          }
        })
        details.push(temp);
      }
    })

    let data = {}
    if(document.getElementById("orderId").value && document.getElementById("orderId").value!=""){
      data["orderid"] = document.getElementById("orderId").value
    }
    data["type"] = orderType
    data["creatoruserid"] = sessionStorage.getItem("sessionToken");
    data["details"] = details
    console.log(`${process.env.REACT_APP_API_SERVER}`)
    console.log(data)
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_SERVER}/order/generate_order/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: 'same-origin',
          body: JSON.stringify(data),

          mode: "cors",

        }
      );
      const data2 = await response.json();
        console.log(response)
        console.log(data2)
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
      const response = await fetch(
        `${process.env.REACT_APP_API_SERVER}/user/getStateList`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          mode: "cors"
        }
      );
      const data2 = await response.json();
      console.log(data2);
      setStates(data2["states"]);
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

  return (
    <form className="p-3"
      onSubmit={onFormSubmit}>
      <p className="text-left text-lg flex">
        <CreateIssueIcon className="mr-2" />
        Request ID : {orderType}
      </p>
      <div className="flex w-full">
        <div className=" w-3/5">
          
          {Object.keys(orderCount).map((index) => (


            <div className="bg-white p-6 rounded-lg shadow-lg mt-2 w-full">
              <div className="flex justify-between">
                <div className="w-full">
                  <label className="flex  w-full mb-2">Source<span className="text-red-600">*</span></label>

                  <div className="flex">
                    <select
                      className="w-5/6 h-10 p-2 border rounded-md "
                      placeholder="Type"
                      id={index.toString() + "_source"}
                      required
                    >
                      <option>Select</option>
                      {states &&
                        Object.keys(states).map((st) => (
                          <option value={st} className="text-black">
                            {st}
                          </option>
                        ))}
                      {states == {} && (<option value="0" className="text-black">
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
                        id={index.toString() + "_destination"}
                        required

                      >
                        {" "}
                        <option>Select</option>
                        {states &&
                          Object.keys(states).map((st) => (
                            <option value={st} className="text-black">
                              {st}
                            </option>
                          ))}
                        {states == {} && (<option value="0" className="text-black">
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
                    orderCount[index].map((v2) => (
                      <tr className="border-b-2 ">
                        <td><select className="border p-2 mb-2"
                          id={index.toString() + "_" + v2.toString() + "_type"}
                          required
                          onChange={calculate}

                        >
                          <option
                          >select</option>
                          <option value="BU">BU</option>
                          <option value="CU">CU</option>
                          <option value="VVPAT">VVPAT</option>
                        </select></td>
                        <td>
                          <input type="number" placeholder="No of Unit" className=" w-2/3 p-2 rounded-lg border mb-2" id={index.toString() + "_" + v2.toString() + "_quantity"} onChange={calculate} required></input>
                        </td>
                        <td>
                          <select className="border p-2 mb-2"
                            id={index.toString() + "_" + v2.toString() + "_model"}
                            required
                            onChange={calculate}

                          >
                            <option
                            >select</option>
                            <option value="M2">M2</option>
                            <option value="M3">M3</option>
                          </select>
                        </td>
                        <td>
                          <select className="border p-2 mb-2 ml-3 mr-7"
                            id={index.toString() + "_" + v2.toString() + "_manufacturer"}
                            required
                            onChange={calculate}

                          >
                            <option
                            >select</option>
                            <option value="ECIL">ECIL</option>
                            <option value="BEL">BEL</option>
                          </select>
                        </td>
                      </tr>
                    ))
                  }
                </table>
                <div className="flex justify-end w-full mt-1"><button type="button" onClick={() => increaseOne(index)} className="bg-orange-600 text-white  p-3  " >Add row</button></div>
              </div>
            </div>
          ))}



          <div className="flex justify-end"><button onClick={increaseOrder} type="button" className="text-white bg-orange-600 p-1 text-2xl w-10 h-10 -mt-5 " style={{ borderRadius: "50%" }}> +</button></div>
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
      <button type="submit" className="text-white bg-orange-600">Submit</button>
    </form>
  );
}





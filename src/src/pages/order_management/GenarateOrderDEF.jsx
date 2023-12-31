import React, { useEffect, useState } from "react";
import { ReactComponent as CreateIssueIcon } from "../../assets/create_issue_request.svg";
import { useParams } from "react-router-dom";
import Modal from 'react-modal';

export default function GenarateOrderSEC() {

  const { orderType } = useParams();
  const [warehouses, setWarehouses] = useState([]);
  const [isPageLoaded, setIsPageLoaded] = useState(0);
  const [total_BU_M2, setTotal_BU_M2] = useState(0)
  const [total_BU_M3, setTotal_BU_M3] = useState(0)
  const [total_CU_M2, setTotal_CU_M2] = useState(0)
  const [total_CU_M3, setTotal_CU_M3] = useState(0)
  const [total_VVPAT_M2, setTotal_VVPAT_M2] = useState(0)
  const [total_VVPAT_M3, setTotal_VVPAT_M3] = useState(0)
  const [photoFileName, setPhotoFileName] = useState("")
  const [photoFileData, setPhotoFileData] = useState("")
  const [flag, setflag] = useState(0);
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [availableUnits, setAvailableUnits] = useState([])

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    //   subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  async function getcertificate(val) {
    setflag(1)
    console.log(val);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_SERVER}/order/getOrderPdf/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(val),
          credentials: 'include'
        }
      );
      const data = await response.json();
      console.log(data);
      if (response.status == 200) {
        setPhotoFileData(data)
      }
      else{
        alert(data.message)
      }

    } catch (err) {
      console.log({ err });
    }
  }

  if (flag == 0) {
    if (photoFileName) {
      getcertificate();
    }
  }


  useEffect(() => {
    const getUnits = async () => {
      try {
        const ID = window.sessionStorage.getItem('sessionToken');
        console.log(ID)
        const response = await fetch(
          `${process.env.REACT_APP_API_SERVER}/unit/available_units/`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: 'include',
            body: JSON.stringify({
              "oprnd": ID
            })
          }
        );
        const data = await response.json();
        console.log("/unit/available_units/", data);
        if (data.data.length) {
          setAvailableUnits(data.data);
        }
      } catch (err) {
        console.log({ err });
      }
    }
    getUnits()
  }, [])

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

  const man = { "ECIL": "ME", "BEL": "MB" }
  const manr = { "ME": "ECIL", "MB": "BEL" }
  const [body, setBody] = useState(sampleBody)

  const submmit = async () => {
    console.log("Submitted")
    console.log(body);
    body.details.map(function (val) {
      let b = [];
      val.unitDetails.map(function (v) {
        b.push(v.item + v.itemmodel + v.manufacturer);
      });
      if ((new Set(b)).size !== b.length) {
        alert("Error : Identical Entries");
        window.location.reload(false);
      }
    });

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
      if(response.status==200){

      }else{
        alert(data2["message"])
      }
      console.log(data2["OrderIDs List"]);

      let t = [];
      data2['OrderIDs List'].map(function (val) {
        t.push({
          "orderid": val
        });
      });
      let p = {
        "listofOrders": t
      }
      if (response["status"] == 200) {
        // alert("Order Generated Successfully");
        getcertificate(p);
        openModal();
      }
      else{
        alert(data2.message)
      }
      // if (response["status"] == 200) {
      //   window.location = '/session/ordermanagement'
      // }
    } catch (err) {
      console.log(err);
    }



  };


  async function getWarehouse() {
    try {
      const uri = `${process.env.REACT_APP_API_SERVER}/warehouse/listWarehouses`;
      const response = await fetch(
        uri,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: 'include',
          body: JSON.stringify({
          }),
        }
      );
      const data2 = await response.json();
      const da = data2.data;
      let a = [];
      da.map(function (val) {
        console.log(val);
        a.push(val.warehouseid);
      });
      setWarehouses(a);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if (isPageLoaded == 0) {
      getWarehouse();
      setIsPageLoaded(1);
    }
  })


  const [manufacturer, setManufacturer] = useState("select");

  function kk() {
    console.log("kdkd")
  }

  useEffect(() => {
    console.log("manu", manufacturer)
  }, [manufacturer])

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

  return (
    <div className="p-3">
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <div id="root" className=''>
          <div className='flex justify-center items-center'>
            {console.log("This Data:")}
            {/* {console.log(photoFileData["data"].slice(0,-1))} */}
            {/* {console.log(fileData)} */}
            {console.log("Fetched Data:- ", photoFileData)}
            {/* {<embed style={{ width: "600px", height: "600px", padding: "10px" }} src={fileData} />} */}
            {photoFileData !== undefined && <embed type="text/html" style={{ width: "1000px", height: "800px", padding: "10px" }} src={photoFileData} />}
          </div>
          <button style={{ color: "white", }} onClick={() => { window.location = '/session/ordermanagement' }}>Close</button>
        </div>
      </Modal>
      <p className="text-left text-lg flex">
        <CreateIssueIcon className="mr-2" />
        Request ID : {body.type}
      </p>
      <div className="flex w-full">
        <div className=" w-3/5">
          {body.details.map((val, ind) => (


            <div className="bg-white p-6 rounded-lg shadow-lg mt-2 w-full">
              <div className="flex justify-between">
                <div className="w-full">
                  <label className="flex  w-full mb-2">Source<span className="text-red-600">*</span></label>

                  <div className="flex">
                    <select
                      className="w-5/6 h-10 p-2 border rounded-md "
                      placeholder="Type"
                      required
                      onChange={(e) => {
                        setBody((prevBody) => {
                          prevBody.details[ind].source = e.target.value;
                          return (prevBody);
                        })
                        setUpdate((prev) => { return (prev + 1) % 10 });
                      }}
                    >
                      <option>Select</option>
                      {warehouses &&
                        warehouses.map((val) => (
                          <option value={val} className="text-black">
                            {val}
                          </option>
                        ))}
                      {warehouses === [] && (<option value="0" className="text-black">
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
                        onChange={(e) => {
                          setBody((prevBody) => {
                            prevBody.details[ind].destination = e.target.value;
                            return (prevBody);
                          })
                        }}
                      >
                        {" "}
                        <option>Select</option>
                        {["ME", "MB"].map((val) => (
                          <option value={val} className="text-black">
                            {val}
                          </option>
                        ))}
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
                    <th className="font-normal w-1/5">Type</th>
                    <th className="font-normal w-1/5">Model</th>
                    <th className="font-normal w-1/5">Manufacturer</th>
                    <th className="font-normal w-1/5">Quantity</th>
                    <th className="font-normal w-1/5">Available</th>
                  </tr>
                  <br />

                  {
                    body.details[ind].unitDetails.map((val, ind2) => (
                      <tr className="border-b-2 ">
                        <td><select className="border p-2 mb-2"
                          required
                          onChange={(e) => {
                            setBody((prevBody) => {
                              prevBody.details[ind].unitDetails[ind2].item = e.target.value;
                              return (prevBody);
                            })
                            setUpdate((prev) => { return (prev + 1) % 10 });
                          }}
                        >
                          <option
                          >select</option>
                          <option value="BU">BU</option>
                          <option value="CU">CU</option>
                          <option value="VVPAT">VVPAT</option>
                        </select></td>
                        <td>
                          <select className="border p-2 mb-2"
                            required
                            onChange={(e) => {
                              setBody((prev) => {
                                prev.details[ind].unitDetails[ind2].itemmodel = e.target.value;
                                return prev;
                              })
                              setUpdate((prev) => { return (prev + 1) % 10 });
                            }}

                          >
                            <option
                            >select</option>
                            <option value="M2">M2</option>
                            <option value="M3">M3</option>
                          </select>
                        </td>
                        <td>
                          <select className="border p-2 mb-2"
                            required
                            onChange={(e) => {
                              setBody((prev) => {
                                prev.details[ind].unitDetails[ind2].manufacturer = e.target.value;
                                return prev;
                              })
                              setUpdate((prev) => { return (prev + 1) % 10 });
                            }}
                          >
                            <option>{body.details[ind].destination}</option>
                          </select>
                        </td>
                        <td>
                          <input type="number" placeholder="No of Unit" className="w-2/3 p-2 rounded-lg border mb-2"
                            onChange={(e) => {
                              setBody((prev) => {
                                prev.details[ind].unitDetails[ind2].itemquantity = e.target.value;
                                prev.details[ind].unitDetails[ind2].manufacturer = prev.details[ind].destination;
                                return prev;
                              })
                              setUpdate((prev) => { return (prev + 1) % 10 });
                            }} required></input>
                        </td>
                        <td>
                          {[0].map(() => {
                            let sum = 0;
                            const dict = {
                              "B": "BEL",
                              "E": "ECIL",
                              "BU": "BU",
                              "CU": "CU",
                              "VT": "VVPAT",
                            }
                            for (let i = 0; i < availableUnits.length; i++) {
                              const e = availableUnits[i];
                              if (dict[e.unit_type] === val.item && dict[e.manufacturer] === val.manufacturer && e.model === val.itemmodel) {
                                sum += e.count;
                              }
                            }
                            if (parseInt(val.itemquantity)) {
                              sum -= parseInt(val.itemquantity)
                            }
                            return <div>{sum}</div>;
                          })}
                        </td>
                        <div className='mt-2'><button type="button" className="text-white bg-red-600 p-1 text-2xl w-8 h-8 -mt-5 " style={{ borderRadius: "50%" }}
                          onClick={() => {
                            setBody((prev) => {
                              let temp = prev.details[ind].unitDetails.filter((e) => e != val);
                              prev.details[ind].unitDetails = temp;
                              return prev;
                            })
                            setUpdate((prev) => { return (prev + 1) % 10 });
                          }}
                        > -</button></div>
                      </tr>
                    ))
                  }
                </table>
                <div className="flex justify-end w-full mt-1"><button type="button" onClick={() => {
                  setBody((prev) => {
                    let temp = {
                      "item": "",
                      "itemmodel": "",
                      "manufacturer": "",
                      "itemquantity": 0
                    }
                    let n = prev.details[ind].unitDetails.length;
                    if (n) {
                      if (prev.details[ind].unitDetails[n - 1].itemquantity) {
                        prev.details[ind].unitDetails.push(temp)
                      }
                    } else {
                      prev.details[ind].unitDetails.push(temp)
                    }
                    return prev;
                  })
                  setUpdate((prev) => { return (prev + 1) % 10 });
                }} className="bg-orange-600 text-white  p-3  " >Add row</button></div>
              </div>
              <div className='flex justify-end mt-1'>
                <button type="button" className="text-white bg-red-600 p-1 text-2xl w-10 h-10 -mt-5 " style={{ borderRadius: "50%" }} onClick={() => {
                  setBody((prev) => {
                    prev.details = prev.details.filter((ele) => ele != val);
                    return prev;
                  })
                  setUpdate((prev) => { return (prev + 1) % 10 });
                }}> -</button>
              </div>
            </div>
          ))}

          <div className="flex justify-end">
            <button onClick={() => {
              setBody((prev) => {
                let temp = {
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
                let n = prev.details.length;
                if (n) {
                  if (prev.details[n - 1].source && prev.details[n - 1].destination) {
                    prev.details.push(temp)
                  }
                } else {
                  prev.details.push(temp)
                }
                return prev;
              })
              setUpdate((prev) => { return (prev + 1) % 10 });
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
      <button className="text-white bg-orange-600" onClick={() => submmit()}>Submit</button>
    </div>
  );
}


import React, { useEffect, useState } from "react";
import { ReactComponent as CreateIssueIcon } from "../../assets/create_issue_request.svg";
import { useParams } from "react-router-dom";
import "./styles/generateOrder.css";
import Modal from 'react-modal';
import UnitTraker from "./UnitTracker";
import FillOrder from "./FillOrder";
import { getRealm,formatRealm, formatRealm2 } from "../../components/utils";

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
  const [photoFileName, setPhotoFileName] = useState("")
  const [photoFileData, setPhotoFileData] = useState("")
  const [availableUnits, setAvailableUnits] = useState([])
  const [flag, setflag] = useState(0);
  const [modalIsOpen, setIsOpen] = React.useState(false);
  

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
  
  useEffect(()=>{
    const getUnits = async ()=>{
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
            body:JSON.stringify({
              "oprnd":ID
            })
          }
        );
        const data = await response.json();
        console.log("/unit/available_units/",data);
        if (data.data.length) {
          setAvailableUnits(data.data);
        }
      } catch (err) {
        console.log({ err });
      }
    }
    getUnits()
  },[])

  const sampleBody = {
    "type": orderType,
    "details": [
      
    ]
  }
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
        alert("Order Generated Successfully");
        getcertificate(p);
        openModal();
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


    console.log("body", body)
  };

  useEffect(() => {
    console.log("use stater",body);
  }, [body])


  async function getState() {
    let data = await getRealm("Order", "FillCapacity")
    let stateList = formatRealm2(data,"","","","");
    console.log(stateList)
    setStates(stateList)
  }

  const [manufacturers, setManufacturers] = useState( [
    {
      "mfName":"ECIL",
      "mfCode":"ME"
    },
    {
      "mfName":"BEL",
      "mfCode":"MB"
    }
    
  ])

  useEffect(() => {
   
    console.log("fetching")
    let timer = setTimeout(()=>getState(),500);
      
    return (()=>{
      clearTimeout(timer);
    })
     

    
  },[])

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
          setTotal_BU_M2(prev=>prev+=parseInt(e.itemquantity));
        }
        if (e.item === "BU" && e.itemmodel === "M3") {
          setTotal_BU_M3(prev=>prev+=parseInt(e.itemquantity));
        }
        if (e.item === "CU" && e.itemmodel === "M2") {
          setTotal_CU_M2(prev=>prev+=parseInt(e.itemquantity));
        }
        if (e.item === "CU" && e.itemmodel === "M3") {
          setTotal_CU_M3(prev=>prev+=parseInt(e.itemquantity));
        }
        if (e.item === "VVPAT" && e.itemmodel === "M2") {
          setTotal_VVPAT_M2(prev=>prev+=parseInt(e.itemquantity));
        }
        if (e.item === "VVPAT" && e.itemmodel === "M3") {
          setTotal_VVPAT_M3(prev=>prev+=parseInt(e.itemquantity));
        }
      }
    }
  },[update])

  const [Order, setOrder] = useState([{
    "source":"select",
    "destination":"select",
    "details":[]
}]);


useEffect(()=>{
  let tempBody={...sampleBody}
  Order.map((val,id)=>{
    if(val["source"]!="select" && val["destination"]!="select"){
      console.log("both filled")
    tempBody["details"].push({
      "source": val["source"],
      "destination": val["destination"],
      "unitDetails": [
        
      ]
    })
    val["details"].map((val2)=>{
      if(val2["model"]!="select" && val2["manufacturer"]!="select"){
            if(val2["filledCU"]>0){
            tempBody["details"][id]["unitDetails"].push({
              "item": "CU",
              "itemmodel": val2["model"],
              "manufacturer": val2["manufacturer"],
              "itemquantity": val2["filledCU"]
            })
          }
          if(val2["filledBU"]>0){
            tempBody["details"][id]["unitDetails"].push({
              "item": "BU",
              "itemmodel": val2["model"],
              "manufacturer": val2["manufacturer"],
              "itemquantity": val2["filledBU"]
            })
          }
          if(val2["filledVVPAT"]>0){
            tempBody["details"][id]["unitDetails"].push({
              "item": "VVPAT",
              "itemmodel": val2["model"],
              "manufacturer": val2["manufacturer"],
              "itemquantity": val2["filledVVPAT"]
            })
          }
        }
     
    })
  }
  })
  console.log(tempBody)
  setBody(tempBody)
},[Order])

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
        <div className=" w-3/5 pt-10">
          
          <FillOrder Order={Order} setOrder={setOrder} sources={manufacturers} sname={"mfName"} scode={"mfCode"} destinations={states} dname={"stName"} dcode={"stCode"}/>

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





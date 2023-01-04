import { DynamicDataTable } from '@langleyfoxall/react-dynamic-data-table';
import React, { ReactComponent } from 'react'
import { useState, useEffect } from "react";
import { Navigate, useNavigate } from 'react-router-dom';
import { getVehicleDetails, setVehicleDetails } from '../order_management/Utils';
import styles from '../order_management/styles/order.module.css'
import ReadCsv from './ReadCsv';
import Papa from "papaparse";



const allowedExtensions = ["csv"];


function Orders(){

  const [allOrders, setAllOrders] = useState([]);
  const [orderID,setOrderID] = useState("");
  const [displayMessage, setDisplayMessage] = useState("");
  const [isvalidated,setIsvalidated] = useState(-1)
  const [isValidating,setIsValidating] =useState(0)
  const [role, setRole] =useState(-1);
  const [isFile, setIsFile] = useState(0);
  const [unitDetails,setUnitDetails] = useState([]);
  const [iscollapsed,setIsCollapsed] = useState(0);
  const [dataInput, setDataInput] = useState([""]);



  const [data, setData] = useState([]);
	
	const [error, setError] = useState("");
	
	const [file, setFile] = useState("");

	const handleFileChange = (e) => {
		setError("");
		
		if (e.target.files.length) {
			const inputFile = e.target.files[0];
			
			const fileExtension = inputFile?.type.split("/")[1];
			if (!allowedExtensions.includes(fileExtension)) {
				setError("Please input a csv file");
				return;
			}

			// If input type is correct set the state
      
			setFile(inputFile);
		}
	};
	const handleParse = (id) => {
		
		if (!file) return setError("Enter a valid file");

		const reader = new FileReader();
		reader.onload = async ({ target }) => {
			const csv = Papa.parse(target.result, { header: true });
			const parsedData = csv?.data;
            console.log(parsedData)
			setData(parsedData);
      setIsFile(0)
      let kk = "";
      parsedData.map((val)=>{
        kk+=val["unitid"];
        kk+="\n";
      })
        setDataInput((prev)=>{
          let pp = [...prev]
          pp[id]=kk;
          console.log(pp)

          return pp;
        });
       console.log(parsedData)
		};
		reader.readAsText(file);
	};

   
      
    


    async function getOrders() {
      setIsValidating(1);
      setDisplayMessage("")
        try {
          const body = {"orderid": orderID}
          console.log(body)
          const response = await fetch(
            `${process.env.REACT_APP_API_SERVER}/order/view_order/`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              credentials: 'include',
              body: JSON.stringify(body)
            }
          );
          const data2 = await response.json();
          console.log("fetcjed", data2)
          if (data2["data"] && data2["data"].length==1) {
            setAllOrders(data2["data"][0])
           
            setIsvalidated(1);
            setOrderID("");
            setIsValidating(0);
           
  
          }
          else{
            setDisplayMessage("* Invalid Order Id")
            setOrderID("");
            setIsValidating(0);
          }
        } catch (err) {
          console.log(err);
        }
      }

     
      // console.log(allOrders)
      const [body, setBody] = useState()
const [fetchedVehicle, setFetchedVehicle] = useState(0);


function getData(){
  if(allOrders.length!=0){
  console.log(allOrders)
  let body={
    "listofOrders": [
      
    ]
  }
  let pp = [allOrders]
  let hh = []
pp.map((val)=>{
    body["listofOrders"].push({
        "orderid":val["orderid"]
    })
    hh.push("");
})
setDataInput(hh)
  let kk = getVehicleDetails(body);
  kk.then(function(result) {
      
      if(result!=0){
          console.log(result,"ffffffffffffffffffffffffffffffffffffffffffffffffffffff")
          setFetchedVehicle(result); 
      }
      
  })
}
}

useEffect(()=>{
  let timer1 = setTimeout(() => getData(), 1 * 1000);

  return () => {
    clearTimeout(timer1);
  };
},[allOrders])


      useEffect(()=>{
          // console.log(fetchedVehicle,"iffffffffffffffffffffffffffffifiiiiiiiiiiiiiiiiii")
          if(fetchedVehicle==0){
              const sampleBody = [];
              const oneVehicle={
                  vehicleNumber : "",
                  driverName : "",
                  escortName : "",
                  warehouseIncharge : "",
                  driverContact : "",
                  escortContact : "",
                  remarks: ""
              };
      
              allOrders.map((order)=>{
                  let x={
                      "OrderID":order["orderid"],
                      "vehicleDetails":[oneVehicle]
      
                  }
                  sampleBody.push(x);
              })
              console.log(sampleBody)
              setBody(sampleBody)
          }
          else{
              const sampleBody = [];
            
      
              [allOrders].map((order)=>{
                 
                  let x={
                      "OrderID":order["orderid"],
                      "vehicleDetails":[]
      
                  }
                  console.log(fetchedVehicle[order["orderid"]])
                  if(fetchedVehicle[order["orderid"]].length==0){
                      x["vehicleDetails"].push({
                          vehicleNumber :"",
                          driverName :"",
                          escortName :"",
                          warehouseIncharge :"",
                          driverContact :"",
                          escortContact :"",
                          remarks:""
                      })
                  }
                  fetchedVehicle[order["orderid"]].map((vehicle)=>{
                      x["vehicleDetails"].push({
                          vehicleNumber : vehicle.vehiclenumber,
                          driverName : vehicle.drivername,
                          escortName : vehicle.escortname,
                          warehouseIncharge : vehicle.warehouseinchargesender,
                          driverContact : vehicle.drivercontact,
                          escortContact : vehicle.escortcontact,
                          remarks: vehicle.remarks
                      })
                  })
                  sampleBody.push(x);
              })
              console.log(sampleBody)
              setBody(sampleBody)
          }
      },[fetchedVehicle])

      
    

      // console.log(sampleBody)
      
      const baseUrl = "http://localhost:8100/unit";
      const handleFormSubmit = async (e) => {
          
           console.log({"Details":body});
           if(body!=0)
           setVehicleDetails({"Details":body});
      };

      useEffect(()=>{
          console.log(body)
          console.log(unitDetails)
      },[body,unitDetails])

     
      function handleUnits(id){
        console.log(dataInput)
        let kk = dataInput[id].replace(/^\s+|\s+$/g, '').split(/[ ]?\n/);
        console.log(kk)
      }
       
    

       
    



      
    const navigate = useNavigate()
    return(
        <div className="shadow-lg mb-10 pb-10 bg-white" style={{borderRadius:"2%"}}>
          
          
          
            <div className='MainHeader pd-5 ' style={{ display: "flex", "flexDirection": "row", "justifyContent": "space-between", "alignItems": "center" }}>
                    <h4 className='text-white'>Order</h4>
                    <button className='text-white text-lg' onClick={()=>setIsvalidated(0)}>Validate a Order</button>
            </div>
           {isvalidated==0 &&
           <div className='m-10 '>
                <div className='flex justify-center '>
                    <input className='w-1/3 border-1 border p-3 m-3 rounded-md text-lg'
                     placeholder='Search by the Order Id'
                     value={orderID}
                     onChange={(e)=>{
                      setOrderID(e.target.value)
                      setDisplayMessage("")
                     }}
                     />
                    <button className='text-white h-14 m-2 p-2 pl-3 pr-3 text-lg'
                    onClick={getOrders}
                    >Validate Order</button>
                </div>
                {isValidating==1 && (<div className='text-lg'>Validating Your Request...</div>)}
           
           {
           (displayMessage!="") && 
           (<>
            <p className='text-red-500 text-lg'>{displayMessage}</p>
           </>)
          }
          </div>
        }
        {isvalidated==1 && 
        <>
          <div>
            <div className='m-10 text-3xl text-left'>
              <p>Order Id : {allOrders["orderid"]}</p>
            </div>
           <div className='flex m-5'>
              <div className='w-1/6 p-1 shadow-md m-2 text-7xl'>
                <div >{allOrders["item"]}</div>
                <p className='text-lg '>Unit Type</p>
              </div>
              <div className='w-1/6 p-1 shadow-md m-2 text-7xl'>
                <div >{allOrders["itemmodel"]}</div>
                <p className='text-lg '>Model</p>
              </div>
              <div className='w-1/6 p-1 shadow-md m-2 text-7xl'>
                <div >{allOrders["itemquantity"]}</div>
                <p className='text-lg '>Quantity</p>
              </div>
              <div className='w-1/6 p-1 shadow-md m-2 text-7xl'>
                <div >{allOrders["manufacturer"]}</div>
                <p className='text-lg '>Manufacturer</p>
              </div>
              <div className='w-1/6 p-1 shadow-md m-2 text-7xl'>
                <div >{allOrders["pendingtorecieve"]}</div>
                <p className='text-lg '>Pending for Recieve</p>
              </div>
              <div className='w-1/6 p-1 shadow-md m-2 text-7xl'>
                <div >{allOrders["pendingtosend"]}</div>
                <p className='text-lg '>Pendng to Dispatch</p>
              </div>
           </div>

          </div>
          {role==-1&& 
           <div className='text-xl text-left m-8 mt-16 flex'>
           <p>Select your Role :  </p>
           <button className='text-white ml-3' onClick={()=>setRole(0)}>Sender</button>
           <button className='text-white ml-3' onClick={()=>setRole(1)}>Reciever</button>
         </div>
        }
         </>
        }

        {role==0 && 
        <>
           
          <>
         
            <div className={`${styles.myWrapper1}`} style={{ position: "relative", height: "100%", width:"96%", margin: "2%" }}>
                <div className='MainHeader pd-5 ' style={{ display: "flex", "flexDirection": "row", "justifyContent": "space-between", "alignItems": "center" }}>
                    <h4 className='text-white'> Details</h4>
                </div>
                
               
               
                {body && body.map((oneorder,ind1)=>(

               
                <div className="flex w-full">
                    
                    <div className=" w-full">

                       
                    {oneorder["vehicleDetails"].map((val, ind) => (
                        <div className="bg-white p-1 rounded-lg shadow-lg  w-full">

                        <div className="" style={{border: "solid 1px", borderRadius: "10px", width:"94%", margin:"3%"}} >
                            
                    <div className="">
                        <div className=" w-full flex justify-center">
                            <div style={{margin:"3%",marginTop:"3%"}} className="w-1/2">
                                <p className="text-left ml-1 text-lg">Vehicle Number : </p>
                                <input
                                className=" border-l-purple-400 border-1  h-10 w-full rounded-md bg-zinc-100 p-2 px-5 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
                                name="vehicleNumber"
                                placeholder="Vehicle Number"
                                type="text"
                                value={body[ind1]["vehicleDetails"][ind].vehicleNumber}
                                onChange={(e) => {
                                    setBody((prevBody) => {
                                    let kk = [...prevBody]
                                    kk[ind1]["vehicleDetails"][ind].vehicleNumber = e.target.value;
                                    return (kk);
                                    })
                                }}
                                />
                                <br/>
                                <br/>
                                <p className="text-left ml-1 text-lg">Driver Name : </p>
                                <input
                                className=" border-l-purple-400 border-1  h-10 w-full rounded-md bg-zinc-100 p-2 px-5 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
                                name="driverName"
                                placeholder="Driver Name"
                                value={body[ind1]["vehicleDetails"][ind].driverName}
                                type="text"
                                onChange={(e) => {
                                    setBody((prevBody) => {
                                    let kk = [...prevBody]
                                    kk[ind1]["vehicleDetails"][ind].driverName = e.target.value;
                                    return (kk);
                                    })
                                }}
                                />
                                <br/>
                                <br/>
                                <p className="text-left ml-1 text-lg">Escort Name : </p>
                                <input
                                className=" border-l-purple-400 border-1  h-10 w-full rounded-md bg-zinc-100 p-2 px-5 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
                                name="escortName"
                                value={body[ind1]["vehicleDetails"][ind].escortName}
                                placeholder="Escort Name"
                                type="text"
                                onChange={(e) => {
                                    setBody((prevBody) => {
                                    let kk = [...prevBody]
                                    kk[ind1]["vehicleDetails"][ind].escortName = e.target.value;
                                    return (kk);
                                    })
                                }}
                                />
                                <br/>
                                <br/>
                                <p className="text-left ml-1 text-lg">Remarks : </p>
                                <input
                                className=" border-l-purple-400 border-1  h-10 w-full rounded-md bg-zinc-100 p-2 px-5 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
                                name="remarks"
                                placeholder="Remarks"
                                value={body[ind1]["vehicleDetails"][ind].remarks}
                                type="text"
                                onChange={(e) => {
                                    setBody((prevBody) => {
                                    let kk = [...prevBody]
                                    kk[ind1]["vehicleDetails"][ind].remarks = e.target.value;
                                    return (kk);
                                    })
                                }}
                                />
                            </div>
                            <div style={{margin:"3%",marginTop:"3%"}} className="w-1/2">
                                <p className="text-left ml-1 text-lg">Sender Incharge : </p>
                                <input
                                className=" border-l-purple-400 border-1  h-10 w-full rounded-md bg-zinc-100 p-2 px-5 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
                                name="warehouseIncharge"
                                placeholder="Sender Incharge"
                                value={body[ind1]["vehicleDetails"][ind].warehouseIncharge}
                                type="text"
                                onChange={(e) => {
                                    setBody((prevBody) => {
                                    let kk = [...prevBody]
                                    kk[ind1]["vehicleDetails"][ind].warehouseIncharge = e.target.value;
                                    return (kk);
                                    })
                                }}
                                />
                                <br/>
                                <br/>
                                <p className="text-left ml-1 text-lg">Driver Contact : </p>
                                <input
                                className=" border-l-purple-400 border-1  h-10 w-full rounded-md bg-zinc-100 p-2 px-5 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary "
                                name="driverContact"
                                value={body[ind1]["vehicleDetails"][ind].driverContact}
                                placeholder="Driver Contact"
                                type='number'
                                onChange={(e) => {
                                    setBody((prevBody) => {
                                    let kk = [...prevBody]
                                    kk[ind1]["vehicleDetails"][ind].driverContact = e.target.value;
                                    return (kk);
                                    })
                                }}
                                />
                                <br/>
                                <br/>
                                <p className="text-left ml-1 text-lg">Escort Contact : </p>
                                <input
                                className=" border-l-purple-400 border-1  h-10 w-full rounded-md bg-zinc-100 p-2 px-5 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
                                name="escortContact"
                                value={body[ind1]["vehicleDetails"][ind].escortContact}
                                placeholder="Escort Contact"
                                type="number"
                                onChange={(e) => {
                                    console.log(e.target.value)
                                    setBody((prevBody) => {
                                    let kk = [...prevBody]
                                    kk[ind1]["vehicleDetails"][ind].escortContact = e.target.value;
                                    return (kk);
                                    })
                                }}
                                />
                               
                            </div>
                        </div>
                    </div>
                    <h4 className='text-center' >Units Details (IDs)</h4>
                    <div className=' w-full mb-6'> 
                        
                        {iscollapsed==0 &&<div className="w-full">
                        <textarea name="" id="" cols="60" className='p-2' rows={10}
                        onChange={(e)=>{
                          
                          setDataInput((prev)=>{
                            let hh = [...prev]
                            hh[ind] = e.target.value;
                            return hh;
                          })
                        }}
                        value={dataInput[ind]}
                        
                        ></textarea>

                        
                        
                      </div>
                      }

                      <div className='flex justify-around mb-4'>   <button className='text-white mt-2' onClick={()=>setIsFile(1)}>Enter units details via csv file</button>
                        </div>
                        {isFile==1 && <div className='bg-white shadow-sm shadow-black w-1/3  m-auto p-5 rounded-md'>
                          <div className='text-right'><button className='text-white' onClick={()=>setIsFile(0)}>Close</button></div>
                        <div className=''>
                        <input
                            className='w-full '
                            onChange={handleFileChange}
                            id="csvInput"
                            name="file"
                            type="File"
                          />
                          </div>
                          <button onClick={()=>handleParse(ind)} className="text-white">Fetch data from file</button>
                          <br/>
                          </div>} 
                        
                        </div>
                      
                    
                </div>

                
                        
                        </div>
                    ))}

                    <div className="flex justify-end"><button onClick={(e) => {
                        setBody((prev) => {
                        let temp = {
                            vehicleNumber : "",
                            driverName : "",
                            escortName : "",
                            warehouseIncharge : "",
                            driverContact : "",
                            escortContact : "",
                            remarks: ""
                        };
                        let newBody = [ ...prev ];
                        console.log(newBody)
                        if(newBody[ind1]["vehicleDetails"][newBody[ind1]["vehicleDetails"].length-1].vehicleNumber!="" && newBody[ind1]["vehicleDetails"][newBody[ind1]["vehicleDetails"].length-1].driverName!="" && newBody[ind1]["vehicleDetails"][newBody[ind1]["vehicleDetails"].length-1].driverContact!=""){
                             newBody[ind1]["vehicleDetails"].push(temp);
                        }
                        console.log(newBody)
                        return newBody;
                        })
                    }} type="button" className="text-white bg-orange-600 p-1 text-2xl w-10 h-10 -mt-5 " style={{ borderRadius: "50%" }}> +</button></div>
                    </div>
                </div>
                 ))}
               
            </div>
            <button onClick={handleFormSubmit} className="text-white">Submit</button>
        </>
          </>
        }

       
        {/* <ReadCsv/> */}
        
        </div>
    )
}

export default Orders
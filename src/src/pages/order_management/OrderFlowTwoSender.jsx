import React, { useState, useEffect } from "react";
import UnitDescription from "./Unit_description"
import { useParams } from "react-router-dom";
import styles from './styles/order.module.css'
import style from './styles/optimisedAllocationTable.module.css'
import OrderActions from "./OrderActions";
import SourceLocationPin from '../../assets/src_location_pin.png'
import DestLocationPin from '../../assets/dest_location_pin.png'
import { DynamicDataTable } from '@langleyfoxall/react-dynamic-data-table';

export default function OrderFlowTwoSender({OrderID}) {
  const id=OrderID
  let orderID="";
  for(let i=0;i<id.length;i++){
    if(id[i]=='-'){
      orderID+="/";
    }
    else
    orderID+=id[i];
  }

  const [initialTempD,setInitalTempD] = useState([
    {
        "User Id" : "SSPPAARR1",
        "Name" : "Kunj Gupta"
    },
    {
        "User Id" : "SSPPORRR2",
        "Name" : "Lokesh Parmar"
    },
    {
        "User Id" : "SWPYATRR3",
        "Name" : "Manav Khandelwal"
    },
    {
        "User Id" : "SSRIOARR4",
        "Name" : "Atal Jasoria"
    }
  ]);
  const [initialAssignD,setInitialAssignD] = useState([
    {
        "User Id" : "SSPPAARR5",
        "Name" : "Rajesh Singh"
    },
    {
        "User Id" : "SSPEBARR6",
        "Name" : "Kavita Das"
    },
    {
        "User Id" : "SSRPAYRR7",
        "Name" : "Yash Patel"
    },
    {
        "User Id" : "SSPYWARR8",
        "Name" : "Atal Gupta"
    }
  ]);
  const [Order, setOrder] = useState([]);
  const [allOrders, setAllOrders] = useState([]);
  const [isPageLoaded, setIsPageLoaded] = useState(0);
  const [orderById, setOrderById] = useState({});
  const [orderDetailPage, setOrderDetailPage] = useState("-1");
  const UserId = window.sessionStorage.getItem('sessionToken');
  const [flag, setFlag] = useState(0);
  const [tempD,setTempD] = useState([]);
  const [assignD,setAssignD] = useState(initialAssignD);
  const [isDetail, setIsDetail] = useState(0);
  const [initialVisibilityValues,setInitialVisibilityValues] = useState({
    assignUsers: false,
    fillVehicleDetails: false
});
    const [cardVisibility, setCardVisibility] = useState(initialVisibilityValues);
    const [data, setData] = useState([
        {
            'Model': 'M1',
            'Quantity CU': 50,
            'Quantity BU': 50,
            'Quantity VVPAT': 20
        },
        {
            'Model': 'M2',
            'Quantity CU': 50,
            'Quantity BU': 50,
            'Quantity VVPAT': 20
        }
    ])
    const [isVisible2,setIsVisible2] = useState(true);

  useEffect(() => {
    async function getOrders() {
      try {
        const body = {"orderid": orderID}
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
        if(data2['data'])
            setAllOrders(data2["data"])
            else{
                alert(data2.message)
              }
      } catch (err) {
        console.log(err);
      }
    }
    getOrders();
  },[])
  useEffect(() => {
    let orderBy_Id = {}
    if (flag == 0 && allOrders != []) {
      setOrder([]);
      let myorder={
        units:[]
      }
      
      allOrders.map((order) => {

        setFlag(1)
        
        const id = (orderID)
        if(order["referenceorderid"]==id){
          myorder["orderid"]=order["referenceorderid"]
          myorder["creatoruserid"]=order["creatoruserid"]
          myorder["orderstatus"]=order["orderstatus"]
          myorder["source"]=order["source"]
          myorder["destination"]=order["destination"]
          myorder["type"]=order["type"]
          let unit={}
          unit["item"]=order["item"]
          unit["itemmodel"]=order["itemmodel"]
          unit["itemquantity"]=order["itemquantity"]
          unit["manufacturer"]=order["manufacturer"]
          myorder["units"].push(unit)
          myorder["timestamp"]=order["timestamp"]
        }
        
      })
      setOrder(myorder)
    }
    

    setOrderById(orderBy_Id)
  }, [allOrders])

   

    const ActionButton = ({ isActive, text, name, onClick }) => {
    return (
    <button
        className={`font-mediumisActive mx-auto mb-8 w-5/5 border-[1px] border-solid border-secondary hover:bg-secondary hover:text-white ${
        isActive ? "bg-secondary text-white" : "bg-white  text-secondary"
        }`}
        name={name ? name : text}
        onClick={onClick}
        stype={{margin: "10px"}}
    >
        {text}
    </button>
    );
};

    const handleButtonClick = (e) => {
    const { name } = e.currentTarget;
    const update = { ...initialVisibilityValues };
    if (cardVisibility[name]) {
        update[name] = false;
    } else {
        update[name] = true;
    }
    setCardVisibility(update);
    };

    function addToTemp(val) {
        const t = {
            "User Id" : val["User Id"],
            "Name" : val["Name"],
            "Sub" : (<button  onClick={(e)=>{addToTemp(val)}} className="text-white">-</button>)
        };
        setTempD((prev)=>{
            const newBody = [...prev];
            newBody.push({
                "User Id" : val["User Id"],
                "Name" : val["Name"],
                "Add" : (<button onClick={()=>{addToAssign(val)}} className="text-white">+</button>)
            });
            return newBody;
        });
        setAssignD((prev)=>{
            const newBody = [];
            prev.map(function(val){
                if(val["User Id"]!=t["User Id"]) {
                    newBody.push(val);
                } 
            });
            return newBody;
        });
    };

    function addToAssign(val) {
        const t = val["User Id"];
        setAssignD((prev)=>{
            const newBody = [...prev];
            newBody.push({
                "User Id" : val["User Id"],
                "Name" : val["Name"],
                "Sub" : (<button  onClick={(e)=>{addToTemp(val)}} className="text-white">-</button>)
            });
            return newBody;
        });
        setTempD((prev)=>{
            const newBody = [];
            prev.map(function(val){
                if(val["User Id"]!=t) {
                    newBody.push(val);
                } 
            });
            return newBody;
        });
    };

    function getTempD(v) {
        if (v) {
            const tmp = [...new Set(v.map((val) => {
                    return JSON.stringify({
                        'User Id': val['User Id'],
                        'Name' : val['Name']
                    })
                
            }).filter(val => val))]
            // setTableData(tmp.map(val => JSON.parse(val)));
            let pp=tmp.map(val => JSON.parse(val));
            for(let i=0;i<pp.length;i++){
                pp[i]["Add"]=(<button onClick={()=>{addToAssign(pp[i])}} className="text-white">+</button>);
            }
            console.log("HP");
            console.log(pp);
            setTempD(pp);
            console.log(tempD);
        }
    }

    useEffect(() => {
        getTempD(initialTempD);
    }, [initialTempD])

    useEffect(() => {
        if (initialAssignD) {
            const tmp = [...new Set(initialAssignD.map((val) => {
                if (1) {
                    return JSON.stringify({
                        'User Id': val['User Id'],
                        'Name' : val['Name']
                    })
                }
                else {
                    return null
                }
            }).filter(val => val))]
            let pp=tmp.map(val => JSON.parse(val));
            for(let i=0;i<pp.length;i++){
                pp[i]["Sub"]=(<button  onClick={(e)=>{
                    console.log("Clicked - "+pp[i]["User Id"]);
                    addToTemp(pp[i]);
                }} className="text-white">-</button>);
            }
            console.log(pp);
            setAssignD(pp);
        }
    }, [initialAssignD])

    const AssignUser = ({isVisible}) =>{
        

        return isVisible2?(isVisible&&<>
            <div className={`${styles.myWrapper1}`} style={{ position: "relative", height: "100%", width:"96%", margin: "2%" }}>
            {isDetail == 0 ? <div className='MainHeader pd-5 ' style={{ display: "flex", "flexDirection": "row", "justifyContent": "space-between", "alignItems": "center" }}>
                <h4 className='text-white'>Assign Users</h4>
            </div> : <></>}
            {isDetail == 0 ?
                <>
                <div className="grid" style={{display: "grid", gridTemplateColumns: "1fr 1fr"}}>
                    <div className={styles.Scroll} style={{width: "100%"}}>
                        <h5 style={{textAlign: "center", margin: "2%"}}>Temporary Users</h5>
                        <DynamicDataTable
                            rows={tempD}
                            buttons={[]}
                        />
                    </div>
                    <div className={styles.Scroll} style={{width: "100%"}}>
                        <h5 style={{textAlign: "center", margin: "2%"}}>Assigned Users</h5>
                        <DynamicDataTable
                            rows={assignD}
                            buttons={[]}
                        />
                    </div>
                    
                </div>
                <button onClick={()=>{
                    console.log("Submitted");
                    setIsVisible2(false)}} className="text-white" style={{width: "15%",marginTop:"0", alignContent:"center"}}>Submit</button> 
                </>
                : ''
            }
            </div>
        </>):(
            isVisible&&<div className={`${styles.myWrapper1}`} style={{ position: "relative", height: "100%", width:"96%", margin: "2%" }}>
            <div className='MainHeader pd-5 ' style={{ display: "flex", "flexDirection": "row", "justifyContent": "space-between", "alignItems": "center" }}>
                <h4 className='text-white'>Assigned Users</h4>
            </div>
                    <div className={styles.Scroll} style={{width: "100%"}}>
                        <DynamicDataTable
                            rows={assignD}
                            fieldsToExclude={['Sub']}
                            buttons={[]}
                        />
                    </div>
            </div>
        )
    }

    // const FVDetails = ({isVisible}) =>{
    //     const sampleBody = [{
    //         vehicleNumber : "",
    //         driverName : "",
    //         escortName : "",
    //         senderIncharge : "",
    //         driverContact : "",
    //         escortContact : ""
    //     }];
    //     const [body, setBody] = useState(sampleBody)
    //     const baseUrl = "http://localhost:8100/unit";
    //     const handleFormSubmit = async (e) => {
    //     // try {
    //     //     const response = await fetch(`${baseUrl}/ep_mark`, {
    //     //     method: "POST",
    //     //     headers: { "Content-Type": "application/json" },
    //     //     credentials: "include",
    //     //     body: JSON.stringify({ ...inputValues }),
    //     //     });
    //     //     console.log(response);
    //     //     console.log(JSON.stringify({ ...inputValues }));
    //     //     const data = await response.json();
    //     //     if (data.status === 200) {
    //     //     alert(data.message);
    //     //     } else {
    //     //     alert(data.message);
    //     //     }
    //     // } catch (err) {
    //     //     alert(`Error occured: ${err}`);
    //     // }
    //     console.log(body);
    //     };

    //     return isVisible&&<>
    //         <div className={`${styles.myWrapper1}`} style={{ position: "relative", height: "100%", width:"96%", margin: "2%" }}>
    //             <div className='MainHeader pd-5 ' style={{ display: "flex", "flexDirection": "row", "justifyContent": "space-between", "alignItems": "center" }}>
    //                 <h4 className='text-white'>Fill Vehicle Details</h4>
    //             </div>
    //             <div className="flex w-full">
    //                 <div className=" w-full">
    //                 {body.map((val, ind) => (
    //                     <div className="bg-white p-1 rounded-lg shadow-lg mt-2 w-full">
    //                     <div className="" style={{border: "solid 1px", borderRadius: "10px", width:"94%", margin:"3%"}} >
    //                 <div className="">
    //                     <h4 style={{margin:"auto", textAlign:"center", marginTop:"1%"}} className="w-full">Order Id : OM12993455</h4>
    //                     <div className=" w-full flex justify-center">
    //                         <div style={{margin:"3%",marginTop:"3%"}} className="w-1/2">
    //                             <label>Vehicle Number : </label>
    //                             <input
    //                             className="h-10 w-full rounded-md bg-zinc-100 p-2 px-5 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
    //                             name="vehicleNumber"
    //                             placeholder="Vehicle Number"
    //                             onChange={(e) => {
    //                                 setBody((prevBody) => {
    //                                 prevBody[ind].vehicleNumber = e.target.value;
    //                                 return (prevBody);
    //                                 })
    //                             }}
    //                             />
    //                             <br/>
    //                             <br/>
    //                             <label>Driver Name : </label>
    //                             <input
    //                             className="h-10 w-full rounded-md bg-zinc-100 p-2 px-5 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
    //                             name="driverName"
    //                             placeholder="Driver Name"
    //                             onChange={(e) => {
    //                                 setBody((prevBody) => {
    //                                 prevBody[ind].driverName = e.target.value;
    //                                 return (prevBody);
    //                                 })
    //                             }}
    //                             />
    //                             <br/>
    //                             <br/>
    //                             <label>Escort Name : </label>
    //                             <input
    //                             className="h-10 w-full rounded-md bg-zinc-100 p-2 px-5 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
    //                             name="escortName"
    //                             placeholder="Escort Name"
    //                             onChange={(e) => {
    //                                 setBody((prevBody) => {
    //                                 prevBody[ind].escortName = e.target.value;
    //                                 return (prevBody);
    //                                 })
    //                             }}
    //                             />
    //                         </div>
    //                         <div style={{margin:"3%",marginTop:"3%"}} className="w-1/2">
    //                             <label>Sender Incharge : </label>
    //                             <input
    //                             className="h-10 w-full rounded-md bg-zinc-100 p-2 px-5 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
    //                             name="senderIncharge"
    //                             placeholder="Sender Incharge"
    //                             onChange={(e) => {
    //                                 setBody((prevBody) => {
    //                                 prevBody[ind].senderIncharge = e.target.value;
    //                                 return (prevBody);
    //                                 })
    //                             }}
    //                             />
    //                             <br/>
    //                             <br/>
    //                             <label>Driver Contact : </label>
    //                             <input
    //                             className="h-10 w-full rounded-md bg-zinc-100 p-2 px-5 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
    //                             name="driverContact"
    //                             placeholder="Driver Contact"
    //                             onChange={(e) => {
    //                                 setBody((prevBody) => {
    //                                 prevBody[ind].driverContact = e.target.value;
    //                                 return (prevBody);
    //                                 })
    //                             }}
    //                             />
    //                             <br/>
    //                             <br/>
    //                             <label>Escort Contact : </label>
    //                             <input
    //                             className="h-10 w-full rounded-md bg-zinc-100 p-2 px-5 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
    //                             name="escortContact"
    //                             placeholder="Escort Contact"
    //                             onChange={(e) => {
    //                                 setBody((prevBody) => {
    //                                 prevBody[ind].escortContact = e.target.value;
    //                                 return (prevBody);
    //                                 })
    //                             }}
    //                             />
    //                         </div>
    //                     </div>
    //                 </div>
                    
    //             </div>
                        
    //                     </div>
    //                 ))}

    //                 <div className="flex justify-end"><button onClick={() => {
    //                     setBody((prev) => {
    //                     let temp = {
    //                         vehicleNumber : "",
    //                         driverName : "",
    //                         escortName : "",
    //                         senderIncharge : "",
    //                         driverContact : "",
    //                         escortContact : ""
    //                     };
    //                     const newBody = [ ...prev ];
    //                     newBody.push(temp);
    //                     return newBody;
    //                     })
    //                 }} type="button" className="text-white bg-orange-600 p-1 text-2xl w-10 h-10 -mt-5 " style={{ borderRadius: "50%" }}> +</button></div>
    //                 </div>
    //             </div>
    //             <button onClick={handleFormSubmit} className="text-white">Submit</button>
    //         </div>
    //     </>
    // }



  return (
    <>
   
    <div className="grid">
      <ActionButton isActive={cardVisibility.assignUsers} text="Assign Users" name="assignUsers" onClick={handleButtonClick} />
      {/* <ActionButton isActive={cardVisibility.fillVehicleDetails} text="Fill Vehicle Details" name="fillVehicleDetails" onClick={handleButtonClick} /> */}
    </div>
    <AssignUser isVisible={cardVisibility.assignUsers}/>
    {/* <FVDetails isVisible={cardVisibility.fillVehicleDetails}/> */}
    </>
  );
}
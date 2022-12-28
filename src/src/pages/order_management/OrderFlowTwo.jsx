import React, { useState, useEffect } from "react";
import UnitDescription from "./Unit_description"
import { useParams } from "react-router-dom";
import styles from './styles/order.module.css'
import style from './styles/optimisedAllocationTable.module.css'
import OrderActions from "./OrderActions";
import SourceLocationPin from '../../assets/src_location_pin.png'
import DestLocationPin from '../../assets/dest_location_pin.png'
import { DynamicDataTable } from '@langleyfoxall/react-dynamic-data-table';
import { fillAllocateUsers, getAllocateUsers, getVehicleDetails, setVehicleDetails } from "./Utils";


export default function OrderFlowTwo({Order,OrderID}) {

    const [loading,setLoading] = useState(true)
  const id=OrderID
  let orderID="";
  for(let i=0;i<id.length;i++){
    if(id[i]=='-'){
      orderID+="/";
    }
    else
    orderID+=id[i];
  }

  const [fetchedVehicle, setFetchedVehicle] = useState(0);
  const [fetchedUsers, setFetchedUsers] = useState(0);

   function handleAllocateUser(){
    console.log(allocateUsers)
    let body = {
        
        "details":[

        ]
    }
    allocateUsers.map((value,id)=>{
        body["details"].push({
            "orderid":value["orderid"],
            "UserDetails":[]
        })
        value["users"].map((user)=>{
            body["details"][id]["UserDetails"].push({
                "userid":user["User Id"],
                "username":user["Name"]
            })
        })
    })
    console.log(body)
   
    fillAllocateUsers(body)
  }
  

 

  function removeUser(userid,orderid){
    console.log(userid,orderid)


        setAvialable((prev)=>{
            let newdata = []
            prev.map((val)=>{
                if(val["User Id"]!==userid){
                    newdata.push(val)
                }
                else{
                   
                        console.log(allocateUsers)
                        let newdata = [...allocateUsers] 
                        allocateUsers.map((value,id)=>{
                            if(value["orderid"]==orderid && (newdata[id]["users"].length==0||  newdata[id]["users"][newdata[id]["users"].length-1]!=val)){
                                newdata[id]["users"].push(val)
                            }
                        })
                        setAllocateUsers(newdata)
                    
                }
            })   
            console.log(newdata)
            
            return newdata         
        })

       



  }

  function subuser(userid,orderid){
    console.log(userid,orderid)

        
       setAllocateUsers((prev)=>{
            let newdata=[]
            console.log(prev)
            prev.map((val)=>{
                if(val["orderid"]==orderid){
                    console.log(val)
                    newdata.push({
                        "orderid":orderid,
                        "users":[]
                    })
                val["users"].map((val2)=>{
                    if(val2["User Id"]!=userid && (newdata[newdata.length-1]["users"].length==0 || newdata[newdata.length-1]["users"][newdata[newdata.length-1]["users"].length-1]!=val2)){
                        console.log(val2)
                        newdata[newdata.length-1]["users"].push(val2)
                        
                    }
                    else{
                        let pp=[...available];
                        if(pp.length==0 ||(pp[pp.length-1])!=val2){
                            pp.push(val2)
                        }
                        setAvialable(pp);
                    }
                   
                })
            }
            else{
                newdata.push(val);
            }

            })

            return newdata
       })


  }

  

  const [available,setAvialable] = useState([
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
    },
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

  const [allocateUsers,setAllocateUsers] = useState();
  const [Usertable,setUserTable] = useState();


  const [allOrders, setAllOrders] = useState([]);
  const [isPageLoaded, setIsPageLoaded] = useState(0);
  const [orderById, setOrderById] = useState({});
  const [orderDetailPage, setOrderDetailPage] = useState("-1");
  const UserId = window.sessionStorage.getItem('sessionToken');
  const [flag, setFlag] = useState(0);
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


    function getData(){
        if(loading){

            console.log("calling jthe main thing")
            
              setAllOrders(Order)
            
            
            let body={
                "listofOrders": [
                  
                ]
              }
            Order.map((val)=>{
                body["listofOrders"].push({
                    "orderid":val["orderid"]
                })
            })
            let kk = getVehicleDetails(body);
            kk.then(function(result) {
                
                if(result!=0){
                    console.log(result,"ffffffffffffffffffffffffffffffffffffffffffffffffffffff")
                    setFetchedVehicle(result); 
                }
                
            })
            let pp = getAllocateUsers(body);
            pp.then(function(result) {
               
                if(result!=0 ){
                    console.log(result,"uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu")
                setFetchedUsers(result); 
            }
            })
        }
        
    }

  useEffect(() => {

    let timer1 = setTimeout(() => getData(), 0.1 * 1000);

    return () => {
      clearTimeout(timer1);
    };
    
    // return () => {
    //     setLoading(false);
    //   };
    
  },[loading])

//   setLoading(true);

  useEffect(()=>{
    if(fetchedUsers!=0){
    let p = []
    console.log(fetchedUsers)
    console.log(allOrders)
    allOrders.map((val)=>{
        let x = {
            "orderid":val["orderid"],
            "users":[]
        }
        fetchedUsers[val["orderid"]].map((user)=>{
            x["users"].push({
                "User Id" : user.userid,
                "Name" : user.username
            });
        })

        p.push(x)
    })
    console.log(p)
    setAllocateUsers(p);
    }
    else{
        let p = []
        console.log(fetchedUsers)
        console.log(allOrders)
        allOrders.map((val)=>{
            let x = {
                "orderid":val["orderid"],
                "users":[]
            }
    
            p.push(x)
        })
        console.log(p)
        setAllocateUsers(p);
    }
  },[allOrders,fetchedUsers])


  useEffect(()=>{
    // console.log(fetchedUsers,"userssssssssssss")
    // console.log(fetchedVehicle,"vehiclesssssssssssss")
  },[fetchedUsers,fetchedVehicle])
 
    

   

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
    console.log(update)
    };

    
    const AssignUser = ({isVisible}) =>{
        
        
        return ( isVisible &&
        

        <div className="shadow-lg mb-10 pb-10 bg-white" style={{borderRadius:"2%"}}>
            <div className='MainHeader pd-5 ' style={{ display: "flex", "flexDirection": "row", "justifyContent": "space-between", "alignItems": "center" }}>
                    <h4 className='text-white'>Assign Users</h4>
                </div>
            {allocateUsers && allocateUsers.map((order,id)=>(
                <div className="border-2 border-black rounded-md m-10  p-4 bg-white" >
                    <p className="text-lg"> Order Id :  {order["orderid"]}</p>
                    <div className="flex justify-around">
                        <div className="w-1/2">
                            <p className=" text-lg mb-4">All Non Asigned Users</p>
                            <div className="border-black   pl-4 m-1  pr-4">
                            <table className="w-full">
                                <tr className="text-orange-500 h-10">
                                    <th>
                                        User Id
                                    </th>
                                    <th>
                                        Name
                                    </th>
                                    <th>
                                        Add
                                    </th>
                                    
                                </tr>
                               
                                <br/>
                                <tr><td colSpan={3}>
                                {available.length==0 && (<p className="text-center">No data</p>)}
                                </td></tr>
                            {available.map((user)=>(

                            <>
                            <tr>
                                    <td colSpan={3}><hr /></td>
                                </tr>
                                <tr >
                                    <td>
                                        {user["User Id"]}
                                    </td>
                                    <td>
                                        {user["Name"]}

                                    </td>
                                    <td>
                                        <button className="text-white" onClick={(e)=>removeUser(user["User Id"],order["orderid"])}>
                                            +
                                        </button>

                                    </td>
                                    
                                </tr>
                               

                                </>
                                
                            
                            ))}
                            </table>
                            
                            </div>
                        

                        </div>
                        <div className="w-1 bg-slate-500 mt-5"></div>
                        <div className="w-1/2">
                            <p className=" text-lg mb-4">Asigned Users</p>
                            <div className="border-black  pl-4 m-1 pr-4">
                            <table className="w-full">
                                <tr className="text-orange-500 h-10">
                                    <th>
                                        User Id
                                    </th>
                                    <th>
                                        Name
                                    </th>
                                    <th>
                                        Subtract
                                    </th>
                                    
                                </tr>
                                <br/>
                                <tr><td colSpan={3}>
                                {order["users"].length==0 && (<p className="text-center">No data</p>)}
                                </td></tr>
                           
                            {order["users"].map((user)=>(

                            <>
                            <tr>
                                <td colSpan="3"><hr></hr></td>
                               </tr>
                                <tr >
                                    <td>
                                        {user["User Id"]}
                                    </td>
                                    <td>
                                        {user["Name"]}

                                    </td>
                                    <td>
                                        <button className="text-white" onClick={(e)=>subuser(user["User Id"],order["orderid"])}>
                                            -
                                        </button>

                                    </td>
                                    
                                </tr>
                              

                                </>
                                
                            
                            ))}
                            </table>
                            </div>
                        

                        </div>
                       
                    </div>
                   
                </div>
            ))
             }
             <button className="text-white" onClick={handleAllocateUser}>Submit</button>
        </div>
    )}

    const FVDetails = ({isVisible}) =>{
        const [body, setBody] = useState()

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
              
        
                allOrders.map((order)=>{
                   
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
        },[body])

        return isVisible&&<>
            <div className={`${styles.myWrapper1}`} style={{ position: "relative", height: "100%", width:"96%", margin: "2%" }}>
                <div className='MainHeader pd-5 ' style={{ display: "flex", "flexDirection": "row", "justifyContent": "space-between", "alignItems": "center" }}>
                    <h4 className='text-white'>Fill Vehicle Details</h4>
                </div>
                
               
               
                {body && body.map((oneorder,ind1)=>(

               
                <div className="flex w-full">
                    
                    <div className=" w-full">

                    <h4 style={{margin:"auto", textAlign:"center", marginTop:"4%"}} className="w-full">Order Id : {oneorder["OrderID"]}</h4>
                       
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
                <button onClick={handleFormSubmit} className="text-white">Submit</button>
            </div>
        </>
    }



  return (
    <>
   
    <div className="grid grid-cols-2">
      <ActionButton isActive={cardVisibility.assignUsers} text="Assign Users" name="assignUsers" onClick={handleButtonClick} />
      <ActionButton isActive={cardVisibility.fillVehicleDetails} text="Fill Vehicle Details" name="fillVehicleDetails" onClick={handleButtonClick} />
    </div>
    <AssignUser isVisible={cardVisibility.assignUsers}/>
    <FVDetails isVisible={cardVisibility.fillVehicleDetails}/>
    </>
  );
}
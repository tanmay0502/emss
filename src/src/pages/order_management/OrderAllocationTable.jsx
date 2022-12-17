
import styles from './styles/optimisedAllocationTable.module.css'
import {ReactComponent as EditAllocation} from '../../assets/EditAllocation.svg'
import SourceLocationPin from '../../assets/src_location_pin.png'
import DestLocationPin from '../../assets/dest_location_pin.png'
import { DynamicDataTable } from '@langleyfoxall/react-dynamic-data-table'

function OrderAllocationTable({body, setBody, setUpdate, wearhouse }) {

  return (
    <div className=" w-full">
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
                        setUpdate((prev)=>{return (prev+1)%10});
                      }}
                    >
                      <option>{val.source?val.source:"Select"}</option>
                      { wearhouse.Supply&&
                        wearhouse.Supply.map((val) => (
                          <option value={val} className="text-black">
                            {val}
                          </option>
                        ))}
                      {/* {(<option value="0" className="text-black">
                        Select:
                      </option>)} */}
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
                          setUpdate((prev)=>{return (prev+1)%10});
                        }}
                      >
                        {" "}
                        <option>{val.destination?val.destination:"Select"}</option>
                        {wearhouse.Demand&&
                          wearhouse.Demand.map((val) => (
                            <option value={val} className="text-black">
                              {val}
                            </option>
                          ))}
                        {/* {(<option value="0" className="text-black">
                          Select:
                        </option>)} */}
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
                    body.details[ind].unitDetails.map((val, ind2) => (<>
                      <tr className="border-b-2 ">
                        <td><select className="border p-2 mb-2"
                          required
                          onChange={(e) => {
                            setBody((prevBody) => {
                              prevBody.details[ind].unitDetails[ind2].item = e.target.value;
                              return (prevBody);
                            })
                            setUpdate((prev)=>{return (prev+1)%10});
                          }}
                        >
                          <option
                          >{val.item?val.item:"Select"}</option>
                          <option value="BU">BU</option>
                          <option value="CU">CU</option>
                          <option value="VVPAT">VVPAT</option>
                        </select></td>
                        <td>
                          <input type="number" placeholder='0' value={val.itemquantity?val.itemquantity:""} className=" w-2/3 p-2 rounded-lg border mb-2"
                            onChange={(e) => {
                              setBody((prev)=>{
                                prev.details[ind].unitDetails[ind2].itemquantity = e.target.value;
                                return prev;
                              })
                              setUpdate((prev)=>{return (prev+1)%10});
                            }} required></input>
                        </td>
                        <td>
                          <select className="border p-2 mb-2"
                            required
                            onChange={(e) => {
                              setBody((prev)=>{
                                prev.details[ind].unitDetails[ind2].itemmodel = e.target.value;
                                return prev;
                              })
                              setUpdate((prev)=>{return (prev+1)%10});
                            }}
                          >
                            <option
                            >{val.itemmodel?val.itemmodel:"Select"}</option>
                            <option value="M2">M2</option>
                            <option value="M3">M3</option>
                          </select>
                        </td>
                        <td>
                          <select className="border p-2 mb-2 ml-3 mr-7"
                            required
                            onChange={(e) => {
                              setBody((prev)=>{
                                prev.details[ind].unitDetails[ind2].manufacturer = e.target.value;
                                return prev;
                              })
                              setUpdate((prev)=>{return (prev+1)%10});
                            }}

                          >
                            <option
                            >{val.manufacturer?val.manufacturer:"Select"}</option>
                            <option value="ECIL">ECIL</option>
                            <option value="BEL">BEL</option>
                          </select>
                        </td>
                        <div className='mt-2'><button type="button" className="text-white bg-red-600 p-1 text-2xl w-8 h-8 -mt-5 " style={{ borderRadius: "50%" }}
                        onClick={()=>{
                            setBody((prev)=>{
                                let temp = prev.details[ind].unitDetails.filter((e)=>e!=val);
                                prev.details[ind].unitDetails = temp;
                                return prev;
                            })
                            setUpdate((prev)=>{return (prev+1)%10});
                        }}
                        > -</button></div>
                      </tr>
                      </>
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
                      if(prev.details[ind].unitDetails[n-1].itemquantity){
                        prev.details[ind].unitDetails.push(temp)
                      }
                    } else {
                      prev.details[ind].unitDetails.push(temp)
                    }
                    return prev;
                  })
                  setUpdate((prev)=>{return (prev+1)%10});
                }} className="bg-orange-600 text-white  p-3  " >Add row</button></div>
              </div>
              <div className='flex justify-end mt-1'>
                    <button type="button" className="text-white bg-red-600 p-1 text-2xl w-10 h-10 -mt-5 " style={{ borderRadius: "50%" }}onClick={()=>{
                    setBody((prev)=>{
                        prev.details = prev.details.filter((ele)=>ele!=val);
                        return prev;
                    })
                    setUpdate((prev)=>{return (prev+1)%10});
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
                if(prev.details[n-1].source&&prev.details[n-1].destination){
                  prev.details.push(temp)
                }
              } else {
                prev.details.push(temp)
              }
              return prev;
            })
            setUpdate((prev)=>{return (prev+1)%10});
          }} type="button" className="text-white bg-orange-600 p-1 text-2xl w-10 h-10 -mt-5 " style={{ borderRadius: "50%" }}> +</button></div>
        </div>
  )
}

export default OrderAllocationTable
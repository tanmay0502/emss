import React, { useEffect, useState } from "react";
import { ReactComponent as CreateIssueIcon } from "../../assets/create_issue_request.svg";
import { useParams } from "react-router-dom";
import "./styles/generateOrder.css";

export default function GenarateOrder() {
  const { orderType } = useParams();
  const rightArrow = ">";
  return (
    <div className="p-3">
      <p className="text-left text-lg flex">
        <CreateIssueIcon className="mr-2" />
        Request ID : {orderType}
      </p>
      <div className="flex w-full">
        <div className=" w-3/5">
          <div className="bg-white p-6 rounded-lg shadow-lg mt-2 w-full">
            <label className="flex  w-full mb-2">Order Id<span className="text-red-600">*</span></label>

            <div className="flex">
              <input
                className="w-3/5 h-10 p-2 border rounded-md"
                placeholder="Type"
              ></input>
              <div className="flex justify-end w-2/5">
                <button className="text-white w-3/5   p-0 pl-3 pr-3">
                  Submit
                </button>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg mt-2 w-full">
            <div className="flex justify-between">
              <div className="w-full">
                <label className="flex  w-full mb-2">Source<span className="text-red-600">*</span></label>

                <div className="flex">
                  <select
                    className="w-5/6 h-10 p-2 border rounded-md"
                    placeholder="Type"
                  >
                    <option>Select</option>
                    <option>option</option>
                    <option>option</option>
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
                  >
                    {" "}
                    <option>Select</option>
                    <option>option</option>
                    <option>option</option>
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
                  <th className="font-normal">Type</th>
                  <th className="font-normal">Quantity</th>
                  <th className="font-normal">Model</th>
                </tr>
                <br/>
                <tr className="border-b-2 mt-2">
                  <td>CU</td>
                  <td>50</td>
                  <td>M3</td>
                  <div className="bg-green-700 text-white " style={{borderRadius:"50%",height:"20px", width:"20px"}}><a className="text-white">+</a></div>
                </tr>
                <br/>
                <tr className="border-b-2 mt-2">
                  <td>CU</td>
                  <td>50</td>
                  <td>M3</td>
                  <div className="bg-red-700 text-white " style={{borderRadius:"50%",height:"20px", width:"20px"}}><a className="text-white">-</a></div>
                </tr>
                <br/>
                <tr className="border-b-2 mt-2">
                  <td>CU</td>
                  <td>50</td>
                  <td>M3</td>
                  <div className="bg-green-700 text-white " style={{borderRadius:"50%",height:"20px", width:"20px"}}><a className="text-white">+</a></div>
                </tr>
              </table>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg mt-2 w-full">
            <div className="flex justify-between">
              <div className="w-full">
                <label className="flex  w-full mb-2">Source<span className="text-red-600">*</span></label>

                <div className="flex">
                  <select
                    className="w-5/6 h-10 p-2 border rounded-md"
                    placeholder="Type"
                  >
                    <option>Select</option>
                    <option>option</option>
                    <option>option</option>
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
                  >
                    {" "}
                    <option>Select</option>
                    <option>option</option>
                    <option>option</option>
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
                  <th className="font-normal">Type</th>
                  <th className="font-normal">Quantity</th>
                  <th className="font-normal">Model</th>
                </tr>
                <br/>
                <tr className="border-b-2 mt-2">
                  <td>CU</td>
                  <td>50</td>
                  <td>M3</td>
                  <div className="bg-green-700 text-white " style={{borderRadius:"50%",height:"20px", width:"20px"}}><a className="text-white">+</a></div>
                </tr>
                <br/>
                <tr className="border-b-2 mt-2">
                  <td>CU</td>
                  <td>50</td>
                  <td>M3</td>
                  <div className="bg-red-700 text-white " style={{borderRadius:"50%",height:"20px", width:"20px"}}><a className="text-white">-</a></div>
                </tr>
                <br/>
                <tr className="border-b-2 mt-2">
                  <td>CU</td>
                  <td>50</td>
                  <td>M3</td>
                  <div className="bg-green-700 text-white " style={{borderRadius:"50%",height:"20px", width:"20px"}}><a className="text-white">+</a></div>
                </tr>
              </table>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg mt-2 w-full">
            <div className="flex justify-between">
              <div className="w-full">
                <label className="flex  w-full mb-2">Source<span className="text-red-600">*</span></label>

                <div className="flex">
                  <select
                    className="w-5/6 h-10 p-2 border rounded-md"
                    placeholder="Type"
                  >
                    <option>Select</option>
                    <option>option</option>
                    <option>option</option>
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
                  >
                    {" "}
                    <option>Select</option>
                    <option>option</option>
                    <option>option</option>
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
                  <th className="font-normal">Type</th>
                  <th className="font-normal">Quantity</th>
                  <th className="font-normal">Model</th>
                </tr>
                <br/>
                <tr className="border-b-2 mt-2">
                  <td>CU</td>
                  <td>50</td>
                  <td>M3</td>
                  <div className="bg-green-700 text-white " style={{borderRadius:"50%",height:"20px", width:"20px"}}><a className="text-white">+</a></div>
                </tr>
                <br/>
                <tr className="border-b-2 mt-2">
                  <td>CU</td>
                  <td>50</td>
                  <td>M3</td>
                  <div className="bg-red-700 text-white " style={{borderRadius:"50%",height:"20px", width:"20px"}}><a className="text-white">-</a></div>
                </tr>
                <br/>
                <tr className="border-b-2 mt-2">
                  <td>CU</td>
                  <td>50</td>
                  <td>M3</td>
                  <div className="bg-green-700 text-white " style={{borderRadius:"50%",height:"20px", width:"20px"}}><a className="text-white">+</a></div>
                </tr>
              </table>
            </div>
          </div>
          
          
          <div className="flex justify-end"><button className="text-white bg-red p-1 text-2xl w-10 h-10 -mt-5 " style={{borderRadius:"50%"}}> +</button></div>
        </div>
        <div className="w-2/5">
          <div className="bg-white p-6 rounded-lg shadow-lg mt-2 w-full m-4 ">
            <p className="text-left font-semibold">Recent Orders</p>
            
             
              <div className="flex mt-2">
                <div className="w-5"><div className="h-2 w-2 rounded-full mt-1" style={{backgroundColor:"#84587C"}}></div></div>
                <p className="w-4/6 text-left">First Randomisation completed in district - Bhind, Gwalior, Indor and Bhopal</p>
                <p className="w-2/6 text-right text-sm text-gray-400">3hrs ago</p>
              </div>
              <hr/>
             
              <div className="flex mt-2">
                <div className="w-5"><div className="h-2 w-2 rounded-full mt-1" style={{backgroundColor:"#84587C"}}></div></div>
                <p className="w-4/6 text-left">First Randomisation completed in district - Bhind, Gwalior, Indor and Bhopal</p>
                <p className="w-2/6 text-right text-sm text-gray-400">3hrs ago</p>
              </div>
              <hr/>
             
              <div className="flex mt-2">
                <div className="w-5"><div className="h-2 w-2 rounded-full mt-1" style={{backgroundColor:"#84587C"}}></div></div>
                <p className="w-4/6 text-left">First Randomisation completed in district - Bhind, Gwalior, Indor and Bhopal</p>
                <p className="w-2/6 text-right text-sm text-gray-400">3hrs ago</p>
              </div>
              <hr/>
            
            
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg mt-2 w-full m-4 ">
            <p className="text-left font-semibold">Recent Orders <span className="text-gray-400">{rightArrow} Delhi</span></p>
            
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
                  <td>69</td>
                </tr>
                <br />
                <tr className=" border-b-2 ">
                  <td>M2</td>
                  <td>69</td>
                </tr>
                <br />
                <tr className=" border-b-2 ">
                  <td>M2</td>
                  <td>69</td>
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
                  <td>69</td>
                </tr>
                <br />
                <tr className=" border-b-2 ">
                  <td>M2</td>
                  <td>69</td>
                </tr>
                <br />
                <tr className=" border-b-2 ">
                  <td>M2</td>
                  <td>69</td>
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
                  <td>69</td>
                </tr>
                <br />
                <tr className=" border-b-2 ">
                  <td>M2</td>
                  <td>69</td>
                </tr>
                <br />
                <tr className=" border-b-2 ">
                  <td>M2</td>
                  <td>69</td>
                </tr>
                <br />
               
              </table>
               
              </div>
             </div>
              
            
          </div>
        </div>
      </div>
      <button className="text-white">Submit</button>
    </div>
  );
}

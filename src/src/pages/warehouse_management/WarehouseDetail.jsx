import React from "react";
import { AiOutlineArrowLeft, AiOutlineEdit } from 'react-icons/ai'
import { createSearchParams, useNavigate } from "react-router-dom";
import { ReactComponent as PermanentWarehouses } from '../../assets/PermanentWarehouses.svg';
import { ReactComponent as TemporaryWarehouses } from '../../assets/TemporaryWarehouses.svg';

function WarehouseDetail(props) {
  const navigate = useNavigate();

  return (
    <div className="user-details">
      <div className="flex justify-between">
        <button
          className="flex justify-center rounded-full aspect-square "
          onClick={props.close}
          style={{"background" : "#84587C"}}
        >
          <AiOutlineArrowLeft />
        </button>
        <button
          className="flex justify-center rounded-full aspect-square "
          style={{"background" : "#16c09861", color: "#008767"}}
        onClick={()=>{
          navigate({
            pathname: `/session/warehousemanagement/modifywarehouse/id=${props.detail[0]}`
          })
        }}
        >
          <AiOutlineEdit />
        </button>
      </div>
      <div className="rounded-full justify-center flex"  >
        <div style={{ display: "flex", alignItems: "center", "justifyContent": "center", height: "15vh", aspectRatio: "1", backgroundColor: "#FDE1D9", borderRadius: "50%" }}>
          {props.detail &&
            (props.detail[2] === 'P' ? <PermanentWarehouses /> : <TemporaryWarehouses />)
          }
        </div>
      </div>
      {props.detail && (
        <div className="w-full px-2 py-8">
          <div style={{ width: "100%", display: 'grid', "gridTemplateColumns": "repeat(2, 1fr)", gridGap: "20px 0" }}>
            <div className=" m-1 text-center flex items-center justify-start p-2 rounded-md text-black w-full">
              <p className="font-bold">Warehouse ID : </p>
              <p className="px-2 text-md">
                {props.detail[0]}
              </p>
            </div>
            <div className=" m-1 text-center flex items-center justify-start p-2 rounded-md text-black w-full">
              <p className="font-bold">Room Type : </p>
              <p className="px-2 text-md">
                {props.detail[1]}
              </p>
            </div>
            <div className="m-1 text-center flex items-center justify-start p-2 rounded-md text-black w-full">
              <p className="font-bold">Building Type : </p>
              <p className="px-2 text-md">
                {props.detail[2] === 'P' ? "Permanent" : "Temporary"}
              </p>
            </div>
            <div className=" m-1 text-center flex items-center justify-start p-2 rounded-md text-black w-full">
              <p className="font-bold">Status : </p>
              <p className="px-2 text-md">
                {props.detail[13] === "A" ? "Active" : "Inactive"}
              </p>
            </div>
            <div className=" m-1 text-center flex items-center justify-start p-2 rounded-md text-black w-full">
              <p className="font-bold">State : </p>
              <p className="px-2 text-md">
                {props.detail[3]}
              </p>
            </div>
            <div className=" m-1 text-center flex items-center justify-start p-2 rounded-md text-black w-full">
              <p className="font-bold">Address : </p>
              <p className="px-2 text-md">
                {props.detail[6]}
              </p>
            </div>
            <div className=" m-1 text-center flex items-center justify-start p-2 rounded-md text-black w-full">
              <p className="font-bold">Lat Long :</p>
              <p className="px-2 text-md">
                {props.detail[5]}
              </p>
            </div>
            <div className=" m-1 text-center flex items-center justify-start p-2 rounded-md text-black w-full">
              <p className="font-bold">Created By : </p>
              <p className="px-2 text-md">
                {props.detail[12]}
              </p>
            </div>
            <div className=" m-1 text-center flex items-center justify-start p-2 rounded-md text-black w-full" style={{ gridArea: "5 / 1 / 6 / 3" }}>
              <p className="font-bold">Double Locked : </p>
              <p className="px-2 text-md">
                {props.detail[7] ? "Yes" : "No"}
              </p>
            </div>
            <div className=" m-1 text-center flex items-center justify-start p-2 rounded-md text-black w-full">
              <p className="font-bold">First Key Holder : </p>
              <p className="px-2 text-md">
                {props.detail[8]}
              </p>
            </div>
            <div className=" m-1 text-center flex items-center justify-start p-2 rounded-md text-black w-full">
              <p className="font-bold">Second Key Holder : </p>
              <p className="px-2 text-md">
                {props.detail[9] !== "" ? props.detail[9] : "N/A"}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default WarehouseDetail;

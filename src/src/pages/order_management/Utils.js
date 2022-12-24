import { Navigate } from "react-router-dom";

const someCommonValues = ['common', 'values'];

export const  setVehicleDetails = async (body) => {
   try{
        const response = await fetch(
        `${process.env.REACT_APP_API_SERVER}/order/vehicleRegister/`,
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
        console.log(data2)
        if(response.status==200){
            alert("Vehicle details Submitted")
            window.location.reload();

        }

   }catch(err){
    console.log(err)
   }
};
export const  getVehicleDetails = async (body) => {
    console.log(body,"gettttttttttttttttttttttttfffffffffffffffffffff")
   try{
        const response = await fetch(
        `${process.env.REACT_APP_API_SERVER}/order/getVehicleDetails/`,
        {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials:'include',
        body: JSON.stringify(body)
        }
        );
        const data2 = await response.json();
        console.log(data2)
        if(response.status==200){
            return data2["data"];
        }
        else{
            return 0;
        }

   }catch(err){
    console.log(err)
   }
};
export const  fillAllocateUsers = async (body) => {
    console.log(body)
   try{
        const response = await fetch(
        `${process.env.REACT_APP_API_SERVER}/order/allocateUsers/`,
        {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: 'include',
        body: JSON.stringify(
            body
        )
        }
        );
        const data2 = await response.json();
        console.log(data2)
        if(response.status==200){
            alert("User allocated")
            window.location.reload();

        }

   }catch(err){
    console.log(err)
   }
};
export const  getAllocateUsers = async (body) => {
    console.log(body,"gettttttttttttttttttttttttuuuuuuuuuuuuuuuuuuuuuuuu")
    
   try{
        const response = await fetch(
        `${process.env.REACT_APP_API_SERVER}/order/viewAllocatedUsers/`,
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
        console.log(response,data2)
        if(response.status==200){
            return data2["data"];
        }
        else{
            return 0;
        }

   }catch(err){
    console.log(err)
   }
};


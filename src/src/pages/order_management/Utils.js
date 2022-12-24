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

   }catch(err){
    console.log(err)
   }
};
export const  getVehicleDetails = async (orderid) => {
   try{
        const response = await fetch(
        `${process.env.REACT_APP_API_SERVER}/order/vehicleDetails/`,
        {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: 'include',
        body: JSON.stringify({
            "orderid":orderid
        })
        }
        );
        const data2 = await response.json();
        console.log(data2)

   }catch(err){
    console.log(err)
   }
};
export const  fillAllocateUsers = async (body) => {
   try{
        const response = await fetch(
        `${process.env.REACT_APP_API_SERVER}/order/allocateUsers/`,
        {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: 'include',
        body: JSON.stringify({
            body
        })
        }
        );
        const data2 = await response.json();
        console.log(data2)

   }catch(err){
    console.log(err)
   }
};


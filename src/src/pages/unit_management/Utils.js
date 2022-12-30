export const DispatchUnits = async (body) => {
    console.log(body)
    try{
         const response = await fetch(
         `${process.env.REACT_APP_API_SERVER}/unit/dispatchUnits/`,
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
         if(response.status===200){
             alert("Units Dispatched Successfully")
             window.location.reload();
         }

    }catch(err){
     console.log(err)
    }
 };


export const RecieveUnits = async (body) => {
    console.log(body)
    try{
         const response = await fetch(
         `${process.env.REACT_APP_API_SERVER}/unit/recieveUnits/`,
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
         if(response.status===200){
             alert("Units Recieved Successfully")
             window.location.reload();
 
         }
 
    }catch(err){
     console.log(err)
    }
 };

 export const ViewOrder = async (body) => {
    try {
        
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
        return data2["data"]
               
      } catch (err) {
        console.log(err);
      }
 }


 
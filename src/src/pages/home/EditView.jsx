import React from "react";
import './styles/Home1.css'
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

export default function EditView(){
    const navigate = useNavigate();
    const [states,setStates] = useState([]);
    const [others,setOthers] = useState([]);

    const UnitStates = ['Counting','In Poll','In Reserve', 'In EP Period', 'EP Marked', 'Counting Defective', 'Dispersal Defective', 'Commissioning Defective', 'Polled Defective','Unpolled Defective', 'In Election', 'FLC OK', 'Under T&aA', 'FLC Assembly', 'Available for Use', 'In Transit', 'Manufacturer New Stock', 'Manufacturer Repaired Stock', 'Manufacturer Under Repair','Under FIR','Block' ,'FLC Not OK','Under Loan', 'Write-off & Destroyed'];

    const otherComponents = ['District','Warehouse','Notifications','Order Status','Recent Issues'];

    let c = 1,d = 1;

   const getUnitStates = () => {
    var obj = window.localStorage.getItem(window.sessionStorage.getItem('sessionToken'));
    obj = JSON.parse(obj);

    if(obj == null){
        setStates(['Counting','In Poll','In Reserve','Block']);
        setOthers(['District','Warehouse','Notifications','Order Status','Recent Issues']);
    }
    else{
        setStates(obj.states);
        setOthers(obj.others);
    }
    
   }
    const funcBox = (e,flag) => {
       if(flag == 1){
            if(e.checked) setStates(current => [...current,e.value]);
            else {
                let arr = states;
                let data = arr.filter((ele)=> {
                    return ele != e.value
                })
                setStates(data);
            }
       }
       else{
        if(e.checked) setOthers(current => [...current,e.value]);
        else {
            let arr = others;
            let data = arr.filter((ele)=> {
                return ele != e.value
            })
            setOthers(data);
        }
       }
    }
    
    const funcSubmit = () => {
        let obj = {
            userID : window.sessionStorage.getItem('sessionToken'),
            states : states,
            others : others
        }
        window.localStorage.setItem(window.sessionStorage.getItem('sessionToken'),JSON.stringify(obj)); 
        navigate(-1);     
    }    

    useEffect(()=>{
        getUnitStates();
    },[])
    return (
        <div className="WrapperSample">
            <div className="d-flex justify-content-between ">
                <button className="BackButton" onClick={() => navigate(-1)}>Go Back</button>
                <p>Please Check the Components you wish to see on Dashboard</p>
                <button className="BackButton" onClick={() => funcSubmit()}>Submit</button>
            </div>


           <div className="edit-items-list-container d-flex align-items-top">
                <div style={{margin : '10px 100px'}}>
                    <p className="tableCaption mt-2">Unit Status Cards</p>
                    <table className="UnitStateTable mt-2" style={{marginLeft : 'auto',marginRight : 'auto',width : '500px'}}>
                        <thead>
                            <tr>
                                <th>Sr.No</th>
                                <th>Unit State</th>
                                <th>Show/Hide</th>
                            </tr>
                        </thead>
                        <tbody>
                        {UnitStates.map(val=> (
                                <tr>
                                    <td>{c++}</td>
                                    <td>{val}</td>
                                    <td><input type="checkbox"  onChange={(e) => funcBox(e.target,1)}  name={val} id={c-1} value={val}  checked = {states.includes(val)}/></td>
                                </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
                
                <div style={{margin : '10px 100px'}}>
                    <p className="tableCaption mt-2">Other Cards</p>
                    <table className="UnitStateTable mt-2" style={{marginLeft : 'auto',marginRight : 'auto',width : '500px'}}>
                        <thead>
                            <tr>
                                <th>Sr.No</th>
                                <th>Component</th>
                                <th>Show/Hide</th>
                            </tr>
                        </thead>
                        <tbody>
                        {otherComponents.map(val=> (
                                <tr>
                                    <td>{d++}</td>
                                    <td>{val}</td>
                                    <td><input type="checkbox"  onChange={(e) => funcBox(e.target,2)}  name={val} id={c-1} value={val}  checked = {others.includes(val)}/></td>
                                </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
           </div>
        </div>
    )
}
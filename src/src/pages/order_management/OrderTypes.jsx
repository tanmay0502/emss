import React, { useEffect, useState } from "react";
import './styles/order.css';
import TypeComponent from "./TypeComponent";
import Navigator from './Navigator';
import { ReactComponent as GenOrderIcon } from '../../assets/GenOrder.svg';
import { useNavigate } from "react-router-dom";
 
export default function OrderTypes(){

    const navigate = useNavigate()

    const [selected,setSelected] = useState(null);
    const orderTypeMapping = {
        "order-type-1" : 'New',
        "order-type-2" : 'REP',
        "order-type-3" : 'ITRS',
        "order-type-4" : 'ITAS',
        "order-type-5" : 'SEC',
        "order-type-6" : 'DEF',
        "order-type-7" : 'INTF',
    }

    const arr = [{text: 'Generate Order', href: "/session/ordermanagement/createorder/"},{text: 'Order Type', href: "/session/ordermanagement/createorder/"}];

    useEffect(() => {
      let elem = document.getElementsByClassName('orderSelected')[0]

      if(elem){
          elem.classList.remove('orderSelected')
      }

      elem = document.getElementById(selected)
      if(elem){
        elem.classList.toggle('orderSelected')
    }
    
      return () => {
        
      }
    }, [selected])
    

    const toggle = (id) => {
        alert(id);
    }
    return (
       <>
        <Navigator navicon={<GenOrderIcon />}  navtext = {arr}/>
        <div className="d-flex d-flex-center mt-5">
            <div className="wrapper d-flex d-flex-center d-flex-column">
                <div className="d-flex d-flex-center d-flex-wrap">
                    <TypeComponent id='1' code='New' text='New Units Order from the Manufacturer' setSelected = {setSelected}  toggle={() => toggle('1')}/>
                    <TypeComponent id='2' code='REP' text='Repaired from the Manufacturer'  setSelected = {setSelected}  toggle={() => toggle('2')}/>
                    <TypeComponent id='3' code='ITRS' text='Inter State Movement of the Units'  setSelected = {setSelected}  toggle={() => toggle('3')}/>
                    <TypeComponent id='4' code='ITAS' text='Intra State Movement of the Units' setSelected = {setSelected}  toggle={() => toggle('4')}/>
                    <TypeComponent id='5' code='SEC' text=' Loan to State Election commission'  setSelected = {setSelected}  toggle={() => toggle('5')}/>
                    <TypeComponent id='6' code='DEF' text='Defective Unit Movement from Warehouse to Factory'  setSelected = {setSelected}  toggle={() => toggle('6')}/>
                    <TypeComponent id='7' code='INTF' text=' Inter Factory movement of Units'   setSelected = {setSelected}  toggle={() => toggle('7')}/>
                </div>
                <button className="btn" onClick={()=>{
                    if(selected){
                        navigate('/session/ordermanagement/createorder/generateorder/'+ orderTypeMapping[selected])
                    }
                    else{
                        alert('Order Type not Selected!')
                    }
                }} >Proceed</button>
            </div>
        </div>
       </>
    )
}
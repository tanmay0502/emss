import React, { useEffect, useState } from "react";
import styles from './styles/order1.module.css';
import TypeComponent from "./TypeComponent";
import Navigator from './Navigator';
import { ReactComponent as GenOrderIcon } from '../../assets/GenOrder.svg';
import { useNavigate } from "react-router-dom";
 
export default function OrderTypes(){

    const navigate = useNavigate()

    const [selected,setSelected] = useState(null);
    const orderTypeMapping = {
        "order-type-1" : 'NEW',
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

    if(selected){
        navigate('/session/ordermanagement/createorder/generateorder/'+ orderTypeMapping[selected])

    }
    
      return () => {
        
      }
    }, [selected])
    

    const toggle = (id) => {
        console.log(id);
    }
    return (
       <>
        <Navigator navicon={<GenOrderIcon />}  navtext = {arr}/>
        <div className="d-flex d-flex-center mt-5">
            <div className={`${styles.wrapper} d-flex d-flex-center d-flex-column`}>
                <div className="d-flex d-flex-center d-flex-wrap">
                    <TypeComponent id='1' text={(<span className="text-lg  ">New Units Order from the Manufacturer</span>)} setSelected = {setSelected}  toggle={() => toggle('1')}/>
                    <TypeComponent id='2' text={(<span className="text-lg ">Repaired from the Manufacturer</span>)}  setSelected = {setSelected}  toggle={() => toggle('2')}/>
                    <TypeComponent id='3'  text={(<span className="text-lg ">Inter State Movement of the Units</span>)}  setSelected = {setSelected}  toggle={() => toggle('3')}/>
                    <TypeComponent id='4'  text={(<span className="text-lg ">Intra State Movement of the Units</span>)} setSelected = {setSelected}  toggle={() => toggle('4')}/>
                    <TypeComponent id='5' text={(<span className="text-lg ">Loan to State Election commission</span>)}  setSelected = {setSelected}  toggle={() => toggle('5')}/>
                    <TypeComponent id='6' text={(<span className="text-lg ">Defective Unit Movement from Warehouse to Factory</span>)}  setSelected = {setSelected}  toggle={() => toggle('6')}/>
                    <TypeComponent id='7'  text={(<span className="text-lg ">Inter Factory movement of Units</span>)}   setSelected = {setSelected}  toggle={() => toggle('7')}/>
                </div>
               
            </div>
        </div>
       </>
    )
}
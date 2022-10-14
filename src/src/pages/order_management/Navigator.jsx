import React from "react";
import { ReactComponent as ChevronRight } from '../../assets/chevron-right.svg';
import {useNavigate} from "react-router-dom";
import './styles/order.css'

export default function Navigator(props){
    const navigate = useNavigate();
    const myArr = props.navtext;
    
    return (
        <div className="Navigator d-flex d-flex-vertical" style={{gap : '12px'}}>
            <div className="NavIcon" >{props.navicon}</div>
                {
                    myArr.map((element,index) => <><span className="d-flex-" style={{cursor : 'pointer',fontSize : '18px',fontWeight : '500',lineHeight : '100%'}} onClick={()=> {navigate(element.href)}}>{element.text}</span>{index != myArr.length - 1 ? <ChevronRight style={{height : '100%',width : '20.44px'}}/> : ''}</>)
                }
        </div>
    )
}
import React, { useEffect, useState } from "react";
import styles from './styles/Homepage.module.css';
import ListCard from './ListCard';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

function Card(props) {

    const rightArrow = ">";

    function DisplayMachineCountByModel({val}) {
        // console.log(val)
        return <div>{val.count!="0"?val.count+" "+val.model:"0"}</div>
    }

    function creatListCard(val) {
        return <ListCard type={val.props.value.status} value={val.props.value.unitList}/>
    }

    return (
        <div className={styles.myCardSample}>
                    <div className={styles.card_title}>
                    
                        <Popup trigger={<span>Units {rightArrow} {props.value.status}</span>} position="left top"> 
                             <div>{creatListCard({props})}</div>
                        </Popup>

                    </div>

                    <div className="cardSampleBody">
                        <table >
                            <thead >
                                <tr>
                                    <th style={{ color: "#f56a3f", paddingLeft: "33px", textAlign: "left" }}>Units</th>
                                    <th style={{ color: "#f56a3f", paddingLeft: "33px" }}>ECIL</th>
                                    <th style={{ color: "#f56a3f", paddingLeft: "33px" }}>BEL</th>
                                </tr>
                            </thead>
                            {props.value.type != [] && props.value.type.length > 0 &&
                                props.value.type.map((val) => {
                                    return (
                                        <tbody >
                                            <tr>
                                                <td className="text-black text-sm" style={{ textAlign: "left" }}>
                                                    <div>{val.unit_type}</div>
                                                </td>
                                                <td className="text-black text-sm mr-2 pl-5">
                                                    {val.ECIL.map((val,ind)=>{
                                                        return(
                                                            <DisplayMachineCountByModel val={val}/>
                                                        )})}

                                                </td>
                                                <td className="text-black text-sm pl-7">
                                                    {val.BEL.map((val,ind)=>{
                                                        return(
                                                            <DisplayMachineCountByModel val={val}/>
                                                        )})}
                                                </td>
                                            </tr>
                                        </tbody>
                                    )
                                })}
                        </table>
                    </div>
                </div>
    );
}

export default Card;

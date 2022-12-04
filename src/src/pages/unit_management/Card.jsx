import React, { useEffect, useState } from "react";
import styles from './styles/Homepage.module.css';

function Card(props) {

    const rightArrow = ">";

    function displayMachineCountByModel(val) {
        return <div>{val.model} {val.count}</div>
    }

    return (
        <div className={styles.myCardSample}>
                    <div className={styles.card_title}>
                        <span>Units {rightArrow} {props.value.status}</span>
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
                                                    {val.ECIL.map(displayMachineCountByModel)}

                                                </td>
                                                <td className="text-black text-sm pl-7">
                                                    {val.BEL.map(displayMachineCountByModel)}
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
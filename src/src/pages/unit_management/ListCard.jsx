
import React, { useEffect, useState } from "react";
import styles from './styles/Homepage.module.css';

function Card(props) {

    const rightArrow = ">";

    return (
        <div className={styles.myCardSampl}>
                    <div className={styles.card_title}>
                        <span>Units {rightArrow} {props.type}</span>
                    </div>

                    <div className="">
                        <table >
                            <thead >
                                <tr>
                                    <th style={{ color: "#f56a3f", paddingLeft: "33px", textAlign: "left" }}>Unit Id</th>
                                    <th style={{ color: "#f56a3f", paddingLeft: "33px" }}>Status</th>
                                    <th style={{ color: "#f56a3f", paddingLeft: "33px" }}>Model</th>
                                    <th style={{ color: "#f56a3f", paddingLeft: "33px" }}>Model Id</th>
                                </tr>
                            </thead>
                            {props.value != [] && props.value.length > 0 &&
                                props.value.map((val) => {
                                    return (
                                        <tbody >
                                            <tr>
                                                <td className="text-black text-sm" style={{ textAlign: "left" }}>
                                                    <div>{val.modelId}</div>
                                                </td>
                                                <td className="text-black text-sm mr-2 pl-5">
                                                    {val.modelStatus}

                                                </td>
                                                <td className="text-black text-sm pl-7">
                                                    {val.modelType}
                                                </td>

                                                <td className="text-black text-sm pl-7">
                                                    {val.model_Id}
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
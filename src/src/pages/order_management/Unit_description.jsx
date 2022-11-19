import React from "react";
import styles from './styles/orderdetails.module.css'
import { useState, useEffect } from "react";

import {ReactComponent as SearchInputIcon} from '../../assets/searchInputIcon.svg'
import { ReactComponent as ArrowLeft } from "../../assets/ArrowLeft.svg";
import { ReactComponent as ArrowRight } from "../../assets/ArrowRight.svg";
import SubOrder from "./SubOrder";

export default function UnitDescription(props) {

    const orderID = "OM12993455"

    return (
        <div className={styles.orderDetailsHolder}>
            <div className={styles.orderDetailsTitle}>
                Order details
            </div>
            <div className={styles.orderDetailsIDandSearch}>
                <span><span className={styles.orderDetailsID}>Order ID: </span>{orderID}</span>
                <div className={styles.orderDetailsSearch}>
                    <SearchInputIcon />
                    <input type="search" name="searchRefID" placeholder="Search By Reference ID" />
                </div>
            </div>
            <div className={styles.detailsContainer}>
                <SubOrder Source={"Delhi"} Destination={"Haryana"} />
                <SubOrder Source={"Delhi"} Destination={"Telangana"} />
            </div>
            <div className={styles.detailsNavigator} >
                <button><ArrowLeft /></button>
                <button><ArrowRight /></button>
            </div>
        </div>    
    );
}
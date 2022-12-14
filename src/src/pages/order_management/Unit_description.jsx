import React from "react";
import styles from './styles/orderdetails.module.css'
import { useState, useEffect } from "react";

import { ReactComponent as SearchInputIcon } from '../../assets/searchInputIcon.svg'
import { ReactComponent as ArrowLeft } from "../../assets/ArrowLeft.svg";
import { ReactComponent as ArrowRight } from "../../assets/ArrowRight.svg";
import SubOrder from "./SubOrder";

export default function UnitDescription(props) {


    const [Length, setLength] = useState(0);
    const units = [props.Order]
    const OrderID = props.OrderID

    function LEFT() {
        if (Length - 1 < 0) {
            if (units.length > 1)
                setLength(units.length - 2);
        }
        else {
            setLength(Length - 1);
        }
    }

    function RIGHT() {
        if (Length + 2 < units.length) {
            setLength(Length + 1)
        }
        else {
            setLength(0)
        }
    }


    return (
        <div className={styles.orderDetailsHolder}>
            <div className={styles.orderDetailsTitle}>
                Order details
            </div>

            <div className={styles.orderDetailsIDandSearch}>
                <span><span className={styles.orderDetailsID}>Order ID: </span>{OrderID}</span>
                <div className={styles.orderDetailsSearch}>
                    <SearchInputIcon />
                    <input type="search" name="searchRefID" placeholder="Search By Reference ID" />
                </div>
            </div>
            {
                units.length > 1 &&
                <div className={styles.detailsContainer}>
                    <SubOrder Order={units[Length]} />
                    <SubOrder Order={units[Length + 1]} />
                </div>

            }
            {
                units.length == 1 &&
                <div className={styles.detailsContainer}>
                    <SubOrder Order={units[0]} />
                </div>
            }
            {units.length == 0 &&
                <div>Order is empty</div>
            }

            {/* <div className={styles.detailsNavigator} >
                <button onClick={LEFT}> <ArrowLeft /></button>
                <button onClick={RIGHT}><ArrowRight /></button>
            </div> */}
        </div>
    );
}
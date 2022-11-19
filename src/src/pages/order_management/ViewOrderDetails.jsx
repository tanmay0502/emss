import React from "react";
import UnitDescription from "./Unit_description"

import styles from './styles/order.module.css'
import OrderActions from "./OrderActions";

export default function ViewOrderDetails() {  
  return (
    <div className={styles.viewDetailsContainer}>
      <UnitDescription />
      <OrderActions />
    </div >
  );
}
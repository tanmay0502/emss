import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import OrderItem from './OrderItem'
import { ReactComponent as GenOrderIcon } from '../../assets/GenOrder.svg';
import styles from './styles/createorder.module.css'
import Navigator from './Navigator';

function GenerateOrder() {
  const [oType, setOType] = useState(null)
  useEffect(() => {
    setOrderType()

    return () => {

    }
  }, [])

  const setOrderType = () => {
    const URL = window.location.href;
    const arr = URL.split("/");
    const param = arr[arr.length - 1];
    const arr1 = param.split("=");
    const myId = arr1[1];
    setOType(myId)
  }

  return (
    <div className='create-order-page'>
      <Navigator navicon={<GenOrderIcon />} navtext={[{ text: 'Generate Order', href: "/session/ordermanagement/createorder/" }, { text: oType, href: "" }]} />
      {/* Generate Order Type: {oType}  */}
      <div className={styles.generateOrderGrid}>
        <form className={styles.gridLeft}>
          <div className={styles.inputContainer}>
            <label className={styles.orderIDLabel}>Order ID</label>
            <div className={styles.inputGroupHorizontal}>
              <input type="text" placeholder='Order ID' /> <button onClick={(e) => {
                e.preventDefault()
              }}>Submit</button>
            </div>
          </div>
          <OrderItem styles={styles} />
        </form>
        <div className={styles.gridRight}>
          Right
        </div>
      </div>
    </div>
  )
}

export default GenerateOrder
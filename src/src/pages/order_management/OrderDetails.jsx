import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import styles from './styles/createorder.module.css'

function GenerateOrder() {
    const [oType, setOType] = useState(null)
    useEffect(() => {
      setOrderType()
    
      return () => {
        
      }
    }, [])

    const setOrderType = ()=>{
        const URL = window.location.href;
        const arr = URL.split("/");
        const param = arr[arr.length - 1];
        const arr1 = param.split("=");
        const myId = arr1[1];
        setOType(myId)
    }
    
  return (
    <div className='create-order-page'>
        Generate Order Type: {oType} 
        <div className={styles.generateOrderGrid}>
            <div className={styles.gridLeft}>
                Hi
            </div>
            <div className={styles.gridRight}>
                Right
            </div>
        </div>
    </div>
  )
}

export default GenerateOrder
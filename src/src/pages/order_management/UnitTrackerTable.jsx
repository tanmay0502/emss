import { DynamicDataTable } from '@langleyfoxall/react-dynamic-data-table'
import React from 'react'

import styles from './styles/UnitTrackerTable.module.css'

function UnitTrackerTable(props) {
    const data = [
        {
            Model: 'M2',
            Total: 100,
            Filled: 31,
            'Left Out': 69
        },
        {
            Model: 'M3',
            Total: 100,
            Filled: 31,
            'Left Out': 69
        }
    ]
  return (
    <div className={styles.unitTrackerTable}>
        <div className={styles.unitTrackerTableHeader}>
            <h4>{props.title}</h4>
        </div>
        <DynamicDataTable className={styles.unitTrackerTableContainer} rows={data} buttons={[]} />
    </div>
  )
}

export default UnitTrackerTable
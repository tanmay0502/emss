import React from 'react'
import OrderAllocationTable from './OrderAllocationTable'

import styles from './styles/allocateorder.module.css'
import UnitTrackerTable from './UnitTrackerTable'

function AllocateOrder() {
	return (
		<div className={styles.orderAllocationContainer}>
			<div className={styles.optimisedAllocationContainer}>
				<div className={styles.optimisedAllocationHeader}>
					<h4>Optimised Allocation</h4>
				</div>
				<div className={styles.optimisedAllocationTablesContainer}>
					<div className={styles.optimisedAllocationTablesScrollContainer}>
						<div className={styles.optimisedAllocationTables}>
							<OrderAllocationTable />
							<OrderAllocationTable />
							<OrderAllocationTable />
							<OrderAllocationTable />
							<OrderAllocationTable />
							<OrderAllocationTable />
						</div>
					</div>

					<button>
						Submit
					</button>
				</div>
			</div>
			<div className={styles.unitTracker}>
				<h5>Unit Tracker</h5>
				<div className={styles.unitTrackerTables}>
					<UnitTrackerTable title="Ballot Units" />
					<UnitTrackerTable title="Control Units" />
					<UnitTrackerTable title="VVPAT" />
				</div>
			</div>
		</div>
	)
}

export default AllocateOrder
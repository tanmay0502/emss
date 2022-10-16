import React from 'react'
import useCollapse from 'react-collapsed'
import DynamicDataTable from "@langleyfoxall/react-dynamic-data-table";

export default function Collapse(props) {
  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse()

  return (
    <div>
      <div {...getToggleProps()} className={isExpanded ? 'CollapseRowColor CollapseRow' : 'CollapseRow' }>
          <span>Order Id : {props.orderId}</span>
          <span>Timestamp : {props.time}</span>
      </div>
      <section {...getCollapseProps()}>
         <DynamicDataTable className="request-table"
                rows={props.data}
                fieldsToExclude={["Details", "Edit"]}
                // orderByDirection={sortOrder}
                onClick={(event, row) => {
                    window.location.pathname = `/session/issuemanagement/viewRequest/id=${row.Details.issueid}`;
                }}
                buttons={[]}
                allowOrderingBy={[
                    'Request ID', 'Registration Date'
                ]} />
      </section>
    </div>
  )
}
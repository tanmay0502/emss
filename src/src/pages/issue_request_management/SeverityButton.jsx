import React from 'react'
import './styles/SeverityButton.css'

function SeverityButton(props) {
  return (
	<div className='toggle-button-container'>
		<button className={props.severity == "L" ? 'low' : props.severity == "M" ? 'medium' : 'high'} onClick={(e)=> { 
			e.preventDefault();
			e.stopPropagation();
			props.onToggle(props.userID); 
		}}>
			{props.severity == "L" ? 'Low' : props.severity == "M" ? 'Medium' : 'High'}
		</button>
	</div>
  )
}

export default SeverityButton
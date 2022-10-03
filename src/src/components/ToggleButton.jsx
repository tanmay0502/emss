import React from 'react'
import './styles/ToggleButton.css'

function ToggleButton(props) {
  return (
	<div className='toggle-button-container'>
		<button className={props.checked ? "checked" : "unchecked"} onClick={(e)=> { 
			e.preventDefault();
			e.stopPropagation();
			props.onToggle(props.userID); 
		}}>
			{props.checked ? "Active" : "Inactive"}
		</button>
	</div>
  )
}

export default ToggleButton
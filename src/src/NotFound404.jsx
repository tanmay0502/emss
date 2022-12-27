import React from 'react'

import styles from './404.module.css'

function NotFound404(props) {

    console.log(404)

    return (
        <div className={styles.Issue_Resource_Not_Found}>
            <b>
                4<span style={{ color: 'var(--purple)' }}>0</span>4
            </b>
            <h1>
                {props.resource ? <>Oops,<br />Request Resource Not Found!</> : <>Oops,<br />Page Not Found!</>}
                <div className={styles.GoBackButtonContainer} >
                    {
                        props.goBack && window.history.length !== 1 ?
                            <>
                                <button className={styles.GoBackButton1} onClick={()=>{
                                    window.history.back();
                                }} >Go Back</button>
                                <button className={styles.GoBackButton2} onClick={()=>{
                                    window.location.href = '/session/home'
                                }} >Go To Home Page</button>
                            </>
                            :
                            <button className={styles.GoBackButton1} onClick={()=>{
                                window.location.href = '/session/home'
                            }} >Go To Home Page</button>
                    }
                </div>
            </h1>

        </div>
    )
}

NotFound404.defaultProps = {
    resource: false,
    goBack: true
}

export default NotFound404
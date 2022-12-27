import React, { useEffect, useState, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import NotFound404 from '../../NotFound404';

function FetchFile() {
    const [searchParams, setSearchParams] = useSearchParams();

    const [fileNotFound, setFileNotFound] = useState(false);

    const embedRef = useRef();

    const filename = window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1)
    const file_header = ';headers=filename%3D';

    const fetchDocument = async () => {
        const response = await fetch(`${process.env.REACT_APP_API_SERVER}/issue_requests/getDocument`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: 'include',
            body: JSON.stringify({
                "remarkid": searchParams.get('remarkID'),
                "documentName": filename
            })
        })

        const data = await response.json()

        if(response.status === 200){
            const tmp = data['data'].split('\',)')
            setBase64(tmp[0].replace('(\'', "") + tmp[1].slice(0, -1))
        }
        else if(response.status === 404){
            setFileNotFound(true);
        }
        else if(response.status === 403){
            // Session Expired
        }
    }

    useEffect(() => {
        fetchDocument();

        return () => {

        }
    }, [])
    
    const [base64, setBase64] = useState("");
    const configuredBase64 = base64.replace(';', file_header + encodeURIComponent(filename) + ';')

    useEffect(() => {
        if(base64){
            embedRef.current.src = configuredBase64
        }
      
    
      return () => {
        
      }
    }, [base64])
   

    return (
        <>
            {
                fileNotFound ? <NotFound404 resource={true} /> : <embed ref={embedRef} style={{ width: '100vw', height: '100vh' }} title={filename} >
                </embed>
            }
        </>
    )
}

export default FetchFile
import ReactDOM from 'react-dom'
import React, { useState, useEffect } from 'react'
import "./soldWindow.css"
import {AiOutlineClose} from 'react-icons/ai'

function Modal({loan, token, setRefresh, refresh}){
    const [show, setShow] = useState(false)
    const [txHash, setTxHash] = useState(false)    
    const baseurl="http://35.89.86.149:8081"

    async function soldTransaction(loan){
        let data={
            loan_id:loan.id,
            status: 'sold',
            tx_hash:txHash
        }
        fetch(baseurl+'/sold',{
            method:"POST",
            mode:"cors",
            headers:{
                "Content-Type": "application/json",
                "Authorization": "bearer "+ token,
            },
            body:JSON.stringify(data)
        }).then((response)=>response.json())
        .then((data)=>{
            console.log(data)
            if(data.status==200){
                setRefresh(!refresh)             
                ////alert("update success")
            }else{
                console.log(data?.msg)
                //alert(data?.msg)
                //alert('update failed')
            }
        }).catch((e)=>{
            //alert(e)
            console.log(e)
          })
    }
    return (
        <>
            {show ? (
                ReactDOM.createPortal(
                <div className="modalContainer" >
                    <div className="modal">
                        <AiOutlineClose className='close' size={20} onClick={()=>setShow(false)}/>
                        <span className="modal_title">
                                Transaction Hash    
                        </span>
                        <input
                        className="input"
                        type="text"
                        onChange={(e) => {
                            setTxHash(e.target.value)
                        }}/>
                        <button
                            className="button"
                            onClick={() =>{soldTransaction(loan)}}
                        >
                                            Confirm
                            </button>

                    </div>
                </div>,
                document.getElementById('root')
                )
            ) : (<>
                <button className="button" onClick={() =>{setShow(true)}}>Sold</button>
            </>)}
        </>)

}

export default Modal
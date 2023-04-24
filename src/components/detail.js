import ReactDOM from 'react-dom'
import React, { useState, useEffect } from 'react'
import "./detail.css"
import {AiOutlineClose} from 'react-icons/ai'

function Detail({loan, token, setRefresh, refresh}){
    const [show, setShow] = useState(false)
    const [txHash, setTxHash] = useState(false)    
    const baseurl="http://35.89.86.149:8081"


    return (
        <>
            {show ? (
                ReactDOM.createPortal(
                <div className="modalContainer" >
                    <div className="modal">
                        <AiOutlineClose className='close' size={20} onClick={()=>setShow(false)}/>
                        <span className="modal_title">
                        Transaction information can be checked as below   
                        </span>

                        <a className='link' href={"https://goerli.etherscan.io/tx/"+loan.sold_tx_hash}>{loan.sold_tx_hash?.slice(0,7)}</a>

                    </div>
                </div>,
                document.getElementById('root')
                )
            ) : (<>
            </>)}
            <button className="button" onClick={() =>{setShow(true)}}>Detail</button>
        </>)

}

export default Detail
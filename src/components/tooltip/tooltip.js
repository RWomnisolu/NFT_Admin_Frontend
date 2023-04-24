import React, { useState } from 'react'
import './tooltip.scss'
import eth from '../../img/eth-icon.png'
import {IoIosArrowDown} from"react-icons/io"

const Tooltip = ({ address = '0', network = '0', disconnect, connect }) => {

    return (
                <div className="Tooltip">
                    <div className="subtitle">
                        <img  className='image' src={eth}/>
                        <span className="info">
                            {network && network.length > 2 ? network : 'No network detected'}
                        </span>
                        <IoIosArrowDown size={20}/>
                    </div>
                    <div className="subtitle">
                        <span className="info">
                            {address && address.length > 2 ? address.slice(0,5)+"...."+address.slice(35) : 'No wallet connected'}
                        </span>
                    </div>

                    {address && address.length > 2 ? (
                        <button className="button" onClick={() => disconnect()}>
                            Disconnect
                        </button>
                    ) : (
                        <button className="button" onClick={() => connect()}>
                            Connect
                        </button>
                    )}
                </div>

    )
}

export default Tooltip

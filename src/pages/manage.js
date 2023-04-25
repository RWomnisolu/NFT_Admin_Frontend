import React from "react";
import "./login.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Logo from '../img/Logo.png'
import Cookies from "js-cookie";
 
function ManagePage(){
    let nav=useNavigate();
    const[token,setToken]=useState('');
    const[nftAddress,setNftAddress]=useState('0x');
    const[nftName, setNftName]=useState('');
    const[interest, setInterest]=useState(0);
    const[maxNumber, setMaxNumber]=useState('');
    const[chainId, setChainId]=useState('');

    useEffect(()=>{
        let token=Cookies.get('token');
        if(!token){
            //alert('invaild token, please login again')
            nav('/login')
        }else{
            console.log(token)
            setToken(token)
        }
    })

    async function createPool(){
        let data={
            nft_address :nftAddress,
            nft_name :nftName,
            interest :interest,
            max_loan_duration : 1,
            chain_id : chainId
        }
        fetch('http://35.89.86.149:8081/pool/create',{
            method:"POST",
            mode:"cors",
            headers:{
                "Content-Type": "application/json",
                "Authorization": "bearer "+token,
            },
            body:JSON.stringify(data),
        }).then((response)=>response.json())
        .then((data)=>{
            if(data.status==200){
                 //alert('success')
                 nav('/manage')
            }else{
                console.log(data?.msg)
                //alert(data?.msg)
                //alert('creating failed')
            }
        }).catch((e)=>{
            //alert(e)
            console.log(e)
    
          })

    }

    return (
        <div className="contain" style={{width:"50%"}}>
        <h1 className="title_1">Manage</h1>
        <div  className="input_label" >Address of NFT to lend against</div>
        <input
          className="input"
          type="text"
          onChange={(e) => {
              setNftAddress(e.target.value)
          }}
          placeholder={'0x'}/>
        <div  className="input_label" >Name of the loan NFTs</div>
        <input
          className="input"
          type="text"
          onChange={(e) => {
              setNftName(e.target.value)
          }}
          placeholder={'NFT Name'}/>
                  <div  className="input_label" >Annual Interest</div>
        <input
          className="input"
          type="text"
          onChange={(e) => {
              setInterest(e.target.value)
          }}
          placeholder={'5'}/>
        <div  className="input_label" >Chain ID</div>
        <input
          className="input"
          type="text"
          onChange={(e) => {
              setChainId(e.target.value)
          }}
          placeholder={'5'}/>

          <div style={{height:'50px'}}/>
          <button className="button" style={{width:'100%'}} onClick={createPool}> create</button>
        </div>
    )

}

export default ManagePage
import React from "react";
import "./login.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Logo from '../img/Logo.png'
import Cookies from "js-cookie";
import ReactDOM from 'react-dom';

function LoginPage() {
    let nav=useNavigate();
    const [Email,setEmail]=useState('');
    const [password,setPassword]=useState('')
    const baseurl= process.env.REACT_APP_API_URL
    let body ={
      username: Email,
      password: password
    }

    async function login(){
      fetch(baseurl+'/login', {
        method: "POST", 
        mode: "cors", // no-cors, *cors, same-origin
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(body), // body data type must match "Content-Type" header
      }).then((response)=>response.json())
      .then((data)=>{
        if(data.status==200){
          console.log(data)
          Cookies.set('token', data.token)
          nav('/lend')
        }else{
          //alert("invaild password")
        }

      }).catch((e)=>{
        //alert("e")
        console.log(e)

      })


    }

    return (
      <div className="content">
        <img className="logo" src={Logo} style={{height: "78px", width:'290px'}}/>
        <h1 className="title_1">Login</h1>
        <div  className="input_label" >username</div>
        <input
          className="input"
          type="text"
          onChange={(e) => {
              setEmail(e.target.value)
          }}
          placeholder={'Email'}/>
          
          <div className="input_label">password</div>

          <input
          className="input"
          type="password"
          onChange={(e) => {
              setPassword(e.target.value)
          }}
          placeholder={'password'}/>
          
          <div className="login_row">
          <div className="checkbox_row">
            <input type="checkbox"/> 
            <div className="checkbox_label">remember me</div>
          </div>
          <button className="button" style={{width:"150px"}} onClick={login}> login </button>
          </div>
      </div>
    );
  }

  export default LoginPage;
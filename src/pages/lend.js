import React from "react";
import "./lend.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Logo from '../img/Logo.png'
import Cookies from "js-cookie";
import ReactDOM from 'react-dom';
import Modal from "../components/soldWindow";
import Detail from "../components/detail";
 
function LendPage(){
    let nav=useNavigate();
    const[token,setToken]=useState(Cookies.get('token'));
    const[refresh,setRefresh]=useState(false);
    const [loanList, setLoanList] = useState([])
    const [emptyTx, setEmptyTx] = useState(false)
    const [show, setShow]=useState(true)
    const baseurl=process.env.REACT_APP_API_URL
    console.log(process.env.REACT_APP_NFT_URL)
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

    useEffect(() => {
        //console.log("token is ", token)
        getList()
    }, [token,refresh])

    async function getList(){

        fetch(baseurl+'/lending?chain_id=5',{
            method:"GET",
            mode:"cors",
            headers:{
                "Content-Type": "application/json",
                "Authorization": "bearer "+ token,
            }
        }).then((response)=>response.json())
        .then((data)=>{
            console.log(data)
            if(data.status==200){
                console.log(data.data)
                if (data.data !== null) {
                    setLoanList(data.data)
                    setEmptyTx(true)
                }
            }else{
                console.log(data?.msg)
                //alert(data?.msg)
                //alert('getlist failed')
            }
        }).catch((e)=>{
            //alert(e)
            console.log(e)
          })

    }

    async function Buy(loan){
        let data={
            loan_id:loan.id,
            status: 'complete'
        }
        fetch(baseurl+'/repay',{
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
                window.open(process.env.REACT_APP_NFT_URL+loan.nft_address+"/"+loan.token_id)
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

    async function LiquidationSell(loan){
        let data={
            loan_id:loan.id,
            status: 'listing'
        }
        fetch(baseurl+'/repay',{
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
                //alert("update success")
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


    function buttonAction (loan) {
        switch(loan.status) {
          case 'active':
            return (
                <button className="button" onClick={() =>{Buy(loan)}}>Buy</button>
            );
          case 'pending':
                return (
                    <button disabled className="button">buy</button>
                );
          case 'complete':
            return (
                <button className="button" onClick={() =>{LiquidationSell(loan)}}>Liquidation</button>
            );
          case 'listing':
                return (
                    <Modal loan={loan} token={token} setRefresh={setRefresh} refresh={refresh}/>
                );
          case 'sold':
                return (
                    <Detail loan={loan} token={token} setRefresh={setRefresh} refresh={refresh}/>
                );
        case 'sell request':
            return (
                <button className="button" onClick={() =>{LiquidationSell(loan)}} >Sell</button>
            );
            case 'failed':
                return (
                    <button disabled className="button">buy</button>
                );
                       
                            
          default:
            return (
                <button>buy</button>
            );
        }
      }

    return (
        <div className="contain">
        <div  className="table_box" >
            <div className="table_title">
              <div className="table_title_item"> NFT Address</div>  
              <div className="table_title_item"> Price</div> 
              <div className="table_title_item"> Interest%</div> 
              <div className="table_title_item"> Leverage</div> 
              <div className="table_title_item"> Status</div> 
              <div className="table_title_item"> Actions</div> 
            </div>
        {emptyTx ? (
                    loanList.map((loan, x) =>
                    <div className="table_title_list" key={x}>
                            <div className="table_title_item">
                                {loan.nft_address}
                            </div>
                            <div className="table_title_item">
                                {loan.market_price}
                            </div>
                            <div className="table_title_item">
                                {loan.interest+"%"}
                            </div>
                            <div className="table_title_item">
                                {loan.leverage+"x"}
                            </div>
                            <div className="table_title_item">
                                {loan.status}
                            </div>
                            <div className="table_title_item">
                                {buttonAction(loan)}
                            </div>
                    </div>
                                    )
                            ) : (
                                <div className="table_title_list">The payment is empty</div>
                            )}
        
            </div>

        </div>
    )

}

export default LendPage
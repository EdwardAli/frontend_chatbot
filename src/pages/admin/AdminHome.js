import React,{useEffect,useState} from "react"
import Myshops from "./Myshops"
import { AppBar} from "@mui/material";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import './admin.css'
import {ComposedChart,Line,Area, Bar,Scatter,  PieChart, Pie, Sector, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function AdminHome(){
    
    const [data, setData] = useState([]);
    const [shops, setShops] = useState([]);

    useEffect(()=>{
        function fetchData() {
            fetch('https://windowshoppingserver.herokuapp.com/product/All')
                .then(items => items.json())
                .then(results => {
                    setData(results)
                })
                .catch(err => { })
        }
        function fetchShops() {
            axios.get("https://windowshoppingserver.herokuapp.com/shop/All").then((response) => {
                
                setShops(response.data);
                
            });
        }
        
        fetchShops();
        fetchData()
    }, [])

    let shopCount = 0;
    //counting shops
    shops.map(item=>{
        shopCount = shopCount+ 1;
    })

    let productCount = 0;
    let graphArray = [];
    let graphObject ={};

    data.map((item, key) => {
        productCount = productCount + 1
        graphObject.price = item.Price
        graphObject.name = item.Name
        graphArray.push(graphObject)
    })


    
    console.log(graphArray)

    return(
        <div>
            
            <AppBar sx={{ height:"20vh" ,padding: "5vh"}}>

                <center>
                    <h1>Window Shopping Admin</h1>
               </center>
            </AppBar>

            <br/>
            <br/>
            {/* counts figures */}
            <div className="card-group mt-4 shoppimigcony">
                <div className="card">
                    <div className="card-body">
                        <h2 className="justify text-center">Total Shops</h2>
                        <h2 className="text-center text-primary">{shopCount}</h2>
                    </div>
                </div>
                <div className="card">
                    <div className="card-body">
                        <h2 className="justify text-center">Total Products</h2>
                        <h2 className="text-center text-primary">{productCount}</h2>
                    </div>
                </div>
            </div>
            
            <div>
            <div className='card-group mt-3'>
{/* 
                <div className='card  border-radius-rounded p-2'>
                    <ResponsiveContainer width="100%" height="100%">
                        <ComposedChart width={650} height={450} data={data}>
                            <YAxis/>
                            <XAxis dataKey="Price"/>
                            <Tooltip/>
                            <Legend/>
                            <CartesianGrid stroke="#f5f5f5" />
                            <Bar dataKey="Name" barSize={20} fill="#e67e22 " />
                            <Line type="monopole" dataKey="price" barSize={20} fill="#e67e22 " />
                        </ComposedChart>
                        
                    </ResponsiveContainer>
                </div> */}
            </div>
                

            </div>
            
            <Myshops/>
          
        </div>

    )
}
export default AdminHome;
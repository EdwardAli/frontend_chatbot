
import axios from "axios";
import React, { useEffect, useState } from "react";
import "./myshop.css"

function Myshops(){

    const [allShops, setShops] = useState([]);
    const [searchTitle, setSearchTitle] = useState("");
  

    let count = 1;

    // getting list of user products based on user id /product/All
    useEffect(() => { 
    
        axios.get("https://windowshoppingserver.herokuapp.com/shop/All").then((response) => {
            console.log(response.data);
            setShops(response.data);
            
        });
    }, []);

    return(
        <div className="myshopHome">
             <hr/>
             <table>
                 <thead>
                     <th>#</th>
                     <th>ID</th>
                     <th>Name</th>
                     <th>Phone Numer</th>
                     <th>Email</th>
                     <th>Location</th>
                     <th>Action</th>
                 </thead>
                 <tbody>
                    {allShops.filter((val)=>{
                        if(searchTitle ===""){
                            return val;
                        } 
                        else if(val.shopName?.toLowerCase().includes(searchTitle.toLowerCase())
                        ) {
                          return val;
                        }
                    }).map((val,key)=>{
                        return(
                            // <h1>{val.shopName}</h1>
                            <tr>
                                <th>{key+1}</th>
                                <td>{val.id}</td>
                                <td>{val.shopName}</td>
                                <td>{val.phoneNumber}</td>
                                <td>{val.email}</td>
                                <td>{val.location}</td>
                                <td>Detete</td>
                            </tr>
                            
                        )
                    })
                    }
                 </tbody>
             </table>
        </div>
    )
}
export default Myshops

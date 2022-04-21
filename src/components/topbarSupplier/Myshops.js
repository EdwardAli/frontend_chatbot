
import axios from "axios";
import React, { useEffect, useState } from "react";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import "./myshop.css"

function Myshops(){

    const [allShops, setShops] = useState([]);
    const [searchTitle, setSearchTitle] = useState("");
  

   
    // getting list of user products based on user id /product/All
    useEffect(() => { 
    
        axios.get("https://windowshoppingserver.herokuapp.com/shop/All").then((response) => {
            console.log(response.data);
            setShops(response.data);
            
        });
    }, []);

    let deleteID;
    let deleteName;
    const letsDelete = () =>{
        confirmAlert({
            title: "Delete " + deleteName+ " ",
            message: "Are you sure want to delete this shop?",
            buttons:[
                {
                    label: 'Yes',
                    onClick: () =>{
                        axios
                            .delete(`https://windowshoppingserver.herokuapp.com/shop/delete/${deleteID} `,{
                                headers: { accessToken: localStorage.getItem("accessToken") },
                            }) 
                            .then(()=>{
                                window.location.reload(false);
                            });  
                        }
                    
                },
                {
                    label: "No",
                    onClick: ()=>{

                    }

                }
            ]
        })
    }

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
                        deleteID = val.id;
                        deleteName= val.shopName;

                        return(
                            // <h1>{val.shopName}</h1>
                            <tr>
                                <th>{key+1}</th>
                                <td>{val.id}</td>
                                <td>{val.shopName}</td>
                                <td>{val.phoneNumber}</td>
                                <td>{val.email}</td>
                                <td>{val.location}</td>
                                <td><button onClick={letsDelete}>Detete</button></td>
                            </tr>
                            
                        )
                    })
                    }
                 </tbody>
             </table>
        </div>
    )
}
export default Myshops;

import React, { useContext } from "react";
import axios from "axios";
import { useEffect, useState } from "react";

function Myshops(){
    
    const [products, setProducts] = useState([]);
    const [searchTitle, setSearchTitle] = useState("");
    let navigate = useNavigate();

    let count = 1;

    // getting list of user products based on user id /product/All
    useEffect(() => { 
    
        axios.get("https://windowshoppingserver.herokuapp.com/product/All").then((response) => {
            console.log(response.data);
            setProducts(response.data);
            
        });
    }, []);

    return(
        <>
             <hr/>
        </>
    )
}
export default Myshops

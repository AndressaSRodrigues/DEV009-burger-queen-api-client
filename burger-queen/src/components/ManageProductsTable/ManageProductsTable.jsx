import style from "../ManageProductsTable/ManageProductsTable.module.css";
import returnButton from '../../assets/return-button.svg';
import NavigateTo from "../Navigate/Navigate";
import { products } from "../../Services/Request";
import { useEffect } from 'react';
import { useState } from "react";
import DropdownButton from "../DropDownButton/DropDownButton";

export default function ManageProductsTable() {

    const [allProducts, setAllProducts] = useState([]);

    useEffect(() => {
        let token = localStorage.getItem('token')
        products(token)
        .then((response) => {
            console.log('Response getProducts:', response)
            if(!response.ok){
                throw new Error('No existe productos')
            }
            return response.json();
        })
        .then((data)=>{
            console.log('Data getProducts:', data);
            setAllProducts(data)
            return data
        })
        .catch((error) => {
            console.log(error)
        });
    }, []);

    const handleClick = NavigateTo("/main/dashboard");

    return (
        <>
            <div className={style.title_section}>
                <img src={returnButton} onClick={handleClick} />
                <h2>Manage Products</h2>
            </div>
            <div className={`table-responsive ${style.responsive}`}>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Menu</th>
                            <th>Product</th>
                            <th>Price</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {allProducts.map((val, key) => {
                            return (
                                <tr key={key}>
                                    <td>{val.type}</td>
                                    <td>{val.name}</td>
                                    <td>{val.price}</td>
                                    <td><DropdownButton /></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </>
    )
}

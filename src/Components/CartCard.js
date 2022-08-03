import React, { useState, useEffect } from 'react'
import './CartCard.css'
import { doc, setDoc } from "firebase/firestore";

import { db, auth } from '../FirebaseConfigs/firebaseConfig';
import { collection, query, where, getDocs, updateDoc, deleteDoc } from 'firebase/firestore';

const CartCard = (props) => {
    // console.log(props.itemdata.product)
    const [prodquantity, setProdQuantity] = useState(props.itemdata.quantity);

    let p = props.itemdata.product.price
    let overalltax = 10 / 100;
    let overallcommission = 10 / 100;
    let extraforfun = 10 / 100;

    let mrp = parseInt(p)
    mrp = mrp + overalltax * mrp + overallcommission * mrp + extraforfun * mrp
    const saleprice = (mrp - extraforfun * mrp) * prodquantity


    const increasequantity = async () => {
        setProdQuantity(prodquantity + 1)

        const itemref = doc(db, `cart-${props.userid}`, `${props.itemdata.id}`)
        await updateDoc(itemref, {
            quantity: prodquantity + 1
        }).then(() => { console.log('changed quantity') })
        console.log(itemref)
        // console.log(props.itemdata.id)
    }
    const decreasequantity = async () => {
        if (prodquantity >= 1) {
            setProdQuantity(prodquantity - 1)

            const itemref = doc(db, `cart-${props.userid}`, `${props.itemdata.id}`)
            await updateDoc(itemref, {
                quantity: prodquantity - 1
            }).then(() => { console.log('changed quantity') })
            console.log(itemref)
        }
    }

    const deletcartitem = async () => {
        await deleteDoc(doc(db, `cart-${props.userid}`, `${props.itemdata.id}`)).then(() => { console.log('doc deleted') })
    }
    return (
        <div className='cart-prod-container'>
            <div className='cart-prod-imgtitle'>
                <div className='prod-image'><img src={props.itemdata.product.prodimage} /></div>
                <div className='prod-title'>{props.itemdata.product.producttitle}</div>
            </div>
            <div className='prodquantity-div'>
                <button onClick={increasequantity}>+</button>
                <p>{prodquantity}</p>
                <button onClick={decreasequantity}>-</button>
            </div>
            <div className='prodprice'>₹{saleprice}</div>
            <button className='deletebtn' onClick={deletcartitem}>
                <img src='data:image/jpeg;base64,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' />
            </button>
        </div>
    )
}

export default CartCard
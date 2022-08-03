import React, { useState, useEffect } from 'react'

import Navbar from './Navbar'
import { auth, db } from '../FirebaseConfigs/firebaseConfig'
import { collection, getDocs, query, where } from 'firebase/firestore'
import CartCard from './CartCard'
import './Cart.css'

const Cart = () => {
    function GetCurrentUser() {
        const [user, setUser] = useState("");
        const usersCollectionRef = collection(db, "users");
        useEffect(() => {
            auth.onAuthStateChanged(userlogged => {
                if (userlogged) {
                    // console.log(userlogged.email)
                    const getUsers = async () => {
                        const q = query(collection(db, "users"), where("uid", "==", userlogged.uid));
                        // console.log(q);
                        const data = await getDocs(q);
                        setUser(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
                    };
                    getUsers();
                }
                else {
                    setUser(null);
                }
            })
        }, [])
        return user
    }
    const loggeduser = GetCurrentUser();


    const [cartdata, setcartdata] = useState([]);
    if (loggeduser) {
        const getcartdata = async () => {
            const cartArray = [];
            const path = `cart-${loggeduser[0].uid}`
            // console.log(path)
            getDocs(collection(db, path)).then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    // console.log(doc.id, " => ", doc.data());
                    cartArray.push({ ...doc.data(), id: doc.id })
                });
                setcartdata(cartArray)
                // console.log('done')
            }).catch('Error error error')

        }
        getcartdata()
    }



    return (
        <div>
            <Navbar />

            {cartdata ?
                <div>
                    <div className='cart-head'>Your Cart Items</div>
                    <div className='allcartitems'>
                        {cartdata.map((item) => (
                            <CartCard
                                key={item.id}
                                itemdata={item}
                                userid={loggeduser[0].uid}
                            />
                        ))}
                        <div className='proceed'>
                            <button>Proceed</button>
                        </div>
                    </div>

                </div>
                : <p>Your Cart is empty</p>}
        </div>
    )
}

export default Cart
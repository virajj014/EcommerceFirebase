import React, { useState, useEffect } from 'react'
import Navbar from './Navbar'
import Banner from './Banner'
import { auth, db } from '../FirebaseConfigs/firebaseConfig'
import { collection, getDocs, query, where } from 'firebase/firestore'
import ProductSlider from './Some-Product-Components/ProductSlider'

import './Home.css'

const Home = () => {

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
    // if (loggeduser) { console.log(loggeduser[0]) }

    return (
        <div>
            <Navbar ></Navbar>
            <Banner></Banner>
            <div className="slider-head"><p>Limited Time Deals</p></div>
            <ProductSlider type={'Mobile'} />
            <ProductSlider type={'Camera'} />
            <ProductSlider type={'Laptop'} />
            <ProductSlider type={'Shoes'} />
            {/* <Products /> */}
            {/* <p>{loggeduser ? loggeduser[0].email : "No data"}</p> */}
        </div>
    )
}

export default Home
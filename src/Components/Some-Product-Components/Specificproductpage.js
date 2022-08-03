import React, { useState, useEffect } from 'react'
import Navbar from '../Navbar'
import { useParams } from 'react-router-dom'
import { auth, db } from '../../FirebaseConfigs/firebaseConfig'
import { doc, getDoc, collection, query, where, getDocs, addDoc } from "firebase/firestore";
import './Specificproductpage.css'
import ProductSlider from './ProductSlider';

const Specificproductpage = () => {
    const { type, id } = useParams()
    const [product, setProduct] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

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


    function GetCurrentProduct() {
        // const productCollectionRef = collection(db, `products-${type.toUpperCase()}`);

        useEffect(() => {
            const getProduct = async () => {

                const docRef = doc(db, `products-${type.toUpperCase()}`, id);
                const docSnap = await getDoc(docRef);
                setProduct(docSnap.data());
            };
            getProduct();
        }, [])
        return product
    }

    GetCurrentProduct();
    // console.log(product)
    // console.log(currentprod.description)



    let overalltax = 10 / 100;
    let overallcommission = 10 / 100;
    let extraforfun = 10 / 100;


    let mrp = parseInt(product.price)
    mrp = mrp + overalltax * mrp + overallcommission * mrp + extraforfun * mrp
    const saleprice = mrp - extraforfun * mrp
    // console.log('hii')

    // console.log(currentprod.price)




    const addtocart = () => {
        if (loggeduser) {
            console.log(loggeduser[0].uid)
            addDoc(collection(db, `cart-${loggeduser[0].uid}`), {
                product, quantity: 1
            }).then(() => {
                setSuccessMsg('Product added to cart');

            }).catch((error) => { setErrorMsg(error.message) });
        }
        else {
            setErrorMsg('You need to login first')
        }

    }

    return (


        <div>
            <Navbar />

            {product ?
                <div className='myprod-container'>
                    <div className='prod-img-cont'>
                        <img src={product.prodimage} />
                    </div>

                    <div className='prod-data'>
                        <p className='prod-head'>{product.producttitle}</p>
                        <p className='prod-keyspecs'>{product.keyspecs}</p>
                        <div className='specific-price-container'>
                            <p className='mrp'>MRP: <p className='rate'>₹{mrp}</p></p>
                            <p className='saleprice'>Discount Price: <p className='rate'>₹{saleprice}</p></p>
                            <p className='yousave'>You Save: ₹{mrp - saleprice}</p>
                        </div>
                        <p className='prod-details-head'>Details</p>
                        <p className='prod-description'>{product.description}</p>
                        <div className='row-cont'>
                            <div className='warranty-replacement'>
                                <div className='cod'>
                                    <div className='img-circle'>
                                        <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTH8qRKTCC5ReP6IgkWI3m3wAdygUiCxtxU1g&usqp=CAU' />
                                    </div>
                                    <p>Cash on Delivery</p>
                                </div>
                                <div className='warranty'>
                                    <div className='img-circle'>
                                        <img src='data:image/png;base64,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' />
                                    </div>
                                    <p>{product.warranty} year warranty</p>
                                </div>

                                <div className='replacement'>
                                    <div className='img-circle'>
                                        <img src='data:image/png;base64,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' />
                                    </div>
                                    <p>10 Days replacement</p>
                                </div>
                            </div>
                            <div className='buy-cart'>
                                <button className='btn'>Buy Now</button>
                                <button className='btn' onClick={addtocart}>Add to Cart</button>
                            </div>
                        </div>
                        {successMsg && <>
                            <div className='success-msg'>{successMsg}</div>
                        </>}
                        {errorMsg && <>
                            <div className='error-msg'>{errorMsg}</div>
                        </>}
                    </div>
                </div>
                : <p>Loading...</p>}
            <p className='prod-details-head2'>Similar Items</p>
            <ProductSlider type={type} />

        </div>
    )
}

export default Specificproductpage
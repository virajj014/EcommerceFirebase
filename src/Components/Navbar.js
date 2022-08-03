import React, { useState, useEffect } from 'react'
import { Link, Navigate } from 'react-router-dom'
import './Navbar.css'
import cartlogo from '../Components/assets/cartlogo.png'
import profilelogo from '../Components/assets/profilelogo.png'
import applogo from '../Components/assets/applogo.png'
import { auth, db } from '../FirebaseConfigs/firebaseConfig'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'


const Navbar = () => {
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



    const navigate = useNavigate()
    const handleLogout = () => {
        auth.signOut().then(() => {
            navigate("/login")
        })
    }




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

    // console.log(cartdata.length)

    return (
        <div>
            <div className='navbar'>
                <div className="LeftContainer">
                    <img src={applogo} />
                </div>
                <div className="RightsContainer">
                    {!loggeduser && <nav>
                        <Link to='/' ><button>Home</button></Link>
                        <Link to='/signup'><button>Register</button></Link>
                        <Link to='/login'><button>Login</button></ Link >
                        <div className='cart-btn'>

                            <img src={cartlogo} alt="no img" />
                            <span className='cart-icon-css'>0</span>
                        </div>
                        <Link to="/userprofile">
                            <img src={profilelogo} className='profile-icon' />
                        </Link>
                    </nav >}


                    {loggeduser && <nav>
                        <Link to='/' ><button>Home</button></Link>
                        <Link to='/sellproduct'><button>Sell</button></Link>
                        {/* <Link to='/signup'><button>Register</button></Link> */}
                        {/* <Link to='/login'><button>Login</button></ Link > */}

                        <div className='cart-btn'>
                            <Link to='/cartdata'><img src={cartlogo} alt="no img" /></Link>
                            <button className='cart-icon-css'>{cartdata.length}</button>
                        </div>

                        <Link to="/userprofile">
                            <img src={profilelogo} className='profile-icon' />
                        </Link>
                        <button className='logout-btn' onClick={handleLogout}>Logout</button>

                    </nav >}
                </div>
            </div>
            <div className='product-types'>
                <a href="/product-type/mobile"><button>Mobiles</button></a>
                <a href="/product-type/laptop"><button>Laptops</button></a>
                <a href="/product-type/camera"><button>Cameras</button></a>
                <a href="/product-type/shoes"><button>Shoes</button></a>
            </div>
        </div>
    )
}

export default Navbar
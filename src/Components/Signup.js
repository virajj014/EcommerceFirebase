import React, { useState } from 'react'
import Navbar from './Navbar'
import { Link } from 'react-router-dom'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '../FirebaseConfigs/firebaseConfig'
import { collection, addDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'

import './Signup.css'

const Signup = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("")
    const [phonenumber, setPhonenumber] = useState("")
    const [address, setAddress] = useState("")

    const navigate = useNavigate()

    const [errorMsg, setErrorMsg] = useState("")
    const [successMsg, setSuccessMsg] = useState("")

    const handleSignup = (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed up
                const user = userCredential.user;
                const initialcartvalue = 0;
                console.log(user)
                addDoc(collection(db, "users"), { username: username, email: email, phonenumber: phonenumber, password: password, cart: initialcartvalue, address: address, uid: user.uid }).then(() => {
                    setSuccessMsg('New user added successfully, You will now be automatically redirected to login page.')
                    setUsername('')
                    setPhonenumber('')
                    setEmail('')
                    setPassword('')
                    setErrorMsg('')
                    setTimeout(() => {
                        setSuccessMsg('');
                        navigate('/login');
                    }, 4000);
                }).catch((error) => { setErrorMsg(error.message) });
            })
            .catch((error) => {
                // const errorCode = error.code;
                // const errorMessage = error.message;
                console.log(error.message)
                if (error.message == 'Firebase: Error (auth/invalid-email).') {
                    setErrorMsg('Please fill all required fields')
                }
                if (error.message == 'Firebase: Error (auth/email-already-in-use).') {
                    setErrorMsg('User already exists');
                }
            });
    }


    return (
        <div>
            <Navbar />
            <div className='signup-container'>
                <form onSubmit={handleSignup} className='signup-form'>
                    <p>Create Account</p>
                    {successMsg && <>
                        <div className='success-msg'>{successMsg}</div>
                    </>}
                    {errorMsg && <>
                        <div className='error-msg'>{errorMsg}</div>
                    </>}
                    <label>Your name</label>
                    <input onChange={(e) => setUsername(e.target.value)} type="text" placeholder="First and last name" />
                    <label>Mobile Number</label>
                    <input onChange={(e) => setPhonenumber(e.target.value)} type="tel" placeholder="Mobile Number" />
                    <label>Email</label>
                    <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter your email" />
                    <label>Password</label>
                    <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Enter your password" />
                    <label>Address</label>
                    <textarea onChange={(e) => setAddress(e.target.value)} placeholder="Enter your address"></textarea>
                    <button type='submit'>Sign up</button>
                    <div>
                        <span>Already have an account ?</span>
                        <Link to="/login">Sign in</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup
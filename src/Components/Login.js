import React, { useState } from 'react'
import Navbar from './Navbar'
import './Login.css'
import { Link } from 'react-router-dom'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom'


const Login = () => {
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("")
    const [errorMsg, setErrorMsg] = useState("")
    const [successMsg, setSuccessMsg] = useState("")

    const auth = getAuth();
    const navigate = useNavigate()


    const handleLogin = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                setSuccessMsg('Logged in successfully, you will be redirected to homepage')

                // console.log(loggeduser.email)
                setEmail('')
                setPassword('')
                setErrorMsg('')
                setTimeout(() => {
                    setSuccessMsg('');
                    navigate('/home');
                }, 3000);
            })
            .catch((error) => {
                const errorCode = error.code;
                console.log(error.message)
                if (error.message == 'Firebase: Error (auth/invalid-email).') {
                    setErrorMsg('Please fill all required fields')
                }
                if (error.message == 'Firebase: Error (auth/user-not-found).') {
                    setErrorMsg('Email not found');
                }
                if (error.message == 'Firebase: Error (auth/wrong-password).') {
                    setErrorMsg('Wrong Password');
                }
            });
    }

    return (
        <div>
            <Navbar />
            <div className='signin-container'>
                <form className='signin-form'>
                    <p>Login</p>
                    {successMsg && <>
                        <div className='success-msg'>{successMsg}</div>
                    </>}
                    {errorMsg && <>
                        <div className='error-msg'>{errorMsg}</div>
                    </>}
                    <label>Email</label>
                    <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter your email" />
                    <label>Password</label>
                    <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Enter your password" />
                    <button onClick={handleLogin}>Login</button>
                    <div>
                        <span>Don't have an account ?</span>
                        <Link to="/signup">Sign up</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login
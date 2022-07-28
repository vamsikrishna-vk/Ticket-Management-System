import React, { useState } from 'react';
import "./Login.css";
import emailImg from "./img/email.jpg";
import pass from "./img/password.png";
import profile from "./img/profile.png";

function Login() {

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

  return (
    <div className="main">
        <div className="sub-main">
            <form type="submit">
                <div className="imgs">
                    <div className="container-image">
                        <img src={profile} alt="profile" className="profile"/>
                    </div>
                </div>
                <div>
                    <h1>Login Page</h1>
                    <div>
                        <img src={emailImg} alt="email" className="email"/>
                        <input type="text" placeholder="username" className="name"/>
                    </div>
                    <div className="second-input">
                        <img src={pass} alt="pass" className="email"/>
                        <input type="password" placeholder="password" className="name"/>
                    </div>
                    <div className="login-button">
                        <button>Login</button>
                    </div>
                    <div className="login-button">
                        <button>Sign Up</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Login;


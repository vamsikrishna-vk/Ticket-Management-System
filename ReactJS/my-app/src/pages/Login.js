import React, { useState } from 'react';
import { Button, TextField, Typography } from "@mui/material";
import "./Login.css";

function Login() {

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

  return (
    <div className="login">
        <form>
            <div class="submain">
                <Typography variant='h6' fontWeight={600} className="heading">LOGIN</Typography>
                <TextField 
                    margin='normal' 
                    type={"text"} 
                    variant='outlined' 
                    fullWidth 
                    placeholder='Email ID'
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                    />
                <TextField 
                    margin='normal' 
                    type={"password"} 
                    variant='outlined' 
                    fullWidth  
                    placeholder='Password' 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />
                <Button variant='contained' color='primary'>Login</Button>
                <p>NEW USER? CLICK HERE TO REGISTER</p>
            </div>   
        </form>
    </div>
  )
}

export default Login;


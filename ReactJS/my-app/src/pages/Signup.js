import React, { useState } from "react";
import { Button, TextField, Typography } from "@mui/material";
import "./Signup.css";

function Signup() {
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [password2,setPassword2] = useState("");

  return (
    <div className="register">
        <form>
            <div class="submain">
                <Typography variant='h6' fontWeight={600} className="heading">REGISTER</Typography>
                <TextField 
                    margin='normal' 
                    type={"text"} 
                    variant='outlined' 
                    fullWidth 
                    placeholder='Full Name'
                    value={name} 
                    onChange={(e) => setName(e.target.value)}
                    />

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

                <TextField 
                    margin='normal' 
                    type={"password"} 
                    variant='outlined' 
                    fullWidth  
                    placeholder='Confirm Password' 
                    value={password2}
                    onChange={(e) => setPassword2(e.target.value)}
                />

                <Button variant='contained' color='primary'>REGISTER</Button>
            </div>   
        </form>
    </div>
  )
}

export default Signup;
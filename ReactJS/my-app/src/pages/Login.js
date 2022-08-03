import React from 'react';
import { Button, Container, Typography } from "@mui/material";
import GoogleIcon from '@mui/icons-material/Google';
import "./Login.css"
import ElevateAppBar from '../components/NewAppbar';


function Login() {

    const handleLoginClick = () => {
        window.open(`http://localhost:8080/oauth2/authorization/google`, "_self")
        console.log(process.env.isLoggedIn)
    }

    return (
        <Container id="login">
            <div className="submain">
                <Typography variant='h6' fontWeight={600} className="heading">LOGIN</Typography>
                <Button variant='contained' color='primary' onClick={handleLoginClick}><GoogleIcon sx={{ mr: 2 }} /> Login With Google</Button>
            </div>
        </Container>
    )
}

export default Login;


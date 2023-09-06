import React from "react";

import { auth,provider } from "../firebase-config";
import { signInWithPopup } from "firebase/auth";
import Card from '@mui/material/Card';
import { Button, Typography } from "@mui/material";
import Avatar from '@mui/material/Avatar';
import { useNavigate } from "react-router-dom";

 
function Login({setIsAuth}){

    let navigate = useNavigate();

    const signInWithGoogle =() =>{
            signInWithPopup(auth,provider).then((result)=>{
                localStorage.setItem("isAuth",true);
                setIsAuth(true);
                navigate("/");
            })
    }
 return <div>
    <center>
    <Card  variant="outlined" style={{
            width: 500,
            height:250,
            borderRadius: 10,
            padding: 60,
            marginTop: 50
        }}>
        <Typography variant={"h4"}>
        Login 
        </Typography>
        <br/>
        <Avatar src="/broken-image.jpg" sx={{ width: 56, height: 56 }} />
        <br/>
      <Button variant="contained" disableElevation onClick={signInWithGoogle}>Log In with google </Button>
   
    </Card>
    </center>
 </div>
}

export default Login;
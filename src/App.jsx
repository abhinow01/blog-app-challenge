import React, { useEffect } from 'react';
import {BrowserRouter as Router , Routes, Route,Link} from 'react-router-dom'
import CreatePost from './components/CreatePost';
import Home from './components/Home';
import Login from './components/Login';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Stack from '@mui/material/Stack';
import { useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from './firebase-config';


function App() {
  const [isAuth,setIsAuth] = useState(localStorage.getItem("isAuth"));





  const signUserOut = ()=>{
    signOut(auth).then(()=>{
      localStorage.clear();
      setIsAuth(false);
      window.location.pathname="/login";
    })
  }

  return (
    <Router>
      <Box sx={{ flexGrow: 1 }}>
      <AppBar  position="static" style={{
            backgroundColor:'whitesmoke'
        }}>
          <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            
          </IconButton>
          <Stack direction="row" spacing={2} justifyContent="center">
          <Typography>
        <Button style={{color:"black"}} variant = "text" href="/">Home</Button>
        </Typography>
       
            
            { 
            !isAuth ? (<Typography><Button style={{color:"black"}} variant = "text" href="/login">Login</Button></Typography>)
            : (
              <>
              <Typography>
        <Button style={{color:"black"}} variant = "text" href="/createpost">Create Post</Button>
        </Typography>
            <Button onClick={signUserOut}>Log out</Button>
            </>
          )}
        
        
        </Stack>
        </Toolbar>
      </AppBar>
      </Box>
      <Routes>
        <Route path="/" element={<Home isAuth={isAuth}/>} />
        <Route path="/login" element={<Login setIsAuth={setIsAuth} />}  />
        <Route path="/createpost" element={<CreatePost isAuth={isAuth}/>} />
      </Routes>
    </Router>
  )
}

export default App

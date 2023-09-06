import React , {useState, useEffect} from "react";
import { getDocs ,collection} from "firebase/firestore";
import { db } from "../firebase-config";
import Card from '@mui/material/Card';
import { Button, Typography } from "@mui/material";
import Paper from '@mui/material/Paper';


function Home(){
    const [postList,setPostList] = useState([]);
    const postCollectionRef = collection(db,"posts");
    useEffect(()=>{
        const getPosts = async ()=>{
            const data = await getDocs(postCollectionRef);
            setPostList(data.docs.map((doc)=>(
               { ...doc.data(), id: doc.id}
            )))
        };
       getPosts();
    })
return <div>
    {postList.map((post)=>{
        return <div>
        <center>
        <Card variant="outlined" style={{
            width: 500,
            height:450,
            borderRadius: 10,
            padding: 60,
            marginTop: 50
        }}
        >
        <Paper elevation={5}>
        <Typography variant="h5" component="div">
            {post.title} - {post.postId}
            </Typography>
            <Paper elevation={1}>
         {<Typography variant="h6" component="div">
            {post.postText}
            </Typography>} 
            
    </Paper>
    </Paper>
    
            </Card>
            </center>
            </div>
    })}
</div>
}

export default Home;
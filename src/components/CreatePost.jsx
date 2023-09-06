import React, { useState ,useEffect} from "react";
import Card from '@mui/material/Card';
import { Button, TextField, Typography } from "@mui/material";
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import { styled } from '@mui/system';
import { addDoc ,collection} from "firebase/firestore";
import { db,auth } from "../firebase-config";
import { useNavigate } from "react-router-dom";

function CreatePost({isAuth}){
    const [title, setTitle] = useState("");
    const [postId, setPostId] = useState("");
    const [postText,setPostText] = useState("");

    const postCollectionRef = collection(db,"posts");

let navigate = useNavigate();

    const createPost = async ()=>{
        await addDoc(postCollectionRef, {title,postId,postText, author:{name:auth.currentUser.displayName,id:auth.currentUser.uid}});
        navigate("/");
    };

    useEffect(()=>{
        if(!isAuth){
            navigate("/login");
        }
      },[])


return <div>
    <center>
        <Typography variant="h4" 
        style={{
            marginTop: 20
        }}>
            Create your post 
        </Typography>
        <Card variant="outlined"
          style={{
            width: 500,
            height:350,
            borderRadius: 10,
            padding: 60,
            marginTop: 50


        }}                    >
          <TextField 
          label="Title.."
                size="small"
                id="outlined basic"
                variant="outlined"
                onChange={(e)=>{
                    setTitle(e.target.value);
                }}/>
                <br/><br/>
                <TextField 
                label="Post ID"
                size="small"
                id="outlined basic"
                variant="outlined"
                onChange={(e)=>{
                    setPostId(e.target.value);
                }}/>
                <br/><br/>
                <TextareaAutosize
                    aria-label="minimum height"
                    minRows={15}
                    placeholder="write your piece here "
                    style={{
                        width: 500,
                        borderRadius:10
                    }}

                    onChange={(e)=>{
                        setPostText(e.target.value);
                    }}
/>
<Button variant="contained" disableElevation

onClick={createPost}> Submit Post</Button>
        </Card>
    </center>
</div>
}

export default CreatePost;
import { Button, TextField } from '@mui/material';
import React, { useState } from 'react'
import { database } from '../firebase';

const AddComment = ({ userData, postData }) => {

    const [text, setText] = useState('');
    const handleclick = () => {
        let obj = {
            text: text,
            uProfileImage: userData.profileUrl,
            uName: userData.fullName
        }
        database.comments.add(obj).then((doc) => {
            database.posts.doc(postData.postId).update({
                comments: [...postData.comments, doc.id]
            })
        })
        setText('');
    }
    return (
        <div style={{ width: "100%" }}>
            <TextField id="outlined-basic" label="Comment" variant="outlined" size='small' sx={{ width: "75%" }} value={text} onChange={(e) => setText(e.target.value)} />
            <Button variant='contained' onClick={handleclick} >Post</Button>
        </div>
    )
}

export default AddComment
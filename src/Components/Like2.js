import React, { useEffect, useState } from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite';
import { database } from "../firebase";
// import { FavoriteIcon } from '@material-ui/icons/';


const Like2 = ({ userData, postData }) => {
    const [like, setLike] = useState(null);


    useEffect(() => {
        let check = Array.isArray(postData.likes) && postData.likes.includes(userData && userData.userId) ? true : false;
        setLike(check)
    }, [postData])

    const handleLike = () => {
        if (like) {
            let narr = postData.likes.filter((el) => el !== (userData && userData.userId))
            database.posts.doc(postData.postId).update({
                likes: narr
            })

        } else {

            let narr = []
            if (Array.isArray(postData.likes)) {
                narr = [...postData.likes, (userData && userData.userId)]
            } else {
                narr = [(userData && userData.userId)]
            }
            database.posts.doc(postData.postId).update({
                likes: narr
            })

        }
    }


    return (
        <div>
            {
                like !== null ?
                    <>
                        {
                            like === true ? <FavoriteIcon style={{padding:"1rem",paddingTop:"0.5rem"}} className={'like'} onClick={handleLike} /> : <FavoriteIcon style={{padding:"1rem",paddingTop:"0.5rem"}} className={'unlike2'} onClick={handleLike} />
                        }
                    </> :
                    <></>
            }
        </div>
    )
}

export default Like2
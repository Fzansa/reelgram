import React, { useEffect, useState } from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite';
import { database } from "../firebase";
// import { FavoriteIcon } from '@material-ui/icons/';


const Like = ({ userData, postData }) => {
    const [like, setLike] = useState(null);
    

    useEffect(() => {
        let check = Array.isArray(postData && postData.likes) && postData.likes.includes(userData && userData.userId) ? true : false;
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
                            like === true ? <FavoriteIcon className={'icon-styling like'} onClick={handleLike} /> : <FavoriteIcon className={'icon-styling unlike'} onClick={handleLike} />
                        }
                    </> :
                    <></>
            }
        </div>
    )
}

export default Like
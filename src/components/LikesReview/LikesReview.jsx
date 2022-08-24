import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import { getAllReviews, getOtherUser } from "../../redux/actions";

export default function LikesReview(props){
    let dispatch = useDispatch();
    const mapedLikes = props?.likes?.map(l => {
        return l.id
    });
    
    const hasLikes = mapedLikes?.includes(props?.meId);

    const handleButton = async () => {
    await axios.put(`/api/back-end/reviews/like/${props.meId}/${props?.id}`);
    dispatch(getAllReviews());
    };

    return(
        <div>
            { hasLikes ? 
                <button className="likesReview" onClick={() => handleButton()}>❤️</button>
                :
                <button className="likesReview" onClick={() => handleButton()}>🖤</button>
            }<> : </>
            {mapedLikes?.length}
        </div>
    );
};
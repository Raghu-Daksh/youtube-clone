import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addComment, getCommentsOfVideoById } from "../../redux/actions/comment.action";
import Comment from "../comment/Comment";
import './_comments.scss'
import numeral from "numeral";

const Comments = ({videoId, totalComments}) => {

  const dispatch = useDispatch();
  const [text, setText] = useState('');

  useEffect(()=>{
    dispatch(getCommentsOfVideoById(videoId));
  },[dispatch,videoId])

  const comments = useSelector(state=>state.commentList?.comments)
  const _comments = comments?.map((comment)=> comment?.snippet?.topLevelComment?.snippet )

  // console.log(_comments);

  const handleComment = (e) => {
    e.preventDefault();
    if(text.length === 0) return;
    dispatch(addComment(videoId,text));
    setText('');
  };

  const {user} = useSelector(state=>state.auth)
 
  return (
    <div className="comments">
      <p>{numeral(totalComments).format("0.a")} Comments </p>
      <div className="comment__form d-flex w-100 my-2 ">
        <img
          src={user?.photoUrl}
          alt="avatar"
          className="rounded-circle mr-3 comment_img"
        />
        <form onSubmit={handleComment} className="d-flex flex-grow-1">
          <input
            type="text"
            placeholder="write comment"
            className="flex-grow-1"
            value={text}
            onChange={(e)=>setText(e.target.value)}
          />
          <button className="border-0 p-2">comment</button>
        </form>
      </div>
      <div className="comments__list">
        {_comments?.map((comment,i) => (
          <Comment comment={comment} key={i}/>
        ))}
      </div>
    </div>
  );
};

export default Comments;

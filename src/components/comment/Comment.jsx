import React from 'react'
import moment from 'moment'
import './comment.scss'
const Comment = ({comment}) => {

  const {authorProfileImageUrl, publishedAt,textOriginal,authorDisplayName} = comment;

  return (
    <div className='comment p-2 d-flex'>
         <img src={authorProfileImageUrl} alt="" className='rounded-circle mr-3' />
         <div className='comment__body'>
                <p className='comment__header mb-0 '>
                    {authorDisplayName} • {moment(publishedAt).fromNow()}
                </p>
                <p>{textOriginal }</p>
         </div>
    </div>
  )
}

export default Comment

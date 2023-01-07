import React, { useEffect, useState } from "react";
import "./_videoMetaData.scss";
import moment from "moment";
import numeral from "numeral";
import { MdThumbDown, MdThumbUp } from "react-icons/md";
import ShowMoreText from "react-show-more-text";
import { useDispatch, useSelector } from "react-redux";
import { checkSubscriptionStatus, getChannelById } from "../../redux/actions/channel.action";

const VideoMetaDdata = ({ video: { snippet, statistics }, videoId }) => {

  const { publishedAt, title, description, channelId, channelTitle } = snippet;
  const { viewCount, likeCount, commentCount } = statistics;
  const dispatch = useDispatch();



  useEffect(() => {
    dispatch(getChannelById(channelId));

    dispatch(checkSubscriptionStatus(channelId));
  }, [dispatch]);

  const { statistics: channelStatistics, 
          snippet: channelSnippet
 } =useSelector((state) => state.channelDetails.channel);

 const {subscriptionStatus} = useSelector(state=>state.channelDetails);

//  console.log('subscriptionStatus',subscriptionStatus);



  return (
    <div className="videoMetaData">
      <div className="videoMetaData__top">
        <h5>{title}</h5>
        <div className="d-flex justify-content-between align-items-center py-1 ">
          <div className="d-flex gap-2">
            <span>{numeral(viewCount).format("0.a")} views</span>
            <span>{moment(publishedAt).fromNow()}</span>
          </div>
          <div className="d-flex gap-2">
            <span >
              <MdThumbUp size={26} /> {numeral(likeCount ).format("0.a")} 
            </span>
            <span>
              <MdThumbDown size={26} />
            </span>
          </div>
        </div>
      </div>
      <div className="videoMetaData__channel d-flex justify-content-between my-3 mx-1 py-3 align-items-center">
        <div className="d-flex gap-3">
          <img
            src={channelSnippet?.thumbnails?.default?.url}
            alt=""
            width="100"
            className="rounded-circle r-3"
          />
          <div className="d-flex flex-column ">
            <span>{channelTitle}</span>
            <span>
              {numeral(channelStatistics?.subscriberCount).format("0.a")}{" "}
              subscribers{" "}
            </span>
          </div>
        </div>
        <button className={`btn border-0 p-2 m-2 ${subscriptionStatus && 'btn-grey'}`}>{ subscriptionStatus ? 'subscribed' :'subscrbe'}</button>
      </div>
      <div className="videoMetaData__description mb-4">
        <ShowMoreText
          lines={3}
          more="Show more"
          less="Show less"
          className="content-css"
          anchorClass="show-more-less-clickable"
          expanded={false}
          truncatedEndingComponent={"... "}
        >
          {description}
        </ShowMoreText>
      </div>
    </div>
  );
};

export default VideoMetaDdata;

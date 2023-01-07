import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { AiFillEye } from "react-icons/ai";
import request from "../../api";
import moment from "moment";
import numeral from "numeral";
import {useNavigate} from 'react-router-dom'
import "./video.scss";
import { LazyLoadImage } from 'react-lazy-load-image-component';

const Video = ({ video, channelScreen }) => {
  const [views, setViews] = useState(null);
  const [duration, setDuration] = useState(null);
  const [channelIcon, setChannelicon] = useState(null);
  const navigate = useNavigate();
  // console.log("video", video);

  const {
    id,
    snippet: {
       channelId,
       channelTitle,
       title,
       publishedAt,
       thumbnails: { medium },
    },
    contentDetails
 } = video


  const seconds = moment.duration(duration).asSeconds();
  const _duration = moment.utc(seconds * 1000).format("mm:ss");

  const _videoId = id?.videoId || contentDetails?.videoId?.id || id;

  useEffect(() => {
    const getVideoDetails = async () => {
      const {
        data: { items },
      } = await request("/videos", {
        params: {
          part: "contentDetails, statistics",
          id: _videoId,
        },
      });
      // console.log(items);
      setDuration(items[0]?.contentDetails.duration);
      setViews(items[0]?.statistics.viewCount);
    };
    getVideoDetails();
  }, [_videoId]);

  useEffect(() => {
    const getChannelDetails = async () => {
      const {
        data: { items },
      } = await request("/channels", {
        params: {
          part: "snippet",
          id: channelId,
        },
      });
      setChannelicon(items[0].snippet.thumbnails.medium);
    };
    getChannelDetails();
  }, [channelId]);

  const handlerVideo = ()=>{
      navigate(`/watch/${_videoId}`)
  }

  return (
    <div className="video" onClick={handlerVideo}>
      <div className="video__top">
        <LazyLoadImage src={medium?.url}  effect="blur" />
        <span className="video__top__duration">{_duration}</span>
      </div>
      {
        !channelScreen && (
          <div className="video__channel">
            <LazyLoadImage src={channelIcon?.url} effect='blur' />
            <p> {title} </p>
          </div>
        )
      }
      <div className="video__title">{channelTitle}</div>
      <div className="video__details">
        <span>
          <AiFillEye /> {numeral(views).format("0.a")} views •
        </span>
        <span>{moment(publishedAt).fromNow()}</span>
      </div>
    </div>
  );

// return (
//   <>
//     vido
//   </>
// );
};

export default Video;

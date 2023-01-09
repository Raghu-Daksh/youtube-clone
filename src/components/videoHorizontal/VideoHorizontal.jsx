import React, { useEffect, useState } from "react";
import "./_videoHorizontal.scss";
import { AiFillEye } from "react-icons/ai";
import request from "../../api";

import moment from "moment";
import numeral from "numeral";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Col, Row } from "react-bootstrap";
import { Navigate, useNavigate } from "react-router-dom";

const VideoHorizontal = ({video, SearchScreen, subScreen}) => {

  const [views, setViews] = useState(null);
  const [duration, setDuration] = useState(null);
  const [channelIcon, setChannelicon] = useState(null);
  const navigate = useNavigate()
  // console.log("video", video);
  
  const {
    id,
    snippet: {
       channelId,
       channelTitle,
       title,
       description,
       publishedAt,
       thumbnails: { medium },
       resourceId,
    }
 } = video

  const seconds = moment.duration(duration).asSeconds();
  const _duration = moment.utc(seconds * 1000).format("mm:ss");
  const isVideo = !(id.kind === "youtube#channel" || subScreen);

  const _channelId = resourceId?.channelId || channelId

  useEffect(() => {
    const getVideoDetails = async () => {
      const {
        data: { items },
      } = await request("/videos", {
        params: {
          part: "contentDetails, statistics",
          id: id?.videoId
        },
      });
      // console.log(items);
      setDuration(items[0]?.contentDetails.duration);
      setViews(items[0]?.statistics.viewCount);
    };
   if(isVideo)
    getVideoDetails();
  }, [id]);

  useEffect(() => {
    const getChannelIcon = async () => {
      const {
        data: { items },
      } = await request("/channels", {
        params: {
          part: "snippet",
          id: channelId,
        },
      });
      setChannelicon(items[0].snippet.thumbnails.default);
    };
    getChannelIcon();
  }, [channelId]);

  const handleVideo = ()=>{
    navigate(`/watch/${id?.videoId}`);

  }

  const thumbnail = !isVideo && 'videoHorizontal__thumbnail-channel'

  return (
    <Row className="videoHorizontal py-2 m-1 align-items-center " onClick={handleVideo}> 
      <Col xs={6} md={SearchScreen || subScreen? 4:8}className="videoHorizontal__left d-flex align-items-center">
        <LazyLoadImage
          src={medium?.url}
          effect="blur"
          className={`videoHorizontal__thumbnail ${thumbnail}`}
          wrapperClassName="videoHorizontal__thumbnail-wrapper"
        />
        { isVideo &&  <span className="videoHorizontal__duration">{_duration}</span> }       
      </Col>
      <Col xs={6} md={SearchScreen || subScreen? 8:4} className='videoHorizontal__right'>
        <p className="videoHorizontal__title mb-2">
          {title}
        </p>
        {
          isVideo && (
            <div className="videoHorizontal__details mt-2">
            <AiFillEye /> {numeral(views).format("0.a")} views •
            {moment(publishedAt).fromNow()}
          </div>
          )
        }
        {
          SearchScreen || subScreen && (
            <p className="mt-1 videoHorizontal__desc ">{description}</p>
          )
        }
        <div className="videoHorizontal__channel d-flex align-items-center my-1">
          <div>
            {
              isVideo && ( 
                <LazyLoadImage
                  src={channelIcon}
                  effect="blur"
                />
              )}
          </div>
          <p className="channelTitle"> {channelTitle}</p>
        </div>
        {SearchScreen || subScreen &&
          <p className="mt-2">
            {
              video?.contentDetails.totalItemCount
            }{" "}
            Videos
          </p>
        }
      </Col>
    </Row>
  );
};

export default VideoHorizontal;

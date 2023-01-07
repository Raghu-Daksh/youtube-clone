import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Comments from "../../components/comments/Comments";
import VideoHorizontal from "../../components/videoHorizontal/VideoHorizontal";
import VideoMetaDdata from "../../components/videoMetadat/VideoMetaDdata";
import { useDispatch, useSelector } from "react-redux";
import "./watchScreen.scss";
import { getRelatedVideos, getVideoById } from "../../redux/actions/video.action";
const WatchScreen = () => {


  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getVideoById(id));
  }, [dispatch, id]);

  const { video, loading } = useSelector(
    (state) => state.selectedVideo
  );
  
  useEffect(()=>{
    dispatch(getRelatedVideos(id))
  },[dispatch])

  const {videos, loading: relatedVideosLoading} = useSelector(state=>state.relatedVideos);
  // console.log('video', video);
  // console.log('loading', loading);
  
  return (
    <Row>
      <Col lg={8}>
        <div className="watchScreen__player">
          <iframe
            width="100%"
            frameBorder="0"
            height="100%"
            title={video?.snippet?.title}
            allowFullScreen
            src={`https://www.youtube.com/embed/${id}`}
          ></iframe>
        </div>
        {!loading ? (
          <VideoMetaDdata video={video} videoId={id} />
        ) : (
          <h3>loading...</h3>
        )}

        <Comments videoId={id} totalComments={video?.statistics?.commentCount}  />
      </Col>
      <Col lg={4}>
        {videos?.filter(video=>video.snippet).map((video) => (
          <VideoHorizontal video={video}  key={video.id.videoId} />
        ))}
      </Col>
    </Row>
  );
};

export default WatchScreen;

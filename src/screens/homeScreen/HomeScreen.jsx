import React from "react";
import { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import CategoriesBar from "../../components/cateoriesBar/categoriesBar";
import Video from "../../components/video/Video";
import {
  getPopolarVideos,
  getVideosByCategory,
} from "../../redux/actions/video.action";

import InfiniteScroll from "react-infinite-scroll-component";
import "./homeScreen.scss";

import SkeletonVideo from "../../components/skeletons/SkeletonVideo";

const HomeScreen = () => {
  const dispatch = useDispatch();

  const { videos, activeCategory, loading } = useSelector(
    (state) => state.homeVideos
  );

  useEffect(() => {
    dispatch(getPopolarVideos());
  }, [dispatch]);

  const fetchData = () => {
    if (activeCategory === "All") dispatch(getPopolarVideos());
    else dispatch(getVideosByCategory(activeCategory));
  };

  // console.log('videos', videos);

  return (
    <Container>
      <CategoriesBar />
      <InfiniteScroll
        dataLength={videos?.length}
        next={fetchData}
        hasMore={true}
        loader={
          <div className="spinner-border text-danger d-block mx-auto"></div>
        }
        className="row homeScreen"
      >
        {!loading
          ? videos?.map((video) => (
              <Col md={4} sm={6} lg={3}>
                <Video video={video} key={video.id} />
              </Col>
            ))
          : [...Array(20)].map(() => (
              <Col md={4} sm={6} lg={3}>
               <SkeletonVideo  />
              </Col>     
            ))}
      </InfiniteScroll>
    </Container>
  );
};

export default HomeScreen;

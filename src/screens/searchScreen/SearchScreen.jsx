import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import VideoHorizontal from "../../components/videoHorizontal/VideoHorizontal";
import { getVideosBySearch } from "../../redux/actions/video.action";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

const SearchScreen = () => {
  const query = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getVideosBySearch(query));
  }, [dispatch, query]);

  const { videos, loading } = useSelector((state) => state.searchedVideos);

  //  console.log(query);

  return (
    <Container>
      {!loading ? (
        videos?.map((video) => (
          <VideoHorizontal
            video={video}
            key={video?.id?.videoId}
            SearchScreen
          />
        ))
      ) : (
        <SkeletonTheme color="#343a40" highlightColor="#3c4147">
          <Skeleton width="100%" height="160px" count={20} />
        </SkeletonTheme>
      )}
    </Container>
  );
};

export default SearchScreen;

import React, { useEffect } from 'react'
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import VideoHorizontal from '../../components/videoHorizontal/VideoHorizontal';
import { getSubscribedChannels } from '../../redux/actions/video.action';
import './subscriptionScreen.scss';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { useParams } from 'react-router-dom';

const SubscriptionScreen = () => {

  const {id} = useParams();
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getSubscribedChannels(id));
  }, [dispatch,id]);

  const {videos, loading} = useSelector(state=>state.subscriptionChannel);

  return (
    <Container fluid>
      {!loading ?  videos?.map((video)=>(
        <VideoHorizontal video={video} key={video?.id} subScreen />
      )) :(
        <SkeletonTheme color="#343a40" highlightColor="#3c4147">
          <Skeleton width="100%" height="160px" count={20} />
        </SkeletonTheme>
      )
      }
    </Container>
  )
}

export default SubscriptionScreen

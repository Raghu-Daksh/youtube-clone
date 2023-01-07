import React, { useEffect } from 'react'
import {
  MdSubscriptions,
  MdExitToApp,
  MdThumbUp,
  MdHistory,
  MdLibraryBooks,
  MdHome,
  MdSentimentDissatisfied,
} from 'react-icons/md'
import './sidebar.scss'
import {useDispatch, useSelector} from 'react-redux'
import { logOut } from '../../redux/actions/authAction'
import { Link } from 'react-router-dom'
import { getSubscribedChannels } from '../../redux/actions/video.action'

const Sidebar = ({sidebar,handlerToggleButton}) => {

  const dispatch = useDispatch();
  const logOutHandler = ()=>{
      dispatch(logOut());
  }

  // useEffect(()=>{
  //   dispatch(getSubscribedChannels())
  // },[dispatch])

  const {videos} = useSelector(state=>state.subscriptionChannel);


  return (
    <nav className={sidebar ? 'sidebar open' : 'sidebar'}
      onClick= {()=>handlerToggleButton(false)}
    >  
      <Link to='/'>
          <li>
            <MdHome size={23} />
            <span>Home</span>
          </li>
      </Link>
        <Link to='/feed/subscriptions/'>
          <li>
            <MdSubscriptions size={23} />
            <span>Subscription</span>
          </li>
        </Link>
        <li>
          <MdThumbUp size={23} />
          <span>Liked videos</span>
        </li>
        <li>
          <MdHistory size={23} />
          <span>History</span>
        </li>   
        <li>
          <MdLibraryBooks size={23} />
          <span>Library</span>
        </li>   
        <li>
          <MdSentimentDissatisfied size={23} />
          <span>I dont know</span>
        </li>   
        <hr/>
        <li onClick={logOutHandler}>
          <MdExitToApp size={23} />
          <span>Log Out</span>
        </li>  
        <hr/> 

    </nav>
  )
}

export default Sidebar

import { createStore, applyMiddleware, combineReducers } from "redux";
import { authReducer } from "./reducers/auth.reducer";
import { composeWithDevTools } from "redux-devtools-extension";


import thunk from "redux-thunk";
import { homeVideoReducer, searchedVideosReducer, selectedVideoReducer,subscriptionsChannelReducer,channelVideosReducer  } from "./reducers/videos.reducer";
import { channelDetailsReducer } from "./reducers/channel.reducer";
import { commentListReducer } from "./reducers/comments.reducer";
import { relatedVideoReducer } from "./reducers/videos.reducer";



const rootReducer = combineReducers({
  auth: authReducer,
  homeVideos: homeVideoReducer,
  selectedVideo : selectedVideoReducer,
  channelDetails: channelDetailsReducer,
  commentList: commentListReducer,
  relatedVideos: relatedVideoReducer,
  searchedVideos : searchedVideosReducer,
  subscriptionChannel:subscriptionsChannelReducer,
  channelVideos: channelVideosReducer
});

const store = createStore(
 rootReducer,
  {},
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;


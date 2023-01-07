import "./App.css";
import Header from "./components/header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import HomeScreen from "./screens/homeScreen/HomeScreen";
import { Container } from "react-bootstrap";
import './_app.scss'
import { useEffect, useState } from "react";
import LoginScreen from "./screens/loginScreen/LoginScreen";
import { BrowserRouter, Route, Routes, Redirect, useNavigate } from "react-router-dom";  
import { useSelector } from "react-redux";
import WatchScreen from "./screens/WatchScreen/WatchScreen";
import SearchScreen from "./screens/searchScreen/SearchScreen";
import SubscriptionScreen from "./screens/subscriptionScreen/SubscriptionScreen";
import ChannelScreen from "./screens/channelScreen/ChannelScreen";
  

const Layout = ({children})=>{
  const [sidebar, setSidebar] = useState(false);

  const handlerToggleButton = () => {
    setSidebar(value => !value);
  }

  return (
   <>
      <Header handlerToggleButton ={handlerToggleButton} />
      <div className="app_container ">
        <Sidebar sidebar = {sidebar} handlerToggleButton ={handlerToggleButton} />
        <Container fluid className="app__main ">
          {children}
        </Container>
      </div>
   </>
  );
} 

const App =()=> {
  const navigate = useNavigate();
  const {accessToken, loading} = useSelector(state=>state.auth);

  useEffect(()=>{
      if(!loading && !accessToken){
        navigate('/auth');
      }

  },[accessToken,loading])  

  return (
   <div className="app">
    <Routes>
       <Route exact path="/" element={<Layout> <HomeScreen /> </Layout>} />
       <Route exact path="/watch/:id" element={<Layout> <WatchScreen /> </Layout>} />
       <Route path="/auth" element={ <LoginScreen />  } />
       <Route path="/search/:query" element={<Layout><SearchScreen/></Layout>} />
       <Route path="/channel/:channelId" element={<Layout><ChannelScreen /></Layout>} />
       <Route path="/feed/subscriptions/" element={<Layout><SubscriptionScreen/></Layout>} />
       <Route exact path="/*" element={<Layout><h1>page not found</h1> </Layout>} />\
    </Routes> 
   </div>  
  )
}

  export default App;
   
 


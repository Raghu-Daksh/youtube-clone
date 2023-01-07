import React from "react";
import "./loginScreen.scss";
import { AiOutlineGoogle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/actions/authAction";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const LoginScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accesstoken = useSelector((state) => state.auth.accessToken);

  const loginHandler = () => {
    dispatch(login());
  };

  useEffect(() => {
    if (accesstoken) {
      console.log("access done");
      navigate("/");
    }
  }, [accesstoken, dispatch]);

  return (
    // <div class="g-signin2" data-onsuccess="onSignIn">
      <div className="login">
        <div className="login__container">
          <img
            src="http://pngimg.com/uploads/youtube/youtube_PNG2.png"
            alt=""
          />
          <button onClick={loginHandler}>
            <AiOutlineGoogle /> Login with Google
          </button>
          <p>yout tube clone</p>
        </div>
      </div>
    // </div>
  );
};

export default LoginScreen;

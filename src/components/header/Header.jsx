import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { MdNotifications, MdApps } from "react-icons/md";
import { FaBars } from "react-icons/fa";
import "./header.scss";
import { Link, useNavigate } from "react-router-dom";
import logo from '../../assets/logo.png'
import { useSelector } from "react-redux";

const Header = ({ handlerToggleButton }) => {
  
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search/${input}`);
    // setInput()
  };

  const {user} = useSelector(state=>state.auth)
  // console.log(input);
  return (
    <div className="header flex">
      <FaBars
        fontSize={26}
        className="header__menu"
        onClick={() => handlerToggleButton()}
      />
      <Link to="/">
        <img
          src="http://pngimg.com/uploads/youtube/youtube_PNG2.png"
          alt=""
          className="header__logo"
        />
      </Link>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="search"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">
          <AiOutlineSearch size={22} />
        </button>
      </form>

      <div className="header__icons">
        <MdNotifications size={22} />
        <MdApps size={22} />
        <img
          src={user?.photoUrl}
          alt={user?.name}
        />
      </div>
    </div>
  );
};

export default Header;

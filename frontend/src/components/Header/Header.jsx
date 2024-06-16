import React from "react";
import { useState } from "react";
import PinterestIcon from "@mui/icons-material/Pinterest";
import {
  Face,
  KeyboardArrowDown,
  Notifications,
  Search,
  Textsms,
} from "@mui/icons-material";
import styled from "@emotion/styled";
import { IconButton } from "@mui/material";
import { NavLink } from "react-router-dom";
import "../../index.css";

const Header = () => {
  const [input, setInput] = useState("");

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(input);
    // Add your logic for form submission here
  };
  const Wrapper = styled.div`
    display: flex;
    align-items: center;
    height: 56px;
    padding: 12px 4px 4px 16px;
    background-color: #fff;
    color: #000;
  `;

  const LogoWrapper = styled.div`
    .MuiSvgIcon-root {
      color: #e60023;
      font-size: 32px;
      cursor: pointer;
    }
  `;

  const SearchWrapper = styled.div`
    flex: 1;
  `;
  const SearchBarWrapper = styled.div`
    background-color: #efefef;
    display: flex;
    height: 48px;
    width: 100%;
    border-radius: 50px;
    border: none;
    padding-left: 10px;
    margin-left: 10px;

    form {
      display: flex;
      flex: 1;
    }
    form > input {
      background-color: transparent;
      border: none;
      width: 100%;
      margin-left: 5px;
      font-size: 16px;
    }
    form > button {
      display: none;
    }
    input:focus {
      outline: none;
    }
    input:active {
      outline: none;
    }
  `;
  const IconsWrapper = styled.div`
    margin-left: 25px;
  `;

  return (
    <Wrapper>
      <LogoWrapper>
        <PinterestIcon />
      </LogoWrapper>
      <NavLink
        to="/"
        className={({ isActive }) =>
          `${isActive ? "activeButton" : "unactiveButton"}`
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/explore"
        className={({ isActive }) =>
          `${isActive ? "activeButton" : "unactiveButton"}`
        }
      >
        Explore
      </NavLink>
      <NavLink
        to="/create"
        className={({ isActive }) =>
          `${isActive ? "activeButton" : "unactiveButton"}`
        }
      >
        Create
      </NavLink>
      <SearchWrapper>
        <SearchBarWrapper>
          <IconButton>
            <Search />
          </IconButton>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={input}
              onChange={handleInputChange}
              autoFocus
            />
            <button type="submit"></button>
          </form>
        </SearchBarWrapper>
      </SearchWrapper>
      <IconsWrapper>
        <IconButton>
          <Notifications />
        </IconButton>
        <IconButton>
          <Textsms />
        </IconButton>
        <IconButton>
          <Face />
        </IconButton>
        <IconButton>
          <KeyboardArrowDown />
        </IconButton>
      </IconsWrapper>
    </Wrapper>
  );
};

export default Header;

import React from "react";
import PinterestIcon from "@mui/icons-material/Pinterest";
import styled from "@emotion/styled";
import { IconButton } from "@mui/material";
import { NavLink } from "react-router-dom";
import "../../index.css";
const Header = () => {
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
        to="/following"
        className={({ isActive }) =>
          `${isActive ? "activeButton" : "unactiveButton"}`
        }
      >
        Following
      </NavLink>
    </Wrapper>
  );
};

export default Header;

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

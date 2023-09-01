import React from "react";
import styled from "styled-components";

const NavBar = styled.ul`
  display: flex;
  margin: 0;
  padding: 0;
  overflow: hidden;
  list-style-type: none;
  background-color: #5072a7;
`;
const NavItem = styled.li`
  cursor: pointer;
  color: black;
  font-weight: 600;
  margin: 20px;

  &:hover {
    color: white;
  }
`;
const NavLogo = styled.img``;

const Navigation = () => {
  return (
    <NavBar>
      <NavLogo></NavLogo>
      <NavItem>WOMEN</NavItem>
      <NavItem>MEN</NavItem>
      <NavItem>SALE</NavItem>
    </NavBar>
  );
};

export default Navigation;

import React from "react";
import styled from "styled-components";

const FooterContainer = styled.div`
  height: 20rem;
  background-color: #5072a7;
`;
const FooterLogo = styled.img``;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterLogo />
    </FooterContainer>
  );
};

export default Footer;

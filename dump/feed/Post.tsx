import React from "react";
import { Link, Router, RouterProps } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import bubble from "../../assets/bubble.png";
import heart from "../../assets/heart.png";
import share from "../../assets/share.png";
import shop from "../../assets/shop.png";

const PostDiv = styled.div`
  background-color: white;
  border: 1px solid lightgray;
  margin-bottom: 45px;
`;

const PostImage = styled.img`
  width: 100%;
  object-fit: contain;
  border-top: 1px solid lightgray;
  border-bottom: 1px solid lightgray;
`;

const SymbolsRow = styled.div`
  white-space: nowrap;
`;

const PostSymbol = styled.img`
  display: inline;
  height: 30px;
  width: 30px;

  &:hover {
    opacity: .5;
  }
`;

const PostText = styled.h4`
  font-weight: normal;
  padding: 15px 20px;
`;

const PostHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 15px 20px;
  
  &:hover {
    opacity: .5;
  }
`;

const Post = ({ brand, likes, caption, numOfReviews, imageUrl }: any) => {
  return (
    <PostDiv>
      <PostHeader>
        <Link to="/"><strong>{brand}</strong></Link>
      </PostHeader>
      <SymbolsRow>
        <PostImage src={imageUrl} alt="" />
        <PostSymbol src={heart} />
        <PostSymbol src={bubble} />
        <PostSymbol src={share} />
        <PostSymbol src={shop} />
      </SymbolsRow>
      <PostText>
        {likes} likes
        <br />
        <strong>{brand}</strong> {caption}
        <br />
        View all {numOfReviews} reviews
      </PostText>
    </PostDiv>
  );
};

export default Post;

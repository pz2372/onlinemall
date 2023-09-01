import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import Post from "./Post";
import donuts from "./Donuts.jpg";

const Timeline = styled.div`
margin: 0 auto;
max-width: 500px;
padding: 20px;
`

const Feed = () => {
  const [posts, setPosts] = useState([
    {
      brand: "Nike",
      caption: "Hello There",
      likes: 20,
      numOfReviews: 14,
      image: "https://sugargeekshow.com/wp-content/uploads/2020/10/baked_donut_recipe_featured.jpg",
    },
    {
      brand: "Addidas",
      caption: "Ni hao",
      likes: 10,
      numOfReviews: 23,
      image: donuts,
    },
  ]);
  

  return (
    <Timeline>
      {posts.map((post: any) => {
        return (<Post
          brand={post.brand}
          caption={post.caption}
          likes={post.likes}
          numOfReviews={post.numOfReviews}
          imageUrl={post.image}
        />);
      })}
    </Timeline>
  );
};

export default Feed;

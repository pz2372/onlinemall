import styled from "styled-components";
import HomeHeader from "./HomeHeader";
import ProductCard from "../../components/carousel/ProductCard";
import Carousel from "../../components/carousel/Carousel";

const HomeContainer = styled.div`
  max-width: 1500px;
  margin: auto;
`;
const CardsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 20px 20px 20px;
`;

const Home = () => {
  return (
    <HomeContainer>
      <HomeHeader></HomeHeader>
      <CardsContainer>
        <ProductCard title={"Men's Hoodies"} />
        <ProductCard title={"Dresses"} />
        <ProductCard title={"Men's Hoodies"} />
        <ProductCard title={"Shorts"} />
      </CardsContainer>
      <Carousel title={"Trending Products"}></Carousel>
      <Carousel title={"Swimsuits"}></Carousel>
      <Carousel title={"Hot T-Shirts"}></Carousel>
    </HomeContainer>
  );
};

export default Home;

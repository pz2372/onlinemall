import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import { menCategories, womenCategories } from "../assets/Categories";

const CategoriesContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const Category = styled.div`
  margin: 20px;
`;

const CategorySelector = (props: any) => {
  const [selectedId, setSelectedId] = useState<any>(null);

  const menCategory: any = menCategories.map((label) => {
    return (
      <li key={label}>
        <input
          type="checkbox"
          checked={selectedId === label}
          onChange={() => handleClick(label)}
        />
        {label}
      </li>
    );
  });

  const womenCategory: any = womenCategories.map((label) => {
    return (
      <li key={label}>
        <input
          type="checkbox"
          checked={selectedId === label}
          onChange={() => handleClick(label)}
        />
        {label}
      </li>
    );
  });

  const handleClick = (id: any) => {
    setSelectedId(id);
    props.onChange(id)
  };
  
  return (
    <CategoriesContainer>
      <Category>
        <h2>Men</h2>
        <ul>{menCategory}</ul>
      </Category>
      <Category>
        <h2>Women</h2>
        <ul>{womenCategory}</ul>
      </Category>
    </CategoriesContainer>
  );
};

export default CategorySelector;

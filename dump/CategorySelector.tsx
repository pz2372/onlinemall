import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import { categories } from "../client/src/assets/Categories";

const CategoriesContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const Category = styled.div`
  margin: 20px;
`;

const CategorySelector = (props: any) => {
  const [selectedId, setSelectedId] = useState<any>(null);

  const category: any = categories.map((label) => {
    return (
      <li key={label.path}>
        <input
          type="checkbox"
          checked={selectedId === label}
          onChange={() => handleClick(label)}
        />
        {label.path}
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
        <ul>{category}</ul>
      </Category>
      <Category>
        <h2>Women</h2>
        <ul>{category}</ul>
      </Category>
    </CategoriesContainer>
  );
};

export default CategorySelector;

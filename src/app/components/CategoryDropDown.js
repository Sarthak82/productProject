import React from 'react';
import "./CategoryDropDown.css"

const CategoryDropdown = ({ categories, onSelect }) => {
  return (
    <div className="dropdown">
      <select onChange={(e) => onSelect(e.target.value)} defaultValue="">
        <option value="" disabled>
          Select a category
        </option>
        {categories.map((category, index) => (
          <option key={index} value={category.name}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoryDropdown;


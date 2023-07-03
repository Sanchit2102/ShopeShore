import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import categoryData from "../Utils/categoryImage"; // Import the categoryData

const CategorySection = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  // Get all categories
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/category/get-all-category"
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  const onClick = (e) => {
    const categoryId = e.currentTarget.getAttribute("data-category");
    const categoryName = e.currentTarget.getAttribute("data-categoryname");
    navigate(`/category/${categoryName}/${categoryId}`);
    console.log(categoryName);
  };

  console.log(categories);
  return (
    <div className="category-section">
      {categories.map((c) => {
        const category = categoryData[c.name];
        if (!category) {
          console.log(`No image found for category: ${c.name}`);
          return null;
        }
        return (
          <div
            key={c._id}
            className="category-box"
            onClick={onClick}
            data-category={c._id}
            data-categoryname={c.name}
          >
            <div className="category-circle">
              <img src={category.image} alt="" />{" "}
              {/* Use the dynamic image src */}
            </div>
            <div className="category-text text-center">{c.name}</div>
          </div>
        );
      })}
    </div>
  );
};

export default CategorySection;

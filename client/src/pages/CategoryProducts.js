import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { subCategories } from "../components/Utils/subCategory";
import { prices } from "../components/Utils/prices";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import Spinner1 from "../components/Spinner1"

const CategoryProducts = () => {
  const [products, setProducts] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);
  const { categoryId, category } = useParams();
  const [selectedPriceRange, setSelectedPriceRange] = useState(
    prices[category]?.max || 1000
  );
const [loading,setLoading] =useState();

  // Get all products
  const getAllProducts = async () => {
      setLoading(true)
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/productByCategory/${categoryId}`
      );
      setProducts(data?.products);
      setLoading(false)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  useEffect(() => {
    // Set subcategories based on the category
    setSubcategories(subCategories[category] || []);
  }, [category]);

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedSubcategories((prevSelectedSubcategories) => [
        ...prevSelectedSubcategories,
        value,
      ]);
    } else {
      setSelectedSubcategories((prevSelectedSubcategories) =>
        prevSelectedSubcategories.filter((subcat) => subcat !== value)
      );
    }
  };

  const handlePriceRangeChange = (event) => {
    const { value } = event.target;
    setSelectedPriceRange(parseInt(value));
  };

  const handlePriceInputChange = (event) => {
    const { value } = event.target;
    setSelectedPriceRange(parseInt(value));
  };

  // Filter the products based on selected subcategories and price range
  const filteredProducts =
    selectedSubcategories.length === 0 && selectedPriceRange === 0
      ? products // Map all products if no checkboxes are selected and price range is zero
      : products.filter((product) => {
          const { name, description, price } = product;
          const productText = `${name} ${description}`;
          const isSubcategorySelected =
            selectedSubcategories.length === 0 ||
            selectedSubcategories.some((subcat) =>
              productText.includes(subcat)
            );
          const isPriceInRange = price >= 0 && price <= selectedPriceRange;
          return isSubcategorySelected && isPriceInRange;
        });

  console.log(filteredProducts);
  return (
    <Layout title={category}>
      <div className="main-container mx-3 my-3">
        <div>
          <button
            className="btn btn-outline-secondary"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#staticBackdrop"
            aria-controls="staticBackdrop"
          >
            Filters <FilterAltIcon />
          </button>
          <div
            className="offcanvas offcanvas-start"
            data-bs-backdrop="static"
            tabIndex={-1}
            id="staticBackdrop"
            aria-labelledby="staticBackdropLabel"
          >
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="staticBackdropLabel">
                Filters
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              />
            </div>
            <div className="offcanvas-body">
              <div className="subCategory">
                <h6>Subcategories</h6>
                {subcategories.map((subcategory) => (
                  <div key={subcategory} style={{ paddingBottom: "6px" }}>
                    <input
                      type="checkbox"
                      id={subcategory}
                      name={subcategory}
                      className="mx-2"
                      value={subcategory}
                      onChange={handleCheckboxChange}
                    />
                    <label htmlFor={subcategory}>{subcategory}</label>
                  </div>
                ))}
              </div>
              <div className="price mt-5">
                <div className="d-flex flex-column">
                  <h6>Price Range</h6>
                  <label htmlFor="price">0 to {selectedPriceRange} Rs</label>
                  <input
                    type="range"
                    id="price"
                    name="price"
                    min={prices[category]?.min || 0}
                    max={prices[category]?.max || 1000}
                    value={selectedPriceRange}
                    onChange={handlePriceRangeChange}
                  />
                  <input
                    type="number"
                    id="priceInput"
                    name="priceInput"
                    min={prices[category]?.min || 0}
                    max={prices[category]?.max || 1000}
                    value={selectedPriceRange}
                    onChange={handlePriceInputChange}
                    style={{ marginTop: "0.5rem", width: "50%" }}
                    className="price-input"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="d-flex flex-wrap m-2 justify-content-center">
         {loading ? (
          <Spinner1/>
         ):(
         <>
            {filteredProducts.length > 0 ? (
            filteredProducts.map((p) => (
              <Link
                key={p._id}
                to={`/${category}/product/${p.slug}`}
                style={{ textDecoration: "none" }}
              >
                <div
                  className="card"
                  style={{
                    width: "15rem",
                    border: "none",
                    margin: "10px",
                    
                  }}
                >
                  <img
                    src={`http://localhost:8080/api/v1/product/get-photo/${p._id}`}
                    className="card-img-top p-2"
                    alt={p.name}
                    style={{
                      aspectRatio: "4/4",
                      backgroundColor: "rgba(249, 238, 238, 0.734)",
                    }}
                  />
                  <div className="card-body p-2 fw-bold">
                    <p className="card-title mt-1 ">{p.name}</p>
                    <p>{`₹${p.price} `}</p>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <h1
              className="text-center w-100"
              style={{ fontSize: "32px", color: "grey" }}
            >
              No products to display
            </h1>
          )}
          </>)
         }
          
        </div>
      </div>
    </Layout>
  );
};

export default CategoryProducts;

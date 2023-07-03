import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import axios from "axios";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState();
  const [categories, setCategories] = useState([]);

  // Get products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/product/get-products"
      );
      setProducts(data.products);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(products);
  useEffect(() => {
    getAllProducts();
  }, []);

  // Get all categories
  const getAllCategory = async () => {
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
    getAllCategory();
  }, []);

  // Filter products based on selected category
  const filteredProducts = category
    ? products.filter((p) => p.category._id === category)
    : products;

  return (
    <>
      <Layout title={"Product List"}>
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <AdminMenu />
            </div>
            <div className="col-md-9 justify-content-center">
              <select
                placeholder="Select a Category"
                className="mb-3 form-select form-select-sm"
                aria-label=".form-select-sm example"
                style={{ height: "30px", border: "none", width: "35%" }}
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
              >
                <option>Select a Category</option>
                {categories?.map((c) => (
                  <option key={c._id} value={c._id} label={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
              {filteredProducts.length === 0 ? (
                <p
                  className="text-secondary text-center mt-5"
                  style={{ fontSize: "32px" }}
                >
                  No products to display.
                </p>
              ) : (
                <div className="d-flex flex-wrap justify-content-center">
                  {filteredProducts?.map((p) => (
                    <Link
                      key={p._id}
                      to={`/dashboard/admin/product/${p.slug}`}
                      style={{ textDecoration: "none" }}
                    >
                      <div
                        className="card m-2"
                        style={{ width: "12rem", border: "none" }}
                      >
                        <img
                          src={`http://localhost:8080/api/v1/product/get-photo/${p._id}`}
                          className="card-img-top p-2"
                          alt={p.name}
                          style={{ aspectRatio: "4/4" }}
                        />
                        <div className="card-body p-1">
                          <h6 className="card-title mt-1">{p.name}</h6>
                          <p>{`₹${p.price}`}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Products;

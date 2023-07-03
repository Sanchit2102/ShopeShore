import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import Carasoul from "../components/Layout/Carasoul";
import CategorySection from "../components/Layout/CategorySection";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [products, setProducts] = useState([]);

  const sideScroll = (element, direction, speed, distance, step) => {
    let scrollAmount = 0;
    const slideTimer = setInterval(function () {
      if (direction === "left") {
        element.scrollLeft -= step;
      } else {
        element.scrollLeft += step;
      }
      scrollAmount += step;
      if (scrollAmount >= distance) {
        clearInterval(slideTimer);
        setScrollPosition(element.scrollLeft);
      }
    }, speed);
  };

  const rightClick = () => {
    const container = document.getElementById("box");
    sideScroll(container, "right", 25, 100, 10);
  };

  const leftClick = () => {
    const container = document.getElementById("box");
    sideScroll(container, "left", 25, 100, 10);
  };

  // Get all products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/product/get-products"
      );
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(products);
  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <>
      <Layout title={"ShopShore Home"}>
      <div className="home">
      <Carasoul />
        <CategorySection />
        <div className="promo-1">
  {products
    .filter((p) => p.category.name.includes("Mobiles"))
    .slice(0, 3) // Add the slice method to limit the number of products to three
    .map((p) => {
      return (
        <Link to={`/${p.category}/product/${p.slug}`} className="product-box">
          <div className="product-img">
            <img
              src={`http://localhost:8080/api/v1/product/get-photo/${p._id}`}
              className="card-img-top"
              alt={p.name}
            />
          </div>
          <div className="text">
            {p.name}
            <p className="mt-4 w-100 price">₹{p.price}</p>
          </div>
        </Link>
      );
    })}
</div>
        <div className="promo-2">
          <div className="promo2-div" id="box">
            {products
              .filter((p) => p.description.includes("Mens FootWear"))
              .map((p) => (
                <Link to={`/${p.category}/product/${p.slug}`}>
                  <div className="product-box" key={p._id}>
                    <div className="product-img">
                      <img
                        src={`http://localhost:8080/api/v1/product/get-photo/${p._id}`}
                        alt={p.title}
                        style={{ aspectRatio: "4/4" }}
                      />
                    </div>
                  </div>
                </Link>
              ))}
          </div>

          <i
            className="fa-solid fa-angle-left left"
            id="left"
            onClick={leftClick}
          ></i>

          <i
            className="fa-solid fa-angle-right right"
            id="right"
            onClick={rightClick}
          ></i>
        </div>

        <div className="promo-3">
        {products.filter((p) => p.description.includes("Women")).map((p)=>
          {
            return (
              <Link
                to={`/${p.category}/product/${p.slug}`}
                className="product-box"
              >
                <div className="product-img">
                  <img
                    src={`http://localhost:8080/api/v1/product/get-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                    
                  />
                </div>
                <div className="text">
                  {p.name}
                  <p className="mt-4 w-100 price">₹{p.price}</p>
                </div>
              </Link>
            );
          })
          }
        
        </div>

      </div>
       
      </Layout>
    </>
  );
};

export default Home;

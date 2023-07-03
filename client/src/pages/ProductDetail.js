import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { toast } from "react-hot-toast";

const ProductDetails = () => {
  const params = useParams();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState({});
  const [cart, setCart] = useCart();
  const navigate = useNavigate();
  const [auth] =useAuth();

  const [scrollPosition, setScrollPosition] = useState(0);

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
    sideScroll(container, "right", 25, 200, 10);
  };

  const leftClick = () => {
    const container = document.getElementById("box");
    sideScroll(container, "left", 25, 200, 10);
  };

  // Get product
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/get-product/${params.slug}`
      );
      await setProduct(data?.product);
      relatedProduct(data?.product?._id, data?.product?.category._id,data?.product);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  //related products
  const relatedProduct = async (pid, cid,product) => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/related/${pid}/${cid}`
      );

      const relatedProducts = await data?.products;
      const newProducts = relatedProducts.filter((p) => {
        const firstWord = product?.name.split(" ")[0];
        const productName = p.name;
        return productName.includes(firstWord);
      });
      
      if (newProducts.length === 0){
        setRelated(relatedProducts)
      }else{
        setRelated(newProducts);
      }
     
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title={`${product?.category.name}-${product?.name}`}>
      <div className="container mt-5">
        <div className="row">
          {product && (
            <>
              <div className="col-md-4" key={product._id}>
                <img
                  src={`http://localhost:8080/api/v1/product/get-photo/${product?._id}`}
                  className="card-img-top"
                  alt={product.name}
                  style={{ height: "360px", aspectRatio: "4/8" }}
                />
              </div>
              <div className="col-md-8">
                <h6 className="text-secondary ">{product?.category?.name}</h6>
                <h5 className="mt-4 mb-4">{product?.name}</h5>
                <p className=" mb-3 text-secondary">{product?.description}</p>
                <h5>₹{product?.price} </h5>
                {auth?.token ? ( <button
                  className="btn btn-outline-dark ms-1 mt-2 w-25"
                  style={{ fontSize: "14px" }}
                  onClick={() => {
                    setCart([...cart, product]);
                    localStorage.setItem(
                      "cart",
                      JSON.stringify([...cart, product])
                    );
                    toast.success("Product is added to cart")
                  }}
                >
                  Add to cart
                </button>):( <button
                  className="btn btn-outline-dark ms-1 mt-2"
                  style={{ fontSize: "14px" }}
                  onClick={() => {
                   navigate('/login')
                  }}
                >
                  Please Login to Add Product 
                </button>)}
               
              </div>
            </>
          )}
        </div>
      </div>

      <h5 style={{ marginTop: "50px", marginLeft: "20px" }}>
        Similar Products
      </h5>
      <hr />
      <div className="related-products">
        <div className="related-products-div" id="box">
          {related && related.length > 0 ? (
            related.map((p) => (
              <Link
                key={p._id}
                to={`/${params.category}/product/${p.slug}`}
                style={{ textDecoration: "none" }}
              >
                <div className="product-box" key={p._id}>
                  <img
                    src={`http://localhost:8080/api/v1/product/get-photo/${p._id}`}
                    alt={p.name}
                    style={{ aspectRatio: "4/5" }}
                  />
                  <div className="p-1 text-box">
                    <p className="mt-1 text-dark">{p.name}</p>
                    <p className="mt-1 text-dark">{` ₹${p.price}`}</p>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p
              className="text-center pt-5"
              style={{ color: "grey", fontSize: "20px" }}
            >
              No products to display
            </p>
          )}

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
      </div>
    </Layout>
  );
};

export default ProductDetails;

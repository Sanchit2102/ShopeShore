import React from "react";
import Layout from "../../components/Layout/Layout";

const About = () => {
  return (
    <>
      <Layout title={"About Us"}>
        <div className="row">
          <div className="col-md-6 p-1" style={{ marginLeft: "50px" }}>
            <img
              src="https://img.freepik.com/free-vector/about-us-concept-illustration_114360-669.jpg?size=626&ext=jpg&ga=GA1.1.317187825.1681374305&semt=ais"
              alt="about us"
              style={{ width: "100%", aspectRatio: "4/2.5" }}
              className="mt-1"
            />
          </div>
          <div
            className="col-md-4 d-flex justify-content-center mt-2"
            style={{
              flexDirection: "column",
              padding: "20px",
              marginLeft: "50px",
            }}
          >
            <p>
              <h6>ShopShore</h6> is a leading ecommerce website with a wide
              range of high-quality products.At ShopShore, we are committed to
              delivering a seamless online shopping experience. With a vast
              catalog of products from trusted brands, we offer convenience and
              quality. We prioritize customer satisfaction, offering a seamless
              shopping experience with quick processing and reliable delivery.
              Join us for convenient and delightful online shopping.
            </p>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default About;

import React from "react";
import Footer from "./Footer";
import { Helmet } from "react-helmet";
import Navbar from "./Navbar";
import { Toaster } from "react-hot-toast";

const Layout = ({ children, title, description, keywords, author }) => {
  return (
    <>
      <div>
        <Helmet>
          <meta charSet="utf-8" />
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta name="keywords" content={keywords} />
          <meta name="author" content={author} />
        </Helmet>
        <Navbar />
        <Toaster />
        <main style={{ minHeight: "70vh" }}>{children}</main>
        <Footer />
      </div>
    </>
  );
};

Layout.defaultProps = {
  title: "Ecomm app-shop now",
  description: "Ecommerce webiste",
  keywords: "mern,react,node,mongodb",
  author: "Primex",
};

export default Layout;

import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import axios from "axios";

import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";

const UpdateProduct = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [categories, setCategories] = useState([]);
  const [photo, setPhoto] = useState();
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [price, setPrice] = useState();
  const [quantity, setQuantity] = useState();
  const [shipping, setShipping] = useState();
  const [category, setCategory] = useState();
  const [id, setId] = useState("");

  //get single Product
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/get-product/${params.slug}`
      );
      setName(data?.product.name);
      setDescription(data?.product.description);
      setPrice(data?.product.price);
      setQuantity(data?.product.quantity);
      setShipping(data?.product.shipping);
      setCategory(data?.product.category._id);
      setId(data?.product._id);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProduct();
    //eslint-disable-next-line
  }, []);

  //get all category
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

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      photo && productData.append("photo", photo);
      productData.append("category", category);
      productData.append("shipping", shipping);
      const { data } = await axios.put(
        `http://localhost:8080/api/v1/product/update-product/${id}`,
        productData
      );

      if (data?.success) {
        toast.success("Product Update Successfully");
        navigate("/dashboard/admin/products");
      }
    } catch (error) {
      console.log(error);
    }
  };

  //Delete
  const handleDelete = async () => {
    try {
      let answer = window.confirm("Are you Sure Want to delete");
      if (!answer) return;
      const { data } = await axios.delete(
        `http://localhost:8080/api/v1/product/delete-product/${id}`
      );
      if (data?.success) {
        toast.success("Product Delete Successfully");
        navigate("/dashboard/admin/products");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Layout title={"Product"}>
        <div className="container-fluid mt-3">
          <div className="row">
            <div className="col-md-3">
              <AdminMenu />
            </div>
            <div className="col-md-9">
              <h1>Update Product</h1>
              <div className="m-1 w-75">
                <select
                  placeholder="Select a Category"
                  showSearch
                  className="mb-3 w-75"
                  onChange={(value) => {
                    setCategory(value);
                  }}
                  value={category}
                  optionLabelProp="label"
                >
                  {categories?.map((c) => (
                    <option key={c._id} value={c._id} label={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
                <div className="mb-3">
                  <label className="btn btn-outline-secondary col-md-12">
                    {photo ? photo.name : "Upload Photo"}
                    <input
                      type="file"
                      name="photo"
                      accept="image/*"
                      onChange={(e) => setPhoto(e.target.files[0])}
                      hidden
                    />
                  </label>
                </div>
                <div className="mb-3">
                  {photo ? (
                    <div className="text-center">
                      <img
                        src={URL.createObjectURL(photo)}
                        alt="product_photo"
                        height={"200px"}
                        className="img img-responsive"
                      />
                    </div>
                  ) : (
                    <div className="text-center">
                      <img
                        src={`http://localhost:8080/api/v1/product/get-photo/${id}`}
                        alt="product_photo"
                        height={"200px"}
                        className="img img-responsive"
                      />
                    </div>
                  )}
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    value={name}
                    placeholder="Write a name"
                    className="form-control"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <textarea
                    type="text"
                    value={description}
                    placeholder="Write a Description"
                    className="form-control"
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="Number"
                    value={price}
                    placeholder="Write a Price"
                    className="form-control"
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="Number"
                    value={quantity}
                    placeholder="Write a Quantity"
                    className="form-control"
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <select
                    placeholder="Select Shipping"
                    className="mb-3 w-100"
                    onChange={(e) => setShipping(e.target.value)}
                  >
                    <option value="0">No</option>
                    <option value="1">Yes</option>
                  </select>

                  <div className="mb-3">
                    <button className="btn btn-primary" onClick={handleUpdate}>
                      Update Product
                    </button>
                  </div>

                  <div className="mb-3">
                    <button className="btn btn-danger" onClick={handleDelete}>
                      Delete Product
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default UpdateProduct;

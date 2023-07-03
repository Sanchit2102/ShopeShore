import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const CreateProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [photo, setPhoto] = useState();
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [price, setPrice] = useState();
  const [quantity, setQuantity] = useState();
  const [shipping, setShipping] = useState();
  const [category, setCategory] = useState();

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

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("photo", photo);
      productData.append("category", category);

      productData.append("shipping", shipping);
      const { data } = await axios.post(
        "http://localhost:8080/api/v1/product/create-product",
        productData
      );

      if (data?.success) {
        toast.success("Product Created");
        navigate("/dashboard/admin/products");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Layout title={"Product"}>
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <AdminMenu />
            </div>
            <div className="col-md-9">
              <div className="m-1 w-75">
                <select
                  placeholder="Select a Category"
                  className="mb-3 w-75"
                  onChange={(event) => {
                    setCategory(event.target.value);
                  }}
                >
                  <option>Select a Category</option>
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
                      id="photo"
                      accept="image/*"
                      onChange={(e) => setPhoto(e.target.files[0])}
                      hidden
                    />
                  </label>
                </div>
                <div className="mb-3">
                  {photo && (
                    <>
                      <div className="text-center">
                        <img
                          src={URL.createObjectURL(photo)}
                          alt="product_photo"
                          height={"200px"}
                          className="img img-responsive"
                        />
                      </div>
                    </>
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
                    onChange={(event) => setShipping(event.target.value)} // Update this line
                  >
                    <option value="0">No</option>
                    <option value="1">Yes</option>
                  </select>

                  <div className="mb-3">
                    <button className="btn btn-primary" onClick={handleCreate}>
                      Create Product
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

export default CreateProduct;

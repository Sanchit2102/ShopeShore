import React, { useEffect, useRef, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";

import axios from "axios";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import CategoryForm from "../../components/Form/CategoryForm";
import { useAuth } from "../../context/auth";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]); 
  const [category, setCategory] = useState({ id: "", name: "" }); 
  const [name, setName] = useState(""); 
  const [auth] = useAuth(); 

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

  //Create category
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/category/create-category",
        { name },
        {
          headers: {
            "auth-token": auth?.token,
          },
        }
      );

      const data = response.data;
      if (data?.success) {
        getAllCategory();
      } else {
      }
    } catch (error) {
      console.log(error);
    }
    setName(" "); 
  };

  //Update  Category
  const updateCategory = (currentCategory) => {
    ref.current.click(); 
    setCategory({
      id: currentCategory._id,
      name: currentCategory.name,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `http://localhost:8080/api/v1/category/update-category/${category.id}`,
        { name: category.name },
        {
          headers: {
            "auth-token": auth?.token,
          },
        }
      );
      const data = await response.data;
      console.log(data);
      if (data?.success) {
        refClose.current.click(); //closing the modal
        getAllCategory();
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  };

  const ref = useRef();
  const refClose = useRef(null);

  const onChange = (e) => {
    setCategory({ ...category, [e.target.name]: e.target.value });
  };

  //Delete Category -
  const deleteCategory = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/v1/category/delete-category/${id}`,
        { name: category.name },
        {
          headers: {
            "auth-token": auth?.token,
          },
        }
      );
      const data = await response.data;
      if (data?.success) {
        getAllCategory();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Layout title={"Category"}>
        <button
          type="button"
          className="btn btn-primary d-none"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          ref={ref}
        ></button>
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  Edit Category
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <form className="my-3">
                  <div className="mb-3 item">
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      onChange={onChange}
                      value={category.name}
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  ref={refClose}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleUpdate}
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <AdminMenu />
            </div>
            <div className="col-md-9">
              <h1>Manage category</h1>
              <div className="p3 w-50">
                <CategoryForm
                  handleSubmit={handleSubmit}
                  value={name}
                  setValue={setName}
                  placeholder={"Create a Category"}
                />
              </div>
              <div className="w75">
                <table className="table text-center">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Name</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories?.map((c, index) => {
                      return (
                        <tr key={c._id}>
                          <td>{index + 1}</td>
                          <td>{c.name}</td>
                          <td>
                            <FiEdit onClick={() => updateCategory(c)} />
                            <MdDelete
                              style={{ fontSize: "20px", marginLeft: "20px" }}
                              onClick={() => deleteCategory(c._id)}
                            />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default CreateCategory;

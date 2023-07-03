import React from "react";

const CategoryForm = (props) => {
  const { handleSubmit, setValue, value, placeholder } = props;

  return (
    <form onSubmit={handleSubmit} className="mb-3 d-flex">
      <div className="mb-3" style={{ width: "80%", marginRight: "10px" }}>
        <input
          type="text"
          placeholder={placeholder}
          className="form-control"
          id="category"
          name="category"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          style={{ width: "100%" }}
        />
      </div>
      <button
        type="submit"
        className="btn btn-outline-dark mb-3"
        style={{ width: "10%" }}
      >
        +
      </button>
    </form>
  );
};

export default CategoryForm;

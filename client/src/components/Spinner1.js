import React from "react";

const Spinner = ({ path = "/login" }) => {
  return (
    <>
      <div className="d-flex flex-column mt-5" style={{ height: "100vh" }}>
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </>
  );
};

export default Spinner;

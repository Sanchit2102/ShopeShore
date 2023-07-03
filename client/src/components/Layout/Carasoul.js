import React from "react";

const Carasoul = () => {
  return (
    <>
      <div className="carousel" style={{ height: "340px" }}>
        <div id="carouselExample" className="carousel slide">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                src="/Style With Purpose.png"
                className="d-block w-100"
                alt="..."
                style={{ height: "340px" }}
              />
            </div>
            <div className="carousel-item">
              <img
                src="Newfashion.png"
                className="d-block w-100"
                alt="..."
                style={{ height: "340px" }}
              />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExample"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true" />
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExample"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true" />
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Carasoul;

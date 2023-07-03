import Layout from '../components/Layout/Layout';
import React, { useEffect } from 'react'
import { useSearch } from '../context/search'
import { Link } from 'react-router-dom';



const Search = () => {
   const [values,setValues] = useSearch();


  return (
    <>
    <Layout title='Search Result'>
<div className="container mt-4">
    <div className="text-center">
        <h1>Search Result</h1>
        <h6>{values?.results.length < 1 ? "No Products By this name": `${values?.results.length} Results Found`}</h6>
    </div>
</div>
   <div className="d-flex flex-wrap justify-content-evenly mb-3">
          {values?.results && values.results.length > 0 ? (
                values?.results.map((p) => (
                  <Link
                key={p._id}
                to={`/${p.category._id}/product/${p.slug}`}
                style={{ textDecoration: "none" }}
              >
                <div className="card" style={{ width: "15rem" ,border:"none",margin:"10px"}}>
                  <img
                    src={`http://localhost:8080/api/v1/product/get-photo/${p._id}`}
                    className="card-img-top p-2"
                    alt={p.name}
                    style={{ aspectRatio: "4/4" , backgroundColor: "rgba(249, 238, 238, 0.734)"}}
                  />
                  <div className="card-body p-2 fw-bold"> 
                  <p className="card-title mt-1 ">{p.name}</p>
                    <p>{`₹${p.price} `}</p>
                   
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
          </div>
    </Layout>

    </>
  )
}

export default Search
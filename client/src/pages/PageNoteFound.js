import React from 'react'
import Layout from '../components/Layout/Layout'
import { Link } from 'react-router-dom'

const PageNoteFound = () => {
  return (
    <>
        <Layout title={"Page Not Found -Go back"}>
     <div className="container">
  <div className="row">
    <div className="col-12 d-flex justify-content-center min-vh-100">
      <div className="d-flex flex-column justify-content-center align-items-center">
        <h1 className="main-heading" style={{fontSize:"72px"}}>404</h1>
        <p style={{fontSize:"24px"}}>Oops! Page Not Found</p>
        <div className="text-center mt-4 mb-5">
          <Link className="btn btn-outline-dark px-3 mr-2" to="/">
            Go Back
          </Link>
        </div>
      </div>
    </div>
  </div>
</div>

        </Layout>
    </>
  )
}

export default PageNoteFound
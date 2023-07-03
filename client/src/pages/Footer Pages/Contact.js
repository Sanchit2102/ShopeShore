import React from "react";
import Layout from "../../components/Layout/Layout";
import { AiOutlineMail } from "react-icons/ai";
import { SlEarphonesAlt } from "react-icons/sl";

const Contact = () => {
  return (
    <>
      <Layout title={"Contact Us"}>
        <div className="row contact mt-5 p-5 w-100">
          <div className="col-md-6">
            <img
              src="https://cdn.pixabay.com/photo/2015/07/17/22/43/student-849824_1280.jpg"
              alt=""
              style={{ width: "80%", aspectRatio: "4/3" }}
              className="mt-3"
            />
          </div>
          <div className="col-md-6 mt-2">
            <h1 className="bg-dark p-2 text-white text-center">CONTACT US</h1>
            <p className="text-center">
              any Query and info about product feel free to call anytime we 24x7
              avaiable
            </p>
            <p className="mt-3 text-center">
              <AiOutlineMail /> www.help@ShopShore.com
            </p>
            {/* <p className='mt-3 text-center'><BiPhoneCall/>  +91 9767171130</p> */}
            <p className="mt-3 text-center">
              <SlEarphonesAlt /> 1800-0000-0000(toll free)
            </p>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Contact;

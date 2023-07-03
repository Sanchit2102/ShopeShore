import React from "react";
import Layout from "../../components/Layout/Layout";

const Policies = () => {
  return (
    <>
      <Layout title={"Privacy Policy"}>
        <div className="row mt-3 mb-3" style={{ marginLeft: "30px" }}>
          <p className="mt-3">
            At ShopShore, we collect and store your personal information
            securely. This includes details such as name, contact information,
            and payment details. We ensure that your data is protected and only
            used for the purpose of order processing, delivery, and enhancing
            your shopping experience.
          </p>
          <p className="mt-3">
            Your personal information is used to process your orders, provide
            customer support, and personalize your shopping experience. We may
            also use your data to send you relevant offers, promotions, and
            updates with your consent.
          </p>
          <p className="mt-3">
            We employ industry-standard security measures to protect your
            personal information from unauthorized access, alteration, or
            disclosure. Our secure systems and encryption protocols ensure the
            confidentiality and integrity of your data.
          </p>
          <p className="mt-3">
            We may share your personal information with trusted third-party
            service providers for order fulfillment, payment processing, and
            delivery purposes. Rest assured, we only collaborate with reputable
            partners who maintain the same level of privacy and security
            standards.
          </p>
          <p className="mt-3">
            We utilize cookies and similar technologies to enhance your browsing
            experience on our website. These cookies may collect anonymous
            information about your preferences and actions, helping us analyze
            site traffic and improve our services.
          </p>
          <p>
            Please note that this is a brief summary of our Privacy Policy. For
            more detailed information, including your rights and choices
            regarding your personal data, please refer to our comprehensive
            Privacy Policy page. We value your privacy and are committed to
            safeguarding your personal information. If you have any concerns or
            queries regarding our privacy practices,{" "}
            <span className="fw-bold">
              please contact our customer support team.
            </span>
          </p>
        </div>
      </Layout>
    </>
  );
};

export default Policies;

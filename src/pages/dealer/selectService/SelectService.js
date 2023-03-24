import React, {useEffect} from "react";
import BreadCrumb from "../../../components/BreadCrumb";
import Sidebar from "../../../components/Sidebar";
import "./selectService.scss";
import {trackingView} from "../../../common/utils/PageDetails";

const SelectService = () => {
    trackingView({"value":"/select-service"});
    const breadcrumb=[{name:'Service Auswahl',activate:true}]
    useEffect(() => {
        window._paq.push(["setUserId", localStorage.getItem("email")]);
        window._paq.push(["trackPageView"]);
    },[]);
  return (
    <>
      <Sidebar />
      <BreadCrumb breadcrumb={breadcrumb} />
      <div className="my-page service-page selectionCatgry">
        <h1>Service buchen</h1>

        <div className="d-flex">
          <div
            className="service-card"
            onClick={() => {
              window.location = "/orders";
              localStorage.setItem("serviceType", "pickUp");
              localStorage.removeItem("currentProductDetails");
              localStorage.removeItem("dummyCartItem");
            }}
          >
            <img src="/assets/images/service2.png" alt="service" />
            <p className="mt-3">BESTELLUNG EINER ABHOLUNG</p>
          </div>

          <div
            className="service-card position-relative"
            onClick={() => {
              window.location = "/orders";
              localStorage.setItem("serviceType", "packaging");
              localStorage.removeItem("currentProductDetails");
              localStorage.removeItem("dummyCartItem");
            }}
          >
            <img src="/assets/images/service1.png" alt="service" />
            <p className="mt-3">BESTELLUNG EINER VERPACKUNG </p>
            {/* <img
              src="/assets/images/box.png"
              alt="box"
              className="position-absolute w-100 start-50"
              style={{
                top: "20%",
              }}
            /> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default SelectService;

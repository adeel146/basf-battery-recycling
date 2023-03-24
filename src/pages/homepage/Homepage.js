import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import "./homepage.scss";
import InfoCard from "../../components/InfoCard";
import Footer from "../../components/Footer";
import NavHome from "../../components/Navbar";
import { trackingView } from "../../common/utils/PageDetails";
import HomePasswordModal from "../../common/modals/HomePasswordModal";
const Homepage = () => {
  const history = useHistory();
  const [passwordModal, setpasswordModal] = useState(false);
  trackingView({ value: "/home" });
  useEffect(() => {
    window._paq.push([
      "setUserId",
      localStorage.getItem("email")
        ? localStorage.getItem("email")
        : "anonymousUser",
    ]);
    window._paq.push(["trackPageView"]);
  }, []);
  return (
    <div className="homepage">
      <NavHome />
      <div className="banner">
        {/*<Cookies />*/}
        <div className="bg-image">
          <div className="banner-text">
            <h1>OPTIMIERTES BATTERIE-RECYCLING</h1>
            <h2>
              UNSERE AUFGABE IST ES,<br></br> DIE WELT ZU EINER NACHHALTIGEN
              ZUKUNFT ZU BESCHLEUNIGEN.
            </h2>
            <button
              className="ANMELDEN-button"
              onClick={() => {
                if (
                  localStorage.getItem("userId") &&
                  localStorage.getItem("role") === "DealerAdmin"
                ) {
                  history.push("/orders");
                } else if (localStorage.getItem("userId")) {
                  history.push("/assignments");
                } else {
                  history.push("/login");
                }
              }}
            >
              ANMELDEN
            </button>
          </div>
        </div>
      </div>

      <div className="info-section">
        <h1 className="info-heading">
          <b>
            NACHHALTIGKEIT IN DER ELEKTROMOBILITÄT IST EINE GROßE
            HERAUSFORDERUNG
          </b>
        </h1>
        <h6 className="info-detail">
          Mit der BASF Batterieplattform helfen wir Ihnen, Ihren
          Batterierecyclingprozess zu optimieren. <br></br>Fordern Sie ganz
          einfach die Abholung von gebrauchten oder defekten Batterien an und
          unterstützen Sie unseren Ansatz zum Klimawandel.
          <br />
          Außerdem können Sie auch Verpackungs,- und Füllmaterial direkt bei uns
          bestellen.
        </h6>
        <div className="card-container">
          <Row>
            <Col lg={3} md={6} sm={12}>
              <InfoCard
                icon="user"
                heading="Schritt 1"
                detail="Kostenlos anmelden und Zugang zur neuen Batterie-Recycling-Plattform erhalten."
              />
            </Col>
            <Col lg={3} md={6} sm={12}>
              <InfoCard
                icon="layer"
                heading="Schritt 2"
                detail="Bestellen Sie entweder Abholungen von Batterien, oder Lieferung von Verpackungen und Füllmaterial."
              />
            </Col>
            <Col lg={3} md={6} sm={12}>
              <InfoCard
                icon="appointment"
                heading="Schritt 3"
                detail="Die Batterien werden vor Ort abgeholt und / oder Verpackungs,- und Füllmaterial wird angeliefert."
              />
            </Col>
            <Col lg={3} md={6} sm={12}>
              <InfoCard
                icon="recycle"
                heading="Schritt 4"
                detail="Die Batterien werden zu einem Recyclingunternehmen transportiert und dort verwertet."
              />
            </Col>
          </Row>
        </div>
      </div>

      <div className="battery-image">
        <img src="assets/images/battery-image.png" alt="icon" />
      </div>
      <Footer />
      <HomePasswordModal
        show={passwordModal}
        close={() => {
          setpasswordModal(false);
        }}
        // setDeleteProductModal={setDeleteProductModal}
        // setCheckChangesTrue={handleUpdate}
        // modalData={modalData}
      />
    </div>
  );
};

export default Homepage;

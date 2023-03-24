import React, {useEffect} from "react";
import { Container } from "react-bootstrap";
import Footer from "../components/Footer";
import Header from "../components/Header";

function Impressum() {
  useEffect(() => {
    window._paq.push(["setUserId", (localStorage.getItem("email"))?localStorage.getItem("email"):"anonymousUser"]);
    window._paq.push(["trackPageView"]);
  },[]);
  return (
    <div>
      <Header />
      <Container>
        <div style={{margin:'50px 0px'}}>
          <p>Impressum / Verantwortlichkeiten</p>
          <p>Anfragen richten Sie bitte an:</p>
          <h3>Kontakt</h3>
          <p>
            BASF SE
            <br />
            Carl-Bosch-Str. 38, 67056 Ludwigshafen, Deutschland
          </p>
          <p>
            Customer Service Battery Recycling Portal
            <br />
            E-Mail: BatteryRecycling-CS@basf.com
          </p>
          <h3>Vertretungsberechtigter Vorstand:</h3>
          <p>
            Martin Brudermüller, Chairman;
            <br />
            Hans-Ulrich Engel, Vice Chairman;
            <br />
            Saori Dubourg; Michael Heinz; Markus Kamieth; Melanie Maas-Brunner
          </p>
          <h3>
            Aufsichtsratsvorsitzender:
            <span style={{ fontSize: "20px", fontWeight: "400" }}>
              Kurt Bock
            </span>
          </h3>
          <p>
            BASF SE
            <br />
            67056 Ludwigshafen
            <br />
            Registergericht: Amtsgericht Ludwigshafen
            <br />
            Eintragungsnummer: HRB 6000
            <br />
            Umsatzsteuer-Ident.-Nr: DE 149145247
          </p>{" "}
        </div>
      </Container>
      <Footer />
    </div>
  );
}

export default Impressum;

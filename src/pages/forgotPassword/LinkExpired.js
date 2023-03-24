import React, { useState } from "react";
import { Card, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import ForgotPasswordModal from "../../common/modals/ForgotPasswordModal";

const LinkExpired = () => {
  const [show, setshow] = useState(false);
  return (
    <Container>
      <Card className="mt-5 link-expired not-found">
        <Card.Header className="text-white">Link is Expired</Card.Header>
        <Card.Body className="mt-5">
          <p>Entschuldigung, der Link ist abgelaufen.</p>
          <p>
            {" "}
            Der Link war so eingestellt, dass er nach einer bestimmten Zeit
            abläuft. Bitte klicken Sie auf den unten stehenden Link, um eine
            neue E-Mail mit einem neuen Link für die Erstellung eines Passworts
            zu erhalten.
          </p>
          <Card.Text>
            <Link onClick={() => setshow(true)}>Neue Link bekommen</Link>
            {/* <Link style={{marginLeft:"10px"}} to="/">Go to Home page</Link> */}
          </Card.Text>
        </Card.Body>
      </Card>
      <ForgotPasswordModal show={show} close={() => setshow(false)} />
    </Container>
  );
};

export default LinkExpired;

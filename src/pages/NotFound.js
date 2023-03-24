import React from "react";
import { Card, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Container>
      <Card className="mt-5 not-found">
        <Card.Header className="text-white bg-danger">
          Error 404: Page Not Found
        </Card.Header>
        <Card.Body className="mt-5">
          <Card.Text>
            <Link to="/">Go to Homepage</Link>
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default NotFound;

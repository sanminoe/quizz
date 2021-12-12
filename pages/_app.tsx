import "bootstrap/dist/css/bootstrap.min.css";
import type { AppProps } from "next/app";
import React from "react";
import { Container } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <React.Fragment>
      <Navbar>
        <Container>
          <Navbar.Brand>Quizz</Navbar.Brand>
          <Navbar.Collapse className="me-auto">
            <Nav>
              <Nav.Link>Home</Nav.Link>
              <Nav.Link>My Profile</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Component {...pageProps} />
    </React.Fragment>
  );
}

export default MyApp;

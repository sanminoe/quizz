import "bootstrap/dist/css/bootstrap.min.css";
import type { AppProps } from "next/app";
import React from "react";
import { Container } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Link from "next/link";
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <React.Fragment>
      <Navbar>
        <Container>
          <Navbar.Brand>Quizz</Navbar.Brand>
          <Navbar.Collapse className="me-auto">
            <Nav>
              <Link href="/" passHref>
                <Nav.Link>Home</Nav.Link>
              </Link>
              <Link href="/profile" passHref>
                <Nav.Link>My Profile</Nav.Link>
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Component {...pageProps} />
    </React.Fragment>
  );
}

export default MyApp;

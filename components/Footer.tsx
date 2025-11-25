import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-light border-top mt-5">
      <Container className="py-5">
        <Row>
          <Col lg={4} md={6} className="mb-4">
            <h5 className="fw-bold mb-3">BESTFIT HEALTHCARE NETWORK</h5>
            <p className="text-muted">
              Your premier healthcare search engine, dedicated to helping you find the best 
              and most comprehensive healthcare solutions in your area.
            </p>
          </Col>
          
          <Col lg={2} md={6} className="mb-4">
            <h6 className="fw-bold mb-3">QUICK LINKS</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link href="/" className="text-decoration-none text-muted">Home</Link>
              </li>
              <li className="mb-2">
                <Link href="/about" className="text-decoration-none text-muted">About</Link>
              </li>
              <li className="mb-2">
                <Link href="/contact" className="text-decoration-none text-muted">Contact</Link>
              </li>
              <li className="mb-2">
                <a href="#locations" className="text-decoration-none text-muted">Locations</a>
              </li>
            </ul>
          </Col>

          <Col lg={3} md={6} className="mb-4">
            <h6 className="fw-bold mb-3">SERVICES</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="#independent-living" className="text-decoration-none text-muted">Independent Living</a>
              </li>
              <li className="mb-2">
                <a href="#assisted-living" className="text-decoration-none text-muted">Assisted Living</a>
              </li>
              <li className="mb-2">
                <a href="#memory-care" className="text-decoration-none text-muted">Memory Care</a>
              </li>
              <li className="mb-2">
                <a href="#skilled-nursing" className="text-decoration-none text-muted">Skilled Nursing</a>
              </li>
            </ul>
          </Col>

          <Col lg={3} md={6} className="mb-4">
            <h6 className="fw-bold mb-3">CONTACT</h6>
            <p className="text-muted mb-2">
              <strong>Request Information:</strong>
            </p>
            <a href="/contact" className="btn btn-primary btn-sm">Contact Us</a>
          </Col>
        </Row>

        <Row className="mt-4 pt-4 border-top">
          <Col lg={12} className="text-center">
            <p className="text-muted mb-0">
              © {new Date().getFullYear()} Bestfit Network. All rights reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
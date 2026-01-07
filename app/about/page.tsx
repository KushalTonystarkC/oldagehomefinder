import React from "react";
import Link from "next/link";
import { Container, Row, Col } from "react-bootstrap";

export default function About() {
  return (
    <main>
      {/* Hero Section */}
      <section className="bg-light py-5">
        <Container>
          <Row className="align-items-center">
            <Col lg={12} className="text-center mb-4">
              <h1 className="display-4 fw-bold mb-3">BESTFIT HEALTHCARE NETWORK</h1>
              <p className="lead">
                Welcome to Bestfit Healthcare Network, your premier healthcare search engine, 
                dedicated to helping you find the best and most comprehensive healthcare solutions 
                in your area. We understand that everyone has unique healthcare needs, and our 
                goal is to connect you with the perfect facility or community tailored to your 
                specific requirements.
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Independent Living Section */}
      <section className="py-5">
        <Container>
          <Row className="align-items-center mb-5">
            <Col lg={6}>
              <h2 className="display-5 fw-bold mb-4">Independent Living</h2>
              <p className="lead mb-3">
                Experience a lifestyle of freedom and comfort in our Independent Living communities. 
                Embrace a worry-free environment where you can savor the essence of your golden years 
                without the burdens of home ownership.
              </p>
              <p className="mb-3">
                Our diverse apartment options cater to your unique style, ensuring a perfect fit 
                for your preferences. Seize the opportunity to socialize with like-minded individuals 
                and relish the true comforts of home. Start exploring today.
              </p>
            </Col>
            <Col lg={6}>
              <div className="bg-light rounded p-4" style={{ minHeight: "300px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <p className="text-muted text-center">Image: Old Lady and old man standing by picking each other hands to represent the independent living facility.</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Assisted Living Section */}
      <section className="py-5 bg-light">
        <Container>
          <Row className="align-items-center">
            <Col lg={6} className="order-lg-2">
              <h2 className="display-5 fw-bold mb-4">Assisted Living</h2>
              <p className="lead mb-3">
                Discover a redefined independence in our Assisted Living communities, where we 
                prioritize your well-being through thoughtful assistance and services.
              </p>
              <p className="mb-3">
                From medication management to housekeeping, our dedicated staff is committed to 
                supporting your wellness journey. Collaborative care partnerships ensure that you 
                receive the attention you deserve, with our team available 24/7. Get Independent 
                Living with Supportive Care.
              </p>
            </Col>
            <Col lg={6} className="order-lg-1">
              <div className="bg-white rounded p-4" style={{ minHeight: "300px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <p className="text-muted text-center">Image: Old Lady and old man standing by picking each other hands to represent the assisted living facility.</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Memory Care Section */}
      <section className="py-5">
        <Container>
          <Row className="align-items-center">
            <Col lg={6}>
              <h2 className="display-5 fw-bold mb-4">Memory Care</h2>
              <p className="lead mb-3">
                Our Memory Care program is founded on a person-centered approach that preserves 
                identity and fosters a strong sense of self.
              </p>
              <p className="mb-3">
                Within our secure communities, residents experience a daily path of engagement 
                designed to help them flourish, even in the presence of advanced expressions of 
                dementia. Committed to nurturing individual needs, creating a compassionate and 
                supportive environment celebrating each resident&apos;s journey.
              </p>
            </Col>
            <Col lg={6}>
              <div className="bg-light rounded p-4" style={{ minHeight: "300px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <p className="text-muted text-center">Image: Memory care facility representation.</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Call to Action Section */}
      <section className="py-5 bg-primary text-white">
        <Container>
          <Row>
            <Col lg={12} className="text-center">
              <h2 className="display-5 fw-bold mb-4">Ready to Find Your Perfect Community?</h2>
              <p className="lead mb-4">
                Let us help you discover the best healthcare solution tailored to your needs.
              </p>
              <div className="d-flex gap-3 justify-content-center flex-wrap">
                <Link href="/" className="btn btn-light btn-lg">Schedule a Tour</Link>
                <Link href="/contact" className="btn btn-outline-light btn-lg">Request Information</Link>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </main>
  );
}


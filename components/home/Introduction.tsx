'use client'
import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { FaUserFriends, FaWheelchair, FaBrain } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';

const BestfitHealthcareNetwork = () => {
  return (
    <Container className="py-5 my-4 bg-[#F7FAFC]" fluid>
      <Row className="mb-4">
        <Col className="text-center">
          <h1 className="display-5 fw-bold">BESTFIT HEALTHCARE NETWORK</h1>
          <p className="lead mx-auto" style={{ maxWidth: '800px' }}>
            Welcome to Bestfit Healthcare Network, your premier healthcare search engine, dedicated to helping you find the best and most comprehensive healthcare solutions in your area. We understand that everyone has unique healthcare needs, and our goal is to connect you with the perfect facility or community tailored to your specific requirements.
          </p>
        </Col>
      </Row>

      <Row className="justify-content-center mb-5">
        <Col xs={12} sm={6} md={4} lg={3} className="d-grid gap-2 d-md-flex justify-content-md-end">
          <Button variant="outline-secondary" size="lg" className="me-md-2 mb-2 mb-md-0">
            Schedule a Tour
          </Button>
        </Col>
        <Col xs={12} sm={6} md={4} lg={3} className="d-grid gap-2 d-md-flex">
          <Button variant="primary" size="lg" style={{ backgroundColor: '#2c7a7b', borderColor: '#2c7a7b' }}>
            Request Information
          </Button>
        </Col>
      </Row>

      <Row>
        {/* Independent Living Card */}
        <Col lg={4} md={6} className="mb-4">
          <Card className="h-100">
            <Card.Body className="text-center">
              <div className="d-flex justify-content-center mb-3">
                <div className="rounded-circle d-flex align-items-center justify-content-center" 
                     style={{ width: '70px', height: '70px', border: '2px solid #2c7a7b' }}>
                  <FaUserFriends size={32} color="#2c7a7b" />
                </div>
              </div>
              <Card.Title className="fs-3 fw-bold mb-3">Independent Living</Card.Title>
              <Card.Text>
                Experience a lifestyle of freedom and comfort in our Independent Living communities. Embrace a worry-free environment where you can savor the essence of your golden years without the burdens of home ownership. Our diverse apartment options cater to your unique style, ensuring a perfect fit for your preferences. Seize the opportunity to socialize with like-minded individuals and relish the true comforts of home. Start exploring today.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        {/* Assisted Living Card */}
        <Col lg={4} md={6} className="mb-4">
          <Card className="h-100">
            <Card.Body className="text-center">
              <div className="d-flex justify-content-center mb-3">
                <div className="rounded-circle d-flex align-items-center justify-content-center" 
                     style={{ width: '70px', height: '70px', border: '2px solid #2c7a7b' }}>
                  <FaWheelchair size={32} color="#2c7a7b" />
                </div>
              </div>
              <Card.Title className="fs-3 fw-bold mb-3">Assisted Living</Card.Title>
              <Card.Text>
                Discover a redefined independence in our Assisted Living communities, where we prioritize your well-being through thoughtful assistance and services. From medication management to housekeeping, our dedicated staff is committed to supporting your wellness journey. Collaborative care partnerships ensure that you receive the attention you deserve, with our team available 24/7. Get Independent Living with Supportive Care.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        {/* Memory Care Card */}
        <Col lg={4} md={12} className="mb-4">
          <Card className="h-100">
            <Card.Body className="text-center">
              <div className="d-flex justify-content-center mb-3">
                <div className="rounded-circle d-flex align-items-center justify-content-center" 
                     style={{ width: '70px', height: '70px', border: '2px solid #2c7a7b' }}>
                  <FaBrain size={32} color="#2c7a7b" />
                </div>
              </div>
              <Card.Title className="fs-3 fw-bold mb-3">Memory Care</Card.Title>
              <Card.Text>
                Our Memory Care program is founded on a person-centered approach that preserves identity and fosters a strong sense of self. Within our secure communities, residents experience a daily path of engagement designed to help them flourish, even in the presence of advanced expressions of dementia. Committed to nurturing individual needs, creating a compassionate and supportive environment celebrating each resident's journey.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default BestfitHealthcareNetwork;
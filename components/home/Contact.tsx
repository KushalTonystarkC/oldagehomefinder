'use client'
import React from "react";
import { Container, Form, Image, Row, Col, Button } from "react-bootstrap";

const ContactForm = () => {
  return (
    <Container>
      <Row>
        <Col lg={6} sm={12}>
          <Image 
            src="https://bestfitnetwork.com/wp-content/uploads/2024/01/Cities-Codes-of-Las-Vegas-with-Healthcare-Beds-Availability-Numbers.webp" 
            fluid 
          />
        </Col>
        <Col lg={6} sm={12}>
          <Form className="my-2">
            <Form.Group className="mb-3" controlId="formPlaintextName">
                <Form.Control type="text" placeholder="Enter Your Name" className="form-control-underline" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPlaintextEmail">
                <Form.Control type="text" placeholder="Enter Email" className="form-control-underline" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPlaintextNumber">
                <Form.Control type="number" placeholder="Enter number" className="form-control-underline" />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ContactForm;

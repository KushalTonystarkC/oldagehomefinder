'use client'
import React from "react";
import { Container, Form, Image, Row, Col, Button } from "react-bootstrap";

const Contact = () => {
  return (
    <Container>
      <Row>
        <Col lg={6}>
          <Image 
            src="https://bestfitnetwork.com/wp-content/uploads/2024/01/Cities-Codes-of-Las-Vegas-with-Healthcare-Beds-Availability-Numbers.webp" 
            fluid 
          />
        </Col>
        <Col lg={6}>
          <center>
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
          </center>
        </Col>
      </Row>
    </Container>
  );
};

export default Contact;

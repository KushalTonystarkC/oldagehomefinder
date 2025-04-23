'use client'
import React from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FaRegClipboard, FaHandHoldingHeart, FaHome, FaRegCalendar, FaUserCheck } from "react-icons/fa";

const CenterInfoCard = () => {
    const cards = Array.from({ length: 4 }, (_, index) => (
    <Col key={index} xs={12} sm={6} md={6} lg={4} xl={3} className="mb-4">
        <Card className="h-100">
            <Card.Img variant="top" src="https://images.mlssoccer.com/image/private/t_editorial_landscape_8_desktop_mobile/mls-mia/ypvaewf225tktix4yhca.png" />
            <Card.Body>
                <Card.Title className="fs-5">Nevada Memory Care – Northwest LV 89117</Card.Title>
                <div className="d-flex justify-content-between my-3">
                    <FaRegCalendar className="fs-5" />
                    <FaRegClipboard className="fs-5" />
                    <FaHome className="fs-5" />
                    <FaHandHoldingHeart className="fs-5" />
                    <FaUserCheck className="fs-5" />
                </div>
                <Card className="mb-3">
                    <Card.Body className="p-2">
                        <div className="text-center fw-bold mb-2">Availability & Pricing</div>
                        <Row className="g-2">
                            <Col xs={6}>
                                <Card className="h-100">
                                    <Card.Body className="p-2">
                                        <div className="text-center">Female Beds</div>
                                        <div className="text-center fw-bold">3</div>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col xs={6}>
                                <Card className="h-100">
                                    <Card.Body className="p-2">
                                        <div className="text-center">Male Beds</div>
                                        <div className="text-center fw-bold">3</div>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col xs={6}>
                                <Card className="h-100">
                                    <Card.Body className="p-2">
                                        <div className="text-center">Min Price</div>
                                        <div className="text-center fw-bold">3</div>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col xs={6}>
                                <Card className="h-100">
                                    <Card.Body className="p-2">
                                        <div className="text-center">Max Price</div>
                                        <div className="text-center fw-bold">3</div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
                <div className="d-flex flex-column gap-2">
                    <Button variant="outline-primary" className="w-100">Go somewhere</Button>
                    <Button variant="outline-primary" className="w-100">Go somewhere</Button>
                </div>
            </Card.Body>
        </Card>
    </Col>
    ));
    return (
        <Container fluid>
            <Row className="g-4">
                {cards}
            </Row>
        </Container>
    );
}

export default CenterInfoCard;
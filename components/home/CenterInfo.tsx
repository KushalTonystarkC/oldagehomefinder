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
    <Col key={index} xs={12} sm={6} md={4} lg={3} xl={3} xxl={2}>
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" width={10} src="https://images.mlssoccer.com/image/private/t_editorial_landscape_8_desktop_mobile/mls-mia/ypvaewf225tktix4yhca.png" />
            <Card.Body className="mx-1 my-2">
                <Container>
                    <Row>
                        <Col sm={12} lg={12} xs={12} md={12} xl={12} xxl={12}>
                            <Card.Title className="text-xl">Nevada Memory Care – Northwest LV 89117</Card.Title>
                        </Col>
                        <Col sm={12} lg={12} xs={12} md={12} xl={12} xxl={12}>
                            <div className="flex flex-row my-2 justify-between">
                                <FaRegCalendar className="text-xl"/>
                                <FaRegClipboard className="text-xl" />
                                <FaHome className="text-xl"/>
                                <FaHandHoldingHeart className="text-xl" />
                                <FaUserCheck className="text-xl" />
                            </div>
                        </Col>
                        <Col sm={12} lg={12} xs={12} md={12} xl={12} xxl={12} class="mx-0 px-0 my-3">
                            <Card body>
                                <center className="text-lg">Availability & Pricing</center>
                                <Container className="mx-0 px-0 my-2">
                                    <Row className="g-2">
                                        <Col sm={6} lg={6} xs={6} md={6} xl={6} xxl={6}>
                                            <Card>
                                                <div className="flex flex-column justify-center align-center">
                                                    <div className="text-center ma-0">Female Beds</div>
                                                    <div className="text-center ma-0">3</div>
                                                </div>
                                            </Card>
                                        </Col>
                                        <Col sm={6} lg={6} xs={6} md={6} xl={6} xxl={6}>
                                            <Card>
                                                <div>
                                                    <div>Male Beds</div>
                                                    <div className="text-center">3</div>
                                                </div>
                                            </Card>
                                        </Col>
                                        <Col sm={6} lg={6} xs={6} md={6} xl={6} xxl={6}>
                                            <Card>
                                                <div>
                                                    <div className="text-center">Min Price</div>
                                                    <div className="text-center">3</div>
                                                </div>
                                            </Card>
                                        </Col>
                                        <Col sm={6} lg={6} xs={6} md={6} xl={6} xxl={6}>
                                            <Card>
                                                <div>
                                                    <div className="text-center">Max Price</div>
                                                    <div className="text-center">3</div>
                                                </div>
                                            </Card>
                                        </Col>
                                    </Row>
                                </Container>
                            </Card>
                        </Col>
                    </Row>
                </Container>
                <Col sm={12} lg={12} xs={12} md={12} xl={12} xxl={12} class="my-2">
                    <Button variant="outline-primary" style={{ width: '100%' }}>Go somewhere</Button>
                </Col>
                <Col sm={12} lg={12} xs={12} md={12} xl={12} xxl={12} class="my-2">
                    <Button variant="outline-primary" style={{ width: '100%' }}>Go somewhere</Button>
                </Col>
            </Card.Body>
        </Card>
    </Col>
));
    return (
        <>
                <Row className="m-4">
                    {cards}
                </Row>
        </>
    );
}

export default CenterInfoCard;
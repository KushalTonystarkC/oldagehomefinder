'use client'
import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
// import { useRouter } from 'next/router';
import { usePathname } from 'next/navigation'
const Header = () => {
  const path = usePathname();
  console.log(path)
    return (
        <>
          <Navbar bg="primary" variant="dark">
            <Container>
              <Navbar.Brand href="#home">Company Name</Navbar.Brand>
              <Nav className="mx-auto" defaultActiveKey={path}>
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/about">About Us</Nav.Link>
                <Nav.Link href="/contact">Contact Us</Nav.Link>
              </Nav>
            </Container>
          </Navbar>
        </>
      );
  };
  
  export default Header;
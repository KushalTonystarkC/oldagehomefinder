'use client'
import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { usePathname } from 'next/navigation'
import { Button } from "react-bootstrap";

const Header = () => {
  const path = usePathname();
  console.log(path)
  
  // Custom styles for nav links
  const navLinkStyle = {
    transition: "color 0.3s ease"
  };
  
  const activeNavLinkStyle = {
    color: "var(--bs-primary)",
    borderBottom: "2px solid var(--bs-primary)",
    paddingBottom: "2px"
  };
  
  return (
    <>
      <Navbar variant="light" className="border-b border-[#e5e5e5]">
        <Container>
          <Navbar.Brand href="#home">
            <img src="https://bestfitnetwork.com/wp-content/uploads/2023/12/cropped-Bestfit-Network-Logo.webp" width={150} height={148} alt="Bestfit Network Logo"></img>
          </Navbar.Brand>
          <Nav className="mx-auto" defaultActiveKey={path}>
            <Nav.Link 
              href="/" 
              style={path === '/' ? activeNavLinkStyle : navLinkStyle}
              className="hover-nav-link"
            >
              Home
            </Nav.Link>
            <Nav.Link 
              href="/about" 
              style={path === '/about' ? activeNavLinkStyle : navLinkStyle}
              className="hover-nav-link"
            >
              About Us
            </Nav.Link>
            <Nav.Link 
              href="/contact" 
              style={path === '/contact' ? activeNavLinkStyle : navLinkStyle}
              className="hover-nav-link"
            >
              Contact Us
            </Nav.Link>
          </Nav>
          <Button variant="outline-secondary">Request Information</Button>
        </Container>
      </Navbar>

      {/* Add custom CSS for the hover effect */}
      <style jsx global>{`
        .hover-nav-link:hover {
          color: red !important;
        }
      `}</style>
    </>
  );
};

export default Header;
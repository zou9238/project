import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

/**
 * Renders the navbar component with a sign-in or sign-out button depending on whether or not a user is authenticated
 * @param props
 */
export const LibraryNavbar = (props) => {
    return (
        <>
            <Navbar   className="navbarStyle"  expand="lg" variant="dark">
            
            <Container>
                <Navbar.Brand href="/">
                    <img
                    src="/img/icon_book.png"
                    width="100"
                    height="60"
                    className="d-inline-block align-middle"
                    alt="React Bootstrap logo"
                    />{' '}
                    圖書系統
                </Navbar.Brand>
                
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="/home">首頁</Nav.Link>
                    <Nav.Link href="/search">館藏總覽</Nav.Link>
                    <Nav.Link href="/borrow_list">借閱紀錄</Nav.Link>
                    <Nav.Link href="/departments">館藏管理</Nav.Link>
                    <Nav.Link href="/">借閱管理</Nav.Link>
                </Nav>
                </Navbar.Collapse>
                </Container>
            
                <div className="hello">
                    {props.username} 您好!
                </div>
            </Navbar>
  
        </>
    );
    
};

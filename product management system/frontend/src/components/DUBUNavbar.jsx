import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';



/**
 * Renders the navbar component with a sign-in or sign-out button depending on whether or not a user is authenticated
 * @param props
 */
export const DUBUNavbar = (props) => {
    return (
        <>
            <Navbar bg="light" variant="light" className="navbarStyle">
            <Container>
                <Navbar.Brand href="/">
                    <img
                    src="img/LOGO.jpg"
                    width="120"
                    height="60"
                    className="d-inline-block align-top"
                    alt="React Bootstrap logo"
                    />{' '}
                    涓豆腐商務資訊管理系統
                </Navbar.Brand>
                
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="/home">菜單</Nav.Link>
                    <Nav.Link href="/orders">訂單查詢</Nav.Link>
                    <Nav.Link href="/products">菜單管理</Nav.Link>                    
                </Nav>
                </Navbar.Collapse>
                </Container>
            
                <div className="help" style={{color:'black'}}>
                    {props.username} 聯絡我們
                </div>
                    
                
                
                <Nav className="userProfile">
                    <NavDropdown title="系統管理" id="basic-nav-dropdown2">
                        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">
                            Another action
                        </NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item>
                            登出
                        </NavDropdown.Item>
                    </NavDropdown>
                    
                    <div className="collapse navbar-collapse justify-content-end">
                    登出
                    </div>
                </Nav>
            </Navbar>

            
            
            
        </>
    );
    
};

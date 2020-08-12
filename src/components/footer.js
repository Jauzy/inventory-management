
import React from "react";
import { Link } from "gatsby";
// reactstrap components
import {
    Button,
    NavItem,
    NavLink,
    Nav,
    Container,
    Row,
    Col,
    UncontrolledTooltip
} from "reactstrap";

const Footer = (props) => {
    return (
        <footer className="footer">
            <Container>
                <Row>
                    <Col md="3">
                        <h1 className="title">RPL-GDC•</h1>
                    </Col>
                    <Col md="3">
                        <Nav>
                            <NavItem>
                                <NavLink to="/" tag={Link}>
                                    Home
                                    </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink to="/register" tag={Link}>
                                    Register
                                </NavLink>
                            </NavItem>
                        </Nav>
                    </Col>
                    <Col md="3">
                        <Nav>
                            <NavItem>
                                <NavLink >
                                    Contact Us
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink>
                                    About Us
                                </NavLink>
                            </NavItem>
                        </Nav>
                    </Col>
                    <Col md="3">
                        <h3 className="title mb-0">Info:</h3>
                        <p>
                            This web is using Bootstrap 4 BLK Design System UI Kits from Creative Tim.
                        </p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
}

export default Footer;

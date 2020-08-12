import React, { useEffect, useState } from "react";

import { Link, navigate } from 'gatsby'

import {
    Collapse, Row, Col,
    NavbarBrand, UncontrolledDropdown,
    Navbar, DropdownToggle, DropdownItem,
    NavItem, DropdownMenu,
    NavLink,
    Nav,
    Container,
} from "reactstrap";

import { getAdminData, logoutAdmin } from '../../static/redux/Actions/admin'
import { getOrgData, logoutOrganization } from '../../static/redux/Actions/organization'
import { connect } from 'react-redux'
import Cookies from 'universal-cookie'
const cookies = new Cookies()

const NavbarComp = (props) => {
    const { dispatch, organization, admin, location } = props

    const [state, setState] = useState({
        color: 'navbar-transparent',
        collapseOpen: false
    })

    const changeColor = () => {
        if (
            document.documentElement.scrollTop > 99 ||
            document.body.scrollTop > 99
        ) {
            setState({
                ...state,
                color: "bg-primary"
            });
        } else if (
            document.documentElement.scrollTop < 100 ||
            document.body.scrollTop < 100
        ) {
            setState({
                ...state,
                color: "navbar-transparent"
            });
        }
    };

    const toggleCollapse = () => {
        document.documentElement.classList.toggle("nav-open");
        setState({
            ...state,
            collapseOpen: !state.collapseOpen
        });
    };

    const onCollapseExiting = () => {
        setState({
            ...state,
            collapseOut: "collapsing-out"
        });
    };

    const onCollapseExited = () => {
        setState({
            ...state,
            collapseOut: ""
        });
    };

    useEffect(() => {
        window.addEventListener("scroll", changeColor);
        if (cookies.get('user')) {
            if (cookies.get('user').type === 'Admin') getAdminData(dispatch)
            else if(cookies.get('user').type === 'Organization') getOrgData(dispatch)
        }
    }, [])

    return (
        <>
            <Navbar className={"fixed-top " + state.color} expand="lg" color-on-scroll="100">
                <Container>
                    <NavbarBrand>
                        <Link to='/' className='text-white'>
                            <span>RPL-GDC• </span>
                            Inv Management
                        </Link>
                    </NavbarBrand>
                    <button
                        aria-expanded={state.collapseOpen}
                        className="navbar-toggler navbar-toggler"
                        onClick={toggleCollapse}
                    >
                        <span className="navbar-toggler-bar bar1" />
                        <span className="navbar-toggler-bar bar2" />
                        <span className="navbar-toggler-bar bar3" />
                    </button>
                    <Collapse
                        className={"justify-content-end " + state.collapseOut}
                        navbar
                        isOpen={state.collapseOpen}
                        onExiting={onCollapseExiting}
                        onExited={onCollapseExited}
                    >
                        <div className="navbar-collapse-header">
                            <Row>
                                <Col className="collapse-brand" xs="6">
                                    <a href="#pablo" onClick={e => e.preventDefault()}>
                                        BLK•React
                                    </a>
                                </Col>
                                <Col className="collapse-close text-right" xs="6">
                                    <button
                                        aria-expanded={state.collapseOpen}
                                        className="navbar-toggler"
                                        onClick={toggleCollapse}
                                    >
                                        <i className="tim-icons icon-simple-remove" />
                                    </button>
                                </Col>
                            </Row>
                        </div>
                        <Nav navbar>
                            <NavItem>
                                <NavLink>
                                    <Link to='/about'>About</Link>
                                </NavLink>
                            </NavItem>
                            {!cookies.get('user') && <NavItem>
                                <NavLink>
                                    <Link to='/register'>Register</Link>
                                </NavLink>
                            </NavItem>}
                            {!cookies.get('user') && <NavItem>
                                <NavLink>
                                    <Link to='/login'>
                                        <i className='fa fa-sign-in-alt mr-1' />
                                        Login
                                    </Link>
                                </NavLink>
                            </NavItem>}
                            {admin && <UncontrolledDropdown nav>
                                <DropdownToggle
                                    aria-expanded={false}
                                    aria-haspopup={true}
                                    caret
                                    color="default"
                                    data-toggle="dropdown"
                                    id="adminDropdown"
                                    nav
                                    onClick={e => e.preventDefault()}
                                >
                                    Hello, {admin.name}
                                </DropdownToggle>
                                <DropdownMenu aria-labelledby="adminDropdown">
                                    <DropdownItem style={{ cursor: 'pointer' }} onClick={() => navigate('/admin/dashboard')}>
                                        Dashboard
                                    </DropdownItem>
                                    <DropdownItem style={{ cursor: 'pointer' }} onClick={() => logoutAdmin(dispatch)}>
                                        Logout
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>}
                            {organization && <UncontrolledDropdown nav>
                                <DropdownToggle
                                    aria-expanded={false}
                                    aria-haspopup={true}
                                    caret
                                    color="default"
                                    data-toggle="dropdown"
                                    id="adminDropdown"
                                    nav
                                    onClick={e => e.preventDefault()}
                                >
                                    Hello, {organization.organization_name}
                                </DropdownToggle>
                                <DropdownMenu aria-labelledby="adminDropdown">
                                    <DropdownItem style={{ cursor: 'pointer' }} onClick={() => navigate('/organization/dashboard')}>
                                        Dashboard
                                    </DropdownItem>
                                    <DropdownItem style={{ cursor: 'pointer' }} onClick={() => logoutOrganization(dispatch)}>
                                        Logout
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>}
                        </Nav>
                    </Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default connect(state => ({
    admin: state.admin.loggedIn,
    organization: state.organization.loggedIn
}), null)(NavbarComp);
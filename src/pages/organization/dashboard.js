
import React, { useState, useEffect } from "react";
import { Layout, SEO } from '../../components/index'
import Cookies from 'universal-cookie'

// reactstrap components
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Input,
    Container,
    Row,
    Col, Table,
    Modal, ModalHeader, ModalBody, ModalFooter
} from "reactstrap";

import { getOrgHistory, addNewHistory } from '../../../static/redux/Actions/history'
import { getOrgData, updateInfo, changePassword } from '../../../static/redux/Actions/organization'
import { connect } from 'react-redux'

if (typeof window != 'undefined') {
    var QrReader = require('react-qr-reader')
}

const cookies = new Cookies()
const profileImage = require('../../images/profile.svg')

const Dashboard = (props) => {
    const { dispatch, organization, navigate, histories } = props
    const [state, setState] = useState({
        addNewModal: false,
        passwordModal: false,
        organization_name: '',
        email: '',
        phone: '',
        type: '',
        oldPassword: '',
        newPassword: ''
    })

    const onChange = e => {
        setState({ ...state, [e.target.id]: e.target.value })
    }

    const onUpdateInfo = () => {
        updateInfo(dispatch, state)
    }

    const onChangePassword = () => {
        changePassword(dispatch, state)
        setState({ ...state, oldPassword: '', newPassword: '', passwordModal: false })
    }

    const toggleModalAdd = () => {
        setState({ ...state, addNewModal: !state.addNewModal })
    }

    const toggleModalPassword = () => {
        setState({ ...state, passwordModal: !state.passwordModal })
    }

    const handleScan = data => {
        if (data) {
            toggleModalAdd()
            addNewHistory(dispatch, data)
        }
    }

    const handleError = err => {
        console.log(err)
    }

    useEffect(() => {
        getOrgData(dispatch)
        getOrgHistory(dispatch)
    }, [])

    useEffect(() => {
        if (!cookies.get('user') || cookies.get('user').type !== 'Organization') navigate('/')
        setState({ ...state, ...organization })
    }, [organization])

    return (
        <Layout>
            <SEO title='Dashboard' />
            <div className="wrapper profile-page">

                <Container fluid style={{ overflowX: 'hidden' }} className='pt-5 mt-5'>
                    <Row>
                        <Col className='d-flex align-items-center justify-content-center'>
                            <div className=''>
                                <h2 className='title mb-1'>Welcome Back,</h2>
                                <h1>{state?.organization_name}</h1>
                            </div>
                        </Col>
                        <Col lg='6'>
                            <img src={profileImage} width='100%' />
                        </Col>
                    </Row>
                </Container>

                <section className="section">
                    <Container>
                        <Row className='d-flex align-items-center'>
                            <Col lg="6">
                                <Card className="card-plain">
                                    <CardHeader>
                                        <h1 className="profile-title text-left">Profile</h1>
                                        <h5 className="text-on-back">01</h5>
                                    </CardHeader>
                                    <CardBody>
                                        <Form>
                                            <Row>
                                                <Col md="6">
                                                    <FormGroup>
                                                        <label>Your Organization Name</label>
                                                        <Input placeholder='Organization Name'
                                                            value={state.organization_name} id='organization_name' onChange={onChange}
                                                            type="text" />
                                                    </FormGroup>
                                                </Col>
                                                <Col md="6">
                                                    <FormGroup>
                                                        <label>Email address</label>
                                                        <Input
                                                            placeholder="your@email.com"
                                                            disabled
                                                            value={state.email}
                                                            type="email"
                                                        />
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col md="6">
                                                    <FormGroup>
                                                        <label>Phone</label>
                                                        <Input placeholder='Phone No'
                                                            value={state.phone} id='phone' onChange={onChange}
                                                            type="text" />
                                                    </FormGroup>
                                                </Col>
                                                <Col md="6">
                                                    <FormGroup>
                                                        <label>Organization Type</label>
                                                        <Input defaultValue="CreativeTim"
                                                            placeholder='UKM, HIMA, ETC'
                                                            value={state.type} id='type' onChange={onChange}
                                                            type="text" />
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                            <Button
                                                className="btn-round float-right mx-1"
                                                color="primary"
                                                data-placement="right"
                                                type="button"
                                                onClick={onUpdateInfo}
                                            >
                                                Update Info
                                            </Button>
                                            <Button
                                                className="btn-round float-right mx-1"
                                                color="primary"
                                                data-placement="right"
                                                type="button"
                                                onClick={toggleModalPassword}
                                            >
                                                Change Password
                                            </Button>
                                        </Form>
                                    </CardBody>
                                </Card>
                            </Col>
                            <Col className="ml-auto" lg="6">
                                <Row>
                                    <Col md='6'>
                                        <div className="info info-horizontal">
                                            <div className="icon icon-primary">
                                                <i className="tim-icons icon-square-pin" />
                                            </div>
                                            <div className="description">
                                                <h4 className="info-title">Find us at our lab</h4>
                                                <p>
                                                    Gedung F, Ruang F201, <br />
                                            Fakultas Informatika, <br />
                                            Telkom University
                                        </p>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col md='6'>
                                        <div className="info info-horizontal">
                                            <div className="icon icon-primary">
                                                <i className="tim-icons icon-mobile" />
                                            </div>
                                            <div className="description">
                                                <h4 className="info-title">Give us a ring</h4>
                                                <p>
                                                    Al Jauzy <br />
                                                    +62 123 1234 1234 <br />
                                                    Mon - Fri, 8:00-22:00
                                                </p>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Container>
                </section>

                <Modal isOpen={state.passwordModal} toggle={toggleModalPassword} size="sm">
                    <ModalHeader className="justify-content-center" toggle={toggleModalPassword}>
                        Change Password
                    </ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <label>Old Password</label>
                            <Input
                                placeholder="Old Password"
                                onChange={onChange}
                                id='oldPassword'
                                value={state.oldPassword}
                                className='bg-dark'
                                type="password"
                            />
                        </FormGroup>
                        <FormGroup>
                            <label>New Password</label>
                            <Input
                                placeholder="New Password"
                                onChange={onChange}
                                id='newPassword'
                                value={state.newPassword}
                                className='bg-dark'
                                type="password"
                            />
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            className="btn-round"
                            color="primary"
                            type="button"
                            onClick={onChangePassword}
                        >
                            Submit
                        </Button>
                    </ModalFooter>
                </Modal>

                <section className="section">
                    <Container>
                        <Card className="card-plain">
                            <CardHeader className=''>
                                <Row>
                                    <Col md=''></Col>
                                    <Col md='auto'>
                                        <h1 className="profile-title text-left">Borrowed</h1>
                                        <h5 className="text-on-back">02</h5>
                                    </Col>
                                </Row>
                            </CardHeader>
                            <CardBody>
                                <Table>
                                    <thead>
                                        <tr>
                                            <th className="text-center">#</th>
                                            <th>Item Name</th>
                                            <th>Borrowed on Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {histories?.filter(item => !item.returned_date).map((item, index) => (
                                            <tr>
                                                <td className="text-center">{index + 1}</td>
                                                <td>{item.item.name}</td>
                                                <td>{`${new Date(item.borrow_date).toDateString()} : ${new Date(item.borrow_date).toLocaleTimeString()}`}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                                <Button
                                    className="btn-round float-right"
                                    color="primary"
                                    data-placement="right"
                                    type="button"
                                    onClick={toggleModalAdd}
                                >
                                    Borrow New
                                </Button>
                            </CardBody>
                        </Card>
                    </Container>
                </section>

                <Modal isOpen={state.addNewModal} toggle={toggleModalAdd} size="sm">
                    <ModalHeader className="justify-content-center" toggle={toggleModalAdd}>
                        Scan QR Code to Borrow
                    </ModalHeader>
                    <ModalBody>
                        {state.addNewModal && <QrReader
                            delay={300}
                            onError={handleError}
                            onScan={handleScan}
                            style={{ width: '100%' }}
                        />}
                    </ModalBody>
                </Modal>

                <section className="section">
                    <Container>
                        <Card className="card-plain">
                            <CardHeader className=''>
                                <h1 className="profile-title text-left">History</h1>
                                <h5 className="text-on-back">03</h5>
                            </CardHeader>
                            <CardBody>
                                <Table>
                                    <thead>
                                        <tr>
                                            <th className="text-center">#</th>
                                            <th>Item Name</th>
                                            <th>Borrowed on Date</th>
                                            <th>Borrowed By</th>
                                            <th>Return Date</th>
                                            <th>Returned to</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {histories?.map((item, index) => (
                                            <tr>
                                                <td className="text-center">{index + 1}</td>
                                                <td>{item.item.name}</td>
                                                <td>{`${new Date(item.borrow_date).toDateString()} : ${new Date(item.borrow_date).toLocaleTimeString()}`}</td>
                                                <td>{item.organization.organization_name}</td>
                                                <td>{item.returned_date ? `${new Date(item.returned_date).toDateString()} : ${new Date(item.returned_date).toLocaleTimeString()}` : 'Not Returned yet!'}</td>
                                                <td>{item.returned_date ? item.returned_to.name : 'Not Returned yet!'}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </CardBody>
                        </Card>
                    </Container>
                </section>

            </div>
        </Layout>
    );
}

export default connect(state => ({
    organization: state.organization.loggedIn,
    histories: state.history.histories
}), null)(Dashboard)

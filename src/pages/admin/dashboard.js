import React, { useState, useEffect, useRef } from 'react'
import { Layout, SEO } from '../../components/index'
import Cookies from 'universal-cookie'
import ReactToPrint from 'react-to-print';

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

import { getAllHistory, returnItem } from '../../../static/redux/Actions/history'
import { getAdminData, updateInfo, changePassword } from '../../../static/redux/Actions/admin'
import { register, getAll, updateItemInfo, deleteItem } from '../../../static/redux/Actions/item'
import { connect } from 'react-redux'

if (typeof window != 'undefined') {
    var QrReader = require('react-qr-reader')
}

var QRCode = require('qrcode.react');
const cookies = new Cookies()
const dashboardImg = require('../../images/dashboard.svg')

const Dashboard = (props) => {
    const { dispatch, admin, navigate, items, histories } = props
    const [state, setState] = useState({
        addNewModal: false,
        returnModal: false,
        passwordModal: false,
        editModal: false,
        printModal: false,
        name: '',
        email: '',
        phone: '',
        oldPassword: '',
        newPassword: ''
    })

    const [item, setItem] = useState({
        name: '', _id: ''
    })

    const [print, setPrint] = useState({
        name: '', _id: ''
    })

    const toPrintRef = useRef(null)

    const onUpdateInfo = () => {
        updateInfo(dispatch, state)
    }

    const onPrint = () => {
        toggleModalPrint()
    }

    const onChangePassword = () => {
        changePassword(dispatch, state)
        setState({ ...state, oldPassword: '', newPassword: '', passwordModal: false })
    }

    const onInputNewItem = () => {
        register(dispatch, item.name)
        toggleModalAdd()
        setItem({ ...item, name: '' })
    }

    const onEdit = () => {
        updateItemInfo(dispatch, item._id, item.name)
        toggleModalEdit()
        setItem({ ...item, name: '', _id: '' })
    }

    const onDelete = () => {
        deleteItem(dispatch, item._id)
        toggleModalEdit()
        setItem({ ...item, name: '', _id: '' })
    }

    const handleScan = data => {
        if (data) {
            toggleModalReturn()
            returnItem(dispatch, data)
        }
    }

    const handleError = err => {
        console.log(err)
    }

    const toggleModalAdd = () => {
        setState({ ...state, addNewModal: !state.addNewModal })
    }

    const toggleModalReturn = () => {
        setState({ ...state, returnModal: !state.returnModal })
    }

    const toggleModalEdit = () => {
        setState({ ...state, editModal: !state.editModal })
    }

    const toggleModalPrint = () => {
        setState({ ...state, printModal: !state.printModal })
    }

    const toggleModalPassword = () => {
        setState({ ...state, passwordModal: !state.passwordModal })
    }

    const onChangeItem = e => {
        setItem({ ...item, [e.target.id]: e.target.value })
    }

    const onChange = e => {
        setState({ ...state, [e.target.id]: e.target.value })
    }

    useEffect(() => {
        getAdminData(dispatch)
        getAll(dispatch)
        getAllHistory(dispatch)
    }, [])

    useEffect(() => {
        if (!cookies.get('user') || cookies.get('user').type !== 'Admin') navigate('/')
        setState({ ...state, ...admin })
    }, [admin])

    return (
        <Layout>
            <SEO title='Admin Dashboard' />
            <div className="wrapper profile-page">

                <Container fluid style={{ overflowX: 'hidden' }} className='pt-5 mt-5'>
                    <Row>
                        <Col className='d-flex align-items-center justify-content-center'>
                            <div className=''>
                                <h2 className='title mb-1'>Welcome Back Admin,</h2>
                                <h1>{admin?.name}</h1>
                            </div>
                        </Col>
                        <Col lg='6'>
                            <img src={dashboardImg} width='100%' />
                        </Col>
                    </Row>
                </Container>

                <section className="section">
                    <Container>
                        <Row className='d-flex align-items-center'>
                            <Col lg="8">
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
                                                        <label>Your Name</label>
                                                        <Input placeholder='Your Name'
                                                            value={state.name} id='name' onChange={onChange}
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
                                                        <label>Company</label>
                                                        <Input defaultValue="CreativeTim"
                                                            value={state.organization_name} id='organization_name' onChange={onChange}
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
                                            <th>Borrowed By</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {histories?.filter(item => !item.returned_date).map((item, index) => (
                                            <tr>
                                                <td className="text-center">{index + 1}</td>
                                                <td>{item.item.name}</td>
                                                <td>{`${new Date(item.borrow_date).toDateString()} : ${new Date(item.borrow_date).toLocaleTimeString()}`}</td>
                                                <td>{item.organization.organization_name}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                                <Button
                                    className="btn-round float-right"
                                    color="primary"
                                    data-placement="right"
                                    type="button"
                                    onClick={toggleModalReturn}
                                >
                                    Return Item
                                </Button>
                            </CardBody>
                        </Card>
                    </Container>
                </section>

                <Modal isOpen={state.returnModal} toggle={toggleModalReturn} size="sm">
                    <ModalHeader className="justify-content-center" toggle={toggleModalReturn}>
                        Return Item by Admin
                    </ModalHeader>
                    <ModalBody>
                        {state.returnModal && <QrReader
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

                <section className="section">
                    <Container>
                        <Card className="card-plain">
                            <CardHeader className=''>
                                <Row>
                                    <Col md=''></Col>
                                    <Col md='auto'>
                                        <h1 className="profile-title text-left">Item List</h1>
                                        <h5 className="text-on-back">04</h5>
                                    </Col>
                                </Row>
                            </CardHeader>
                            <CardBody>
                                <Table>
                                    <thead>
                                        <tr>
                                            <th className="text-center">#</th>
                                            <th>Item Name</th>
                                            <th>Available</th>
                                            <th>Input By</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {items?.map((item, index) => (
                                            <tr>
                                                <td className="text-center">{index + 1}</td>
                                                <td>{item.name}</td>
                                                <td>{item.available ? 'Yes' : 'No'}</td>
                                                <td>{item.input_by.name}</td>
                                                <td className='d-flex'>
                                                    <Button className="btn-round btn-icon mx-1"
                                                        onClick={() => {
                                                            setItem({ ...item, name: item.name, _id: item._id })
                                                            toggleModalEdit()
                                                        }}
                                                        color="primary"><i className='fa fa-search' /></Button>
                                                    <Button className="btn-round btn-icon mx-1"
                                                        onClick={() => {
                                                            setPrint({ ...item, name: item.name, _id: item._id })
                                                            toggleModalPrint()
                                                        }}
                                                        color="primary"><i className='fa fa-print' /></Button>
                                                </td>
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
                                    Add New
                                </Button>
                            </CardBody>
                        </Card>
                    </Container>
                </section>

                <Modal isOpen={state.printModal} toggle={toggleModalPrint} size="md">
                    <ModalHeader className="justify-content-center" toggle={toggleModalPrint}>
                        Print {print.name}
                    </ModalHeader>
                    <ModalBody className='mb-3 d-flex justify-content-center'>
                        <div ref={toPrintRef}>
                            <div className='d-flex p-3 border align-items-center' style={{ background: '#16183E', height: '230px', width: '400px' }}>
                                <QRCode value={print._id} bgColor='#16183E' fgColor='white' size={190} />
                                <div className='mx-3'>
                                    <h2>{print.name}</h2>
                                    <small>Printed at {new Date().toLocaleDateString()}</small><br />
                                    <small>by {admin?.name}</small> <br />
                                    <small>{admin?._id}</small>i
                                </div>
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button className='btn-round' onClick={toggleModalPrint}>Close</Button>
                        <ReactToPrint
                            trigger={() =>
                                <Button
                                    className="btn-round"
                                    color="primary"
                                    type="button"
                                    onClick={onPrint}
                                >
                                    Print Now
                                </Button>
                            }
                            content={() => toPrintRef.current}
                        />
                    </ModalFooter>
                </Modal>

                <Modal isOpen={state.editModal} toggle={toggleModalEdit} size="sm">
                    <ModalHeader className="justify-content-center" toggle={toggleModalEdit}>
                        Edit {item.name}
                    </ModalHeader>
                    <ModalBody>
                        <div className='d-flex justify-content-center mb-3'>
                            <QRCode value={item._id} size={230} />
                        </div>
                        <FormGroup>
                            <label>Item Name</label>
                            <Input
                                placeholder="Item Name"
                                onChange={onChangeItem}
                                id='name'
                                value={item.name}
                                className='bg-dark'
                                type="text"
                            />
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            className="btn-round"
                            color="danger"
                            type="button"
                            onClick={onDelete}
                        >
                            Delete
                        </Button>
                        <Button
                            className="btn-round"
                            color="primary"
                            type="button"
                            onClick={onEdit}
                        >
                            Edit
                        </Button>
                    </ModalFooter>
                </Modal>

                <Modal isOpen={state.addNewModal} toggle={toggleModalAdd} size="sm">
                    <ModalHeader className="justify-content-center" toggle={toggleModalAdd}>
                        Adding new Item
                    </ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <label>New Item Name</label>
                            <Input
                                placeholder="New Item Name"
                                onChange={onChangeItem}
                                id='name'
                                value={item.name}
                                className='bg-dark'
                                type="text"
                            />
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            className="btn-round"
                            color="primary"
                            type="button"
                            onClick={onInputNewItem}
                        >
                            Submit
                        </Button>
                    </ModalFooter>
                </Modal>

            </div>
        </Layout >
    )
}

export default connect(state => ({
    admin: state.admin.loggedIn,
    items: state.item.items,
    histories: state.history.histories
}), null)(Dashboard)
import React, { useEffect, useState } from 'react'
import { Layout, SEO } from '../components/index'
import classnames from "classnames";
// reactstrap components
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    CardImg,
    CardTitle,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Container,
    Row,
    Col
} from "reactstrap";

import { register } from '../../static/redux/Actions/admin'
import { connect } from 'react-redux'

const RegisterAdmin = props => {
    const { dispatch, navigate, error } = props

    const [input, setInput] = useState({
        name: '',
        email: '',
        password: '',
        nameFocus: false,
        emailFocus: false,
        passwordFocus: false,
        submited: false
    })

    const onChange = e => {
        setInput({ ...input, [e.target.id]: e.target.value })
    }

    const onSubmit = () => {
        register(dispatch, navigate, input)
        setInput({ ...input, submited: true })
    }

    return (
        <Layout>
            <SEO title='Register Admin' />
            <div className="wrapper register-page">
                <div className="page-header">
                    <div className="page-header-image" />
                    <div className="content">
                        <Container>
                            <Row className='d-flex justify-content-center'>
                                <Col md='5'>
                                    <Card className="card-register">
                                        <CardHeader>
                                            <CardImg
                                                alt="..."
                                                src={require("../assets/img/square-purple-1.png")}
                                            />
                                            <CardTitle tag="h4">Admin</CardTitle>
                                        </CardHeader>
                                        <CardBody className='mb-0'>
                                            <Form className="form mb-0">
                                                <InputGroup
                                                    className={classnames({
                                                        "input-group-focus": input.nameFocus
                                                    })}
                                                >
                                                    <InputGroupAddon addonType="prepend">
                                                        <InputGroupText>
                                                            <i className="tim-icons icon-single-02" />
                                                        </InputGroupText>
                                                    </InputGroupAddon>
                                                    <Input
                                                        value={input.name}
                                                        onChange={onChange}
                                                        id='name'
                                                        placeholder="Your Name"
                                                        type="text"
                                                        onFocus={e =>
                                                            setInput({ ...input, nameFocus: true })
                                                        }
                                                        onBlur={e =>
                                                            setInput({ ...input, nameFocus: false })
                                                        }
                                                    />
                                                </InputGroup>
                                                <InputGroup
                                                    className={classnames({
                                                        "input-group-focus": input.emailFocus
                                                    })}
                                                >
                                                    <InputGroupAddon addonType="prepend">
                                                        <InputGroupText>
                                                            <i className="tim-icons icon-email-85" />
                                                        </InputGroupText>
                                                    </InputGroupAddon>
                                                    <Input
                                                        value={input.email}
                                                        onChange={onChange}
                                                        id='email'
                                                        placeholder="Email"
                                                        type="email"
                                                        onFocus={e => setInput({ ...input, emailFocus: true })}
                                                        onBlur={e => setInput({ ...input, emailFocus: false })}
                                                    />
                                                </InputGroup>
                                                <InputGroup
                                                    className={classnames({
                                                        "input-group-focus": input.passwordFocus
                                                    })}
                                                >
                                                    <InputGroupAddon addonType="prepend">
                                                        <InputGroupText>
                                                            <i className="tim-icons icon-lock-circle" />
                                                        </InputGroupText>
                                                    </InputGroupAddon>
                                                    <Input
                                                        value={input.password}
                                                        onChange={onChange}
                                                        id='password'
                                                        placeholder="Password"
                                                        type="password"
                                                        onFocus={e =>
                                                            setInput({ ...input, passwordFocus: true })
                                                        }
                                                        onBlur={e =>
                                                            setInput({ ...input, passwordFocus: false })
                                                        }
                                                        onKeyDown={e => {
                                                            if (e.key === 'Enter') {
                                                                onSubmit()
                                                            }
                                                        }}
                                                    />
                                                </InputGroup>
                                            </Form>
                                            {(error && input.submited) && <div className='d-flex'>
                                                <small className='text-danger mx-auto'>{error}</small>
                                            </div>}
                                        </CardBody>
                                        <CardFooter className='mt-0'>
                                            <Button className="btn-round" color="primary" size="lg" onClick={onSubmit}>
                                                Register
                                            </Button>
                                        </CardFooter>
                                    </Card>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default connect(state => ({
    error: state.admin.error
}), null)(RegisterAdmin)
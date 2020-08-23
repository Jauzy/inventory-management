
import React, { useEffect, useState } from "react";
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

import { login } from '../../static/redux/Actions/organization'
import { connect } from 'react-redux'

const Login = (props) => {
    const { dispatch, navigate, error } = props
    const [state, setState] = useState({
        squares1to6: "",
        squares7and8: "",
    })

    const [input, setInput] = useState({
        email: '',
        password: '',
        emailFocus: false,
        passwordFocus: false,
        submited: false
    })

    const onChange = e => {
        setInput({ ...input, [e.target.id]: e.target.value })
    }

    const onSubmit = () => {
        login(dispatch, navigate, input)
        setInput({ ...input, submited: true })
    }

    const followCursor = event => {
        let posX = event.clientX - window.innerWidth / 2;
        let posY = event.clientY - window.innerWidth / 6;
        setState({
            ...state,
            squares1to6:
                "perspective(500px) rotateY(" +
                posX * 0.05 +
                "deg) rotateX(" +
                posY * -0.05 +
                "deg)",
            squares7and8:
                "perspective(500px) rotateY(" +
                posX * 0.02 +
                "deg) rotateX(" +
                posY * -0.02 +
                "deg)"
        });
    };

    useEffect(() => {
        document.documentElement.addEventListener("mousemove", followCursor);
    }, [])

    return (
        <Layout>
            <SEO title='Register' />
            <div className="wrapper register-page">
                <div className="page-header">
                    <div className="page-header-image" />
                    <div className="content">
                        <Container>
                            <Row>
                                <Col className="offset-lg-0 offset-md-3" lg="5" md="6">
                                    <div
                                        className="square square-7"
                                        id="square7"
                                        style={{ transform: state.squares7and8 }}
                                    />
                                    <div
                                        className="square square-8"
                                        id="square8"
                                        style={{ transform: state.squares7and8 }}
                                    />
                                    <Card className="card-register">
                                        <CardHeader>
                                            <CardImg
                                                alt="..."
                                                src={require("../assets/img/square-purple-1.png")}
                                            />
                                            <CardTitle tag="h4">Login</CardTitle>
                                        </CardHeader>
                                        <CardBody className='mb-0'>
                                            <Form className="form mb-0" autoComplete='off'>
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
                                                Get Started
                                            </Button>
                                        </CardFooter>
                                    </Card>
                                </Col>
                            </Row>
                            <div className="register-bg" />
                            <div
                                className="square square-1"
                                id="square1"
                                style={{ transform: state.squares1to6 }}
                            />
                            <div
                                className="square square-2"
                                id="square2"
                                style={{ transform: state.squares1to6 }}
                            />
                            <div
                                className="square square-3"
                                id="square3"
                                style={{ transform: state.squares1to6 }}
                            />
                            <div
                                className="square square-4"
                                id="square4"
                                style={{ transform: state.squares1to6 }}
                            />
                            <div
                                className="square square-5"
                                id="square5"
                                style={{ transform: state.squares1to6 }}
                            />
                            <div
                                className="square square-6"
                                id="square6"
                                style={{ transform: state.squares1to6 }}
                            />
                        </Container>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default connect(state => ({
    error: state.organization.error
}), null)(Login);

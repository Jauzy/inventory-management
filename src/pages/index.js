import React, { useEffect } from "react"
import { Layout, SEO } from '../components/index'
import { Link } from 'gatsby'

import {
  Card,
  CardBody,
  CardTitle,
  Container,
  Row,
  Col
} from "reactstrap";

import { getAdminCount } from '../../static/redux/Actions/admin'
import { getOrganizationCount } from '../../static/redux/Actions/organization'
import { getItemCount } from '../../static/redux/Actions/item'
import { getHistoryCount } from '../../static/redux/Actions/history'
import { connect } from 'react-redux'

const IndexPage = (props) => {
  const { dispatch, admins, histories, items, organizations } = props

  useEffect(() => {
    getAdminCount(dispatch)
    getHistoryCount(dispatch)
    getOrganizationCount(dispatch)
    getItemCount(dispatch)
  }, [])

  return (
    <Layout>
      <SEO title="Home" />
      <div className="wrapper landing-page" style={{ overflow: 'hidden' }}>
        <div className="page-header">
          <img
            alt="..."
            className="path"
            src={require("../assets/img/blob.png")}
          />
          <img
            alt="..."
            className="path2"
            src={require("../assets/img/path2.png")}
          />
          <img
            alt="..."
            className="shapes triangle"
            src={require("../assets/img/triunghiuri.png")}
          />
          <img
            alt="..."
            className="shapes wave"
            src={require("../assets/img/waves.png")}
          />
          <img
            alt="..."
            className="shapes squares"
            src={require("../assets/img/patrat.png")}
          />
          <img
            alt="..."
            className="shapes circle"
            src={require("../assets/img/cercuri.png")}
          />
          <div className="content-center">
            <Row className="row-grid justify-content-between align-items-center text-left">
              <Col lg="6" md="6">
                <h1 className="text-white">
                  We keep our inventory management easier to manage!
                </h1>
                <p className="text-white mb-3">
                  Like you can just scan the QR Code and see the result instantly!
                </p>
                <div className="btn-wrapper mb-3">
                  <p className="category text-success d-inline">
                    Let's Start Now
                  </p>
                  <Link
                    className="btn-link"
                    to="/login"
                  >
                    <i className="tim-icons icon-minimal-right" />
                  </Link>
                </div>
              </Col>
              <Col lg="4" md="5">
                <a href='#' style={{ cursor: 'unset' }}><i className='fa fa-database' style={{ fontSize: '20vw' }} /></a>
              </Col>
            </Row>
          </div>
        </div>
        <section className="section section-lg">
          <section className="section">
            <img
              alt="..."
              className="path"
              src={require("../assets/img/path4.png")}
            />
            <Container>
              <Row className="row-grid justify-content-between">
                <Col className="mt-lg-5" md="5">
                  <Row>
                    <Col className="px-2 py-2" lg="6" sm="12">
                      <Card className="card-stats">
                        <CardBody>
                          <Row>
                            <Col md="4" xs="5">
                              <div className="icon-big text-center icon-warning">
                                <i className="fa fa-box text-warning" />
                              </div>
                            </Col>
                            <Col md="8" xs="7">
                              <div className="numbers">
                                <CardTitle tag="p">{items}</CardTitle>
                                <p />
                                <p className="card-category">Items</p>
                              </div>
                            </Col>
                          </Row>
                        </CardBody>
                      </Card>
                    </Col>
                    <Col className="px-2 py-2" lg="6" sm="12">
                      <Card className="card-stats upper bg-default">
                        <CardBody>
                          <Row>
                            <Col md="4" xs="5">
                              <div className="icon-big text-center icon-warning">
                                <i className="fa fa-chart-bar text-white" />
                              </div>
                            </Col>
                            <Col md="8" xs="7">
                              <div className="numbers">
                                <CardTitle tag="p">{histories}</CardTitle>
                                <p />
                                <p className="card-category">Times Borrowed</p>
                              </div>
                            </Col>
                          </Row>
                        </CardBody>
                      </Card>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="px-2 py-2" lg="6" sm="12">
                      <Card className="card-stats">
                        <CardBody>
                          <Row>
                            <Col md="4" xs="5">
                              <div className="icon-big text-center icon-warning">
                                <i className="fa fa-users-cog text-info" />
                              </div>
                            </Col>
                            <Col md="8" xs="7">
                              <div className="numbers">
                                <CardTitle tag="p">{admins}</CardTitle>
                                <p />
                                <p className="card-category">Admins</p>
                              </div>
                            </Col>
                          </Row>
                        </CardBody>
                      </Card>
                    </Col>
                    <Col className="px-2 py-2" lg="6" sm="12">
                      <Card className="card-stats">
                        <CardBody>
                          <Row>
                            <Col md="4" xs="5">
                              <div className="icon-big text-center icon-warning">
                                <i className="fa fa-sitemap text-success" />
                              </div>
                            </Col>
                            <Col md="8" xs="7">
                              <div className="numbers">
                                <CardTitle tag="p">{organizations}</CardTitle>
                                <p />
                                <p className="card-category">Organizations</p>
                              </div>
                            </Col>
                          </Row>
                        </CardBody>
                      </Card>
                    </Col>
                  </Row>
                </Col>
                <Col md="6">
                  <div className="pl-md-5 mt-4">
                    <h1>
                      Easy to Use <br />
                      With Trusted Records!
                    </h1>
                    <p>
                      Client data is secured under Node Js Bcrypt Hashing System, that user safety is guaranteed.
                      </p>
                    <br />
                    <p>
                      Even so, System is made to meet user comfort and easy accessibility.
                      </p>
                    <br />
                    <Link
                      className="font-weight-bold text-info mt-5"
                      to="/register"
                    >
                      Register Now{" "}
                      <i className="tim-icons icon-minimal-right text-info" />
                    </Link>
                  </div>
                </Col>
              </Row>
            </Container>
          </section>
        </section>
        <section className="section section-lg">
          <img
            alt="..."
            className="path"
            src={require("../assets/img/path4.png")}
          />
          <img
            alt="..."
            className="path2"
            src={require("../assets/img/path5.png")}
          />
          <img
            alt="..."
            className="path3"
            src={require("../assets/img/path2.png")}
          />
          <Container>
            <Row className="justify-content-center">
              <Col lg="12">
                <h1 className="text-center">Steps to Start Using</h1>
                <Row className="row-grid justify-content-center">
                  <Col lg="3">
                    <div className="info">
                      <div className="icon icon-primary">
                        <i className="fa fa-sign-in-alt" />
                      </div>
                      <h4 className="info-title">Register and Login</h4>
                      <hr className="line-primary" />
                      <p>
                        Create new Account for your organizations and Login to start borrowing things.
                        </p>
                    </div>
                  </Col>
                  <Col lg="3">
                    <div className="info">
                      <div className="icon icon-warning">
                        <i className="fa fa-building" />
                      </div>
                      <h4 className="info-title">Go to F201</h4>
                      <hr className="line-warning" />
                      <p>
                        Go to F201, Gedung F 2nd Floor, and Ask someone there who registered to get permission to borrow things, then scan the item QR Code to procceed.
                        </p>
                    </div>
                  </Col>
                  <Col lg="3">
                    <div className="info">
                      <div className="icon icon-success">
                        <i className="tim-icons icon-single-02" />
                      </div>
                      <h4 className="info-title">Return the Item</h4>
                      <hr className="line-success" />
                      <p>
                        After you done using, go back to F201 and ask Admin to scan item QR Code to verify that you are already retuning the item you borrow.
                        </p>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        </section>
      </div>
    </Layout>
  )
}

export default connect(state => ({
  histories: state.history.count,
  admins: state.admin.count,
  organizations: state.organization.count,
  items: state.item.count
}), null)(IndexPage)

import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

const NotFoundPage = (props) => {
  return (
    <Layout>
      <SEO title="404: Not found" />
      <div style={{ height: '100vh' }} className='d-flex flex-column align-items-center justify-content-center'>
        <h1 style={{ fontSize: '100px' }}>4 0 4</h1>
        <h4>The Page you are looking for are not available right now!</h4>
      </div>
    </Layout>
  )
}


export default NotFoundPage

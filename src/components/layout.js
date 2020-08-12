import React from "react"
import { Navbar, Footer } from './index'
import LoadingOverlay from 'react-loading-overlay'
import { connect } from 'react-redux'

const Layout = (props) => {
  const { children, loading_admin, loading_org } = props
  return (
    <div>
      <LoadingOverlay spinner text='Loading Please Wait...' active={loading_admin || loading_org}>
        <Navbar />
        {children}
        <Footer />
      </LoadingOverlay>
    </div>
  )
}

export default connect(state => ({
  loading_admin: state.admin.loading,
  loading_org: state.organization.loading
}), null)(Layout)

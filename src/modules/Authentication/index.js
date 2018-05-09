import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Register from './Register'
import Login from './Login'
import logo from '../../images/logo_escom.png'
import * as Types from '../../types'
import Api from '../../api'
import './Authentication.css'

class Authenticate extends Component {

  constructor(props) {
    super(props)
    this.handleLogin = this.handleLogin.bind(this)
    this.handleRegister = this.handleRegister.bind(this)
    this.changeTab = this.changeTab.bind(this)
    this.state = {
      referrer: this.setReferrer(this.props.location),
      activeTab: Types.LOGIN
    }
  }

  setReferrer(location) {
    return (location.state && location.state.referrer) ? (
      location.state.referrer.pathname
    ) :
      '/app' // Default route to redirect after login
  }

  handleLogin (values) {
    Api.login(values).then((token) => {
      this.props.loadApp(token)
      this.props.history.replace(this.state.referrer)
    }).catch((error) => {
      console.log('Error!', error)
    })
  }

  handleRegister (values) {
    Api.register(values).then((token) => {
      this.props.loadApp(token)
      this.props.history.replace(this.state.referrer)
    }).catch((error) => {
      console.log('Error!', error)
    })
  }

  changeTab (newTab, e) {
    e.preventDefault()

    this.setState({
      activeTab: newTab
    })
  }

  render() {

    let renderedTab

    switch(this.state.activeTab) {
      case Types.LOGIN:
        renderedTab = <Login handleSubmit={this.handleLogin} goTo={this.changeTab}/>
        break
      case Types.REGISTER:
        renderedTab = <Register handleSubmit={this.handleRegister} goTo={this.changeTab}/>
        break
      default:
        renderedTab = <h1>Not found</h1>
    }

    return (
      <div className="app login-page">
        <div className="form">
          <img src={logo} className="App-logo" alt="logo ESCOM" />
          { renderedTab }
        </div>
      </div>
    )
  }
}

Authenticate.propTypes = {
  loadApp: PropTypes.func,
}

export default Authenticate

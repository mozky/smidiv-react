import React, { Component } from 'react'

import ModifyIcon from 'react-icons/lib/md/settings'
import LogoutIcon from 'react-icons/lib/md/exit-to-app'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import './Header.css'

class Header extends Component {

  render() {
    return (
      <header id="Header" className="masthead clear">
        <div className="navbar area">
          <h1 className="brand"><Link to="/app" id="brand">SMIDIV</Link><span className="aluminio big-font">&nbsp;&nbsp;&nbsp;Bienvenido {this.props.username}</span></h1>
          <nav id="navigation" className="list">
            <Link to="/app/configuracion"><ModifyIcon className="clickable aluminio icon-small" /></Link>
            <a className="item clickable" onClick={() => this.props.handleLogout()}><LogoutIcon className="clickable aluminio icon-small" /></a>
          </nav>
          <button data-collapse data-target="#navigation" className="toggle">
            <span className="icon"></span>
          </button>
        </div>
      </header>
    )
  }

}

Header.propTypes = {
  username: PropTypes.string,
  handleLogout: PropTypes.func
}

export default Header

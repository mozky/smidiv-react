import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Header.css';

class Header extends Component {

  render() {
    return (
      <header className="masthead clear">
        <div className="navbar area">
          <h1 className="brand"><Link to="/app">SMIDIV</Link> - Bienvenido {this.props.username}</h1>
          <nav id="navigation" className="list">
            <a className="item -link" onClick={() => this.props.handleLogout()}>Cerrar Sesión</a>
          </nav>
          <button data-collapse data-target="#navigation" className="toggle">
            <span className="icon"></span>
          </button>
        </div>
      </header>
    );
  }

}

Header.propTypes = {
  username: PropTypes.string,
  handleLogout: PropTypes.func
};

export default Header;

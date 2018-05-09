import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as Types from '../../../types';

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };

    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  handleUsernameChange(event) {
    event.preventDefault();
    this.setState({username: event.target.value});
  }

  handlePasswordChange(event) {
    event.preventDefault();
    this.setState({password: event.target.value});
  }

  render() {
    return (
      <form className="login-form">
        <input type="text" placeholder="usuario" value={this.state.username} onChange={this.handleUsernameChange} />

        <input type="password" placeholder="contraseña" value={this.state.password} onChange={this.handlePasswordChange}/>
        <button type="button" className="azul" onClick={() => this.props.handleSubmit(this.state)}>
          Iniciar Sesión
        </button>
        <p className="message">No tienes usuario? <a title="Haz click para ir a la página de registro" className="clickable" onClick={(e) => this.props.goTo(Types.REGISTER, e)}>Crea una cuenta</a></p>
      </form>
    );
  }
}

Login.propTypes = {
  handleSubmit: PropTypes.func,
  goTo: PropTypes.func,
};

export default Login;

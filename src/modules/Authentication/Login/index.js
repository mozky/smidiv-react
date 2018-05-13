import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as Types from '../../../types'

export default class Login extends Component {

  constructor(props) {
    super(props)
    this.state = {
      username: {
        value: '',
        error: false
      },
      password: {
        value: '',
        error: false
      }
    }
  }

  handleInputChange = (event) => {
    event.preventDefault()
    this.setState({
      [event.target.name]: {
        value: event.target.value,
        error: false
      }
    })
  }

  handleSendButtom = (event) => {
    event.preventDefault()
    const { username, password } = this.state
    const errors = {}

    if (username.value === '') {
      errors['username'] = {
        value: '',
        error: 'usuario requerido'
      }
    }

    if (password.value === '') {
      errors['password'] = {
        value: '',
        error: 'contraseña requerida'
      }
    }
    
    if (Object.keys(errors).length > 0) {
      this.setState(errors)
    } else {
      this.props.handleSubmit({
        username: username.value,
        password: password.value
      })
    }
  }

  render() {
    const { username, password } = this.state

    return (
      <form className="login-form">
        <input type="text" name="username" placeholder={username.error || "usuario"} value={username.value} onChange={this.handleInputChange} 
          className={username.error ? 'error' : '' } />
        <input type="password" name="password" placeholder={password.error || "contraseña"} value={password.value} onChange={this.handleInputChange}
          className={password.error ? 'error' : '' } />
        <button type="button" className="azul" onClick={this.handleSendButtom}>
          Iniciar Sesión
        </button>
        <p className="message">No tienes usuario? <a title="Haz click para ir a la página de registro" className="clickable blue" onClick={(e) => this.props.goTo(Types.REGISTER, e)}>Crea una cuenta</a></p>
      </form>
    );
  }
}

Login.propTypes = {
  handleSubmit: PropTypes.func,
  goTo: PropTypes.func,
}

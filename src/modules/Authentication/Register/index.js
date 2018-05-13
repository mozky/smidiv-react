import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as Types from '../../../types'

export default class Register extends Component {

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
      },
      passwordRepeat: {
        value: '',
        error: false
      },
      email: {
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

  handleSendButton = (event) => {
    event.preventDefault()
    const { username, password, passwordRepeat, email } = this.state
    const errors = {}

    if (username.value === '') {
      errors['username'] = {
        value: '',
        error: 'usuario requerido'
      }
    }

    if (email.value === '') {
      errors['email'] = {
        value: '',
        error: 'correo electrónico requerido'
      }
    }

    if (password.value === '' || passwordRepeat.value === '') {
      errors['password'] = {
        value: '',
        error: 'contraseña requerida'
      }

      errors['passwordRepeat'] = {
        value: '',
        error: 'repetir contraseña'
      }
    } else if (password.value !== passwordRepeat.value) {
      errors['password'] = {
        value: '',
        error: 'contraseñas diferentes'
      }

      errors['passwordRepeat'] = {
        value: '',
        error: true
      }
    }
    
    if (Object.keys(errors).length > 0) {
      this.setState(errors)
    } else {
      this.props.handleSubmit({
        username: username.value,
        password: password.value,
        email: email.value
      })
    }
  }

  render() {
    const { username, password, passwordRepeat, email } = this.state

    return (
      <form className="register-form">
        <input type="text" name="username" placeholder={username.error || "usuario"} value={username.value} onChange={this.handleInputChange}
          className={username.error ? 'error' : '' } />
        <input type="email" name="email" placeholder={email.error || "correo electrónico"} value={email.value} onChange={this.handleInputChange}
          className={email.error ? 'error' : '' } />
        <input type="password" name="password" placeholder={password.error || "contraseña"} value={password.value} onChange={this.handleInputChange}
          className={password.error ? 'error' : '' } />
        <input type="password" name="passwordRepeat" placeholder="repetir contraseña" value={passwordRepeat.value} onChange={this.handleInputChange}
          className={passwordRepeat.error ? 'error' : '' } />
        <button type="button" onClick={this.handleSendButton}>
          Register
        </button>
        <p className="message">Ya tienes cuenta? <a title="Click to go login page" className="blue clickable" onClick={(e) => this.props.goTo(Types.LOGIN, e)}>Iniciar Sesión</a></p>
      </form>
    )
  }
}

Register.propTypes = {
  handleSubmit: PropTypes.func,
  goTo: PropTypes.func,
}

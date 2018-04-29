import React, { Component } from 'react'
import Modal from '../Common/Modal'

export default class EditUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: {},
            nombre: '',
            apellidos: '',
            fechaNacimiento: '',
            correoElectronico: '',
            contraseña: '',
            repetirContraseña: ''
        }
    }

    handleChange = (event) => {
      this.setState({[event.target.name]: event.target.value})
    }
  
    handleSubmit = (event) => {
      event.preventDefault()

      const { nombre, apellidos, fechaNacimiento, correoElectronico, contraseña, repetirContraseña } = this.state
      
      if (contraseña !== repetirContraseña) {
        return this.setState({
            hasError: {
                email: true
            }
        })
      }
      
      this.props.onSummit({
        nombre,
        apellidos
      })
    }
  
    render() {
        const { user } = this.props

        const modalContent = (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Marca:
                    <input type="text" value={this.state.marca} name='marca' onChange={this.handleChange} />
                </label>
                <label>
                    Modelo:
                    <input type="text" value={this.state.modelo} name='modelo' onChange={this.handleChange} />
                </label>
                <label>
                    Placa:
                    <input type="text" value={this.state.placas} name='placas' onChange={this.handleChange} />
                </label>
                <input type="submit" value="Submit" />
            </form>
        ) 

        return (
            <Modal
                title="Editar Usuario"
                content={modalContent}
            >
                {this.props.children}
            </Modal>
        )
    }
}
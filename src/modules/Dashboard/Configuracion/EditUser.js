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
        apellidos,
        fechaNacimiento,
        correoElectronico,
        contraseña,
        repetirContraseña
      })
    }
  
    render() {
        const { nombre, apellidos, fechaNacimiento, correoElectronico, contraseña, repetirContraseña } = this.props

        const modalContent = (
            <div id="editUserForm">
                <div className="formRow">
                    <label>
                        <span>Nombre</span>
                        <input type="text" value={nombre} name='nombre' onChange={this.handleChange} />
                    </label>
                    <label>
                        <span>Apellidos</span>
                        <input type="text" value={apellidos} name='apellidos' onChange={this.handleChange} />
                    </label>
                </div>
                <div className="formRow">
                    <label>
                     <span>Fecha de nacimiento</span>
                        <input type="text" value={fechaNacimiento} name='fechaNacimiento' onChange={this.handleChange} />
                    </label>
                    <label>
                         <span>Correo electrónico</span>
                        <input type="text" value={correoElectronico} name='correoElectronico' onChange={this.handleChange} />
                    </label>
                </div>
                <div className="formRow">
                    <label>
                     <span>Contraseña</span>
                        <input type="text" value={contraseña} name='contraseña' onChange={this.handleChange} />
                    </label>
                    <label>
                         <span>Repetir contraseña</span>
                        <input type="text" value={repetirContraseña} name='repetirContraseña' onChange={this.handleChange} />
                    </label>
                </div>
                <div className="formButton">
                    <div style={styles.button} onClick={this.handleSubmit}>Modificar usuario</div>
                </div>
            </div>
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

const styles = {
    button: {
        cursor: 'pointer',
        color: '#fff',
        backgroundColor: '#4484CE',
        padding: '1em 2em',
        marginTop: '1em'
    }
}
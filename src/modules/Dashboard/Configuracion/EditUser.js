import React, { Component } from 'react'
import Modal from '../Common/Modal'

export default class EditUser extends Component {
    constructor(props) {
        super(props)
        this.closeRef = React.createRef()
        this.state = {
            hasError: {},
            nombre: props.user.profile ? props.user.profile.firstName : '',
            apellidos: props.user.profile ? props.user.profile.lastName : '',
            fechaNacimiento: props.user.profile ? props.user.profile.birthday : '',
            correoElectronico: props.user.email,
            contraseña: '',
            repetirContraseña: ''
        }
    }

    handleChange = (event) => {
      this.setState({
          [event.target.name]: event.target.value
        })
    }
  
    handleSubmit = (event) => {
        event.preventDefault()

        const request = {}
        const { nombre, apellidos, fechaNacimiento, correoElectronico, contraseña, repetirContraseña } = this.state

        if (contraseña !== repetirContraseña) {
            return this.setState({
                hasError: {
                    email: true
                }
            })
        }

        if (nombre)
            request.nombre = nombre

        if (apellidos)
            request.apellidos = apellidos

        if (fechaNacimiento)
            request.fechaDeNacimiento = fechaNacimiento

        if (correoElectronico)
            request.correoElectronico = correoElectronico

        if (contraseña)
            request.contraseña = contraseña
        
        this.props.onSummit(request)
        .then((response) => {
            this.closeRef.current.closeModal()
        }).catch((error) => {
            console.log('error', error)
        })
    }

    formatDate = (date) => {
        const d = new Date(date)
        const year = d.getFullYear()
        let month = '' + (d.getMonth() + 1)
        let day = '' + d.getDate()
    
        // if (month.length < 2)
        //     month = '0' + month
        // if (day.length < 2)
        //     day = '0' + day
    
        return [year, month, day].join('-');
    }
  
    render() {
        const { nombre, apellidos, fechaNacimiento, correoElectronico, contraseña, repetirContraseña } = this.state

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
                        <input type="date" value={this.formatDate(fechaNacimiento)} name='fechaNacimiento' onChange={this.handleChange} />
                    </label>
                    <label>
                         <span>Correo electrónico</span>
                        <input type="email" value={correoElectronico} name='correoElectronico' onChange={this.handleChange} />
                    </label>
                </div>
                <div className="formRow">
                    <label>
                     <span>Contraseña</span>
                        <input type="password" value={contraseña} name='contraseña' onChange={this.handleChange} />
                    </label>
                    <label>
                         <span>Repetir contraseña</span>
                        <input type="password" value={repetirContraseña} name='repetirContraseña' onChange={this.handleChange} />
                    </label>
                </div>
                <div className="formButton">
                    <div style={styles.button} onClick={this.handleSubmit}>Modificar usuario</div>
                </div>
            </div>
        ) 

        return (
            <Modal
                ref={this.closeRef}
                title="Editar Usuario"
                content={modalContent}
                width="35%"
                height="46%"
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
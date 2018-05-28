import React, { Component } from 'react'

import Modal from '../Common/Modal'

export default class AddAlarma extends Component {
    constructor(props) {
        super(props)
        this.modalRef = React.createRef()
        this.state = {
            tipo: 'ubicacion',
            nombre: '',
            ubicacion: '',
            inicio: '',
            fin: ''
        }
    }
  
    handleChange = (event) => {
      this.setState({[event.target.name]: event.target.value})
    }
  
    handleSubmit = (event) => {
        event.preventDefault()
        const { tipo, nombre, ubicacion, inicio, fin } = this.state

        if (nombre && (ubicacion || (inicio && fin))) {
            const datos = {
                nombre
            }
    
            if (tipo === 'ubicacion') {
                datos.ubicacionFav = ubicacion
            }

            if (tipo === 'horario') {
                datos.inicio = inicio
                datos.fin = fin
            }

            console.log(datos)
    
            this.props.onSummit(datos)
            .then((response) => {
                this.modalRef.current.closeModal()
                this.setState({
                    tipo: 'ubicacion',
                    nombre: '',
                    ubicacion: '',
                    inicio: '',
                    fin: ''
                })
            })
            .catch((error) => {
                console.log('error', error)
            })
        }
    }

  
    render() {
        const { tipo, nombre } = this.state
        const { ubicaciones } = this.props

        const listaUbicaciones = (
            <div style={styles.formFieldRow}>
                <select name="ubicacion" onChange={this.handleChange}>
                    <option key="default">Selecciona una...</option>
                    { 
                        ubicaciones.map((ubicacion) => {
                            return <option key={ubicacion._id} value={ubicacion.nombre}>{ubicacion.nombre}</option>
                        }) 
                    }
                </select>
            </div>
        )

        const rangoHorarios = (
            <div style={styles.formFieldRow}>
                    <label >
                        <span>Desde: </span>
                        <input type="time" name="inicio" onChange={this.handleChange} />
                    </label>
                    <label>
                        <span>Hasta: </span>
                        <input type="time" name="fin" onChange={this.handleChange} />
                    </label>
            </div>
        )

        const modalContent = (
            <div id="addAlarmaForm" style={styles.formContainer}>
                <div style={styles.formFieldRow}>
                    <input style={styles.formField} placeholder="Ingresa un nombre..." type="text" value={nombre} name='nombre' onChange={this.handleChange} />
                </div>
                <div style={styles.formFieldRow}>
                    <label >
                        <span>Ubicacion</span>
                        <input type="radio" value="ubicacion" name="tipo" onChange={this.handleChange} checked={tipo === 'ubicacion'} />
                    </label>
                    <label>
                        <span>Horario</span>
                        <input type="radio" value="horario" name="tipo" onChange={this.handleChange} checked={tipo === 'horario'} />
                    </label>
                </div>
                { tipo === 'ubicacion' && listaUbicaciones }
                { tipo === 'horario' && rangoHorarios }
                <div style={styles.formRow}>
                    <div style={styles.button} onClick={this.handleSubmit}>Guardar</div>
                </div>
            </div>
        )

        return (
            <Modal
                ref={this.modalRef}
                content={modalContent}
                title={"Crear alarma"}
                width="30%"
                height="33%"
            >
                {this.props.children}
            </Modal>
        )
    }
}

const styles = {
  formContainer: {
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'center',
    alignItems: 'center'
  },
  formRow: {
    width: '100%',
    marginBottom: '15px',
  },
  formFieldRow: {
    width: '350px',
    margin: 'auto',
    display: 'flex',
    paddingBottom: '1.5em',
    justifyContent: 'space-around'
  },
  formField: {
    outline: 0,
    background: '#f2f2f2',
    width: '100%',
    border: 0,
    padding: '15px',
    fontSize: '14px',
    height: '45px',
  },
  button: {
    cursor: 'pointer',
    color: '#fff',
    backgroundColor: '#4484CE',
    padding: '1em 2em',
    marginTop: '1em',
    width: '120px',
    margin: 'auto'
  }
}
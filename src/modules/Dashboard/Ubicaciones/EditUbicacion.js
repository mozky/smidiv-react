import React, { Component } from 'react'
import { Map, Marker } from 'google-maps-react'

import Modal from '../Common/Modal'

import Crosshair from '../../../images/crosshair.gif'

export default class EditUbicacion extends Component {
    constructor(props) {
      super(props)
      this.closeRef = React.createRef()
      this.state = {
        center: {},
        zoom: 11,
        nombre: '',      }
    }
  
    handleChange = (event) => {
      this.setState({[event.target.name]: event.target.value})
    }
  
    handleSubmit = (event) => {
        event.preventDefault()

        const { nombre, center } = this.state

        if (nombre || (center.lat && center.lng)) {
            this.props.onSummit({
                ubicacionId: this.props.ubicacion._id,
                nombre,
                center
            }).then((response) => {
                console.log('editsubmited!', response)
                this.closeRef.current.closeModal()
                this.setState({
                    nombre: '',
                    center: {}
                })
            }).catch((error) => {
            console.log('error', error)
            })
        }
    }

    centerMoved = (mapProps, map) => {
      this.setState({
        center: {
          lat: map.center.lat(),
          lng: map.center.lng()
        }
      })
    }
  
    render() {
        const modalContent = (
            <div id="editLocationForm" style={styles.formContainer}>
                <div style={Object.assign({}, styles.formRow, styles.formFieldRow)}>
                    <input style={styles.formField} placeholder="Ingresa el nuevo nombre..." type="text" value={this.state.nombre} name='nombre' onChange={this.handleChange} />
                </div>
                <div className="ubicacionMap" style={Object.assign({}, styles.formRow, styles.mapContainer)}>
                    <Map style={styles.map} google={this.props.google} zoom={this.state.zoom} onDragend={this.centerMoved} initialCenter={this.props.ubicacion.ubicacion}>
                        <Marker 
                            position={this.state.center.lat ? this.state.center : this.props.ubicacion.ubicacion}
                            icon={Crosshair}
                        />
                    </Map>
                </div>
                <div style={styles.formRow}>
                    <div style={styles.button} onClick={this.handleSubmit}>Guardar</div>
                </div>
            </div>
        )

        return (
            <Modal
                ref={this.closeRef}
                content={modalContent}
                title={`Editar ubicación - ${this.props.ubicacion.nombre}`}
                width="50%"
                height="66%"
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
  },
  formField: {
    outline: 0,
    background: '#f2f2f2',
    width: '100%',
    border: 0,
    padding: '15px',
    fontSize: '14px',
    height: '45px',
    margin: '1em'
  },
  mapContainer: {
    height: '400px',
    width: '800px',
    maxWidth: '100%'
  },
  map: {
    height: '400px',
    width: '800px',
    maxWidth: '100%'
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
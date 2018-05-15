import React, { Component } from 'react'
import { Map } from 'google-maps-react'

import Modal from '../Common/Modal'

export default class AddUbicacion extends Component {
    constructor(props) {
        super(props);
        this.mapRef = React.createRef()
        this.state = {
            center: {
              lat: 59.95,
              lng: 30.33
            },
            zoom: 11,
            nombre: '',
            lat: '',
            lon: ''
        }
    }
  
    handleChange = (event) => {
      this.setState({[event.target.name]: event.target.value})
    }
  
    handleSubmit = (event) => {
      event.preventDefault()

      const { marca, modelo, placas, identificadorSmidiv } = this.state
      this.props.onSummit({
        marca,
        modelo,
        placas,
        identificadorSmidiv
      })
    }
  
    render() {
      const modalContent = (
        <div id="addLocationForm">
          <div className="formRow">
            <label>
              <span>Nombre</span>
              <input type="text" value={this.state.marca} name='marca' onChange={this.handleChange} />
            </label>
          </div>
          <div className="formRow" style={{width: '100%', height: '250px', maxHeight: '400px', marginBottom: '14px'}}>
            <Map style={{width: '100%', height: '400px'}} google={this.props.google} zoom={this.state.zoom}></Map>
          </div>
          <div className="formButton">
            <div style={styles.button} onClick={this.handleSubmit}>Guardar</div>
          </div>
        </div>
      )

      return (
          <Modal
            content={modalContent}
            title={"Añadir ubicación"}
            width="50%"
            height="75%"
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
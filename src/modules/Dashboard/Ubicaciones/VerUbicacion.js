import React, { Component } from 'react'
import { Map, Marker } from 'google-maps-react'

import Modal from '../Common/Modal'

export default class VerUbicacion extends Component {
    constructor(props) {
      super(props);
      this.state = {
        initialCenter: {
          lat: 19.432608,
          lng: -99.133209
        },
        zoom: 11,
        nombre: '',
        closeModal: false
      }
    }
  
    render() {
      const modalContent = (
        <div id="addLocationForm" style={styles.formContainer}>
          <div className="ubicacionMap" style={Object.assign({}, styles.formRow, styles.mapContainer)}>
            <Map style={styles.map} google={this.props.google} zoom={16} initialCenter={this.props.center}>
              <Marker
                title={this.props.nombre}
                name={this.props.nombre}
                position={this.props.center}
              />
            </Map>
          </div>
        </div>
      )

      return (
          <Modal
            closeModal={this.state.closeModal}
            content={modalContent}
            title={`Ubicación favorita - ${this.props.nombre}`}
            width="50%"
            height="52%"
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
  mapContainer: {
    height: '400px',
    width: '800px',
    maxWidth: '100%'
  },
  map: {
    height: '400px',
    width: '800px',
    maxWidth: '100%'
  }
}
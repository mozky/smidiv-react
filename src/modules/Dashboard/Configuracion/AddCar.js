import React, { Component } from 'react'
import Modal from '../Common/Modal'


export default class AddCar extends Component {
    constructor(props) {
        super(props)
        this.closeRef = React.createRef()
        this.state = {
            marca: '',
            modelo: '',
            placas: '',
            smidivID: ''
        }
    }
  
    handleChange = (event) => {
      this.setState({[event.target.name]: event.target.value})
    }
  
    handleSubmit = (event) => {
      event.preventDefault()

      const { marca, modelo, placas, smidivID } = this.state
      this.props.onSummit({
        marca,
        modelo,
        placas,
        smidivID
      }).then((response) => {
        this.closeRef.current.closeModal()
        this.setState({
          marca: '',
          modelo: '',
          placas: '',
          smidivID: ''
        })
      }).catch((error) => {
        console.log('error', error)
      })
    }
  
    render() {
      const modalContent = (
        <div id="addCarForm">
        <div className="formRow">
          <label>
            <span>Marca</span>
            <input type="text" value={this.state.marca} name='marca' onChange={this.handleChange} />
          </label>
          <label>
            <span>Modelo</span>
            <input type="text" value={this.state.modelo} name='modelo' onChange={this.handleChange} />
          </label>
        </div>
        <div className="formRow">
          <label>
            <span>Placa</span>
            <input type="text" value={this.state.placas} name='placas' onChange={this.handleChange} />
          </label>
          <label>
            <span>Identificador SMIDIV</span>
            <input type="text" value={this.state.smidivID} name='smidivID' onChange={this.handleChange} />
          </label>
        </div>
        <div className="formButton">
          <div style={styles.button} onClick={this.handleSubmit}>Agregar automóvil</div>
        </div>
      </div>
      )

      return (
          <Modal
            ref={this.closeRef}
            content={modalContent}
            title={"Añadir vehículo"}
            width="35%"
            height="38%"
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
      marginTop: '1em',
      padding: '1em 2em'
  }
}
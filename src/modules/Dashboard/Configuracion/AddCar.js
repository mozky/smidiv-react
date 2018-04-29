import React, { Component } from 'react'

export default class AddCar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            marca: '',
            modelo: '',
            placas: ''
        }
    }
  
    handleChange = (event) => {
      this.setState({[event.target.name]: event.target.value})
    }
  
    handleSubmit = (event) => {
        event.preventDefault()
        this.props.onSummit(this.state)
    }
  
    render() {
      return (
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
    }
}
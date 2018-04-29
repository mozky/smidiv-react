import React, { Component } from 'react'
import ReactModal from 'react-modal'

ReactModal.setAppElement('#root')

export default class Modal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalIsOpen: false,
        }
    }

    openModal = () => {
      this.setState({modalIsOpen: true})
    }

    closeModal = () => {
      this.setState({modalIsOpen: false})
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
        const { content, title, children } = this.props
        return (
            <div onClick={this.openModal}>
                <ReactModal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                >
                    <h2 ref={subtitle => this.subtitle = subtitle}>{title}</h2>
                    <button onClick={this.closeModal}>close</button>
                    {content}
                </ReactModal>
                {children}
            </div>
        )
    }
}

const customStyles = {
    overlay: {
        backgroundColor: 'papayawhip'
    },
    content: {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)'
    }
}
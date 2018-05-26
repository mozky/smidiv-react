import React, { Component } from 'react'
import ReactModal from 'react-modal'
import IconClose from 'react-icons/lib/md/close'

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

    styles = {
        modalStyles: {
            overlay: {
                backgroundColor: 'rgba(0, 0, 0, 0.5)'
            },
            content: {
                borderRadius: '1px',
                top: '50%',
                left: '50%',
                maxWidth: '75vw',
                width: this.props.width || '500px',
                height: this.props.height || '100%',
                right: 'auto',
                bottom: 'auto',
                marginRight: '-50%',
                transform: 'translate(-50%, -50%)'
            }
        },
        modalHeader: {
            display: 'flex',
            flexFlow: 'row nowrap',
            justifyContent: 'space-between',
            fontSize: '1.6em',
            paddingBottom: '1em',
            color: '#444'
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        return (nextProps.closeModal && prevState.modalIsOpen) ? 
            { modalIsOpen: false }
        :
            null
    }
  
    render() {
        const { content, title, children } = this.props
        return (
            <div>
                <ReactModal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeModal}
                    style={this.styles.modalStyles}
                >
                    <div style={this.styles.modalHeader}>
                        <div>{title}</div>
                        <IconClose className={'clickable'} onClick={this.closeModal}></IconClose>
                    </div>
                    { content }
                </ReactModal>
                <div onClick={this.openModal}>
                    {children}
                </div>
            </div>
        )
    }
}
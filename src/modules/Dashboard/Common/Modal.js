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
  
    render() {
        const { content, title, children } = this.props
        return (
            <div onClick={this.openModal}>
                <ReactModal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeModal}
                    style={styles.modalStyles}
                >
                    <div style={styles.modalHeader}>
                        <div ref={subtitle => this.subtitle = subtitle}>{title}</div>
                        <IconClose className={'clickable'} onClick={this.closeModal}></IconClose>
                    </div>
                    { content }
                </ReactModal>
                {children}
            </div>
        )
    }
}

const styles = {
    modalStyles: {
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)'
        },
        content: {
            borderRadius: '1px',
            top: '50%',
            left: '50%',
            maxWidth: '75vw',
            width: '500px',
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
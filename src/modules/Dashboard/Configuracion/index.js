import React, { Component } from 'react'
import CarIcon from 'react-icons/lib/md/directions-car'
import UserIcon from 'react-icons/lib/md/person'
import SettingsIcon from 'react-icons/lib/md/settings'
import AddIcon from 'react-icons/lib/md/add-circle'
import Api from '../../../api'

import AddCar from './AddCar'

import './Configuracion.css'

export default class Configuracion extends Component {
    constructor(props) {
        super(props)
        this.state = {
            addingCar: false
        }
    }

    addNewCar = () => {
        console.log('hey')
        this.setState({
            addingCar: true
        })
    }

    handleAddNewCar = (values) => {
        Api.vehiclePost(Object.assign(values, { username: this.props.user.username})).then((car) => {
            console.log(car)
        }).catch((error) => {
            console.log('Error!', error)
        })
    }

    render() {
        const { user } = this.props

        let content
        this.state.addingCar ? (
            content = (
                <AddCar username={ user.username } onSummit={this.handleAddNewCar}/>
            )
        ) : (
            content = (
                <div id = "Configuracion-menu">
                    <div className="settings">
                        <CarIcon className="ubicaciones-icon-big gris" />
                        <div id="carSettings">
                            <AddIcon className="ubicaciones-icon-clickable verde" onClick={() => this.addNewCar()} />
                            <SettingsIcon className="ubicaciones-icon-clickable amarillo" />
                        </div>
                    </div>
                    <div className="settings">
                        <UserIcon className="ubicaciones-icon-big gris" />
                        <SettingsIcon className="ubicaciones-icon-clickable amarillo" />
                    </div>
                </div>
            )
        )

        return (
            <div id="Configuracion">
                { content }                
            </div>
        )
    }
}
import React, { Component } from 'react'
import CarIcon from 'react-icons/lib/md/directions-car'
import UserIcon from 'react-icons/lib/md/person'
import SettingsIcon from 'react-icons/lib/md/settings'
import AddIcon from 'react-icons/lib/md/add-circle'
import Api from '../../../api'

import EditUser from './EditUser'
import AddCar from './AddCar'

import './Configuracion.css'

export default class Configuracion extends Component {
    handleAddNewCar = (values) => {
        Api.vehiclePost(Object.assign(values, { username: this.props.user.username})).then((car) => {
            console.log(car)
        }).catch((error) => {
            console.log('Error!', error)
        })
    }

    handleUserEdit = (values) => {
        console.log('TODO - Add user edit:', values)
    }

    render() {
        return (
            <div id = "Configuracion-menu">
                <div className="settings">
                    <CarIcon className="ubicaciones-icon-big gris" />
                    <div id="carSettings">
                        <AddCar onSummit={this.handleAddNewCar}>
                            <AddIcon className="ubicaciones-icon-clickable verde" />
                        </AddCar>
                        <SettingsIcon className="ubicaciones-icon-clickable amarillo" />
                    </div>
                </div>
                <div className="settings">
                    <UserIcon className="ubicaciones-icon-big gris" />
                    <EditUser onSummit={this.handleUserEdit} user={this.props.user}>
                        <SettingsIcon className="ubicaciones-icon-clickable amarillo" />
                    </EditUser>
                </div>
            </div>
        )
    }
}
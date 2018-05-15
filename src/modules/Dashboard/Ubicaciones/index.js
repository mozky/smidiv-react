import React, { Component } from 'react'
import ReactTable from 'react-table'
import DeleteIcon from 'react-icons/lib/md/delete'
import AddIcon from 'react-icons/lib/md/add-circle'
import ModifyIcon from 'react-icons/lib/md/settings'
import LocationIcon from 'react-icons/lib/md/location-on'

import AddUbicacion from './AddUbicacion'

import 'react-table/react-table.css'
import './Ubicaciones.css'

export default class Ubicaciones extends Component {
    render() {
        const data = [{
            id: 1
        }, {
            id: 2
        }, {
            id: 3
        }, {
            id: 4
        }, {
            id: 5
        }]

        const columnas = [{
            Header: 'Ubicacion',
            accessor: 'id',
            width: 150
        }, {
            Header: 'Modificar',
            Cell: () => <ModifyIcon className="clickable amarillo icon" />
        }, {
            Header: 'Eliminar',
            Cell: () => <DeleteIcon className="clickable rojo icon" />
        }, {
            Header: 'Mapa',
            Cell: () => <LocationIcon className="clickable azul icon" />
        }]

        return (
            <div id="Historial">
                <div className="title-container">
                    <div className="titulo">Gestión de ubicaciones</div>
                    <AddUbicacion google={this.props.google}>
                        <AddIcon className="titulo-icon clickable verde icon"/>
                    </AddUbicacion>
                </div>
                <div className="tabla">
                    <ReactTable showPagination={false} defaultPageSize={5} data={data} columns={columnas} />
                </div>
            </div>
        )
    }
}
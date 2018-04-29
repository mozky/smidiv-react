import React, { Component } from 'react'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import DeleteIcon from 'react-icons/lib/md/delete'
import ModifyIcon from 'react-icons/lib/md/settings'
import LocationIcon from 'react-icons/lib/md/location-on'

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
                <div className="titulo">Gestión de ubicaciones</div>
                {/* <DeleteIcon /> */}
                <div className="tabla">
                    <ReactTable showPagination={false} defaultPageSize={5} data={data} columns={columnas} />
                </div>
            </div>
        )
    }
}
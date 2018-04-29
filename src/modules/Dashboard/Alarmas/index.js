import React, { Component } from 'react'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import DeleteIcon from 'react-icons/lib/md/delete'
import ModifyIcon from 'react-icons/lib/md/settings'
import AlarmOffIcon from 'react-icons/lib/md/alarm-off'

import './Alarmas.css'

export default class Historial extends Component {
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
            Header: 'Alarma',
            accessor: 'id',
            width: 150
        }, {
            Header: 'Modificar',
            accessor: 'id',
            Cell: () => <ModifyIcon className="clickable amarillo icon" />
        }, {
            Header: 'Silenciar',
            accessor: 'id',
            Cell: () => <AlarmOffIcon className="clickable azul icon" />
        }, {
            Header: 'Eliminar',
            accessor: 'id',
            Cell: () => <DeleteIcon className="clickable rojo icon" />
        }]

        return (
            <div id="Historial">
                <div className="titulo">Gestión de alarmas</div>
                <div className="tabla">
                    <ReactTable showPagination={false} defaultPageSize={5} data={data} columns={columnas} />
                </div>
            </div>
        )
    }
}
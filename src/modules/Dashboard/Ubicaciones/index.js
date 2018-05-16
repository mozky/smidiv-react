import React, { Component } from 'react'
import ReactTable from 'react-table'
import DeleteIcon from 'react-icons/lib/md/delete'
import AddIcon from 'react-icons/lib/md/add-circle'
import ModifyIcon from 'react-icons/lib/md/settings'
import LocationIcon from 'react-icons/lib/md/location-on'

import AddUbicacion from './AddUbicacion'
import Api from '../../../api'

import 'react-table/react-table.css'
import './Ubicaciones.css'

export default class Ubicaciones extends Component {
    constructor(props) {
        super(props)
        this.state = {
            ubicaciones: []
        }
    }

    componentDidMount() {
        this.getUbicaciones()
    }

    getUbicaciones = () => {
        Api.ubicacionFavGet(this.props.user.username)
        .then((response) => {
            this.setState({
                ubicaciones: response.ubicaciones
            })
        })
        .catch((err) => {
            console.log(err)
        })
    }

    handleNewUbicacion = (values) => {
        values.username = this.props.user.username
        return new Promise((resolve, reject) => {
            Api.ubicacionFavPost(values)
            .then(response => {
                resolve(response)
                this.getUbicaciones()
            })
            .catch(err => {
                console.log(err)
                reject(err)
            })
        })
    }

    deleteUbicacionFav = (ubicacionId) => {
        Api.ubicacionFavDelete(ubicacionId)
        .then(response => {
            this.getUbicaciones()
        }).catch(err => {
            console.log(err)
        })
    }

    render() {
        const columnas = [{
            Header: 'Ubicacion',
            accessor: 'nombre',
            width: 250
        }, {
            Header: 'Modificar',
            Cell: () => <ModifyIcon className="clickable amarillo icon" />
        }, {
            Header: 'Eliminar',
            accessor: '_id',
            Cell: (accessor) => <DeleteIcon className="clickable rojo icon" onClick={() => this.deleteUbicacionFav(accessor.value)} />
        }, {
            Header: 'Mapa',
            Cell: () => <LocationIcon className="clickable azul icon" />
        }]

        return (
            <div id="Historial">
                <div className="title-container">
                    <div className="titulo">Gestión de ubicaciones</div>
                    <AddUbicacion onSummit={this.handleNewUbicacion} google={this.props.google}>
                        <AddIcon className="titulo-icon clickable verde icon"/>
                    </AddUbicacion>
                </div>
                <div className="tabla">
                    <ReactTable
                        showPagination={true}
                        defaultPageSize={10}
                        data={this.state.ubicaciones}
                        columns={columnas}
                        previousText={'Anterior'}
                        nextText={'Siguiente'}
                        loadingText={'Cargando...'}
                        noDataText={'Sin datos'}
                        pageText={'Página'}
                        ofText={'de'}
                        rowsText={'filas'}
                    />
                </div>
            </div>
        )
    }
}
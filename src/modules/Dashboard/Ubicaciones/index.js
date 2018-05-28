import React, { Component } from 'react'
import ReactTable from 'react-table'
import DeleteIcon from 'react-icons/lib/md/delete'
import AddIcon from 'react-icons/lib/md/add-circle'
import ModifyIcon from 'react-icons/lib/md/settings'
import LocationIcon from 'react-icons/lib/md/location-on'

import AddUbicacion from './AddUbicacion'
import VerUbicacion from './VerUbicacion'
import EditUbicacion from './EditUbicacion'
import Api from '../../../api'

import 'react-table/react-table.css'
import './Ubicaciones.css'

export default class Ubicaciones extends Component {
    constructor(props) {
        super(props)
        this.verUbicacionRef = React.createRef()
        this.editUbicacionRef = React.createRef()
        this.state = {
            ubicacionActiva: ''
        }
    }

    handleNewUbicacion = (values) => {
        values.username = this.props.bundle.user.username
        return new Promise((resolve, reject) => {
            Api.ubicacionFavPost(values)
            .then(response => {
                resolve(response)
                this.props.bundle.refreshData()
            })
            .catch(err => {
                console.log(err)
                reject(err)
            })
        })
    }

    handleEditUbicacion = (values) => {
        return new Promise((resolve, reject) => {
            Api.ubicacionFavPatch(values)
            .then(response => {
                resolve(response)
                this.props.bundle.refreshData()
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
            this.props.bundle.refreshData()
        }).catch(err => {
            console.log(err)
        })
    }

    setUbicacionActiva = (nombreUbicacion, callback) => {
        Object.entries(this.props.bundle.ubicaciones).forEach(ubicacion => {
            if (ubicacion[1].nombre === nombreUbicacion) {
                this.setState({
                    ubicacionActiva: ubicacion[1]
                }, callback)
            }
        })
    }

    toggleVerUbicacionModal = (nombreUbicacion) => {
        this.setUbicacionActiva(nombreUbicacion, this.verUbicacionRef.current.click())
    }

    toggleEditUbicacionModal = (nombreUbicacion) => {
        console.log(nombreUbicacion, 'edit')
        this.setUbicacionActiva(nombreUbicacion, this.editUbicacionRef.current.click())
    }

    render() {
        const columnas = [{
            Header: 'Ubicación',
            accessor: 'nombre',
            width: 250
        }, {
            Header: 'Latitud',
            accessor: 'ubicacion.lat',
            width: 250
        }, {
            Header: 'Longitud',
            accessor: 'ubicacion.lng',
            width: 250
        }, {
            Header: 'Mapa',
            id: '_id',
            Cell: (accessor) => <LocationIcon onClick={() => this.toggleVerUbicacionModal(accessor.original.nombre)} className="clickable azul icon" />
        }, {
            Header: 'Modificar',
            id: '_id',
            Cell: (accessor) => <ModifyIcon onClick={() => this.toggleEditUbicacionModal(accessor.original.nombre)} className="clickable amarillo icon" />
        }, {
            Header: 'Eliminar',
            accessor: '_id',
            Cell: (accessor) => <DeleteIcon className="clickable rojo icon" onClick={() => this.deleteUbicacionFav(accessor.value)} />
        }]

        return (
            <div id="Ubicaciones" className="DashboardPage">
                <VerUbicacion nombre={this.state.ubicacionActiva.nombre} center={this.state.ubicacionActiva.ubicacion} google={this.props.google}>
                    <span ref={this.verUbicacionRef}></span>
                </VerUbicacion>
                <EditUbicacion onSummit={this.handleEditUbicacion} ubicacion={this.state.ubicacionActiva} google={this.props.google}>
                    <span ref={this.editUbicacionRef}></span>
                </EditUbicacion>
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
                        data={this.props.bundle.ubicaciones}
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
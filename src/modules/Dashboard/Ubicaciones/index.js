import React, { Component } from 'react'
import ReactTable from 'react-table'
import DeleteIcon from 'react-icons/lib/md/delete'
import AddIcon from 'react-icons/lib/md/add-circle'
import ModifyIcon from 'react-icons/lib/md/settings'
import LocationIcon from 'react-icons/lib/md/location-on'

import AddUbicacion from './AddUbicacion'
import VerUbicacion from './VerUbicacion'
import Api from '../../../api'

import 'react-table/react-table.css'
import './Ubicaciones.css'

export default class Ubicaciones extends Component {
    constructor(props) {
        super(props)
        this.verUbicacionRef = React.createRef();
        this.state = {
            ubicaciones: [],
            ubicacionActiva: ''
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

    toggleVerUbicacionModal = (nombreUbicacion) => {
        Object.entries(this.state.ubicaciones).forEach(ubicacion => {
            if (ubicacion[1].nombre === nombreUbicacion) {
                this.setState({
                    ubicacionActiva: ubicacion[1]
                })
            }
        })

        this.verUbicacionRef.current.click()
    }

    render() {
        const columnas = [{
            Header: 'Ubicacion',
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
            id: 'ubicacion',
            Cell: (accessor) => <LocationIcon onClick={() => this.toggleVerUbicacionModal(accessor.original.nombre)} className="clickable azul icon" />
        }, {
            Header: 'Modificar',
            Cell: () => <ModifyIcon className="clickable amarillo icon" />
        }, {
            Header: 'Eliminar',
            accessor: '_id',
            Cell: (accessor) => <DeleteIcon className="clickable rojo icon" onClick={() => this.deleteUbicacionFav(accessor.value)} />
        }]

        return (
            <div id="Historial">
                <VerUbicacion nombre={this.state.ubicacionActiva.nombre} center={this.state.ubicacionActiva.ubicacion} google={this.props.google}>
                    <span ref={this.verUbicacionRef}></span>
                </VerUbicacion>
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
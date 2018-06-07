import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import AnchorLink from 'react-anchor-link-smooth-scroll'

import Api from '../../api'
import './Landing.css'

import hero from '../../images/hero.jpg'
import node from '../../images/node.png'
import react from '../../images/react.png'
import android from '../../images/android.png'
import arduino from '../../images/arduino.svg'
import arduino2 from '../../images/arduino.jpeg'
import android2 from '../../images/android.jpeg'
import web from '../../images/web.jpeg'
import server from '../../images/servidor.jpeg'
import qrDoc from '../../images/qrDocumento.png'
import qrMan from '../../images/qrManual.png'
import docker from '../../images/docker.png'
import aws from '../../images/aws.png'



export default class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apiStatus: false,
      showTopButton: false,
      displayImageArduino: false,
      displayImageAndroid: false,
      displayImageWeb: false,
      displayImageServer: false
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', this.scrollTracker)
    this.timerID = setInterval(
      () => this.getApiStatus(),
      2000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  getApiStatus(values) {
    Api.health().then((response) => {
      const parsedReponse = JSON.parse(response)
      console.log(parsedReponse)
      if (parsedReponse.status && parsedReponse.status === 'ok') {
        this.setState({apiStatus: 'OK'})
      }
    }).catch((error) => {
      this.setState({apiStatus: 'ERROR'});
      console.log('API error', error);
    })
  }

  scrollTracker = () => {
    const curState = this.state.showTopButton
    if ((document.body.scrollTop > 100 || document.documentElement.scrollTop > 100)) {
      if (!curState)
        this.setState({showTopButton: true})
    } else {
      if (curState)
        this.setState({showTopButton: false})
    }
  }

  backToTop = () => {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; 
  }

  render() {
    return(
      <div id="Landing">
        <AnchorLink href="#header" style={{display: this.state.showTopButton ? 'block' : 'none'}} id="topBtn" title="Go to top">⬆</AnchorLink>

        <header id="header" className="l">
          <h2 className="l">SMIDIV</h2>
          <nav className="l">
            <li><AnchorLink href="#features" className="l">Sistema SMIDIV</AnchorLink></li>
            <li><AnchorLink href="#reviews" className="l">Nosotros</AnchorLink></li>
            <li><AnchorLink href="#contact" className="l">TT A-072</AnchorLink></li>
          </nav>
        </header>

        <section className="l hero">
          <div className="background-image" style={{backgroundImage: `url(${hero})`}}></div>
          <h1>Sistema Modular para la Integración de Dispositivos Inteligentes en Vehículos, por medio del puerto OBD‐II</h1>
          <h3>Trabajo Terminal A-072</h3>
          {this.state.apiStatus ?
              <Link to="/app"><button id="enter_button" className="btn clickable" >Entrar</button></Link>
            :
              <button id="enter_button" className="btn clickable" disabled={true}>Conectando...</button>
        }
          <div className="descargarAPP"></div>
          <a id="linkDocumento" className="blanco" href="https://drive.google.com/open?id=1AyY2cw3gY-DG8SsBO1HKtM62j_dlE0YM" target="_blank" rel="noopener noreferrer">Aplicación Android</a>
          <hr className="lineaAndroid"/>
          
        </section>

        <section className="l">
        <h3 className="title">Agenda</h3>
        <div className="contenidoAgenda">
          <ul className="listaAgenda"> 
            <li>Planteamiento del problema​</li>
            <li>Propuesta de solución​</li>
            <li>Objetivo</li>
            <li>Arquitectura del sistema​</li>
            <li>Pruebas​</li>
            <li>Resultados​</li>
            <li>Conclusiones​</li>
            <li>Trabajo futuro</li>
          </ul> 
        
          <div className="imagenAgenda"></div>

        </div>
        </section>

        <section className="l sectionPlanteamiento">
          <h3 className="title tituloW">Planteamiento del problema</h3>
          <div className="contenidoCentrado">
            <ul> 
              <li>¿Actualmente cómo obtenemos información del vehículo?​</li>
              <li>¿​Estas formas funcionan?</li>
              <li>¿Sabes en donde está tu automóvil?​</li>
              <li>¿Sabes por qué tu automóvil no prende?​</li>
            </ul> 
          </div>
        </section>

        <section className="l">
          <h3 className="title">Solución propuesta</h3>
          <div className="contenidoCentrado">
            <span className="txtCentrado">El presente sistema brindará al usuario un sistema capaz de desplegar información en poco tiempo sobre el estado del automóvil, así como coadyuvar a la pronta localización del mismo,  tomar datos de geolocalización del automóvil para mostrarla al usuario y que él pueda definir una alarma en caso de movimiento.</span>
            <div className="imagenSolucion"></div>
          </div>
        </section>

        <section className="l sectionObjetivo" >
          <h3 className="title tituloW absoluteObjetivo">Objetivo</h3>
          <div className="contenidoCentrado">
            <span className="txtCentrado tituloW">Desarrollar un sistema capaz de mostrar indicadores como el estado del motor, alternador, bujías, radiador, temperatura y velocidad de un automóvil compatible con el puerto OBD2, para facilitar el mantenimiento y detección de movimiento por medio de geolocalización para el beneficio de los conductores de éste en la Ciudad de México.</span>
            <div className="contenedorImagenes">
              <div className="checkEngine"></div>
              <div className="maps"></div>
            </div>
          </div>
        </section>

        <section id="features" className="l features">
          <h3 className="title">Sistema SMIDIV</h3>
          <p>Tecnologías utilizadas</p>
          <hr className="l"/>

          <ul className="grid l">
            <li>
              <img src={arduino} alt="arduino logo" className="moduleLogo"  onClick={() => this.setState({displayImageArduino: true})}/>
              { this.state.displayImageArduino ? 
                <img src={arduino2} className="pops" onClick={() => this.setState({displayImageArduino: false})}/>
              :
                null
              }
              <h4>Módulo Arduino</h4>
              <p>Librería OBD-II del fabricante​, documentacion SIM808​ ,costo de desarrollo.</p>
            </li>
            <li>
              <img src={node} alt="node js logo" className="moduleLogo" onClick={() => this.setState({displayImageServer: true})}/>
              { this.state.displayImageServer ? 
                <img src={server} className="pops" onClick={() => this.setState({displayImageServer: false})}/>
              :
                null
              }
              <h4>Servidor Central</h4>
              <p>Javascript​, swagger​, mongoose, facilidad de deployment a producción</p>
            </li>
            <li>
              <img src={react} alt="react js logo" className="moduleLogo" onClick={() => this.setState({displayImageWeb: true})}/>
              { this.state.displayImageWeb ? 
                <img src={web} className="pops" onClick={() => this.setState({displayImageWeb: false})}/>
              :
                null
              }
              <h4>Aplicación Web</h4>
              <p>Javascript​, arquitectura de componentes​, facilidad de llamar al servidor central​</p>
            </li>
            <li>
              <img src={android} alt="android logo" className="moduleLogo" onClick={() => this.setState({displayImageAndroid: true})}/>
              { this.state.displayImageAndroid ? 
                <img src={android2} className="pops" onClick={() => this.setState({displayImageAndroid: false})}/>
              :
                null
              }
              <h4>Aplicación Móvil</h4>
              <p>Numero de usuarios, costo de desarrollo, lenguaje Java</p>
            </li>
          </ul>


          <ul className="grid l despliegue">
            <li>
              <img src={docker} alt="docker logo" className="moduleLogo"/>
              <h4>Docker</h4>
              <p>Automatiza el despliegue de la aplicacion dentro de contenedores </p>
            </li>

            <li>
              <img src={aws} alt="docker logo" className="moduleLogo"/>
              <h4>EC2</h4>
              <p>Computación escalable en la nube de Amazon Web Services (AWS)</p>

            </li>
          </ul>
        </section>

        <section className="l">
          <h3 className="title">Arquitectura del sistema</h3>
          <div className="contenidoCentrado">
            <div className="imagenArquitectura"></div>
          </div>
        </section>

        <section className="l sectionPruebas">
          <h3 className="title tituloW">Pruebas</h3>
          <div className="contenidoCentrado">
            <div>Videos</div>
          </div>
        </section>

        <section className="l">
          <h3 className="title">Resultados</h3>
          <div className="contenidoCentrado">
            {/* <div className="imagenArquitectura"></div> */}
          </div>
        </section>

        <section className="l sectionConclusiones">
          <h3 className="title tituloW">Conclusiones</h3>
          <div className="contenidoCentrado">
            {/* <div className="imagenArquitectura"></div> */}
          </div>
        </section>

        <section className="l sectionTFuturo">
          <h3 className="title">Trabajo a futuro</h3>
          <div className="contenidoCentrado">          
            <ul className="listaAgenda"> 
              <li>MACHINE LEARNING CON IOT ​</li>
              <li>PREDICCIÓN DE EVENTOS​</li>
              <li>DETECCIÓN DE CATASTROFES IOT</li>
            </ul> 
            <div className="imagenIOT"></div>
          </div>
        </section>


        <section id="contact" className="l contact">
          <h3 className="title">Trabajo Terminal 2017 A-072</h3>

          <img src={qrDoc} alt="QR Logo" className="QR"/>	
          <a id="linkDocumento" className="azulH" href="https://drive.google.com/open?id=1JLDHA6bCvHFXpjzZ6bh-wscd5c1twbhlNaV5jKuVqFk" target="_blank" rel="noopener noreferrer">Documento en línea</a>
          <hr className="l"/>
          
          <img src={qrMan} alt="QR Manual" className="QR"/>
          <a id="linkDocumento" className="azulH" href="https://drive.google.com/open?id=1i3T8OKFrA8G_H5lPpK3TGtVx9Po2CSbppIxdMik6IM8" target="_blank" rel="noopener noreferrer">Manual de usuario</a>
          <hr className="l"/>
          
        </section>

        <footer className="l">
          <p>ESCOM 2018</p>
          <p>TODOS LOS DERECHOS RESERVADOS</p>
        </footer>
      </div>
    )
  }
}

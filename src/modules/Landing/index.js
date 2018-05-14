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

export default class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apiStatus: false,
      showTopButton: false,
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
        </section>

        <section id="features" className="l features">
          <h3 className="title">Sistema SMIDIV</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id felis et ipsum bibendum ultrices. Morbi vitae pulvinar velit. Sed aliquam dictum sapien, id sagittis augue malesuada eu.</p>
          <hr className="l"/>

          <ul className="grid l">
            <li>
              <img src={arduino} alt="arduino logo" className="moduleLogo" />
              <h4>Módulo Arduino</h4>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id felis et ipsum bibendum ultrices vitae pulvinar velit.</p>
            </li>
            <li>
              <img src={node} alt="node js logo" className="moduleLogo" />
              <h4>Servidor Central</h4>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id felis et ipsum bibendum ultrices vitae pulvinar velit.</p>
            </li>
            <li>
              <img src={react} alt="react js logo" className="moduleLogo" />
              <h4>Aplicación Web</h4>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id felis et ipsum bibendum ultrices vitae pulvinar velit.</p>
            </li>
            <li>
              <img src={android} alt="android logo" className="moduleLogo" />
              <h4>Aplicación Móvil</h4>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id felis et ipsum bibendum ultrices vitae pulvinar velit.</p>
            </li>
          </ul>
        </section>


        <section id="reviews" className="l reviews">
          <h3 className="title">Nosotros</h3>

          <p className="quote">Mauris sit amet mauris a arcu eleifend ultricies eget ut dolor. className aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</p>
          <p className="author">— García Guerra Jorge Adrián</p>

          <p className="quote">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id felis et ipsum bibendum ultrices. Morbi vitae pulvinar velit. Sed aliquam dictum sapien, id sagittis augue malesuada eu.</p>
          <p className="author">— Muñoz Peñaloza Erick</p>

          <p className="quote">Donec commodo dolor augue, vitae faucibus tortor tincidunt in. Aliquam vitae leo quis mi pulvinar ornare. Integer eu iaculis metus.</p>
          <p className="author">— Suárez Lárraga Javier</p>
        </section>


        <section id="contact" className="l contact">
          <h3 className="title">Trabajo Terminal 2017 A-072</h3>	
          <a id="linkDocumento" className="azulH" href="https://docs.google.com/document/d/1E6HxZzhglHsb08cchLdDYE0tO7ooVxYUGT_RJWKC73w/edit?usp=sharing" target="_blank" rel="noopener noreferrer">Documento en línea</a>
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

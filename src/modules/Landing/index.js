import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Api from '../../api';
import './Landing.css';

import hero from '../../images/hero.jpg'

export default class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apiStatus: 'Conectando...',
      showTopButton: false,
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', this.scrollTracker)
    this.timerID = setInterval(
      () => this.getApiStatus(),
      5000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  getApiStatus(values) {
    Api.health().then((response) => {
      console.log(response)
      this.setState({apiStatus: response});
    }).catch((error) => {
      this.setState({apiStatus: 'unreachable'});
      console.log('API health error', error);
    })
  }

  scrollTracker = () => {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      this.setState({showTopButton: true})
    } else {
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
        <button onClick={this.backToTop} style={{display: this.state.showTopButton ? 'block' : 'none'}} id="topBtn" title="Go to top">Top</button>

        {/* <h3>Servidor: {this.state.apiStatus}</h3> */}
        <header className="l">
          <Link to ="/"><h2 className="l">SMIDIV</h2></Link>
          <nav className="l">
            <li><a href="#features" className="l">Products</a></li>
            <li><a href="#reviews" className="l">About</a></li>
            <li><a href="#contact" className="l">Contacts</a></li>
          </nav>
        </header>

        <section className="l hero">
          <div className="background-image" style={{backgroundImage: `url(${hero})`}}></div>
          <h1>Sistema Modular para la integración de dispositivos inteligentes en vehículos</h1>
          <h3>Trabajo Terminal #A072</h3>
          <Link to="/app"><button id="enter_button" className="btn clickable">Entrar</button></Link>
        </section>

        <section id="features" className="l features">
          <h3 className="title">Features and services</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id felis et ipsum bibendum ultrices. Morbi vitae pulvinar velit. Sed aliquam dictum sapien, id sagittis augue malesuada eu.</p>
          <hr className="l"/>

          <ul className="grid l">
            <li>
              <i className="fa fa-camera-retro"></i>
              <h4>Photography</h4>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id felis et ipsum bibendum ultrices vitae pulvinar velit.</p>
            </li>
            <li>
              <i className="fa fa-cubes"></i>
              <h4>Web Development</h4>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id felis et ipsum bibendum ultrices vitae pulvinar velit.</p>
            </li>
            <li>
              <i className="fa fa-newspaper-o"></i>
              <h4>Content Editing</h4>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id felis et ipsum bibendum ultrices vitae pulvinar velit.</p>
            </li>
          </ul>
        </section>


        <section id="reviews" className="l reviews">
          <h3 className="title">What others say:</h3>

          <p className="quote">Mauris sit amet mauris a arcu eleifend ultricies eget ut dolor. className aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</p>
          <p className="author">— Patrick Farrell</p>

          <p className="quote">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id felis et ipsum bibendum ultrices. Morbi vitae pulvinar velit. Sed aliquam dictum sapien, id sagittis augue malesuada eu.</p>
          <p className="author">— George Smith</p>

          <p className="quote">Donec commodo dolor augue, vitae faucibus tortor tincidunt in. Aliquam vitae leo quis mi pulvinar ornare. Integer eu iaculis metus.</p>
          <p className="author">— Kevin Blake</p>
        </section>


        <section id="contact" className="l contact">
          <h3 className="title">Join our newsletter</h3>	
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id felis et ipsum bibendum ultrices. Morbi vitae pulvinar velit. Sed aliquam dictum sapien, id sagittis augue malesuada eu.</p>
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

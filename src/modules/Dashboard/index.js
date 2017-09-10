import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { AdminRoute, PropsRoute } from '../Helpers'
import Header from './Header'
import Footer from './Footer'
import About from './About'

class Dashboard extends Component {

  constructor(props) {
    super(props)
    this.state = {
      layout: 'FullWidthLayout'
    }
  }

  render() {
    const routes = (
        <div style={{width: '100%'}}>
          <Route exact path={this.props.match.url} render={() => <div>SMIDIV!</div>} />
          <Route exact path={`${this.props.match.url}/404`} render={() => <div>TODO: 404 page</div>} />
          <Route exact path={`${this.props.match.url}/about`} component={About}/>
        </div>
    )

    switch (this.state.layout) {
      // case 'SidebarLayout':
      //   return (
      //     <div className="app dashboard">
      //       <Header username={this.props.user.username} handleLogout={this.props.handleLogout} />
      //       <SidebarLayout user={this.props.user} isAdmin={this.props.admin}>
      //         {routes}
      //       </SidebarLayout>
      //       <Footer />
      //     </div>
      //   )
      case 'FullWidthLayout':
        return (
          <div className="app dashboard">
            <Header username={this.props.user.username} handleLogout={this.props.handleLogout} />
            <main className="centered">
              <div className="main-area">
              {routes}
              </div>
            </main>
            <Footer />
          </div>
        )
      default:
        return (
          <div className="app dashboard">
            <h1>Layout error</h1>
          </div>
        )
    }
  }
}

export default Dashboard

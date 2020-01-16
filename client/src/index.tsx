import React from 'react'
import Root from 'react-div-100vh'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import { ToastProvider } from 'react-toast-notifications'
import AnimalEdit from './components/pages/AnimalEdit/AnimalEdit'
import AnimalsHome from './components/pages/AnimalsHome/AnimalsHome'
import './index.scss'
import * as backend from './services/backend'
import * as i18n from './services/i18n'
import * as serviceWorker from './serviceWorker'

const SERVER_URL = process.env.SERVER_URL ?? 'http://localhost:8080'

const routes = (
  <Switch>
    <Redirect exact from='/' to='/animals' />
    <Route exact path='/animals'><AnimalsHome /></Route>
    <Route exact path='/animals/:id'><AnimalEdit /></Route>
  </Switch >
)

const app = (
  <ToastProvider>
    <Root>
      <Router>{routes}</Router>
    </Root>
  </ToastProvider>
)

const launch = async () => {
  await Promise.all([
    i18n.init(),
    backend.init(SERVER_URL),
  ])

  ReactDOM.render(app, document.getElementById('root'))
  // If you want your app to work offline and load faster, you can change
  // unregister() to register() below. Note this comes with some pitfalls.
  // Learn more about service workers: https://bit.ly/CRA-PWA
  serviceWorker.unregister()
}

launch()

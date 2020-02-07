import React from 'react'
import Root from 'react-div-100vh'
import ReactDOM from 'react-dom'
import 'react-image-crop/dist/ReactCrop.css'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import { ToastProvider } from 'react-toast-notifications'
import AnimalEdit from './components/_pages/AnimalEdit/AnimalEdit'
import AnimalsHome from './components/_pages/AnimalsHome/AnimalsHome'
import Contact from './components/_pages/Contact/Contact'
import MembersHome from './components/_pages/MembersHome/MembersHome'
import './index.scss'
import * as i18n from './services/i18n'
import * as serviceWorker from './serviceWorker'

const routes = (
  <Switch>
    <Redirect exact from='/' to='/animals' />
    <Route exact path='/animals'><AnimalsHome /></Route>
    <Route exact path='/animals/:id'><AnimalEdit /></Route>
    <Route exact path='/members'><MembersHome /></Route>
    <Route exact path='/contact'><Contact /></Route>
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
  ])

  ReactDOM.render(app, document.getElementById('root'))
  // If you want your app to work offline and load faster, you can change
  // unregister() to register() below. Note this comes with some pitfalls.
  // Learn more about service workers: https://bit.ly/CRA-PWA
  serviceWorker.unregister()
}

launch()

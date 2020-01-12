import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import AnimalForm from './components/AnimalForm/AnimalForm'
import Layout from './components/Layout/Layout'
import AnimalsHome from './components/pages/pages/AnimalsHome/AnimalsHome'
import './index.scss'
import * as i18n from './services/i18n'
import * as serviceWorker from './serviceWorker'

const animal = {
  _id: '1',
  name: `patan`,
  species: 'dog',
  // gender: 'M',
  age: 22,
  size: 'S',
  info: 'he is an asshole',
  image: 'http://1.bp.blogspot.com/-PQ-kJmbBuH8/VPvK0ZHfF_I/AAAAAAAAAgw/VCVTEYzMHEQ/s1600/Pier%2BNodoyuna%2By%2BPatan%2Bcon%2Bsus%2BMaquinas%2BVoladoras2.jpg',
} as const

const routes = (
  <Switch>
    <Redirect exact from='/' to='/animals' />
    <Route exact path='/layoutTest'><Layout>
      <p>Body
      ... <br />
        ... <br />
        ... <br />
        ... <br />
        ... <br />
        ... <br />
        ... <br />
        ... <br />
        ... <br />
        ... <br />
        ... <br />
        ... <br />
        ... <br />
        ... <br />
        ... <br />
        ... <br />
        ... <br />
        ... <br />
        ... <br />
        ... <br />
        ... <br />
        ... <br />
        ... <br />
        ... <br />
        ... <br />
        ... <br />
        ... <br />
        ... <br />
        ... <br />
        ... <br />
        ... <br />
        ... <br />
        ... <br />
        ... <br />
        ... <br />
        ... <br />
        ... <br />
        ... <br />
        ... <br />
        ... <br />
        ... <br />
        ... <br />
        ... <br />


        A very long one...</p>
    </Layout></Route>
    <Route exact path='/animals' component={AnimalsHome} />
    <Route exact path='/animal'><AnimalForm animal={animal} /></Route>
    <Redirect to='/' />
  </Switch >
)

const launch = async () => {
  await Promise.all([
    i18n.init(),
  ])

  ReactDOM.render(<Router>{routes}</Router>, document.getElementById('root'))
  // If you want your app to work offline and load faster, you can change
  // unregister() to register() below. Note this comes with some pitfalls.
  // Learn more about service workers: https://bit.ly/CRA-PWA
  serviceWorker.unregister()
}

launch()

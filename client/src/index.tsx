import React from 'react'
import ReactDOM from 'react-dom'
import Animal from '../../model/Animal'
import AnimalList from './components/AnimalList/AnimalList'
import './index.scss'
import * as serviceWorker from './serviceWorker'

const allAnimals: Animal[] = [
  {
    name: 'patan',
    species: 'dog',
    gender: 'M',
    age: 22,
    size: 'S',
    info: 'he is an asshole',
    image: 'https://definicion.de/wp-content/uploads/2013/02/patan.jpg',
  },
  {
    name: 'garfield',
    species: 'cat',
    gender: 'M',
    age: 14,
    size: 'M',
    info: 'he is an asshole',
    image: 'https://www.eluniversal.com.mx/sites/default/files/styles/f03-651x400/public/2017/06/20/garfield_historia_real2_0.jpg?itok=VG458aDv',
  },
]

ReactDOM.render(<AnimalList animals={allAnimals} />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()

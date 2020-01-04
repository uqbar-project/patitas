import React from 'react'
import Animal from '../../../../model/Animal'
import $ from './AnimalList.module.scss'

type Props = {
  animals: Animal[]
}

export default ({ animals }: Props) => (
  <div className={$.AnimalList}>{animals.map(animal => (
    <div className={$.image} key={animal.name}>
      <img src={animal.image} />
      <label>{animal.name}</label>
    </div>
  ))}</div>
)
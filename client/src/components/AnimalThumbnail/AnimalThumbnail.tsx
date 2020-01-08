import React from 'react'
import Animal from '../../../../model/Animal'
import $ from './AnimalThumbnail.module.scss'

type Props = {
  animal: Animal
}

export default ({ animal }: Props) => (
  <div className={$.container}>
    <img src={animal.image} alt={animal.name} />
    <label>{animal.name}</label>
  </div>
)
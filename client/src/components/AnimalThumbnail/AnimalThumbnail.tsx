import React from 'react'
import { Link } from 'react-router-dom'
import Animal from '../../../../model/Animal'
import $ from './AnimalThumbnail.module.scss'

type Props = {
  animal: Animal
}

export default ({ animal }: Props) => (
  <Link to={`/animals/${animal._id}`}>
    <img className={$.image} src={animal.image} alt={animal.name} />
  </Link>
)
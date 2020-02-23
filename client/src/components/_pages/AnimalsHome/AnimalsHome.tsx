import React from 'react'
import { FaPlus as AddIcon } from 'react-icons/fa'
import { FaMars as MaleIcon, FaVenus as FemaleIcon } from 'react-icons/fa'
import { Link, useHistory } from 'react-router-dom'
import { animals as animalsBackend } from '../../../services/backend'
import MainLayout from '../../_layouts/MainLayout/MainLayout'
import Thumbnail from '../../Thumbnail/Thumbnail'
import ThumbnailList from '../../ThumbnailList/ThumbnailList'
import $ from './AnimalsHome.module.scss'
import { Animal } from '@patitas/model'


export default () => {

  const fetchAnimals = async (start: number, limit: number) => {
    const { data } = await animalsBackend.list({ start, limit })
    return data
  }

  const history = useHistory()
  const onClick = (animal: Animal) => () => { history.push(`/animals/${animal._id}`) }

  return (
    <MainLayout>
      <ThumbnailList fetchMore={fetchAnimals}>{animal => (
        <Thumbnail key={animal._id} image={animal.image} title={animal.name} onClick={onClick(animal)}>
          {animal.gender === 'M' ? <MaleIcon fill='lightblue' /> : <FemaleIcon fill='lightpink' />}
        </Thumbnail>
      )}</ThumbnailList>
      <Link className={$.floating} to='/animals/new'><AddIcon /></Link>
    </MainLayout>
  )
}
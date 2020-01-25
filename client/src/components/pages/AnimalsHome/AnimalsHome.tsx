import React, { useState } from 'react'
import { FaPlus as AddIcon } from 'react-icons/fa'
import { FaMars as MaleIcon, FaVenus as FemaleIcon } from 'react-icons/fa'
import InfiniteScroll from 'react-infinite-scroller'
import { Link, useHistory } from 'react-router-dom'
import { useToasts } from 'react-toast-notifications'
import Animal from '../../../../../model/Animal'
import { animals as animalsBackend } from '../../../services/backend'
import Layout from '../../Layout/Layout'
import $ from './AnimalsHome.module.scss'

const { log } = console

const PAGE_SIZE = 12

type AnimalThumbnailProps = {
  animal: Animal
}
const AnimalThumbnail = ({ animal }: AnimalThumbnailProps) => {
  const history = useHistory()
  const onClick = () => { history.push(`/animals/${animal._id}`) }

  return (
    <div className={$.thumbnail} onClick={onClick}>
      <img className={$.image} src={animal.image} alt={animal.name} />
      <div>
        <p>{animal.name}</p>
        {animal.gender === 'M' ? <MaleIcon fill='lightblue' /> : <FemaleIcon fill='lightpink' />}
      </div>
    </div>
  )
}


export default () => {
  const [animals, setAnimals] = useState<Animal[]>([])
  const [hasMore, setHasMore] = useState(true)
  const { addToast } = useToasts()

  const fetchAnimals = async (page: number) => {
    try {
      const { data } = await animalsBackend.list({
        start: (page - 1) * PAGE_SIZE,
        limit: PAGE_SIZE,
      })

      setAnimals([...animals, ...data])
      setHasMore(data.length === PAGE_SIZE)

    } catch (error) {
      log(error)
      addToast(error.message, { appearance: 'error' })
      setHasMore(false)
    }

  }

  const getMainTag = () => document.getElementsByTagName('main')[0]

  return (
    <Layout>
      <InfiniteScroll
        className={$.list}
        loadMore={fetchAnimals}
        hasMore={hasMore}
        loader={<div className={$.loader} key='loader'>Loading...</div>}
        useWindow={false}
        getScrollParent={getMainTag}
      >
        {animals.map(animal => <AnimalThumbnail key={animal._id} animal={animal} />)}
      </InfiniteScroll>
      <Link className={$.floating} to='/animals/new'><AddIcon /></Link>
    </Layout>
  )
}
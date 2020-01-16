import React, { useState } from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import { useToasts } from 'react-toast-notifications'
import Animal from '../../../../../model/Animal'
import { animals as animalsBackend } from '../../../services/backend'
import AnimalThumbnail from '../../AnimalThumbnail/AnimalThumbnail'
import Layout from '../../Layout/Layout'
import $ from './AnimalsHome.module.scss'

const PAGE_SIZE = 10

export default () => {
  const [animals, setAnimals] = useState<Animal[]>([])
  const [hasMore, setHasMore] = useState(true)
  const { addToast } = useToasts()

  const fetchAnimals = async (page: number) => {
    try {
      const { data } = await animalsBackend.list({
        start: (page - 1) * PAGE_SIZE,
        limit: page * PAGE_SIZE,
      })

      setAnimals([...animals, ...data])
      setHasMore(data.length === PAGE_SIZE)

    } catch (error) {
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
        {animals.map(animal => <AnimalThumbnail animal={animal} key={animal._id!} />)}
      </InfiniteScroll>
    </Layout>
  )
}
import React, { useState } from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import Animal from '../../../../../../model/Animal'
import AnimalThumbnail from '../../../AnimalThumbnail/AnimalThumbnail'
import $ from './AnimalsHome.module.scss'

export default () => {

  const [animals, setAnimals] = useState<Animal[]>([])

  const fetchMoreAnimals = () => {
    // tslint:disable:no-console
    console.log('fetching 10 more animals')

    setTimeout(() => {
      const nextAnimals = [...animals]
      for (let n = 0; n < 10; n++) {
        nextAnimals.push({
          _id: `${n + animals.length}`,
          name: `patan ${n + animals.length}`,
          species: 'dog',
          gender: 'M',
          age: 22,
          size: 'S',
          info: 'he is an asshole',
          image: 'https://definicion.de/wp-content/uploads/2013/02/patan.jpg',
        })
      }
      setAnimals(nextAnimals)
      console.log(`new animals count ${nextAnimals.length}`)
    }, 1500)
  }

  return (
    <div>
      <InfiniteScroll
        className={$.list}
        loadMore={fetchMoreAnimals}
        hasMore={true}
        loader={<div className={$.loader} key='loader'>Loading...</div>}
        useWindow={false}
        getScrollParent={() => document.getElementsByTagName('main')[0]}
      >
        {animals.map(animal => <AnimalThumbnail animal={animal} key={animal._id!} />)}
      </InfiniteScroll>
    </div>
  )
}
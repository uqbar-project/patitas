import React, { ReactElement, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import { useToasts } from 'react-toast-notifications'
import $ from './ThumbnailList.module.scss'

const { log } = console

const PAGE_SIZE = 12

type ThumbnailListProps<T> = {
  fetchMore(start: number, limit: number): Promise<T[]>
  children(element: T): ReactElement
}

export default <T extends {}>({ fetchMore, children }: ThumbnailListProps<T>) => {
  const [elements, setElements] = useState<T[]>([])
  const [hasMore, setHasMore] = useState(true)

  const { addToast } = useToasts()

  const loadMore = async (page: number) => {
    log(`LOADING PAGE ${page} (${(page - 1) * PAGE_SIZE}, ${PAGE_SIZE})`)
    try {
      const newElements = await fetchMore((page - 1) * PAGE_SIZE, PAGE_SIZE)
      setElements([...elements, ...newElements])
      setHasMore(newElements.length === PAGE_SIZE)
      log(`LOADED PAGE ${page}: ${newElements.length} (${newElements.length === PAGE_SIZE}) `)
    } catch (error) {
      log(error)
      addToast(error.message, { appearance: 'error' })
      setHasMore(false)
    }
  }

  const getMainTag = () => document.getElementsByTagName('main')[0]

  return (
    <InfiniteScroll
      className={$.list}
      loadMore={loadMore}
      hasMore={hasMore}
      loader={<div className={$.loader} key='loader'>Loading...</div>}
      useWindow={false}
      getScrollParent={getMainTag}
    >
      {elements.map(children)}
    </InfiniteScroll>
  )
}
import React, { ReactElement } from 'react'
import $ from './Thumbnail.module.scss'

type Props = {
  image: string
  title: string
  children?: ReactElement | ReactElement[]
  onClick(): void
}
export default ({ onClick, image, title, children }: Props) => (
  <div className={$.thumbnail} onClick={onClick}>
    <img className={$.image} src={image} alt={title} />
    <div>
      <p>{title}</p>
      {children}
    </div>
  </div>
)
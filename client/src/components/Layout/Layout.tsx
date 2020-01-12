import React, { ReactNode } from 'react'
import $ from './Layout.module.scss'

type Props = {
  children: ReactNode | ReactNode[]
}

export default ({ children }: Props) => (
  <div className={$.layout}>
    <div className={$.header}>
      <div>Header entry 1</div>
    </div>
    <div className={$.menu}>
      <div>Menu Action 1</div>
      <div>Menu Action 2</div>
      <div>Menu Action N+1</div>
    </div>
    <div className={$.main}>{children}</div>
    <div className={$.footer} />
  </div>
)
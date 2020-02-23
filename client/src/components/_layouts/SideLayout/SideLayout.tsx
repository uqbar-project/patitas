import React, { ReactElement } from 'react'
import $ from './SideLayout.module.scss'

type Props = {
  children: ReactElement | ReactElement[]
}

export default ({ children }: Props) => (
  <div className={$.background}>
    <div className={$.container}>
      {children}
    </div>
  </div>
)
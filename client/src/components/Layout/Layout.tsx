import React, { ReactNode } from 'react'
import Header from '../Header/Header'
import NavigationMenu from '../NavigationMenu/NavigationMenu'
import $ from './Layout.module.scss'

type Props = {
  children: ReactNode | ReactNode[]
}

export default ({ children }: Props) => (
  <div className={$.layout}>
    <header>
      <Header />
    </header>

    <nav>
      <NavigationMenu />
    </nav>

    <main>
      {children}
      <footer />
    </main>

  </div>
)
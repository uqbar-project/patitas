import React, { ReactNode } from 'react'
import Footer from '../../Footer/Footer'
import Header from '../../Header/Header'
import NavigationMenu from '../../NavigationMenu/NavigationMenu'
import $ from './MainLayout.module.scss'

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
      <footer>
        <Footer />
      </footer>
    </main>

  </div>
)
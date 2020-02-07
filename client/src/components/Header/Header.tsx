import React from 'react'
import { $t } from '../../services/i18n'
import $ from './Header.module.scss'

export default () => {
  return (
    <div className={$.container} >
      <img src='/logo.png' alt={$t('organization.name')} />
      <h1>{$t('organization.name')}</h1>
      <a href='/auth/google'>Sing In</a>
    </div>
  )
}
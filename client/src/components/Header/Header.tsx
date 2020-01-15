import React from 'react'
import { $t } from '../../services/i18n'
import $ from './Header.module.scss'

export default () => (
  <div className={$.container} >
    <img src='logo.png' alt={$t('organization.name')} />
    <h1>{$t('organization.name')}</h1>
  </div>
)
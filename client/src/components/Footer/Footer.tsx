import React from 'react'
import { FaFacebook as FacebookIcon, FaInstagram as InstagramIcon } from 'react-icons/fa'
import { $t } from '../../services/i18n'
import $ from './Footer.module.scss'

export default () => (
  <div className={$.container} >
    <div>
      <img src='/logo.png' alt={$t('organization.name')} />
      <h1>{$t('organization.name')}</h1>
    </div>
    <p>{$t('organization.copyright')}</p>
    <div>
      <FacebookIcon />
      <InstagramIcon />
    </div>
  </div>
)
import React from 'react'
import { FaEnvelope as ContactUsIcon, FaHandsHelping as MembersIcon, FaInfoCircle as AboutUsIcon, FaSearch as ExploreIcon } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { $t } from '../../services/i18n'
import $ from './NavigationMenu.module.scss'

export default () => (
  <div className={$.container}>
    <Link to='/'><ExploreIcon /><span>{$t('navigation.explore')}</span></Link>
    <Link to='/'><MembersIcon /><span>{$t('navigation.members')}</span></Link>
    <Link to='/'><ContactUsIcon /><span>{$t('navigation.contact')}</span></Link>
    <Link to='/'><AboutUsIcon /><span>{$t('navigation.about')}</span></Link>
  </div>
)
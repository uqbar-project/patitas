import React from 'react'
import { FaEnvelope as ContactUsIcon, FaHandsHelping as MembersIcon, FaInfoCircle as AboutUsIcon, FaSearch as ExploreIcon } from 'react-icons/fa'
import { NavLink } from 'react-router-dom'
import { $t } from '../../services/i18n'
import $ from './NavigationMenu.module.scss'

export default () => (
  <div className={$.container}>
    <NavLink to='/animals' exact activeClassName='active'><ExploreIcon /><span>{$t('navigation.explore')}</span></NavLink>
    <NavLink to='/members' exact activeClassName='active'><MembersIcon /><span>{$t('navigation.members')}</span></NavLink>
    <NavLink to='/contact' exact activeClassName='active'><ContactUsIcon /><span>{$t('navigation.contact')}</span></NavLink>
    <NavLink to='/about' exact activeClassName='active'><AboutUsIcon /><span>{$t('navigation.about')}</span></NavLink>
  </div>
)
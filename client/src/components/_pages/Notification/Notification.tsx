import React from 'react'
import MainLayout from '../../_layouts/MainLayout/MainLayout'
import { $t } from '../../../services/i18n'
import $ from './Notification.module.scss'

type Props = {
  id: string,
}

export default ({ id }: Props) => {
  return (
    <MainLayout>
      <div className={$.container}>
        <h2>{$t(`notification.${id}.title`)}</h2>
        <div>
          {$t(`notification.${id}.text`)}
        </div>
      </div>
    </MainLayout>
  )
}
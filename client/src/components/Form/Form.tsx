import React, { ReactNode } from 'react'
import { $t } from '../../services/i18n'
import $ from './Form.module.scss'

type FieldProps = {
  name: string
  label: string
  className?: string
  error?: string
  children: ReactNode | ReactNode[]
}

export const Field = ({ name: id, label, className, error, children }: FieldProps) => (
  <div className={`${$.field} ${id} ${className} ${error && 'error'}`} style={{ gridArea: id }}>
    <label>{label}</label>
    {error && <p>{$t(`errors.${error}`)}</p>}
    {children}
  </div>
)
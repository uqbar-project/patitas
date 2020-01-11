import React, { ChangeEvent, useState } from 'react'
import Animal from '../../../../model/Animal'
import { $t } from '../../services/i18n'
import $ from './AnimalForm.module.scss'

type Props = {
  animal: Partial<Animal>
  edit?: boolean
}

export default ({ animal, edit = true }: Props) => {

  const [value, setValue] = useState(animal)
  const update = (key: keyof Animal) => <E extends HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>(event: ChangeEvent<E>) =>
    setValue({ ...value, [key]: event.target.value })

  return (
    <form className={$.form}>

      <div className={$.imageSection}>
        <div className={$.field}>
          <label>{$t('animal.image')}</label>
          <img src={value.image} alt={$t('animal.image')} />
          <input readOnly={!edit} value={value.image} onChange={update('image')} />
        </div>
      </div>

      <div className={$.mainSection}>

        <div className={$.field}>
          <label>{$t('animal.name')}</label>
          <input readOnly={!edit} value={value.name} onChange={update('name')} />
        </div>

        <div className={$.field}>
          <label>{$t('animal.species.label')}</label>
          {edit
            ? (
              <select value={value.species} onChange={update('species')}>
                <option value='dog'>{$t('animal.species.dog')}</option>
                <option value='cat'>{$t('animal.species.cat')}</option>
              </select>
            ) : <input readOnly={!edit} value={$t<string>(`animal.species.${value.species}`)} />
          }
        </div>

        <div className={$.field}>
          <label>{$t('animal.gender.label')}</label>
          {edit ? (
            <select disabled={!edit} value={value.gender} onChange={update('gender')}>
              <option value='M'>{$t('animal.gender.M')}</option>
              <option value='F'>{$t('animal.gender.F')}</option>
            </select>
          ) : <input readOnly={!edit} value={$t<string>(`animal.gender.${value.gender}`)} />
          }

        </div>

        <div className={$.field}>
          <label>{$t('animal.age')}</label>
          <input readOnly={!edit} type='number' min={0} max={99} value={value.age} onChange={update('age')} />
        </div>

        <div className={$.field}>
          <label>{$t('animal.size.label')}</label>
          {edit ? (
            <select disabled={!edit} value={value.size} onChange={update('size')}>
              <option value='S'>{$t('animal.size.S')}</option>
              <option value='M'>{$t('animal.size.M')}</option>
              <option value='L'>{$t('animal.size.L')}</option>
            </select>
          ) : <input readOnly={!edit} value={$t<string>(`animal.size.${value.size}`)} />
          }
        </div>
      </div>

      <div className={$.infoSection}>
        <div className={$.field}>
          <label>{$t('animal.info')}</label>
          <textarea readOnly={!edit} value={value.info} onChange={update('info')} />
        </div>
      </div>

    </form>
  )
}
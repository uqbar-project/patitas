import React, { ChangeEvent, useState } from 'react'
import Animal from '../../../../model/Animal'
import { $t } from '../../services/i18n'
import $ from './AnimalForm.module.scss'

type Props = {
  animal: Partial<Animal>
  edit?: boolean
}

export default ({ animal, edit = false }: Props) => {

  const [value, setValue] = useState(animal)
  const update = (key: keyof Animal) => <E extends HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>(event: ChangeEvent<E>) =>
    setValue({ ...value, [key]: event.target.value })

  return (
    <form className={$.form}>

      <div className={$.imageSection}>
        <div className={$.field}>
          <label>{$t('animal.image')}</label>
          <img src={value.image} alt={$t('animal.image')} />
          {edit && <input value={value.image} onChange={update('image')} />}
        </div>
      </div>

      <div className={$.mainSection}>

        <div className={$.field}>
          <label>{$t('animal.name')}</label>
          {edit
            ? <input value={value.name} onChange={update('name')} />
            : <div>{value.name}</div>
          }
        </div>

        <div className={$.field}>
          <label>{$t('animal.species.label')}</label>
          {edit
            ? (
              <select value={value.species} onChange={update('species')}>
                <option value='dog'>{$t('animal.species.dog')}</option>
                <option value='cat'>{$t('animal.species.cat')}</option>
              </select>
            ) : <div>{$t<string>(`animal.species.${value.species}`)}</div>
          }
        </div>

        <div className={$.field}>
          <label>{$t('animal.gender.label')}</label>
          {edit ? (
            <select disabled={!edit} value={value.gender} onChange={update('gender')}>
              <option value='M'>{$t('animal.gender.M')}</option>
              <option value='F'>{$t('animal.gender.F')}</option>
            </select>
          ) : <div>{$t<string>(`animal.gender.${value.gender}`)}</div>
          }

        </div>

        <div className={$.field}>
          <label>{$t('animal.age')}</label>
          {edit
            ? <input type='number' min={0} max={99} value={value.age} onChange={update('age')} />
            : <div>{value.age}</div>
          }
        </div>

        <div className={$.field}>
          <label>{$t('animal.size.label')}</label>
          {edit
            ? (
              <select disabled={!edit} value={value.size} onChange={update('size')}>
                <option value='S'>{$t('animal.size.S')}</option>
                <option value='M'>{$t('animal.size.M')}</option>
                <option value='L'>{$t('animal.size.L')}</option>
              </select>
            ) : <div>{$t<string>(`animal.size.${value.size}`)}</div>
          }
        </div>
      </div>

      <div className={$.infoSection}>
        <div className={$.field}>
          <label>{$t('animal.info')}</label>
          {edit
            ? <textarea value={value.info} onChange={update('info')} />
            : <div>{value.info}</div>
          }
        </div>
      </div>

    </form>
  )
}
import React, { ChangeEvent, FormEvent, useState } from 'react'
import Loader from 'react-loader-spinner'
import { useHistory } from 'react-router-dom'
import { useToasts } from 'react-toast-notifications'
import Animal from '../../../../model/Animal'
import { animals as animalsBackend, images as imagesBackend } from '../../services/backend'
import { $t } from '../../services/i18n'
import { Field } from '../Form/Form'
import ImageChooser from '../ImageChooser/ImageChooser'
import $ from './AnimalForm.module.scss'

const { log } = console

type Props = {
  animal: Partial<Animal>
  edit?: boolean
}

export default ({ animal, edit = false }: Props) => {
  const { addToast } = useToasts()
  const history = useHistory()
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState(false)
  const [image, setImage] = useState<Blob>()
  const [value, setValue] = useState({
    name: '',
    age: 0,
    info: '',
    ...animal,
  })

  const update = (key: keyof Animal) => <E extends HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>(event: ChangeEvent<E>) => {
    setValue({ ...value, [key]: event.target.value })
  }

  const cleanError = (key: keyof Animal) => () => {
    const { [key]: _, ...nextErrors } = errors
    setErrors(nextErrors)
  }

  const onImageChange = (blob: Blob) => {
    setImage(blob)
    setValue({ ...value, image: undefined })
  }

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault()

    setSubmitting(true)

    try {
      if (image && !value.image) {
        const { link } = await imagesBackend.insert(image)
        value.image = link
        setValue(value)
      }

      await animalsBackend.upsert(value)

      history.push('/animals')

      addToast($t('messages.successfulCreation'), { appearance: 'success', autoDismiss: true })
    } catch (error) {
      log(error)
      if (error?.response?.data) setErrors(error.response.data)
      else addToast(error.message, { appearance: 'error' })
    }

    setSubmitting(false)
  }

  const onCancel = () => history.push('/animals')

  return (
    <form className={$.form}>

      <Field name='image' className={$.image} label={`${$t('animal.image')}*`} error={errors.image}>
        {edit
          ? <ImageChooser onImageSelected={onImageChange} currentImage={value.image} />
          : <img src={value.image} />
        }
      </Field>


      <Field name='name' label={`${$t('animal.name')}*`} error={errors.name}>
        {edit
          ? <input value={value.name} onChange={update('name')} onFocus={cleanError('name')} />
          : <div>{value.name}</div>
        }
      </Field>

      <Field name='species' label={`${$t('animal.species.label')}*`} error={errors.species}>
        {edit
          ? (
            <select value={value.species} onChange={update('species')} onFocus={cleanError('species')}>
              <option />
              <option value='dog'>{$t('animal.species.dog')}</option>
              <option value='cat'>{$t('animal.species.cat')}</option>
            </select>
          ) : <div>{$t(`animal.species.${value.species}`)}</div>
        }
      </Field>

      <Field name='gender' label={`${$t('animal.gender.label')}*`} error={errors.gender}>
        {edit
          ? (
            <select disabled={!edit} value={value.gender} onChange={update('gender')} onFocus={cleanError('gender')}>
              <option />
              <option value='M'>{$t('animal.gender.M')}</option>
              <option value='F'>{$t('animal.gender.F')}</option>
            </select>
          )
          : <div>{$t(`animal.gender.${value.gender}`)}</div>
        }
      </Field>

      <Field name='age' label={`${$t('animal.age')}*`} error={errors.age}>
        {edit
          ? <input type='number' min={0} max={99} value={value.age} onChange={update('age')} onFocus={cleanError('age')} />
          : <div>{value.age}</div>
        }
      </Field>

      <Field name='size' label={`${$t('animal.size.label')}*`} error={errors.size}>
        {edit
          ? (
            <select disabled={!edit} value={value.size} onChange={update('size')} onFocus={cleanError('size')}>
              <option />
              <option value='S'>{$t('animal.size.S')}</option>
              <option value='M'>{$t('animal.size.M')}</option>
              <option value='L'>{$t('animal.size.L')}</option>
            </select>
          ) : <div>{$t(`animal.size.${value.size}`)}</div>
        }
      </Field>

      <Field name='info' label={$t('animal.info')} error={errors.info}>
        {edit
          ? <textarea value={value.info} onChange={update('info')} onFocus={cleanError('info')} />
          : <div>{value.info}</div>
        }
      </Field>

      {edit && (
        <div className='actions'>
          <button onClick={onCancel}>{$t('actions.cancel')}</button>
          <button onClick={onSubmit} disabled={submitting} type='submit'>
            {submitting
              ? <Loader type='TailSpin' color='#00000099' />
              : $t('actions.save')
            }
          </button>
        </div>
      )}

    </form>
  )
}
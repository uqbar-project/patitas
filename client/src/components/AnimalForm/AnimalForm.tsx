import axios from 'axios'
import React, { ChangeEvent, FormEvent, MouseEvent, ReactNode, useState } from 'react'
import Loader from 'react-loader-spinner'
import { useHistory } from 'react-router-dom'
import { useToasts } from 'react-toast-notifications'
import Animal from '../../../../model/Animal'
import { animals as animalsBackend } from '../../services/backend'
import { $t } from '../../services/i18n'
import $ from './AnimalForm.module.scss'

type Props = {
  animal: Partial<Animal>
  edit?: boolean
}

type FieldProps = {
  label: string
  error?: string
  children: ReactNode | ReactNode[]
}

const Field = ({ label, error, children }: FieldProps) => (
  <div className={$.field}>
    <label className={error && 'error'}>
      {label}
      <p>{error && $t(`errors.${error}`)}</p>
    </label>
    {children}
  </div>
)

export default ({ animal, edit = false }: Props) => {
  const { addToast } = useToasts()
  const history = useHistory()
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState(false)
  const [value, setValue] = useState({
    name: '',
    age: 0,
    info: '',
    image: '',
    ...animal,
  })

  const update = (key: keyof Animal) => <E extends HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>(event: ChangeEvent<E>) => {
    setValue({ ...value, [key]: event.target.value })
  }

  const SERVER_URL = 'http://localhost:8080';
  (window as any).cloudinary.setCloudName('redpatitas')
  const myWidget = (window as any).cloudinary.createUploadWidget({
    folder: 'refugio 1',
    apiKey: '459452352698934',
    maxImageWidth: 300,
    maxImageHeight: 300,
    multiple: false,
    cropping: true,
    showSkipCropButton: false,
    croppingAspectRatio: 1,
    croppingValidateDimensions: true,
    resourceType: 'image',
    showUploadMoreButton: false,
    uploadSignature: async (callback: (s: string) => void, params: {}) => {
      const response = await axios.post<string>(`${SERVER_URL}/sign`, params)
      callback(response.data)
    },
  }, (error: any, result: any) => {
    if (error) addToast(error.message, { appearance: 'error' })
    else setValue({ ...value, image: result.url })
  })

  const onSelectImage = (e: MouseEvent) => {
    e.preventDefault()
    myWidget.open()
  }

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault()

    setSubmitting(true)

    try {
      await animalsBackend.upsert(value)
      history.push('/animals')
      addToast($t('messages.successfulCreation'), { appearance: 'success', autoDismiss: true })
    } catch (error) {
      setErrors(error.response.data)
    }

    setSubmitting(false)
  }

  const onCancel = () => history.push('/animals')

  return (
    <form className={$.form}>

      <button onClick={onSelectImage}>SUBITE</button>
      <div className={$.imageSection}>
        <Field label={`${$t('animal.image')}*`} error={errors.image}>
          <img src={value.image} alt={$t('animal.image')} />
          {edit && <input value={value.image} onChange={update('image')} />}
        </Field>
      </div>

      <div className={$.mainSection}>

        <Field label={`${$t('animal.name')}*`} error={errors.name}>
          {edit
            ? <input value={value.name} onChange={update('name')} />
            : <div>{value.name}</div>
          }
        </Field>

        <Field label={`${$t('animal.species.label')}*`} error={errors.species}>
          {edit
            ? (
              <select value={value.species} onChange={update('species')}>
                <option />
                <option value='dog'>{$t('animal.species.dog')}</option>
                <option value='cat'>{$t('animal.species.cat')}</option>
              </select>
            ) : <div>{$t(`animal.species.${value.species}`)}</div>
          }
        </Field>

        <Field label={`${$t('animal.gender.label')}*`} error={errors.gender}>
          {edit
            ? (
              <select disabled={!edit} value={value.gender} onChange={update('gender')}>
                <option />
                <option value='M'>{$t('animal.gender.M')}</option>
                <option value='F'>{$t('animal.gender.F')}</option>
              </select>
            )
            : <div>{$t(`animal.gender.${value.gender}`)}</div>
          }
        </Field>

        <Field label={`${$t('animal.age')}*`} error={errors.age}>
          {edit
            ? <input type='number' min={0} max={99} value={value.age} onChange={update('age')} />
            : <div>{value.age}</div>
          }
        </Field>

        <Field label={`${$t('animal.size.label')}*`} error={errors.size}>
          {edit
            ? (
              <select disabled={!edit} value={value.size} onChange={update('size')}>
                <option />
                <option value='S'>{$t('animal.size.S')}</option>
                <option value='M'>{$t('animal.size.M')}</option>
                <option value='L'>{$t('animal.size.L')}</option>
              </select>
            ) : <div>{$t(`animal.size.${value.size}`)}</div>
          }
        </Field>
      </div>

      <div className={$.infoSection}>
        <Field label={$t('animal.info')} error={errors.info}>
          {edit
            ? <textarea value={value.info} onChange={update('info')} />
            : <div>{value.info}</div>
          }
        </Field>
      </div>

      {edit && (
        <div className={$.actions}>
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
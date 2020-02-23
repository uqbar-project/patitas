import React, { ChangeEvent, FormEvent, useState } from 'react'
import Loader from 'react-loader-spinner'
import { useHistory } from 'react-router-dom'
import { useToasts } from 'react-toast-notifications'
import { images as imagesBackend, members as membersBackend } from '../../services/backend'
import { $t } from '../../services/i18n'
import { Field } from '../Form/Form'
import ImageChooser from '../ImageChooser/ImageChooser'
import $ from './MemberForm.module.scss'
import { Member, PROVINCES, SPECIES } from '@patitas/model'

const { log } = console
const { keys } = Object

type Props = {
  member: Partial<Member>
}

export default ({ member }: Props) => {
  const { addToast } = useToasts()
  const history = useHistory()
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState(false)
  const [image, setImage] = useState<Blob>()
  const [value, setValue] = useState({
    ...member,
  })

  const needsAproval = keys(member).length > 0 && !member._id

  const update = (key: keyof Member) => <E extends HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>(event: ChangeEvent<E>) => {
    setValue({ ...value, [key]: event.target.value })
  }

  const cleanError = (key: keyof Member) => () => {
    const { [key]: _, ...nextErrors } = errors
    setErrors(nextErrors)
  }

  const onImageChange = (blob: Blob) => {
    setImage(blob)
    setValue({ ...value, logo: undefined })
  }

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault()

    setSubmitting(true)

    try {
      if (image && !value.logo) {
        const { link } = await imagesBackend.insert(image)
        value.logo = link
        setValue(value)
      }

      await membersBackend.request(value)

      history.push('/contact/submitted')
    } catch (error) {
      log(error)
      if (error?.response?.data) setErrors(error.response.data)
      else addToast(error.message, { appearance: 'error' })
    }

    setSubmitting(false)
  }

  const onApprove = async (event: FormEvent) => {
    event.preventDefault()

    setSubmitting(true)

    try {
      if (image && !value.logo) {
        const { link } = await imagesBackend.insert(image)
        value.logo = link
        setValue(value)
      }

      await membersBackend.upsert(value)

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

      <Field name='logo' className={$.logo} label={`${$t('member.logo')}*`} error={errors.logo}>
        <ImageChooser onImageSelected={onImageChange} currentImage={value.logo} />
      </Field>

      <Field name='name' label={`${$t('member.name')}*`} error={errors.name}>
        <input value={value.name} onChange={update('name')} onFocus={cleanError('name')} />
      </Field>

      <Field name='species' label={`${$t('member.species.label')}*`} error={errors.species}>
        <select value={value.species} onChange={update('species')} onFocus={cleanError('species')}>
          <option />
          {SPECIES.map(species => <option key={species} value={[species]}>{$t(`member.species.${species}`)}</option>)}
          <option value={[...SPECIES]}>{$t('member.species.all')}</option>
        </select>
      </Field>

      <Field name='province' label={`${$t('member.province')}*`} error={errors.province}>
        <select value={value.province} onChange={update('province')} onFocus={cleanError('province')}>
          <option />
          {PROVINCES.map(({ name }) => <option value={name} key={name}>{name}</option>)}
        </select>
      </Field>

      <Field name='zone' label={`${$t('member.zone')}*`} error={errors.zone}>
        <select value={value.zone} onChange={update('zone')} onFocus={cleanError('zone')}>
          <option />
          {PROVINCES.find(({ name }) => name === value.province)?.zones?.map((name: string) =>
            <option value={name} key={name}>{name}</option>
          )}
        </select>
      </Field>

      <Field name='homepage' label={`${$t('member.homepage')}*`} error={errors.homepage}>
        <input value={value.homepage} onChange={update('homepage')} onFocus={cleanError('homepage')} />
      </Field>

      <div className='actions'>
        <button onClick={onCancel} disabled={submitting} >{$t('actions.cancel')}</button>
        {needsAproval
          ? (
            <button onClick={onApprove} disabled={submitting} type='submit'>
              {submitting
                ? <Loader type='TailSpin' color='#00000099' />
                : $t('actions.approve')
              }
            </button>
          ) : (
            <button onClick={onSubmit} disabled={submitting} type='submit'>
              {submitting
                ? <Loader type='TailSpin' color='#00000099' />
                : $t('actions.save')
              }
            </button>
          )}
      </div>

    </form>
  )
}
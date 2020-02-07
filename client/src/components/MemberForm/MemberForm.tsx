import React, { ChangeEvent, FormEvent, useState } from 'react'
import Loader from 'react-loader-spinner'
import { useHistory } from 'react-router-dom'
import { useToasts } from 'react-toast-notifications'
import Animal from '../../../../model/Animal'
import Member from '../../../../model/Member'
import { images as imagesBackend } from '../../services/backend'
import { $t } from '../../services/i18n'
import { Field } from '../Form/Form'
import ImageChooser from '../ImageChooser/ImageChooser'
import $ from './MemberForm.module.scss'

const { log } = console

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

  const update = (key: keyof Animal) => <E extends HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>(event: ChangeEvent<E>) => {
    setValue({ ...value, [key]: event.target.value })
  }

  const cleanError = (key: keyof Animal) => () => {
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

      <div className='actions'>
        <button onClick={onCancel}>{$t('actions.cancel')}</button>
        <button onClick={onSubmit} disabled={submitting} type='submit'>
          {submitting
            ? <Loader type='TailSpin' color='#00000099' />
            : $t('actions.save')
          }
        </button>
      </div>

    </form>
  )
}
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useToasts } from 'react-toast-notifications'
import Animal from '../../../../../model/Animal'
import { animals as animalsBackend } from '../../../services/backend'
import AnimalForm from '../../AnimalForm/AnimalForm'
import Layout from '../../Layout/Layout'

export default () => {
  const [animal, setAnimal] = useState<Animal>()
  const { id } = useParams<{ id: string }>()
  const { addToast } = useToasts()

  useEffect(() => {
    (async () => {
      try {
        const { data } = await animalsBackend.read(id)

        setAnimal(data)
      } catch (error) {
        addToast(error.message, { appearance: 'error' })
      }
    })()
  }, [id, addToast])

  return (
    <Layout>
      {animal &&
        <AnimalForm animal={animal} />
      }
    </Layout>
  )
}
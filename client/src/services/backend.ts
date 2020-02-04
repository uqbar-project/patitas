import axios from 'axios'
import Animal from '../../../model/Animal'

export const images = {

  async insert(image: Blob) {
    const formData = new FormData()
    formData.append('file', image)

    const { data } = await axios.post('/api/images', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    return data
  },

}

export const animals = {

  async read(id: string) {
    return axios.get<Animal>(`/api/animals/${id}`)
  },

  async list(params: { start?: number, limit?: number }) {
    return axios.get<Animal[]>(`/api/animals`, { params })
  },

  async upsert(animal: Partial<Animal>) {
    const value = {
      ...animal,
      age: animal?.age && Number(animal?.age),
    }
    return value._id
      ? axios.put(`/api/animals/${value._id}`, value)
      : axios.post(`/api/animals`, value)
  },

}
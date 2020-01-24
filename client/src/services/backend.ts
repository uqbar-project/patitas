import axios from 'axios'
import Animal from '../../../model/Animal'

let SERVER_URL: string

export const init = async (serverURL: string) => {
  SERVER_URL = serverURL
}

export const images = {

  async insert(image: Blob) {
    const formData = new FormData()
    formData.append('file', image)

    const { data } = await axios.post(`${SERVER_URL}/images`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    return data
  },

}

export const animals = {

  async read(id: string) {
    return axios.get<Animal>(`${SERVER_URL}/animals/${id}`)
  },

  async list(params: { start?: number, limit?: number }) {
    return axios.get<Animal[]>(`${SERVER_URL}/animals`, { params })
  },

  async upsert(animal: Partial<Animal>) {
    const value = {
      ...animal,
      age: animal?.age && Number(animal?.age),
    }
    return value._id
      ? axios.put(`${SERVER_URL}/animals/${value._id}`, value)
      : axios.post(`${SERVER_URL}/animals`, value)
  },

}
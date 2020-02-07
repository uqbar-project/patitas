import axios from 'axios'
import Animal from '../../../model/Animal'
import Member from '../../../model/Member'

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
    return axios.get<Animal[]>('/api/animals', { params })
  },

  async upsert(animal: Partial<Animal>) {
    const value = {
      ...animal,
      age: animal?.age && Number(animal?.age),
    }
    return value._id
      ? axios.put(`/api/animals/${value._id}`, value)
      : axios.post('/api/animals', value)
  },

}

export const members = {
  // TODO:
  async list(params: { start?: number, limit?: number }) {
    const data: Member[] = []

    for (let n = 0; n < (params.limit ?? 10); n++) {
      const i = (params.start ?? 0) + n
      data.push({
        _id: `${i}`,
        name: `Refugio ${i}`,
        logo: 'https://redpatitas.com/_files/200000100-6ec746ec76/200/61%20-%20Coraz%C3%B3n%20Canino.png',
        species: ['dog', 'cat'],
        province: 'Buenos Aires',
        zone: 'Caballito',
        contactPoints: [{ name: 'instagram', url: 'https://www.instagram.com/rescataditosenadopcionn/', main: true }],
      })
    }

    return { data }
  },
}
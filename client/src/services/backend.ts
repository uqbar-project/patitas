import axios from 'axios'
import { Animal } from '@patitas/model'
import { Member } from '@patitas/model/src/Member'

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
  async list(params: { start?: number, limit?: number }) {
    return axios.get<Member[]>('/api/members', { params })
  },


  async request(member: Partial<Member>) {
    const value = {
      ...member,
      species: member.species?.toString()?.split(','),
    }
    return axios.post('/api/members/request', value)
  },

  async upsert(member: Partial<Member>) {
    const value = {
      ...member,
      species: member.species?.toString()?.split(','),
    }
    return value._id
      ? axios.put(`/api/members/${value._id}`, value)
      : axios.post('/api/members', value)
  },
}
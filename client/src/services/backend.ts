import axios from 'axios'
import Animal from '../../../model/Animal'

let SERVER_URL: string

export const init = async (serverURL: string) => {
  SERVER_URL = serverURL
}

export const animals = {

  async read(id: string) {
    return axios.get<Animal>(`${SERVER_URL}/animals/${id}`)
  },

  async list(params: { start?: number, limit?: number }) {
    return axios.get<Animal[]>(`${SERVER_URL}/animals`, { params })
  },

}
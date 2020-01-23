import axios from 'axios'
import { RequestHandler } from 'express'
import FormData from 'form-data'

declare global {
  namespace Express {
    interface Request {
      media: typeof media
    }
  }
}

const IMGUR_SERVER_URL = 'https://api.imgur.com/3'
let CLIENT_ID: string

const media = {
  async createImage(file: Express.Multer.File) {
    const formData: any = new FormData()
    formData.append('image', file.buffer)

    const { data: { data } } = await axios.post(`${IMGUR_SERVER_URL}/image`, formData, {
      headers: {
        'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
        'Authorization': `Client-ID ${CLIENT_ID}`,
      },
    })
    return data
  },
}

export default (clientId: string): RequestHandler => async (req, _res, next) => {
  try {
    CLIENT_ID = clientId
    req.media = media
    next()
  } catch (error) {
    next(error)
  }
}
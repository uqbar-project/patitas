import { v2 as cloudinary } from 'cloudinary'
import { RequestHandler } from 'express'

declare global {
  namespace Express {
    interface Request {
      media: typeof media
    }
  }
}

let secret: string

const media = {
  sign(params: object) { return cloudinary.utils.api_sign_request(params, secret) },
}

export default (apiSecret: string): RequestHandler => async (req, _res, next) => {
  secret = apiSecret
  req.media = media
  next()
}
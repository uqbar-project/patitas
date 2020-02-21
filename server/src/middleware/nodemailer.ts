import nodemailer from 'nodemailer'
import Mail from 'nodemailer/lib/mailer'
import { RequestHandler } from 'express'

declare global {
  namespace Express {
    interface Request {
      mail: Mail
    }
  }
}

let transporter: Mail
export default (user: string, pass: string): RequestHandler => async (req, _res, next) => {
  try {
    transporter = transporter || nodemailer.createTransport({
      service: 'gmail',
      auth: { user, pass },
    })
    req.mail = transporter
    next()
  } catch (error) {
    next(error)
  }
}
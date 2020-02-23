import { Db, ObjectId } from 'mongodb'
import { Member, validateMember } from '@patitas/model'
import Mail = require('nodemailer/lib/mailer')

const { keys } = Object
const collection = (db: Db) => db.collection<Member>('members')

type ListOptions = { limit: number, start: number }

export default (db: Db) => ({

  list: async ({ limit, start }: ListOptions) =>
    collection(db)
      .find()
      .limit(limit)
      .skip(start)
      .toArray(),

  read: async (id: string) => collection(db).findOne(new ObjectId(id)),

  create: async (doc: Member) => {
    const problems = validateMember(doc)
    if (keys(problems).length) throw problems
    collection(db).save(doc)
  },

  destroy: async (id: string) => { collection(db).deleteOne({ _id: id }) },

  update: async (id: string, delta: Partial<Member>) => {
    const col = collection(db)
    const current = await col.findOne(new ObjectId(id))
    if (!current) throw new Error(`Unexistent member ${id}`)

    const next = { ...current, ...delta }
    const problems = validateMember(next)
    if (keys(problems).length) throw problems

    col.save(next)
  },

  request: async (member: Member, mail: Mail) => {
    const problems = validateMember(member)
    if (keys(problems).length) throw problems

    const admins = process.env.ADMINS!.split(',')
    const clientURL = process.env.CLIENT_URL
    await Promise.all(admins.map(to => mail.sendMail({
      to,
      subject: `${member.name} quiere unirse a la red!`,
      html: `
      <div>Alguien está solicitando unirse a la red.</div>
      <div>Para revisar la solicitud ingresá <a href="${clientURL}/members/new?member=${encodeURIComponent(JSON.stringify(member))}">acá</a>.</div>
    `,
    })))
  },

})
import { Species } from './Animal'
import { Province, Zone } from './Province'

export const CONTACT_POINT_NAMES = ['homepage', 'facebook', 'instagram'] as const

export interface ContactPoint {
  readonly name: typeof CONTACT_POINT_NAMES[number]
  readonly url: string
  readonly main: boolean
}

export default interface Member {
  readonly _id?: string
  readonly name: string
  readonly logo: string
  readonly species: Species[]
  readonly province: Province
  readonly zone: Zone
  readonly contactPoints: ContactPoint[]
}
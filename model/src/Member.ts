import { Species, SPECIES } from './Animal'
import { Province, Zone, PROVINCES } from './Province'

const { keys } = Object

export interface Member {
  readonly _id?: string
  readonly name: string
  readonly logo: string
  readonly species: Species[]
  readonly province: Province
  readonly zone: Zone
  readonly homepage: string
}

export const validateMember = (obj: any) => {
  const allKeys = ['name', 'logo', 'species', 'province', 'zone', 'homepage'].sort()

  const problems: Record<string, string> = {}

  for (const key in obj) { if (!allKeys.includes(key) && key !== '_id') problems[key] = 'unknown' }
  for (const key of allKeys) { if (!keys(obj).includes(key)) problems[key] = `mandatory` }

  if (!obj.name || !obj.name.trim().length) problems.name = 'mandatory'
  if (!obj.homepage || !obj.homepage.trim().length) problems.homepage = 'mandatory'
  if (!obj.logo || !obj.logo.trim().length) problems.logo = 'mandatory'

  if (!obj.species || obj.species.some((species: Species) => !SPECIES.includes(species))) problems.species = 'invalid'

  const province = PROVINCES.find(({ name }) => name === obj.province)
  if (!province) problems.province = 'invalid'
  if (!province || !province.zones.includes(obj.zone)) problems.zone = 'invalid'

  return problems
}
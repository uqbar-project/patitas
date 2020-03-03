const { keys } = Object

export const SPECIES = ['dog', 'cat'] as const
export const GENDERS = ['M', 'F'] as const
export const SIZES = ['S', 'M', 'L'] as const

export type Species = typeof SPECIES[number]
export type Gender = typeof GENDERS[number]
export type Size = typeof SIZES[number]

export interface Animal {
  readonly _id?: string
  readonly name: string
  readonly species: Species
  readonly gender: Gender
  readonly age: number
  readonly size: Size
  readonly info: string
  readonly image: string
}

export const allKeys = ['name', 'species', 'gender', 'age', 'size', 'info', 'image'].sort()

export const validateAnimal = (obj: any) => {
  const problems: Record<string, string> = {}

  for (const key in obj) { if (!allKeys.includes(key) && key !== '_id') problems[key] = 'unknown' }
  for (const key of allKeys) { if (!keys(obj).includes(key)) problems[key] = `mandatory` }

  if (!obj.name || !obj.name.trim().length) problems.name = 'mandatory'
  if (!SPECIES.includes(obj.species)) problems.species = 'invalid'
  if (!GENDERS.includes(obj.gender)) problems.gender = 'invalid'
  if (obj.age === undefined || typeof obj.age !== 'number' || isNaN(obj.age)) problems.age = 'invalid'
  if (!SIZES.includes(obj.size)) problems.size = 'invalid'
  if (!obj.info && obj.info !== '') problems.info = 'invalid'
  if (!obj.image || !obj.image.trim().length) problems.image = 'mandatory'
  return problems
}
const { keys } = Object

export default interface Animal {
  readonly _id?: string
  readonly name: string
  readonly species: 'dog' | 'cat'
  readonly gender: 'M' | 'F'
  readonly age: number
  readonly size: 'S' | 'M' | 'L'
  readonly info: string
  readonly image: string
}

export const validate = (obj: any) => {
  const allKeys = ['name', 'species', 'gender', 'age', 'size', 'info', 'image'].sort()

  const problems: Record<string, string> = {}

  for (const key in obj) { if (!allKeys.includes(key)) problems[key] = `Invalid key ${key}` }
  for (const key of allKeys) { if (!keys(obj).includes(key)) problems[key] = `Missing key ${key}` }

  if (!obj.name) problems.name = 'Invalid name'
  if (!['dog', 'cat'].includes(obj.species)) problems.species = 'Invalid species'
  if (!['M', 'F'].includes(obj.gender)) problems.gender = 'Invalid gender'
  if (!obj.age || isNaN(obj.age)) problems.age = 'Invalid age'
  if (!['S', 'M', 'L'].includes(obj.size)) problems.size = 'Invalid size'
  if (!obj.info && obj.info !== '') problems.info = 'Invalid info'
  if (!obj.image) problems.image = 'Invalid image'
  return problems
}
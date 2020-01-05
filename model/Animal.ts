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
export default interface Animal {
  name: string
  species: 'dog' | 'cat'
  gender: 'male' | 'female'
  age: number
  size: 'small' | 'medium' | 'large'
  info: string
  image: string
}
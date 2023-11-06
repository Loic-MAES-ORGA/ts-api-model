const lowerCase: string = 'abcdefghijklmnopqrstuvwxyz'
const upperCase: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const numbers: string = '0123456789'

export function generateRandomString (length: number, lower: boolean = true, upper: boolean = true, digits: boolean = true): string {
  const abc = `${lower ? lowerCase : ''}${upper ? upperCase : ''}${digits ? numbers : ''}`
  let str = ''

  for (let i = 0; i < length; ++i)
    str += abc[Math.floor(Math.random() * abc.length)]

  return str
}

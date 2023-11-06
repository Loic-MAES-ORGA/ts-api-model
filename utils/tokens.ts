import jwt, { JwtPayload } from 'jsonwebtoken'

export async function sign (payload: Object, options: Object): Promise<string> {
  return jwt.sign(payload, process.env.PRIVATE_KEY || 'private_key', options)
}

export async function verify (token: string): Promise<string | JwtPayload> {
  return jwt.verify(token, process.env.PRIVATE_KEY || 'private_key')
}

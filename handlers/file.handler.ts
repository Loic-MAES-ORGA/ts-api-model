import fs from 'fs'

export function isDirectory (path: string): boolean {
  return fs.lstatSync(path).isDirectory()
}

export default function recover (path: string, recursive?: boolean): string[] {
  const files: string[] = []

  fs.readdirSync(path).forEach((file: string) => {
    const child = `${path}/${file}`
    if (recursive && isDirectory(child)) recover(`${child}/`, recursive).forEach((f: string) => files.push(`${file}/${f}`))
    else if (file.endsWith('.ts')) files.push(file)
  })

  return files
}

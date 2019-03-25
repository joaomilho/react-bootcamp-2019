import { take } from 'ramda'

export default (len, string) => {
  if (string.length <= len) return string

  return `${take(len, string)}...`
}

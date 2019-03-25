import { distanceInWords } from 'date-fns'

export default (dateA, dateB = new Date()) => {
  const distance = distanceInWords(dateA, dateB, {
    includeSeconds: true
  })

  return `${distance} ago`
}

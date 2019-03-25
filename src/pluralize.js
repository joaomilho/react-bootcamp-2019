export default (len, singular, plural) => {
  return `${len} ${len === 1 ? singular : plural}`
}

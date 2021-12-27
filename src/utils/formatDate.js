export function formatDate(time) {
  if (!time) return ''
  let date = new Date(time)

  let month = date.getMonth() + 1
  let day = date.getDate()
  let hour = date.getHours()
  let min = date.getMinutes()
  let sed = date.getSeconds()

  return `${date.getFullYear()}-${month < 10 ? '0' + month : month}-${
    day < 10 ? '0' + day : day
  } ${hour < 10 ? '0' + hour : hour}:${min <= 10 ? '0' + min : min}:${
    sed < 10 ? '0' + sed : sed
  }`
}

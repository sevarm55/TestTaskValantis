export function removeDuplicates(arr, key) {
  return arr.filter(
    (item, index, self) => index === self.findIndex((t) => t[key] === item[key])
  )
}

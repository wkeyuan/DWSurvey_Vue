export function showReadNotify (th) {
  th.$notify({
    title: '提示',
    message: '当前为只读状态，不可答题',
    type: 'warning'
  })
  return false
}

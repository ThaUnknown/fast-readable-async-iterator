// overwrite with custom
ReadableStream.prototype[Symbol.asyncIterator] = async function* () {
  const reader = this.getReader()
  let last = reader.read()
  while (1) {
    const temp = last
    last = reader.read()
    yield (await temp).value || null
  }
}
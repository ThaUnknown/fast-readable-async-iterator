// overwrite with custom
ReadableStream.prototype[Symbol.asyncIterator] = async function* () {
  const reader = this.getReader()
  let last = reader.read()
  while (!last.done) {
    const temp = last
    last = reader.read()
    yield (await temp).value
  }
  yield (await last).value
}
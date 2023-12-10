if (typeof ReadableStream !== 'undefined' && !ReadableStream.prototype[Symbol.asyncIterator]) {
  ReadableStream.prototype[Symbol.asyncIterator] = function () {
    const reader = this.getReader()
    let last = reader.read()
    return {
      next () {
        const temp = last
        last = reader.read()
        return temp
      },
      async return (value) {
        await last
        reader.releaseLock()
        return { done: true, value }
      },
      async throw (err) {
        await this.return()
        throw err
      },
      [Symbol.asyncIterator] () {
        return this
      }
    }
  }
}

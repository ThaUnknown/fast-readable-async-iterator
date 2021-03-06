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
      return () {
        last.then(() => reader.releaseLock())
      },
      throw (err) {
        this.return()
        throw err
      },
      [Symbol.asyncIterator] () {
        return this
      }
    }
  }
}

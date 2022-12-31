export class MissingParamError extends Error {
  constructor(errorName) {
    super(`missing param: ${errorName}`)
    this.name = 'MissingParamError'
  }
}

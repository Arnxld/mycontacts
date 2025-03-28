export default class APIErrors extends Error {
  constructor(response, body) {
    super()

    this.name = 'APIError'
    this.response = response
    this.body = body
    this.message = body?.error || `${response.status} - ${response.statusText}`
  }
}
class HttpClient {
  constructor(baseUrl) {
    this.baseUrl = baseUrl
  }

  async get(path) {
    const response = await fetch(`${this.baseUrl}${path}`)

    console.log(response.ok)

    if (response.ok) {
      return response.json()
    }

    throw new Error(`${response.status} - ${response.statusText}`);
  }

}

export default HttpClient
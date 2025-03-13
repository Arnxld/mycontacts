import HttpClient from "./utils/HttpClient"



class ContactsService {
  constructor() {
    this.httpClient = new HttpClient('http://localhost:3000')
  }

  async listContacts(orderBy = 'asc') {
    return this.httpClient.get(`/contactsz?orderBy=${orderBy}`)
  }

  async createContact(contact) {
    return this.httpClient.post(`/contact`, contact)
  }

}

export default new ContactsService()
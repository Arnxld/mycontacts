const ContactsRepository = require('../repositories/ContactRepository')

class ContactController {
  async index(request, response) {
    // listar todos os registros
    const { orderBy } = request.query

    const contacts = await ContactsRepository.findAll(orderBy)

    response.json(contacts)
  }

  async show(request, response) {
    // obter apenas um registro
    const { id } = request.params

    const contact = await ContactsRepository.findById(id)

    if (!contact) {
      return response.status(404).json({ error: 'Contact not found!' })
    }

    return response.json(contact)
  }

  async store(request, response) {
    // criar um novo registro
    const {name, email, phone, category_id} = request.body

    if (!name) {
      return response.status(400).json({error:"Name is required"})
    }

    const contactExists = await ContactsRepository.findByEmail(email)

    if (contactExists) {
      return response.status(400).json({error:"This email has already been taken"})
    }

    const contact = await ContactsRepository.create({
      name, email, phone, category_id
    })

    response.status(201).json(contact)
  }

  async update(request, response) {
    // editar um registro
    const { id } = request.params
    const {name, email, phone, category_id} = request.body

    const contactExists = await ContactsRepository.findById(id)

    if (!contactExists) {
      return response.status(404).json({ error: 'User not found'})
    }

    if (!name) {
      return response.status(400).json({error:"Name is required"})
    }

    const contactByEmail = await ContactsRepository.findByEmail(email)
    if (contactByEmail && contactByEmail.id !== id) {
      return response.status(400).json({error:"This email has already been taken"})
    }

    const contact = await ContactsRepository.update(id, {
      name, email, phone, category_id
    })

    response.json(contact)

  }

  async delete(request, response) {
    // deletar um registro
    const { id } = request.params

    await ContactsRepository.delete(id)

    return response.sendStatus(204)
  }
}

// Singleton - o arquivo ja importa uma instancia
module.exports = new ContactController()

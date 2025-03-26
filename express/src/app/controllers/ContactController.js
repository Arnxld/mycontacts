const ContactsRepository = require('../repositories/ContactRepository')
const isValidUUID = require('../utils/isValidUUID')

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

    if (!isValidUUID(id)) {
      return response.status(400).json({ error: 'Invalid user id' })
    }

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

    if (category_id && !isValidUUID(category_id)) {
      return response.status(400).json({ error: 'Invalid category' })
    }

    if (email) {
      const contactExists = await ContactsRepository.findByEmail(email)
      if (contactExists) {
        return response.status(400).json({error:"This email has already been taken"})
    }
    }


    const contact = await ContactsRepository.create({
      name,
      email: email || null,
      phone,
      category_id: category_id || null
    })

    response.status(201).json(contact)
  }

  async update(request, response) {
    // editar um registro
    const { id } = request.params
    const {name, email, phone, category_id} = request.body

    if (!isValidUUID(id)) {
      return response.status(400).json({ error: 'Invalid contact id' })
    }

    if (category_id && !isValidUUID(category_id)) {
      return response.status(400).json({ error: 'Invalid category' })
    }

    if (!name) {
      return response.status(400).json({error:"Name is required"})
    }

    const contactExists = await ContactsRepository.findById(id)

    if (!contactExists) {
      return response.status(404).json({ error: 'contact not found'})
    }

    if (email) {
      const contactByEmail = await ContactsRepository.findByEmail(email)
      if (contactByEmail && contactByEmail.id !== id) {
        return response.status(400).json({error:"This email has already been taken"})
      }
    }

    const contact = await ContactsRepository.update(id, {
      name,
      email: email || null,
      phone,
      category_id: category_id || null
    })

    response.json(contact)

  }

  async delete(request, response) {
    // deletar um registro
    const { id } = request.params

    if (!isValidUUID(id)) {
      return response.status(400).json({ error: 'Invalid contact id' })
    }

    await ContactsRepository.delete(id)

    return response.sendStatus(204)
  }
}

// Singleton - o arquivo ja importa uma instancia
module.exports = new ContactController()

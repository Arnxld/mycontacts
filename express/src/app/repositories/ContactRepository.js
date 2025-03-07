

const db = require('../../database/index')

class ContactRepository {
  async findAll(orderBy = 'ASC') {
    const direction = orderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC'

    const rows = await db.query(`
      select contacts.*, categories.name as category_name
      from contacts
      left join categories on contacts.category_id = categories.id
      order by name ${direction}`)

    return rows
  }

  async findById(id) {
    const [ row ] = await db.query('select * from contacts where id = $1', [id])

    return row
  }

  async findByEmail(email) {

    const [ row ] = await db.query('select * from contacts where email = $1', [email])

    return row
  }

  async create({name, email, phone, category_id}) {
    const [row] = await db.query(`
      INSERT INTO contacts(name, email, phone, category_id)
      VALUES($1, $2, $3, $4)
      RETURNING *
      `, [name, email, phone, category_id])


      return row
  }


  async update(id, {name, email, phone, category_id}) {
    const [row] = await db.query(`
        UPDATE contacts
        set name = $1, email = $2, phone = $3, category_id = $4
        where id = $5
        RETURNING *
      `, [name, email, phone, category_id, id])

    return row
  }

  async delete(id) {
    const deleteOp = await db.query('delete from contacts where id = $1', [id])

    return deleteOp
  }
}

module.exports = new ContactRepository()

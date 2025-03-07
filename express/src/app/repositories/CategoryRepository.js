

const db = require('../../database/index')

class ContactRepository {
  async findAll(orderBy = 'ASC') {
    const direction = orderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC'

    const rows = await db.query(`select * from categories order by name ${direction}`)

    return rows
  }

  async findByName(id) {
    const [ row ] = await db.query('select * from contacts where id = $1', [id])

    return row
  }



  async create({name}) {
    const [row] = await db.query(`
      INSERT INTO categories(name)
      VALUES($1)
      RETURNING *
      `, [name])

      console.log(row)

      return row
  }


  // async update(id, {name, email, phone, category_id}) {
  //   const [row] = await db.query(`
  //       UPDATE contacts
  //       set name = $1, email = $2, phone = $3, category_id = $4
  //       where id = $5
  //       RETURNING *
  //     `, [name, email, phone, category_id, id])

  //   return row
  // }

  // async delete(id) {
  //   const deleteOp = await db.query('delete from contacts where id = $1', [id])

  //   return deleteOp
  // }
}

module.exports = new ContactRepository()

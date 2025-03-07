const CategoriesRepository = require('../repositories/CategoryRepository')

class CategoryController {
  async index(request, response) {
    // listar todos os registros
    const { orderBy } = request.query

    const categories = await CategoriesRepository.findAll(orderBy)

    response.json(categories)
  }


  async store(request, response) {
    const {name} = request.body

    if (!name) {
      response.status(400).json({ error: 'Name is required' })
    }

    const category = await CategoriesRepository.create({
      name
    })

    response.json(category)
  }
}

// Singleton - o arquivo ja importa uma instancia
module.exports = new CategoryController()

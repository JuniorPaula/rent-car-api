import { adapterRoutes } from '../adapters/express-routes-adapters.js'
import { carCategoryFactory } from '../factories/carCategoryFactory.js'
import { loadCarCategoryFactory } from '../factories/loadCarCategoryFactory.js'

const carCategoryRoutes = (router) => {
  router.post('/category/create', adapterRoutes(carCategoryFactory()))
  router.get('/category/findAll', adapterRoutes(loadCarCategoryFactory()))
  router.get(
    '/category/findById/:carCategoryId',
    adapterRoutes(loadCarCategoryFactory()),
  )
}

export default carCategoryRoutes

import { adapterRoutes } from '../adapters/express-routes-adapters.js'
import { carCategoryFactory } from '../factories/carCategoryFactory.js'

const carCategoryRoutes = (router) => {
  router.post('/create', adapterRoutes(carCategoryFactory()))
}

export default carCategoryRoutes

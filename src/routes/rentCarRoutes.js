import { adapterRoutes } from '../adapters/express-routes-adapters.js'
import { rentCarFactory } from '../factories/rent-car/rentCarFactory.js'

const rentCarRoutes = (router) => {
  router.post('/rent', adapterRoutes(rentCarFactory()))
}

export default rentCarRoutes

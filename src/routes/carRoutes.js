import { adapterRoutes } from '../adapters/express-routes-adapters.js'
import { carFactory } from '../factories/car/carFactory.js'

const carRoutes = (router) => {
  router.post('/car/create', adapterRoutes(carFactory()))
}

export default carRoutes

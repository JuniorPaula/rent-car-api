import { adapterRoutes } from '../adapters/express-routes-adapters.js'
import { carFactory } from '../factories/car/carFactory.js'
import { loadCarsFactory } from '../factories/car/loadCarsFactory.js'

const carRoutes = (router) => {
  router.post('/car/create', adapterRoutes(carFactory()))
  router.get('/car/load', adapterRoutes(loadCarsFactory()))
}

export default carRoutes

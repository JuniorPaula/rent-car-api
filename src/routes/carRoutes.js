import { adapterRoutes } from '../adapters/express-routes-adapters'
import { carFactory } from '../factories/car/carFactory'

const carRoutes = (router) => {
  router.post('/car/create', adapterRoutes(carFactory()))
}

export default carRoutes

import { adapterRoutes } from '../adapters/express-routes-adapters.js'
import { carCategoryFactory } from '../factories/carCategoryFactory.js'
import { deleteCarCategoryFactory } from '../factories/deleteCarCategoryFactory.js'
import { loadCarCategoryFactory } from '../factories/loadCarCategoryFactory.js'
import { updateCarCategoryFactory } from '../factories/updateCarCategoryFactory.js'

const carCategoryRoutes = (router) => {
  router.post('/category/create', adapterRoutes(carCategoryFactory()))
  router.get('/category/findAll', adapterRoutes(loadCarCategoryFactory()))
  router.get(
    '/category/findById/:carCategoryId',
    adapterRoutes(loadCarCategoryFactory()),
  )
  router.put(
    '/category/update/:carCategoryId',
    adapterRoutes(updateCarCategoryFactory()),
  )

  router.delete(
    '/category/delete/:carCategoryId',
    adapterRoutes(deleteCarCategoryFactory()),
  )
}

export default carCategoryRoutes

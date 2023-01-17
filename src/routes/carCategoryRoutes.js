import { adapterRoutes } from '../adapters/express-routes-adapters.js'
import { carCategoryFactory } from '../factories/car-category/carCategoryFactory.js'
import { deleteCarCategoryFactory } from '../factories/car-category/deleteCarCategoryFactory.js'
import { loadCarCategoryFactory } from '../factories/car-category/loadCarCategoryFactory.js'
import { updateCarCategoryFactory } from '../factories/car-category/updateCarCategoryFactory.js'

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

import { CarCategoryRepository } from '../../repositories/car-category/carCategoryRepository.js'
import { CarCategoryEntity } from '../../entities/car-category/carCategory.js'
import { LoadCarCategoryController } from '../../controllers/car-category/loadCarCategoryController.js'

export const loadCarCategoryFactory = () => {
  const carCategoryRepository = new CarCategoryRepository()
  const carCategoryEntity = new CarCategoryEntity(carCategoryRepository)
  return new LoadCarCategoryController(carCategoryEntity)
}

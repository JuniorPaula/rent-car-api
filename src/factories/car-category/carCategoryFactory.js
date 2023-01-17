import { CarCategoryRepository } from '../../repositories/car-category/carCategoryRepository.js'
import { CarCategoryEntity } from '../../entities/car-category/carCategory.js'
import { CarCategoryController } from '../../controllers/car-category/carCategoryController.js'

export const carCategoryFactory = () => {
  const carCategoryRepository = new CarCategoryRepository()
  const carCategoryEntity = new CarCategoryEntity(carCategoryRepository)
  return new CarCategoryController(carCategoryEntity)
}

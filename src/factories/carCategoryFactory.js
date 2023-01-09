import { CarCategoryRepository } from '../repositories/carCategoryRepository.js'
import { CarCategoryEntity } from '../entities/carCategory.js'
import { CarCategoryController } from '../controllers/carCategoryController.js'

export const carCategoryFactory = () => {
  const carCategoryRepository = new CarCategoryRepository()
  const carCategoryEntity = new CarCategoryEntity(carCategoryRepository)
  return new CarCategoryController(carCategoryEntity)
}

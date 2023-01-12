import { UpdateCarCategoryController } from '../controllers/car-category/updateCarCategoryController.js'
import { CarCategoryEntity } from '../entities/carCategory.js'
import { CarCategoryRepository } from '../repositories/carCategoryRepository.js'

export const updateCarCategoryFactory = () => {
  const carCategoryRepository = new CarCategoryRepository()
  const carCategoryEntity = new CarCategoryEntity(carCategoryRepository)

  return new UpdateCarCategoryController(carCategoryEntity)
}

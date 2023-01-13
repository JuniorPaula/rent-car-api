import { CarCategoryRepository } from '../repositories/carCategoryRepository.js'
import { CarCategoryEntity } from '../entities/carCategory.js'
import { DeleteCarCategoryController } from '../controllers/car-category/deleteCarCategoryController.js'

export const deleteCarCategoryFactory = () => {
  const carCategoryRepository = new CarCategoryRepository()
  const carCategoryEntity = new CarCategoryEntity(carCategoryRepository)

  return new DeleteCarCategoryController(carCategoryEntity)
}

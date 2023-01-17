import { CarCategoryRepository } from '../../repositories/car-category/carCategoryRepository.js'
import { CarCategoryEntity } from '../../entities/car-category/carCategory.js'
import { DeleteCarCategoryController } from '../../controllers/car-category/deleteCarCategoryController.js'

export const deleteCarCategoryFactory = () => {
  const carCategoryRepository = new CarCategoryRepository()
  const carCategoryEntity = new CarCategoryEntity(carCategoryRepository)

  return new DeleteCarCategoryController(carCategoryEntity)
}

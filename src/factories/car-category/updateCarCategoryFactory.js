import { CarCategoryRepository } from '../../repositories/car-category/carCategoryRepository.js'
import { CarCategoryEntity } from '../../entities/car-category/carCategory.js'
import { UpdateCarCategoryController } from '../../controllers/car-category/updateCarCategoryController.js'

export const updateCarCategoryFactory = () => {
  const carCategoryRepository = new CarCategoryRepository()
  const carCategoryEntity = new CarCategoryEntity(carCategoryRepository)

  return new UpdateCarCategoryController(carCategoryEntity)
}

import { CarRepository } from '../../repositories/car/carRepository.js'
import { CarCategoryRepository } from '../../repositories/car-category/carCategoryRepository.js'
import { RentCarEntity } from '../../entities/rent-car/rentCarEntity.js'
import { CarUsecase } from '../../usecases/carUsecase.js'
import { RentCarController } from '../../controllers/rent-car/rentCarController.js'

export const rentCarFactory = () => {
  const carRepository = new CarRepository()
  const carCategoryRepository = new CarCategoryRepository()
  const carUsecase = new CarUsecase(carRepository)
  const rentCarEntity = new RentCarEntity(
    carCategoryRepository,
    carRepository,
    carUsecase,
  )

  return new RentCarController(rentCarEntity)
}

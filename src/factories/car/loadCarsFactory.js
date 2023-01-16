import { CarRepository } from '../../repositories/car/carRepository.js'
import { CarEntity } from '../../entities/car/car.js'
import { LoadCarsController } from '../../controllers/car/loadCarsController.js'

export const loadCarsFactory = () => {
  const carRepository = new CarRepository()
  const carEntity = new CarEntity(carRepository)

  return new LoadCarsController(carEntity)
}

import { CarRepository } from '../../repositories/car/carRepository.js'
import { CarEntity } from '../../entities/car/car.js'
import { CarController } from '../../controllers/car/carController.js'

export const carFactory = () => {
  const carRepository = new CarRepository()
  const carEntity = new CarEntity(carRepository)

  return new CarController(carEntity)
}

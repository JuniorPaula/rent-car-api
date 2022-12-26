import faker from 'faker'
import { Car } from '../src/entities/car.js'
import { CarCategory } from '../src/entities/carCategory.js'
import { Customer } from '../src/entities/customer.js'

import * as url from 'url'
import { join } from 'path'

import { writeFile } from 'fs/promises'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))
const seederBaseFolder = join(__dirname, '../', 'database')
const ITEMS_AMOUNT = 2

const carCategory = new CarCategory({
  id: faker.datatype.uuid(),
  name: faker.vehicle.type(),
  carIds: [],
  price: faker.finance.amount(20, 100),
})

const cars = []
const customers = []
for (let i = 0; i <= ITEMS_AMOUNT; i++) {
  const car = new Car({
    id: faker.datatype.uuid(),
    name: faker.vehicle.model(),
    available: true,
    gasAvailable: true,
    releaseYear: faker.date.past().getFullYear(),
  })

  carCategory.carIds.push(car)
  cars.push(car)

  const customer = new Customer({
    id: faker.datatype.uuid(),
    name: faker.name.firstName(),
    age: faker.random.number({ min: 18, max: 50 }),
  })

  customers.push(customer)
}

const write = (filename, data) =>
  writeFile(join(seederBaseFolder, filename), JSON.stringify(data))

;(async () => {
  await write('cars.json', cars)
  await write('customers.json', customers)
  await write('carCategory.json', [carCategory])
})()

import faker from 'faker'

console.log({
  id: faker.random.uuid(),
  name: faker.name.firstName(),
})

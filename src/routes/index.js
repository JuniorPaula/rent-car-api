import { Router } from 'express'
import carCategoryRoutes from './carCategoryRoutes.js'
import carRoutes from './carRoutes.js'

export const setupRoutes = (app) => {
  const router = Router()
  app.use('/', router)

  carCategoryRoutes(router)
  carRoutes(router)
}

import { Router } from 'express'
import carCategoryRoutes from './carCategoryRoutes.js'

export const setupRoutes = (app) => {
  const router = Router()
  app.use('/', router)

  carCategoryRoutes(router)
}

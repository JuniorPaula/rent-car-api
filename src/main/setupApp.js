import setupJsonParse from '../middlewares/jsonParse.js'
import setupContentType from '../middlewares/contentType.js'

export const setupApp = (app) => {
  app.use(setupContentType)
  app.use(setupJsonParse)
}

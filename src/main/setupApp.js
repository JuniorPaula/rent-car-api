import setupJsonParse from '../middlewares/jsonParse.js'

export const setupApp = (app) => {
  app.use(setupJsonParse)
}

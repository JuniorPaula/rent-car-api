import * as dotenv from 'dotenv'
import { MongoDBProvider } from '../providers/mongodbProvider.js'

dotenv.config()
MongoDBProvider.connect(process.env.MONGODB_URL)
  .then(async () => {
    const app = (await import('./app.js')).default
    app.listen(process.env.PORT, () =>
      console.info(`server is running at port ${process.env.PORT}`),
    )
  })
  .catch(console.error)

import express, { Application } from 'express'
import Server from './src/index'
import connection from './src/config/db.config'

const app: Application = express()
const server: Server = new Server(app)
const PORT: number = process.env.PORT ? parseInt(process.env.PORT, 10) : 8080

const start = async (): Promise<void> => {
  try {

    await connection.sync();

    app
      .listen(PORT, 'localhost', function () {
        // console.log('This is for testing only...')
        console.log(`Server is running on port ${PORT}`)
      })
      .on('error', (err: any) => {
        if (err.code === 'EADDRINUSE') {
          console.log('Error: address already in use')
        } else {
          console.log(err)
        }
      })
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}
void start()

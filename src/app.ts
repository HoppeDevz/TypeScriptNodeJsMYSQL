import express from 'express'
import cors from 'cors'
import mysql from 'mysql'

class App {
    public express: express.Application

    constructor () {
      this.express = express()

      this.middlewares()
      this.routes()
    }

    private middlewares (): void {
      this.express.use(express.json())
      this.express.use(cors())
    }

    private async getAllUsers () : Promise<string> {
      const connection = mysql.createConnection({
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'vrp'
      })

      connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
        if (results && fields) { } // read results and fields
        if (error) throw error
        console.log('Conectado com o banco de dados!')
      })

      return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM vrp_users', function (error, results, fields) {
          if (fields) { } // read fields
          if (error) throw error && reject(error)
          resolve(results)
        })
      })
    }

    private routes (): void {
      this.express.get('/users/all', (req, res) => {
        this.getAllUsers().then(response => {
          console.log(response)
          res.status(200).json(response)
        }).catch(err => {
          console.log(err)
          res.status(400).json({ error: true })
        })
      })
    }
}

export default new App().express

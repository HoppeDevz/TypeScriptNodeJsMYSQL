import { Request, Response } from 'express'
import mysql from 'mysql'

const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'typescript'
})

class UserController {
  public async allUsers (req: Request, res: Response): Promise<Response> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM users', function (error, results, fields) {
        if (fields) { }// read fields
        if (error) throw error && reject(error)
        if (results) {
          res.status(200).send(results)
          resolve(results)
        }
      })
    })
  }

  public async createUser (req: Request, res: Response): Promise<Response> {
    return new Promise((resolve, reject) => {
      const { username, password } = req.body
      connection.query(`SELECT * FROM users WHERE username = "${username}"`, (error, results, fields) => {
        if (error) { throw error } else {
          if (results) {
            if (results.length > 0) {
              res.status(200).send({ createdAccount: false, reason: 'Username already exist' })
            } else {
              connection.query(`INSERT INTO users (username,password) VALUES ("${username}","${password}")`, (error, results, fields) => {
                if (error) { throw error } else {
                  res.status(200).send({ createdAccount: true })
                }
              })
            }
          }
        }
      })
    })
  }
}

export default new UserController()

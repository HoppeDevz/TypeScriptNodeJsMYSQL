import { Router } from 'express'
import UserController from './controllers/UserController'

const routes = Router()

routes.get('/users', UserController.allUsers)
routes.post('/users/createAccount', UserController.createUser)

export default routes

import * as express from 'express';
import { authentification } from '../middleware/authentification';
import { UserController } from '../controllers/user.controllers';
import { authorization } from '../middleware/authorization';
import { AuthController } from '../controllers/auth.controller';

const Router = express.Router();

// Router.get('/users', authentification, authorization(['admin']), UserController.getUsers);
Router.post('/signup', UserController.signup);
Router.post('/login', AuthController.login);

export { Router as userRouter };

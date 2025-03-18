import { Router } from 'express';
import UserController from '../controllers/user.controller.js';

const route = Router();
route.get('/', UserController.test);

route.post('/register', UserController.register);
route.post('/login', UserController.login);

export default route;

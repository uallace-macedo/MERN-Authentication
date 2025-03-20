import { Router } from 'express';
import UserController from '../controllers/user.controller.js';
import protectRoute from '../middlewares/protectRoute.js';

const route = Router();
route.get('/', protectRoute, UserController.getUser);

route.post('/register', UserController.register);
route.post('/login', UserController.login);
route.post('/logout', UserController.logout);

route.patch('/update', UserController.update);

export default route;

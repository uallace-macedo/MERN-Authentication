import { Router } from 'express';
import AdminController from '../controllers/admin.controller.js';
import { protectRoute, adminRoute } from '../middlewares/auth.middleware.js';

const routes = Router();

routes.get('/users/', protectRoute, adminRoute, AdminController.getUsers);
routes.delete('/users/:id', protectRoute, adminRoute, AdminController.deleteUser);

export default routes;

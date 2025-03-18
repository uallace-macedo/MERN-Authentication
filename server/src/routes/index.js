import { Router } from 'express';
import UserRoutes from './user.routes.js';

const routes = Router();
routes.use('/api/v1/user', UserRoutes);

routes.get('/api/v1/', (req, res) => {
  res.json({ status: 'OK' });
});

export default routes;

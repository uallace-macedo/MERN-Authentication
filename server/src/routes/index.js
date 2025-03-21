import { Router } from 'express';
import UserRoutes from './user.routes.js';
import AdminRoutes from './admin.routes.js';

const routes = Router();
routes.use('/api/v1/user', UserRoutes);
routes.use('/api/v1/admin', AdminRoutes);

routes.get('/api/v1/', (req, res) => {
  res.json({ status: 'OK' });
});

export default routes;

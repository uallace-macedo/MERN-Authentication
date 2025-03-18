import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if(!token) return res.status(401).json({ success: false, message: 'Não autorizado. Por favor, faça login!' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select('-password');

    if(!user) return res.status(404).json({ success: false, message: 'Usuário não encontrado.' });
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Não autorizado. Por favor, faça login!' });
  }
};

export default protectRoute;

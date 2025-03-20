import bcrypt from 'bcrypt';

import generateToken from '../utils/generateToken.js';
import validateUserRegister from '../utils/validateUserRegister.js';
import User from '../models/user.model.js';

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    if(user) return res.status(200).json({ success: true, user });
    res.status(404).json({ success: false, message: 'Usuário não encontrado.' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erro interno no servidor ao buscar dados do usuário.' });
  }
}

const register = async (req, res) => {
  const validation = await validateUserRegister(req);
  if(!validation.isValid) return res.status(400).json({ success: false, message: validation.message });

  const user = validation.user;
  const { _id, name, email, role, photo, bio, isVerified } = user;

  const token = generateToken(_id);
  res.cookie('token', token, {
    path: '/',
    maxAge: (8 * 60 * 60 * 1000),
    httpOnly: true,
    sameSite: true
  });
  res.status(201).json({ _id, name, email, role, photo, bio, isVerified, token });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if(!email || !password || email.trim() === '' || password.trim() === '') return res.status(400).json({ success: false, message: 'Por favor, preencha todos os campos!' });

  try {
    const user = await User.findOne({ email });
    const { _id, name, role, password: userPassword } = user;
    const correctPass = await bcrypt.compare(password, userPassword);

    if(correctPass) {
      const token = generateToken(user._id);

      res.cookie('token', token, {
        path: '/',
        maxAge: (8 * 60 * 60 * 1000),
        httpOnly: true,
        sameSite: true
      })

      return res.status(200).json({ success: true, message: 'Logado com sucesso!', user: { _id, name, email, role } });
    }

    return res.status(400).json({ success: false, message: 'Usuário ou senha incorretos.' });

  } catch (error) {
    if(error instanceof TypeError) return res.status(400).json({ success: false, message: 'Usuário ou senha incorretos.' });
    return res.status(500).json({ success: false, message: 'Erro interno no servidor.', error: error.message });
  }
}

const logout = async (req, res) => {
  delete req.user;
  res.clearCookie('token');
  res.status(200).json({ success: true, message: 'Usuário deslogado com sucesso!' });
}

const update = async (req, res) => {
  const user = await User.findById(req.user._id);
  if(!user) return res.status(404).json({ success: false, message: 'Usuário não encontrado.' });

  try {
    const { name, bio, photo } = req.body;
    const updated = { $set: { name: name || user.name, bio: bio || user.bio, photo: photo || user.photo } };
    const newUser = await User.findByIdAndUpdate(user._id, updated, { new: true }).select('-password');
    req.user = newUser;

    res.status(200).json({ newUser });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Erro interno no servidor' });
  }
}

const UserController = {
  getUser: async (req, res) => await getUser(req, res),
  register: async (req, res) => await register(req, res),
  login: async (req, res) => await login(req, res),
  logout: async (req, res) => await logout(req, res),
  update: async (req, res) => await update(req, res),
}

export default UserController;

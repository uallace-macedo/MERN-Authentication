import bcrypt from 'bcrypt';

import generateToken from '../utils/generateToken.js';
import validateUserRegister from '../utils/validateUserRegister.js';
import User from '../models/user.model.js';

const test = (req, res) => {
  res.json({ path: 'USER', status: 'OK' });
};

const register = async (req, res) => {
  const validation = await validateUserRegister(req);
  if(!validation.isValid) return res.status(400).json({ message: validation.message });

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

const UserController = {
  test: (req, res) => test(req, res),
  register: (req, res) => register(req, res),
  login: (req, res) => login(req, res)
}

export default UserController;

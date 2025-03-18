import bcrypt from 'bcrypt';
import User from '../models/user.model.js';

const validateUserRegister = async (req) => {
  const { name, email, password } = req.body;
  if(!name || !email || !password) return { isValid: false, message: 'Por favor, forneça todos os campos!' };
  if(password.length < 6) return { isValid: false, message: 'A senha precisa ter 6 ou mais caracteres' };

  const userExists = await User.findOne({ email });
  if(userExists) return { isValid: false, message: 'Esse email já está em uso!' };

  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({ name, email, password: hashedPassword });
  if(user) return { isValid: true, user };
  return { isValid: false, message: 'Dados de usuário inválidos.' };
};

export default validateUserRegister;

import User from "../models/user.model.js";

const getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    if(!users.length) return res.status(404).json({ success: false, message: 'Nenhum usuário encontrado.' });

    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erro interno no servidor' });
  }
}

const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if(!deletedUser) return res.status(404).json({ success: false, message: 'Usuário não encontrado.' });

    return res.status(200).json({ success: true, message: 'Usuário deletado com sucesso!', deletedUser });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erro interno no servidor' });
  }
}

const AdminController = {
  getUsers: async (req, res) => await getUsers(req, res),
  deleteUser: async (req, res) => await deleteUser(req, res)
};

export default AdminController;

import ClienteModel from '../models/ClienteModel';

const clienteModel = new ClienteModel();

class ClienteController {
  async store(req, res) {
    try {
      const {
        name, email, phone, adress, cpf,
      } = req.body;
      await clienteModel.criaCliente({
        name, email, phone, adress, cpf,
      });

      return res.status(200).json({
        message: 'Usuario cadastrado com sucesso', name, email, phone, adress, cpf,
      });
    } catch (e) {
      return res.status(500).json({ error: 'erro ao cadastrar o usuario', details: e.message });
    }
  }

  async index(req, res) {
    try {
      const findAllUsers = await clienteModel.getCliente();
      return res.json(findAllUsers);
    } catch (e) {
      return res.status(500).json({ error: 'Erro ao buscar usuários', details: e.message });
    }
  }

  async show(req, res) {
    try {
      const oneUser = await clienteModel.getOneCliente(req.params.id);
      return res.status(201).json({ message: 'Usuario encontrado', user: oneUser });
    } catch (e) {
      console.log(e);
      return res.status(500).json({ messagem: 'Erroao encontrar o usuario', details: e.message });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const novoUser = req.body;

      await clienteModel.updateUser(id, novoUser);

      return res.status(200).json({ message: 'Usuario alterado com sucessso' });
    } catch (e) {
      return res.status(200).json({ message: 'erro ao editar o usuario' });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;

      await clienteModel.deleteUser(id);

      return res.status(201).json({ message: 'Usuario excluido com sucesso' });
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: 'erro ao excluir o usuario', e });
    }
  }
}

export default new ClienteController();

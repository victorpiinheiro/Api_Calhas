import FuncionariosModel from '../models/FuncionariosModel';

const funcionarioModel = new FuncionariosModel();

class FuncionarioController {
  async store(req, res) {
    try {
      const {
        name, position, hireDate, salary,
      } = req.body;

      const formataData = new Date(hireDate);

      await funcionarioModel.criaFuncionario({
        name, position, hireDate: formataData, salary,
      });
      return res.status(200).json({
        message: 'Usuario cadastrado com sucesso', name, position, hireDate, salary,
      });
    } catch (e) {
      console.log(e);
      return res.json('erro ao cadastrado o usuario ');
    }
  }

  async index(req, res) {
    try {
      const users = await funcionarioModel.ListaFuncionarios();

      if (users.length < 1) {
        return res.status(200).json({ message: 'Sem dados para mostrar' });
      }
      return res.status(200).json(users);
    } catch (e) {
      return res.status.json({ message: 'erro ao encontrar usuarios' });
    }
  }

  async show(req, res) {
    try {
      const user = await funcionarioModel.ListaUmFuncionario(req.params.id);

      if (user == null) {
        return res.status(200).json('Usuario nao encontrado');
      }
      return res.status(200).json({ message: 'Usuario encontrado', user });
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: 'Erro ao encontrar o usuario', e });
    }
  }

  async update(req, res) {
    console.log(req.body);
    console.log(req.params.id);

    try {
      const {
        name, position, hireDate, salary,
      } = req.body;

      const formataData = new Date(hireDate);

      const user = funcionarioModel.editaFuncionaro(req.params.id, {
        name, position, hireDate: formataData, salary,
      });

      return res.status(200).json({ message: 'Usuario editado com sucesso', user });
    } catch (e) {
      console.log(e.code);
      return res.status(500).json({ message: 'Erro ao editar o usuario' });
    }
  }

  async delete(req, res) {
    try {
      await funcionarioModel.deleteUser(req.params.id);
      return res.status(200).json('usuario deletado com sucesso');
    } catch (error) {
      return res.status(500).json('erro ao deletar o usuario');
    }
  }
}

export default new FuncionarioController();

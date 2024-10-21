import FuncionariosModel from '../models/FuncionariosModel';

const funcionarioModel = new FuncionariosModel();

class FuncionarioController {
  async store(req, res) {
    try {
      const {
        name, position, hireDate,
        salary, address, data_nascimento,
        departamento, email, observacoes, phone,
        status,
      } = req.body;

      if (!name || !email || !hireDate || !salary || !phone) {
        return res.status(400).json({ message: 'os campos são obrigatórios' });
      }
      const formatDate = (dateString) => {
        const [day, month, year] = dateString.split('/');
        return new Date(`${year}-${month}-${day}`);
      };
      const formataDataHireDate = formatDate(hireDate);
      const formataDataNascimento = formatDate(data_nascimento);

      if (isNaN(formataDataHireDate.getTime()) || isNaN(formataDataNascimento.getTime())) {
        return res.status(400).json({ message: 'Data inválida' });
      }

      const funcionario = await funcionarioModel.criaFuncionario({

        name,
        data_nascimento: formataDataNascimento,
        email,
        phone,
        address,
        salary,
        hireDate: formataDataHireDate,
        position,
        departamento,
        status,
        observacoes,
      });

      if (!funcionario) {
        return res.status(500).json({ message: 'Erro ao cadastrar o usuário no banco de dados' });
      }

      return res.status(200).json({
        message: 'Usuário cadastrado com sucesso',
        data: {
          name,
          position,
          hireDate: formataDataHireDate,
          salary,
        },
      });
    } catch (e) {
      console.log(e);
      return res.json('Erro ao cadastrar o usuário');
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
      return res.status(500).json({ message: 'erro ao encontrar usuarios' });
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

      const user = funcionarioModel.editaFuncionario(req.params.id, {
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

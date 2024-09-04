import FuncionariosModel from '../models/FuncionariosModel';

const funcionarioModel = new FuncionariosModel();

class FuncionarioController {
  async store(req, res) {
    try {
      const {
        name, position, hireDate, salary,
      } = req.body;

      const formataData = new Date(hireDate.split(' ')[0]);

      await funcionarioModel.criaFuncionario({
        name, position, hireDate: formataData, salary,
      });
      res.status(200).json({
        message: 'Usuario cadastrado com sucesso', name, position, hireDate, salary,
      });
    } catch (e) {
      console.log(e);
      res.json('erro ao cadastrado o usuario ');
    }
  }
}

export default new FuncionarioController();

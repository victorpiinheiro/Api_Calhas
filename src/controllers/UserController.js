import validator from 'validator';
import bcrypt from 'bcryptjs';
import UserModel from '../models/UserModel';

const userModel = new UserModel();

class User {
  async store(req, res) {
    try {
      const { name, email, password } = req.body;

      if (password.length < 6 || password.length > 30) {
        return res.status(400).json('A senha deve ter entre 6 e 50 caracatres');
      }
      if (!validator.isEmail(email)) return res.status(400).json('email invalido');

      const userExist = await userModel.verifyUser(email);
      if (userExist) return res.status(409).json('Email ja existente');

      const password_hash = await bcrypt.hash(password, 8);

      const newUser = await userModel.createUser({ name, email, password_hash });

      return res.status(201).json({ user: newUser });
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        errors: e.errors,
      });
    }
  }

  async index(req, res) {
    try {
      const users = await userModel.listAllUsers();
      if (!users) res.status(200).json({ message: 'Não há usuarios para mostrar' });
      res.status(200).json({ users });
    } catch (e) {
      res.status(500).json({ message: e.errors });
    }
  }

  async show(req, res) {
    try {
      const user = await userModel.getUserById(req.userId);
      if (!user) res.status(200).json({ message: 'Usuario nao foi encontrado' });

      return res.status(200).json({ user });
    } catch (e) {
      return res.status(500).json({ message: e.errors });
    }
  }

  async update(req, res) {
    const { id } = req.params;
    const {
      name, email, senhaAtual, novaSenha,
    } = req.body;
    try {
      const userByid = await userModel.getUserById(id);
      if (!userByid) return res.status(404).json({ message: 'Usuario nao encontrado' });

      if (senhaAtual && novaSenha) {
        const hashCompare = await bcrypt.compare(senhaAtual, userByid.password_hash);
        if (!hashCompare) return res.json('As senhas nao coincidem');
      }

      const hashNovaSenha = await bcrypt.hash(novaSenha, 8);
      userByid.password_hash = hashNovaSenha;

      const userEditado = await userModel.UpdateUser(
        id,
        { name, email, password_hash: userByid.password_hash },
      );
      return res.json({ message: 'Usuario editado com sucesso', user: userEditado });
    } catch (e) {
      return res.status(500).json({ message: e.errors });
    }
  }

  async delete(req, res) {
    const { id } = req.params;
    const { senhaAtual } = req.body;

    try {
      const user = await userModel.getUserById(id);
      if (!user) return res.status(404).json('Id invalido');

      const compareUser = await bcrypt.compare(senhaAtual, user.password_hash);

      if (!compareUser) {
        return res.status(404).json({ message: 'insira uma senha valida para excluir o usuario' });
      }

      await userModel.deleteUser(id);
      return res.status(200).json({ message: 'usuario excluido com sucesso' });
    } catch (e) {
      return res.status(500).json({ message: e.errors });
    }
  }
}

export default new User();

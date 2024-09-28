import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/UserModel';

const user = new User();

class TokenController {
  async store(req, res) {
    try {
      const { email = '', password = '' } = req.body;
      if (!email || !password) {
        return res.status(401).json({
          errors: ['Credenciais invalidas'],

        });
      }
      const verificaEmail = await user.verifyUser(email);
      if (!verificaEmail) {
        return res.status(401).json({
          errors: ['Email nao encontrado'],
        });
      }

      const verificaSenha = await bcrypt.compare(password, verificaEmail.password_hash);
      if (!verificaSenha) {
        return res.status(401).json({
          errors: ['senha incorreta'],
        });
      }

      const { id } = verificaEmail;
      const token = jwt.sign({ id, email }, process.env.TOKEN_SECRET, {
        expiresIn: process.env.TOKEN_EXPIRATION,
      });

      return res.status(200).json({
        token,
      });
    } catch (e) {
      return res.status(500).json({
        errors: ['Erro ao gerar o token'],
      });
    }
  }
}

export default new TokenController();

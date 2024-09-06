import ProdutoModel from '../models/ProdutosModel';

const produtoModel = new ProdutoModel();

class ProdutoController {
  async store(req, res) {
    try {
      const novoProduto = await produtoModel.criaProduto(req.body);
      return res.status(200).json({ message: 'Produto cadastrado com sucesso', produto: novoProduto });
    } catch (e) {
      console.log(e);
      return res.json('erro ao cadastrar o produto');
    }
  }

  async index(req, res) {
    try {
      const allProd = await produtoModel.FindAllProd();
      if (!allProd) return res.json('Nao há protudos para mostrar');
      return res.status(200).json(allProd);
    } catch (e) {
      return res.json('erro ao buscar produtos');
    }
  }

  async show(req, res) {
    try {
      const oneProd = await produtoModel.findOneProd(req.params.id);
      if (!oneProd) return res.json('Id nao encontrado ou nao existe');
      return res.status(200).json({ message: 'produto encontardo', oneProd });
    } catch (e) {
      return res.json('Erro ao encontrar produto');
    }
  }

  async update(req, res) {
    try {
      const {
        name, description, price, stock,
        imageUrl,
      } = req.body;
      const { id } = req.params;
      const editProd = await produtoModel.editProd(id, {
        name, description, price, stock, imageUrl,
      });

      if (!id) return res.json('Id invalidado');

      return res.status(200).json({ message: 'Usuario alterado com sucesso', editProd });
    } catch (e) {
      console.log(e);
      return res.json('Erro ao editar o usuarios');
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      if (!id) return res.json('Id invalidado');
      const deleteProd = await produtoModel.deleteProd(id);
      return res.status(200).json({ message: 'usuario deletado com sucesso', deleteProd });
    } catch (e) {
      return res.json('Erro ao deletar o usuario');
    }
  }
}

export default new ProdutoController();

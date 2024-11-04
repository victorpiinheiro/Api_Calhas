import PedidoModel from '../models/PedidosModel';
import ClienteModel from '../models/ClienteModel';

const clienteModel = new ClienteModel();
const pedidoModel = new PedidoModel();

class Pedidos {
  async store(req, res) {
    try {
      const { clienteId } = req.body;
      const clientExist = await clienteModel.getOneCliente(clienteId);
      if (!clientExist) return res.status(404).json({ message: 'Cliente nao encontrado ou nao existe' });

      const newPedido = await pedidoModel.createPedido(req.body);
      return res.status(200).json({ message: 'Pedido cadastrado com sucesso', pedido: newPedido });
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: e.errors });
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(401).json({
          errors: ['Id invalido ou nao informado'],
        });
      }

      const getPedido = await pedidoModel.getPedidoById(id);

      if (!getPedido) {
        return res.status(401).json({
          errors: ['pedido nao encontrado'],
        });
      }

      return res.status(200).json({
        pedido: getPedido,
      });
    } catch (e) {
      return res.status(500).json({
        errors: ['erro ao procurar pedido'],
      });
    }
  }

  async index(req, res) {
    try {
      const pedidos = await pedidoModel.getAllPedidos();

      if (pedidos.length === 0) {
        return res.status(401).json({
          error: 'nenhum pedido encontrado',
        });
      }

      const formataDados = pedidos.map((pedido) => {
        const {
          id,
          clienteId,
          description, price, status, dataPedido,
        } = pedido;

        const [ano, mes, dia] = dataPedido.toISOString().split('T')[0].split('-');
        const formataData = `${dia}/${mes}/${ano}`;

        return {
          id, clienteId, description, price, status, dataPedido: formataData,
        };
      });

      return res.status(200).json(formataDados);
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        errors: ['erro ao procurar pedido'],
      });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(401).json({
          errors: ['Id nao informado ou invalido'],
        });
      }
      const procuraPedido = await pedidoModel.getPedidoById(id);
      if (!procuraPedido) {
        return res.status(401).json({
          message: ['Pedido nao encontrado ou nao existe'],
        });
      }

      await pedidoModel.deletePedidoByid(id);
      return res.status(200).json({
        message: ['pedido deletado com sucesso'],
      });
    } catch (e) {
      console.log(e);
      return res.status(400).json({
        errors: ['Erro ao excluir o pedido'],
      });
    }
  }

  async update(req, res) {
    const { id } = req.params;
    const {
      description, status, price,
    } = req.body;

    if (!description || !status || !price) {
      return res.status(201).json({
        errors: ['Dados invalidos'],
      });
    }
    const VerificaPedidoExistente = await pedidoModel.getPedidoById(id);
    if (!VerificaPedidoExistente) {
      return res.status(201).json({
        errors: ['Pedido nao encontrado ou nao existe'],
      });
    }

    await pedidoModel.updateOrders(id, { description, status, price });

    return res.status(200).json({
      message: `Pedido nº (${id}) alterado com sucesso`,

    });
  }
}

export default new Pedidos();

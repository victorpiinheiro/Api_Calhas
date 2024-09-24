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
        users: getPedido,
      });
    } catch (e) {
      return res.status(500).json({
        errors: ['erro ao procurar usuario'],
      });
    }
  }

  async index(req, res) {
    try {
      const pedidos = await pedidoModel.getAllPedidos();
      console.log(pedidos.length);
      if (pedidos.length === 0) {
        return res.status(401).json({
          errors: ['nao há registros'],
        });
      }
      const [{
        description, price, status, dataPedido, id,
      }] = pedidos;

      const [ano, mes, dia] = new Date(dataPedido).toISOString().split('T')[0].split('-');
      const organizaData = `${dia}/${mes}/${ano}`;

      return res.status(200).json({
        pedidos: {
          id, description, status, dataPedido: organizaData, price,
        },
      });
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
}

export default new Pedidos();

import PedidoModel from '../models/PedidosModel';

const pedidoModel = new PedidoModel();

class Pedidos {
  async store(req, res) {
    try {
      const { clienteId } = req.body;
      const clientExist = await pedidoModel.getClientById(clienteId);
      if (!clientExist) return res.status(404).json({ message: 'Cliente nao encontrado ou nao existe' });

      const newPedido = await pedidoModel.createPedido(req.body);
      return res.status(200).json({ message: 'Pedido cadastrado com sucesso', pedido: newPedido });
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: e.errors });
    }
  }
}

export default new Pedidos();

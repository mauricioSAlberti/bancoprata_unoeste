import Cliente from '../Modelo/Cliente.js';

export default class ClienteCtrl {
  // ------------------------GRAVAR CLIENTE NO BANCO DE DADOS------------------------
  cadastrar(req, resp) {
    resp.type('application/json');
    if (req.method === 'POST' && req.is('application/json')) {
      const dados = req.body;
      const nome = dados.nome;
      const cpf = dados.cpf;
      const dataNasc = dados.dataNasc;
      const email = dados.email;
      const telefone = dados.telefone;
      const endereco = dados.endereco;
      const cidade = dados.cidade;
      const uf = dados.uf;
      const cod_ag = dados.cod_ag;

      if (nome && cpf && dataNasc && email && telefone && endereco && cidade && uf && cod_ag) {
        const cliente = new Cliente(0, nome, cpf, dataNasc, email, telefone, endereco, cidade, uf, cod_ag);
        cliente
          .cadastrarBD()
          .then(() => {
            resp.status(200).json({
              status: true,
              cod_cli: cliente.cod_cli,
              msg: 'Cliente criado com sucesso!',
            });
          })
          .catch((erro) => {
            resp.status(500).json({
              status: false,
              msg: erro.message,
            });
          });
      } else {
        resp.status(400).json({
          status: false,
          msg: 'Informe todos os dados do cliente: nome, CPF, data de nascimento, email, telefone, endereço, cidade, UF e código da agência',
        });
      }
    } else {
      // 4xx = 'Client error'
      resp.status(400).json({
        status: false,
        msg: 'O método não é permitido ou cliente no formato JSON não foi fornecido. Consulte a documentação da API!',
      });
    }
  }

  // ------------------------ALTERAR O CLIENTE NO BANCO DE DADOS------------------------
  alterar(req, resp) {
    resp.type('application/json');
    if (req.method === 'PUT' && req.is('application/json')) {
      const dados = req.body;
      const cod_cli = dados.cod_cli;
      const nome = dados.nome;
      const cpf = dados.cpf;
      const dataNasc = dados.dataNasc;
      const email = dados.email;
      const telefone = dados.telefone;
      const endereco = dados.endereco;
      const cidade = dados.cidade;
      const uf = dados.uf;
      const cod_ag = dados.cod_ag;

      if (cod_cli && nome && cpf && dataNasc && email && telefone && cidade && uf && cod_ag) {
        const cliente = new Cliente(cod_cli, nome, cpf, dataNasc, email, telefone, endereco, cidade, uf, cod_ag);
        cliente
          .alterarBD()
          .then(() => {
            resp.status(200).json({
              status: true,
              msg: `Endereço do cliente ${cod_cli} alterado com sucesso!`,
            });
          })
          .catch((erro) => {
            resp.status(500).json({
              status: false,
              msg: erro.message,
            });
          });
      } else {
        resp.status(400).json({
          status: false,
          msg: 'Informe os novos dados do cliente (email, telefone, endereço, cidade, UF e código da agência).',
        });
      }
    } else {
      // 4xx = 'Client error'
      resp.status(400).json({
        status: false,
        msg: 'O método não é permitido ou cliente no formato JSON não foi fornecido. Consulte a documentação da API!',
      });
    }
  }

  // ------------------------EXCLUIR O CLIENTE DO BANCO DE DADOS------------------------
  excluir(req, resp) {
    resp.type('application/json');
    if (req.method === 'DELETE' && req.is('application/json')) {
      const dados = req.body;
      if (dados.cod_cli) {
        const cliente = new Cliente();
        cliente.cod_cli = dados.cod_cli;
        cliente
          .excluirBD()
          .then(() => {
            resp.status(200).json({
              status: true,
              msg: 'Cliente excluído com sucesso!',
            });
          })
          .catch((erro) => {
            resp.status(500).json({
              status: false,
              msg: erro.message,
            });
          });
      } else {
        resp.status(400).json({
          status: false,
          msg: 'Informe o código do cliente a ser excluído.',
        });
      }
    } else {
      // 4xx = 'Client error'
      resp.status(400).json({
        status: false,
        msg: 'O método não é permitido ou cliente no formato JSON não foi fornecido. Consulte a documentação da API!',
      });
    }
  }

  // ------------------------LISTAR TODOS OS CLIENTES------------------------
  listar(req, resp) {
    resp.type('application/json');

    if (req.method === 'GET') {
      const cliente = new Cliente();
      cliente
        .listarBD()
        .then((clientes) => {
          resp.status(200).json(clientes);
        })
        .catch((erro) => {
          resp.status(500).json({
            status: false,
            msg: erro.message,
          });
        });
    } else {
      resp.status(400).json({
        status: false,
        msg: 'O método não é permitido! Consulte a documentação da API!',
      });
    }
  }

  // ------------------------ASSOCIAR PRODUTO A CLIENTE------------------------
  // associarProduto(req, resp) {
  //   resp.type('application/json');
  //   if (req.method === 'POST' && req.is('application/json')) {
  //     const dados = req.body;
  //     const cod_cli= dados.cod_cli;
  //     const cod_prod = dados.cod_prod;

  //     if (cod_cli && cod_prod) {
  //       // const cliente = new Cliente(0, nome, cpf, dataNasc, email, telefone, endereco, cidade, uf, cod_ag);
  //       // CRIAR MODELO CLIENTE_PRODUTO
  //       const cliente_produto = new Cliente_Produto(cod_ag, cod_prod);
  //       // console.log('Cliente cadastrado (endereço) / (cidade):', cliente.endereco, cliente.cidade);

  //       cliente_produto
  //         .cadastrarBD()
  //         .then(() => {
  //           resp.status(200).json({
  //             status: true,
  //             cod_ag: cliente_produto.cod_ag, //nao retirar
  //             cod_prod: cliente_produto.cod_prod,
  //             msg: 'Cliente criado com sucesso!',
  //           });
  //         })
  //         .catch((erro) => {
  //           resp.status(500).json({
  //             status: false,
  //             msg: erro.message,
  //           });
  //         });
  //     } else {
  //       resp.status(400).json({
  //         status: false,
  //         msg: 'Informe todos os dados do cliente: nome, CPF, data de nascimento, email, telefone, endereço, cidade, UF e código da agência',
  //       });
  //     }
  //   } else {
  //     // 4xx = 'Client error'
  //     resp.status(400).json({
  //       status: false,
  //       msg: 'O método não é permitido ou agência no formato JSON não foi fornecida. Consulte a documentação da API!',
  //     });
  //   }
  // }
}

import ProdutoBD from '../Persistencia/ProdutoBD.js';
import conectar from '../Persistencia/Conexao.js';

export default class Produto {
  #cod_prod;
  #nome;

  constructor(cod_prod, nome) {
    this.#cod_prod = cod_prod;
    this.#nome = nome;
  }

  // MÉTODOS PÚBLICOS

  // CÓDIGO DO PRODUTO
  get cod_prod() {
    return this.#cod_prod;
  }
  set cod_prod(novoCod_Prod) {
    this.#cod_prod = novoCod_Prod;
  }

  // NOME DO PRODUTO
  get nome() {
    return this.#nome;
  }
  set nome(novoNome) {
    this.#nome = novoNome;
  }

  toJSON() {
    return {
      cod_prod: this.#cod_prod,
      nome: this.#nome,
    };
  }

  // ------------------------------------CADASTRAR PRODUTO------------------------------------
  async cadastrarBD() {
    const produtoBD = new ProdutoBD();
    this.cod_prod = await produtoBD.cadastrar(this);
  }

  // ------------------------------------ALTERAR PRODUTO ------------------------------------
  async alterarBD() {
    const produtoBD = new ProdutoBD();
    await produtoBD.alterar(this);
  }
  // ------------------------------------EXCLUIR PRODUTO------------------------------------
  async excluirBD() {
    const produtoBD = new ProdutoBD();
    await produtoBD.excluir(this);
  }

  // ------------------------------------CONSULTAR PRODUTOS------------------------------------
  async listarBD(cod_prod) {
    if (cod_prod == undefined) {
      const conexao = await conectar();
      const sql = 'SELECT * FROM Produto';
      const parametros = ['%'];
      const [rows] = await conexao.query(sql, parametros);
      const listaProdutos = [];
      for (const row of rows) {
        const produto = new Produto(row['cod_prod'], row['nome']);
        listaProdutos.push(produto);
      }
      return listaProdutos;
    } else {
      const conexao = await conectar();
      const sql = 'SELECT * FROM Produto WHERE cod_prod=?';
      const parametros = [cod_prod];
      const [rows] = await conexao.query(sql, parametros);
      const listaProdutos = [];
      for (const row of rows) {
        const produto = new Produto(row['cod_prod'], row['nome']);
        listaProdutos.push(produto);
      }
      return listaProdutos[0];
    }
  }
}

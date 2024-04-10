import { Button, Col, Form, Row } from 'react-bootstrap';
import Pagina from '../templates/Pagina';
import { LinkContainer } from 'react-router-bootstrap';
import { useEffect, useState } from 'react';
import { hostname, port } from '../dados/dados';

const urlCliente = `http://${hostname}:${port}/cliente`;
const urlAgencia = `http://${hostname}:${port}/agencia`;

export default function TelaCadastrarCliente(props) {
  const [validado, setValidado] = useState(false);
  const [cliente, setCliente] = useState({
    cod_cli: '',
    nome: '',
    cpf: '',
    senha: '',
    dataNasc: '',
    endereco: '',
    cidade: '',
    uf: '',
    email: '',
    telefone: '',
    cod_ag: 0,
  });

  // disable: criar if (éEdição) e dar disable no campo cidade/uf
  // varável e método que vai setar o valor pra variável listaAgencias
  //
  const [listaAgencias, setListaAgencias] = useState([]);
  useEffect(() => {
    fetch(urlAgencia)
      .then((resp) => resp.json())
      .then((data) => {
        console.log('console.log(data):');
        console.log(data);
        setListaAgencias(data);
      })
      .catch((erro) => console.error('Erro ao buscar agências', erro));
  }, []);

  function manipularMudanca(e) {
    const elemForm = e.currentTarget;
    const id = elemForm.id;
    const valor = elemForm.value;
    console.log('teste: ', valor);
    setCliente({ ...cliente, [id]: valor });
  }

  // function manipulaSubmissao(e) {
  //   const form = e.currentTarget;
  //   if (form.checkValidity()) {
  //     // dados válidos → proceder com o cadastro
  //     // let clientes = props.listaClientes;
  //     // clientes.push(cliente);
  //     // props.setCliente(clientes);
  //     console.log(cliente);
  //     // fetch(urlCliente, { method: 'POST' })
  //     fetch(urlCliente, { method: 'POST', body: JSON.stringify(cliente), headers: { 'Content-Type': 'application/json' } })
  //       .then((resp) => resp.json())
  //       .then((data) => setListaAgencias(data))
  //       .catch((erro) => console.error('Erro ao buscar agências', erro));
  //     setValidado(false);
  //     // não encontrei exibirTabela em nenhum lugar
  //     // props.exibirTabela(true);
  //   } else {
  //     setValidado(true);
  //   }
  //   e.preventDefault();
  //   e.stopPropagation();
  // }

  // CÓDIGO NOVO
  function manipulaSubmissao(e) {
    const form = e.currentTarget;
    if (form.checkValidity()) {
      // dados válidos → proceder com o cadastro
      fetch(urlCliente, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cliente),
      })
        .then((resp) => resp.json())
        .then((data) => {
          // Adicionar o produto à lista de produtos após cadastrá-lo no backend
          let novosClientes = [...props.listaClientes, data];
          props.setCliente(novosClientes);
          setValidado(false);
          props.exibirTabela(true);
        })
        .catch((error) => console.error('Erro ao cadastrar cliente:', error));
    } else {
      setValidado(true);
    }
    e.preventDefault();
    e.stopPropagation();
  }
  // CÓDIGO NOVO

  //
  // RETURN
  //
  return (
    <>
      <Pagina>
        <h2>Cadastro de novo cliente</h2>
        <br />
        <Form noValidate validated={validado} onSubmit={manipulaSubmissao}>
          <Row className='mb-3'>
            {/* NOME */}
            <Col xs={5}>
              <Form.Group controlId='nome' style={{ width: '380px' }}>
                <Form.Label>Nome:</Form.Label>
                <Form.Control required type='text' id='nome' value={cliente.nome} onChange={manipularMudanca} />
                <Form.Control.Feedback type='invalid'>Informe o nome do cliente!</Form.Control.Feedback>
              </Form.Group>
            </Col>
            {/* CPF */}
            <Col xs={3}>
              <Form.Group controlId='cpf' style={{ width: '140px' }}>
                <Form.Label>CPF:</Form.Label>
                <Form.Control required type='text' id='cpf' value={cliente.cpf} onChange={manipularMudanca} />
                <Form.Control.Feedback type='invalid'>Informe o CPF do cliente!</Form.Control.Feedback>
              </Form.Group>
            </Col>
            {/* DATA DE NASCIMENTO */}
            <Col xs={3}>
              <Form.Group controlId='dataNasc' style={{ width: '160px' }}>
                <Form.Label>Data de nascimento:</Form.Label>
                <Form.Control required type='date' id='dataNasc' value={cliente.dataNasc} onChange={manipularMudanca} />
                <Form.Control.Feedback type='invalid'>Informe a data de nascimento do cliente!</Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          {/* ENDEREÇO */}
          <Form.Group className='mb-3' controlId='endereco' style={{ width: '340px' }}>
            <Form.Label>Endereço:</Form.Label>
            <Form.Control required type='text' id='endereco' value={cliente.endereco} onChange={manipularMudanca} />
            <Form.Control.Feedback type='invalid'>Informe o endereço do cliente!</Form.Control.Feedback>
          </Form.Group>

          {/* CIDADE */}
          <Row>
            <Col className='mb-3'>
              <Form.Group className='mb-3' controlId='cidade' style={{ width: '340px' }}>
                <Form.Label>Cidade:</Form.Label>
                <Form.Control required type='text' id='cidade' value={cliente.cidade} onChange={manipularMudanca} />
                <Form.Control.Feedback type='invalid'>Informe a cidade onde o cliente reside!</Form.Control.Feedback>
              </Form.Group>
            </Col>

            {/* UF */}
            <Col>
              <Form.Group className='mb-3' controlId='uf'>
                <Form.Label style={{ width: '50px' }}>UF:</Form.Label>
                <br />
                <select className='mb-3' id='uf' onChange={manipularMudanca} value={cliente.uf}>
                  <option></option>
                  <option value='AC'>AC</option>
                  <option value='AL'>AL</option>
                  <option value='AP'>AP</option>
                  <option value='AM'>AM</option>
                  <option value='BA'>BA</option>
                  <option value='CE'>CE</option>
                  <option value='ES'>ES</option>
                  <option value='GO'>GO</option>
                  <option value='MA'>MA</option>
                  <option value='MT'>MT</option>
                  <option value='MS'>MS</option>
                  <option value='MG'>MG</option>
                  <option value='PA'>PA</option>
                  <option value='PB'>PB</option>
                  <option value='PR'>PR</option>
                  <option value='PE'>PE</option>
                  <option value='PI'>PI</option>
                  <option value='RJ'>RJ</option>
                  <option value='RN'>RN</option>
                  <option value='RS'>RS</option>
                  <option value='RO'>RO</option>
                  <option value='RR'>RR</option>
                  <option value='SC'>SC</option>
                  <option value='SP'>SP</option>
                  <option value='SE'>SE</option>
                  <option value='TO'>TO</option>
                  <option value='DF'>DF</option>
                </select>
                <Form.Control.Feedback type='invalid'>Informe o estado da agência!</Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          {/* EMAIL */}
          <Form.Group className='mb-3' controlId='email' style={{ width: '240px' }}>
            <Form.Label>Email:</Form.Label>
            <Form.Control required type='email' id='email' value={cliente.email} onChange={manipularMudanca} />
            <Form.Control.Feedback type='invalid'>Informe o email do cliente !</Form.Control.Feedback>
          </Form.Group>

          {/* TELEFONE */}
          <Form.Group className='mb-3' controlId='telefone' style={{ width: '240px' }}>
            <Form.Label>Telefone:</Form.Label>
            <Form.Control required type='number' id='telefone' value={cliente.telefone} onChange={manipularMudanca} />
            <Form.Control.Feedback type='invalid'>Informe o telefone do cliente !</Form.Control.Feedback>
          </Form.Group>

          <Row style={{ width: '350px' }}>
            {/* AGÊNCIA */}
            <Col>
              <Form.Group className='mb-3' style={{ width: '120px' }}>
                <Form.Label>Agência:</Form.Label>
                {/* <Form.Control required type='number' id='cod_ag' value={cliente.cod_ag} onChange={manipularMudanca} /> */}
                <select onChange={manipularMudanca} value={cliente.cod_ag} id='cod_ag'>
                  {listaAgencias.map((agencia) => (
                    <option key={agencia.cod_ag} value={agencia.cod_ag}>
                      Código: {agencia.cod_ag} | Cidade: {agencia.cidade} | UF: {agencia.uf}
                    </option>
                  ))}
                </select>
                <Form.Control.Feedback type='invalid'>Informe a agência da nova conta!</Form.Control.Feedback>
              </Form.Group>
            </Col>
            {/* REPETIR A SENHA */}
            {/* <Col>
              <Form.Group className='mb-3' controlId='senha' style={{ width: '120px' }}>
                <Form.Label>Repita a senha:</Form.Label>
                <Form.Control required type='password' id='senha' value={cliente.senha} onChange={manipularMudanca} />
                <Form.Control.Feedback type='invalid'>Informe a senha da nova conta!</Form.Control.Feedback>
              </Form.Group>
            </Col> */}
          </Row>

          <br />
          <Row>
            {/* BOTÃO DE CADASTRAR */}
            <Col xs='auto'>
              <Button variant='dark' type='submit'>
                Cadastrar cliente
              </Button>
            </Col>

            {/* BOTÃO DE CANCELAR */}
            <Col xs='auto'>
              <LinkContainer to='/'>
                <Button variant='secondary'>Cancelar</Button>
              </LinkContainer>
            </Col>
          </Row>
          <br />
        </Form>
      </Pagina>
    </>
  );
}

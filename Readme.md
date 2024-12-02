# Livro API - Sistema de Gerenciamento de Livros

## Descrição

Este projeto é uma API simples desenvolvida utilizando **Node.js** e **Express** para gerenciamento de livros. Ele permite realizar operações CRUD (Criar, Ler, Atualizar e Excluir) para uma coleção de livros, bem como a busca de livros por ID.

Além disso, a interface web permite adicionar, procurar, editar e excluir livros, interagindo com a API.

## Autor

- **Nome do autor**: Joao Paulo Oliveira Silva
- **Email**: joaopaulosilva@ipvc.pt
- **Numero**: 26909

## Tecnologias Usadas

- **Node.js**: Ambiente de execução para JavaScript.
- **Express.js**: Framework para construção da API.
- **lowdb**: Banco de dados simples baseado em JSON.
- **Cors**: Middleware para permitir requisições de diferentes origens (CORS).
- **HTML/CSS/JavaScript**: Para o front-end interativo.

## Deploy

Este projeto está disponível para acesso na seguinte URL:

- **URL do deploy**  (https://exc2-sir.onrender.com)

## Dados Utilizados

O sistema utiliza um banco de dados simples em formato JSON armazenado localmente, contendo informações de livros.

### Estrutura dos dados

Cada livro possui os seguintes campos:

- `id`: Identificador único do livro (número inteiro).
- `Titulo`: Título do livro.
- `Ano_Lancamento`: Ano de lançamento do livro (string).
- `Edicao`: Edição do livro (string).
- `Linguagem`: Idioma do livro (string).

Exemplo de dados:

```json
{
  "Livors": [
    {
      "id": "1",
      "Titulo": "Lusiadas",
      "Ano_Lancamento": "1572",
      "Edicao": "1",
      "Linguagem": "PT"
    }
  ]
}
```
### Rotas Implementadas
A API fornece as seguintes rotas para interagir com os dados de livros:

1. GET /Livros
   Retorna a lista de todos os livros.

Exemplo de resposta:
```json

[
{
"id": "1",
"Titulo": "Lusiadas",
"Ano_Lancamento": "1572",
"Edicao": "1",
"Linguagem": "PT"
}
]
```
2. GET /Livros/:id
   Retorna os dados de um livro específico, baseado no id fornecido.

Exemplo de resposta:
```json

[
{
"id": "1",
"Titulo": "Lusiadas",
"Ano_Lancamento": "1572",
"Edicao": "1",
"Linguagem": "PT"
}
]
```
3. POST /Livros/Create
   Cria um novo livro no sistema.

Corpo da requisição:
```json

{
  "Titulo": "Dom Quixote",
  "Ano_Lancamento": "1605",
  "Edicao": "1",
  "Linguagem": "PT"
}

```
Exemplo de resposta:

```json
{
  "message": "Livro criado com sucesso",
  "livro": {
    "id": "2",
    "Titulo": "Dom Quixote",
    "Ano_Lancamento": "1605",
    "Edicao": "1",
    "Linguagem": "PT"
  }
}

```
4. PUT /Livros/Update/
   Atualiza os dados de um livro existente, baseado no id.

Corpo da requisição:

```json
{
  "Titulo": "Dom Quixote",
  "Ano_Lancamento": "1605",
  "Edicao": "2",
  "Linguagem": "ES"
}

```

5. DELETE /Livros/Delete/
   Exclui um livro baseado no id.

Exemplo de resposta:
```json
{
  "message": "Livro removido com sucesso",
  "livro": {
    "id": "2",
    "Titulo": "Dom Quixote",
    "Ano_Lancamento": "1605",
    "Edicao": "1",
    "Linguagem": "PT"
  }
}
```

### Front-end
O projeto inclui uma interface web simples com as seguintes funcionalidades:

Adicionar livro: Preencha os campos de título, ano de lançamento, edição e idioma e clique em "Add Book" para enviar os dados ao servidor.

Buscar livro por ID: Insira um ID no campo de pesquisa e clique em "Search" para buscar o livro correspondente.

Alterar dados do livro: Ao clicar em "Alterar", o livro se torna editável, permitindo que você altere suas informações.

Excluir livro: Ao clicar em "Deletar", o livro será removido da lista.

Instruções para Execução

Clone o repositório:

```bash
git clone https://github.com/seu-usuario/livros-api.git
```

Navegue até o diretório do projeto:

Instale as dependências:

```bash
npm install
```
Inicie o servidor:

```bash
npm start
```

Acesse a aplicação no navegador:

URL local: (https://exc2-sir.onrender.com)

![](/public/images/cover_banner.svg)

# Programação Web 1 
Prof. José Roberto Bezerra

### Introdução

Aplicação de demonstração `contactsApp` utilizada na disciplina Programação Web 1. Permite aos usuários:
- Visualizar todos os contatos em um layout de grade ou tabela
- Adicionar novos contatos
- Editar contatos existentes
- Deletar contatos
- Marcar contatos como favoritos

### Tecnologias

- **Backend:** Node.js com Express 5.x
- **Banco de Dados:** MongoDB
- **View Engine:** EJS
- **Frontend:** HTML5, CSS3, Bootstrap 5.3.8

### Pré-requisitos

- **Node.js** (v14 ou superior)
- **npm** (v6 ou superior)
- **MongoDB** (conexão local ou Atlas)

### Utilização

1. Clonar o repositório do projeto:
   ```bash
   git clone https://github.com/pw1-repo/contactsApp.git
   ```

2. Instalar as dependências
   ```bash
   npm install
   ```

3. Criar um arquivo `.env` no diretório raiz com sua string de conexão MongoDB:
   ```
   URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/mydb
   ```
   Ou para MongoDB local:
   ```
   URI=mongodb://localhost:27017/mydb
   ```

### Configuração do Banco de Dados

1. Criar o banco de dados e a coleção no MongoDB:
   - Database: `mydb`
   - Collection: `contacts`
   - **Caso utilize nomes diferentes altere a linha 12 do `app.js`**

2. Estrutura dos documentos
   ```json
   {
     "_id": ObjectId,
     "nome": "Nome Completo",
     "email": "email@example.com",
     "telefone": "(xx) xxxxx-xxxx",
     "favorito": true/false
   }
   ```

### Executando a aplicação

1. Iniciar o servidor:
   ```bash
   npm start
   ```

2. Acesse a aplicação:
   - Abra seu navegador e navegue para: `http://localhost:3000`

3. Parar o servidor:
   - Pressione `Ctrl + C` no terminal

### Rotas Disponíveis (*endpoints*)

| Rota | Método | Descrição |
|-------|--------|-------------|
| `/` | GET | Página inicial com mensagem de boas-vindas |
| `/all` | GET | Exibir todos os contatos em grade de cartões (3 por linha) |
| `/form/:id` | GET | Exibir formulário para editar contato existente |
| `/form` | POST | Enviar atualizações de contato |
| `/delete/:name` | GET | Deletar contato por nome |
| `/toggle_favorito` | GET | Alternar status de favorito do contato (parâmetro de query: `nome`) |
| `/help` | GET | Página de ajuda |
| `/team` | GET | Página de informações do time |
| `/stack` | GET | Página da pilha tecnológica |

### Funcionalidades Principais

- **Visualizar Contatos:** Navegue por todos os contatos em um layout responsivo em grade
- **Adicionar Contatos:** Crie novos contatos com nome, email e número de telefone
- **Editar Contatos:** Atualize informações de contatos existentes
- **Deletar Contatos:** Remova contatos do banco de dados
- **Alternar Favoritos:** Marque/desmarque contatos como favoritos com atualização instantânea

### Interface do Usuário
- Bootstrap 5.3.8 para design responsivo
- Templates EJS para renderização no lado do servidor
- Manipulação dinâmica de formulários com validação
- Alternância de favoritos em tempo real

### Estrutura de Arquivos

```
contactsApp_data/
├── app.js                 # Aplicação Express principal
├── package.json          # Dependências do projeto
├── bin/
│   └── www              # Ponto de entrada do servidor
├── routes/              # Manipuladores de rotas
│   ├── index.js
│   ├── all.js
│   ├── form.js
│   ├── delete.js
│   ├── toggle_favorito.js
│   ├── help.js
│   ├── team.js
│   └── stack.js
├── views/               # Templates EJS
│   ├── index.ejs
│   ├── all.ejs
│   ├── form.ejs
│   └── partials/       # Componentes reutilizáveis
│       ├── header.ejs
│       ├── footer.ejs
│       ├── card.ejs
│       ├── row.ejs
│       └── table.ejs
├── src/
│   └── dao/
│       └── contactsDAO.js  # Operações de banco de dados
├── public/              # Ativos estáticos
│   ├── stylesheets/
│   ├── javascripts/
│   └── images/
└── .env                # Variáveis de ambiente (não versionado)
```

### Observações

- A aplicação usa cookie-parser para gerenciamento de sessão
- Morgan está configurado para log de requisições HTTP
- Tratamento de erro está implementado para erros 404 e do servidor
- Todas as rotas possuem tratamento de erro apropriado

### Resolução de Problemas

- **Erro de Conexão:** Verifique a string de conexão MongoDB no arquivo `.env`
- **Porta em Uso:** Mude a porta em `bin/www` se a porta 3000 já estiver em uso
- **Módulo Não Encontrado:** Execute `npm install` para garantir que todas as dependências estejam instaladas

### Desenvolvimento

Para desenvolvimento com reinicialização automática em mudanças de arquivo:
```bash
npm install -g nodemon
nodemon ./bin/www
```

### Referências
- [Bootstrap](https://getbootstrap.com/)
- [MongoDB](https://mongodb.com/)
- [dotenv](https://www.npmjs.com/package/npm)
- [EJS](https://ejs.co/)
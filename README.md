# Sistema de Empréstimo de Livros 📚

Este é um sistema web para gerenciamento de empréstimos de livros, desenvolvido em React + TypeScript. O sistema permite o cadastro e controle de livros, usuários, funcionários e empréstimos, com interface amigável e responsiva.

## Funcionalidades

- Cadastro, edição e remoção de **livros**
- Cadastro, edição e remoção de **usuários**
- Cadastro, edição e remoção de **funcionários**
- Registro e controle de **empréstimos** de livros
- Controle de disponibilidade dos livros
- Visualização detalhada de cada entidade
- Persistência local dos dados via `localStorage`
- Interface responsiva para desktop e mobile

## Tecnologias Utilizadas

- [React](https://reactjs.org/) 19
- [TypeScript](https://www.typescriptlang.org/)
- [Create React App](https://create-react-app.dev/)
- CSS customizado

## Como rodar o projeto

1. **Clone o repositório:**
   ```sh
   git clone https://github.com/seu-usuario/seu-repositorio.git
   cd seu-repositorio
   ```

2. **Instale as dependências:**
   ```sh
   npm install
   ```

3. **Inicie o servidor de desenvolvimento:**
   ```sh
   npm start
   ```
   O app estará disponível em [http://localhost:3000](http://localhost:3000).

## Scripts Disponíveis

- `npm start` — Inicia o app em modo desenvolvimento
- `npm run build` — Gera a versão de produção na pasta `build`
- `npm test` — Executa os testes
- `npm run eject` — Eject do Create React App (irreversível)

## Estrutura de Pastas

```
src/
  component/
    book/        # Componentes de livros
    employee/    # Componentes de funcionários
    loan/        # Componentes de empréstimos
    user/        # Componentes de usuários
    shared/      # Componentes compartilhados (Home, estilos)
    styles/      # Arquivos de estilo CSS
  index.tsx      # Ponto de entrada da aplicação
  index.css      # Estilos globais
```

## Observações

- Os dados são salvos no `localStorage` do navegador.
- O campo "registeredBy" do livro pode ser adaptado para registrar o funcionário responsável pelo cadastro.


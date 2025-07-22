# Sistema de Gerenciamento de Empréstimo de Livros

## Introdução

Este projeto consiste em um sistema para gerenciamento de empréstimos de livros. Ele é dividido em duas partes principais: um frontend desenvolvido em React, que oferece a interface de usuário para interação, e um backend construído com ASP.NET Core, responsável pela lógica de negócio e persistência de dados (utilizando um banco de dados em memória). A aplicação permite realizar operações CRUD (Criar, Ler, Atualizar, Deletar) para entidades como Livros, Usuários, Funcionários e Empréstimos.

## Tecnologias Utilizadas

* **Frontend:**
    * [React](https://react.dev/learn)
    * [TypeScript](https://www.typescriptlang.org/)
* **Backend:**
    * [C#](https://learn.microsoft.com/pt-br/dotnet/csharp/tour-of-csharp/)
    * [ASP.NET Core](https://learn.microsoft.com/pt-br/aspnet/core/?view=aspnetcore-9.0)
    * [Entity Framework Core](https://learn.microsoft.com/en-us/ef/) (para banco de dados em memória)
* **Containerização:**
    * [Docker](https://docs.docker.com/)
    * [Docker Compose](https://docs.docker.com/reference/)

## Princípios Empregados

O backend e front-end da aplicação foram desenvolvidos com a aplicação dos princípios SOLID.

## Como Rodar o Projeto

Para executar esta aplicação, você precisará ter o **Docker Desktop** (que inclui Docker Engine e Docker Compose) e o **Git** instalados em sua máquina.

1.  **Clone o Repositório:**
    Abra seu terminal e clone o projeto:
    ```bash
    git clone [https://github.com/FerreiraNanda/trab3-web.git](https://github.com/FerreiraNanda/trab3-web.git)
    cd trab3-web
    ```

2.  **Inicie a Aplicação com Docker Compose:**
    Estando na raiz do projeto (onde o arquivo `docker-compose.yml` está), execute o seguinte comando. Ele irá construir as imagens Docker para o frontend e backend, e iniciá-los em contêineres separados.
    ```bash
    docker-compose up --build -d
    ```

3.  **Acesse a Aplicação:**
    Após o comando acima ser concluído, sua aplicação estará acessível:
    * **Frontend (Interface do Usuário):** Acesse em seu navegador: `http://localhost`
    * **Backend (Documentação da API - Swagger UI):** Acesse a documentação da API em: `http://localhost:5103/swagger`

4.  **Para Parar a Aplicação:**
    Quando quiser parar e remover os contêineres, execute o seguinte comando na raiz do projeto:
    ```bash
    docker-compose down
    ```


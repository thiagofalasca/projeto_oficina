# Projeto de Gestão de Voluntários Universitários

## Objetivo

Desenvolver uma aplicação web que auxilie professores na gestão de alunos voluntários em atividades extracurriculares na universidade. O sistema permite que professores cadastrem atividades para o semestre, que serão automaticamente atribuídas aos alunos cadastrados. Além disso, os alunos podem cadastrar e gerenciar oficinas, das quais serão responsáveis. A plataforma visa facilitar o acompanhamento das atividades e gerar relatórios detalhados sobre os alunos cadastrados e as oficinas.

## Funcionalidades

- **Cadastro de Usuários**: Registro de alunos e professores com informações pessoais, especificando seu tipo de usuário.
- **Autenticação e Login**: Acesso seguro ao sistema.
- **Cadastro de Atividades pelos Professores**: Professores inserem atividades para o semestre.
- **Atribuição Automática de Atividades**: Alunos herdam as atividades cadastradas pelos professores.
- **Gestão de Oficinas pelos Alunos**: Alunos podem criar e gerenciar oficinas, sendo responsáveis por elas.
- **Listagem de Oficinas**: Visualização de datas e assuntos das oficinas.
- **Geração de Relatórios**: Relatórios sobre usuários, atividades e oficinas.

## Requisitos Funcionais

1. **Cadastro de Usuários**

   - Permitir que alunos e professores se cadastrem no sistema, especificando sua função (aluno ou professor) durante o registro.
   - Armazenar dados como endereço, ra, número de documento (RG com órgão emissor, CPF, etc.), email, telefone, local de nascimento, curso e período da faculdade.

2. **Autenticação e Login**

   - Implementar um sistema de autenticação para alunos e professores, garantindo acesso seguro ao sistema.

3. **Cadastro de Atividades pelos Professores**

   - Professores podem cadastrar atividades para o semestre da universidade.

4. **Atribuição Automática de Atividades aos Alunos**

   - Todos os alunos que se cadastrarem herdam automaticamente todas as atividades cadastradas pelos professores.

5. **Gestão de Oficinas pelos Alunos**

   - Alunos podem cadastrar oficinas e são responsáveis por elas.

6. **Listagem de Oficinas**

   - Exibir listas de datas das oficinas com seus respectivos assuntos.

7. **Geração de Relatórios**

   - Gerar relatórios sobre usuários, atividades e oficinas.

8. **Outros conforme necessário**
   - Funcionalidades adicionais que possam surgir durante o desenvolvimento.

## Arquitetura em Alto Nível

- **Frontend**

  - Desenvolvido em **Next.js** utilizando **React** para construção da interface de usuário.
  - Estilização com **Tailwind CSS** e componentes UI do **Shadcn UI**.

- **Backend**

  - API construída com **Next.js API Routes** para lidar com a lógica de negócios e comunicação com o banco de dados.

- **Banco de Dados**

  - Utilização do **Supabase**, que oferece um banco de dados **PostgreSQL**, autenticação, armazenamento e funcionalidades em tempo real.

- **Autenticação**

  - Implementação de autenticação segura utilizando o sistema de autenticação do **Supabase** ou **NextAuth.js** integrado com o Supabase.

- **Testes**

  - Estratégia de testes automatizados incluindo testes unitários, de integração e end-to-end.

- **Deploy**
  - Hospedagem na **Vercel** para facilidade de deploy contínuo.

## Estratégias de Automação

- **Testes Unitários**

  - Utilizar o **Jest** e o **Testing Library** para testar componentes individuais do frontend e funções de lógica de negócio no backend.

- **Testes de Integração**

  - Verificar a interação entre diferentes partes do sistema, como a comunicação entre o frontend, backend e o banco de dados Supabase.

- **Testes End-to-End (E2E)**

  - Implementar testes com **Cypress** ou **Playwright** para simular o fluxo completo do usuário no sistema.

- **Integração Contínua (CI)**

  - Configurar pipelines de CI/CD com **GitHub Actions** para executar os testes automaticamente em cada push ou pull request.

- **Cobertura de Testes**
  - Monitorar a cobertura dos testes para garantir a qualidade e reduzir bugs.

## Tecnologias Utilizadas

- **Next.js**: Framework React para desenvolvimento fullstack.
- **TypeScript**: Superset do JavaScript para tipagem estática.
- **Tailwind CSS**: Framework de CSS utilitário para estilização rápida.
- **Shadcn UI**: Biblioteca de componentes UI pré-construídos.
- **Supabase**: Plataforma de backend que fornece banco de dados PostgreSQL, autenticação e funcionalidades em tempo real.
- **NextAuth.js**: Biblioteca para autenticação e autorização.
- **Jest**: Framework de testes unitários.
- **Testing Library**: Conjunto de utilitários para testar componentes React.
- **Cypress** ou **Playwright**: Ferramentas para testes end-to-end.
- **Vercel**: Plataforma de hospedagem e deploy contínuo.
- **Ferramentas Adicionais**: ESLint, Prettier, Git e GitHub.

## Como Executar

1. **Clonar o Repositório**

```bash
   git clone https://github.com/thiagofalasca/projeto-oficina.git
```

2. **Instalar as Dependências**

```bash
   cd projeto-oficina
   npm install
```

3. **Configurar Variáveis de Ambiente**
   Crie um arquivo .env.local baseado no .env.example e preencha com as configurações necessárias do Supabase.

4. **Iniciar o Servidor**

```bash
   npm run dev
```

5. **Acessar a Aplicação**
   Abra http://localhost:3000 no seu navegador.

## Tecnologias Utilizadas

- **npm run dev:** Inicia o ambiente de desenvolvimento.
- **npm run build:** Cria uma versão de produção.
- **npm run start:** Inicia o servidor em produção.
- **npm run test:** Executa os testes unitários.
- **npm run test:e2e:** Executa os testes end-to-end.
- **npm run lint:** Analisa o código em busca de problemas.

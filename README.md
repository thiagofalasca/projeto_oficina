# Projeto de Gestão de Voluntários Universitários

## Objetivo

Desenvolver uma aplicação web que auxilie professores na gestão de alunos voluntários em workshops na universidade. O sistema permite que professores cadastrem workshops e gerenciem os alunos participantes, além de gerar certificados de participação.

## Funcionalidades

- **Cadastro de Usuários**: Registro de alunos e professores com informações pessoais, especificando seu tipo de usuário.
- **Autenticação e Login**: Acesso seguro ao sistema.
- **Gestão de Workshops**: Professores podem cadastrar e gerenciar workshops.
- **Gestão de Voluntários**: Professores podem adicionar alunos aos workshops.
- **Certificados**: Geração e assinatura de certificados pelos professores.
- **Consulta de Certificados**: Alunos podem buscar seus certificados de participação.
- **Geração de Relatórios**: Professores podem gerar relatórios sobre alunos e workshops.
- **Listagem de Workshops**: Alunos podem visualizar a lista de workshops em que participam e professores podem visualizar todos os workshops.

## Requisitos Funcionais

1. **Cadastro de Usuários**

   - Permitir que alunos e professores se cadastrem no sistema, especificando sua função durante o registro.
   - Armazenar dados como endereço, ra, número de documento (RG com órgão emissor, CPF, etc.), email, telefone, local de nascimento, curso e período da faculdade.

2. **Autenticação e Login**

   - Implementar um sistema de autenticação para alunos e professores, garantindo acesso seguro ao sistema.

3. **Cadastro e Gestão de Workshops**

   - Professores podem cadastrar novos workshops no sistema.
   - Professores podem gerenciar informações e status dos workshops.

4. **Gestão de Voluntários**

   - Professores podem adicionar alunos como voluntários em workshops específicos.
   - Professores podem gerenciar a lista de participantes de cada workshop.

5. **Certificados**

   - Professores podem gerar certificados de participação para os alunos.
   - Professores podem assinar digitalmente os certificados.
   - Alunos podem buscar e visualizar seus certificados de participação.

6. **Geração de Relatórios**

   - Professores podem gerar relatórios sobre:
     - Participação dos alunos nos workshops
     - Histórico de workshops realizados
     - Certificados emitidos

7. **Listagem de Workshops**
   - Alunos podem visualizar a lista de workshops em que participam.
   - Professores podem visualizar todos os workshops.

## Arquitetura em Alto Nível

- **Frontend**

  - Desenvolvido em **Next.js** utilizando **React** para construção da interface de usuário.
  - Estilização com **Tailwind CSS** e componentes UI do **Shadcn UI**.

- **Backend**

  - API construída com **Next.js API Routes** para lidar com a lógica de negócios e comunicação com o banco de dados.
  - Utilização do **Prisma ORM** para interagir com o banco de dados **Supabase**.

- **Banco de Dados**

  - Utilização do **Supabase**, que oferece um banco de dados **PostgreSQL**, autenticação, armazenamento e funcionalidades em tempo real.

- **Autenticação**

  - Implementação de autenticação segura utilizando **NextAuth.js** integrado com o Supabase.

- **Testes**

  - Estratégia de testes automatizados com testes unitários mockados no backend e testes end-to-end no frontend com.

- **Deploy**
  - Hospedagem na **Vercel** para facilidade de deploy contínuo.

## Estratégias de Automação

- **Testes Unitários**

  - Utilizar o **Jest** para testar funções de lógica de negócio no backend com mocks.

- **Testes End-to-End**

  - Implementar testes com **Cypress** para simular o fluxo completo do usuário no sistema.

- **Integração Contínua (CI)**

  - Configurar pipelines de CI/CD com **GitHub Actions** para executar os testes automaticamente em cada push ou pull request.

## Tecnologias Utilizadas

- **Next.js**: Framework React para desenvolvimento fullstack.
- **TypeScript**: Superset do JavaScript para tipagem estática.
- **Tailwind CSS**: Framework de CSS utilitário para estilização rápida.
- **Shadcn UI**: Biblioteca de componentes UI pré-construídos.
- **Supabase**: Plataforma de backend que fornece banco de dados PostgreSQL.
- **Prisma ORM**: ORM para interagir com o banco de dados.
- **NextAuth.js**: Biblioteca para autenticação e autorização.
- **Jest**: Framework de testes unitários com suporte a mocks.
- **Cypress**: Ferramenta para testes end-to-end.
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

## Comandos disponíveis

- **npm run dev:** Inicia o ambiente de desenvolvimento.
- **npm run build:** Cria uma versão de produção.
- **npm run start:** Inicia o servidor em produção.
- **npm run test:** Executa os testes unitários.
- **npm run test:e2e:** Executa os testes end-to-end.
- **npm run lint:** Analisa o código em busca de problemas.
- **npm run format:** Formata o código usando Prettier.

## Diagramas do sistema

https://excalidraw.com/#json=tk706rdmxROU2MwbchMcX,QycS_ahjs7_WEI04Oa_--g

# Leads - API RESTful

API RESTful desenvolvida com Node.js, TypeScript, Prisma ORM e validações com Zod. Tem como objetivo gerenciar leads, campanhas de marketing e grupos organizacionais, permitindo operações de cadastro, associação e controle de status dos leads.

A arquitetura segue o padrão MVC (Model-View-Controller) com o uso de repositórios e injeção de dependência, o que facilita testes automatizados, manutenção e escalabilidade.

---

![Node.js](https://img.shields.io/badge/Node.js-18.x-green?logo=node.js)
![TypeScript](https://img.shields.io/badge/TypeScript-4.x-blue?logo=typescript)
![Prisma](https://img.shields.io/badge/ORM-Prisma-lightgrey?logo=prisma)
![License](https://img.shields.io/badge/license-MIT-green)

---

## ⚙️ Tecnologias Utilizadas

- **Node.js** – Ambiente de execução JavaScript
- **Express** – Framework web leve e rápido
- **TypeScript** – Superset tipado de JavaScript
- **Prisma ORM** – Mapeamento objeto-relacional com suporte a PostgreSQL
- **PostgreSQL** – Banco de dados relacional robusto
- **Zod** – Biblioteca de validação de esquemas de dados
- **Draw.io** – Modelagem do diagrama entidade-relacionamento

---

## 🗂 Estrutura do Banco de Dados

- **Leads**: Armazena informações como nome, status e relacionamentos.
- **Campanhas**: Representa campanhas de marketing com leads associados.
- **Grupos**: Agrupamentos de leads para organização e segmentação.
- **LeadCampaign**: Tabela intermediária com o status do lead em cada campanha.

![Diagrama ER](diagrama%20Api_Leads.png)

---

## 📡 Endpoints da API

<details>
<summary><strong>Leads</strong></summary>

- `GET /leads` – Lista todos os leads
- `POST /leads` – Cria um novo lead
- `GET /leads/:id` – Retorna um lead específico
- `PUT /leads/:id` – Atualiza um lead existente
- `DELETE /leads/:id` – Remove um lead

</details>

<details>
<summary><strong>Grupos</strong></summary>

- `GET /groups` – Lista todos os grupos
- `POST /groups` – Cria um novo grupo
- `GET /groups/:id` – Retorna um grupo específico
- `PUT /groups/:id` – Atualiza um grupo existente
- `DELETE /groups/:id` – Remove um grupo

</details>

<details>
<summary><strong>Campanhas</strong></summary>

- `GET /campaigns` – Lista todas as campanhas
- `POST /campaigns` – Cria uma nova campanha
- `GET /campaigns/:id` – Retorna uma campanha específica
- `PUT /campaigns/:id` – Atualiza uma campanha
- `DELETE /campaigns/:id` – Remove uma campanha

</details>

<details>
<summary><strong>Relacionamento Leads ↔ Campanhas</strong></summary>

- `GET /campaigns/:campaignId/leads` – Lista os leads de uma campanha
- `POST /campaigns/:campaignId/leads` – Adiciona um lead a uma campanha
- `PUT /campaigns/:campaignId/leads/:leadId` – Atualiza o status do lead na campanha
- `DELETE /campaigns/:campaignId/leads/:leadId` – Remove o lead da campanha

</details>

<details>
<summary><strong>Relacionamento Leads ↔ Grupos</strong></summary>

- `GET /groups/:groupId/leads` – Lista os leads de um grupo
- `POST /groups/:groupId/leads` – Adiciona um lead ao grupo
- `DELETE /groups/:groupId/leads/:leadId` – Remove o lead do grupo

</details>

<details>
<summary><strong>Status da API</strong></summary>

- `GET /status` – Verifica se a API está online

</details>

---

## 🚀 Como executar o projeto

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/Tulipaox/ApiLeads.git
2. **Instale as dependências:**  
   ```bash
    npm install
3. **Configure o arquivo .env:**  
   ```bash
   DATABASE_URL="postgresql://usuario:senha@localhost:5432/nome_banco" 
4. **Execute as migrações do Prisma:**  
   ```bash
    npx prisma migrate dev
5. **Inicie o servidor em modo desenvolvimento:**  
   ```bash
    npm run dev   

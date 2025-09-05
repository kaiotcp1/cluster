# Estudo de Alta Performance com Node.js

![Node.js](https://img.shields.io/badge/Node.js-v22.x-green?style=for-the-badge&logo=node.js)
![Express.js](https://img.shields.io/badge/Express.js-4.x-lightgrey?style=for-the-badge&logo=express)
![Licença](https://img.shields.io/badge/Licen%C3%A7a-MIT-yellow?style=for-the-badge)

## 📖 Sobre o Projeto

Este é um projeto de estudo focado em demonstrar um padrão de arquitetura de alta performance para lidar com tarefas computacionalmente intensivas em Node.js. A aplicação implementa um **Pool de Workers Dedicados**, onde um processo "Mestre" gerencia e distribui tarefas pesadas (neste caso, processamento de imagens) para processos filhos (`child_process`), enquanto um `cluster` de workers leves lida com as requisições HTTP, garantindo que a API permaneça sempre responsiva.

O objetivo é entender na prática como o Node.js pode orquestrar múltiplos processos para escalar verticalmente e processar trabalhos em segundo plano (background jobs) de forma eficiente.

---

## ✨ Conceitos e Tecnologias Exploradas

-   **Node.js `cluster`:** Para criar múltiplos workers que lidam com requisições HTTP, aproveitando todos os núcleos da CPU para a camada web.
-   **Node.js `child_process.fork()`:** Para criar processos persistentes e dedicados a tarefas de longa duração que consomem muita CPU.
-   **Padrão Roteador/Dispatcher:** O processo Mestre atua como um roteador central, recebendo tarefas dos workers web e distribuindo-as para os workers de cálculo.
-   **Processamento Assíncrono:** A API responde imediatamente ao usuário ("fire-and-forget"), enquanto o trabalho pesado é executado em segundo plano.
-   **Express.js & Multer:** Para criar um endpoint de API que aceita upload de arquivos (`multipart/form-data`).
-   **Sharp:** Biblioteca de alta performance para processamento de imagens.
-   **Testes de Carga com Artillery:** Para validar a resiliência e a responsividade da arquitetura sob estresse.

---

## 📂 Estrutura do Projeto

Para focar nos conceitos de concorrência, a estrutura do projeto foi mantida intencionalmente simples:

```
.
├── src
│   ├── cluster_initializer.js  # Ponto de entrada, lógica do Mestre e dos workers web
│   └── image_worker.js         # Lógica do worker de cálculo dedicado
├── test-data
│   └── sample.jpg              # Imagem de exemplo para os testes
├── uploads
│   ├── raw/                    # Onde as imagens originais são salvas
│   └── processed/              # Onde as imagens processadas são salvas
├── package.json
└── README.md
```

---

## 🚀 Começando

### Pré-requisitos

-   [Node.js](https://nodejs.org/) (v22.x ou superior)
-   [npm](https://www.npmjs.com/)

### Instalação

1.  Clone o repositório e navegue até a pasta do projeto.
2.  Instale as dependências:
    ```bash
    npm install
    ```

### Executando a Aplicação

-   **Para desenvolvimento** (com reinicialização automática ao salvar):
    ```bash
    npm run dev
    ```
-   **Para iniciar diretamente:**
    ```bash
    npm run start
    ```
A API estará rodando em `http://localhost:3000`.

### Testando a Performance

Para testar o upload e ver a arquitetura em ação, você pode usar uma ferramenta como Postman/Insomnia ou o cenário de teste de carga configurado com o Artillery.

1.  Inicie o servidor (`npm run dev`).
2.  Em outro terminal, execute o teste de carga:
    ```bash
    # (Certifique-se de que o arquivo upload-test.yml está configurado)
    artillery run upload-test.yml
    ```
Observe o console do servidor: você verá os workers web (`Atendentes`) recebendo as requisições, o `Gerente` roteando as tarefas, e o `Especialista em Imagens` processando os arquivos, tudo de forma concorrente.

---

## 🗺️ Roadmap Futuro

A base conceitual deste projeto é sólida. Os próximos passos envolvem a reintrodução de uma arquitetura mais robusta e a adição de ferramentas de produção.

-   [ ] **Reimplementar em TypeScript:** Migrar o código de JavaScript para TypeScript para adicionar segurança de tipagem.
-   [ ] **Reintroduzir Arquitetura de Camadas:** Aplicar novamente os conceitos de `Domain`, `Application` e `Infrastructure` sobre a base funcional atual.
-   [ ] **Gerenciamento de Processos com PM2:** Utilizar o PM2 para gerenciar o `cluster_initializer.js` em um ambiente de produção.
-   [ ] **Cache com Redis:** Implementar uma camada de cache com Redis (via Docker) para, por exemplo, não reprocessar uma imagem que já foi processada.
-   [ ] **Load Balancer com Nginx:** Adicionar o Nginx (via Docker) como um Reverse Proxy na frente da aplicação.

-----

Feito com ❤️ por Kaiohp.

-----
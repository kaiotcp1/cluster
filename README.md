# API de Alta Performance com Node.js Cluster
![Node.js](https://img.shields.io/badge/Node.js-v22.x-green?style=for-the-badge&logo=node.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=for-the-badge&logo=typescript)
![Express.js](https://img.shields.io/badge/Express.js-5.x-lightgrey?style=for-the-badge&logo=express)
![Docker](https://img.shields.io/badge/Docker-blue?style=for-the-badge&logo=docker)
![Nginx](https://img.shields.io/badge/Nginx-green?style=for-the-badge&logo=nginx)
![Redis](https://img.shields.io/badge/Redis-red?style=for-the-badge&logo=redis)
![PM2](https://img.shields.io/badge/PM2-darkgreen?style=for-the-badge&logo=pm2)
![Licença](https://img.shields.io/badge/Licen%C3%A7a-MIT-yellow?style=for-the-badge)

## 📖 Sobre o Projeto

Este é um projeto de estudo focado em explorar e implementar conceitos avançados de alta performance e escalabilidade em aplicações Node.js. A aplicação utiliza o módulo `cluster` para aproveitar todos os núcleos de CPU disponíveis, processando uma tarefa computacionalmente intensiva (o cálculo da sequência de Fibonacci) de forma distribuída.

O projeto foi construído seguindo uma arquitetura de camadas moderna, visando a separação de responsabilidades, e planejado para ser executado em um ambiente de produção realista com Nginx, Redis e PM2, orquestrados via Docker.

---

## ✨ Conceitos e Tecnologias Exploradas

-   **Node.js Cluster Module:** Para paralelismo e utilização máxima da CPU.
-   **TypeScript:** Para um desenvolvimento mais seguro e robusto.
-   **Arquitetura em Camadas:** Separação clara entre `Domain`, `Application` e `Infrastructure`.
-   **Inversão de Controle (IoC) e Injeção de Dependência (DI):** Utilizando o padrão *Factory* para desacoplar os componentes.
-   **Express.js:** Como framework web para a criação da API.
-   **Docker & Docker Compose:** Para containerização da infraestrutura (Nginx, Redis).
-   **Testes de Carga:** Scripts configurados para `Artillery` e `Loadtest` para simular tráfego intenso e analisar a performance.

---

## 🗺️ Roadmap Futuro

Este projeto continuará a evoluir com a implementação das seguintes tecnologias e conceitos:

  - [ ] **Gerenciamento de Processos com PM2:** Substituir a lógica básica do `cluster` pelo PM2 para um gerenciamento mais robusto em ambiente de produção (monitoring, auto-restart, etc.).
  - [ ] **Docker:** Criação do container com as configurações correspondentes da aplicação.
  - [ ] **Cache com Redis:** Implementar uma camada de cache com Redis para armazenar os resultados dos cálculos de Fibonacci, evitando reprocessamento e melhorando drasticamente a latência.
  - [ ] **Load Balancer com Nginx:** Adicionar o Nginx como um Reverse Proxy e Load Balancer na frente da aplicação Node.js, uma prática comum para distribuir tráfego e aumentar a segurança e resiliência em produção.
  

-----

Feito com ❤️ por Kaiohp.

-----
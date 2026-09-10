# CodeSentinel — Front-End
 
**Dashboard em React para visualização e filtragem dos logs analisados pela API do CodeSentinel.**
 
Demo ao vivo: https://codesentinel-frontend.vercel.app
Repositório do back-end: https://github.com/PietroRuotolo/codesentinel
 
---
 
Este é o front-end do CodeSentinel, uma aplicação fullstack de monitoramento e análise de logs. Ele consome a API REST do back-end (Spring Boot) e apresenta os logs numa interface de dashboard, com filtragem dinâmica por nível, mensagem e intervalo de datas.
 
A aplicação está publicada em produção: este front-end no Vercel, consumindo o back-end (containerizado no Render) que persiste em um banco PostgreSQL gerenciado no Neon. O código do back-end está em repositório separado (link acima).
 
> Observação: o back-end roda em tier gratuito, que hiberna após períodos de inatividade. Ao abrir a demo, a primeira carga dos logs pode levar cerca de um minuto enquanto o servidor reinicializa; depois disso, fica rápido.
 
---
 
## O que ele faz
 
O dashboard busca os logs da API e os exibe numa tabela, com destaque visual por severidade (ERROR, WARN, INFO, DEBUG) e controles de filtragem que refletem, em tempo real, os recursos de consulta do back-end:
 
- **Filtro por nível** — restringe a exibição a um nível de log específico (ou todos).
- **Filtro por mensagem** — busca textual que encontra logs cuja mensagem contém o termo, sem diferenciar maiúsculas.
- **Filtro por intervalo de datas** — delimita o período dos logs exibidos.
- **Filtros combináveis** — os critérios se aplicam em conjunto (por exemplo, apenas os erros que contêm determinado texto num intervalo de datas).
A busca textual é debounced — a requisição só é enviada após uma breve pausa na digitação, evitando uma chamada por tecla.
 
---
 
## Como se comunica com o back-end
 
O front-end monta a URL de consulta a partir do estado dos filtros e chama o endpoint GET /logs da API, anexando apenas os parâmetros ativos (com URLSearchParams, de modo que cada filtro é opcional e independente). A URL base da API vem de uma variável de ambiente (VITE_API_URL), o que permite apontar para o back-end local em desenvolvimento e para o back-end em produção quando publicado.
 
Exemplos de requisições geradas conforme os filtros:
 
```
GET /logs
GET /logs?level=ERROR
GET /logs?level=ERROR&message=NullPointer
GET /logs?after=2026-08-26&before=2026-08-27
```
 
---
 
## Tecnologias
 
- React (componentes funcionais, hooks — useState, useEffect)
- Vite (build e servidor de desenvolvimento)
- Tailwind CSS (estilização)
- Fetch API (requisições assíncronas)
- Vercel (deploy)
---
 
## Como executar localmente
 
Pré-requisitos: Node.js, e o back-end do CodeSentinel rodando (por padrão em http://localhost:8080).
 
Crie um arquivo .env na raiz com a URL da API:
 
```
VITE_API_URL=http://localhost:8080
```
 
Então:
 
```
npm install
npm run dev
```
 
O Vite sobe a aplicação em http://localhost:5173.
 
> Em produção, a variável VITE_API_URL é configurada no painel do Vercel apontando para a URL pública do back-end. O back-end, por sua vez, precisa liberar a origem do front-end via CORS.
 
---
 
## Direção do projeto
 
Este front-end acompanha a evolução do CodeSentinel. Próximas etapas previstas: ordenação configurável pelo usuário, refinamentos de experiência de uso, e melhorias de responsividade. Como o back-end, este documento descreve o que o projeto é hoje e cresce junto com o código.
 
---
 
**Pietro Ruotolo** — estudante de Engenharia de Software (FIAP)
 
GitHub: https://github.com/PietroRuotolo
LinkedIn: https://linkedin.com/in/pietro-ruotolo

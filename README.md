# CodeSentinel Frontend

Interface web do **CodeSentinel**, projeto de monitoramento e centralização de logs de aplicação. Este repositório contém o frontend em React, responsável por consumir a API REST do [backend CodeSentinel](https://github.com/PietroRuotolo/codesentinel) e exibir os logs de forma filtrável e legível.

## Status do projeto

🚧 **Em desenvolvimento inicial.** Atualmente a interface conta com:

- Tabela de visualização de logs (`LogTable`), consumindo `GET /logs` da API backend
- Filtros por **nível** (`DEBUG`, `INFO`, `WARN`, `ERROR`), **mensagem** (busca textual) e **data inicial**
- Debounce de 400ms nas requisições, evitando chamadas excessivas à API a cada digitação
- Indicação visual de nível de log por cor (badges)
- Estado de carregamento (`loading`) enquanto os dados são buscados

## Tecnologias

- [React 19](https://react.dev/)
- [Vite](https://vite.dev/) — build tool e dev server
- [Tailwind CSS 4](https://tailwindcss.com/) — estilização
- [ESLint](https://eslint.org/) — padronização de código

## Pré-requisitos

- [Node.js](https://nodejs.org/) 18+ e npm
- O [backend do CodeSentinel](https://github.com/PietroRuotolo/codesentinel) rodando localmente em `http://localhost:8080`, já que o frontend consome a API a partir dessa URL fixa

## Como rodar o projeto

```bash
# Clonar o repositório
git clone https://github.com/PietroRuotolo/codesentinel-frontend.git
cd codesentinel-frontend

# Instalar dependências
npm install

# Rodar em modo desenvolvimento
npm run dev
```

A aplicação estará disponível em `http://localhost:5173` (porta padrão do Vite).

### Outros scripts disponíveis

| Comando           | Descrição                                  |
|--------------------|---------------------------------------------|
| `npm run dev`      | Inicia o servidor de desenvolvimento        |
| `npm run build`    | Gera a build de produção                    |
| `npm run preview`  | Serve a build de produção localmente        |
| `npm run lint`     | Executa o ESLint no projeto                 |

## Estrutura do projeto

```
src/
├── components/
│   └── LogTable.jsx   # Tabela de logs com filtros
├── App.jsx            # Componente raiz
├── main.jsx           # Ponto de entrada da aplicação
└── index.css          # Estilos globais (Tailwind)
```

# HawkIF Frontend

Frontend do projeto **Hawk-IF**, construído em **React + TypeScript + Vite**, seguindo os princípios da **Arquitetura Hexagonal (Ports & Adapters)**.

---

## 🧱 Arquitetura

O projeto adota **Arquitetura Hexagonal**, separando o código em camadas bem definidas:

```text
├── core/               # Núcleo compartilhado do sistema
├── domain/             # Regras de negócio puras
│   ├── entities/       # Entidades de domínio
│   └── exceptions/     # Exceções de domínio
├── application/        # Casos de uso (orquestração do domínio)
│   ├── ports/          # Interfaces (contratos) de entrada e saída
│   │   ├── input/      # Portas de entrada (ex: interfaces dos casos de uso)
│   │   └── output/     # Portas de saída (ex: interfaces de repositórios/APIs)
│   └── usecases/       # Implementação dos casos de uso
└── infraestructure/    # Adaptadores (implementações concretas dos ports)
    └── adapters/
        ├── input/      # Entradas: Web (UI), etc.
        │   └── web/    # Aplicação React (root do Vite)
        └── output/     # Saídas: HTTP clients, storage, etc.
            └── api/    # Cliente HTTP (Axios, etc.)
```

### Estrutura de pastas

```text
hawk-if-frontend/
├── core/
├── domain/
│   ├── entities/
│   └── exceptions/
├── application/
│   ├── ports/
│   │   ├── input/
│   │   └── output/
│   └── usecases/
├── infraestructure/
│   └── adapters/
│       ├── input/
│       │   └── web/
│       └── output/
│           └── api/
├── tests/
├── vite.config.mts
├── package.json
└── tsconfig.json
```

> **Importante:** o `vite.config.ts` define `root: "./infraestructure/adapters/input/web"`. Isso significa que o **entrypoint da aplicação web** (o `index.html`) fica em `infraestructure/adapters/input/web/`. O `dist/` será gerado **dentro dessa mesma pasta** (`./infraestructure/adapters/input/web/dist`), pois `outDir` é relativo ao `root`.

---

## 📚 Bibliotecas utilizadas

### Produção

| Biblioteca | Função |
|---|---|
| `react` / `react-dom` | Biblioteca de UI |
| `@tanstack/react-query` | Gerenciamento de estado assíncrono (cache, fetching) |
| `axios` | Cliente HTTP |
| `react-hook-form` + `@hookform/resolvers` | Formulários performáticos |
| `zod` | Validação e inferência de schemas |
| `tailwindcss` + `@tailwindcss/vite` | Estilização utilitária |
| `radix-ui` | Componentes acessíveis (primitivos) |
| `cmdk` | Command palette |
| `lucide-react` | Ícones |
| `usehooks-ts` | Hooks utilitários em TypeScript |

### Desenvolvimento

| Biblioteca | Função |
|---|---|
| `vite` | Bundler / dev server |
| `typescript` | Tipagem estática |
| `vitest` + `jsdom` | Testes unitários |
| `@testing-library/react` + `user-event` + `jest-dom` | Testes de componentes |
| `msw` | Mock de requisições HTTP em testes |
| `eslint` + `typescript-eslint` + plugins | Lint |
| `prettier` | Formatação de código |
| `husky` + `lint-staged` | Git hooks e lint em arquivos staged |

---

## 🚀 Como rodar o projeto

### Pré-requisitos
- Node.js 20+
- npm

### Instalação

```bash
npm install
```

> O script `prepare` roda `husky` automaticamente para instalar os git hooks.

### Ambiente de desenvolvimento

```bash
npm run web
```

O Vite sobe o dev server apontando para `infraestructure/adapters/input/web`.

---

## 🏗️ Como buildar

```bash
npm run build-web
```

Isso executa:
1. `tsc` — checagem de tipos.
2. `vite build` — gera o bundle em `infraestructure/adapters/input/web/dist`.

### Outros scripts úteis

| Script | Descrição |
|---|---|
| `npm run lint` | ESLint sem permitir warnings (`--max-warnings 0`) |
| `npm run type-check` | Checagem de tipos sem emitir arquivos |
| `npm run test` | Roda todos os testes com Vitest |
| `npm run lint-staged` | Aplica lint/format apenas em arquivos alterados |

---

## 🧪 Testes

Configurados via `vitest` no `vite.config.ts`:
- **Ambiente:** `jsdom`
- **Globals:** `true` (sem precisar importar `describe`, `it`, `expect`)
- **Setup:** `tests/setup.ts` (ideal para `@testing-library/jest-dom` e mocks do MSW)

Para rodar:

```bash
npm run test
```
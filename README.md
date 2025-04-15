# E-book Marketplace - Frontend

Frontend do marketplace de e-books desenvolvido com React e TypeScript.

## Requisitos

- Node.js (v14 ou superior)
- npm ou yarn

## Instalação

1. Clone o repositório:
```bash
git clone [url-do-repositorio]
cd ebook-marketplace-frontend
```

2. Instale as dependências:
```bash
npm install
```

## Executando o projeto

```bash
npm start
```

O servidor de desenvolvimento estará rodando em `http://localhost:3000`

## Funcionalidades

- Autenticação de usuários (login/registro)
- Listagem de e-books disponíveis
- Perfil do usuário com histórico de compras
- Interface responsiva e moderna

## Tecnologias utilizadas

- React
- TypeScript
- Material-UI
- React Router
- Axios
- Context API

## Estrutura do projeto

```
src/
  ├── components/     # Componentes reutilizáveis
  ├── contexts/       # Contextos do React
  ├── pages/          # Páginas da aplicação
  ├── services/       # Serviços (API, etc)
  ├── App.tsx         # Componente principal
  └── routes.tsx      # Configuração de rotas
```

## Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request 
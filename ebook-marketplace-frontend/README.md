# Ebook Marketplace Frontend

Este é o frontend do Ebook Marketplace, uma plataforma para compra e venda de ebooks.

## Requisitos

- Node.js 16.x ou superior
- npm 7.x ou superior

## Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/ebook-marketplace-frontend.git
cd ebook-marketplace-frontend
```

2. Instale as dependências:
```bash
npm install
```

3. Crie um arquivo `.env` baseado no `.env.example`:
```bash
cp .env.example .env
```

4. Configure as variáveis de ambiente no arquivo `.env`

## Scripts Disponíveis

- `npm start`: Inicia o servidor de desenvolvimento
- `npm run build`: Cria uma build de produção
- `npm test`: Executa os testes
- `npm run lint`: Executa o linter
- `npm run format`: Formata o código

## Estrutura do Projeto

```
src/
  ├── components/     # Componentes React reutilizáveis
  ├── pages/         # Páginas da aplicação
  ├── services/      # Serviços e integrações com API
  ├── styles/        # Estilos globais e temas
  ├── utils/         # Funções utilitárias
  ├── hooks/         # Custom hooks
  ├── context/       # Contextos React
  ├── types/         # Definições de tipos TypeScript
  └── App.tsx        # Componente principal
```

## Contribuição

1. Crie uma branch para sua feature:
```bash
git checkout -b feature/nova-feature
```

2. Faça commit das suas alterações:
```bash
git commit -m 'Adiciona nova feature'
```

3. Envie para o repositório:
```bash
git push origin feature/nova-feature
```

## Licença

Este projeto está licenciado sob a licença MIT. 
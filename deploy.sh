#!/bin/bash

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Função para imprimir mensagens
print_message() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERRO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[AVISO]${NC} $1"
}

# Verificar se está rodando como root
if [ "$EUID" -ne 0 ]; then 
    print_error "Por favor, execute o script como root (sudo)"
    exit 1
fi

# Atualizar sistema
print_message "Atualizando sistema..."
apt update && apt upgrade -y

# Instalar dependências do sistema
print_message "Instalando dependências do sistema..."
apt install -y curl wget git build-essential nginx

# Instalar Node.js e npm
print_message "Instalando Node.js e npm..."
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt install -y nodejs

# Instalar PM2 globalmente
print_message "Instalando PM2..."
npm install -g pm2

# Instalar PostgreSQL
print_message "Instalando PostgreSQL..."
apt install -y postgresql postgresql-contrib

# Configurar PostgreSQL
print_message "Configurando PostgreSQL..."
sudo -u postgres psql -c "CREATE USER ebook_user WITH PASSWORD 'ebook_password';"
sudo -u postgres psql -c "CREATE DATABASE ebook_marketplace;"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE ebook_marketplace TO ebook_user;"

# Configurar Nginx
print_message "Configurando Nginx..."
cat > /etc/nginx/sites-available/ebook-marketplace << EOL
server {
    listen 80;
    server_name _;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
    }

    location /api {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
    }
}
EOL

# Habilitar site no Nginx
ln -s /etc/nginx/sites-available/ebook-marketplace /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default
systemctl restart nginx

# Instalar Certbot para SSL
print_message "Instalando Certbot para SSL..."
apt install -y certbot python3-certbot-nginx

# Clonar repositórios
print_message "Clonando repositórios..."
mkdir -p /opt/ebook-marketplace
cd /opt/ebook-marketplace

# Frontend
print_message "Configurando Frontend..."
git clone https://seu-repositorio/ebook-marketplace-frontend.git frontend
cd frontend
npm install
npm run build

# Backend
print_message "Configurando Backend..."
cd ..
git clone https://seu-repositorio/ebook-marketplace-backend.git backend
cd backend
npm install

# Configurar variáveis de ambiente do backend
cat > .env << EOL
DATABASE_URL=postgresql://ebook_user:ebook_password@localhost:5432/ebook_marketplace
JWT_SECRET=sua_chave_secreta_aqui
NODE_ENV=production
PORT=3001
EOL

# Iniciar aplicações com PM2
print_message "Iniciando aplicações com PM2..."

# Frontend
cd ../frontend
pm2 start npm --name "ebook-marketplace-frontend" -- start

# Backend
cd ../backend
pm2 start npm --name "ebook-marketplace-backend" -- start

# Salvar configuração do PM2
pm2 save
pm2 startup

print_message "Deploy concluído com sucesso!"
print_warning "Por favor, configure o domínio no Nginx e obtenha um certificado SSL com:"
print_warning "sudo certbot --nginx -d seu-dominio.com"
print_message "Para verificar o status das aplicações: pm2 status"
print_message "Para ver os logs: pm2 logs" 
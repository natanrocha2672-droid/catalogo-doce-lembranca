# Etapa 1: Build da aplicação usando Node 20 (Exigência do Tailwind)
FROM node:20-alpine AS builder
WORKDIR /app

# Copia os arquivos de dependência
COPY package*.json ./

# Instala as dependências de forma limpa para evitar bugs de cache do npm
RUN npm install

# Copia o resto do código e faz o build
COPY . .
RUN npm run build

# Etapa 2: Servir os arquivos estáticos com Nginx
FROM nginx:alpine

# Copia o build do Vite
COPY --from=builder /app/dist /usr/share/nginx/html

# Copia a nossa configuração customizada do Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expõe a porta 80
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

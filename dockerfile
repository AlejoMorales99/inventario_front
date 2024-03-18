# Etapa de construcción
FROM node:latest AS builder
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Etapa de producción
FROM nginx:latest
COPY --from=builder /usr/src/app/dist/inventario-bit-wan /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

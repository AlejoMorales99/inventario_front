# Etapa de construcción
FROM node:latest as node
WORKDIR /app
COPY ./ /app/
RUN npm install
RUN npm run build --prod

# Etapa de producción
FROM nginx:alpine
COPY --from=node /app/dist/inventario-bit-wan /usr/share/nginx/html


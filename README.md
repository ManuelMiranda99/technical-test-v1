# test-genesis-empresarial

Para levantar el proyecto es necesario:

## Requerimientos

- NodeJS
- Docker

## Pasos

1. Levantar la base de datos postgres con docker usando `docker compose up -d`
2. Instalar las dependencias de _exchange-server_ y _exchange-webapp_ con npm, pnpm o yarn
3. Levantar el servidor exchange-server con npm run start:dev
4. Levantar el webapp con npm start

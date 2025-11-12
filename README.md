# Descripción
AMNistrator es un software disenado para el manejo y administracion de tu empresa, en la que podras leer, crear, actualizar y eliminar todo lo relacionado a productos, clientes, usuarios, y mucho mas.

## Correr en modo desarrollo

1. Clonar el repositorio.
2. Crear una copia del archivo **.env.template** y renombrarlo a **.env** y cambiar las variables de entorno.
3. Instalar dependencias `npm install`
4. Actualizar prisma con el cliente `npx prisma generate`
5. Correr las migraciones de Prisma `npx prisma migrate dev`
6. Limpiar LocalStorage y Cookies del navegador
7. Levantar el proyecto `npm run dev`

## Correr en modo producción



## Prisma 

# Ver la DB online `npx prisma studio`
# Migrar cambios en la DB `npx prisma migrate dev -n <nombre de la migracion>`
# Actualizar prisma con el cliente `npx prisma generate`
# Pushear cambios a DB `npx prisma db push`
# Resetear toda la DB por breacking changes `npx prisma migrate reset`
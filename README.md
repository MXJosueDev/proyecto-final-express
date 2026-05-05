# Proyecto final - API Empleados

## Levantar el proyecto

### Levantar con Docker

1. Configura las variables en `.env`
2. `docker compose up --build`
3. API: http://localhost:3000 (usa `PORT`)
4. phpMyAdmin: http://localhost:8080 (usa `PMA_WEB_PORT`)
5. Web (HTML): http://localhost:80 (usa `WEB_PORT`)
6. MySQL: localhost:3306 (usa `DB_PORT`, usuario `root`, password en `.env`)
7. Los usuarios administradores se crean en phpMyAdmin (más adelante se detalla).

### Levantar sin Docker

1. Instala dependencias: `npm install`
2. Configura variables en `.env`
3. Inicia el servidor: `npm start`
4. API: http://localhost:3000
5. Asegurate de tener MySQL local con las credenciales de `.env`. (Puede ser el XAMPP)

## Puertos

- API: `PORT` (default 3000)
- MySQL: `DB_PORT` (default 3306)
- phpMyAdmin: `PMA_WEB_PORT` (default 8080)
- Web (HTML): `WEB_PORT` (default 80)


## ¿Como crear un usuario administrador?

1. Entras a http://localhost:8080 (phpMyAdmin)
2. Si lo levantaste con docker por defecto el usuario es `root` y la contraseña tambien es `root`, si no a como lo configuraste
3. Vas a la tabla `user`, y ahi creas un nuevo registro con todos los campos que se te solicitan

## ¿Como usar el proyecto?

1. Levantas el proyecto con uno de los metodos anteriores
2. Creas tu usuario en la base de datos 
3. Abres http://localhost si usas Docker o el archivo index.html en /public si corres sin Docker.

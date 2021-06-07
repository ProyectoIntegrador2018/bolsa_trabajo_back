# Bolsa de Trabajo

## Instalación

1. Asegurate de tener npm instalado en tu equipo
2. Crea una carpeta llamada *bolsa_trabajo*
3. Descarga los repositorios del front y el back
4. En la carpeta que creaste, guarda la carpeta del front y la carpeta del back
5. Abre tu terminal, navega hasta el directorio del front e ingresa el siguiente comando:

`npm install`

6. Realiza lo mismo en la carpeta del back-end dentro del folder *functions*
7. Por ultimo corre este ultimo comando para instalar las herramientas necesarias de bases de datos:

`npm install -g firebase-tools`

## Credenciales
Para correr el programa necesitarás 2 archivos: `.env` y `bolsa-de-trabajo-back-prod.json`. Por razones de seguridad, estos archivos no están disponibles en el repositorio. Cuando se obtengan necesitará realizar los siguientes pasos:

1. Navegar a la carpeta *bolsa_trabajo* creada durante la instalción
2. Navegar a la carpeta del front
3. Copia el archivo `.env` y pégalo en esta carpeta
4. Navegar a la carpeta del back
5. Copia el archivo `bolsa-de-trabajo-back-prod.json` y pégalo en esta carpeta
6. Abre tu terminal
7. Si estas en Mac o Linux, ejecuta el siguiente comando:  

`export GOOGLE_APPLICATION_CREDENTIALS="/home/user/[ruta_back]/bolsa-de-trabajo-back-prod.json"`  

Donde *ruta_back* es la ruta al directorio donde se encuentra el código del back (no incluyas los corchetes)

8. Si estas en Windows, ejecuta el siguiente comando:

`set GOOGLE_APPLICATION_CREDENTIALS=C:\Users\[ruta_back]\bolsa-de-trabajo-back-prod.json`

Donde *ruta_back* es la ruta al directorio donde se encuentra el código del back (no incluyas los corchetes)

9. ¡Listo! Has configurado las credenciales.

**Nota:** *El paso 7 para Mac y Linux, o el paso 8 para Windows debe ejecutarse cada vez que se vaya a iniciar el programa. El resto de los pasos no se repite.* 

## Pasos a seguir para correr el sistema
1. Abre tu terminal
2. Navega hasta la dirección de la carpeta *bolsa_trabajo*
3. Una vez ahi, navega a la carpeta del back, después a la carpeta *functions* y después ingresa el siguiente comando:  

`npm run build && firebase emulators:start`

4. Para verificar que tu instalación fue correcta, en tu navegador ingresa a esta dirección: http://localhost:5001/bolsa-de-trabajo-back/us-central1/app y si todo esta corriendo como debe, el navegador dira "Alohawaii". Si no, revisa los pasos previos si algo te falto
5. Una vez instalado esto, navega al directorio del front e ingresa este comando:  

`npm run start`

En tu navegador se abrira una direción: http://localhost:3000.

6. Listo. Puedes interactuar con el sistema.  

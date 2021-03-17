# base-ts
Este proyecto presenta un crud en node js con la finalidad de realizar pruebas unitarias con jest.

## Empezando 🚀 
Esta guia tiene como fin entregar al usuario el paso a paso para llevar a cabo la ejecución del proyecto base-ts. Estas instrucciones le proporcionarán una copia del proyecto en funcionamiento en su máquina local para fines de desarrollo y prueba.

## Prerequisitos 🗒️

Para la ejecución del proyecto serán necesarias las siguientes herramientas.

``` 
  * Git (https://git-scm.com/download/)
  * Node Js lts (https://nodejs.org/es/download/)
  * Mongo (https://www.mongodb.com/try/download/community)
  * IDE. Opcional (https://code.visualstudio.com/)
```

### Instalación ⛏️ 

Una serie de ejemplos paso a paso que le indican cómo ejecutar un entorno de desarrollo.

1. Clonar el proyecto
    ```sh
        $ git clone (https://github.com/NATALIAGJ/base-ts.git)
    ```
2. Ir al folder base-ts
    ```sh
        $ cd base-ts
    ```
4. Escriba y ejecute el siguiente comando
    ```sh
        [base-ts] $ npm install
    ```
5. Encender mongodb o ejecutar mongodb como servicio.
6. Archivos necesarios para configurar el entorno de desarrollo:
        .
        └── .env

7. Se debe crear el archivo .env y es una copia del archivo .env-example con los valores reales.
8. Para ejecutar el aplicativo en desarrollo escriba el siguiente comando.
    ```sh
        [base-ts] $  npm run dev
    ```
## Configuración del entorno de pruebas 🛠️ 

1. La coleccion de postman se encuentra en la siguiente ruta: 
['./docs/base-ts.postman_collection.json']

3. Crear una variable de entorno en postman, var host: http://localhost:8080/v1

# Esquema de archivos 📁

    Ditribución de alto nivel de las carpetas

    .
    ├── node_modules 
    ├── src
    ├── .env-example
    ├── .gitignore
    ├── README.md
    ├── jest.conf.js
    ├── package.json
    ├── swagger.json
    ├── tsconfig.json
    └── tslint.json
    
## Construcción:  🔩⚙️

* [Express](https://expressjs.com/es/) - Framework usado
* [TypeScript](https://www.typescriptlang.org/) - Lenguaje de programación

## Versionamiento

Se uso '/v1' como versión.

## Contribuyentes 👩🏻‍🚒

* **Natalia Gonzalez** - *Dev* - [NATALIAGJ](https://github.com/NATALIAGJ)

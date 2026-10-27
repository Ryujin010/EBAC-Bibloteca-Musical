# Biblioteca Musical

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black) ![Redux](https://img.shields.io/badge/Redux-764ABC?style=for-the-badge&logo=redux&logoColor=white) ![Jest](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white) ![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white) ![npm](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white) ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)

> Aplicación web para explorar y organizar una colección de música, con el estado de la aplicación gestionado con **Redux** y pruebas automatizadas.

Proyecto desarrollado durante mi formación en **EBAC**.

## 📋 Tabla de contenido

- [Descripción](#-descripción)
- [Tecnologías](#-tecnologías)
- [Características](#-características)
- [Estructura del proyecto](#-estructura-del-proyecto)
- [Instalación y uso](#-instalación-y-uso)
- [Pruebas](#-pruebas)
- [Lo que aprendí](#-lo-que-aprendí)
- [Autor](#-autor)

## 📖 Descripción

Biblioteca Musical es una aplicación web que permite explorar y organizar una colección de música. El estado de la aplicación se centraliza con **Redux**, lo que hace que los datos fluyan de forma predecible, y el proyecto incluye pruebas automatizadas en la carpeta `__tests__`.

## 🛠️ Tecnologías

- **JavaScript**: lógica de la aplicación
- **Redux**: manejo del estado global
- **Jest**: pruebas automatizadas (carpeta `__tests__`)
- **Node.js y npm**: gestión de dependencias y scripts
- **HTML5 y CSS3**: estructura y estilos de la interfaz

## ✨ Características

- Listado de música generado dinámicamente con JavaScript
- Estado centralizado con **Redux** (store, acciones y reducers)
- Manipulación del DOM y manejo de eventos
- Pruebas automatizadas dentro de la carpeta `__tests__`
- Dependencias y scripts gestionados con `package.json`
- Repositorio limpio gracias a `.gitignore`

## 📁 Estructura del proyecto

```
EBAC-Bibloteca-Musical/
├── src/                  # Código fuente de la aplicación
│   ├── ...               # Lógica con Redux (store, acciones, reducers)
│   └── __tests__/        # Pruebas automatizadas
├── .gitignore            # Archivos y carpetas que Git debe ignorar (p. ej. node_modules)
├── package.json          # Dependencias y scripts del proyecto
├── package-lock.json     # Versiones exactas de las dependencias instaladas
└── README.md
```

| Archivo / carpeta | Para qué sirve |
|-------------------|----------------|
| `src/` | Contiene el código fuente, incluido el uso de Redux para manejar el estado. |
| `src/__tests__/` | Pruebas que verifican que la lógica funciona correctamente. |
| `package.json` | Define el nombre del proyecto, las dependencias y los scripts (`npm start`, `npm test`, etc.). |
| `package-lock.json` | Fija las versiones exactas de cada dependencia para que la instalación sea igual en cualquier equipo. |
| `.gitignore` | Evita subir al repositorio archivos innecesarios, como `node_modules`. |

## 🚀 Instalación y uso

**Requisitos:** [Node.js](https://nodejs.org/) (incluye npm).

1. Clona el repositorio:
   ```bash
   git clone https://github.com/Ryujin010/EBAC-Bibloteca-Musical.git
   cd EBAC-Bibloteca-Musical
   ```
2. Instala las dependencias (se leen de `package.json` y `package-lock.json`):
   ```bash
   npm install
   ```
3. Inicia la aplicación:
   ```bash
   npm start
   ```
   > Si tu proyecto usa otro script, revisa la sección `scripts` de `package.json`.

## 🧪 Pruebas

Las pruebas están en la carpeta `__tests__`. Para ejecutarlas:

```bash
npm test
```

## 🧠 Lo que aprendí

- Manejo de arreglos y objetos en JavaScript
- Manipulación del DOM
- Gestión del estado global con **Redux**: store, acciones y reducers
- Escritura de pruebas automatizadas
- Gestión de dependencias con **npm** (`package.json` y `package-lock.json`)
- Uso de `.gitignore` para mantener limpio el repositorio

## 👨‍💻 Autor

**Jesus Enrique Leon Arteaga**

- GitHub: [@Ryujin010](https://github.com/Ryujin010)
- Correo: jesuse.gjn@gmail.com

---

⭐ Si te gustó este proyecto, ¡déjale una estrella al repositorio!

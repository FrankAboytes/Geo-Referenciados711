const express = require('express');
const routerApi = require('./routes/rutas');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

app.use(express.json());

app.get("/" , (req, res) => {
  res.send("Hola desde mi server Express");
});

app.get("/nuevaruta", (req, res) => {
  res.send("Esta es una nueva ruta");
});


routerApi(app);

app.get("/categories/:categoryid/products/:productsid", (req, res) => {
  const {categoryid, productsid} = req.params;
  res.json({
    categoryid,
    productsid
  })
});

app.get("/users", (req, res) => {
  const {username,lastname } = req.query;
  if (username && lastname) {
    res.json({
      username,
      lastname
    });
  }
  else {
    res.send("No hay nombre y/o apellido")
  }
})

app.listen(port, () => {
  console.log("Server started on port " + port);
});


/*
api.example.com/task/{id} Muestra la tarea del id
api.example.com/user/{id} Muestra el usuario del id
api.
*/


const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Geo-Referenciados (Tu Proyecto)', // Título de tu API
      version: '1.0.0', // Versión
      description: 'Documentación de la API de mi proyecto Geo-Referenciados.', // Descripción
    },
    servers: [
      {
        url: 'http://localhost:3000', // URL base de tu servidor
        description: 'Servidor de desarrollo local'
      }
    ]
  },
  // La clave: le dice a swagger-jsdoc dónde buscar tus anotaciones
  apis: ['./routes/*.js'], 
};

// --- 3. GENERAR LA ESPECIFICACIÓN ---
const swaggerSpec = swaggerJsdoc(options);

app.get("/" , (req, res) => {
  res.send("Hola desde mi server Express");
});

app.get("/nuevaruta", (req, res) => {
  res.send("Esta es una nueva ruta");
});

// --- 4. CREAR LA RUTA PARA LA DOCUMENTACIÓN ---
// Esta nueva ruta servirá la interfaz gráfica de Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Tus rutas de la API (esto debe ir DESPUÉS de /api-docs)
routerApi(app);

// ... (tus otras rutas de ejemplo como /categories/:categoryid... puedes dejarlas o borrarlas)
app.get("/categories/:categoryid/products/:productsid", (req, res) => {
  // ...
});
app.get("/users", (req, res) => {
  // ...
});


// Iniciar el servidor
app.listen(port, () => {
  console.log("Server started on port " + port);
  // Mensaje útil para saber dónde ver la documentación
  console.log(`Documentación de API disponible en http://localhost:${port}/api-docs`);
});

mongoose.connect(
    'mongodb+srv://FrankoDarko:Flanax.1@loslibrosdeltioflan.nxf1nh3.mongodb.net/?retryWrites=true&w=majority&appname=loslibrosdeltioflan',)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB...', err))

app.listen(4000, () => {
    console.log('Server running on port 4000'); // (Bonus: buena práctica)
});
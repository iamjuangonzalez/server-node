"use strict";

const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const indexRouter = require("./routes");
const dbConnect = require("./config/config");

const app = express();

app.use(cors()); // Para peticiones CORS

app.use(
  session({
    secret: "secretcode",
    resave: true,
    saveUninitialized: true,
  })
);

dbConnect();
/*
Esta es una función de middleware incorporada en Express. Analiza las solicitudes entrantes con cargas JSON y se basa en el analizador del cuerpo.
Devuelve el middleware que solo analiza JSON y solo mira las solicitudes donde el encabezado Content-Type coincide con la opción type. Este analizador acepta cualquier codificación Unicode del cuerpo y admite la inflación automática de codificaciones gzip y desinflar.
*/
app.use(express.json({ limit: "50mb" }));

/*
Esta es una función de middleware incorporada en Express. Analiza las solicitudes entrantes con cargas útiles codificadas por urlen y se basa en el analizador del cuerpo.
Devuelve el middleware que solo analiza los cuerpos codificados por urlen y solo mira las solicitudes donde el encabezado Content-Type coincide con la opción type. Este analizador acepta solo la codificación UTF-8 del cuerpo y admite el inflado automático de codificaciones gzip y desinflado.
*/
app.use(express.urlencoded({ extended: false, limit: "50mb" }));

/* 
Analice el encabezado de la cookie y complete req.cookies con un objeto marcado por los nombres de las cookies. Opcionalmente, puede habilitar el soporte de cookies firmadas pasando una cadena secreta, que asigna req.secret para que pueda ser utilizada por otro middleware.
 */
app.use(cookieParser());

app.use("/api/v1", indexRouter);

module.exports = app;

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _expressSession = _interopRequireDefault(require("express-session"));
var _cookieParser = _interopRequireDefault(require("cookie-parser"));
var _cors = _interopRequireDefault(require("cors"));
var _routes = _interopRequireDefault(require("./routes"));
var _config = _interopRequireDefault(require("./config/config"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const app = (0, _express.default)();
app.use((0, _cors.default)()); // Para peticiones CORS

app.use((0, _expressSession.default)({
  secret: "secretcode",
  resave: true,
  saveUninitialized: true
}));
(0, _config.default)();
/*
Esta es una función de middleware incorporada en Express. Analiza las solicitudes entrantes con cargas JSON y se basa en el analizador del cuerpo.
Devuelve el middleware que solo analiza JSON y solo mira las solicitudes donde el encabezado Content-Type coincide con la opción type. Este analizador acepta cualquier codificación Unicode del cuerpo y admite la inflación automática de codificaciones gzip y desinflar.
*/
app.use(_express.default.json({
  limit: "50mb"
}));

/*
Esta es una función de middleware incorporada en Express. Analiza las solicitudes entrantes con cargas útiles codificadas por urlen y se basa en el analizador del cuerpo.
Devuelve el middleware que solo analiza los cuerpos codificados por urlen y solo mira las solicitudes donde el encabezado Content-Type coincide con la opción type. Este analizador acepta solo la codificación UTF-8 del cuerpo y admite el inflado automático de codificaciones gzip y desinflado.
*/
app.use(_express.default.urlencoded({
  extended: false,
  limit: "50mb"
}));

/* 
Analice el encabezado de la cookie y complete req.cookies con un objeto marcado por los nombres de las cookies. Opcionalmente, puede habilitar el soporte de cookies firmadas pasando una cadena secreta, que asigna req.secret para que pueda ser utilizada por otro middleware.
 */
app.use((0, _cookieParser.default)());
app.use("/api/v1", _routes.default);
var _default = app;
exports.default = _default;
const mongoose = require("mongoose");

const dbConnect = async () => {
  /* const DB_URI =
    "mongodb+srv://medical365:R3dPrvOwaOMfrGOB@cluster0.953zg4c.mongodb.net/test"; */
  const DB_URI =
    "mongodb+srv://medical365:R3dPrvOwaOMfrGOB@cluster0.953zg4c.mongodb.net/dbPrueba";
  /* const DB_URI = "mongodb://localhost:27017/dbPrueba"; */
  await mongoose.connect(
    DB_URI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (err, res) => {
      if (!err) {
        console.log("<<<<Conexion Correcta>>>>");
      } else {
        console.log("****Conexion Incorrecta****");
      }
    }
  );
};

module.exports = dbConnect;

//Import Module
const mongoose = require("mongoose");

//Connecting to a mongoDB database
const connectWithRetry = () =>
  mongoose
    .connect(
      `mongodb+srv://Blue4purple:Blue4purple!@cluster0.afxg3.mongodb.net/DemoDb?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    .then(() => console.log(":::::::: CONNECTED TO DATBASE :::::::::"))
    .catch((error) => {
      console.log(
        ":::Something went wrong during the connection :::",
        error.message
      );
      console.log("::: ATTEMPTING TO RECONNECT TO MONGODB :::");
      setTimeout(connectWithRetry, 5000);
    });

var dbConfig = {
  mysqlConfig: connectWithRetry(),
};

module.exports = dbConfig;

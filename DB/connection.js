const mongoose = require("mongoose");
// const AWS = require("aws-sdk");

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

// export default connectWithRetry;
// var aws_remote_config = {
//   accessKeyId: "AKIASPMLHTSKXRDFW4PN",
//   secretAccessKey: "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",
//   region: "us-east-2",
// };
// AWS.config.update(aws_remote_config);
var dbConfig = {
  mysqlConfig: connectWithRetry(),
  // conf: aws_remote_config,
  // s3Config: new AWS.S3(),
  // ses: new AWS.SES({ apiVersion: "2010-12-01" }),
};

// export default dbConfig;
module.exports = dbConfig;

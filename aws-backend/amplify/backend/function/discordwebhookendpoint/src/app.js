const AWS = require('aws-sdk');
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware');
const bodyParser = require('body-parser');
const express = require('express');
const fetch = require('node-fetch');

AWS.config.update({ region: process.env.TABLE_REGION });

const dynamodb = new AWS.DynamoDB.DocumentClient();

let tableName = "fellowsdb";
if (process.env.ENV && process.env.ENV !== "NONE") {
  tableName = tableName + '-' + process.env.ENV;
}

const path = "/discord-message";
const app = express();
app.use(bodyParser.json());
app.use(awsServerlessExpressMiddleware.eventContext());

// Enable CORS for all methods
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.post(path, function (req, res) {
  dynamodb.batchGet({
    RequestItems: {
      [tableName]: {
        Keys: [
          { "username": req.body.sender },
          { "username": req.body.recipient },
        ],
      },
    },
  }, async (err, data) => {
    if (err) {
      res.statusCode = 500;
      res.json({ error: 'Could not load items: ' + err.message });
    } else {
      console.log(data);
      const fellows = data.Items;

      try {
        await fetch(process.env.DISCORD_WEBHOOK_URL, {
          method: 'post',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: 'test' })
        });
        res.json({ success: true });
      } catch (err) {
        res.json({ success: false, err });
      }
    }
  });
});

app.listen(3000, function () {
  console.log("App started");
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from this file
module.exports = app;

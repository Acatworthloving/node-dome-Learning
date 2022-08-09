const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');

// import users.js
const users = require('./routes/api/users');

// DB config
const dbURL = require('./config/keys').mongoURI;

// body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Connect to mongodb
const client = new MongoClient(dbURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
client
  .connect()
  .then(() => {
    const collection = client.db('practice').collection('users');
    // perform actions on the collection object
    console.log('MongooDB Connect');
    client.close();
  })
  .catch((err) => {
    console.error(err);
  });

app.get('/', (req, res) => {
  res.send('Hello world');
});

// router
app.use('/api/users', users);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

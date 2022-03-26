const fs = require('fs');
const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const compression = require('compression');


const usersRoutes = require('./routes/users-routes');

const app = express();

app.use(bodyParser.json());
app.use(compression());

app.use(express.static(path.join('public')));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');

  next();
});


app.use('/api/users', usersRoutes);

app.use((req, res, next) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});


app.use((error, req, res, next) => {
  if (req.file) {
    fs.unlink(req.file.path, (err) => {
      console.log(err);
    });
  }
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || 'An unknown error occurred!' });
});

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.21ehf.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
  )
  .then(() => {
    app.listen(process.env.PORT || 5000);
  })
  .catch((err) => {
    console.log(err);
  });

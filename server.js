'use strict'

var path = require('path');
var express = require('express');
var app = new express();
var port = 3000;

app.use('/assets', express.static('assets'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
})

app.listen(port, function(error) {
  if (error) {
    return console.error(error);
  }
  console.info('==> 🌎  Acesse http://localhost:%s', port);
})

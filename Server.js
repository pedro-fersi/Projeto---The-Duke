var express = require('express');
var mysql = require('mysql');
var app = express();

var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "250600",
  database: "The_Duke"
});


con.connect(function(err) {
  if (err) throw err;
  console.log("Conectado ao banco de dados MySQL!");
});

app.get('/pesquisa', function(req, res) {
  var consulta = req.query.q;
  var sql = "SELECT * FROM camisetas WHERE modelo LIKE '%" + consulta + "%'";
  con.query(sql, function(err, result) {
    if (err) throw err;
    res.json(result);
  });
});

app.use(express.static('public'));

app.listen(3000, function () {
  console.log('Servidor rodando na porta 3000!');
});

var express = require('express');
var router = express.Router();
var contactsDAO = require('../src/dao/contactsDAO');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('add', { title: 'contactsApp' });
});

router.post('/', async function(req, res, next) {
  const { nome, email, telefone, favorito } = req.body;
  const contactData = {
    nome,
    email,
    telefone,
    favorito: favorito ? true : false
  };
  // console.log(contactData);
  const mydb = req.app.locals.mydb;
  const ok = await contactsDAO.insertUser(mydb, contactData);
  //console.log(ok);
  let msg_ = '';
  if (ok.acknowledged) {
    msg_ = "<div class=\"alert alert-primary\" role=\"alert\">Contato adicionado!</div>"
  } else {
    msg_ = "<div class=\"alert alert-danger\" role=\"alert\">Erro ao adicionar contato!</div>";
  }
  
  res.render('result', { 
    title: 'contactsApp',
    msg: msg_
  });
});

module.exports = router;

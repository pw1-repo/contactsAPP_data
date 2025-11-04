var express = require('express');
var router = express.Router();
require('dotenv').config()
const { ObjectId } = require("mongodb");
const contactsDAO = require('../src/dao/contactsDAO')

/* GET home page. */
router.get('/:id', async function(req, res, next) {
  const mydb = req.app.locals.mydb
  const id = req.params.id
  const contact_ = await contactsDAO.getUserById(mydb, new ObjectId(id))
  //console.log(contact_)
  res.render('form', { title: 'contactsApp', contact: contact_ });
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
  const ok = await contactsDAO.updateByTelefone(mydb, {telefone: telefone}, {$set: contactData});
  console.log(ok);
  let msg_ = '';
  if (ok.modifiedCount > 0) {
    msg_ = "<div class=\"alert alert-primary\" role=\"alert\">Contato atualizado!</div>"
  } else {
    msg_ = "<div class=\"alert alert-danger\" role=\"alert\">Erro ao atualizar contato!</div>";
  }
  
  res.render('result', { 
    title: 'contactsApp',
    msg: msg_
  });
});

module.exports = router;

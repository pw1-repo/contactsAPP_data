var express = require('express');
var router = express.Router();
const { ObjectId } = require("mongodb");
const contactsDAO = require('../src/dao/contactsDAO')

/* GET home page. */
router.get('/:id', async function(req, res, next) {
  const db = req.app.locals.db
  const id = req.params.id
  const contact_ = await contactsDAO.getContactById(db, new ObjectId(id))
  //console.log(contact_)
  res.render('form', { title: 'contactsApp', contact: contact_ } );
});

router.get('/', function(req, res, next) {
  // const db = req.app.locals.db
  // const id = req.params.id
  // const contact_ = await contactsDAO.getContactById(db, new ObjectId(id))
  //console.log(contact_)
  contact_ = {
    nome: '',
    email: '',
    telefone: '',
    favorito: false
  }
  res.render('form', { title: 'contactsApp', contact: contact_ } );
});

router.post('/', async function(req, res, next) {
  let msg_ = "";
  let error_ = false;
  const db = req.app.locals.db
  const { _id, nome, email, telefone, favorito } = req.body;
  const contactData = {
    _id: _id ? new ObjectId(_id) : undefined,
    nome,
    email,
    telefone,
    favorito: favorito ? true : false
  };
  //console.log(contactData);
  if (contactData._id) {
    const result = await contactsDAO.modifyContactById(db, contactData._id, contactData);
    if (result.error) {
      msg_ = "Erro ao modificar contato!";
      error_ = true;
    } else {
      msg_ = "Contato modificado com sucesso!";
    }
  } else {
    const ok = await contactsDAO.insertContact(db, contactData);
    if (ok.insertedId) {
      msg_ = 'Contato inserido com sucesso!';
    } else {
      msg_ = "Erro ao inserir contato!";
      error_ = true;
    }
  }
  res.render('result', { title: 'contactsApp', msg: msg_, error: error_ });
});

module.exports = router;

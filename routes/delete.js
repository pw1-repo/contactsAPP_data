var express = require('express');
var router = express.Router();
const contactsDAO = require('../src/dao/contactsDAO')

/* GET home page. */
router.get('/:nome', async function(req, res, next) {
  const mydb = req.app.locals.mydb;
  const nome = req.params.nome;
  const ok = await contactsDAO.deleteUserByNome(mydb, nome)
  let msg_ = '';
  if (ok.deletedCount > 0) {
    msg_ = `<div class="alert alert-primary" role="alert">Contato ${nome} deletado!</div>`
    } else {
    msg_ = `<div class="alert alert-danger" role="alert">Erro ao deletar contato ${nome}!</div>`;
  }
  //console.log(contacts_)
  res.render('result', { title: 'contactsApp', msg: msg_ });
});

module.exports = router;

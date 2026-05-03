var express = require('express');
var router = express.Router();
const contactsDAO = require('../src/dao/contactsDAO');

/* GET home page. */
router.get('/', async function(req, res, next) {
  try {
    const contacts_ = await contactsDAO.getFavoriteContacts(req.app.locals.db);
    //console.log(contacts_)

    if (contacts_.length === 0) {
      res.render('results', { title: 'contactsApp', msg: 'Nenhum contato favorito encontrado!', error: true });
    } else {
      if (req.params.format === 'table') {
        res.render('all', { title: 'contactsApp', contacts: contacts_, format: 'table' });
      } else {
        res.render('all', { title: 'contactsApp', contacts: contacts_, format: 'cards' });
      }
    }
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;

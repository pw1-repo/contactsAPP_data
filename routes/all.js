var express = require('express');
var router = express.Router();
const contactsDAO = require('../src/dao/contactsDAO')

/* GET home page. */
router.get('/', async function(req, res, next) {
  const mydb = req.app.locals.mydb;
  const contacts_ = await contactsDAO.getUsers(mydb)
  //console.log(contacts_)
  res.render('all', { title: 'contactsApp', contacts: contacts_ });
});

module.exports = router;

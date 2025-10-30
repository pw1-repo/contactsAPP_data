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
  res.render('single', { title: 'contactsApp', contact: contact_ });
});

module.exports = router;

var express = require('express');
var router = express.Router();
const contactsDAO = require('../src/dao/contactsDAO')

/* GET home page. */
router.get('/', async function(req, res, next) {
  const favorito = await contactsDAO.toggleFavoritoByNome(req.app.locals.db, req.query.nome);
  //console.log(favorito)
  //const referrer = req.get('Referer') || '/all';
  //console.log(referrer)
  res.redirect(req.get('Referer'));
});

module.exports = router;

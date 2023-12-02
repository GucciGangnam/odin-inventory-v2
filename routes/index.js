var express = require('express');
var router = express.Router();

// Import controllers 

const home_controller = require("../controllers/homeController")



/* GET home page. */
router.get('/', (req, res) => {
  res.redirect('/home');
});

router.get('/home', home_controller.index);

module.exports = router;

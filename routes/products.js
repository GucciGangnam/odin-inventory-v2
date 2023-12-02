var express = require('express');
var router = express.Router();

// Import controllers 
const product_controller = require("../controllers/productsController")



/* GET home page. */
router.get('/', product_controller.index);

module.exports = router;

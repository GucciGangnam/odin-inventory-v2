var express = require('express');
var router = express.Router();

// Import controllers 
const product_controller = require("../controllers/productsController")



/* GET home page. */
router.get('/', product_controller.index);

/////// CREATE NEW PRODUCT /////////
//get//
router.get('/new', product_controller.new_get);
//post//
router.post('/new', product_controller.new_post);

///////VIEW PRODUCTS///////////
router.get( '/:id', product_controller.view)

//delete//

//update//

//remove//

module.exports = router;

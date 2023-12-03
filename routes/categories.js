var express = require('express');
var router = express.Router();

// Import controllers 
const category_controller = require("../controllers/categoriesController")



/* GET home page. */
// index
router.get('/', category_controller.index);

// GET new category form 
router.get('/new', category_controller.add_new_category_get);

// POST new category form 
router.post('/new', category_controller.add_new_category_post);

// Edit category info
router.get("/:id/edit", category_controller.edit_category_get);
router.post("/:id/edit", category_controller.edit_category_post);

// View Individual categry (via id)
router.get("/:id", category_controller.view_category_get);





module.exports = router;

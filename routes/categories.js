var express = require('express');
var router = express.Router();

// Import controllers 
const category_controller = require("../controllers/categoriesController")



/* VIEW Categories. */
// index
router.get('/', category_controller.index);

// CREATE Category //
// GET new category form 
router.get('/new', category_controller.add_new_category_get);
// POST new category form 
router.post('/new', category_controller.add_new_category_post);

// UPDATE Category //
// Edit category info
router.get("/:id/edit", category_controller.edit_category_get);
router.post("/:id/edit", category_controller.edit_category_post);

/* VIEW Category. */
// View Individual categry (via id)
router.get("/:id", category_controller.view_category_get);

// DELETE Category //
router.get("/:id/delete", category_controller.delete_category_get);
router.post("/:id/delete", category_controller.delete_category_post);





module.exports = router;

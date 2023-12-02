// Imports 
// import schemes 
const Categories = require("../models/category");
const Products = require("../models/product");

// import async handler
const asyncHandler = require("express-async-handler");

//Validator methods
const { body, validationResult } = require("express-validator");


// CATEGORIES INDEX CONTROLLER //


// index
exports.index = asyncHandler(async (req, res, next) => {
    const categoryCount = await Categories.countDocuments({}).exec();
    const allCategories = await Categories.find({}).exec();
    res.render("categoriesIndex", { 
        allCategories: allCategories,
        categoryCount: categoryCount,
        pagetitle : "Categories"
    })
});

//ADD NEW CATEGORY //
// add new category form 
exports.add_new_category_get = asyncHandler(async(req, res, next) => { 
    res.render("categoryAddForm", { 
        pagetitle: "New Category"
    });
})
// add new category form 
exports.add_new_category_post = [
    // validate and sanitise the inputs 
    body("name")
        .trim()
        .isLength({min:1})
        .withMessage("Must have a name")
        .customSanitizer(value => {
            // Capitalize the first letter
            return value.charAt(0).toUpperCase() + value.slice(1);
        }),
    body("description")
        .trim()
        .isLength({min:1})
        .withMessage("Must have a description")
        .customSanitizer(value => {
            // Capitalize the first letter
            return value.charAt(0).toUpperCase() + value.slice(1);
        }),
    asyncHandler(async(req, res, next) => { 
        // get list of existing categories 
        const existingCategories = await Categories.find({name: req.body.name}).exec();
        console.log(existingCategories)
        if (existingCategories.length !== 0){
            let errors = [{msg: "This category already exists"}]
        res.render("categoryAddForm", { 
            pagetitle: "New Category",
            errors: errors});
            return;
        }
        const errors = validationResult(req);
        const URL = req.body.name.toLowerCase().replace(/ /g, "");
        const newCategory = new Categories({
            name: req.body.name,
            description: req.body.description,
            url: "categories/" + URL
        });
        // Data isnt valid
        if (!errors.isEmpty()) {
            res.render("categoryAddForm", { 
                pagetitle: "New Category",
                errors: errors.array() });
            console.log(errors);
            return;
        } else {
            //data is valid
            //Save Data 
            await newCategory.save();
            //Re-direct back to categories page
            res.redirect("/categories")
        }
    })
]

// VIEW CATEGORY //
exports.view_category_get = asyncHandler(async(req, res, next) => { 
    const category = await Categories.find({url: "categories/" + req.params.id})
    // if categiry doesnt exists 
    if (category.length == 0){ 
        res.status(404).send('This URL Does Not Exists');
    } else { 
        res.render("categoryView", { 
            pagetitle: category[0].name,
            categoryName: category[0].name,
            categoryDescription: category[0].description,
        })
    }
})
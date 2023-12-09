// Imports 
// import schemes 
const Categories = require("../models/category");
const Products = require("../models/product");

// import async handler
const asyncHandler = require("express-async-handler");

//Validator methods
const { body, validationResult } = require("express-validator");
const validator = require('validator');
const { isDate, isAfter } = require('validator');
const category = require("../models/category");


// CATEGORIES INDEX CONTROLLER //

exports.index = asyncHandler(async (req, res, next) => {
    const productCount = await Products.countDocuments({}).exec();
    const allProductsArr = await Products.find({}).exec();

    res.render("productsIndex", {
        pagetitle: "Products",
        productCount: productCount,
        allProductsArr: allProductsArr,
    })
});

//VIEW PRODUCT PAGE//
exports.view = asyncHandler(async(req, res, next)=> { 
    // fetch product object
    const productToFind = req.params.id.charAt(0).toUpperCase() + req.params.id.slice(1);
    const product = await Products.find({name: productToFind})
    res.render("productView", {product: product[0]})
})

// CREATE NEW PRODUCT //

exports.new_get = asyncHandler(async (req, res, next) => {
    // get a list of all available categories 
    const listOfCats = await Categories.find({})
    res.render("productNew", { listOfCats: listOfCats })
})

exports.new_post = [
    // Validate and sanitize the user inputs: 
    body('name')
        .trim()
        .isLength({ min: 1 })
        .withMessage("Must have a name")
        .custom(value => {
            if (value.includes("-")) {
                throw new Error("Name cannot contain '-'");
            }
            return true;
        })
        .customSanitizer(value => {
            // Capitalize the first letter
            return value.charAt(0).toUpperCase() + value.slice(1);
        }),
    body('description')
        .trim()
        .isLength({ min: 1 })
        .withMessage("Must have a description")
        .customSanitizer(value => {
            // Capitalize the first letter
            return value.charAt(0).toUpperCase() + value.slice(1);
        }),
        asyncHandler(async (req, res, next) => {
            // get a list of avialbe cats 
            const cats = await Categories.find({})
            const availableCats = []
            // cats.forEach((cat) => {availableCats.push(cat.category)})
            next();
        }),
    body('price')
        .trim()
        .isLength({ min: 1 })
        .custom((value) => {
            if (!validator.isNumeric(value)) {
                throw new Error('Price must be a number');
            }
            const decimalCount = (value.split('.')[1] || []).length;
            if (decimalCount > 2) {
                throw new Error('Price can have at most 2 decimal places');
            }
            return true;
        }),
    body('stock')
        .trim()
        .isLength({ min: 1 })
        .isNumeric(),
    body('sellBy')
        .isDate().withMessage('Sell by date must be a valid date')
        .custom((value) => {
            const currentDate = new Date();
            if (!isAfter(value, currentDate.toISOString())) {
                throw new Error('Sell by date must be in the future');
            }
            return true;
        }),
    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            //render form again with errors passed through
            // get list of cats (for passthrough) 
            const listOfCats = await Categories.find({})
            res.render('productNew', { listOfCats: listOfCats, errors: errors.array() })
            return;
        } else {
            // save teh data 
            const newProduct = new Products({
                name: req.body.name,
                description: req.body.description,
                category: req.body.category,
                price: req.body.price,
                numberInStock: req.body.stock,
                expiryDate: req.body.sellBy,
                url: 'products/' + req.body.name.replace(/\s/g, '-').toLowerCase()
            }); 
            await  newProduct.save()
            res.redirect('/products')
            return;
        }
    })
]

// delete product // 
exports.delete = showDeletePage = (req, res, next) => { 
    res.render("productDelete", {productName: req.params.id})
}

exports.delete_post = asyncHandler(async(req, res, next) => { 
    await Products.deleteOne({name: req.params.id})
    res.redirect("/products")
})


// edit product // 

exports.edit_get = asyncHandler(async(req, res, next) => { 
    // get the original products 
    const originalProduct = await Products.findOne({name: req.params.id})
    const listOfCats = await Categories.find({})
    const xDateString = originalProduct.expiryDate.toISOString().slice(0, 10);
    res.render("productEdit", { originalProduct: originalProduct, listOfCats: listOfCats, xDateString: xDateString})
})

exports.edit_post = [
    
    
    asyncHandler(async(req, res, next) => { 
    //save original product 
    const originalProduct = await Products.find({name: req.params.id})
    console.log(req.params.id)
    // if data is valid
    // if data i snot valid 
        // save data 
        const updatedProduct = {
        name: req.body.name,
        description: req.body.description,
        category: req.body.category,
        price: req.body.price,
        numberInStock: req.body.stock,
        expiryDate: req.body.sellBy
        }
        // await Products.updateOne({name: req.params.id}, {$set{ 
        //     x
        //     x
        //     x
        //     x
        // }})

    res.send("hello")
})
]
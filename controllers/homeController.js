// Imports 
// import schemes 
const Categories = require("../models/category");
const Products = require("../models/product");

// import async handler
const asyncHandler = require("express-async-handler");

// HOME CONTROLLER //
exports.index = asyncHandler(async (req, res, next) => {
    try {
        // Get Number of categories 
        const numCategories = await Categories.countDocuments({}).exec();
        // Get number of products 
        const numProducts = await Products.countDocuments({}).exec();
        // calculate number of items (combination of num er in stock)
        const allProducts = await Products.find({}).exec();
        const numItemsArr = allProducts.map(product => ({
            count: product.numberInStock
        }))
        const numItems = numItemsArr.reduce((accumulator, currentValue) => {
            return accumulator + currentValue.count;
        }, 0);
        // calculate total market value (combination of stock X price for each item)
        const valueOfEachItem = allProducts.map(product => ({
            value: (product.numberInStock * product.price)
        }))
        const TotalValueOfAllProducts = valueOfEachItem.reduce((accumulator, currentValue) => { 
            return accumulator + currentValue.value;
        }, 0);
        res.render('home', {
            pagetitle: 'Home',
            numCategories: numCategories,
            numProducts: numProducts,
            numItems: numItems,
            TotalValueOfAllProducts: TotalValueOfAllProducts,
        });
    } catch (error) {
        // Handle any errors and pass them to the error handler middleware
        console.log(error);
    }
});




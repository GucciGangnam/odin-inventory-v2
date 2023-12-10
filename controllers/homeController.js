// Imports 
// import schemes 
const Categories = require("../models/category");
const product = require("../models/product");
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
        // calculate any products due to expire within teh week 
        const today = new Date(); // Current date
        const expiringSoon = []
        allProducts.map((product) => {
            // Check if expiryDate is within 7 days of today
            if (product.expiryDate) {
                const expirationDate = new Date(product.expiryDate);
                const timeDifference = expirationDate.getTime() - today.getTime();
                const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));
        
                if (daysDifference <= 7) {
                    expiringSoon.push(product);
                }
            }
        });
        console.log(expiringSoon)
        ///////
        res.render('home', {
            pagetitle: 'Home',
            numCategories: numCategories,
            numProducts: numProducts,
            numItems: numItems,
            TotalValueOfAllProducts: TotalValueOfAllProducts,
            expiringSoon: expiringSoon,
        });
    } catch (error) {
        // Handle any errors and pass them to the error handler middleware
        console.log(error);
    }
});



